"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  BarChart2,
  Bell,
  BellRing,
  Brain,
  CalendarCheck,
  CalendarDays,
  CheckCheck,
  ChevronLeft,
  ChevronRight,
  Clock,
  Database,
  FileText,
  Filter,
  Flame,
  Languages,
  ListChecks,
  MessageSquare,
  PhoneCall,
  PhoneIncoming,
  PhoneOutgoing,
  Plug,
  RotateCcw,
  Search,
  Settings,
  ShieldCheck,
  Star,
  Tag,
  UserCheck,
  UserPlus,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";

export type IndustryServiceCard = {
  title: string;
  description: string;
  icon: string;
};

const ICONS: Record<string, LucideIcon> = {
  PhoneIncoming,
  PhoneOutgoing,
  CalendarDays,
  Filter,
  BellRing,
  FileText,
  UserCheck,
  MessageSquare,
  Clock,
  Plug,
  Languages,
  BarChart2,
  Settings,
  Database,
  ShieldCheck,
  Brain,
  Wrench,
  CheckCheck,
  UserPlus,
  Bell,
  Tag,
  Search,
  Flame,
  Star,
  RotateCcw,
  PhoneCall,
  ListChecks,
  CalendarCheck,
};

const SERVICE_CARD_THEMES = [
  {
    surface: "bg-[#EEEDFE]",
    iconWrap: "bg-white/80 text-[#534AB7] ring-[#D4D0F7]",
    title: "text-[#3C3489]",
    glow: "rgba(83, 74, 183, 0.18)",
  },
  {
    surface: "bg-[#E1F5EE]",
    iconWrap: "bg-white/80 text-[#085041] ring-[#A7E8D6]",
    title: "text-[#064E3B]",
    glow: "rgba(29, 158, 117, 0.16)",
  },
  {
    surface: "bg-[#FAEEDA]",
    iconWrap: "bg-white/80 text-[#633806] ring-[#F0D9A8]",
    title: "text-[#78350F]",
    glow: "rgba(194, 113, 12, 0.14)",
  },
  {
    surface: "bg-[#E6F1FB]",
    iconWrap: "bg-white/80 text-[#0C447C] ring-[#B8D4F0]",
    title: "text-[#1E3A8A]",
    glow: "rgba(37, 99, 235, 0.14)",
  },
  {
    surface: "bg-[#FCEBEB]",
    iconWrap: "bg-white/80 text-[#A32D2D] ring-[#F0C4C4]",
    title: "text-[#7F1D1D]",
    glow: "rgba(220, 38, 38, 0.12)",
  },
] as const;

const EASE = [0.22, 1, 0.36, 1] as const;

/** Shortest-path offset on a ring — keeps cards visible on both sides (infinite loop). */
function getCircularOffset(index: number, active: number, count: number) {
  let offset = index - active;
  const half = count / 2;
  if (offset > half) offset -= count;
  if (offset < -half) offset += count;
  return offset;
}

function ServiceIcon({ name, className }: { name: string; className?: string }) {
  const Icon = ICONS[name] ?? PhoneIncoming;
  return <Icon className={className} aria-hidden />;
}

function cardMotion(offset: number, reducedMotion: boolean) {
  if (reducedMotion) {
    return {
      x: offset * 108,
      rotateY: 0,
      z: 0,
      scale: offset === 0 ? 1 : 0.94,
      opacity: offset === 0 ? 1 : Math.abs(offset) > 1 ? 0 : 0.55,
      zIndex: 30 - Math.abs(offset),
    };
  }

  const clamped = Math.max(-3, Math.min(3, offset));
  const abs = Math.abs(clamped);

  return {
    x: Math.round(clamped * 148),
    rotateY: clamped * -22,
    /* Keep active card on z=0 — translateZ blurs text under perspective */
    z: abs === 0 ? 0 : -abs * 64,
    scale: abs === 0 ? 1 : abs === 1 ? 0.88 : 0.8,
    opacity: abs === 0 ? 1 : abs === 1 ? 0.72 : abs === 2 ? 0.42 : 0,
    zIndex: 40 - abs,
  };
}

type IndustryServicesCarouselProps = {
  items: IndustryServiceCard[];
  className?: string;
};

