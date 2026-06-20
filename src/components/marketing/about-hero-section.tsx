"use client";

import { Globe2, Sparkles, UserRound } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { type CSSProperties, type ElementType } from "react";

import { AboutHeroCta } from "@/components/marketing/about-hero-cta";
import { AboutHeroVisual } from "@/components/marketing/about-hero-visual";
import { ONDIAL_ACCENT_STYLE } from "@/components/marketing/split-screen-section";
import { TextReveal } from "@/components/ui/text-reveal";
import {
  marketingEyebrowClass,
  marketingSectionContainerClass,
} from "@/config/marketing-layout";
import { ABOUT_HERO_CONTENT, type AboutHeroTraitId } from "@/data/about-hero-content";
import { flagImageUrl } from "@/lib/languages-data";
import { cn } from "@/lib/utils";

const traitIcons: Record<AboutHeroTraitId, ElementType> = {
  "ai-powered": Sparkles,
  "human-like": UserRound,
  global: Globe2,
};

export function AboutHeroSection() {
  const [primaryCta, secondaryCta] = ABOUT_HERO_CONTENT.ctas;

  return (
    <section
      id="about-hero"
      className="relative flex w-full items-stretch overflow-visible py-[clamp(1.25rem,4vw,2rem)] lg:min-h-[calc(100svh-12rem)] lg:items-center lg:py-[clamp(1.5rem,3vw,2.5rem)]"
      style={
        {
          ...ONDIAL_ACCENT_STYLE,
          "--showcase-accent-h": "262",
          "--showcase-accent-s": "83%",
          "--showcase-accent-l": "58%",
        } as CSSProperties
      }
      aria-labelledby="about-hero-title"
    >
      <div
        className={cn(
          marketingSectionContainerClass,
          "relative z-1 grid w-full min-w-0 items-start gap-[clamp(1.5rem,4vw,2.5rem)] lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center lg:gap-[clamp(2rem,4vw,4rem)]",
        )}
      >
        <div className="flex min-w-0 flex-col items-start text-left">
          <p className={cn(marketingEyebrowClass, "mb-4 mx-auto sm:mx-0")}>
            {ABOUT_HERO_CONTENT.eyebrow}
          </p>

          <h1
            id="about-hero-title"
            className="m-0 mb-[0.85rem] max-w-none text-balance text-[clamp(1.875rem,7vw,3.75rem)] font-semibold leading-[1.15] tracking-[-0.025em] text-foreground lg:mb-4 lg:max-w-[14ch] lg:text-[clamp(2.25rem,5.5vw,3.75rem)] lg:leading-[1.18]"
          >
            <TextReveal
              as="span"
              className="block"
              trigger="inView"
              stagger={0.07}
            >
              {ABOUT_HERO_CONTENT.titleLead}
            </TextReveal>
            <TextReveal
              as="span"
              trigger="inView"
              className="block text-[hsl(var(--section-accent-h)_var(--section-accent-s)_var(--section-accent-l))]"
              stagger={0.07}
            >
              {ABOUT_HERO_CONTENT.titleAccent}
            </TextReveal>
          </h1>

          <TextReveal
            as="p"
            className="m-0 mb-[1.15rem] max-w-152 text-pretty text-[clamp(0.9375rem,3.6vw,1.0625rem)] leading-[1.65] text-muted-foreground lg:mb-6 lg:leading-[1.7]"
            trigger="inView"
            delay={0.1}
            stagger={0.028}
          >
            {ABOUT_HERO_CONTENT.description}
          </TextReveal>

          <div className="mb-5 flex flex-wrap gap-2 lg:mb-7">
            {ABOUT_HERO_CONTENT.traits.map((trait) => {
              const Icon = traitIcons[trait.id];
              return (
                <span
                  key={trait.id}
                  className="inline-flex items-center gap-[0.45rem] rounded-full border border-black/8 bg-background py-[0.4rem] px-[0.85rem] text-[0.8125rem] font-semibold text-foreground"
                >
                  <Icon
                    className="h-[0.95rem] w-[0.95rem] text-[hsl(var(--section-accent-h)_var(--section-accent-s)_var(--section-accent-l))]"
                    aria-hidden
                    strokeWidth={1.75}
                  />
                  {trait.label}
                </span>
              );
            })}
          </div>

          <div className="mb-5 flex w-full flex-col items-stretch gap-[0.65rem] sm:mb-7 sm:flex-row sm:items-center sm:gap-1">
            {primaryCta ? <AboutHeroCta href={primaryCta.href} label={primaryCta.label} /> : null}
            {secondaryCta ? (
              <Link
                href={secondaryCta.href}
                prefetch
                className="inline-flex items-center justify-center rounded-full border border-border bg-background py-4 px-6 text-[0.9375rem] font-semibold text-foreground no-underline transition-[transform,border-color,background-color] duration-[0.18s] ease-in-out hover:-translate-y-px hover:border-black/[0.14] hover:bg-[color-mix(in_oklab,var(--muted)_35%,var(--background))] focus-visible:-translate-y-px focus-visible:border-black/[0.14] focus-visible:bg-[color-mix(in_oklab,var(--muted)_35%,var(--background))] focus-visible:outline-none sm:w-auto sm:py-4 sm:px-6"
              >
                {secondaryCta.label}
              </Link>
            ) : null}
          </div>

          <div className="flex w-full flex-col gap-[0.65rem]">
            <p className="m-0 text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              {ABOUT_HERO_CONTENT.languagesLabel}
            </p>
            <div className="flex flex-wrap gap-2">
              {ABOUT_HERO_CONTENT.featuredLanguages.map((language) => (
                <span
                  key={language.id}
                  className="inline-flex items-center gap-[0.45rem] rounded-full border border-border bg-background py-[0.35rem] pl-[0.45rem] pr-3 text-[0.8125rem] font-medium text-foreground"
                >
                  <Image
                    src={flagImageUrl(language.countryCode)}
                    alt={`${language.label} flag`}
                    width={18}
                    height={18}
                    className="h-4.5 w-4.5 rounded-full object-cover"
                  />
                  {language.label}
                </span>
              ))}
              <span className="inline-flex items-center rounded-full bg-[hsl(var(--section-accent-h)_var(--section-accent-s)_var(--section-accent-l)/0.12)] py-[0.35rem] px-3 text-[0.8125rem] font-semibold text-[hsl(var(--section-accent-h)_var(--section-accent-s)_calc(var(--section-accent-l)-18%))]">
                + {ABOUT_HERO_CONTENT.languagesMoreCount} more
              </span>
            </div>
          </div>
        </div>

        <AboutHeroVisual />
      </div>
    </section>
  );
}
