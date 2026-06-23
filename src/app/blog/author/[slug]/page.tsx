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
import { fetchBlogsByAuthor, mapBlogSummaries } from "@/lib/db";
import StructuredData from "@/components/StructuredData";
import { buildProfilePageSchema, buildBreadcrumbSchema } from "@/lib/seo/schemaBuilders";

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
      alternates: {
        canonical: `https://www.ondial.ai/blog/author/${slug}`,
      },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-video-preview": -1,
          "max-image-preview": "large",
          "max-snippet": -1,
        },
      },
    };
  } catch {
    return {
      title: `Author · ${slug}`,
      description: `Posts by ${slug}.`,
      alternates: {
        canonical: `https://www.ondial.ai/blog/author/${slug}`,
      },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-video-preview": -1,
          "max-image-preview": "large",
          "max-snippet": -1,
        },
      },
    };
  }
}

export default async function BlogAuthorPage({ params }: Props) {
  const { slug } = await params;
  const authorSlug = slug.trim().toLowerCase();

  let posts;
  let authorName: string | null = null;
  let author: any = null;

  try {
    const blogs = await fetchBlogsByAuthor(authorSlug);
    posts = mapBlogSummaries(blogs);
    author = blogs[0]?.author ?? null;
    authorName = author?.authorName ?? null;
  } catch (error) {
    console.error(`[blog] Failed to load author "${authorSlug}":`, error);
    notFound();
  }

  if (!posts.length) {
    notFound();
  }

  const authorSchemas = author
    ? [
        (buildProfilePageSchema as any)({
          author,
          url: `/blog/author/${author.slug || authorSlug}`,
          blogCount: posts.length,
        }),
        (buildBreadcrumbSchema as any)(
          [
            { name: "Blog", url: "/blog" },
            { name: "Authors", url: "/blog" },
            { name: authorName || "Author", url: `/blog/author/${author.slug || authorSlug}` },
          ],
          { anchorUrl: `/blog/author/${author.slug || authorSlug}` }
        ),
      ]
    : [];

  return (
    <>
      <StructuredData data={authorSchemas} />
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
    </>
  );
}
