"use client";

import Image from "next/image";
import Link from "next/link";
import { useLoaderComplete } from "@/components/providers/loader-context";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef, type ReactNode } from "react";

export type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  imageWidth?: number | null;
  imageHeight?: number | null;
  author: {
    name: string;
    avatar: string;
  };
};

const CARD_PATH =
  "M0 117 V60 Q0 40 20 40 H80 Q100 40 100 20 Q100 0 120 0 H280 Q300 0 300 20 V340 Q301 360 280 360 H221 Q200 360 200 380 Q200 400 180 399 V400 H20 Q0 400 0 380 Z";

/** Same shape as CARD_PATH, normalized for clipPathUnits="objectBoundingBox" (300×400 viewBox). */
const CARD_CLIP_PATH =
  "M0 0.2925 V0.15 Q0 0.1 0.066667 0.1 H0.266667 Q0.333333 0.1 0.333333 0.05 Q0.333333 0 0.4 0 H0.933333 Q1 0 1 0.05 V0.85 Q1.003333 0.9 0.933333 0.9 H0.736667 Q0.666667 0.9 0.666667 0.95 Q0.666667 1 0.6 0.9975 V1 H0.066667 Q0 1 0 0.95 Z";

const ENTRANCE_EASE = [0.22, 1, 0.36, 1] as const;

function splitAuthorName(name: string) {
  const trimmed = name.trim();
  const spaceIndex = trimmed.lastIndexOf(" ");
  if (spaceIndex === -1) {
    return { first: trimmed, last: "" };
  }
  return {
    first: trimmed.slice(0, spaceIndex),
    last: trimmed.slice(spaceIndex + 1),
  };
}

function BlogCardCornerLabel({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`block w-full text-center text-[0.625rem] font-semibold leading-[1.12] tracking-tight text-white sm:text-[0.6875rem] ${className ?? ""}`}
    >
      {children}
    </span>
  );
}

function BlogCardAuthorTab({ name }: { name: string }) {
  const { first, last } = splitAuthorName(name);

  return (
    <div className="pointer-events-none absolute right-0 bottom-0 z-30 flex h-[10%] min-h-[2.35rem] w-[33.33%] flex-col items-center justify-center gap-px px-1.5 py-1">
      <BlogCardCornerLabel>{first}</BlogCardCornerLabel>
      {last ? (
        <BlogCardCornerLabel className="line-clamp-1">{last}</BlogCardCornerLabel>
      ) : null}
    </div>
  );
}

function BlogCardDateTab({ date }: { date: string }) {
  return (
    <div className="pointer-events-none absolute top-0 left-0 z-30 flex h-[10%] min-h-[2.35rem] w-[33.33%] flex-col items-center justify-center px-1.5 py-1">
      <BlogCardCornerLabel className="line-clamp-2">{date}</BlogCardCornerLabel>
    </div>
  );
}

function BlogCardCategoryBadge({ category }: { category: string }) {
  return (
    <div className="pointer-events-none absolute top-2 right-2 z-30">
      <span className="inline-flex items-center rounded-full bg-[#534AB7] px-3 py-1 text-[0.625rem] font-semibold uppercase leading-none tracking-[0.1em] text-white shadow-[0_2px_8px_rgba(83,74,183,0.35)]">
        {category}
      </span>
    </div>
  );
}

const DEFAULT_IMAGE_ASPECT_RATIO = 16 / 9;

function getImageDimensions(post: BlogPost) {
  const width = post.imageWidth && post.imageWidth > 0 ? post.imageWidth : 1600;
  const height =
    post.imageHeight && post.imageHeight > 0 ? post.imageHeight : Math.round(width / DEFAULT_IMAGE_ASPECT_RATIO);

  return { width, height };
}

function BlogCardBody({ post }: { post: BlogPost }) {
  const { width, height } = getImageDimensions(post);

  return (
    <div className="flex w-full flex-col overflow-hidden bg-[#faf9fc]">
      <div className="relative w-full shrink-0 overflow-hidden bg-[#f0eff5]">
        <Image
          src={post.image}
          alt={post.title}
          width={width}
          height={height}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 352px"
          className="h-auto w-full"
        />
      </div>

      {/* Bottom row — title + excerpt */}
      <div className="flex shrink-0 flex-col gap-2.5 bg-[#faf9fc] px-5 py-4 sm:px-6 sm:py-5">
        <h3 className="line-clamp-2 text-balance text-base font-semibold leading-snug tracking-tight text-gray-900 sm:text-[1.0625rem]">
          {post.title}
        </h3>

        <p className="line-clamp-3 text-[0.8125rem] leading-relaxed text-gray-600">
          {post.excerpt}
        </p>
      </div>
    </div>
  );
}

export function BlogCard({ post, index }: { post: BlogPost; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const loaderComplete = useLoaderComplete();
  const inView = useInView(cardRef, { once: true, amount: 0.15 });
  const prefersReducedMotion = useReducedMotion();
  const show = loaderComplete && (prefersReducedMotion || inView);

  return (
    <motion.div
      ref={cardRef}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
      animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{
        duration: 0.5,
        delay: prefersReducedMotion ? 0 : index * 0.06,
        ease: ENTRANCE_EASE,
      }}
      className="flex w-full justify-center"
    >
      <article className="relative mx-auto w-full max-w-80 sm:max-w-[22rem]">
        <svg width="0" height="0" aria-hidden className="absolute">
          <defs>
            <clipPath id={`clip-${post.id}`} clipPathUnits="objectBoundingBox">
              <path d={CARD_CLIP_PATH} />
            </clipPath>
          </defs>
        </svg>

        <div className="relative">
          <div className="absolute inset-0 rounded-2xl bg-[#534AB7] shadow-[0_12px_40px_-12px_rgba(83,74,183,0.45)]" />

          <div
            className="relative overflow-hidden bg-[#faf9fc]"
            style={{ clipPath: `url(#clip-${post.id})` }}
          >
            <BlogCardBody post={post} />
          </div>

          <svg
            viewBox="0 0 300 400"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-0 h-full w-full drop-shadow-lg"
            fill="none"
            aria-hidden
          >
            <path
              d={CARD_PATH}
              fill="none"
              stroke="rgba(83,74,183,0.18)"
              strokeWidth="2"
            />
          </svg>

          <Link
            href={`/blog/${post.id}`}
            className="absolute inset-0 z-20 rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#534AB7]"
            aria-label={`Read ${post.title}`}
          />

          <BlogCardDateTab date={post.date} />
          <BlogCardCategoryBadge category={post.category} />
          <BlogCardAuthorTab name={post.author.name} />
        </div>
      </article>
    </motion.div>
  );
}
