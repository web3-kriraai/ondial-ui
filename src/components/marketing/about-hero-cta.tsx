"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion } from "framer-motion";
import type { LottieRefCurrentProps } from "lottie-react";

import arrowRightAnimation from "@/assets/animations/arrow-right.json";
import pillStyles from "@/components/marketing/showcase-pill-cta.module.css";
import { LazyLottie, type LazyLottieHandle } from "@/components/ui/lazy-lottie";
import { cn } from "@/lib/utils";

const ctaIconVariants = {
  initial: { scale: 1 },
  hover: { scale: 1.06, transition: { type: "spring" as const, stiffness: 320, damping: 22 } },
};

const ctaArrowVariants = {
  initial: { opacity: 1, scale: 1, x: 0 },
  hover: {
    opacity: 1,
    scale: 1,
    x: 3,
    transition: { delay: 0.05, type: "spring" as const, stiffness: 200 },
  },
};

type AboutHeroCtaProps = {
  href: string;
  label: string;
  className?: string;
  linkClassName?: string;
};

export function AboutHeroCta({ href, label, className, linkClassName }: AboutHeroCtaProps) {
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const lazyLottieRef = useRef<LazyLottieHandle>(null);

  const playArrow = () => lazyLottieRef.current?.play();
  const resetArrow = () => lazyLottieRef.current?.reset();

  return (
    <motion.div
      className="flex mb-0.5 sm:mb-0.65 text-xs sm:text-sm"
      initial="initial"
      whileHover="hover"
      onHoverStart={playArrow}
      onHoverEnd={resetArrow}
    >
      <Link
        href={href}
        className={cn(pillStyles.pillCta, linkClassName)}
        prefetch
        onFocus={playArrow}
        onBlur={resetArrow}
        onClick={playArrow}
      >
        {label}
        <motion.span className={pillStyles.pillCtaIcon} aria-hidden variants={ctaIconVariants}>
          <motion.div className={pillStyles.pillCtaLottieWrap} variants={ctaArrowVariants}>
            <LazyLottie
              ref={lazyLottieRef}
              lottieRef={lottieRef}
              animationData={arrowRightAnimation}
              autoplay={false}
              loop={false}
              className={pillStyles.pillCtaLottie}
              loadTrigger="interaction"
            />
          </motion.div>
        </motion.span>
      </Link>
    </motion.div>
  );
}
