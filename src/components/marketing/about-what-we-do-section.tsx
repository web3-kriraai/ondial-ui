"use client";

import {
  Check,
  Clock3,
  Globe2,
  MessageCircle,
  PlugZap,
  Sparkles,
  UserCheck,
  Zap,
} from "lucide-react";
import { motion, useInView, useReducedMotion, type Variants } from "framer-motion";
import { useRef, type ElementType } from "react";

import { ONDIAL_ACCENT_STYLE } from "@/components/marketing/split-screen-section";
import { TextReveal } from "@/components/ui/text-reveal";
import {
  marketingEyebrowClass,
  marketingSectionContainerClass,
  marketingSectionShellClass,
} from "@/config/marketing-layout";
import {
  ABOUT_WHAT_WE_DO_CAPABILITIES,
  ABOUT_WHAT_WE_DO_HEADING,
  ABOUT_WHAT_WE_DO_HIGHLIGHTS,
  ABOUT_WHAT_WE_DO_USE_CASES,
  type WhatWeDoCapabilityId,
} from "@/data/about-what-we-do-content";
import { cn } from "@/lib/utils";

const easeOut = [0.22, 1, 0.36, 1] as const;

const capabilityMeta: Record<
  WhatWeDoCapabilityId,
  { icon: ElementType; iconClass: string; checkClass: string }
> = {
  "always-on": {
    icon: Clock3,
    iconClass: "bg-[#e1f5ee] text-[#085041]",
    checkClass: "bg-[#e1f5ee] text-[#085041]",
  },
  "human-voice": {
    icon: MessageCircle,
    iconClass:
      "bg-[hsl(var(--section-accent-h)_var(--section-accent-s)_var(--section-accent-l)/0.12)] text-[hsl(var(--section-accent-h)_var(--section-accent-s)_calc(var(--section-accent-l)-18%))]",
    checkClass:
      "bg-[hsl(var(--section-accent-h)_var(--section-accent-s)_var(--section-accent-l)/0.12)] text-[hsl(var(--section-accent-h)_var(--section-accent-s)_calc(var(--section-accent-l)-18%))]",
  },
  languages: {
    icon: Globe2,
    iconClass: "bg-[#e6f1fb] text-[#0c447c]",
    checkClass: "bg-[#e6f1fb] text-[#0c447c]",
  },
  "instant-response": {
    icon: Zap,
    iconClass: "bg-[#faeeda] text-[#633806]",
    checkClass: "bg-[#faeeda] text-[#633806]",
  },
  "lead-routing": {
    icon: UserCheck,
    iconClass: "bg-[#e1f5ee] text-[#085041]",
    checkClass: "bg-[#e1f5ee] text-[#085041]",
  },
  integration: {
    icon: PlugZap,
    iconClass: "bg-[#faeeda] text-[#633806]",
    checkClass: "bg-[#faeeda] text-[#633806]",
  },
};

const gridVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.08 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: easeOut },
  },
};

