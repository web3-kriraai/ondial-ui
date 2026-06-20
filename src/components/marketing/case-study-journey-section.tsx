"use client";

import { Check } from "lucide-react";
import type { CSSProperties } from "react";

import { CaseStudySectionHead } from "@/components/marketing/case-study-shared";
import { ONDIAL_ACCENT_STYLE } from "@/components/marketing/split-screen-section";
import {
  marketingDottedSectionShellClass,
  marketingSectionContainerClass,
} from "@/config/marketing-layout";
import { CASE_STUDY_TIMELINE } from "@/data/case-study-page-content";
import { cn } from "@/lib/utils";

export function CaseStudyJourneySection() {
  return (
    <section
      className={marketingDottedSectionShellClass}
      style={ONDIAL_ACCENT_STYLE as CSSProperties}
      aria-labelledby="case-study-journey-title"
    >
      <div className={marketingSectionContainerClass}>
        <CaseStudySectionHead
          eyebrow={CASE_STUDY_TIMELINE.eyebrow}
          title={<span id="case-study-journey-title">{CASE_STUDY_TIMELINE.title}</span>}
          subtitle={CASE_STUDY_TIMELINE.subtitle}
        />
        <div className="overflow-hidden rounded-3xl border border-black/8 bg-background shadow-[0_2px_4px_rgb(15_23_42/0.04)]">
          {CASE_STUDY_TIMELINE.steps.map((step, index) => (
            <div
              key={step.phase}
              className={cn(
                "flex flex-col sm:flex-row sm:items-stretch",
                index < CASE_STUDY_TIMELINE.steps.length - 1 && "border-b border-black/8",
              )}
            >
              <div className="shrink-0 border-black/8 bg-muted/20 px-5 py-4 sm:w-28 sm:border-r">
                <p className="text-[0.6875rem] font-semibold uppercase tracking-widest text-muted-foreground">
                  {step.phase}
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">{step.time}</p>
              </div>
              <div className="flex-1 px-5 py-4">
                <p className="text-sm font-semibold text-foreground">{step.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
                <span
                  className="mt-2 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[0.6875rem] font-semibold"
                  style={{ background: step.pillBg, color: step.pillColor }}
                >
                  <Check className="h-3 w-3" aria-hidden />
                  {step.pill}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
