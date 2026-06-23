/**
 * Shapers — convert raw Supabase DB rows into blog record shapes for mappers.
 */

import type {
  BlogAuthorRecord,
  BlogFaqRecord,
  BlogRecordDetail,
  BlogRecordSummary,
  RichTextDocument,
} from "@/lib/blog/types";
import type { PostWithAuthor, PostWithDetail } from "@/lib/db/types";

function shapeAuthor(author: PostWithAuthor["authors"]): BlogAuthorRecord | null {
  if (!author) return null;
  return {
    authorName: author.name,
    slug: author.slug,
    authorDesignation: author.designation ?? null,
    authorDescription: author.description ?? null,
    authorImage: author.avatar_url ? { url: author.avatar_url } : null,
  };
}

function shapeFaqSection(
  sections: PostWithDetail["faq_sections"],
): BlogFaqRecord | null {
  if (!sections || sections.length === 0) return null;

  const section = sections[0];
  const sortedItems = [...(section.faq_items ?? [])].sort(
    (a, b) => a.sort_order - b.sort_order,
  );

  return {
    title: section.title,
    faqsCollection: {
      items: sortedItems.map((item) => ({
        question: item.question,
        answer: item.answer,
      })),
    },
  };
}

export function shapeToSummary(row: PostWithAuthor): BlogRecordSummary {
  return {
    title: row.title,
    slug: row.slug,
    metaTitle: row.meta_title ?? null,
    metaDescription: row.meta_description ?? null,
    publishDate: row.publish_date,
    featuredImage: row.featured_image_url
      ? {
          url: row.featured_image_url,
          width: row.featured_image_width ?? null,
          height: row.featured_image_height ?? null,
        }
      : null,
    author: shapeAuthor(row.authors),
  };
}

export function shapeToDetail(row: PostWithDetail): BlogRecordDetail {
  const summary = shapeToSummary(row as PostWithAuthor);

  return {
    ...summary,
    description: row.body ? (row.body as RichTextDocument) : null,
    faqs: shapeFaqSection(row.faq_sections),
  };
}
