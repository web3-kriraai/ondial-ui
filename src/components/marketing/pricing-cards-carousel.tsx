"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";

import {
  PricingPlanCard,
  type PricingPlanCardProps,
} from "@/components/marketing/pricing-plan-card";
import { marketingEyebrowClass } from "@/config/marketing-layout";
import { cn } from "@/lib/utils";

type PricingCardItem = Pick<
  PricingPlanCardProps,
  "title" | "description" | "price" | "features"
>;

type PricingCardsCarouselProps = {
  cards: PricingCardItem[];
};

function CarouselPricingCard({
  card,
  index,
  emblaApi,
}: {
  card: PricingCardItem;
  index: number;
  emblaApi: ReturnType<typeof useEmblaCarousel>[1];
}) {
  const [isActive, setIsActive] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(min-width: 768px)");
    setIsDesktop(mql.matches);
    const onChange = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setIsActive(emblaApi.selectedScrollSnap() === index);
    };

    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    onSelect();

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, index]);

  return (
    <PricingPlanCard
      {...card}
      carouselActive={isActive}
      carouselDesktop={isDesktop}
      className="basis-full shrink-0 px-2 md:basis-1/2 xl:basis-1/3 2xl:basis-1/4"
    />
  );
}

export function PricingCardsCarousel({ cards }: PricingCardsCarouselProps) {
  const [showSwipeHint, setShowSwipeHint] = useState(true);

  const [viewportRef, emblaApi] = useEmblaCarousel({
    align: "center",
    loop: false,
    containScroll: "trimSnaps",
    dragFree: false,
    duration: 35,
    watchDrag: (api) => api.canScrollNext() || api.canScrollPrev(),
  });

  const syncSwipeHint = useCallback(() => {
    if (!emblaApi) return;
    setShowSwipeHint(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setShowSwipeHint(emblaApi.canScrollNext());
    };

    onSelect();
    emblaApi.on("select", onSelect).on("reInit", onSelect);

    return () => {
      emblaApi.off("select", onSelect).off("reInit", onSelect);
    };
  }, [emblaApi, syncSwipeHint]);

  return (
    <div className="relative -my-5">
      <div
        className="overflow-hidden px-1 py-5 sm:px-2 lg:px-0"
        ref={viewportRef}
      >
        <div className="flex touch-pan-y [touch-action:pan-y_pinch-zoom]">
          {cards.map((card, index) => (
            <CarouselPricingCard
              key={card.title}
              card={card}
              index={index}
              emblaApi={emblaApi}
            />
          ))}
        </div>
      </div>
      {showSwipeHint ? (
        <div className="pointer-events-none mt-3 flex justify-center">
          <div className={cn(marketingEyebrowClass, "shadow-sm backdrop-blur-sm")}>
            Swipe to see other plans
          </div>
        </div>
      ) : null}
    </div>
  );
}
