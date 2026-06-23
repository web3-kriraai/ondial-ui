import type { Metadata } from "next";
import Link from "next/link";
import { Sparkles, ArrowRight, Phone } from "lucide-react";

import { BlogPageShell } from "@/components/layout/blog-page-shell";
import StructuredData from "@/components/StructuredData";
import type { BlogPost } from "@/components/marketing/blog-card";
import { BlogFaqSection } from "@/components/marketing/blog-faq-section";
import { BlogList } from "@/components/marketing/blog-list";
import { BlogNewsletterSection } from "@/components/marketing/blog-newsletter-section";
import { BlogPageHero } from "@/components/marketing/blog-page-hero";
import { TextReveal } from "@/components/ui/text-reveal";
import {
  blogListingContainerClass,
  blogListingInnerClass,
} from "@/config/marketing-layout";
import { fetchAllBlogSummaries, mapBlogSummaries } from "@/lib/db";
import {
  buildBlogListSchema,
  buildBreadcrumbSchema,
} from "@/lib/seo/schemaBuilders";

import { DASHBOARD_SIGNUP_URL } from "@/config/urls";

export const revalidate = 300;

export const metadata: Metadata = {
  title: { absolute: "Best AI Voice Agent Automation Blogs & Insights | OnDial" },
  description:
    "Stay updated with OnDial's blog on AI voice agents, automation, and customer experience. Learn strategies, trends, and tips to grow your business smarter.",
  alternates: { canonical: "https://www.ondial.ai/blog" },
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
    title: "Best AI Voice Agent Automation Blogs & Insights | OnDial",
    description:
      "Stay updated with OnDial's blog on AI voice agents, automation, and customer experience. Learn strategies, trends, and tips to grow your business smarter.",
    url: "https://www.ondial.ai/blog",
    siteName: "OnDial",
    images: [{ url: "https://www.ondial.ai/img/logo/og.png", width: 1200, height: 630, alt: "OnDial Blog" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Best AI Voice Agent Automation Blogs & Insights | OnDial",
    description:
      "Stay updated with OnDial's blog on AI voice agents, automation, and customer experience. Learn strategies, trends, and tips to grow your business smarter.",
    images: ["https://www.ondial.ai/img/logo/og.png"],
    creator: "@ondialai",
  },
};

async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const blogs = await fetchAllBlogSummaries();
    return mapBlogSummaries(blogs);
  } catch (error) {
    console.error("[blog] Failed to load posts:", error);
    return [];
  }
}

const BLOG_PAGE_FAQS = {
  title: "Frequently Asked Questions About AI Voice Agents",
  items: [
    {
      question: "What is an AI voice agent?",
      answer: "An AI voice agent is a software-based virtual assistant capable of understanding spoken language, processing customer queries, and responding naturally-without human intervention. It can handle tasks like answering calls, booking appointments, providing order updates, and qualifying leads."
    },
    {
      question: "How can AI voice agents help small businesses?",
      answer: "AI voice agents enable small businesses to offer 24/7 customer support, automate repetitive tasks, and reduce operational costs. They can handle inquiries such as business hours, service availability, and order status, allowing human staff to focus on more complex issues."
    },
    {
      question: "Are AI voice agents secure?",
      answer: "Yes, reputable AI voice agent platforms implement enterprise-grade encryption, comply with data privacy regulations like GDPR, and ensure secure API integrations to protect customer data during interactions."
    },
    {
      question: "How quickly can I deploy an AI voice agent?",
      answer: "Deployment timelines vary based on customization and integration requirements. Basic implementations can be operational within a few weeks, while more complex setups may take a couple of months."
    },
    {
      question: "What types of tasks can an AI voice agent handle?",
      answer: "An AI voice agent can manage a wide range of tasks such as answering frequently asked questions, booking appointments, sending reminders, qualifying leads, providing product information, and even handling simple customer complaints. This helps businesses streamline operations and improve customer service efficiency."
    }
  ]
};

export default async function BlogIndexPage() {
  const posts = await getBlogPosts();

  const blogListSchemas = [
    (buildBlogListSchema as any)({
      url: '/blog',
      posts: posts.map((p) => ({
        title: p.title,
        slug: p.id,
        publishDate: p.date,
        image: p.image,
        author: p.author.name,
      })),
      description:
        "Stay updated with OnDial's blog on AI voice agents, automation, and customer experience.",
    }),
    (buildBreadcrumbSchema as any)(
      [{ name: 'Blog', url: '/blog' }],
      { anchorUrl: '/blog' }
    ),
  ];

  return (
    <BlogPageShell>
      <StructuredData data={blogListSchemas} />
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
        
        {/* CTA / CTR Section */}
        <div className="mt-16 text-center bg-gradient-to-br from-white to-[hsl(var(--section-accent-h)_var(--section-accent-s)_var(--section-accent-l)/0.035)] border border-black/[0.06] rounded-3xl p-8 sm:p-12 max-w-3xl mx-auto flex flex-col items-center shadow-[0_4px_20px_-4px_rgba(83,74,183,0.05)] w-full">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-black/[0.06] bg-black/[0.015] px-3.5 py-1.5 text-xs font-medium text-muted-foreground mb-5">
            <Sparkles className="size-3.5 text-[#534AB7]" />
            AI-Powered Solutions
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-[2.25rem] font-bold leading-tight tracking-tight text-foreground max-w-xl">
            Ready to Transform Your <span className="block sm:inline text-[#534AB7]">Customer Experience?</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base leading-relaxed text-muted-foreground max-w-xl">
            Join thousands of businesses that never miss a call and always provide exceptional service with OnDial's AI technology.
          </p>
          <div className="h-0.5 w-16 bg-[#534AB7]/30 rounded-full my-6" />
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <Link
              href={DASHBOARD_SIGNUP_URL}
              className="flex items-center justify-center gap-1.5 h-11 px-6 w-full sm:w-auto rounded-xl bg-[#534AB7] hover:bg-[#4338ca] text-white font-semibold transition-colors"
            >
              Get Started <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/contact"
              className="flex items-center justify-center gap-1.5 h-11 px-6 w-full sm:w-auto rounded-xl border border-black/[0.08] hover:bg-black/[0.02] text-foreground font-semibold transition-colors bg-white"
            >
              <Phone className="size-4 text-[#534AB7]" /> Learn More
            </Link>
          </div>
        </div>

        {/* FAQ Section */}
        <BlogFaqSection faqs={BLOG_PAGE_FAQS} />

        <div className={blogListingContainerClass}>
          <BlogNewsletterSection className="mt-8 sm:mt-12" />
        </div>
      </div>
    </BlogPageShell>
  );
}
