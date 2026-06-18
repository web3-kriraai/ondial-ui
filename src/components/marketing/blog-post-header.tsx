import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, Calendar, Clock } from "lucide-react";

import { BlogShareButton } from "@/components/marketing/blog-share-button";
import type { BlogPostDetail } from "@/lib/contentful/types";

type BlogPostHeaderProps = {
  post: BlogPostDetail;
  shareUrl: string;
};

export function BlogPostHeader({ post, shareUrl }: BlogPostHeaderProps) {
  return (
    <header className="mb-6 flex flex-col gap-3 sm:mb-7 sm:gap-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-x-4">
        <Link
          href="/blog"
          className="inline-flex shrink-0 items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ChevronLeft className="size-3.5 shrink-0" aria-hidden />
          Back to all posts
        </Link>

        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground sm:justify-end sm:text-sm">
          <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[0.6875rem] font-medium text-primary sm:text-xs">
            {post.category}
          </span>
          <span className="text-border/70" aria-hidden>
            ·
          </span>
          <span className="inline-flex items-center gap-1">
            <Calendar className="size-3 shrink-0" aria-hidden />
            {post.date}
          </span>
          <span className="text-border/70" aria-hidden>
            ·
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock className="size-3 shrink-0" aria-hidden />
            {post.readTime}
          </span>
        </div>
      </div>

      <h1 className="text-balance text-2xl font-semibold leading-tight tracking-tight text-foreground sm:text-3xl lg:text-[2rem] lg:leading-[1.15]">
        {post.title}
      </h1>

      <div className="flex items-center justify-between border-t border-border/40 pt-3.5 sm:pt-4">
        <div className="flex min-w-0 items-center gap-2.5">
          <div className="relative size-9 shrink-0 overflow-hidden rounded-full border border-border/50 bg-muted">
            <Image
              src={post.author.avatar}
              alt={post.author.name}
              fill
              className="object-cover"
              sizes="36px"
            />
          </div>
          <div className="min-w-0">
            {post.author.slug ? (
              <Link
                href={`/blog/author/${post.author.slug}`}
                className="truncate text-sm font-medium leading-none text-foreground hover:text-primary"
              >
                {post.author.name}
              </Link>
            ) : (
              <p className="truncate text-sm font-medium leading-none text-foreground">{post.author.name}</p>
            )}
            <p className="mt-1 text-xs text-muted-foreground">
              {post.authorDesignation || "Ondial Team"}
            </p>
          </div>
        </div>
        <BlogShareButton title={post.title} url={shareUrl} />
      </div>
    </header>
  );
}
