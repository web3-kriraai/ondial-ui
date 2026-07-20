"use client";

import { Building2, Globe2, MapPin, type LucideIcon } from "lucide-react";
import { motion, useInView, useReducedMotion, type Variants } from "framer-motion";
import { useRef } from "react";

import { ONDIAL_ACCENT_STYLE } from "@/components/marketing/split-screen-section";
import { marketingSectionContainerClass } from "@/config/marketing-layout";
import { SERVICES_COUNTRIES_SECTION } from "@/data/services-countries-content";
import { cn } from "@/lib/utils";

import styles from "./home-global-reach-stats-section.module.css";

const STAT_ICONS: Record<string, LucideIcon> = {
  countries: Globe2,
  states: MapPin,
  cities: Building2,
};

const easeOut = [0.22, 1, 0.36, 1] as const;

const gridVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.04 },
  },
};

const statVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.38, ease: easeOut },
  },
};

export function HomeGlobalReachStatsSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });
  const prefersReducedMotion = useReducedMotion();
  const animate = inView && !prefersReducedMotion;

  return (
    <section
      ref={ref}
      id="global-reach"
      className="w-full bg-background py-8 sm:py-10 lg:py-12"
      style={ONDIAL_ACCENT_STYLE}
      aria-label="OnDial global reach"
    >
      <div className={marketingSectionContainerClass}>
        <motion.ul
          className={cn(styles.statsRow, "list-none p-0")}
          initial="hidden"
          animate={animate ? "visible" : "hidden"}
          variants={gridVariants}
        >
          {SERVICES_COUNTRIES_SECTION.stats.map((stat) => {
            const Icon = STAT_ICONS[stat.id] ?? Globe2;

            return (
              <motion.li key={stat.id} className={styles.statItem} variants={statVariants}>
                <span className={styles.statIcon} aria-hidden>
                  <Icon className="size-4" strokeWidth={1.85} />
                </span>
                <div>
                  <p className={styles.statValue}>{stat.value}</p>
                  <p className={styles.statLabel}>{stat.label}</p>
                </div>
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
}
