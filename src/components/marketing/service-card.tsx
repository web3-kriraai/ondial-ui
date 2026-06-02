"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { SERVICE_MATTE_COLORS } from "@/lib/services-data";
import { cn } from "@/lib/utils";

type ServiceCardProps = {
  id: number | string;
  title: string;
  description: string;
  image: string;
  bgColor: string; // Tailwind bg class
  link: string;
  className?: string;
};

// Map tailwind bg colors to hex for SVG fill
const BG_COLOR_MAP = Object.fromEntries(
  SERVICE_MATTE_COLORS.map((hex) => [`bg-[${hex}]`, hex]),
) as Record<string, string>;

type ServiceCardInnerProps = ServiceCardProps;

function ServiceCardInner(props: ServiceCardInnerProps) {
  const { title, description, bgColor, className } = props;
  void props.image;
  void props.link;
  void props.id;
  const fillColor = BG_COLOR_MAP[bgColor] || SERVICE_MATTE_COLORS[0];

  return (
    <div
      className={cn(
        "relative flex h-full w-full flex-col overflow-hidden text-white transition-opacity duration-300",
        "px-5 pb-10 pt-6 sm:px-6 sm:pb-11 sm:pt-7 lg:px-8 lg:pb-12 lg:pt-8",
        className,
      )}
    >
      <div className="absolute inset-0 z-0">
        <svg
          viewBox="0 0 360 240"
          className="h-full w-full"
          preserveAspectRatio="none"
          shapeRendering="geometricPrecision"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 80 V200 C0 222 18 240 40 240 H284 C300 240 312 228 312 212 C312 190 330 176 350 176 C356 176 360 172 360 166 V40 C360 18 342 0 320 0 H40 C18 0 0 18 0 40 Z"
            fill={fillColor}
          />
        </svg>
      </div>

      <div className="relative z-10 flex min-h-0 flex-1 flex-col pr-10 sm:pr-11 lg:pr-12">
        <div className="flex min-h-0 flex-1 flex-col gap-3 sm:gap-3.5 lg:gap-4">
          <h3
            className={cn(
              "w-full max-w-full shrink-0 text-pretty font-semibold tracking-tight",
              "line-clamp-2 text-[clamp(1.05rem,1.2vw+0.9rem,1.9rem)] leading-[1.12]",
            )}
          >
            {title}
          </h3>
          <p
            className={cn(
              "w-full max-w-full min-w-0 text-pretty font-normal text-white/90 wrap-anywhere",
              "line-clamp-5 text-[clamp(0.78rem,0.32vw+0.72rem,1rem)] leading-normal sm:line-clamp-5 lg:line-clamp-6",
            )}
          >
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function ServiceCard(props: ServiceCardProps) {
  return <ServiceCardInner {...props} />;
}

export function ServiceCardWithButton(props: ServiceCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="group w-full"
    >
      <div className="relative aspect-3/2 w-full min-h-58 sm:min-h-0">
        <ServiceCardInner
          {...props}
          className="h-full rounded-[1.35rem] sm:rounded-[1.5rem]"
        />
        <Link
          href={props.link}
          className={cn(
            "absolute bottom-2 right-2 z-20 flex shrink-0 items-center justify-center rounded-full bg-black text-white transition-all hover:scale-110 active:scale-95 sm:bottom-2.5 sm:right-2.5",
            "h-10 w-10 md:h-12 md:w-12 lg:h-[3.55rem] lg:w-[3.55rem]",
          )}
        >
          <ArrowRight
            className="-rotate-45 size-5 md:size-7 lg:size-8"
          />
        </Link>
      </div>
    </motion.div>
  );
}
