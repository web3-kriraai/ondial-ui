"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion } from "framer-motion";
import type { LottieRefCurrentProps } from "lottie-react";

import arrowRightAnimation from "@/assets/animations/arrow-right.json";
import { LazyLottie, type LazyLottieHandle } from "@/components/ui/lazy-lottie";
import { cn } from "@/lib/utils";

/** Next Link + variant propagation for the CTA hover (same as /pricing carousel) */
const MotionLink = motion.create(Link);

const DEFAULT_EXTRA_FEATURES = [
  "Concurrent Channels ($4.9)",
  "Phone Numbers ($4.9)",
  "Monthly valid credits",
] as const;

const DEFAULT_CREDITS_FOOTNOTE =
  "After 1 month, unused credits will be charged at 0.055 credit per minute.";

export type PricingPlanCardProps = {
  title: string;
  description: string;
  price: string;
  features: readonly string[];
  extraFeatures?: readonly string[];
  creditsFootnote?: string;
  ctaHref?: string;
  ctaLabel?: string;
  className?: string;
  /** Carousel slide: scale when active on mobile */
  carouselActive?: boolean;
  carouselDesktop?: boolean;
};

export function PricingPlanCard({
  title,
  description,
  price,
  features,
  extraFeatures = DEFAULT_EXTRA_FEATURES,
  creditsFootnote = DEFAULT_CREDITS_FOOTNOTE,
  ctaHref = "/contact",
  ctaLabel = "Get Started Now",
  className,
  carouselActive = true,
  carouselDesktop = true,
}: PricingPlanCardProps) {
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const lazyLottieRef = useRef<LazyLottieHandle>(null);

  const scale = carouselDesktop ? 1 : carouselActive ? 1 : 0.98;

  return (
    <motion.article
      initial={false}
      animate={{ scale, opacity: 1 }}
      transition={{
        duration: 0.4,
        ease: [0.33, 1, 0.68, 1],
      }}
      className={cn(
        "relative isolate min-w-0 text-foreground",
        className,
      )}
    >
      <div className="relative aspect-3/5 w-full rounded-[2rem] bg-black p-2">
        <div className="absolute right-2 top-1 z-20 flex h-[11%] min-h-[2.25rem] w-[6.5rem] items-center justify-center text-center text-xs font-bold tracking-tight text-white sm:text-sm">
          <motion.span
            key={price}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            {price}
          </motion.span>
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

          <div className="absolute inset-0 flex h-full flex-col px-6 pb-6 pt-9 sm:px-8 sm:pb-8 sm:pt-11">
            <h3 className="pr-2 text-[1.5rem] font-semibold leading-tight tracking-tight sm:text-[1.75rem]">
              {title}
            </h3>
            <p className="mt-3 max-w-[18ch] text-sm leading-relaxed text-muted-foreground sm:mt-3.5">
              {description}
            </p>
            <div className="mt-6 h-px w-full bg-slate-300/70 dark:bg-slate-700/70 sm:mt-8" />
            <ul className="mt-5 space-y-2.5 text-sm text-muted-foreground sm:mt-7 sm:space-y-3">
              {features.map((feature) => (
                <li key={feature} className="flex items-center gap-2 leading-snug">
                  <span
                    className="h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground"
                    aria-hidden
                  />
                  <span>{feature}</span>
                </li>
              ))}
              {extraFeatures.map((feature) => (
                <li key={feature} className="flex items-center gap-2 leading-snug">
                  <span
                    className="h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground"
                    aria-hidden
                  />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-xs leading-relaxed text-muted-foreground sm:mt-4">
              {creditsFootnote}
            </p>
            <MotionLink
              href={ctaHref}
              prefetch
              initial="initial"
              whileHover="hover"
              whileTap={{ scale: 0.98 }}
              onMouseEnter={() => lazyLottieRef.current?.play()}
              onMouseLeave={() => lazyLottieRef.current?.reset()}
              onClick={() => lazyLottieRef.current?.play()}
              className="group relative mx-auto mt-auto flex w-full max-w-[240px] cursor-pointer items-center justify-center overflow-hidden rounded-full border border-black/20 bg-white py-3 text-sm font-bold text-black transition-colors duration-300 hover:border-black hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <div className="relative z-10 flex items-center">
                <div className="relative flex h-6 w-6 items-center justify-center">
                  <motion.div
                    variants={{
                      initial: { scale: 1 },
                      hover: {
                        scale: 60,
                        transition: { type: "spring", stiffness: 80, damping: 15 },
                      },
                    }}
                    className="absolute h-2 w-2 rounded-full bg-black"
                  />
                  <motion.div
                    variants={{
                      initial: { opacity: 1, scale: 1 },
                      hover: { opacity: 0, scale: 0 },
                    }}
                    className="relative h-2 w-2 rounded-full bg-black"
                  />
                </div>
                <motion.span
                  variants={{
                    initial: { color: "#000000" },
                    hover: { color: "#ffffff" },
                  }}
                  className="relative z-10 px-1"
                >
                  {ctaLabel}
                </motion.span>
                <div className="relative flex h-6 w-6 items-center justify-center">
                  <motion.div
                    variants={{
                      initial: { opacity: 0, scale: 0, x: -5 },
                      hover: {
                        opacity: 1,
                        scale: 1,
                        x: 0,
                        transition: { delay: 0.1, type: "spring", stiffness: 200 },
                      },
                    }}
                    className="h-6 w-6 brightness-0 invert"
                  >
                    <LazyLottie
                      ref={lazyLottieRef}
                      lottieRef={lottieRef}
                      animationData={arrowRightAnimation}
                      autoplay={false}
                      loop={false}
                      loadTrigger="interaction"
                    />
                  </motion.div>
                </div>
              </div>
            </MotionLink>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
