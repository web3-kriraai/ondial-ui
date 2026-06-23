"use client";

import { useId } from "react";
import { motion } from "framer-motion";
import type { IndustryStat } from "@/data/industry-hero-content";
import { cn } from "@/lib/utils";

/** Bento mask - desktop canvas 1130 × 310 */
export const INDUSTRY_STATS_BENTO_PATH =
  "M 278 10 L 372 10 A 28 28 0 0 1 400 38 L 400 132 A 28 28 0 0 1 372 160 L 250 160 L 250 160 L 250 38 A 28 28 0 0 1 278 10 Z " +
  "M 368 10 L 462 10 A 28 28 0 0 1 490 38 L 490 160 L 490 160 L 368 160 A 28 28 0 0 1 340 132 L 340 38 A 28 28 0 0 1 368 10 Z " +
  "M 490 150 L 612 150 A 28 28 0 0 1 640 178 L 640 272 A 28 28 0 0 1 612 300 L 518 300 A 28 28 0 0 1 490 272 L 490 150 L 490 150 Z " +
  "M 128 150 L 250 150 L 250 150 L 250 272 A 28 28 0 0 1 222 300 L 128 300 A 28 28 0 0 1 100 272 L 100 178 A 28 28 0 0 1 128 150 Z " +
  "M 608 150 L 730 150 L 730 150 L 730 272 A 28 28 0 0 1 702 300 L 608 300 A 28 28 0 0 1 580 272 L 580 178 A 28 28 0 0 1 608 150 Z " +
  "M 38 150 L 132 150 A 28 28 0 0 1 160 178 L 160 272 A 28 28 0 0 1 132 300 L 38 300 A 28 28 0 0 1 10 272 L 10 178 A 28 28 0 0 1 38 150 Z " +
  "M 970 150 L 1092 150 A 28 28 0 0 1 1120 178 L 1120 272 A 28 28 0 0 1 1092 300 L 998 300 A 28 28 0 0 1 970 272 L 970 150 L 970 150 Z " +
  "M 848 10 L 942 10 A 28 28 0 0 1 970 38 L 970 160 L 970 160 L 848 160 A 28 28 0 0 1 820 132 L 820 38 A 28 28 0 0 1 848 10 Z " +
  "M 758 10 L 852 10 A 28 28 0 0 1 880 38 L 880 132 A 28 28 0 0 1 852 160 L 730 160 L 730 160 L 730 38 A 28 28 0 0 1 758 10 Z " +
  "M 250 122 C 250 143 244.4 150 222 150 H 250 Z " +
  "M 490 122 C 490 143 495.6 150 518 150 H 490 Z " +
  "M 490 188 C 490 167 484.4 160 462 160 H 490 Z " +
  "M 250 188 C 250 167 255.6 160 278 160 H 250 Z " +
  "M 730 188 C 730 167 735.6 160 758 160 H 730 Z " +
  "M 970 188 C 970 167 964.4 160 942 160 H 970 Z " +
  "M 970 122 C 970 143 975.6 150 998 150 H 970 Z " +
  "M 730 122 C 730 143 724.4 150 702 150 H 730 Z";

/** Bento mask - mobile canvas 330 × 590 */
const INDUSTRY_STATS_BENTO_MOBILE_PATH =
  "M 170 430 L 292 430 A 28 28 0 0 1 320 458 L 320 552 A 28 28 0 0 1 292 580 L 198 580 A 28 28 0 0 1 170 552 L 170 430 L 170 430 Z " +
  "M 48 290 L 170 290 L 170 290 L 170 440 L 170 440 L 48 440 A 28 28 0 0 1 20 412 L 20 318 A 28 28 0 0 1 48 290 Z " +
  "M 160 140 L 282 140 A 28 28 0 0 1 310 168 L 310 262 A 28 28 0 0 1 282 290 L 160 290 L 160 290 L 160 140 L 160 140 Z " +
  "M 38 10 L 132 10 A 28 28 0 0 1 160 38 L 160 160 L 160 160 L 38 160 A 28 28 0 0 1 10 132 L 10 38 A 28 28 0 0 1 38 10 Z " +
  "M 170 468 C 170 447 164.4 440 142 440 H 170 Z " +
  "M 170 402 C 170 423 175.6 430 198 430 H 170 Z " +
  "M 160 262 C 160 283 154.4 290 132 290 H 160 Z " +
  "M 170 318 C 170 297 175.6 290 198 290 H 170 Z " +
  "M 160 188 C 160 167 154.4 160 132 160 H 160 Z " +
  "M 160 112 C 160 133 165.6 140 188 140 H 160 Z";

const BENTO_W = 1130;
const BENTO_H = 310;
const BENTO_MOBILE_W = 330;
const BENTO_MOBILE_H = 590;

const BENTO_BG_IMAGE = "/marketing/industry-stats-bento-bg.jpg";

type StatSlot = {
  x: number;
  y: number;
  width: number;
  height: number;
};

/**
 * Desktop gap cells (1130×310) - [3×, 80%, 24/7, <2s]
 * Derived from blue-path bounds; content is flex-centered inside each cell.
 */
