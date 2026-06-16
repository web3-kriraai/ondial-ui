"use client";

import { MapPin, Quote, Sparkles, TrendingUp } from "lucide-react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

import { ONDIAL_ACCENT_STYLE } from "@/components/marketing/split-screen-section";
import {
  marketingEyebrowClass,
  marketingSectionContainerClass,
  marketingSectionShellClass,
} from "@/config/marketing-layout";
import { FEATURED_SUCCESS_STORY } from "@/data/case-study-featured-story-content";
import { cn } from "@/lib/utils";

const easeOut = [0.22, 1, 0.36, 1] as const;

function RevenueGrowthChart() {
  const { points, title, period } = FEATURED_SUCCESS_STORY.revenueChart;
  const width = 280;
  const height = 120;
  const padX = 8;
  const padY = 12;
  const chartW = width - padX * 2;
  const chartH = height - padY * 2;
  const max = Math.max(...points.map((p) => p.value));
  const min = Math.min(...points.map((p) => p.value)) - 8;

  const coords = points.map((point, index) => {
    const x = padX + (index / (points.length - 1)) * chartW;
    const y = padY + chartH - ((point.value - min) / (max - min)) * chartH;
    return { x, y, ...point };
  });

  const linePath = coords.map((c, i) => `${i === 0 ? "M" : "L"} ${c.x} ${c.y}`).join(" ");
  const areaPath = `${linePath} L ${coords[coords.length - 1]!.x} ${padY + chartH} L ${coords[0]!.x} ${padY + chartH} Z`;

  return (
    <div className="rounded-xl border border-white/70 bg-white/60 p-3 backdrop-blur-md">
      <div className="mb-2 flex items-center justify-between gap-2">
        <p className="m-0 text-[0.6875rem] font-semibold text-foreground">{title}</p>
        <span className="text-[0.625rem] font-medium text-muted-foreground">{period}</span>
      </div>
      <svg viewBox={`0 0 ${width} ${height}`} className="h-auto w-full" aria-hidden>
        <defs>
          <linearGradient id="featured-revenue-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(262 83% 58% / 0.28)" />
            <stop offset="100%" stopColor="hsl(262 83% 58% / 0.02)" />
          </linearGradient>
          <linearGradient id="featured-revenue-line" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#7C75E0" />
            <stop offset="100%" stopColor="#534AB7" />
          </linearGradient>
        </defs>
        {[0.25, 0.5, 0.75].map((ratio) => (
          <line
            key={ratio}
            x1={padX}
            x2={width - padX}
            y1={padY + chartH * ratio}
            y2={padY + chartH * ratio}
            stroke="rgb(15 23 42 / 0.06)"
            strokeWidth={1}
          />
        ))}
        <path d={areaPath} fill="url(#featured-revenue-fill)" />
        <path
          d={linePath}
          fill="none"
          stroke="url(#featured-revenue-line)"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {coords.map((c) => (
          <circle key={c.month} cx={c.x} cy={c.y} r={3.5} fill="#534AB7" stroke="white" strokeWidth={2} />
        ))}
      </svg>
      <div className="mt-1 flex justify-between px-1">
        {points.map((p) => (
          <span key={p.month} className="text-[0.5625rem] font-medium text-muted-foreground">
            {p.month}
          </span>
        ))}
      </div>
    </div>
  );
}

