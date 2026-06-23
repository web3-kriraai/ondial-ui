import type { Document } from "@contentful/rich-text-types";

import type {
  BlogFaqSection,
  BlogPostDetail,
  BlogPostSummary,
  BlogRecordDetail,
  BlogRecordSummary,
  RichTextDocument,
} from "@/lib/blog/types";

const DEFAULT_AUTHOR = "OnDial Team";
const DEFAULT_CATEGORY = "Insights";
const DEFAULT_IMAGE = "/blog_ai_comm_1777703161729.png";
const DEFAULT_AVATAR = "/blog_author_avatar_1777703411435.png";
const WORDS_PER_MINUTE = 200;

function normalizeSlug(slug: string | null | undefined): string {
  return String(slug ?? "")
    .trim()
    .toLowerCase();
}

function formatPublishDate(value: string | null | undefined): string {
  if (!value) return "";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  }).format(date);
}

function countWordsInDocument(document: Document | null | undefined): number {
  if (!document?.content?.length) return 0;

  const walk = (nodes: Document["content"]): number =>
    nodes.reduce((total, node) => {
      if ("value" in node && typeof node.value === "string") {
        const words = node.value.trim().split(/\s+/).filter(Boolean);
        return total + words.length;
      }

      if ("content" in node && Array.isArray(node.content)) {
        return total + walk(node.content as Document["content"]);
      }

      return total;
    }, 0);

  return walk(document.content);
}

export function estimateReadTimeFromText(text: string): string {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
  return `${minutes} min read`;
}

export function estimateReadTimeFromRichText(richText: RichTextDocument | null | undefined): string {
  const words = countWordsInDocument(richText?.json);
  if (words === 0) return "5 min read";
  return estimateReadTimeFromText(`${"word ".repeat(words)}`);
}

function mapFaqs(faqs: BlogRecordDetail["faqs"]): BlogFaqSection | null {
  if (!faqs) return null;

  const items =
    faqs.faqsCollection?.items
      ?.filter((item): item is NonNullable<typeof item> => Boolean(item?.question && item?.answer))
      .map((item) => ({
        question: item.question!,
        answer: item.answer!,
      })) ?? [];

  if (!items.length) return null;

  return {
    title: faqs.title?.trim() || "Frequently asked questions",
    items,
  };
}

export function mapBlogSummary(blog: BlogRecordSummary): BlogPostSummary | null {
  const slug = normalizeSlug(blog.slug);
  if (!slug || !blog.title) return null;

  const excerpt = blog.metaDescription?.trim() || "";

  return {
    id: slug,
    slug,
    title: blog.title,
    excerpt,
    metaTitle: blog.metaTitle?.trim() || blog.title,
    metaDescription: excerpt,
    date: formatPublishDate(blog.publishDate),
    readTime: estimateReadTimeFromText(excerpt || blog.title),
    category: DEFAULT_CATEGORY,
    image: blog.featuredImage?.url || DEFAULT_IMAGE,
    imageWidth: blog.featuredImage?.width ?? null,
    imageHeight: blog.featuredImage?.height ?? null,
    author: {
      name: blog.author?.authorName?.trim() || DEFAULT_AUTHOR,
      slug: blog.author?.slug ? normalizeSlug(blog.author.slug) : null,
      avatar: blog.author?.authorImage?.url || DEFAULT_AVATAR,
    },
  };
}

export function mapBlogDetail(blog: BlogRecordDetail): BlogPostDetail | null {
  const summary = mapBlogSummary(blog);
  if (!summary) return null;

  return {
    ...summary,
    readTime: estimateReadTimeFromRichText(blog.description),
    authorDesignation: blog.author?.authorDesignation?.trim() || null,
    authorDescription: blog.author?.authorDescription?.trim() || null,
    body: blog.description,
    faqs: mapFaqs(blog.faqs),
  };
}

export function mapBlogSummaries(blogs: BlogRecordSummary[]): BlogPostSummary[] {
  return blogs
    .map(mapBlogSummary)
    .filter((post): post is BlogPostSummary => post !== null);
}
