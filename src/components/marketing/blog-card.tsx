"use client";

import Image from "next/image";
import Link from "next/link";
import { useLoaderComplete } from "@/components/providers/loader-context";
import { motion, useInView, useReducedMotion, type Transition } from "framer-motion";
import { useCallback, useRef, useState, type HTMLAttributes } from "react";

export type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  author: {
    name: string;
    avatar: string;
  };
};

const CARD_PATH =
  "M0 117 V60 Q0 40 20 40 H80 Q100 40 100 20 Q100 0 120 0 H280 Q300 0 300 20 V340 Q301 360 280 360 H221 Q200 360 200 380 Q200 400 180 399 V400 H20 Q0 400 0 380 Z";

const HOVER_EASE = [0.22, 1, 0.36, 1] as const;

const hoverTransition: Transition = {
  duration: 0.58,
  ease: HOVER_EASE,
};

type BlogCardClipContentProps = {
  post: BlogPost;
  hovered: boolean;
  reduceMotion: boolean;
};

function BlogCardClipContent({ post, hovered, reduceMotion }: BlogCardClipContentProps) {
  const active = reduceMotion ? false : hovered;

  return (
    <div
      {...({
        xmlns: "http://www.w3.org/1999/xhtml",
      } as HTMLAttributes<HTMLDivElement>)}
      className="relative box-border h-full w-full overflow-hidden bg-[#0a0a0a]"
    >
      {/* Image + overlays */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute inset-0"
          initial={false}
          animate={{ scale: active ? 1.05 : 1 }}
          transition={hoverTransition}
          style={{ transformOrigin: "center center" }}
        >
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-contain object-center"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 288px"
          />
        </motion.div>

        <motion.div
          className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/80 via-black/25 to-transparent"
          initial={false}
          animate={{ opacity: active ? 0 : 1 }}
          transition={hoverTransition}
        />

        {/* Blur stays constant; opacity crossfade = smooth perceived blur */}
        <motion.div
          className="pointer-events-none absolute inset-0 bg-[#1a1733]/72 backdrop-blur-md"
          initial={false}
          animate={{ opacity: active ? 1 : 0 }}
          transition={hoverTransition}
        />
      </div>

      {/* Default state copy */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-0 flex flex-col justify-end px-8"
        initial={false}
        animate={{
          opacity: active ? 0 : 1,
          y: active ? -14 : 0,
        }}
        transition={hoverTransition}
      >
        <div className="mb-3 flex items-center gap-2">
          <span className="rounded-full border border-white/15 bg-black/40 px-2.5 py-1 text-[0.6875rem] font-medium uppercase tracking-[0.1em] text-white/90 backdrop-blur-md">
            {post.category}
          </span>
        </div>
        <h3 className="line-clamp-2 text-balance text-lg font-semibold leading-snug tracking-tight text-white sm:text-xl">
          {post.title}
        </h3>
        <div className="h-[12%] shrink-0" />
      </motion.div>

      {/* Hover state copy */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-10 flex flex-col px-8 pt-[10%] pb-[10%]"
        initial={false}
        animate={{
          opacity: active ? 1 : 0,
          y: active ? 0 : 28,
        }}
        transition={hoverTransition}
      >
        <div className="absolute top-2.5 right-0 flex h-[10%] items-center justify-end pr-3 pl-8 sm:pr-4">
          <span className="rounded-full border border-white/25 bg-white/15 px-2.5 py-1 text-[0.6875rem] font-medium uppercase tracking-[0.1em] text-white backdrop-blur-md">
            {post.category}
          </span>
        </div>

        <h3 className="mt-4 mb-3 text-balance text-xl font-semibold leading-snug tracking-tight text-white sm:mt-5 sm:text-2xl">
          {post.title}
        </h3>

        <p className="line-clamp-4 text-sm leading-relaxed text-white/90">{post.excerpt}</p>
      </motion.div>
    </div>
  );
}

export function BlogCard({ post, index }: { post: BlogPost; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const loaderComplete = useLoaderComplete();
  const inView = useInView(cardRef, { once: true, amount: 0.15 });
  const prefersReducedMotion = useReducedMotion();
  const show = loaderComplete && (prefersReducedMotion || inView);
  const [hovered, setHovered] = useState(false);

  const onEnter = useCallback(() => setHovered(true), []);
  const onLeave = useCallback(() => setHovered(false), []);

  return (
    <motion.div
      ref={cardRef}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
      animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{
        duration: 0.55,
        delay: prefersReducedMotion ? 0 : index * 0.07,
        ease: HOVER_EASE,
      }}
      className="flex w-full justify-center"
    >
      <div
        className="relative mx-auto aspect-[3/4] w-full max-w-[17.5rem] rounded-2xl bg-[#534AB7] sm:max-w-[18rem]"
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
      >
        <Link href={`/blog/${post.id}`} className="absolute inset-0 z-20" />

        <div className="absolute top-0 left-0 z-10 flex h-[10%] w-[33.33%] items-center justify-center px-1 pointer-events-none">
          <span className="block text-center text-[0.6875rem] font-medium leading-none text-white/95 sm:text-xs">
            {post.date}
          </span>
        </div>

        <div className="absolute bottom-0 right-0 z-10 flex h-[10%] w-[33.33%] items-center justify-center px-1 pointer-events-none">
          <span className="block text-center text-[0.6875rem] font-medium leading-none text-white/95 sm:text-xs">
            {post.author.name}
          </span>
        </div>

        <svg
          viewBox="0 0 300 400"
          className="absolute inset-0 h-full w-full drop-shadow-2xl"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <clipPath id={`clip-${post.id}`}>
              <path d={CARD_PATH} />
            </clipPath>
          </defs>

          <path d={CARD_PATH} fill="#0a0a0a" />

          <foreignObject x="0" y="0" width="300" height="400" clipPath={`url(#clip-${post.id})`}>
            <BlogCardClipContent
              post={post}
              hovered={hovered}
              reduceMotion={prefersReducedMotion ?? false}
            />
          </foreignObject>

          <motion.path
            d={CARD_PATH}
            fill="none"
            strokeWidth="2"
            className="pointer-events-none"
            initial={false}
            animate={{
              stroke: hovered && !prefersReducedMotion ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.15)",
            }}
            transition={hoverTransition}
          />
        </svg>
      </div>
    </motion.div>
  );
}
