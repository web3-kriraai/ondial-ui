"use client";

import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef } from "react";

import { marketingSectionContainerClass } from "@/config/marketing-layout";
import { CASE_STUDY_QUOTES } from "@/data/case-study-page-content";

const AUTOPLAY_MS = 5500;

export function CaseStudyQuoteSection() {
  const autoplayRef = useRef<number | null>(null);
  const isPausedRef = useRef(false);

  const [viewportRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    containScroll: "trimSnaps",
    duration: 28,
  });

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    const startAutoplay = () => {
      if (autoplayRef.current !== null) {
        window.clearInterval(autoplayRef.current);
      }
      autoplayRef.current = window.setInterval(() => {
        if (!isPausedRef.current) {
          emblaApi.scrollNext();
        }
      }, AUTOPLAY_MS);
    };

    startAutoplay();
    return () => {
      if (autoplayRef.current !== null) {
        window.clearInterval(autoplayRef.current);
      }
    };
  }, [emblaApi]);

  const pauseAutoplay = () => {
    isPausedRef.current = true;
  };

  const resumeAutoplay = () => {
    isPausedRef.current = false;
  };

  return (
    <section
      className="py-16 sm:py-20 lg:py-19.5"
      aria-label="Customer testimonials"
      aria-roledescription="carousel"
      onMouseEnter={pauseAutoplay}
      onMouseLeave={resumeAutoplay}
      onFocus={pauseAutoplay}
      onBlur={resumeAutoplay}
    >
      <div className={marketingSectionContainerClass}>
        <div className="mx-auto flex max-w-[820px] items-center gap-3 sm:gap-4">
          <button
            type="button"
            onClick={scrollPrev}
            aria-label="Previous review"
            className="shrink-0 rounded-full border border-[#E7E3F5] bg-background p-2.5 text-[#4B4566] shadow-[0_1px_2px_rgb(21_16_31/0.04),0_8px_24px_-8px_rgb(21_16_31/0.10)] transition-[transform,border-color,color] hover:-translate-x-0.5 hover:border-[#7C3AED] hover:text-[#7C3AED]"
          >
            <ChevronLeft className="size-5" strokeWidth={2} />
          </button>

          <div
            ref={viewportRef}
            className="min-w-0 flex-1 overflow-x-clip overflow-y-visible"
          >
            <div className="flex touch-pan-y">
              {CASE_STUDY_QUOTES.map((review, index) => (
                <div
                  key={`${review.name}-${index}`}
                  className="min-w-0 shrink-0 grow-0 basis-full"
                  style={{ flex: "0 0 100%" }}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`Review ${index + 1} of ${CASE_STUDY_QUOTES.length}`}
                >
                  <div className="mx-auto max-w-[640px] text-center">
                    <blockquote className="mb-7 line-clamp-2 text-balance text-[clamp(1.125rem,2.6vw,1.875rem)] font-bold leading-[1.4] tracking-[-0.01em] text-foreground">
                      &ldquo;{review.quote}&rdquo;
                    </blockquote>
                    <footer className="flex items-center justify-center gap-3">
                      <span
                        className="flex size-10 shrink-0 items-center justify-center rounded-xl mono text-[0.8125rem] font-bold"
                        style={{
                          background: review.avatarBg,
                          color: review.avatarColor,
                        }}
                      >
                        {review.avatar}
                      </span>
                      <div className="text-left text-[0.84375rem]">
                        <strong className="block text-[0.90625rem] font-bold text-foreground">
                          {review.name}
                        </strong>
                        <span className="text-muted-foreground">
                          {review.role}, {review.company}
                        </span>
                      </div>
                    </footer>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={scrollNext}
            aria-label="Next review"
            className="shrink-0 rounded-full border border-[#E7E3F5] bg-background p-2.5 text-[#4B4566] shadow-[0_1px_2px_rgb(21_16_31/0.04),0_8px_24px_-8px_rgb(21_16_31/0.10)] transition-[transform,border-color,color] hover:translate-x-0.5 hover:border-[#7C3AED] hover:text-[#7C3AED]"
          >
            <ChevronRight className="size-5" strokeWidth={2} />
          </button>
        </div>
      </div>
    </section>
  );
}
