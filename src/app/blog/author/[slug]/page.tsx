import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { BlogPageShell } from "@/components/layout/blog-page-shell";
import { BlogList } from "@/components/marketing/blog-list";
import { BlogPageHero } from "@/components/marketing/blog-page-hero";
import { Button } from "@/components/ui/button";
import {
  blogListingContainerClass,
  blogListingInnerClass,
} from "@/config/marketing-layout";
import {
  fetchBlogsByAuthor,
  mapBlogSummaries,
} from "@/lib/contentful";

type Props = {
  params: Promise<{ slug: string }>;
};

export const revalidate = 300;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  try {
    const blogs = await fetchBlogsByAuthor(slug);
    const authorName = blogs[0]?.author?.authorName;

    return {
      title: authorName ? `Posts by ${authorName}` : `Author · ${slug}`,
      description: authorName
        ? `Read articles by ${authorName} on the OnDial blog.`
        : `Posts by ${slug}.`,
    };
  } catch {
    return {
      title: `Author · ${slug}`,
      description: `Posts by ${slug}.`,
    };
  }
}

export default async function BlogAuthorPage({ params }: Props) {
  const { slug } = await params;
  const authorSlug = slug.trim().toLowerCase();

  let posts;
  let authorName: string | null = null;

  try {
    const blogs = await fetchBlogsByAuthor(authorSlug);
    posts = mapBlogSummaries(blogs);
    authorName = blogs[0]?.author?.authorName ?? null;
  } catch (error) {
    console.error(`[blog] Failed to load author "${authorSlug}":`, error);
    notFound();
  }

  if (!posts.length) {
    notFound();
  }

  return (
    <BlogPageShell>
      <div className="mx-auto flex w-full min-w-0 max-w-3xl flex-col gap-8 px-4 pt-6 pb-12 sm:gap-10 sm:px-6 sm:pt-8 sm:pb-16 lg:max-w-4xl">
        <BlogPageHero
          eyebrow="Author"
          align="start"
          title={authorName ? `Posts by ${authorName}` : `Author: ${slug}`}
          description="Articles from this author on the OnDial blog."
        />

        <Button variant="outline" className="self-start rounded-full" render={<Link href="/blog" prefetch />} nativeButton={false}>
          All posts
        </Button>

        <div className={blogListingContainerClass}>
          <div className={blogListingInnerClass}>
            <BlogList posts={posts} />
          </div>
        </div>
      </div>
    </BlogPageShell>
  );
}
