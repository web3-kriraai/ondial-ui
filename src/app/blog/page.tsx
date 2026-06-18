import type { Metadata } from "next";

import { BlogPageShell } from "@/components/layout/blog-page-shell";
import type { BlogPost } from "@/components/marketing/blog-card";
import { BlogList } from "@/components/marketing/blog-list";
import { BlogNewsletterSection } from "@/components/marketing/blog-newsletter-section";
import { BlogPageHero } from "@/components/marketing/blog-page-hero";
import { TextReveal } from "@/components/ui/text-reveal";
import {
  blogListingContainerClass,
  blogListingInnerClass,
} from "@/config/marketing-layout";
import {
  fetchAllBlogSummaries,
  mapBlogSummaries,
} from "@/lib/contentful";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Insights & Updates",
  description:
    "Stay updated with the latest in AI communications, connectivity, and digital transformation from the Ondial team.",
};

async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const blogs = await fetchAllBlogSummaries();
    return mapBlogSummaries(blogs);
  } catch (error) {
    console.error("[blog] Failed to load posts from Contentful:", error);
    return [];
  }
}

export default async function BlogIndexPage() {
  const posts = await getBlogPosts();

  return (
    <BlogPageShell>
      <div className="mx-auto flex w-full min-w-0 max-w-3xl flex-col gap-8 px-4 pt-6 pb-12 sm:gap-10 sm:px-6 sm:pt-8 sm:pb-16 lg:max-w-4xl">
        <BlogPageHero
          title={
            <h1 className="mx-auto max-w-4xl text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-[2.625rem] lg:leading-tight">
              <TextReveal
                as="span"
                className="inline"
                delay={0.08}
                stagger={0.04}
                inViewAmount={0.2}
                segments={[
                  { text: "The Future of " },
                  { text: "Communication", className: "text-[#534AB7]" },
                ]}
              />
            </h1>
          }
          description="Explorations into AI, global connectivity, and the tools shaping how the world connects."
        />

        <div className={blogListingContainerClass}>
          <div className={blogListingInnerClass}>
            {posts.length > 0 ? (
              <BlogList posts={posts} />
            ) : (
              <p className="py-16 text-center text-sm text-muted-foreground">
                No blog posts available right now. Check back soon.
              </p>
            )}
          </div>
        </div>

        <div className={blogListingContainerClass}>
          <BlogNewsletterSection className="mt-8 sm:mt-12" />
        </div>
      </div>
    </BlogPageShell>
  );
}
