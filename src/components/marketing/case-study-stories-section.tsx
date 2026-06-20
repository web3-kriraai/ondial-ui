"use client";

import { useMemo, useState, type CSSProperties } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";

import { CaseStudyGridCard, CaseStudySectionHead } from "@/components/marketing/case-study-shared";
import { ONDIAL_ACCENT_STYLE } from "@/components/marketing/split-screen-section";
import {
  marketingDottedSectionShellClass,
  marketingSectionContainerClass,
} from "@/config/marketing-layout";
import {
  CASE_STUDIES,
  CASE_STUDY_FILTERS,
  CASE_STUDY_STORIES,
  type CaseStudyCategory,
} from "@/data/case-study-page-content";
import { cn } from "@/lib/utils";

const easeOut = [0.22, 1, 0.36, 1] as const;

const cardMotion = {
  initial: { opacity: 0, y: 24, scale: 0.96 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -16, scale: 0.96 },
  transition: { duration: 0.42, ease: easeOut },
};

export function CaseStudyStoriesSection() {
  const [activeFilter, setActiveFilter] = useState<"all" | CaseStudyCategory>("all");

  const gridItems = useMemo(() => {
    if (activeFilter === "all") return CASE_STUDIES;
    return CASE_STUDIES.filter((item) => item.category === activeFilter);
  }, [activeFilter]);

  return (
    <section
      id="case-studies-stories"
      className={cn(marketingDottedSectionShellClass, "pt-2 pb-24 sm:pb-28 lg:pb-[100px]")}
      style={ONDIAL_ACCENT_STYLE as CSSProperties}
      aria-labelledby="case-studies-stories-title"
    >
      <div className={marketingSectionContainerClass}>
        <CaseStudySectionHead
          title={<span id="case-studies-stories-title">{CASE_STUDY_STORIES.title}</span>}
          subtitle={CASE_STUDY_STORIES.subtitle}
        />

        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {CASE_STUDY_FILTERS.map((filter) => (
            <button
              key={filter.id}
              type="button"
              onClick={() => setActiveFilter(filter.id)}
              className={cn(
                "rounded-full border px-4 py-2 font-mono text-[12.5px] font-semibold transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
                activeFilter === filter.id
                  ? "border-[#15101F] bg-[#15101F] text-white"
                  : "border-[#E7E3F5] bg-background text-[#4B4566] hover:border-[#7C3AED] hover:text-[#7C3AED]",
              )}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <div id="case-studies-grid">
          <LayoutGroup id="case-studies-grid">
            {gridItems.length === 0 ? (
              <motion.p
                key="empty"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.55, ease: easeOut }}
                className="rounded-2xl py-16 text-center text-sm text-[#7A748F]"
              >
                No case studies in this category yet —{" "}
                <button
                  type="button"
                  onClick={() => setActiveFilter("all")}
                  className="font-semibold text-[#7C3AED] hover:underline"
                >
                  view all
                </button>
              </motion.p>
            ) : (
              <motion.div
                layout
                className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
              >
                <AnimatePresence mode="popLayout">
                  {gridItems.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={cardMotion.initial}
                      animate={cardMotion.animate}
                      exit={cardMotion.exit}
                      transition={{
                        layout: { duration: 0.45, ease: easeOut },
                        opacity: { duration: 0.42, ease: easeOut },
                        y: { duration: 0.42, ease: easeOut },
                        scale: { duration: 0.42, ease: easeOut },
                      }}
                      className="h-full"
                    >
                      <CaseStudyGridCard item={item} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </LayoutGroup>
        </div>
      </div>
    </section>
  );
}
