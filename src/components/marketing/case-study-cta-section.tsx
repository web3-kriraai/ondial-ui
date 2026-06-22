"use client";

import { Sparkles } from "lucide-react";

import { marketingEyebrowClass, marketingSectionContainerClass } from "@/config/marketing-layout";
import { CASE_STUDY_CTA } from "@/data/case-study-page-content";
import { cn } from "@/lib/utils";

export function CaseStudyCtaSection() {
  return (
    <section className="pb-16 sm:pb-20" aria-labelledby="case-study-cta-title">
      <div className={marketingSectionContainerClass}>
        <div className="relative isolate mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-[#534AB7]/15 bg-[#1a1733] p-8 text-center text-white shadow-[0_24px_64px_-28px_rgb(83_74_183/0.55)] sm:rounded-[2.75rem] sm:p-12 lg:p-14">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10"
            style={{
              background:
                "radial-gradient(ellipse 85% 70% at 50% 0%, rgb(83 74 183 / 0.35), transparent 62%), radial-gradient(ellipse 50% 40% at 100% 100%, rgb(225 245 238 / 0.08), transparent 55%)",
            }}
          />

          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 text-white/10"
            style={{
              backgroundImage: "radial-gradient(circle, currentColor 1px, transparent 1px)",
              backgroundSize: "16px 16px",
              maskImage: "linear-gradient(to bottom, black 20%, transparent 95%)",
              WebkitMaskImage: "linear-gradient(to bottom, black 20%, transparent 95%)",
            }}
          />

          <p
            className={cn(
              marketingEyebrowClass,
              "mb-4 inline-flex items-center gap-1.5 border-white/15 text-white/70",
            )}
          >
            <Sparkles className="size-3.5 text-[#EEEDFE]" aria-hidden strokeWidth={1.75} />
            {CASE_STUDY_CTA.eyebrow}
          </p>

          <h2
            id="case-study-cta-title"
            className="mx-auto mb-3 max-w-xl text-balance text-2xl font-semibold tracking-tight sm:text-3xl"
          >
            {CASE_STUDY_CTA.title}
          </h2>

          <p className="mx-auto mb-8 max-w-lg text-pretty text-sm leading-relaxed text-white/65 sm:text-base">
            {CASE_STUDY_CTA.subtitle}
          </p>

          <div className="flex items-center justify-center gap-5">
            <button className="rounded-full bg-white/10 border border-white/15 px-8 py-3 text-sm font-semibold text-white transition-[transform,background-color,box-shadow] duration-200 hover:bg-white/80 hover:text-[#1a1733] hover:shadow-[0_8px_24px_-8px_rgb(255_255_255/0.35)] active:scale-[0.98] motion-reduce:active:scale-100">
              {CASE_STUDY_CTA.primaryCta}
            </button>
            <button className="rounded-full bg-white px-8 py-3 text-sm font-semibold text-[#1a1733] transition-[transform,background-color,box-shadow] duration-200 hover:bg-[#EEEDFE] hover:shadow-[0_8px_24px_-8px_rgb(255_255_255/0.35)] active:scale-[0.98] motion-reduce:active:scale-100">
              {CASE_STUDY_CTA.secondaryCta}
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
