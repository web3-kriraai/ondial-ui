"use client";

import { CalendarCheck, DollarSign, PhoneCall, TrendingUp } from "lucide-react";
import { motion, useInView, useReducedMotion, type Variants } from "framer-motion";
import { useRef, type CSSProperties, type ElementType } from "react";

import { ONDIAL_ACCENT_STYLE } from "@/components/marketing/split-screen-section";
import { TextReveal } from "@/components/ui/text-reveal";
import {
  marketingEyebrowClass,
  marketingSectionContainerClass,
} from "@/config/marketing-layout";
import {
  CASE_STUDY_HERO_CONTENT,
  CASE_STUDY_HERO_METRICS,
  type CaseStudyHeroMetric,
  type CaseStudyHeroMetricId,
} from "@/data/case-study-hero-content";
import { cn } from "@/lib/utils";

const easeOut = [0.22, 1, 0.36, 1] as const;

const metricIcon: Record<CaseStudyHeroMetricId, ElementType> = {
  revenue: DollarSign,
  calls: PhoneCall,
  "answer-rate": TrendingUp,
  bookings: CalendarCheck,
};

const metricTone: Record<CaseStudyHeroMetricId, { icon: string; glow: string }> = {
  revenue: {
    icon: "bg-[#E1F5EE] text-[#085041]",
    glow: "shadow-[0_20px_48px_-28px_rgb(8_80_65/0.28)]",
  },
  calls: {
    icon: "bg-[#EEEDFE] text-[#534AB7]",
    glow: "shadow-[0_20px_48px_-28px_rgb(83_74_183/0.28)]",
  },
  "answer-rate": {
    icon: "bg-[#E6F1FB] text-[#0C447C]",
    glow: "shadow-[0_20px_48px_-28px_rgb(12_68_124/0.24)]",
  },
  bookings: {
    icon: "bg-[#FAEEDA] text-[#633806]",
    glow: "shadow-[0_20px_48px_-28px_rgb(217_119_6/0.24)]",
  },
};

const FLOAT_POSITIONS: Record<
  CaseStudyHeroMetricId,
  { top: string; left?: string; right?: string; floatDelay: number; rotate: number }
> = {
  revenue: { top: "8%", left: "2%", floatDelay: 0, rotate: -4 },
  calls: { top: "54%", left: "6%", floatDelay: 0.55, rotate: 3 },
  "answer-rate": { top: "14%", right: "2%", floatDelay: 0.25, rotate: 4 },
  bookings: { top: "58%", right: "5%", floatDelay: 0.8, rotate: -3 },
};

const stageVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.92 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: easeOut },
  },
};

