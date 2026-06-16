"use client";

import { ArrowUpRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { motion, useInView, useReducedMotion, type Variants } from "framer-motion";
import { useRef } from "react";

import { ONDIAL_ACCENT_STYLE } from "@/components/marketing/split-screen-section";
import {
  marketingEyebrowClass,
  marketingSectionContainerClass,
  marketingSectionShellClass,
} from "@/config/marketing-layout";
import {
  CUSTOMER_SUCCESS_GRID_HEADING,
  CUSTOMER_SUCCESS_STORIES,
  type CustomerSuccessStory,
  type CustomerSuccessStoryId,
} from "@/data/case-study-customer-success-grid-content";
import { cn } from "@/lib/utils";

const easeOut = [0.22, 1, 0.36, 1] as const;

const CARD_CLIP_PATH = "url(#case-study-customer-success-card-clip)";

type StoryTone = {
  logo: string;
  badge: string;
  metric: string;
  metricSoft: string;
  glow: string;
  background: string;
};

const storyTones: Record<CustomerSuccessStoryId, StoryTone> = {
  "horizon-realty": {
    logo: "bg-[#534AB7]/10 text-[#534AB7]",
    badge: "border-[#534AB7]/20 bg-[#EEEDFE] text-[#534AB7]",
    metric: "text-[#534AB7]",
    metricSoft: "border-[#534AB7]/12 bg-[#534AB7]/10",
    glow: "group-hover:shadow-[0_28px_56px_-28px_rgb(83_74_183/0.22)]",
    background: "bg-[#EEEDFE]",

  },
  "riverside-clinic": {
    logo: "bg-teal-600/10 text-teal-700",
    badge: "border-teal-600/20 bg-teal-600/8 text-teal-700",
    metric: "text-teal-700",
    metricSoft: "border-teal-600/12 bg-teal-600/6",
    glow: "group-hover:shadow-[0_28px_56px_-28px_rgb(13_148_136/0.2)]",
    background: "bg-[#F0FDF4]",
  },
  "summit-hvac": {
    logo: "bg-blue-600/10 text-blue-700",
    badge: "border-blue-600/20 bg-blue-600/8 text-blue-700",
    metric: "text-blue-700",
    metricSoft: "border-blue-600/12 bg-blue-600/6",
    glow: "group-hover:shadow-[0_28px_56px_-28px_rgb(37_99_235/0.2)]",
    background: "bg-[#EFF6FF]",
  },
  "flowright-plumbing": {
    logo: "bg-cyan-600/10 text-cyan-800",
    badge: "border-cyan-600/20 bg-cyan-600/8 text-cyan-800",
    metric: "text-cyan-800",
    metricSoft: "border-cyan-600/12 bg-cyan-600/6",
    glow: "group-hover:shadow-[0_28px_56px_-28px_rgb(8_145_178/0.2)]",
    background: "bg-[#ECFEFF]",
  },
  "northstar-insurance": {
    logo: "bg-violet-600/10 text-violet-700",
    badge: "border-violet-600/20 bg-violet-600/8 text-violet-700",
    metric: "text-violet-700",
    metricSoft: "border-violet-600/12 bg-violet-600/6",
    glow: "group-hover:shadow-[0_28px_56px_-28px_rgb(124_58_237/0.2)]",
    background: "bg-[#F5F3FF]",
  },
  "hartwell-legal": {
    logo: "bg-slate-600/10 text-slate-800",
    badge: "border-slate-600/20 bg-slate-600/8 text-slate-700",
    metric: "text-slate-800",
    metricSoft: "border-slate-600/12 bg-slate-600/6",
    glow: "group-hover:shadow-[0_28px_56px_-28px_rgb(51_65_85/0.18)]",
    background: "bg-[#F8FAFC]",
  },
};

const gridVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.06 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.52, ease: easeOut },
  },
};

const cardHoverVariants: Variants = {
  rest: { y: 0 },
  hover: {
    y: -6,
    transition: { duration: 0.32, ease: easeOut },
  },
};

const mainMetricVariants: Variants = {
  rest: { scale: 1, y: 0 },
  hover: {
    scale: 1.04,
    y: -2,
    transition: { duration: 0.35, ease: easeOut },
  },
};

const supportingMetricVariants: Variants = {
  rest: { opacity: 1, y: 0 },
  hover: (index: number) => ({
    opacity: 1,
    y: -2,
    transition: { duration: 0.3, ease: easeOut, delay: index * 0.04 },
  }),
};

function CompanyLogo({
  story,
  tone,
}: {
  story: CustomerSuccessStory;
  tone: StoryTone;
}) {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <p className="m-0 truncate text-sm font-semibold leading-tight text-foreground">
        {story.company}
      </p>
    </div>
  );
}

