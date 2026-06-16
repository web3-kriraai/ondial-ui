"use client";

import { Globe2, Handshake, MessageCircle, Sparkles, Star } from "lucide-react";
import { motion, useInView, useReducedMotion, type Variants } from "framer-motion";
import { useRef, type ElementType } from "react";

import { AboutMissionHubVisual } from "@/components/marketing/about-mission-hub-visual";
import { ONDIAL_ACCENT_STYLE } from "@/components/marketing/split-screen-section";
import { TextReveal } from "@/components/ui/text-reveal";
import {
  marketingEyebrowClass,
  marketingSectionContainerClass,
  marketingSectionShellClass,
} from "@/config/marketing-layout";
import {
  ABOUT_MISSION_COMMITMENTS,
  ABOUT_MISSION_HEADING,
  type MissionCommitmentId,
} from "@/data/about-mission-content";
import { cn } from "@/lib/utils";

const easeOut = [0.22, 1, 0.36, 1] as const;

const commitmentMeta: Record<MissionCommitmentId, { icon: ElementType; iconWrapClass: string }> = {
  effortless: { icon: MessageCircle, iconWrapClass: "bg-[#e6f1fb] text-[#0c447c]" },
  connect: { icon: Handshake, iconWrapClass: "bg-[#e1f5ee] text-[#085041]" },
  matters: {
    icon: Star,
    iconWrapClass:
      "bg-[hsl(var(--section-accent-h)_var(--section-accent-s)_var(--section-accent-l)/0.12)] text-[hsl(var(--section-accent-h)_var(--section-accent-s)_calc(var(--section-accent-l)-18%))]",
  },
  barriers: { icon: Globe2, iconWrapClass: "bg-[#faeeda] text-[#633806]" },
  experiences: { icon: Sparkles, iconWrapClass: "bg-[#e1f5ee] text-[#085041]" },
};

const commitmentGridColumnClasses = [
  "lg:col-span-2",
  "lg:col-span-2",
  "lg:col-span-2",
  "lg:col-[1/span_3]",
  "lg:col-[4/span_3]",
] as const;

const gridVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.12 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: easeOut },
  },
};

export function AboutMissionSection() {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.12 });
  const show = prefersReducedMotion || isInView;

  return (
    <section
      ref={sectionRef}
      id="mission"
      className={cn(marketingSectionShellClass, "bg-background")}
      style={ONDIAL_ACCENT_STYLE}
      aria-labelledby="mission-title"
    >
      <div className={marketingSectionContainerClass}>
        <header className="mx-auto mb-[clamp(1.75rem,4vw,2.5rem)] max-w-176 text-center">
          <p className={cn(marketingEyebrowClass, "mb-4 inline-flex items-center gap-[0.4rem]")}>
            <Sparkles
              className="h-3.5 w-3.5 text-[hsl(var(--section-accent-h)_var(--section-accent-s)_var(--section-accent-l))]"
              aria-hidden
              strokeWidth={1.75}
            />
            {ABOUT_MISSION_HEADING.eyebrow}
          </p>
          <h2
            id="mission-title"
            className="m-0 text-balance text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem]"
          >
            <TextReveal as="span" className="block" delay={0.05} stagger={0.06} inViewAmount={0.45}>
              {ABOUT_MISSION_HEADING.titleLineOne}
            </TextReveal>
            <TextReveal
              as="span"
              className="mt-1 block text-[hsl(var(--section-accent-h)_var(--section-accent-s)_var(--section-accent-l))]"
              delay={0.14}
              stagger={0.06}
              inViewAmount={0.45}
            >
              {ABOUT_MISSION_HEADING.titleLineTwo}
            </TextReveal>
          </h2>
        </header>

        <div className="relative overflow-hidden rounded-3xl border border-black/8 bg-background shadow-[0_2px_4px_rgb(15_23_42/0.04),0_20px_48px_-24px_rgb(15_23_42/0.14)]">
          <div
            className="pointer-events-none absolute top-[20%] left-1/2 h-[min(20rem,60%)] w-[min(36rem,90%)] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,hsl(var(--section-accent-h)_var(--section-accent-s)_var(--section-accent-l)/0.07)_0%,transparent_68%)]"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgb(0_0_0/0.03)_1px,transparent_1px),linear-gradient(90deg,rgb(0_0_0/0.03)_1px,transparent_1px)] bg-size-[2.5rem_2.5rem] mask-[radial-gradient(ellipse_80%_70%_at_50%_40%,black_20%,transparent_75%)]"
            aria-hidden
          />

          <AboutMissionHubVisual show={show} />

          <motion.ul
            className="m-0 mt-[clamp(1.25rem,3vw,1.75rem)] grid list-none gap-[0.65rem] p-[clamp(0.85rem,2vw,1rem)] sm:grid-cols-2 sm:gap-3 lg:grid-cols-6 lg:gap-[0.65rem]"
            aria-label="Mission commitments"
            variants={gridVariants}
            initial="hidden"
            animate={show ? "visible" : "hidden"}
          >
            {ABOUT_MISSION_COMMITMENTS.map((commitment, index) => {
              const { icon: Icon, iconWrapClass } = commitmentMeta[commitment.id];

              return (
                <motion.li
                  key={commitment.id}
                  className={cn(
                    "relative flex min-h-full items-center gap-[0.65rem] rounded-[0.875rem] border border-black/6 bg-background p-[0.85rem_0.95rem] transition-[transform,box-shadow,border-color] duration-[0.22s] ease-in-out hover:-translate-y-0.5 hover:border-black/10 hover:shadow-[0_2px_4px_rgb(15_23_42/0.05),0_14px_28px_-14px_rgb(15_23_42/0.14)]",
                    commitmentGridColumnClasses[index],
                    prefersReducedMotion && "transform-none!",
                  )}
                  variants={itemVariants}
                >
                  <span
                    className={cn(
                      "grid h-8.5 w-8.5 shrink-0 place-items-center rounded-[0.625rem]",
                      iconWrapClass,
                    )}
                    aria-hidden
                  >
                    <Icon className="h-4 w-4" strokeWidth={1.75} />
                  </span>
                  <span className="text-[0.8125rem] font-semibold leading-[1.45] text-foreground">
                    {commitment.label}
                  </span>
                </motion.li>
              );
            })}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}
