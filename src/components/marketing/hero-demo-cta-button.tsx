"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion } from "framer-motion";
import type { LottieRefCurrentProps } from "lottie-react";

import arrowRightAnimation from "@/assets/animations/arrow-right.json";
import showcaseStyles from "@/components/marketing/showcase-section.module.css";
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

type HeroDemoCtaButtonProps = {
  href: string;
  label: string;
  className?: string;
};

/** Homepage hero CTA — white pill, black border, black circle + arrow on the right. */
export function HeroDemoCtaButton({ href, label, className }: HeroDemoCtaButtonProps) {
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const lazyLottieRef = useRef<LazyLottieHandle>(null);

  const playArrow = () => lazyLottieRef.current?.play();
  const resetArrow = () => lazyLottieRef.current?.reset();

  return (
    <motion.div
      className={cn(showcaseStyles.heroDemoCtaHost, className)}
      initial="initial"
      whileHover="hover"
      onHoverStart={playArrow}
      onHoverEnd={resetArrow}
    >
      <Link
        href={href}
        prefetch
        className={showcaseStyles.heroDemoCta}
        onFocus={playArrow}
        onBlur={resetArrow}
        onClick={playArrow}
      >
        {label}
        <motion.span
          className={showcaseStyles.heroDemoCtaIcon}
          aria-hidden
          variants={ctaIconVariants}
        >
          <motion.div className={showcaseStyles.heroDemoCtaLottieWrap} variants={ctaArrowVariants}>
            <LazyLottie
              ref={lazyLottieRef}
              lottieRef={lottieRef}
              animationData={arrowRightAnimation}
              autoplay={false}
              loop={false}
              className={showcaseStyles.heroDemoCtaLottie}
              loadTrigger="interaction"
            />
          </motion.div>
        </motion.span>
      </Link>
    </motion.div>
  );
}
