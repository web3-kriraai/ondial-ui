"use client";

import { ArrowDown, ArrowRight, Building2, Globe2, Sparkles, Star } from "lucide-react";
import Link from "next/link";
import type { CSSProperties, ElementType } from "react";

import { CaseStudyHeroVisual } from "@/components/marketing/case-study-hero-visual";
import { ONDIAL_ACCENT_STYLE } from "@/components/marketing/split-screen-section";
import { TextReveal } from "@/components/ui/text-reveal";
import { marketingSectionContainerClass } from "@/config/marketing-layout";
import { CASE_STUDY_PAGE_HERO } from "@/data/case-study-page-content";
import { cn } from "@/lib/utils";

const heroHighlights: { id: string; icon: ElementType; label: string }[] = [
  { id: "businesses", icon: Building2, label: "500+ businesses" },
  { id: "industries", icon: Globe2, label: "20+ industries" },
  { id: "csat", icon: Star, label: "4.9★ average CSAT" },
];

export function CaseStudyHeroSection() {
  const scrollToStories = () => {
    document.getElementById("case-studies-stories")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="case-studies-hero"
      className="relative w-full overflow-x-clip py-11 sm:overflow-visible sm:py-14 lg:py-16"
      style={ONDIAL_ACCENT_STYLE as CSSProperties}
      aria-labelledby="case-studies-hero-title"
    >
      <div
        className={cn(
          marketingSectionContainerClass,
          "grid grid-cols-1 items-start gap-10 lg:grid-cols-[1fr_540px] lg:gap-6 lg:items-start",
        )}
      >
        <div className="flex min-w-0 flex-col">
          <span className="mb-6 inline-flex w-fit max-w-full items-center gap-2 rounded-full border border-[#E7E3F5] bg-background px-3.5 py-1.5 font-mono text-[11.5px] font-semibold tracking-[0.08em] text-[#7C3AED] uppercase shadow-[0_1px_2px_rgb(21_16_31/0.04),0_8px_24px_-8px_rgb(21_16_31/0.10)]">
            <Sparkles className="size-3.5 shrink-0" aria-hidden strokeWidth={1.75} />
            {CASE_STUDY_PAGE_HERO.tag}
          </span>

          <h1
            id="case-studies-hero-title"
            className="mb-5 text-balance text-[clamp(2.5rem,5.6vw,3.75rem)] font-extrabold leading-[1.04] tracking-[-0.03em] text-[#15101F] sm:mb-[22px]"
          >
            <TextReveal as="span" className="block" trigger="inView" stagger={0.06}>
              {CASE_STUDY_PAGE_HERO.title}
            </TextReveal>
            <TextReveal as="span" className="block" trigger="inView" stagger={0.06}>
              Real results
            </TextReveal>
            <TextReveal
              as="span"
              className="block text-[#7C3AED]"
              trigger="inView"
              stagger={0.06}
            >
              with OnDial.
            </TextReveal>
          </h1>

          <TextReveal
            as="p"
            className="mb-7 max-w-[480px] text-[17px] leading-[1.6] text-[#4B4566] sm:mb-[30px]"
            trigger="inView"
            delay={0.1}
            stagger={0.028}
          >
            {CASE_STUDY_PAGE_HERO.description}
          </TextReveal>

          <div className="mb-8 flex flex-wrap gap-2.5 sm:mb-[34px]">
            {heroHighlights.map((item) => {
              const Icon = item.icon;
              return (
                <span
                  key={item.id}
                  className="inline-flex max-w-full items-center gap-1.5 rounded-full border border-[#E7E3F5] bg-background px-3.5 py-2 text-[13.5px] font-semibold text-[#4B4566] shadow-[0_1px_2px_rgb(21_16_31/0.04),0_8px_24px_-8px_rgb(21_16_31/0.10)]"
                >
                  <Icon className="size-3.5 shrink-0 text-[#7C3AED]" aria-hidden strokeWidth={2} />
                  {item.label}
                </span>
              );
            })}
          </div>

          <div className="flex w-full flex-col gap-3.5 sm:flex-row sm:flex-wrap sm:items-center">
            <Link
              href="/contact"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#7C3AED] px-[22px] py-3.5 text-[15px] font-bold text-white shadow-[0_12px_32px_-8px_rgb(42_14_99/0.18),0_2px_8px_rgb(21_16_31/0.06)] transition-[transform,background-color] duration-150 hover:-translate-y-0.5 hover:bg-[#6D28D9] sm:w-auto"
            >
              {CASE_STUDY_PAGE_HERO.primaryCta}
              <span className="ml-0.5 grid size-[26px] place-items-center rounded-full bg-white/18">
                <ArrowRight className="size-4" aria-hidden strokeWidth={2.4} />
              </span>
            </Link>
            <button
              type="button"
              onClick={scrollToStories}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#E7E3F5] bg-background px-[22px] py-3.5 text-[15px] font-bold text-[#15101F] transition-[transform,border-color,color] duration-150 hover:-translate-y-0.5 hover:border-[#7C3AED] hover:text-[#7C3AED] sm:w-auto"
            >
              {CASE_STUDY_PAGE_HERO.secondaryCta}
              <ArrowDown className="size-4" aria-hidden strokeWidth={2.4} />
            </button>
          </div>
        </div>

        <div className="relative mx-auto w-full min-w-0 max-w-[520px] lg:mx-0 lg:max-w-none">
          <CaseStudyHeroVisual />
        </div>
      </div>
    </section>
  );
}