export function AboutWhatWeDoSection() {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });
  const show = prefersReducedMotion || isInView;

  return (
    <section
      ref={sectionRef}
      id="what-we-do"
      className={cn(marketingSectionShellClass, "bg-background")}
      style={ONDIAL_ACCENT_STYLE}
      aria-labelledby="what-we-do-title"
    >
      <div className={marketingSectionContainerClass}>
        <header className="mx-auto mb-[clamp(1.75rem,4vw,2.5rem)] max-w-176 text-center">
          <p className={cn(marketingEyebrowClass, "mb-4 inline-flex items-center gap-[0.4rem]")}>
            <Sparkles
              className="h-3.5 w-3.5 text-[hsl(var(--section-accent-h)_var(--section-accent-s)_var(--section-accent-l))]"
              aria-hidden
              strokeWidth={1.75}
            />
            {ABOUT_WHAT_WE_DO_HEADING.eyebrow}
          </p>
          <h2
            id="what-we-do-title"
            className="m-0 text-balance text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem]"
          >
            <TextReveal as="span" className="block" delay={0.05} stagger={0.07} inViewAmount={0.5}>
              {ABOUT_WHAT_WE_DO_HEADING.title}
            </TextReveal>
          </h2>
        </header>

        <div className="relative overflow-hidden rounded-3xl border border-black/8 bg-background p-[clamp(1.5rem,0.5rem,2.5rem)] shadow-[0_2px_4px_rgb(15_23_42/0.04),0_16px_40px_-20px_rgb(15_23_42/0.12)]">
          <div
            className="pointer-events-none absolute -top-[40%] -left-[20%] h-[min(28rem,70%)] w-[min(28rem,70%)] rounded-full bg-[radial-gradient(circle,hsl(var(--section-accent-h)_var(--section-accent-s)_var(--section-accent-l)/0.07)_0%,transparent_68%)]"
            aria-hidden
          />

          <div className="relative z-1 grid items-start gap-[clamp(1.75rem,4vw,2.75rem)] lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-[clamp(2rem,4vw,3.25rem)]">
            <div className="flex flex-col gap-[1.15rem]">
              <TextReveal
                as="p"
                className="m-0 mt-0 max-w-none text-left text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg"
                delay={0.14}
                stagger={0.024}
                inViewAmount={0.4}
              >
                {ABOUT_WHAT_WE_DO_HEADING.paragraphOne}
              </TextReveal>
              <TextReveal
                as="p"
                className="m-0 max-w-none text-left text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg"
                delay={0.22}
                stagger={0.024}
                inViewAmount={0.4}
              >
                {ABOUT_WHAT_WE_DO_HEADING.paragraphTwo}
              </TextReveal>

              <motion.ul
                className="m-0 mt-[0.35rem] grid list-none grid-cols-3 gap-[0.65rem] p-0"
                aria-label="Platform highlights"
                initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
                animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                transition={{ duration: 0.45, ease: easeOut, delay: 0.26 }}
              >
                {ABOUT_WHAT_WE_DO_HIGHLIGHTS.map((highlight) => (
                  <li
                    key={highlight.id}
                    className="flex flex-col items-center gap-[0.15rem] rounded-[0.875rem] border border-black/6 bg-slate-900/2 py-[0.85rem] px-2 text-center"
                  >
                    <span className="text-base font-bold leading-[1.1] tracking-[-0.03em] text-foreground sm:text-2xl">
                      {highlight.label}
                    </span>
                    <span className="text-[0.55rem] font-semibold uppercase tracking-[0.06em] text-muted-foreground sm:text-[0.65rem]">
                      {highlight.detail}
                    </span>
                  </li>
                ))}
              </motion.ul>

              <motion.div
                className="mt-1 flex flex-col gap-[0.65rem]"
                initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
                animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                transition={{ duration: 0.45, ease: easeOut, delay: 0.32 }}
              >
                <p className="m-0 text-[0.6875rem] font-bold uppercase tracking-[0.08em] text-muted-foreground">
                  Use cases
                </p>
                <ul className="m-0 flex list-none flex-wrap gap-[0.45rem] p-0" aria-label="Common use cases">
                  {ABOUT_WHAT_WE_DO_USE_CASES.map((useCase) => (
                    <li key={useCase}>
                      <span className="inline-block rounded-full border border-black/[0.07] bg-background py-[0.4rem] px-3 text-[0.8125rem] font-medium leading-[1.3] text-foreground">
                        {useCase}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            <div className="flex flex-col gap-[0.85rem]">
              <p className="m-0 text-[0.6875rem] font-bold uppercase tracking-[0.08em] text-muted-foreground">
                Core capabilities
              </p>
              <motion.ul
                className="m-0 grid list-none gap-[0.65rem] sm:grid-cols-2 sm:gap-3"
                aria-label="OnDial capabilities"
                variants={gridVariants}
                initial="hidden"
                animate={show ? "visible" : "hidden"}
              >
                {ABOUT_WHAT_WE_DO_CAPABILITIES.map((capability) => {
                  const { icon: Icon, iconClass, checkClass } = capabilityMeta[capability.id];

                  return (
                    <motion.li
                      key={capability.id}
                      className={cn(
                        "relative flex min-h-full flex-col items-start gap-3 rounded-[0.875rem] border border-black/6 bg-background p-4 pb-[1.05rem] transition-[transform,box-shadow,border-color] duration-[0.22s] ease-in-out hover:-translate-y-0.5 hover:border-black/10 hover:shadow-[0_2px_4px_rgb(15_23_42/0.05),0_16px_32px_-14px_rgb(15_23_42/0.14)]",
                        prefersReducedMotion && "transform-none!",
                      )}
                      variants={itemVariants}
                    >
                      <span
                        className={cn(
                          "absolute top-3 right-3 grid h-5 w-5 shrink-0 place-items-center rounded-full",
                          checkClass,
                        )}
                        aria-hidden
                      >
                        <Check className="h-2.5 w-2.5" strokeWidth={2.5} />
                      </span>
                      <span
                        className={cn(
                          "grid h-10 w-10 shrink-0 place-items-center rounded-xl",
                          iconClass,
                        )}
                        aria-hidden
                      >
                        <Icon className="h-4.5 w-4.5" strokeWidth={1.75} />
                      </span>
                      <span className="text-sm font-semibold leading-[1.45] text-foreground">
                        {capability.label}
                      </span>
                    </motion.li>
                  );
                })}
              </motion.ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
