"use client";

import { type ComponentPropsWithRef, useCallback, useEffect, useLayoutEffect, useState } from "react";
import type { EmblaCarouselType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";

import { ServiceCardWithButton } from "./service-card";
import { SERVICES_DATA } from "@/lib/services-data";
import { cn } from "@/lib/utils";

function useDotButton(emblaApi: EmblaCarouselType | undefined) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onDotButtonClick = useCallback(
    (index: number) => {
      emblaApi?.scrollTo(index);
    },
    [emblaApi],
  );

  const onInit = useCallback((api: EmblaCarouselType) => {
    setScrollSnaps(api.scrollSnapList());
  }, []);

  const onSelect = useCallback((api: EmblaCarouselType) => {
    setSelectedIndex(api.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    const sync = () => {
      onInit(emblaApi);
      onSelect(emblaApi);
    };
    const frame = requestAnimationFrame(sync);

    emblaApi
      .on("reInit", onInit)
      .on("reInit", onSelect)
      .on("select", onSelect);

    return () => {
      cancelAnimationFrame(frame);
      emblaApi
        .off("reInit", onInit)
        .off("reInit", onSelect)
        .off("select", onSelect);
    };
  }, [emblaApi, onInit, onSelect]);

  return { selectedIndex, scrollSnaps, onDotButtonClick };
}


/** Slide width as % of the track; `calc` subtracts flex `gap` share per column count. */
const slideBasisClasses =
  "min-w-0 shrink-0 grow-0 basis-full md:basis-[calc((100%-1rem)/2)] xl:basis-[calc((100%-3rem)/4)]";

export default function ServicesSlider() {
  const [viewportEl, setViewportEl] = useState<HTMLDivElement | null>(null);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: false,
    containScroll: "trimSnaps",
    dragFree: false,
  });

  const setViewportRef = useCallback(
    (node: HTMLDivElement | null) => {
      emblaRef(node);
      setViewportEl(node);
    },
    [emblaRef],
  );

  useLayoutEffect(() => {
    if (!viewportEl || !emblaApi) return;

    const ro = new ResizeObserver(() => {
      requestAnimationFrame(() => {
        emblaApi.reInit();
      });
    });
    ro.observe(viewportEl, { box: "content-box" });

    return () => {
      ro.disconnect();
    };
  }, [viewportEl, emblaApi]);

  /** Advance one snap every 2s; pause while hovering so users can read/drag without fighting the timer. */
  useEffect(() => {
    if (!emblaApi || !viewportEl) return;

    let paused = false;
    const onEnter = () => {
      paused = true;
    };
    const onLeave = () => {
      paused = false;
    };
    viewportEl.addEventListener("pointerenter", onEnter);
    viewportEl.addEventListener("pointerleave", onLeave);

    const id = window.setInterval(() => {
      if (paused) return;
      if (emblaApi.canScrollNext()) {
        emblaApi.scrollNext();
      } else {
        emblaApi.scrollTo(0);
      }
    }, 2000);

    return () => {
      window.clearInterval(id);
      viewportEl.removeEventListener("pointerenter", onEnter);
      viewportEl.removeEventListener("pointerleave", onLeave);
    };
  }, [emblaApi, viewportEl]);

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  return (
    <section className="overflow-x-clip bg-neutral-50 py-14 sm:py-20 lg:py-28">
      <div className="mx-auto w-full min-w-0 max-w-[min(100%,80rem)] px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="mb-10 max-w-4xl sm:mb-14 lg:mb-16">
          <span className="mb-4 inline-block rounded-full border border-neutral-200 bg-white/80 px-3 py-1 text-[0.7rem] font-semibold tracking-wide text-neutral-800 sm:mb-6 sm:px-4 sm:py-1.5 sm:text-xs">
            Industries we serve
          </span>
          <h2 className="max-w-4xl text-balance text-[clamp(1.65rem,4.2vw+0.85rem,3.65rem)] font-semibold leading-[1.12] tracking-tight text-neutral-950 sm:leading-[1.1]">
            AI voice calls tailored to your sector—reminders, updates, surveys, and
            outreach that sound natural and scale with your team
          </h2>
        </div>
      </div>

      <div className="relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2 overflow-x-clip overflow-y-hidden">
        <div
          className="overflow-x-clip overflow-y-hidden px-4 sm:px-6 lg:px-8 xl:px-12"
          ref={setViewportRef}
        >
          <div className="flex touch-pan-y gap-3 [touch-action:pan-y_pinch-zoom] sm:gap-4 sm:[touch-action:pan-y_pinch-zoom]">
            {SERVICES_DATA.map((service) => (
              <div key={service.id} className={slideBasisClasses}>
                <ServiceCardWithButton {...service} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
