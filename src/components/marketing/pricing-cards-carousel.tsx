"use client";

import { useCallback, useEffect, useState, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion, useScroll, useSpring, useTransform, useMotionValue } from "framer-motion";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import arrowRightAnimation from "@/assets/animations/arrow-right.json";

type PricingCardItem = {
  title: string;
  description: string;
  price: string;
  features: string[];
};

type PricingCardsCarouselProps = {
  cards: PricingCardItem[];
};

function PricingCard({ title, description, price, features, index, emblaApi }: PricingCardItem & { index: number; emblaApi: any }) {
  const [isActive, setIsActive] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const lottieRef = useRef<LottieRefCurrentProps>(null);

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
    <motion.article 
      initial={false}
      animate={{ 
        scale: isDesktop ? 1 : (isActive ? 1 : 0.98),
        opacity: 1,
      }}
      transition={{
        duration: 0.4,
        ease: [0.33, 1, 0.68, 1],
      }}
      className="relative isolate min-w-0 basis-full shrink-0 overflow-hidden px-2 text-foreground md:basis-1/2 xl:basis-1/3 2xl:basis-1/4"
    >
      <div className="relative aspect-3/5 w-full rounded-[2rem] bg-black p-2">
        <div className="absolute right-2 top-0.5 z-20 flex h-[12%] w-[104px] items-center justify-center text-center text-sm font-bold tracking-tight text-white">
          {price}
        </div>
        <div className="relative h-full w-full">
          <svg
            aria-hidden="true"
            viewBox="0 0 240 320"
            preserveAspectRatio="none"
            className="absolute inset-0 h-full w-full overflow-visible"
          >
            <path
              d="M1 25 Q1 1 25 1 L140 1 Q160 1 160 16 Q160 31 180 31 H215 Q239 31 239 46 V295 Q239 319 215 319 H25 Q1 319 1 295 Z"
              className="fill-slate-100"
              strokeWidth="1.5"
            />
          </svg>

          <div className="absolute inset-0 flex h-full flex-col p-8">
            <h2 className="text-[2rem] font-semibold leading-none tracking-tight">{title}</h2>
            <p className="mt-3 max-w-[18ch] text-sm leading-relaxed text-muted-foreground">{description}</p>
            <div className="mt-8 h-px w-full bg-slate-300/70 dark:bg-slate-700/70" />
            <ul className="mt-7 space-y-3 text-sm text-muted-foreground">
              {features.map((feature) => (
                <li key={feature} className="flex items-center gap-2 leading-snug">
                  <span className="h-1.5 w-1.5 rounded-full bg-purple-500" aria-hidden="true" />
                  <span>{feature}</span>
                </li>
              ))}
              <li className="flex items-center gap-2 leading-snug">
                <span className="h-1.5 w-1.5 rounded-full bg-purple-500" aria-hidden="true" />
                <span>Concurrent Channels ($4.9)</span>
              </li>
              <li className="flex items-center gap-2 leading-snug">
                <span className="h-1.5 w-1.5 rounded-full bg-purple-500" aria-hidden="true" />
                <span>Phone Numbers ($4.9)</span>
              </li>
              <li className="flex items-center gap-2 leading-snug">
                <span className="h-1.5 w-1.5 rounded-full bg-purple-500" aria-hidden="true" />
                <span>Monthly valid credits</span>
              </li>
            </ul>
            <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
              After 1 month, unused credits will be charged at 0.055 credit per minute.
            </p>
            <motion.button
              whileTap={{ scale: 0.98 }}
              initial="initial"
              whileHover="hover"
              animate={isActive ? "initial" : "initial"} // Force re-render for variants
              whileTap="hover" // Trigger hover animation on tap for mobile
              onMouseEnter={() => lottieRef.current?.play()}
              onMouseLeave={() => {
                lottieRef.current?.stop();
                lottieRef.current?.goToAndStop(0, true);
              }}
              onClick={() => {
                // Ensure animation plays on click for mobile
                lottieRef.current?.play();
              }}
              className="group relative mt-auto mx-auto flex w-full max-w-[240px] cursor-pointer items-center justify-center overflow-hidden rounded-full border border-black/20 bg-white py-3 text-sm font-bold text-black transition-colors duration-300 hover:border-black hover:text-white"
            >
              {/* Combined Dot and Expanding Background Container */}
              <div className="relative z-10 flex items-center">
                <div className="relative flex h-6 w-6 items-center justify-center">
                  {/* Expanding Background */}
                  <motion.div
                    variants={{
                      initial: { scale: 1 },
                      hover: { 
                        scale: 60, 
                        transition: { type: "spring", stiffness: 80, damping: 15 } 
                      }
                    }}
                    className="absolute h-2 w-2 rounded-full bg-black"
                  />
                  {/* Dot (Visible initially) */}
                  <motion.div
                    variants={{
                      initial: { opacity: 1, scale: 1 },
                      hover: { opacity: 0, scale: 0 }
                    }}
                    className="relative h-2 w-2 rounded-full bg-black"
                  />
                </div>
                
                <motion.span 
                  variants={{
                    initial: { color: "#000000" },
                    hover: { color: "#ffffff" }
                  }}
                  className="relative z-10 px-1"
                >
                  Get Started Now
                </motion.span>

                {/* Arrow Container (Right) */}
                <div className="relative flex h-6 w-6 items-center justify-center">
                  <motion.div
                    variants={{
                      initial: { opacity: 0, scale: 0, x: -5 },
                      hover: { 
                        opacity: 1, 
                        scale: 1, 
                        x: 0,
                        transition: { delay: 0.1, type: "spring", stiffness: 200 }
                      }
                    }}
                    className="h-6 w-6 brightness-0 invert"
                  >
                    <Lottie 
                      lottieRef={lottieRef}
                      animationData={arrowRightAnimation} 
                      autoplay={false}
                      loop={false}
                    />
                  </motion.div>
                </div>
              </div>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.article>
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
    // Only allow dragging if there's actually content to scroll to
    watchDrag: (emblaApi) => emblaApi.canScrollNext() || emblaApi.canScrollPrev(),
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
    <div className="relative">
      <div className="overflow-hidden px-1 sm:px-2 lg:px-0" ref={viewportRef}>
        <div className="flex touch-pan-y [touch-action:pan-y_pinch-zoom] py-4">
          {cards.map((card, index) => (
            <PricingCard key={card.title} {...card} index={index} emblaApi={emblaApi} />
          ))}
        </div>
      </div>
      {showSwipeHint ? (
        <div className="pointer-events-none mt-3 flex justify-center">
          <div className="rounded-full border border-purple-200 bg-white/90 px-3 py-1 text-[11px] font-medium tracking-wide text-purple-600 shadow-sm backdrop-blur-sm">
            Swipe to see other plans
          </div>
        </div>
      ) : null}
    </div>
  );
}
