"use client";

import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView, useReducedMotion, type Variants } from "framer-motion";
import { useRef, useState } from "react";

import { ONDIAL_ACCENT_STYLE } from "@/components/marketing/split-screen-section";
import { TextReveal } from "@/components/ui/text-reveal";
import {
  marketingDottedSectionShellClass,
  marketingSectionContainerClass,
} from "@/config/marketing-layout";
import {
  CONTACT_MISSION_HEADING,
  CONTACT_MISSION_PILLARS,
  type ContactMissionPillar,
} from "@/data/contact-mission-content";
import { cn } from "@/lib/utils";

const easeOut = [0.22, 1, 0.36, 1] as const;

const listVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.12 } },
};

const rowVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.48, ease: easeOut },
  },
};

function MissionRow({
  pillar,
  isActive,
  onActivate,
}: {
  pillar: ContactMissionPillar;
  isActive: boolean;
  onActivate: () => void;
}) {
  return (
    <motion.article
      variants={rowVariants}
      onMouseEnter={onActivate}
      onFocus={onActivate}
      className={cn(
        "group relative border-t border-border/70 transition-[background-color] duration-500",
        isActive && "bg-muted/20",
      )}
    >
      <div
        className={cn(
          "grid gap-4 py-6 transition-[padding] duration-500 sm:gap-6 sm:py-7 lg:gap-8",
          "grid-cols-[minmax(0,1fr)_3.5rem] lg:grid-cols-[minmax(0,22rem)_4.5rem_minmax(0,1fr)] xl:grid-cols-[minmax(0,28rem)_5rem_minmax(0,1fr)]",
          isActive && "py-8 sm:py-10 lg:py-12",
        )}
      >
        {/* Image column - desktop */}
        <div className="relative hidden min-h-0 lg:block">
          <div
            className={cn(
              "overflow-hidden rounded-sm bg-muted transition-all duration-500 ease-out",
              isActive
                ? "aspect-4/5 h-65 w-full opacity-100"
                : "h-42 w-74 opacity-100",
            )}
          >
            <Image
              src={pillar.image}
              alt={pillar.title}
              width={480}
              height={isActive ? 560 : 96}
              className={cn(
                "h-full w-full object-cover transition-transform duration-700 ease-out rounded-xl",
                isActive && "scale-100",
                !isActive && "scale-105",
              )}
            />
          </div>

        </div>

        {/* Image column - mobile/tablet */}
        <div className="relative lg:hidden">
          <div
            className={cn(
              "overflow-hidden rounded-sm bg-muted transition-all duration-500 ease-out",
              isActive ? "aspect-4/3 w-full" : "h-14 w-24",
            )}
          >
            <Image
              src={pillar.image}
              alt={pillar.title}
              width={480}
              height={360}
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]" 
            />
          </div>
        </div>

        {/* Number */}
        <div className="flex items-start">
          <span
            className={cn(
              "font-semibold leading-none tracking-tight transition-all duration-500",
              isActive
                ? "text-[clamp(2.5rem,5vw,3.5rem)] text-foreground"
                : "text-[clamp(1.75rem,4vw,2.25rem)] text-foreground/25",
            )}
          >
            {pillar.number}.
          </span>
        </div>

        {/* Content */}
        <div className="col-span-2 flex min-w-0 flex-col lg:col-span-1">
          <h3
            className={cn(
              "m-0 font-semibold tracking-tight text-foreground transition-all duration-500",
              isActive ? "text-xl sm:text-2xl" : "text-base sm:text-lg",
            )}
          >
            {pillar.title}
          </h3>

          <div
            className={cn(
              "grid transition-all duration-500 ease-out",
              isActive ? "mt-4 grid-rows-[1fr] opacity-100" : "mt-0 grid-rows-[0fr] opacity-0",
            )}
          >
            <div className="overflow-hidden">
              <p className="m-0 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-[0.9375rem] sm:leading-[1.7]">
                {pillar.description}
              </p>

              <div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="m-0 text-[0.625rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground/70">
                    Managed by
                  </p>
                  <ul className="m-0 mt-2 flex list-none flex-wrap gap-x-4 gap-y-2 p-0">
                    {pillar.managedBy.map((person) => (
                      <li key={person.name} className="flex items-center gap-2">
                        <span className="relative size-7 overflow-hidden rounded-full bg-muted">
                          <Image
                            src={person.avatarSrc}
                            alt={`${person.name} avatar`}
                            fill
                            className="object-cover "
                            sizes="28px"
                          />
                        </span>
                        <span className="text-xs font-medium text-foreground/80">{person.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href={pillar.ctaHref}
                  className={cn(
                    "inline-flex w-fit shrink-0 items-center justify-center rounded-sm bg-foreground px-5 py-2.5",
                    "text-sm font-semibold text-background no-underline",
                    "transition-[transform,box-shadow] duration-300 hover:-translate-y-px hover:shadow-md",
                  )}
                >
                  {pillar.ctaLabel}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export function ContactMissionSection() {
  const prefersReducedMotion = useReducedMotion();
  const listRef = useRef<HTMLDivElement>(null);
  const listInView = useInView(listRef, { once: true, amount: 0.08 });
  const showRows = prefersReducedMotion || listInView;
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section
      id="contact-mission"
      className={marketingDottedSectionShellClass}
      style={ONDIAL_ACCENT_STYLE}
      aria-labelledby="contact-mission-title"
      onMouseLeave={() => setActiveIndex(0)}
    >
      <div className={marketingSectionContainerClass}>
        <header className="relative border-b border-border/70 pb-8 sm:pb-10">
          <div className="flex items-start justify-between gap-6">
            <div className="max-w-3xl">
              <p className="m-0 text-xs font-medium text-muted-foreground">
                <span className="border-b border-foreground/30 pb-0.5">{CONTACT_MISSION_HEADING.eyebrow}</span>
                <span className="text-muted-foreground/60">.</span>
              </p>

              <h2
                id="contact-mission-title"
                className="m-0 mt-5 text-balance text-[clamp(1.75rem,4.5vw,2.75rem)] font-semibold leading-[1.15] tracking-tight text-foreground"
              >
                <TextReveal as="span" className="block" delay={0.05} stagger={0.06} inViewAmount={0.45}>
                  {CONTACT_MISSION_HEADING.title}
                </TextReveal>
              </h2>
            </div>

            <Link
              href={CONTACT_MISSION_HEADING.ctaHref}
              className="mt-1 hidden shrink-0 text-foreground transition-opacity hover:opacity-60 sm:inline-flex"
              aria-label="Contact us"
            >
              <ArrowUpRight className="size-5" strokeWidth={1.5} aria-hidden />
            </Link>
          </div>
        </header>

        <motion.div
          ref={listRef}
          variants={listVariants}
          initial="hidden"
          animate={showRows ? "visible" : "hidden"}
          className="border-b border-border/70"
        >
          {CONTACT_MISSION_PILLARS.map((pillar, index) => (
            <MissionRow
              key={pillar.id}
              pillar={pillar}
              isActive={activeIndex === index}
              onActivate={() => setActiveIndex(index)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
