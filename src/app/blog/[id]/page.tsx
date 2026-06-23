import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Sparkles, ArrowRight, Phone, User, Calendar } from "lucide-react";

import { BlogPageShell } from "@/components/layout/blog-page-shell";
import StructuredData from "@/components/StructuredData";
import { BlogArticleMotion } from "@/components/marketing/blog-article-motion";
import { BlogFaqSection } from "@/components/marketing/blog-faq-section";
import { BlogPostHeader } from "@/components/marketing/blog-post-header";
import { BlogRichText } from "@/components/marketing/blog-rich-text";
import { fetchBlogBySlug, fetchAllBlogSummaries, mapBlogDetail, mapBlogSummaries } from "@/lib/db";
import {
  buildBlogPostingSchema,
  buildBreadcrumbSchema,
} from "@/lib/seo/schemaBuilders";
import { getSiteUrl } from "@/lib/share-links";
import { DASHBOARD_SIGNUP_URL } from "@/config/urls";

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
  let relatedPosts: any[] = [];
  try {
    const blog = await fetchBlogBySlug(id);
    post = blog ? mapBlogDetail(blog) : null;
    if (post) {
      const allPostsSummaries = await fetchAllBlogSummaries();
      const allPosts = mapBlogSummaries(allPostsSummaries);
      relatedPosts = allPosts
        .filter((p) => p.slug !== id)
        .slice(0, 3);
    }
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

  const postSchemas = [
    (buildBlogPostingSchema as any)({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      author: post.author.name,
      authorSlug: post.author.slug,
      date: post.date,
      image: post.image,
      metaDescription: post.metaDescription,
      updatedAt: post.date,
    }),
    (buildBreadcrumbSchema as any)(
      [
        { name: "Blog", url: "/blog" },
        { name: post.title, url: `/blog/${post.slug}` },
      ],
      { anchorUrl: `/blog/${post.slug}` }
    ),
  ];

  return (
    <BlogPageShell>
      <StructuredData data={postSchemas} />
      <div className="mx-auto w-full max-w-3xl px-4 pt-6 pb-20 sm:px-6 sm:pt-8 sm:pb-24 lg:max-w-4xl">
        <article className="flex flex-col gap-0">
          <BlogArticleMotion>
            <BlogPostHeader post={post} shareUrl={shareUrl} />
          </BlogArticleMotion>

          {/* Featured image — only shown when the post has one */}
          {post.image && (
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
          )}

          <BlogArticleMotion delay={0.14}>
            <div className="blog-article-body">
              {post.body ? <BlogRichText document={post.body} /> : null}
            </div>
          </BlogArticleMotion>

          {/* Author Details Section */}
          <BlogArticleMotion delay={0.18}>
            <div className="mt-12 border-t border-border/35 pt-10">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-6 bg-black/[0.015] p-6 rounded-2xl border border-black/[0.04]">
                <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-[#0052FF] text-white">
                  <User className="size-7" strokeWidth={2.25} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <div>
                    <h3 className="text-base font-bold text-foreground">{post.author.name}</h3>
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#534AB7] mt-0.5">
                      {post.authorDesignation || "CTO"}
                    </p>
                  </div>
                  <p className="text-[0.9rem] leading-relaxed text-muted-foreground">
                    {post.authorDescription || `${post.author.name} is the CTO at KriraAI, driving innovation in AI-powered voice and automation solutions. He shares practical insights on conversational AI, business automation, and scalable tech strategies.`}
                  </p>
                  {post.author.slug && (
                    <Link
                      href={`/blog/author/${post.author.slug}`}
                      className="text-xs font-semibold text-[#534AB7] hover:underline mt-2 inline-flex items-center gap-1"
                    >
                      View all articles by {post.author.name}
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </BlogArticleMotion>

          {post.faqs ? (
            <BlogArticleMotion delay={0.2}>
              <BlogFaqSection faqs={post.faqs} />
            </BlogArticleMotion>
          ) : null}

          {/* CTA / CTR Section */}
          <BlogArticleMotion delay={0.24}>
            <div className="mt-16 text-center bg-gradient-to-br from-white to-[hsl(var(--section-accent-h)_var(--section-accent-s)_var(--section-accent-l)/0.035)] border border-black/[0.06] rounded-3xl p-8 sm:p-12 max-w-3xl mx-auto flex flex-col items-center shadow-[0_4px_20px_-4px_rgba(83,74,183,0.05)]">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-black/[0.06] bg-black/[0.015] px-3.5 py-1.5 text-xs font-medium text-muted-foreground mb-5">
                <Sparkles className="size-3.5 text-[#534AB7]" />
                AI-Powered Customer Service
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-[2.25rem] font-bold leading-tight tracking-tight text-foreground max-w-xl">
                Transform Your Business with <span className="block sm:inline text-[#534AB7]">AI Voice Automation</span>
              </h2>
              <p className="mt-4 text-sm sm:text-base leading-relaxed text-muted-foreground max-w-xl">
                Don't let your customers wait on hold. Join thousands of businesses using OnDial to provide instant, intelligent customer service 24/7.
              </p>
              <div className="h-0.5 w-16 bg-[#534AB7]/30 rounded-full my-6" />
              <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                <Link
                  href={DASHBOARD_SIGNUP_URL}
                  className="flex items-center justify-center gap-1.5 h-11 px-6 w-full sm:w-auto rounded-xl bg-[#534AB7] hover:bg-[#4338ca] text-white font-semibold transition-colors"
                >
                  Start Free Trial <ArrowRight className="size-4" />
                </Link>
                <Link
                  href="/contact"
                  className="flex items-center justify-center gap-1.5 h-11 px-6 w-full sm:w-auto rounded-xl border border-black/[0.08] hover:bg-black/[0.02] text-foreground font-semibold transition-colors bg-white"
                >
                  <Phone className="size-4 text-[#534AB7]" /> Schedule Demo
                </Link>
              </div>
            </div>
          </BlogArticleMotion>

          {/* Related Articles Section */}
          {relatedPosts.length > 0 && (
            <BlogArticleMotion delay={0.28}>
              <div className="mt-16 border-t border-border/35 pt-12 sm:mt-20 sm:pt-16">
                <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-[1.625rem] mb-8">
                  Related Articles
                </h2>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
                  {relatedPosts.map((relatedPost) => (
                    <Link
                      key={relatedPost.id}
                      href={`/blog/${relatedPost.slug}`}
                      className="group flex flex-col h-full overflow-hidden rounded-2xl border border-border/40 bg-white/40 hover:bg-white/80 hover:border-[#534AB7]/30 hover:shadow-lg transition-all duration-300"
                    >
                      <div className="relative aspect-video w-full overflow-hidden bg-muted">
                        <Image
                          src={relatedPost.image}
                          alt={relatedPost.title}
                          fill
                          className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 768px) 100vw, 300px"
                        />
                      </div>
                      <div className="flex flex-col flex-1 p-5 gap-2">
                        <h3 className="line-clamp-2 text-base font-bold text-foreground group-hover:text-[#534AB7] transition-colors leading-snug">
                          {relatedPost.title}
                        </h3>
                        <p className="line-clamp-3 text-xs leading-relaxed text-muted-foreground">
                          {relatedPost.excerpt}
                        </p>
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-auto pt-2 border-t border-border/30">
                          <Calendar className="size-3.5" />
                          <span>{relatedPost.date}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </BlogArticleMotion>
          )}
        </article>
      </div>
    </BlogPageShell>
  );
}
