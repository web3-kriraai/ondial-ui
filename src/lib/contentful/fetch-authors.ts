import "server-only";

import { cache } from "react";

import { contentfulQuery } from "@/lib/contentful/client";
import type { ContentfulAuthor } from "@/lib/contentful/types";

/** Keep query complexity under Contentful's 11k limit (authors × linked blogs). */
const AUTHOR_PAGE_SIZE = 10;
const LINKED_BLOGS_LIMIT = 100;

const AUTHOR_BLOG_LINK_FIELDS = `
  authorName
  slug
  authorDesignation
  authorDescription
  authorImage { url }
  linkedFrom {
    blogsCollection(limit: ${LINKED_BLOGS_LIMIT}) {
      items { slug }
    }
  }
`;

type AuthorCollectionResponse = {
  authorCollection: {
    total: number;
    items: Array<{
      authorName: string | null;
      slug: string | null;
      authorDesignation: string | null;
      authorDescription: string | null;
      authorImage: { url: string | null } | null;
      linkedFrom?: {
        blogsCollection?: {
          items: Array<{ slug: string | null } | null>;
        } | null;
      } | null;
    } | null>;
  } | null;
};

function normalizeSlug(slug: string | null | undefined): string {
  return String(slug ?? "")
    .trim()
    .toLowerCase();
}

async function fetchBlogAuthorBySlugMapImpl(): Promise<Map<string, ContentfulAuthor>> {
  const map = new Map<string, ContentfulAuthor>();
  let skip = 0;

  while (true) {
    const query = `
      query GetAuthorsWithBlogLinks($limit: Int!, $skip: Int!) {
        authorCollection(limit: $limit, skip: $skip) {
          total
          items { ${AUTHOR_BLOG_LINK_FIELDS} }
        }
      }
    `;

    const data = await contentfulQuery<AuthorCollectionResponse>(query, {
      limit: AUTHOR_PAGE_SIZE,
      skip,
    });

    const collection = data.authorCollection;
    const items = collection?.items ?? [];

    for (const item of items) {
      if (!item?.authorName) continue;

      const author: ContentfulAuthor = {
        authorName: item.authorName,
        slug: item.slug,
        authorDesignation: item.authorDesignation,
        authorDescription: item.authorDescription,
        authorImage: item.authorImage,
      };

      const blogSlugs = item.linkedFrom?.blogsCollection?.items ?? [];
      for (const blog of blogSlugs) {
        const blogSlug = normalizeSlug(blog?.slug);
        if (blogSlug) {
          map.set(blogSlug, author);
        }
      }
    }

    if (items.length < AUTHOR_PAGE_SIZE || skip + items.length >= (collection?.total ?? 0)) {
      break;
    }

    skip += AUTHOR_PAGE_SIZE;
  }

  return map;
}

/** Cached per request — shared by list, detail, and author pages. */
export const getBlogAuthorBySlugMap = cache(fetchBlogAuthorBySlugMapImpl);
