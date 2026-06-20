import type { Document } from "@contentful/rich-text-types";

export type ContentfulAsset = {
  sys: { id: string };
  url: string | null;
  title: string | null;
  description: string | null;
  contentType: string | null;
  width: number | null;
  height: number | null;
};

export type ContentfulAuthor = {
  authorName: string | null;
  slug: string | null;
  authorDesignation?: string | null;
  authorDescription?: string | null;
  authorImage: { url: string | null } | null;
};

export type ContentfulRichText = {
  json: Document;
  links?: {
    assets?: {
      block?: ContentfulAsset[];
    };
  };
};

export type ContentfulFaqSection = {
  title: string | null;
  faqsCollection: {
    items: Array<{
      question: string | null;
      answer: string | null;
    } | null>;
  } | null;
};

export type ContentfulBlogSummary = {
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
  author: ContentfulAuthor | null;
};

export type ContentfulBlogDetail = ContentfulBlogSummary & {
  description: ContentfulRichText | null;
  faqs: ContentfulFaqSection | null;
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
  body: ContentfulRichText | null;
  faqs: BlogFaqSection | null;
};
