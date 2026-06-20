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
      return { title: "Blog Post", robots: { index: false } };
    }

    const title = post.metaTitle || post.title;
    const description = post.metaDescription || post.excerpt || "";
    const ogImage = post.image
      ? [{ url: post.image, width: 1200, height: 630, alt: title }]
      : [{ url: "https://www.ondial.ai/img/logo/og.png", width: 1200, height: 630, alt: title }];
    const canonicalUrl = `https://www.ondial.ai/blog/${id}`;

    return {
      title,
      description,
      alternates: { canonical: canonicalUrl },
      openGraph: {
        title,
        description,
        url: canonicalUrl,
        siteName: "OnDial",
        images: ogImage,
        locale: "en_US",
        type: "article",
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [ogImage[0].url],
        creator: "@ondialai",
      },
    };
  } catch {
    return { title: "Blog Post", robots: { index: false } };
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
  const imageAspectRatio =
    post.imageWidth && post.imageHeight && post.imageHeight > 0
      ? post.imageWidth / post.imageHeight
      : 16 / 9;

  return (
    <BlogPageShell>
      <div className="mx-auto w-full max-w-3xl px-4 pt-6 pb-20 sm:px-6 sm:pt-8 sm:pb-24 lg:max-w-4xl">
        <article className="flex flex-col gap-0">
          <BlogArticleMotion>
            <BlogPostHeader post={post} shareUrl={shareUrl} />
          </BlogArticleMotion>

          <BlogArticleMotion delay={0.08}>
            <div
              className="relative mb-8 w-full overflow-hidden rounded-2xl sm:mb-10 sm:rounded-3xl"
              style={{ aspectRatio: imageAspectRatio }}
            >
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-contain object-center"
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
