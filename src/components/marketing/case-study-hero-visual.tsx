"use client";

import { ArrowUpRight, Building2, Phone, Star, TrendingUp, Users } from "lucide-react";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ElementType, ReactNode } from "react";

import {
  CASE_STUDIES,
  CASE_STUDY_PAGE_HERO,
  getCaseStudyHref,
} from "@/data/case-study-page-content";
import { cn } from "@/lib/utils";

const easeOut = [0.22, 1, 0.36, 1] as const;

const statIcons: ElementType[] = [Phone, Users, Building2, Star];
const statIconClasses = [
  "bg-[#DBF3EE] text-[#0F7A6B]",
  "bg-[#E1E9FE] text-[#1D4ED8]",
  "bg-[#EEE9FC] text-[#6D28D9]",
  "bg-[#FBEBD2] text-[#A05A06]",
];

const enterVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOut, delay: 0.05 + index * 0.15 },
  }),
};

const spotlight = CASE_STUDIES.find((item) => item.featured) ?? CASE_STUDIES[0]!;

function StatCard({
  className,
  index,
  prefersReducedMotion,
  children,
}: {
  className?: string;
  index: number;
  prefersReducedMotion: boolean | null;
  children: ReactNode;
}) {
  return (
    <motion.div
      custom={index}
      initial={prefersReducedMotion ? false : "hidden"}
      animate="visible"
      variants={enterVariants}
      className={cn(
        "rounded-2xl border border-[#E7E3F5] bg-background p-[18px] shadow-[0_12px_32px_-8px_rgb(42_14_99/0.18),0_2px_8px_rgb(21_16_31/0.06)]",
        className,
      )}
    >
      {children}
    </motion.div>
  );
}

export function CaseStudyHeroVisual() {
  const prefersReducedMotion = useReducedMotion();
  const stats = CASE_STUDY_PAGE_HERO.stats;

  return (
    <div
      className="relative max-lg:grid max-lg:max-w-[520px] max-lg:grid-cols-2 max-lg:gap-3.5 lg:h-[540px]"
      aria-label="Customer success highlights"
    >
      {/* 10M+ calls - top left */}
      <StatCard
        index={0}
        prefersReducedMotion={prefersReducedMotion}
        className="max-lg:static lg:absolute lg:top-0 lg:left-0 lg:w-[198px]"
      >
        <span className={cn("mb-3.5 grid size-[38px] place-items-center rounded-[11px]", statIconClasses[0])}>
          {(() => {
            const Icon = statIcons[0]!;
            return <Icon className="size-[18px]" strokeWidth={2} />;
          })()}
        </span>
        <p className="text-[26px] font-extrabold leading-none tracking-[-0.02em] text-[#15101F]">
          {stats[2]!.value}
        </p>
        <p className="mt-0.5 text-[13px] font-semibold text-[#7A748F]">{stats[2]!.label}</p>
      </StatCard>

      {/* 20+ industries - top right */}
      <StatCard
        index={1}
        prefersReducedMotion={prefersReducedMotion}
        className="max-lg:static lg:absolute lg:top-2 lg:right-0 lg:w-[168px]"
      >
        <span className={cn("mb-3.5 grid size-[38px] place-items-center rounded-[11px]", statIconClasses[1])}>
          {(() => {
            const Icon = statIcons[1]!;
            return <Icon className="size-[18px]" strokeWidth={2} />;
          })()}
        </span>
        <p className="text-[26px] font-extrabold leading-none tracking-[-0.02em] text-[#15101F]">
          {stats[1]!.value}
        </p>
        <p className="mt-0.5 text-[13px] font-semibold text-[#7A748F]">{stats[1]!.label}</p>
      </StatCard>

      {/* 500+ businesses - center */}
      <StatCard
        index={2}
        prefersReducedMotion={prefersReducedMotion}
        className="max-lg:col-span-2 max-lg:static lg:absolute lg:top-[152px] lg:left-[108px] lg:w-[236px]"
      >
        <span className={cn("mb-3.5 grid size-[38px] place-items-center rounded-[11px]", statIconClasses[2])}>
          {(() => {
            const Icon = statIcons[2]!;
            return <Icon className="size-[18px]" strokeWidth={2} />;
          })()}
        </span>
        <p className="text-[26px] font-extrabold leading-none tracking-[-0.02em] text-[#15101F]">
          {stats[0]!.value}
        </p>
        <p className="mt-0.5 text-[13px] font-semibold text-[#7A748F]">{stats[0]!.label}</p>
        <span className="mt-2.5 inline-flex items-center gap-1 rounded-full bg-[#DDF6E8] px-2 py-1 font-mono text-[11.5px] font-semibold text-[#157A4A]">
          <TrendingUp className="size-[11px]" strokeWidth={2.5} aria-hidden />
          +40% avg growth
        </span>
      </StatCard>

      {/* Featured story - bottom left */}
      <StatCard
        index={3}
        prefersReducedMotion={prefersReducedMotion}
        className="max-lg:col-span-2 max-lg:static lg:absolute lg:top-[336px] lg:left-0 lg:w-[252px]"
      >
        <Link href={getCaseStudyHref(spotlight.id)} prefetch className="group block no-underline">
          <span className="mb-2.5 inline-flex items-center gap-1 rounded-full bg-[#EEE9FC] px-2 py-1 font-mono text-[10.5px] font-semibold tracking-[0.04em] text-[#6D28D9] uppercase">
            <Star className="size-[11px]" aria-hidden fill="currentColor" />
            Featured
          </span>
          <h4 className="mb-3.5 text-[15.5px] leading-[1.3] font-bold text-[#15101F]">
            {spotlight.headline}
          </h4>
          <div className="flex items-center justify-between gap-2">
            <span className="flex min-w-0 items-center gap-2 text-[12.5px] font-semibold text-[#4B4566]">
              <span className="flex size-[22px] shrink-0 items-center justify-center rounded-[7px] bg-[#EEE9FC] font-mono text-[10px] font-bold text-[#6D28D9]">
                {spotlight.avatar}
              </span>
              <span className="truncate">{spotlight.company}</span>
            </span>
            <span className="flex shrink-0 items-center gap-1 text-[12.5px] font-bold text-[#7C3AED]">
              Read
              <ArrowUpRight className="size-3" aria-hidden strokeWidth={2.6} />
            </span>
          </div>
        </Link>
      </StatCard>

      {/* 4.9 CSAT - bottom right */}
      <StatCard
        index={4}
        prefersReducedMotion={prefersReducedMotion}
        className="max-lg:static lg:absolute lg:top-[316px] lg:right-2 lg:w-[168px]"
      >
        <span className={cn("mb-3.5 grid size-[38px] place-items-center rounded-[11px]", statIconClasses[3])}>
          {(() => {
            const Icon = statIcons[3]!;
            return <Icon className="size-[18px]" strokeWidth={2} fill="currentColor" />;
          })()}
        </span>
        <p className="text-[26px] font-extrabold leading-none tracking-[-0.02em] text-[#15101F]">
          {stats[3]!.value}
        </p>
        <p className="mt-0.5 text-[13px] font-semibold text-[#7A748F]">{stats[3]!.label}</p>
      </StatCard>
    </div>
  );
}
