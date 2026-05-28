"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion } from "framer-motion";
import Lottie, { type LottieRefCurrentProps } from "lottie-react";
import type { CSSProperties } from "react";

import arrowRightAnimation from "@/assets/animations/arrow-right.json";
import { ThreeDCarousel } from "@/components/marketing/three-d-carousel";

import styles from "./showcase-section.module.css";

function ShowcaseCta() {
  const lottieRef = useRef<LottieRefCurrentProps>(null);

  const playArrow = () => lottieRef.current?.play();

  const resetArrow = () => {
    lottieRef.current?.stop();
    lottieRef.current?.goToAndStop(0, true);
  };

  return (
    <motion.div
      className={styles.ctaHost}
      initial="initial"
      whileHover="hover"
      onHoverStart={playArrow}
      onHoverEnd={resetArrow}
    >
      <Link
        href="/services"
        className={styles.cta}
        onFocus={playArrow}
        onBlur={resetArrow}
        onClick={playArrow}
      >
        Get Started Now
        <motion.span className={styles.ctaIcon} aria-hidden variants={ctaIconVariants}>
          <motion.div className={styles.ctaLottieWrap} variants={ctaArrowVariants}>
            <Lottie
              lottieRef={lottieRef}
              animationData={arrowRightAnimation}
              autoplay={false}
              loop={false}
              className={styles.ctaLottie}
            />
          </motion.div>
        </motion.span>
      </Link>
    </motion.div>
  );
}

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

export function ShowcaseSection() {
  return (
    <section
      className={styles.section}
      style={
        {
          "--showcase-accent-h": "262",
          "--showcase-accent-s": "83%",
          "--showcase-accent-l": "58%",
        } as CSSProperties
      }
      aria-label="Platform showcase"
    >
      <header className={styles.header}>
        <h2 className={styles.title}>Automate Your Calls with AI</h2>
        <p className={styles.description}>
          Explore how teams use AI voice for reminders, outreach, surveys, and
          support—from first plan to ongoing scale.
        </p>
        <ShowcaseCta />
      </header>

      <ThreeDCarousel />
    </section>
  );
}