function BeforeAfterChart() {
  const { beforeLabel, afterLabel, beforeValue, afterValue, metric } =
    FEATURED_SUCCESS_STORY.beforeAfter;

  return (
    <div className="rounded-xl border border-white/70 bg-white/60 p-3 backdrop-blur-md">
      <p className="m-0 mb-3 text-[0.6875rem] font-semibold text-foreground">{metric}</p>
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-2">
          <span className="text-[0.625rem] font-medium uppercase tracking-wider text-muted-foreground">
            {beforeLabel}
          </span>
          <div className="relative h-24 overflow-hidden rounded-lg bg-slate-100/80">
            <motion.div
              className="absolute inset-x-0 bottom-0 rounded-lg bg-slate-300/90"
              initial={{ height: 0 }}
              whileInView={{ height: `${beforeValue}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: easeOut, delay: 0.2 }}
            />
            <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-sm font-bold text-slate-600">
              {beforeValue}%
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-[0.625rem] font-medium uppercase tracking-wider text-[#534AB7]">
            {afterLabel}
          </span>
          <div className="relative h-24 overflow-hidden rounded-lg bg-[#EEEDFE]/80">
            <motion.div
              className="absolute inset-x-0 bottom-0 rounded-lg bg-linear-to-t from-[#534AB7] to-[#7C75E0]"
              initial={{ height: 0 }}
              whileInView={{ height: `${afterValue}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: easeOut, delay: 0.35 }}
            />
            <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-sm font-bold text-white drop-shadow-sm">
              {afterValue}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function DashboardMockup() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-linear-to-br from-slate-50/90 via-white to-[#EEEDFE]/40 p-3 shadow-[inset_0_1px_0_rgb(255_255_255/0.9)] sm:p-4">
      <div
        className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full blur-3xl"
        style={{ background: "hsl(262 83% 58% / 0.12)" }}
        aria-hidden
      />
      <div className="relative z-1 mb-3 flex items-center gap-2">
        <span className="flex gap-1" aria-hidden>
          <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
          <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
          <span className="h-2 w-2 rounded-full bg-[#28c840]" />
        </span>
        <span className="text-[0.625rem] font-medium text-muted-foreground">OnDial Analytics</span>
        <span className="ml-auto inline-flex items-center gap-1 rounded-full border border-[#E1F5EE] bg-[#E1F5EE]/80 px-2 py-0.5 text-[0.5625rem] font-semibold text-[#085041]">
          <TrendingUp className="h-3 w-3" aria-hidden />
          Live
        </span>
      </div>
      <div className="relative z-1 flex flex-col gap-3">
        <BeforeAfterChart />
        <RevenueGrowthChart />
      </div>
    </div>
  );
}

export function CaseStudyFeaturedStorySection() {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });
  const show = prefersReducedMotion || isInView;

  const story = FEATURED_SUCCESS_STORY;

  return (
    <section
      ref={sectionRef}
      id="featured-success-story"
      className={marketingSectionShellClass}
      style={ONDIAL_ACCENT_STYLE}
      aria-labelledby="featured-story-title"
    >
      <div className={marketingSectionContainerClass}>
        <header className="mb-8 text-center sm:mb-10">
          <p className={cn(marketingEyebrowClass, "mb-4 inline-flex items-center gap-1.5")}>
            <Sparkles className="h-3.5 w-3.5 text-[hsl(var(--section-accent-h)_var(--section-accent-s)_var(--section-accent-l))]" aria-hidden />
            {story.eyebrow}
          </p>
          <h2
            id="featured-story-title"
            className="m-0 text-balance text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
          >
            How {story.company.name} scaled bookings across every location
          </h2>
        </header>

        <motion.article
          initial={prefersReducedMotion ? false : { opacity: 0, y: 28 }}
          animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
          transition={{ duration: 0.6, ease: easeOut }}
          className={cn(
            "group relative overflow-hidden rounded-[1.75rem] border border-border/50",
            "bg-linear-to-br from-white via-white to-slate-50/90",
            "shadow-[0_2px_4px_rgb(15_23_42/0.04),0_24px_64px_-28px_rgb(15_23_42/0.16)]",
            "transition-[box-shadow,border-color,transform] duration-500 ease-out",
            "hover:-translate-y-1 hover:border-[hsl(var(--section-accent-h)_var(--section-accent-s)_var(--section-accent-l)/0.18)]",
            "hover:shadow-[0_4px_8px_rgb(15_23_42/0.05),0_32px_80px_-24px_hsl(var(--section-accent-h)_var(--section-accent-s)_var(--section-accent-l)/0.14)]",
          )}
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-60"
            style={{
              background:
                "radial-gradient(ellipse 80% 50% at 100% 0%, hsl(var(--section-accent-h) var(--section-accent-s) var(--section-accent-l) / 0.06), transparent 55%)",
            }}
            aria-hidden
          />

          <div className="relative grid gap-8 p-6 sm:p-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)_minmax(0,1.1fr)] lg:items-center lg:gap-6 xl:gap-10 xl:p-10">
            {/* Left — company */}
            <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
              <div
                className={cn(
                  "mb-4 grid h-16 w-16 place-items-center rounded-2xl border border-border/60",
                  "bg-linear-to-br from-white to-slate-50 shadow-[0_8px_24px_-12px_rgb(15_23_42/0.18)]",
                  "transition-transform duration-300 group-hover:scale-[1.03]",
                )}
              >
                <span className="text-xl font-bold tracking-tight text-[#534AB7]">
                  {story.company.logoInitials}
                </span>
              </div>
              <h3 className="m-0 text-lg font-semibold tracking-tight text-foreground">
                {story.company.name}
              </h3>
              <div className="mt-3 flex flex-wrap items-center justify-center gap-2 lg:justify-start">
                <span className="inline-flex items-center rounded-full border border-[#EEEDFE] bg-[#EEEDFE]/60 px-2.5 py-1 text-[0.6875rem] font-semibold text-[#534AB7]">
                  {story.company.industry}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full border border-border/60 bg-white/80 px-2.5 py-1 text-[0.6875rem] font-medium text-muted-foreground backdrop-blur-sm">
                  <MapPin className="h-3 w-3 shrink-0" aria-hidden />
                  {story.company.location}
                </span>
              </div>
              <div className="relative py-6">
                <blockquote className="m-0 flex flex-1 items-start gap-3">
                  <Quote
                    className="mt-0.5 h-5 w-5 shrink-0 text-[hsl(var(--section-accent-h)_var(--section-accent-s)_var(--section-accent-l)/0.45)]"
                    aria-hidden
                  />
                  <p className="m-0 text-pretty text-base font-medium leading-relaxed text-foreground sm:text-lg">
                    &ldquo;{story.quote}&rdquo;
                  </p>
                </blockquote>
                <div className="flex items-center gap-3 mt-6">
                  <span
                    className="grid h-11 w-11 place-items-center rounded-full bg-linear-to-br from-[#534AB7] to-[#7C75E0] text-sm font-bold text-white shadow-[0_8px_20px_-8px_rgb(83_74_183/0.55)]"
                    aria-hidden
                  >
                    {story.author.initials}
                  </span>
                  <cite className="not-italic">
                    <span className="block text-sm font-semibold text-foreground">{story.author.name}</span>
                    <span className="block text-xs text-muted-foreground">{story.author.role}</span>
                  </cite>
                </div>
              </div>
            </div>

            {/* Center — metrics */}
            <div className="flex flex-col items-center border-y border-border/40 py-6 lg:border-x lg:border-y-0 lg:px-6 lg:py-0 xl:px-8">
              <p className="m-0 text-[clamp(2.75rem,6vw,4rem)] font-bold leading-none tracking-tight text-[hsl(var(--section-accent-h)_var(--section-accent-s)_var(--section-accent-l))]">
                {story.primaryMetric.value}
              </p>
              <p className="m-0 mt-2 text-center text-base font-semibold text-foreground sm:text-lg">
                {story.primaryMetric.label}
              </p>
              <div className="mt-6 grid w-full max-w-xs grid-cols-2 gap-3 sm:max-w-sm">
                {story.secondaryMetrics.map((metric) => (
                  <div
                    key={metric.label}
                    className={cn(
                      "rounded-xl border border-border/50 bg-white/70 px-3 py-3 text-center backdrop-blur-sm",
                      "transition-[transform,box-shadow,border-color] duration-300",
                      "hover:-translate-y-0.5 hover:border-border/80 hover:shadow-[0_8px_20px_-14px_rgb(15_23_42/0.12)]",
                    )}
                  >
                    <p className="m-0 text-xl font-bold tracking-tight text-foreground">{metric.value}</p>
                    <p className="m-0 mt-1 text-[0.6875rem] font-medium leading-snug text-muted-foreground">
                      {metric.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — dashboard */}
            <div className="min-w-0 transition-transform duration-500 group-hover:scale-[1.01]">
              <DashboardMockup />
            </div>
          </div>

          {/* Quote strip */}

        </motion.article>
      </div>
    </section>
  );
}
