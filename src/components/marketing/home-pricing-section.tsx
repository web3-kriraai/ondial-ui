"use client";

import { motion, useInView, useReducedMotion, type Variants } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { BlogPageHero } from "@/components/marketing/blog-page-hero";
import { usePricingCountry } from "@/components/marketing/pricing-country-context";
import { PricingCountryBar } from "@/components/marketing/pricing-country-bar";
import { PricingPlanCard } from "@/components/marketing/pricing-plan-card";
import { ONDIAL_ACCENT_STYLE } from "@/components/marketing/split-screen-section";
import { TextReveal } from "@/components/ui/text-reveal";
import { marketingSectionContainerClass } from "@/config/marketing-layout";
import { HOME_PRICING_HEADING } from "@/data/home-pricing-plans";
import { cn } from "@/lib/utils";

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
  const { countryId, plans, addonFeatures, creditsFootnote } = usePricingCountry();
  const gridRef = useRef<HTMLDivElement>(null);
  const gridInView = useInView(gridRef, { once: true, amount: 0.05, margin: "0px 0px -80px 0px" });
  const [cardsRevealed, setCardsRevealed] = useState(() => Boolean(prefersReducedMotion));

  useEffect(() => {
    if (prefersReducedMotion) {
      setCardsRevealed(true);
    }
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (gridInView) {
      setCardsRevealed(true);
    }
  }, [gridInView]);

  const showCards = prefersReducedMotion || cardsRevealed;

  return (
    <section
      id="pricing"
      className="w-full bg-transparent pb-12 sm:pb-16 lg:pb-20"
      style={ONDIAL_ACCENT_STYLE}
      aria-labelledby="home-pricing-title"
    >
      <div className="mx-auto flex w-full min-w-0 max-w-3xl flex-col px-4 pt-6 sm:px-6 sm:pt-8 lg:max-w-4xl">
        <BlogPageHero
          eyebrow={HOME_PRICING_HEADING.eyebrow}
          title={
            <h1
              id="home-pricing-title"
              className="mx-auto max-w-4xl text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-[2.625rem] lg:leading-tight"
            >
              <TextReveal
                as="span"
                className="inline"
                delay={0.08}
                stagger={0.04}
                inViewAmount={0.2}
              >
                {HOME_PRICING_HEADING.title}
              </TextReveal>
            </h1>
          }
          description={HOME_PRICING_HEADING.description}
        />

        <PricingCountryBar />
      </div>

      <div className={cn(marketingSectionContainerClass, "mt-8 sm:mt-10")}>
        <motion.div
          ref={gridRef}
          className="grid gap-6 md:grid-cols-2 xl:grid-cols-4 xl:gap-5"
          variants={gridVariants}
          initial="hidden"
          animate={showCards ? "visible" : "hidden"}
        >
          {plans.map((plan) => (
            <motion.div key={`${countryId}-${plan.id}`} variants={cardVariants}>
              <PricingPlanCard
                title={plan.title}
                description={plan.description}
                price={plan.price}
                features={plan.features}
                extraFeatures={addonFeatures}
                creditsFootnote={creditsFootnote}
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
