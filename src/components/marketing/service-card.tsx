"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { type CSSProperties } from "react";

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

/** Match ~90% browser zoom while the user is at 100% zoom (uniform scale). */
const ZOOM_90 = 0.9;

/**
 * Reference size in rem → output rem string at 90% visual scale.
 */
function rem90(baseRem: number): string {
  const v = Math.round(baseRem * ZOOM_90 * 1000) / 1000;
  return `${v}rem`;
}

// Map tailwind bg colors to hex for SVG fill
const BG_COLOR_MAP: Record<string, string> = {
  "bg-[#5D57A3]": "#5D57A3",
  "bg-[#0057C7]": "#0057C7",
  "bg-[#6A7036]": "#6A7036",
  "bg-[#BA6A36]": "#BA6A36",
  "bg-[#4A4E69]": "#4A4E69",
};

type ServiceCardInnerProps = ServiceCardProps;

function ServiceCardInner(props: ServiceCardInnerProps) {
  const { title, description, bgColor, className } = props;
  void props.image;
  void props.link;
  void props.id;
  const fillColor = BG_COLOR_MAP[bgColor] || "#5D57A3";

  // Keep card text block position consistent on all devices.
  const paddingRem = rem90(2.75);
  const titleFontRem = rem90(2.0625);

  const titleStyle: CSSProperties = {
    fontSize: titleFontRem,
    maxWidth: "100%",
    lineHeight: 1.1,
  };

  const descriptionVars = {
    ["--service-desc-fs" as string]: rem90(0.875),
  } as CSSProperties;

  return (
    <div
      className={cn(
        "relative flex h-full min-h-0 w-full flex-col overflow-hidden font-semibold tracking-tight text-white transition-opacity duration-300",
        className,
      )}
      style={{ padding: paddingRem }}
    >
      <div className="absolute inset-0 z-0">
        <svg
          viewBox="160 40 360 240"
          className="h-full w-full drop-shadow-xl"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M160 120 L160 240 Q160 280 200 280 H440 Q460 280 460 260 Q460 220 500 220 Q520 220 520 200 V80 Q520 40 480 40 H200 Q160 40 160 80 Z"
            fill={fillColor}
          />
        </svg>
      </div>

      <div className="relative z-10 flex min-h-0 flex-1 flex-col overflow-hidden pb-10 pr-[2.65rem] pt-0 sm:pb-11 sm:pr-[2.85rem] md:pb-12 md:pr-10 lg:pr-12">
        <div
          className={cn(
            "flex w-full max-w-full min-w-0 flex-1 flex-col",
            "gap-3 sm:gap-3.5 md:gap-4",
            "max-md:overflow-hidden",
            "md:min-h-0 md:overflow-y-auto md:overflow-x-hidden md:overscroll-contain md:[-webkit-overflow-scrolling:touch]",
          )}
        >
          <h3
            className="w-full max-w-full shrink-0 text-pretty text-inherit max-md:line-clamp-2 max-md:!text-[clamp(0.95rem,2.4vw+0.55rem,1.35rem)]"
            style={titleStyle}
          >
            {title}
          </h3>
          <p
            className={cn(
              "w-full max-w-full min-w-0 text-pretty font-normal text-white/90 [overflow-wrap:anywhere] [text-wrap:pretty]",
              "max-md:text-[clamp(0.65rem,1.15vw+0.48rem,0.8rem)] max-md:leading-[1.38] max-md:line-clamp-7 max-md:overflow-hidden",
              "md:leading-relaxed md:line-clamp-none md:[font-size:var(--service-desc-fs)]",
            )}
            style={descriptionVars}
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
  const topOffset = rem90(1.1);
  const linkInset = rem90(0.275);
  const hoverLiftRem = `${-(Math.round((11 / 16) * ZOOM_90 * 1000) / 1000)}rem`;

  return (
    <motion.div
      whileHover={{ y: hoverLiftRem }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="group relative aspect-[360/240] w-full"
      style={{ paddingTop: topOffset }}
    >
      <div className="absolute inset-0" style={{ top: topOffset }}>
        <ServiceCardInner {...props} />
      </div>

      <div className="absolute bottom-0 z-20" style={{ right: linkInset }}>
        <Link
          href={props.link}
          className={cn(
            "flex shrink-0 items-center justify-center rounded-full bg-black text-white shadow-lg transition-all hover:scale-110 active:scale-95",
            "h-10 w-10 md:h-12 md:w-12 lg:h-[3.55rem] lg:w-[3.55rem] ",
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