const DESKTOP_STAT_SLOTS: StatSlot[] = [
  /* top-left white */
  { x: 10, y: 14, width: 236, height: 132 },
  /* top-center white (between top blue pairs) */
  { x: 492, y: 14, width: 234, height: 132 },
  /* bottom-center-left white */
  { x: 252, y: 154, width: 234, height: 142 },
  /* bottom-right white */
  { x: 732, y: 154, width: 234, height: 142 },
];

/**
 * Mobile gap cells (330×590) - [3×, 80%, 24/7, <2s]
 */
const MOBILE_STAT_SLOTS: StatSlot[] = [
  /* top-right white */
  { x: 162, y: 12, width: 158, height: 124 },
  /* left-middle white */
  { x: 10, y: 144, width: 146, height: 142 },
  /* right-middle white */
  { x: 172, y: 294, width: 148, height: 132 },
  /* bottom-left white */
  { x: 10, y: 434, width: 156, height: 142 },
];

const BENTO_VALUE_CLASS =
  "font-semibold leading-none tracking-tight tabular-nums text-foreground text-[clamp(1.375rem,4.5vw,2rem)]";

const BENTO_LABEL_CLASS =
  "mt-1.5 text-pretty text-[clamp(0.6875rem,2.2vw,0.8125rem)] font-medium leading-snug text-muted-foreground";

const BENTO_VALUE_CLASS_MOBILE =
  "font-semibold leading-none tracking-tight tabular-nums text-foreground text-[clamp(1.25rem,6vw,1.5rem)]";

const BENTO_LABEL_CLASS_MOBILE =
  "mt-1 text-pretty text-[clamp(0.625rem,2.8vw,0.75rem)] font-medium leading-snug text-muted-foreground";

type IndustryStatsBentoProps = {
  stats: IndustryStat[];
  className?: string;
};

export function IndustryStatsBento({ stats, className }: IndustryStatsBentoProps) {
  const uid = useId().replace(/:/g, "");
  const items = stats.slice(0, 4);

  return (
    <div className={cn("mx-auto w-full", className)}>
      {/* Mobile - vertical bento */}
      <BentoPanel
        className="md:hidden max-w-[330px]"
        width={BENTO_MOBILE_W}
        height={BENTO_MOBILE_H}
        path={INDUSTRY_STATS_BENTO_MOBILE_PATH}
        slots={MOBILE_STAT_SLOTS}
        stats={items}
        idSuffix={`mobile-${uid}`}
        valueClassName={BENTO_VALUE_CLASS_MOBILE}
        labelClassName={BENTO_LABEL_CLASS_MOBILE}
      />

      {/* Tablet / desktop - horizontal bento */}
      <BentoPanel
        className="hidden md:block max-w-[clamp(480px,92%,1130px)]"
        width={BENTO_W}
        height={BENTO_H}
        path={INDUSTRY_STATS_BENTO_PATH}
        slots={DESKTOP_STAT_SLOTS}
        stats={items}
        idSuffix={`desktop-${uid}`}
        valueClassName={BENTO_VALUE_CLASS}
        labelClassName={BENTO_LABEL_CLASS}
      />
    </div>
  );
}

function BentoPanel({
  className,
  width,
  height,
  path,
  slots,
  stats,
  idSuffix,
  valueClassName,
  labelClassName,
}: {
  className?: string;
  width: number;
  height: number;
  path: string;
  slots: StatSlot[];
  stats: IndustryStat[];
  idSuffix: string;
  valueClassName: string;
  labelClassName: string;
}) {
  const clipId = `stats-bento-clip-${idSuffix}`;
  const shadowId = `stats-bento-shadow-${idSuffix}`;

  return (
    <div
      className={cn("relative mx-auto w-full", className)}
      style={{ aspectRatio: `${width} / ${height}` }}
    >
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Key performance statistics"
      >
        <defs>
          <clipPath id={clipId} clipPathUnits="userSpaceOnUse">
            <path d={path} />
          </clipPath>
          <filter
            id={shadowId}
            x="-4%"
            y="-4%"
            width="108%"
            height="112%"
            colorInterpolationFilters="sRGB"
          >
            <feDropShadow
              dx="0"
              dy="4"
              stdDeviation="6"
              floodColor="#1A2744"
              floodOpacity="0.22"
            />
            <feDropShadow
              dx="0"
              dy="1"
              stdDeviation="2"
              floodColor="#0F172A"
              floodOpacity="0.12"
            />
          </filter>
        </defs>

        <g filter={`url(#${shadowId})`}>
          <image
            href={BENTO_BG_IMAGE}
            x={0}
            y={0}
            width={width}
            height={height}
            preserveAspectRatio="xMidYMid slice"
            clipPath={`url(#${clipId})`}
          />
        </g>
      </svg>

      {stats.map((stat, i) => {
        const slot = slots[i];
        if (!slot) return null;

        return (
          <motion.div
            key={`${idSuffix}-${stat.label}`}
            className="absolute z-10 flex flex-col items-center justify-center px-1.5 text-center sm:px-2"
            style={{
              left: `${(slot.x / width) * 100}%`,
              top: `${(slot.y / height) * 100}%`,
              width: `${(slot.width / width) * 100}%`,
              height: `${(slot.height / height) * 100}%`,
            }}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.06 + i * 0.09, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className={valueClassName}>{stat.value}</p>
            <p className={labelClassName}>{stat.label}</p>
          </motion.div>
        );
      })}
    </div>
  );
}
