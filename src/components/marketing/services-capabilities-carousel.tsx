"use client";

import {
  BookOpen,
  BrainCircuit,
  Building2,
  ChevronLeft,
  ChevronRight,
  Compass,
  Database,
  FileText,
  Filter,
  Globe2,
  HeartPulse,
  Languages,
  LineChart,
  MessagesSquare,
  Network,
  PhoneCall,
  PhoneForwarded,
  Share2,
  Target,
  Wand2,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import type { EmblaCarouselType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";

import type { ServicesCapability } from "@/data/services-capabilities-content";
import { cn } from "@/lib/utils";

import styles from "./services-capabilities-carousel.module.css";

const ICON_MAP: Record<string, LucideIcon> = {
  "phone-forwarded": PhoneForwarded,
  database: Database,
  "heart-pulse": HeartPulse,
  network: Network,
  messages: MessagesSquare,
  languages: Languages,
  share: Share2,
  building: Building2,
  globe: Globe2,
  wand: Wand2,
  brain: BrainCircuit,
  book: BookOpen,
  workflow: Workflow,
  filter: Filter,
  "chart-line": LineChart,
  file: FileText,
  compass: Compass,
  target: Target,
};

function resolveIcon(key: string): LucideIcon {
  return ICON_MAP[key] ?? PhoneCall;
}

const slideBasisClasses =
  "min-w-0 shrink-0 grow-0 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4";

function CapabilityCard({ capability }: { capability: ServicesCapability }) {
  const Icon = resolveIcon(capability.iconKey);

  return (
    <article className={styles.capabilityCard}>
      <span
        className={styles.capabilityIcon}
        style={{ background: capability.iconBg, color: capability.iconColor }}
        aria-hidden
      >
        <Icon className="size-5" strokeWidth={1.85} />
      </span>
      <h3 className={styles.capabilityTitle}>{capability.title}</h3>
      <p className={styles.capabilityText}>{capability.description}</p>
    </article>
  );
}

type ServicesCapabilitiesCarouselProps = {
  capabilities: readonly ServicesCapability[];
  className?: string;
  autoplayDelayMs?: number;
};

export function ServicesCapabilitiesCarousel({
  capabilities,
  className,
  autoplayDelayMs = 3200,
}: ServicesCapabilitiesCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: true,
    dragFree: false,
    skipSnaps: false,
  });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const syncButtons = useCallback((api: EmblaCarouselType) => {
    setCanScrollPrev(api.canScrollPrev());
    setCanScrollNext(api.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    syncButtons(emblaApi);
    emblaApi.on("select", syncButtons).on("reInit", syncButtons);

    return () => {
      emblaApi.off("select", syncButtons).off("reInit", syncButtons);
    };
  }, [emblaApi, syncButtons]);

  /** Advance one slide on an interval; pause while hovering so users can read without fighting the timer. */
  useEffect(() => {
    if (!emblaApi) return;

    let paused = false;
    const onEnter = () => {
      paused = true;
    };
    const onLeave = () => {
      paused = false;
    };

    const rootNode = emblaApi.rootNode();
    rootNode.addEventListener("pointerenter", onEnter);
    rootNode.addEventListener("pointerleave", onLeave);

    const id = window.setInterval(() => {
      if (!paused) emblaApi.scrollNext();
    }, autoplayDelayMs);

    return () => {
      window.clearInterval(id);
      rootNode.removeEventListener("pointerenter", onEnter);
      rootNode.removeEventListener("pointerleave", onLeave);
    };
  }, [emblaApi, autoplayDelayMs]);

  return (
    <div className={cn(styles.carouselRoot, className)}>
      <div className={styles.viewport} ref={emblaRef}>
        <div className={styles.track}>
          {capabilities.map((capability) => (
            <div key={capability.id} className={cn(slideBasisClasses, styles.slide)}>
              <CapabilityCard capability={capability} />
            </div>
          ))}
        </div>
      </div>

      <div className={styles.navRow}>
        <button
          type="button"
          className={styles.navBtn}
          aria-label="Previous capability"
          disabled={!canScrollPrev}
          onClick={() => emblaApi?.scrollPrev()}
        >
          <ChevronLeft className="size-5" strokeWidth={2.25} aria-hidden />
        </button>
        <button
          type="button"
          className={styles.navBtn}
          aria-label="Next capability"
          disabled={!canScrollNext}
          onClick={() => emblaApi?.scrollNext()}
        >
          <ChevronRight className="size-5" strokeWidth={2.25} aria-hidden />
        </button>
      </div>
    </div>
  );
}