export function IndustryServicesCarousel({ items, className }: IndustryServicesCarouselProps) {
  const reducedMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const dragStartX = useRef(0);
  const count = items.length;

  const go = useCallback(
    (index: number) => {
      if (count === 0) return;
      setActive(((index % count) + count) % count);
    },
    [count],
  );

  const goPrev = useCallback(() => go(active - 1), [active, go]);
  const goNext = useCallback(() => go(active + 1), [active, go]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") goPrev();
      if (event.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goNext, goPrev]);

  if (count === 0) return null;

  return (
    <div className={cn("relative", className)}>
      <div
        className="relative mx-auto flex min-h-[min(420px,72vw)] w-full max-w-[min(100%,56rem)] items-center justify-center overflow-visible px-2 sm:min-h-[440px] sm:px-6"
        style={{ perspective: reducedMotion ? undefined : "1100px" }}
        onPointerDown={(event) => {
          dragStartX.current = event.clientX;
        }}
        onPointerUp={(event) => {
          const delta = event.clientX - dragStartX.current;
          if (Math.abs(delta) < 48) return;
          if (delta < 0) goNext();
          else goPrev();
        }}
      >
        <div
          className="relative h-[min(380px,78vw)] w-full max-w-4xl overflow-visible"
          style={{ transformStyle: "preserve-3d" }}
        >
          {items.map((item, index) => {
            const offset = getCircularOffset(index, active, count);
            const pose = cardMotion(offset, !!reducedMotion);
            const theme = SERVICE_CARD_THEMES[index % SERVICE_CARD_THEMES.length];
            const isActive = offset === 0;

            if (Math.abs(offset) > 3) return null;

            return (
              <motion.button
                key={`${item.title}-${index}`}
                type="button"
                aria-label={`${item.title}${isActive ? " (selected)" : ""}`}
                aria-current={isActive ? "true" : undefined}
                onClick={() => go(index)}
                initial={false}
                animate={{
                  x: pose.x,
                  y: "-50%",
                  rotateY: pose.rotateY,
                  z: pose.z,
                  scale: pose.scale,
                  opacity: pose.opacity,
                }}
                transition={{ duration: 0.72, ease: EASE }}
                className={cn(
                  "absolute left-1/2 top-1/2 w-[min(100%,25.5rem)] -translate-x-1/2 text-left",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#534AB7]/35 focus-visible:ring-offset-2",
                  !isActive && "cursor-pointer",
                )}
                style={{
                  zIndex: pose.zIndex,
                  transformStyle: "preserve-3d",
                  backfaceVisibility: "hidden",
                  WebkitFontSmoothing: "antialiased",
                  pointerEvents: Math.abs(offset) > 2 ? "none" : "auto",
                }}
              >
                <div
                  className={cn(
                    "relative overflow-hidden rounded-[1.35rem] border p-6 sm:p-7",
                    "transition-shadow duration-500",
                    "subpixel-antialiased",
                    theme.surface,
                    isActive
                      ? "border-[#534AB7]/25 shadow-[0_28px_60px_-28px_rgba(83,74,183,0.45),0_12px_28px_-16px_rgba(15,23,42,0.18)]"
                      : "border-white/70 shadow-[0_16px_40px_-28px_rgba(15,23,42,0.22)]",
                  )}
                  style={{ transform: "translateZ(0.1px)" }}
                >
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -right-8 -top-10 h-32 w-32 rounded-full blur-3xl"
                    style={{ background: theme.glow }}
                  />

                  <div
                    className={cn(
                      "relative mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl ring-1",
                      theme.iconWrap,
                    )}
                  >
                    <ServiceIcon name={item.icon} className="h-5.5 w-5.5" />
                  </div>

                  <h3 className={cn("relative text-lg font-semibold ", theme.title)}>
                    {item.title}
                  </h3>
                  <p className="relative mt-3 text-sm leading-relaxed text-foreground/72">
                    {item.description}
                  </p>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      <div className="flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={goPrev}
          aria-label="Previous service"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/70 bg-background text-foreground shadow-sm transition-colors hover:border-[#534AB7]/30 hover:bg-[#EEEDFE]"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        <div className="flex items-center gap-2">
          {items.map((item, index) => (
            <button
              key={`dot-${item.title}-${index}`}
              type="button"
              aria-label={`Go to ${item.title}`}
              onClick={() => go(index)}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                index === active
                  ? "w-7 bg-[#534AB7]"
                  : "w-2 bg-[#534AB7]/25 hover:bg-[#534AB7]/45",
              )}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={goNext}
          aria-label="Next service"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/70 bg-background text-foreground shadow-sm transition-colors hover:border-[#534AB7]/30 hover:bg-[#EEEDFE]"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
