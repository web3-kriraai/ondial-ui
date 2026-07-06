"use client";

import { ServicesCapabilitiesCarousel } from "@/components/marketing/services-capabilities-carousel";
import { ONDIAL_ACCENT_STYLE } from "@/components/marketing/split-screen-section";
import { TextReveal } from "@/components/ui/text-reveal";
import {
  marketingEyebrowClass,
  marketingSectionContainerClass,
  marketingSectionShellClass,
} from "@/config/marketing-layout";
import { SERVICES_CAPABILITIES, SERVICES_CAPABILITIES_SECTION } from "@/data/services-capabilities-content";
import { cn } from "@/lib/utils";

const headingClass =
  "text-balance text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem]";

const subtitleClass =
  "mx-auto mt-4 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg";

export function HomeCapabilitiesSection() {
  return (
    <section
      id="capabilities"
      className={cn(marketingSectionShellClass, "bg-background")}
      style={ONDIAL_ACCENT_STYLE}
      aria-labelledby="capabilities-title"
    >
      <div className={marketingSectionContainerClass}>
        <header className="mx-auto max-w-3xl text-center">
          <p className={cn("mb-4", marketingEyebrowClass)}>{SERVICES_CAPABILITIES_SECTION.eyebrow}</p>
          <h2 id="capabilities-title" className={headingClass}>
            <TextReveal as="span" className="block" delay={0.05} stagger={0.07} inViewAmount={0.5}>
              {SERVICES_CAPABILITIES_SECTION.title}
            </TextReveal>
          </h2>
          <TextReveal as="p" className={subtitleClass} delay={0.2} stagger={0.028} inViewAmount={0.4}>
            {SERVICES_CAPABILITIES_SECTION.description}
          </TextReveal>
        </header>

        <ServicesCapabilitiesCarousel
          capabilities={SERVICES_CAPABILITIES}
          className="mx-auto mt-10 sm:mt-12 lg:mt-14"
        />
      </div>
    </section>
  );
}
