"use client";

import { ArrowUpRight } from "lucide-react";
import { motion, useInView, useReducedMotion, type Variants } from "framer-motion";
import { useRef, useState } from "react";

import { TextReveal } from "@/components/ui/text-reveal";
import { marketingSectionContainerClass } from "@/config/marketing-layout";
import { getSiteFaqSection, hasSiteFaqPage, type SiteFaqPageKey } from "@/data/site-faqs";
import { cn } from "@/lib/utils";

import { FaqAccordionPanel } from "@/components/marketing/faq-accordion-panel";

import styles from "./home-faq-section.module.css";

const accordionListVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.08,
    },
  },
};

const accordionItemVariants: Variants = {
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

export type MarketingFaqSectionProps = {
  pageKey?: SiteFaqPageKey;
  transparentSurface?: boolean;
  sectionId?: string;
};

export function MarketingFaqSection({
  pageKey = "home",
  transparentSurface = false,
  sectionId = "faq",
}: MarketingFaqSectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const accordionRef = useRef<HTMLDivElement>(null);
  const accordionInView = useInView(accordionRef, { once: true, amount: 0.12 });
  const [openIndex, setOpenIndex] = useState(0);

  const { title, description, items } = getSiteFaqSection(pageKey);
  const showAccordion = prefersReducedMotion || accordionInView;

  if (items.length === 0) {
    return null;
  }

  return (
    <section
      id={sectionId}
      className={cn(styles.section, transparentSurface && styles.sectionTransparent)}
      aria-labelledby={`${sectionId}-title`}
    >
      <div className={marketingSectionContainerClass}>
        <div className={styles.layout}>
          <header className={styles.intro}>
            <TextReveal
              as="h2"
              id={`${sectionId}-title`}
              className={styles.title}
              delay={0.05}
              stagger={0.07}
              inViewAmount={0.55}
            >
              {title}
            </TextReveal>
            <TextReveal
              as="p"
              className={styles.description}
              delay={0.28}
              stagger={0.035}
              inViewAmount={0.45}
            >
              {description}
            </TextReveal>
          </header>

          <motion.div
            ref={accordionRef}
            className={styles.accordion}
            variants={accordionListVariants}
            initial="hidden"
            animate={showAccordion ? "visible" : "hidden"}
          >
            {items.map((item, index) => {
              const isOpen = openIndex === index;
              const panelId = `${sectionId}-panel-${item.id}`;
              const triggerId = `${sectionId}-trigger-${item.id}`;

              return (
                <motion.div key={item.id} className={styles.item} variants={accordionItemVariants}>
                  <button
                    type="button"
                    id={triggerId}
                    className={styles.trigger}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  >
                    <span className={styles.question}>{item.question}</span>
                    <motion.span
                      className={styles.toggle}
                      aria-hidden
                      animate={{ rotate: isOpen ? 90 : 0, scale: isOpen ? 1.04 : 1 }}
                      transition={
                        prefersReducedMotion
                          ? { duration: 0 }
                          : { type: "spring", stiffness: 380, damping: 26 }
                      }
                    >
                      <ArrowUpRight className={styles.toggleIcon} strokeWidth={2.25} />
                    </motion.span>
                  </button>

                  <FaqAccordionPanel
                    isOpen={isOpen}
                    panelId={panelId}
                    triggerId={triggerId}
                    className={styles.answerWrap}
                  >
                    <p className={styles.answer}>{item.answer}</p>
                  </FaqAccordionPanel>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/** @deprecated Use MarketingFaqSection */
export function HomeFaqSection({
  pageKey = "home",
  transparentSurface = false,
}: Omit<MarketingFaqSectionProps, "sectionId">) {
  return (
    <MarketingFaqSection
      pageKey={pageKey}
      transparentSurface={transparentSurface}
      sectionId="faq"
    />
  );
}

export function IndustryFaqSection({ industrySlug }: { industrySlug: string }) {
  if (!hasSiteFaqPage(industrySlug)) {
    return null;
  }

  return (
    <MarketingFaqSection
      pageKey={industrySlug}
      transparentSurface
      sectionId={`${industrySlug}-faq`}
    />
  );
}
