"use client";

import { motion, useInView, useReducedMotion, type Variants } from "framer-motion";
import { useRef } from "react";

import { FeatureIllustration } from "@/components/marketing/feature-illustration";
import { ONDIAL_ACCENT_STYLE } from "@/components/marketing/split-screen-section";
import { TextReveal } from "@/components/ui/text-reveal";
import {
  marketingEyebrowClass,
  marketingSectionContainerClass,
  marketingSectionShellClass,
} from "@/config/marketing-layout";
import {
  HOME_FEATURE_CARDS,
  HOME_FEATURES_HEADING,
  type FeaturePillTone,
} from "@/data/home-features-content";
import { cn } from "@/lib/utils";

import styles from "./home-features-section.module.css";

const headingClass =
  "text-balance text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem]";

const subtitleClass =
  "mx-auto mt-4 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg";

const pillClass: Record<FeaturePillTone, string> = {
  purple: styles.pillPurple,
  green: styles.pillGreen,
  blue: styles.pillBlue,
  amber: styles.pillAmber,
  red: styles.pillRed,
  teal: styles.pillTeal,
};

const gridVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.065,
      delayChildren: 0.12,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export function HomeFeaturesSection() {
  const prefersReducedMotion = useReducedMotion();
  const gridRef = useRef<HTMLDivElement>(null);
  const gridInView = useInView(gridRef, { once: true, amount: 0.1 });
  const showCards = prefersReducedMotion || gridInView;

  return (
    <section
      id="features"
      className={cn(marketingSectionShellClass, styles.section, "bg-background")}
      style={ONDIAL_ACCENT_STYLE}
      aria-labelledby="features-title"
    >
      <div className={marketingSectionContainerClass}>
        <header className="mx-auto max-w-3xl text-center">
          <p className={cn("mb-4", marketingEyebrowClass)}>{HOME_FEATURES_HEADING.eyebrow}</p>
          <h2 id="features-title" className={headingClass}>
            <TextReveal as="span" className="block" delay={0.05} stagger={0.07} inViewAmount={0.5}>
              {HOME_FEATURES_HEADING.titleLead}
            </TextReveal>
            <TextReveal
              as="span"
              className="block"
              delay={0.14}
              stagger={0.07}
              inViewAmount={0.5}
              segments={[
                { text: HOME_FEATURES_HEADING.titleTail },
                {
                  text: HOME_FEATURES_HEADING.titleAccent,
                  className: styles.titleAccent,
                },
              ]}
            />
          </h2>
          <TextReveal
            as="p"
            className={subtitleClass}
            delay={0.26}
            stagger={0.028}
            inViewAmount={0.4}
          >
            {HOME_FEATURES_HEADING.subtitle}
          </TextReveal>
        </header>

        <motion.div
          ref={gridRef}
          className={cn(styles.grid, "mx-auto mt-10 max-w-[60rem] sm:mt-12 lg:mt-14")}
          variants={gridVariants}
          initial="hidden"
          animate={showCards ? "visible" : "hidden"}
        >
          {HOME_FEATURE_CARDS.map((card) => {
            const isWide = card.layout === "wide";

            return (
              <motion.article
                key={card.id}
                className={cn(
                  styles.card,
                  isWide && styles.cardWide,
                  prefersReducedMotion && styles.cardMotionReduce,
                )}
                variants={cardVariants}
              >
                <div
                  className={styles.illus}
                  style={{ backgroundColor: card.illustrationBg }}
                  aria-hidden
                >
                  <FeatureIllustration
                    id={card.illustration}
                    wide={isWide}
                  />
                </div>
                <div className={styles.footer}>
                  <span className={cn(styles.pill, pillClass[card.pill.tone])}>{card.pill.label}</span>
                  <h3 className={styles.cardTitle}>{card.title}</h3>
                  <p className={styles.cardDescription}>{card.description}</p>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
