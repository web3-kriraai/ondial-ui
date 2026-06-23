import type { Document } from "@contentful/rich-text-types";

/** Legacy rich-text asset link shape (migrated posts). */
export type RichTextAsset = {
  sys: { id: string };
  url: string | null;
  title: string | null;
  description: string | null;
  contentType: string | null;
  width: number | null;
  height: number | null;
};

export type BlogAuthorRecord = {
  authorName: string | null;
  slug: string | null;
  authorDesignation?: string | null;
  authorDescription?: string | null;
  authorImage: { url: string | null } | null;
};

/** Contentful Rich Text document JSON (legacy migrated post bodies). */
export type RichTextDocument = {
  json: Document;
  links?: {
    assets?: {
      block?: RichTextAsset[];
    };
  };
};

export type BlogFaqRecord = {
  title: string | null;
  faqsCollection: {
    items: Array<{
      question: string | null;
      answer: string | null;
    } | null>;
  } | null;
};

/** Intermediate shape between Supabase rows and UI mappers. */
export type BlogRecordSummary = {
  title: string | null;
  slug: string | null;
  metaTitle: string | null;
  metaDescription: string | null;
  publishDate: string | null;
  featuredImage: {
    url: string | null;
    width: number | null;
    height: number | null;
  } | null;
  author: BlogAuthorRecord | null;
};

export type BlogRecordDetail = BlogRecordSummary & {
  description: RichTextDocument | null;
  faqs: BlogFaqRecord | null;
};

export type BlogFaqItem = {
  question: string;
  answer: string;
};

export type BlogFaqSection = {
  title: string;
  items: BlogFaqItem[];
};

export type BlogPostSummary = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  metaTitle: string;
  metaDescription: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  imageWidth: number | null;
  imageHeight: number | null;
  author: {
    name: string;
    slug: string | null;
    avatar: string;
  };
};

export type BlogPostDetail = BlogPostSummary & {
  authorDesignation: string | null;
  authorDescription: string | null;
  body: RichTextDocument | null;
  faqs: BlogFaqSection | null;
};
