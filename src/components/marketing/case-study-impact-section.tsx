"use client";

import type { CSSProperties } from "react";

import {
  CaseStudyImpactIcon,
  CaseStudySectionHead,
} from "@/components/marketing/case-study-shared";
import { ONDIAL_ACCENT_STYLE } from "@/components/marketing/split-screen-section";
import {
  marketingDottedSectionShellClass,
  marketingSectionContainerClass,
} from "@/config/marketing-layout";
import { CASE_STUDY_IMPACT } from "@/data/case-study-page-content";

export function CaseStudyImpactSection() {
  return (
    <section
      className={marketingDottedSectionShellClass}
      style={ONDIAL_ACCENT_STYLE as CSSProperties}
      aria-labelledby="case-study-impact-title"
    >
      <div className={marketingSectionContainerClass}>
        <CaseStudySectionHead
          eyebrow={CASE_STUDY_IMPACT.eyebrow}
          title={<span id="case-study-impact-title">{CASE_STUDY_IMPACT.title}</span>}
          subtitle={CASE_STUDY_IMPACT.subtitle}
        />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:gap-4">
          {CASE_STUDY_IMPACT.items.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-black/8 bg-background p-5 text-center shadow-[0_2px_4px_rgb(15_23_42/0.03)]"
            >
              <CaseStudyImpactIcon name={item.icon} color={item.color} />
              <p className="text-2xl font-semibold tracking-tight text-foreground sm:text-[1.625rem]">
                {item.value}
              </p>
              <p className="mt-1.5 text-[0.6875rem] leading-snug text-muted-foreground">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
