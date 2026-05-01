"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SLIDER_DATA } from "@/lib/marketing-data";
import { cn } from "@/lib/utils";

const AUTO_PLAY_INTERVAL = 2000; // 6 seconds

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState(1); // 1 for right, -1 for left
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev === SLIDER_DATA.length - 1 ? 0 : prev + 1));
  }, []);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev === 0 ? SLIDER_DATA.length - 1 : prev - 1));
  }, []);

  useEffect(() => {
    if (!isPaused) {
      timeoutRef.current = setInterval(nextSlide, AUTO_PLAY_INTERVAL);
    }
    return () => {
      if (timeoutRef.current) clearInterval(timeoutRef.current);
    };
  }, [isPaused, nextSlide]);

  const slideVariants: Variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 1.1,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.5 },
        scale: { duration: 0.7 },
      } as const,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 1.1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.5 },
        scale: { duration: 0.7 },
      } as const,
    }),
  };

  const contentVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.3 + i * 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  };

  return (
    <section
      className="relative min-h-[min(85svh,52rem)] w-full min-w-0 overflow-hidden bg-black sm:min-h-[min(88svh,56rem)]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Hero Slider"
    >
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={current}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0 h-full w-full"
        >
          {/* Background Image with Overlay */}
          <div className="relative h-full w-full">
            <Image
              src={SLIDER_DATA[current].image}
              alt={SLIDER_DATA[current].title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 100vw, 1440px"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent dark:from-black/90" />
          </div>

          {/* Content — bottom padding clears progress controls on narrow screens */}
          <div className="absolute inset-0 flex items-center pb-24 pt-[max(5.5rem,env(safe-area-inset-top))] sm:items-center sm:pb-0 sm:pt-0">
            <div className="mx-auto w-full min-w-0 max-w-[min(100%,80rem)] px-4 sm:px-6 lg:px-8 xl:px-12">
              <div className="max-w-2xl">
                <motion.div
                  custom={0}
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <span className="mb-3 inline-block rounded-full border border-primary/30 bg-primary/20 px-2.5 py-1 text-[0.65rem] font-semibold tracking-wider text-primary uppercase backdrop-blur-md sm:mb-4 sm:px-3 sm:text-xs">
                    Ondial Innovation
                  </span>
                </motion.div>

                <motion.h1
                  custom={1}
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  className="mb-4 text-balance text-[clamp(1.85rem,5vw+0.85rem,4.5rem)] font-bold leading-[1.08] tracking-tight text-white sm:mb-6 sm:leading-[1.05]"
                >
                  {SLIDER_DATA[current].title}
                </motion.h1>

                <motion.p
                  custom={2}
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  className="mb-6 text-pretty text-base leading-relaxed text-neutral-300 sm:mb-8 sm:text-lg lg:text-xl"
                >
                  {SLIDER_DATA[current].description}
                </motion.p>

                <motion.div
                  custom={3}
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4"
                >
                  <Button
                    render={
                      <Link href={SLIDER_DATA[current].ctaLink}>
                        {SLIDER_DATA[current].ctaText}
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    }
                    size="lg"
                    className="h-11 w-full px-6 text-sm sm:h-12 sm:w-auto sm:px-8 sm:text-base"
                    nativeButton={false}
                  />
                  <Button
                    variant="outline"
                    size="lg"
                    className="h-11 w-full border-white/20 bg-white/5 px-6 text-sm text-white hover:bg-white/10 hover:text-white backdrop-blur-md sm:h-12 sm:w-auto sm:px-8 sm:text-base"
                    render={
                      <Link href="/contact">Contact Us</Link>
                    }
                    nativeButton={false}
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows - Glassmorphic */}
      <div className="absolute bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-4 z-20 hidden gap-3 md:bottom-12 md:right-8 md:flex lg:right-12">
        <button
          onClick={prevSlide}
          className="group flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white backdrop-blur-md transition-all hover:bg-white/20 hover:border-white/30"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-6 w-6 transition-transform group-hover:-translate-x-0.5" />
        </button>
        <button
          onClick={nextSlide}
          className="group flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white backdrop-blur-md transition-all hover:bg-white/20 hover:border-white/30"
          aria-label="Next slide"
        >
          <ChevronRight className="h-6 w-6 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>

      {/* Progress Indicators */}
      <div className="absolute bottom-[max(1rem,env(safe-area-inset-bottom))] left-4 z-20 flex max-w-[calc(100%-2rem)] flex-wrap gap-2 sm:left-6 sm:max-w-none sm:gap-4 md:bottom-12 md:left-8 md:gap-6 lg:left-12">
        {SLIDER_DATA.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > current ? 1 : -1);
              setCurrent(index);
            }}
            className="group relative h-1 min-w-[2.25rem] flex-1 overflow-hidden rounded-full bg-white/20 transition-all hover:h-1.5 sm:min-w-0 sm:flex-none sm:w-14 md:w-16"
            aria-label={`Go to slide ${index + 1}`}
          >
            {index === current && (
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: isPaused ? "100%" : "100%" }}
                transition={{
                  duration: AUTO_PLAY_INTERVAL / 1000,
                  ease: "linear",
                  repeat: 0,
                }}
                className="absolute inset-0 h-full bg-primary"
              />
            )}
            <div 
              className={cn(
                "absolute inset-0 h-full bg-primary transition-transform duration-300",
                index < current ? "translate-x-0" : "translate-x-[-100%]"
              )} 
            />
          </button>
        ))}
      </div>
    </section>
  );
}
