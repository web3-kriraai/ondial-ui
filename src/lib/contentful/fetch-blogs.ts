import "server-only";

import { cache } from "react";

import { contentfulQuery } from "@/lib/contentful/client";
import { BLOG_DETAIL_FIELDS, BLOG_LIST_FIELDS, BLOG_SLUG_FIELDS } from "@/lib/contentful/fragments";
import { getBlogAuthorBySlugMap } from "@/lib/contentful/fetch-authors";
import type { ContentfulBlogDetail, ContentfulBlogSummary } from "@/lib/contentful/types";

const PAGE_SIZE = 100;

type BlogsCollectionResponse = {
  blogsCollection: {
    total: number;
    items: Array<ContentfulBlogSummary | null>;
  } | null;
};

type BlogSlugsResponse = {
  blogsCollection: {
    total: number;
    items: Array<{ slug: string | null } | null>;
  } | null;
};

type BlogBySlugResponse = {
  blogsCollection: {
    items: Array<ContentfulBlogDetail | null>;
  } | null;
};

type BlogListItem = Omit<ContentfulBlogSummary, "author">;

function normalizeSlug(slug: string | null | undefined): string {
  return String(slug ?? "")
    .trim()
    .toLowerCase();
}

function attachAuthors(
  blogs: BlogListItem[],
  authorMap: Map<string, ContentfulBlogSummary["author"]>,
): ContentfulBlogSummary[] {
  return blogs.map((blog) => {
    const slug = normalizeSlug(blog.slug);
    return {
      ...blog,
      author: slug ? authorMap.get(slug) ?? null : null,
    };
  });
}

async function fetchBlogCollectionPage(
  fields: string,
  skip: number,
): Promise<{ total: number; items: BlogListItem[] }> {
  const query = `
    query GetBlogs($limit: Int!, $skip: Int!) {
      blogsCollection(
        limit: $limit
        skip: $skip
        order: [publishDate_DESC, sys_firstPublishedAt_DESC]
      ) {
        total
        items { ${fields} }
      }
    }
  `;

  const data = await contentfulQuery<BlogsCollectionResponse>(query, {
    limit: PAGE_SIZE,
    skip,
  });

  const collection = data.blogsCollection;
  const items = (collection?.items ?? []).filter(Boolean) as BlogListItem[];

  return {
    total: collection?.total ?? items.length,
    items,
  };
}

async function fetchAllBlogListItems(): Promise<BlogListItem[]> {
  const all: BlogListItem[] = [];
  let skip = 0;

  while (true) {
    const { total, items } = await fetchBlogCollectionPage(BLOG_LIST_FIELDS, skip);
    all.push(...items);

    if (items.length < PAGE_SIZE || all.length >= total) {
      break;
    }

    skip += PAGE_SIZE;
  }

  return all;
}

export async function fetchAllBlogSummaries(): Promise<ContentfulBlogSummary[]> {
  const [blogs, authorMap] = await Promise.all([
    fetchAllBlogListItems(),
    getBlogAuthorBySlugMap(),
  ]);

  return attachAuthors(blogs, authorMap);
}

export const fetchAllBlogSummariesCached = cache(fetchAllBlogSummaries);

export async function fetchBlogSlugs(): Promise<string[]> {
  const all: string[] = [];
  let skip = 0;

  while (true) {
    const query = `
      query GetBlogSlugs($limit: Int!, $skip: Int!) {
        blogsCollection(
          limit: $limit
          skip: $skip
          order: [publishDate_DESC, sys_firstPublishedAt_DESC]
        ) {
          total
          items { ${BLOG_SLUG_FIELDS} }
        }
      }
    `;

    const data = await contentfulQuery<BlogSlugsResponse>(query, {
      limit: PAGE_SIZE,
      skip,
    });

    const collection = data.blogsCollection;
    const slugs = (collection?.items ?? [])
      .map((item) => normalizeSlug(item?.slug))
      .filter((slug): slug is string => Boolean(slug));

    all.push(...slugs);

    if (slugs.length < PAGE_SIZE || all.length >= (collection?.total ?? 0)) {
      break;
    }

    skip += PAGE_SIZE;
  }

  return all;
}

export async function fetchBlogBySlug(slug: string): Promise<ContentfulBlogDetail | null> {
  const normalizedSlug = normalizeSlug(slug);

  const query = `
    query GetBlog($slug: String!) {
      blogsCollection(where: { slug: $slug }, limit: 1) {
        items { ${BLOG_DETAIL_FIELDS} }
      }
    }
  `;

  const data = await contentfulQuery<BlogBySlugResponse>(query, { slug: normalizedSlug });
  const blog = data.blogsCollection?.items?.[0] ?? null;

  if (!blog) return null;

  const authorMap = await getBlogAuthorBySlugMap();

  return {
    ...blog,
    author: authorMap.get(normalizedSlug) ?? null,
  };
}

export const fetchBlogBySlugCached = cache(fetchBlogBySlug);

export async function fetchBlogsByAuthor(authorSlug: string): Promise<ContentfulBlogSummary[]> {
  const normalizedAuthorSlug = normalizeSlug(authorSlug);

  const query = `
    query GetAuthorBlogs($authorSlug: String!) {
      blogsCollection(
        where: { author: { slug: $authorSlug } }
        order: [publishDate_DESC]
        limit: 100
      ) {
        items { ${BLOG_LIST_FIELDS} }
      }
    }
  `;

  const data = await contentfulQuery<BlogsCollectionResponse>(query, {
    authorSlug: normalizedAuthorSlug,
  });

  const blogs = (data.blogsCollection?.items ?? []).filter(Boolean) as BlogListItem[];
  const authorMap = await getBlogAuthorBySlugMap();

  return attachAuthors(blogs, authorMap).filter(
    (blog) => normalizeSlug(blog.author?.slug) === normalizedAuthorSlug,
  );
}

export const fetchBlogsByAuthorCached = cache(fetchBlogsByAuthor);
