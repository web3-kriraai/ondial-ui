"use client";

import { ArrowUpRight, Globe2, PhoneCall, Sparkles, Zap } from "lucide-react";
import Link from "next/link";
import { motion, useInView, useReducedMotion, type Variants } from "framer-motion";
import { useRef, type CSSProperties } from "react";

import { AboutHeroCta } from "@/components/marketing/about-hero-cta";
import { ONDIAL_ACCENT_STYLE } from "@/components/marketing/split-screen-section";
import { TextReveal } from "@/components/ui/text-reveal";
import {
  marketingEyebrowClass,
  marketingSectionContainerClass,
  marketingSectionShellClass,
} from "@/config/marketing-layout";
import { ABOUT_CTA_HEADING } from "@/data/about-cta-content";
import { cn } from "@/lib/utils";

const easeOut = [0.22, 1, 0.36, 1] as const;

const featureCards = [
  {
    id: "calls",
    icon: PhoneCall,
    label: "Instant call handling",
    iconWrapClass: "bg-[#e1f5ee] text-[#085041]",
    cardClass: "",
  },
  {
    id: "languages",
    icon: Globe2,
    label: "100+ languages",
    iconWrapClass: "bg-[#e6f1fb] text-[#0c447c]",
    cardClass: "lg:ml-6",
  },
  {
    id: "leads",
    icon: Zap,
    label: "Lead qualification",
    iconWrapClass: "bg-[#faeeda] text-[#633806]",
    cardClass: "lg:ml-3",
  },
] as const;

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.48, ease: easeOut, delay: 0.18 + index * 0.08 },
  }),
};

export function AboutCtaSection() {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const show = prefersReducedMotion || isInView;

  return (
    <section
      ref={sectionRef}
      id="get-started"
      className={cn(marketingSectionShellClass, "bg-background")}
      style={
        {
          ...ONDIAL_ACCENT_STYLE,
          "--showcase-accent-h": "262",
          "--showcase-accent-s": "83%",
          "--showcase-accent-l": "58%",
        } as CSSProperties
      }
      aria-labelledby="about-cta-title"
    >
      <div className={marketingSectionContainerClass}>
        <div className="relative overflow-hidden rounded-3xl border border-black/8 bg-background p-[clamp(1.75rem,4vw,2.75rem)] shadow-[0_2px_4px_rgb(15_23_42/0.04),0_20px_48px_-24px_rgb(15_23_42/0.14)]">
          <div className="relative z-1 grid items-center gap-[clamp(1.75rem,4vw,2.5rem)] lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-[clamp(2rem,4vw,3rem)]">
            <div className="flex flex-col items-start text-left">
              <p className={cn(marketingEyebrowClass, "mb-4 inline-flex items-center gap-[0.4rem]")}>
                <Sparkles
                  className="size-3.5 text-[hsl(var(--section-accent-h)_var(--section-accent-s)_var(--section-accent-l))]"
                  aria-hidden
                  strokeWidth={1.75}
                />
                {ABOUT_CTA_HEADING.eyebrow}
              </p>

              <h2
                id="about-cta-title"
                className="m-0 max-w-136 text-balance text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem]"
              >
                <TextReveal as="span" className="block" delay={0.05} stagger={0.06} inViewAmount={0.45}>
                  {ABOUT_CTA_HEADING.title}
                </TextReveal>
              </h2>

              <TextReveal
                as="p"
                className="mx-auto mt-4 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg"
                delay={0.16}
                stagger={0.024}
                inViewAmount={0.4}
              >
                {ABOUT_CTA_HEADING.description}
              </TextReveal>

              <motion.div
                className="mt-[clamp(1.5rem,3vw,2rem)] flex flex-wrap items-center gap-3"
                initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
                animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
                transition={{ duration: 0.45, ease: easeOut, delay: 0.24 }}
              >
                <AboutHeroCta
                  href={ABOUT_CTA_HEADING.primaryCta.href}
                  label={ABOUT_CTA_HEADING.primaryCta.label}
                />
                <Link
                  href={ABOUT_CTA_HEADING.secondaryCta.href}
                  prefetch
                  className="inline-flex min-h-11 items-center justify-center gap-[0.35rem] rounded-full border border-black/10 bg-background px-[1.35rem] py-[0.85rem] text-[0.9375rem] font-semibold text-foreground no-underline transition-[transform,border-color,background,box-shadow] duration-200 ease-in-out hover:-translate-y-px hover:border-black/[0.14] hover:bg-[color-mix(in_oklab,var(--muted)_35%,var(--background))] hover:shadow-[0_8px_24px_-16px_rgb(15_23_42/0.18)] focus-visible:-translate-y-px focus-visible:border-black/[0.14] focus-visible:bg-[color-mix(in_oklab,var(--muted)_35%,var(--background))] focus-visible:shadow-[0_8px_24px_-16px_rgb(15_23_42/0.18)] focus-visible:outline-none"
                >
                  {ABOUT_CTA_HEADING.secondaryCta.label}
                  <ArrowUpRight
                    className="size-4 shrink-0 text-[hsl(var(--section-accent-h)_var(--section-accent-s)_var(--section-accent-l))]"
                    aria-hidden
                    strokeWidth={2}
                  />
                </Link>
              </motion.div>
            </div>

            <div className="grid content-center gap-3 sm:max-lg:grid-cols-3" aria-hidden>
              {featureCards.map((card, index) => {
                const Icon = card.icon;

                return (
                  <motion.div
                    key={card.id}
                    className={cn(
                      "flex items-center gap-3 rounded-2xl border border-black/6 bg-background p-4 shadow-[0_2px_8px_-6px_rgb(15_23_42/0.12)] transition-[transform,border-color,box-shadow] duration-200 ease-in-out hover:-translate-y-0.5 hover:border-black/10 hover:shadow-[0_2px_4px_rgb(15_23_42/0.05),0_16px_32px_-14px_rgb(15_23_42/0.14)]",
                      card.cardClass,
                    )}
                    custom={index}
                    initial="hidden"
                    animate={show ? "visible" : "hidden"}
                    variants={cardVariants}
                  >
                    <span className={cn("grid size-10 shrink-0 place-items-center rounded-xl", card.iconWrapClass)}>
                      <Icon className="size-4.5" strokeWidth={1.75} />
                    </span>
                    <span className="text-sm font-semibold leading-[1.4] text-foreground">{card.label}</span>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
