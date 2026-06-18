"use client";

import { motion, useInView, useReducedMotion, type Variants } from "framer-motion";
import { useRef } from "react";

import { PricingPlanCard } from "@/components/marketing/pricing-plan-card";
import { ONDIAL_ACCENT_STYLE } from "@/components/marketing/split-screen-section";
import { TextReveal } from "@/components/ui/text-reveal";
import {
  marketingEyebrowClass,
  marketingPageHeroSectionClass,
  marketingSectionContainerClass,
} from "@/config/marketing-layout";
import {
  HOME_PRICING_HEADING,
  HOME_PRICING_PLANS,
} from "@/data/home-pricing-plans";
import { cn } from "@/lib/utils";

const headingClass =
  "text-balance text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem]";

const subtitleClass =
  "mx-auto max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg";

const gridVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
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

export function HomePricingSection() {
  const prefersReducedMotion = useReducedMotion();
  const gridRef = useRef<HTMLDivElement>(null);
  const gridInView = useInView(gridRef, { once: true, amount: 0.1 });
  const showCards = prefersReducedMotion || gridInView;

  return (
    <section
      id="pricing"
      className={cn(marketingPageHeroSectionClass, "bg-background")}
      style={ONDIAL_ACCENT_STYLE}
      aria-labelledby="home-pricing-title"
    >
      <div className={marketingSectionContainerClass}>
        <header className="mx-auto max-w-3xl text-center">
          <p className={cn("mb-5 sm:mb-6", marketingEyebrowClass)}>{HOME_PRICING_HEADING.eyebrow}</p>
          <h2 id="home-pricing-title" className={headingClass}>
            <TextReveal as="span" className="block" delay={0.05} stagger={0.07} inViewAmount={0.5}>
              {HOME_PRICING_HEADING.title}
            </TextReveal>
          </h2>
          <TextReveal
            as="p"
            className={cn(subtitleClass, "mt-5 sm:mt-6")}
            delay={0.22}
            stagger={0.028}
            inViewAmount={0.4}
          >
            {HOME_PRICING_HEADING.description}
          </TextReveal>
        </header>

        <motion.div
          ref={gridRef}
          className="mt-12 grid gap-6 sm:mt-14 md:grid-cols-2 xl:grid-cols-4 xl:gap-5"
          variants={gridVariants}
          initial="hidden"
          animate={showCards ? "visible" : "hidden"}
        >
          {HOME_PRICING_PLANS.map((plan) => (
            <motion.div key={plan.id} variants={cardVariants}>
              <PricingPlanCard
                title={plan.title}
                description={plan.description}
                price={plan.price}
                features={plan.features}
                ctaHref={plan.ctaHref}
                ctaLabel={plan.ctaLabel}
                carouselActive
                carouselDesktop
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
