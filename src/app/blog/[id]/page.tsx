import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { BlogPageShell } from "@/components/layout/blog-page-shell";
import { BlogArticleMotion } from "@/components/marketing/blog-article-motion";
import { BlogFaqSection } from "@/components/marketing/blog-faq-section";
import { BlogPostHeader } from "@/components/marketing/blog-post-header";
import { BlogRichText } from "@/components/marketing/blog-rich-text";
import {
  fetchBlogBySlug,
  mapBlogDetail,
} from "@/lib/contentful";
import { getSiteUrl } from "@/lib/share-links";

type Props = {
  params: Promise<{ id: string }>;
};

export const revalidate = 300;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  try {
    const blog = await fetchBlogBySlug(id);
    const post = blog ? mapBlogDetail(blog) : null;

    if (!post) {
      return { title: "Blog Post" };
    }

    return {
      title: post.metaTitle,
      description: post.metaDescription,
      openGraph: {
        title: post.metaTitle,
        description: post.metaDescription,
        images: post.image ? [{ url: post.image }] : undefined,
      },
    };
  } catch {
    return { title: "Blog Post" };
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { id } = await params;

  let post;
  try {
    const blog = await fetchBlogBySlug(id);
    post = blog ? mapBlogDetail(blog) : null;
  } catch (error) {
    console.error(`[blog] Failed to load post "${id}":`, error);
    notFound();
  }

  if (!post) {
    notFound();
  }

  const siteUrl = await getSiteUrl();
  const shareUrl = `${siteUrl}/blog/${post.slug}`;

  return (
    <BlogPageShell>
      <div className="mx-auto w-full max-w-3xl px-4 pt-6 pb-20 sm:px-6 sm:pt-8 sm:pb-24 lg:max-w-4xl">
        <article className="flex flex-col gap-0">
          <BlogArticleMotion>
            <BlogPostHeader post={post} shareUrl={shareUrl} />
          </BlogArticleMotion>

          <BlogArticleMotion delay={0.08}>
            <div className="relative mb-8 aspect-2/1 w-full overflow-hidden rounded-2xl border border-border/40 bg-muted/30 shadow-[0_12px_40px_-20px_rgb(15_23_42/0.18)] sm:mb-10 sm:rounded-3xl">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
                priority
                loading="eager"
                sizes="(max-width: 768px) 100vw, 896px"
              />
            </div>
          </BlogArticleMotion>

          <BlogArticleMotion delay={0.14}>
            <div className="blog-article-body">
              {post.body ? <BlogRichText document={post.body} /> : null}
            </div>
          </BlogArticleMotion>

          {post.faqs ? (
            <BlogArticleMotion delay={0.2}>
              <BlogFaqSection faqs={post.faqs} />
            </BlogArticleMotion>
          ) : null}
        </article>
      </div>
    </BlogPageShell>
  );
}
