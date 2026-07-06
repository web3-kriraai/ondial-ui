"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useState, type ReactNode } from "react";
import type { EmblaCarouselType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";

import { cn } from "@/lib/utils";

import styles from "./country-cards-carousel.module.css";

type CountryCardsCarouselProps = {
  children: ReactNode[];
  className?: string;
  /** How many cards are visible at the largest breakpoint */
  visibleCount?: 2 | 3;
  autoplayDelayMs?: number;
};

export function CountryCardsCarousel({
  children,
  className,
  visibleCount = 3,
  autoplayDelayMs = 3600,
}: CountryCardsCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: children.length > visibleCount,
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

  useEffect(() => {
    if (!emblaApi || children.length <= visibleCount) return;

    let paused = false;
    const rootNode = emblaApi.rootNode();
    const onEnter = () => {
      paused = true;
    };
    const onLeave = () => {
      paused = false;
    };

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
  }, [autoplayDelayMs, children.length, emblaApi, visibleCount]);

  const showNav = children.length > 1;

  return (
    <div className={cn(styles.carouselRoot, className)}>
      <div className={styles.viewport} ref={emblaRef}>
        <div className={styles.track}>
          {children.map((child, index) => (
            <div
              key={index}
              className={cn(
                styles.slide,
                styles.slideOne,
                visibleCount >= 2 && styles.slideTwo,
                visibleCount >= 3 && styles.slideThree,
              )}
            >
              {child}
            </div>
          ))}
        </div>
      </div>

      {showNav ? (
        <div className={styles.navRow}>
          <button
            type="button"
            className={styles.navBtn}
            aria-label="Previous slide"
            disabled={!canScrollPrev}
            onClick={() => emblaApi?.scrollPrev()}
          >
            <ChevronLeft className="size-5" strokeWidth={2.25} aria-hidden />
          </button>
          <button
            type="button"
            className={styles.navBtn}
            aria-label="Next slide"
            disabled={!canScrollNext}
            onClick={() => emblaApi?.scrollNext()}
          >
            <ChevronRight className="size-5" strokeWidth={2.25} aria-hidden />
          </button>
        </div>
      ) : null}
    </div>
  );
}