function SuccessStoryCard({
  story,
  animate,
}: {
  story: CustomerSuccessStory;
  animate: boolean;
}) {
  const tone = storyTones[story.id];

  const shellClassName = "group relative h-full";

  const surfaceClassName = cn(
    "pointer-events-none absolute inset-0 border border-border/55",
    tone.background,
    "shadow-[0_1px_0_rgb(255_255_255/0.95)_inset,0_16px_40px_-28px_rgb(15_23_42/0.12)]",
    "transition-[box-shadow,border-color] duration-400 ease-out",
    tone.glow,
  );

  const industryBadge = (
    <span
      className={cn(
        "absolute right-0 top-0 z-20  min-w-[31%] min-h-[16%] flex items-center justify-center text-center truncate",
        "text-[0.725rem] font-semibold uppercase tracking-wide rounded-bl-3xl rounded-tr-2xl",
        tone.metric,
        tone.background, 
      )}
    >
      {story.industry}
    </span>
  );

  const cardInner = (
    <div
      className="relative flex h-full flex-col overflow-hidden p-5 sm:p-6 "
      style={{ clipPath: CARD_CLIP_PATH }}
    >
      <div
        className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: "hsl(262 83% 58% / 0.08)" }}
        aria-hidden
      />

      <div className="relative mb-5 flex items-start">
        <CompanyLogo story={story} tone={tone} />
      </div>

      <div className="relative mb-5">
        <motion.div variants={animate ? mainMetricVariants : undefined}>
          <p
            className={cn(
              "m-0 text-[clamp(2rem,4vw,2.5rem)] font-bold leading-none tracking-tight",
              tone.metric,
            )}
          >
            {story.mainResult.value}
          </p>
          <p className="m-0 mt-1.5 text-sm font-semibold text-foreground">
            {story.mainResult.label}
          </p>
        </motion.div>
      </div>

      <div className="relative mb-5 grid grid-cols-2 gap-2.5">
        {story.supportingMetrics.map((metric, index) => (
          <motion.div
            key={metric.label}
            custom={index}
            variants={animate ? supportingMetricVariants : undefined}
            className={cn(
              "rounded-xl border px-3 py-2.5 transition-colors duration-300",
              tone.metricSoft,
              "group-hover:bg-white/80",
            )}
          >
            <p className={cn("m-0 text-lg font-bold leading-none tracking-tight", tone.metric)}>
              {metric.value}
            </p>
            <p className="m-0 mt-1 text-[0.6875rem] font-medium leading-snug text-muted-foreground">
              {metric.label}
            </p>
          </motion.div>
        ))}
      </div>

      <p className="relative m-0 flex-1 text-sm leading-relaxed text-muted-foreground">
        {story.description}
      </p>

      <Link
        href={story.href}
        className={cn(
          "relative mt-5 inline-flex items-center gap-1.5 text-sm font-semibold",
          "text-[hsl(var(--section-accent-h)_var(--section-accent-s)_var(--section-accent-l))]",
          "transition-[gap,color] duration-300 group-hover:gap-2.5",
        )}
      >
        View Story
        <ArrowUpRight
          className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          aria-hidden
        />
      </Link>
    </div>
  );

  if (!animate) {
    return (
      <article id={story.id} className={shellClassName}>
        <div className={surfaceClassName} style={{ clipPath: CARD_CLIP_PATH }} aria-hidden />
        {industryBadge}
        {cardInner}
      </article>
    );
  }

  return (
    <motion.article
      id={story.id}
      variants={cardHoverVariants}
      initial="rest"
      whileHover="hover"
      className={shellClassName}
    >
      <div className={surfaceClassName} style={{ clipPath: CARD_CLIP_PATH }} aria-hidden />
      {industryBadge}
      <motion.div variants={cardVariants}>{cardInner}</motion.div>
    </motion.article>
  );
}

export function CaseStudyCustomerSuccessGridSection() {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.08 });
  const show = prefersReducedMotion || isInView;
  const animateCards = !prefersReducedMotion;

  return (
    <section
      ref={sectionRef}
      id="customer-success-grid"
      className={cn(marketingSectionShellClass, "relative overflow-hidden")}
      style={ONDIAL_ACCENT_STYLE}
      aria-labelledby="customer-success-grid-title"
    >
      <div
        className="pointer-events-none absolute inset-0 "
        aria-hidden
      />

      <div className={marketingSectionContainerClass}>
        <header className="relative mx-auto mb-10 max-w-2xl text-center sm:mb-12 ">
          <p className={cn(marketingEyebrowClass, "mb-4 inline-flex items-center gap-1.5")}>
            <Sparkles
              className="h-3.5 w-3.5 text-[hsl(var(--section-accent-h)_var(--section-accent-s)_var(--section-accent-l))]"
              aria-hidden
            />
            {CUSTOMER_SUCCESS_GRID_HEADING.eyebrow}
          </p>
          <h2
            id="customer-success-grid-title"
            className="m-0 text-balance text-2xl font-semibold tracking-tight text-foreground sm:text-3xl lg:text-4xl"
          >
            {CUSTOMER_SUCCESS_GRID_HEADING.title}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            {CUSTOMER_SUCCESS_GRID_HEADING.description}
          </p>
        </header>

        <motion.div
          className="relative grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6 "
          variants={gridVariants}
          initial="hidden"
          animate={show ? "visible" : "hidden"}
        >
          {CUSTOMER_SUCCESS_STORIES.map((story) => (
            <SuccessStoryCard key={story.id} story={story} animate={animateCards} />
          ))}
        </motion.div>
      </div>

      <svg width="0" height="0" aria-hidden className="absolute overflow-hidden">
        <defs>
          <clipPath id="case-study-customer-success-card-clip" clipPathUnits="objectBoundingBox">
            <path d="M0 0.0417599C0 0.0186966 0.0250721 0 0.056 0H0.6105C0.641428 0 0.6665 0.0186965 0.6665 0.0417599V0.148024C0.6665 0.171087 0.691572 0.189784 0.7225 0.189784H0.944C0.974928 0.189784 1 0.20848 1 0.231544V0.95824C1 0.981303 0.974928 1 0.944 1H0.056C0.0250721 1 0 0.981303 0 0.95824V0.0417599Z" />
          </clipPath>
        </defs>
      </svg>
    </section>
  );
}