function MetricCard({
  metric,
  className,
  show,
  prefersReducedMotion,
  floating = false,
}: {
  metric: CaseStudyHeroMetric;
  className?: string;
  show: boolean;
  prefersReducedMotion: boolean | null;
  floating?: boolean;
}) {
  const Icon = metricIcon[metric.id];
  const tone = metricTone[metric.id];
  const position = FLOAT_POSITIONS[metric.id];

  const cardClassName = cn(
    "flex min-w-38 flex-col gap-3 rounded-2xl border border-border/60 bg-white p-4 sm:min-w-42 sm:p-[1.15rem]",
    "shadow-[0_1px_0_rgb(255_255_255/0.95)_inset,0_16px_40px_-24px_rgb(15_23_42/0.14)]",
    "transition-[box-shadow] duration-300 ease-out motion-reduce:transition-none",
    "hover:shadow-[0_1px_0_rgb(255_255_255/0.98)_inset,0_24px_48px_-22px_rgb(15_23_42/0.16)]",
    tone.glow,
  );

  const cardContent = (
    <>
      <span
        className={cn("grid h-10 w-10 place-items-center rounded-xl", tone.icon)}
        aria-hidden
      >
        <Icon className="h-4.5 w-4.5" strokeWidth={1.75} />
      </span>
      <div className="text-left">
        <p className="m-0 text-[clamp(1.35rem,2.5vw,1.75rem)] font-bold leading-none tracking-tight text-[hsl(var(--section-accent-h)_var(--section-accent-s)_var(--section-accent-l))]">
          {metric.value}
        </p>
        <p className="m-0 mt-1.5 text-sm font-semibold leading-snug text-foreground">
          {metric.label}
        </p>
      </div>
    </>
  );

  if (floating) {
    return (
      <motion.div
        variants={cardVariants}
        className={cn("absolute z-5", className)}
        style={
          {
            top: position.top,
            left: position.left,
            right: position.right,
            rotate: `${position.rotate}deg`,
          } as CSSProperties
        }
      >
        <motion.div
          animate={
            show && !prefersReducedMotion ? { y: [0, -8, 0] } : { y: 0 }
          }
          transition={
            show && !prefersReducedMotion
              ? {
                  y: {
                    duration: 4.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: position.floatDelay,
                  },
                }
              : undefined
          }
          className={cardClassName}
        >
          {cardContent}
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.article
      variants={cardVariants}
      className={cn(
        cardClassName,
        "transition-[transform,box-shadow] duration-300 ease-out",
        "hover:-translate-y-1",
        className,
      )}
    >
      {cardContent}
    </motion.article>
  );
}

export function CaseStudyHeroSection() {
  const prefersReducedMotion = useReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);
  const stageInView = useInView(stageRef, { once: true, amount: 0.2 });
  const show = prefersReducedMotion || stageInView;

  const [titleLineOne, titleLineTwo, titleLineThree] = CASE_STUDY_HERO_CONTENT.titleLines;

  return (
    <section
      id="case-study-hero"
      className="relative overflow-hidden bg-background pb-[clamp(2.5rem,4vw,2rem)] pt-[clamp(2.25rem,5vw,3.5rem)]"
      style={ONDIAL_ACCENT_STYLE}
      aria-labelledby="case-study-hero-title"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div
          className="absolute left-1/2 top-[12%] h-[min(36rem,90vw)] w-[min(36rem,90vw)] -translate-x-1/2 rounded-full opacity-80"
          style={{
            background:
              "radial-gradient(circle, hsl(var(--section-accent-h) var(--section-accent-s) var(--section-accent-l) / 0.08) 0%, transparent 68%)",
          }}
        />
        <div
          className="absolute -left-[10%] top-[28%] h-64 w-64 rounded-full blur-3xl"
          style={{ background: "rgb(225 245 238 / 0.55)" }}
        />
        <div
          className="absolute -right-[8%] top-[22%] h-72 w-72 rounded-full blur-3xl"
          style={{ background: "rgb(238 237 254 / 0.65)" }}
        />
      </div>

      <div className={marketingSectionContainerClass}>
        <div
          ref={stageRef}
          className="relative mx-auto min-h-[clamp(28rem,72vw,36rem)] max-w-6xl lg:min-h-136 xl:min-h-144"
        >
          <motion.div
            className="pointer-events-none absolute inset-0 hidden lg:block"
            variants={stageVariants}
            initial="hidden"
            animate={show ? "visible" : "hidden"}
            aria-hidden
          >
            {CASE_STUDY_HERO_METRICS.map((metric) => (
              <MetricCard
                key={metric.id}
                metric={metric}
                show={show}
                prefersReducedMotion={prefersReducedMotion}
                floating
                className="pointer-events-auto"
              />
            ))}
          </motion.div>

          <header className="relative z-10 mx-auto flex max-w-2xl flex-col items-center px-2 text-center lg:pt-[clamp(3rem,8vw,5rem)]">
            <p className={cn(marketingEyebrowClass, "mb-4")}>
              {CASE_STUDY_HERO_CONTENT.eyebrow}
            </p>

            <h1
              id="case-study-hero-title"
              className="m-0 text-balance text-[clamp(2.125rem,5.5vw,3.75rem)] font-semibold leading-[1.12] tracking-tight text-foreground"
            >
              <TextReveal as="span" className="block" delay={0.05} stagger={0.07} inViewAmount={0.45}>
                {titleLineOne}
              </TextReveal>
              <TextReveal as="span" className="block" delay={0.1} stagger={0.07} inViewAmount={0.45}>
                {titleLineTwo}
              </TextReveal>
              <TextReveal
                as="span"
                className="block leading-snug text-[hsl(var(--section-accent-h)_var(--section-accent-s)_var(--section-accent-l))]"
                delay={0.15}
                stagger={0.07}
                inViewAmount={0.45}
              >
                {titleLineThree}
              </TextReveal>
            </h1>

            <TextReveal
              as="p"
              className="mx-auto mt-5 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg"
              delay={0.22}
              stagger={0.028}
              inViewAmount={0.4}
            >
              {CASE_STUDY_HERO_CONTENT.description}
            </TextReveal>
          </header>

          <motion.div
            className="relative z-10 mt-10 grid grid-cols-2 gap-3 px-1 sm:gap-4 lg:hidden"
            variants={stageVariants}
            initial="hidden"
            animate={show ? "visible" : "hidden"}
          >
            {CASE_STUDY_HERO_METRICS.map((metric) => (
              <MetricCard
                key={metric.id}
                metric={metric}
                show={show}
                prefersReducedMotion={prefersReducedMotion}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
