"use client";

import { ArrowUpRight, ChevronDown, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView, useReducedMotion, type Variants } from "framer-motion";
import { useRef } from "react";
import { TextReveal } from "@/components/ui/text-reveal";

import { ONDIAL_ACCENT_STYLE } from "@/components/marketing/split-screen-section";
import {
  marketingEyebrowClass,
  marketingSectionContainerClass,
} from "@/config/marketing-layout";
import {
  NEWS_PAGE_CONTENT,
  type BentoBoxTone,
  type NewsBentoBox,
} from "@/data/news-hero-content";
import { cn } from "@/lib/utils";

const easeOut = [0.22, 1, 0.36, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: easeOut },
  },
};


function BentoCard({
  story,
  tone,
  size,
}: {
  story: NewsBentoBox;
  tone: BentoBoxTone;
  size: "hero" | "tall" | "small";
}) {
  return (
    <Link
      href={story.href}
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-2xl border p-5 no-underline",
        "transition-[transform,box-shadow,border-color] duration-300",
        "hover:-translate-y-0.5 hover:shadow-[0_20px_40px_-24px_rgb(15_23_42/0.18)]",
        tone.bg,
        tone.border,
        size === "hero" && "min-h-[200px] sm:min-h-[240px] sm:p-6",
        size === "tall" && "min-h-[220px] sm:min-h-[260px]",
        size === "small" && "min-h-[168px]",
      )}
    >
      <div className="flex flex-wrap items-center gap-2">
        <span
          className={cn(
            "rounded-full border border-current/15 bg-white/50 px-2 py-0.5 text-[0.625rem] font-semibold uppercase tracking-wider",
            tone.tag,
          )}
        >
          {story.category}
        </span>
        {story.isNew && (
          <span className="rounded-full bg-[#534AB7] px-2 py-0.5 text-[0.5625rem] font-bold uppercase tracking-wider text-white">
            New
          </span>
        )}
      </div>

      <h2
        className={cn(
          "m-0 mt-3 font-semibold leading-snug tracking-tight",
          tone.title,
          size === "hero" && "text-xl sm:text-2xl",
          size === "tall" && "text-lg sm:text-xl",
          size === "small" && "text-base",
        )}
      >
        {story.title}
      </h2>

      <p
        className={cn(
          "m-0 mt-2 flex-1 text-muted-foreground",
          size === "hero" ? "text-sm leading-relaxed" : "text-[0.8125rem] leading-relaxed",
        )}
      >
        {story.description}
      </p>

      <div className="mt-4 flex items-center justify-between gap-3">
        <time dateTime={story.dateIso} className="text-[0.6875rem] font-medium text-muted-foreground">
          {story.date}
        </time>
        <span
          className={cn(
            "inline-flex items-center gap-1 text-xs font-semibold opacity-0 transition-opacity duration-300 group-hover:opacity-100",
            tone.tag,
          )}
        >
          Read
          <ArrowUpRight className="size-3.5" aria-hidden />
        </span>
      </div>
    </Link>
  );
}

function WorldMapBackdrop() {
  const { worldMap } = NEWS_PAGE_CONTENT;

  return (
    <div
      className="pointer-events-none absolute inset-x-0 bottom-0 h-[min(340px,52vw)] sm:h-[min(400px,46vw)]"
      aria-hidden
    >
      <Image
        src={worldMap.src}
        alt="World map highlighting global connectivity"
        width={1000}
        height={400}
        priority
        className="object-cover mx-auto"
      />
    </div>
  );
}

function NewsHeroMasthead({ show }: { show: boolean }) {
  const {
    badge,
    title,
    titleAccent,
    titleThird,
    subtitle,
    subscribeLabel,
    subscribeHref,
    exploreLabel,
    exploreHref,
  } = NEWS_PAGE_CONTENT;

  return (
    <section
      id="news-hero"
      className="relative overflow-hidden pb-[min(260px,40vw)] pt-10 h-[calc(100svh-22rem)] bg-white max-w-7xl mx-auto rounded-3xl border border-gray-200 my-4"
      style={ONDIAL_ACCENT_STYLE}
      aria-labelledby="news-page-title"
    >
      <WorldMapBackdrop />

      <div className={cn(marketingSectionContainerClass, "relative z-2")}>
        <motion.header
          variants={fadeUp}
          initial="hidden"
          animate={show ? "visible" : "hidden"}
          className="mx-auto flex max-w-3xl flex-col items-center text-center"
        >
          <p className={cn(marketingEyebrowClass, "mb-4 inline-flex items-center gap-[0.4rem]")}>
            <Sparkles
              className="h-3.5 w-3.5 text-[hsl(var(--section-accent-h)_var(--section-accent-s)_var(--section-accent-l))]"
              strokeWidth={1.75} aria-hidden />
            {badge}
          </p>

          <h1
            id="success-stories-title"
            className="m-0 text-balance text-[clamp(2rem,5vw,3.125rem)] font-[650] leading-[1.15] tracking-[-0.03em] text-foreground"
          >
            <TextReveal as="span" className="block" delay={0.05} stagger={0.07} inViewAmount={0.4}>
              {title}
            </TextReveal>
            <TextReveal
              as="span"
              className={cn(
                "block text-[hsl(var(--section-accent-h)_var(--section-accent-s)_var(--section-accent-l))]",
              )}
              delay={0.12}
              stagger={0.07}
              inViewAmount={0.4}
            >
              {titleAccent}
            </TextReveal>
            <TextReveal as="span" className="block" delay={0.05} stagger={0.07} inViewAmount={0.4}>
              {titleThird}
            </TextReveal>
          </h1>

          <p className="m-0 mt-4 max-w-2xl text-pretty text-sm leading-relaxed sm:text-base sm:leading-[1.65]">
            {subtitle}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href={subscribeHref}
              className={cn(
                "inline-flex min-h-10 items-center justify-center rounded-full text-white bg-black px-6 py-2.5",
                "text-sm font-semibold no-underline",
                "transition-[transform,box-shadow] duration-300 hover:-translate-y-px hover:shadow-[0_12px_28px_-12px_rgb(255_255_255/0.35)]",
              )}
            >
              {subscribeLabel}
            </Link>
            <Link
              href={exploreHref}
              className={cn(
                "inline-flex min-h-10 items-center justify-center gap-1.5 rounded-full",
                "border border-black/25 bg-white/5 px-6 py-2.5 text-sm font-semibold text-black no-underline backdrop-blur-sm",
                "transition-[border-color,background-color] duration-300 hover:border-black/25 hover:bg-black/10",
              )}
            >
              {exploreLabel}
              <ChevronDown className="size-4 opacity-70" aria-hidden />
            </Link>
          </div>
        </motion.header>
      </div>
    </section>
  );
}

export function NewsHeroSection() {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.06 });
  const show = prefersReducedMotion || isInView;

  const { bento, boxTones } = NEWS_PAGE_CONTENT;

  return (
    <>
      <div ref={sectionRef}>
        <NewsHeroMasthead show={show} />
      </div>

    </>
  );
}
