"use client";

import { BadgeCheck, CreditCard, GlobeLock, ShieldCheck } from "lucide-react";
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
  COMPLIANCE_BADGES,
  COMPLIANCE_HEADING,
  type ComplianceBadgeId,
} from "@/data/compliance-badges";
import { cn } from "@/lib/utils";
import Image from "next/image";

import styles from "./compliance-trust-section.module.css";

const headingClass =
  "text-balance text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem]";

const descriptionClass =
  "mx-auto mt-4 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg";

// const badgeMeta: Record<
//   ComplianceBadgeId,
//   { icon: ElementType; iconClass: string }
// > = {
//   hipaa: { icon: ShieldCheck, iconClass: styles.iconHipaa },
//   gdpr: { icon: GlobeLock, iconClass: styles.iconGdpr },
//   "pci-dss": { icon: CreditCard, iconClass: styles.iconPci },
//   "soc-2": { icon: BadgeCheck, iconClass: styles.iconSoc },
// };

const gridVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.1,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export function ComplianceTrustSection() {
  const prefersReducedMotion = useReducedMotion();
  const gridRef = useRef<HTMLUListElement>(null);
  const gridInView = useInView(gridRef, { once: true, amount: 0.12 });
  const showCards = prefersReducedMotion || gridInView;

  return (
    <section
      id="compliance"
      className={cn(marketingSectionShellClass, styles.section, "bg-background")}
      style={ONDIAL_ACCENT_STYLE}
      aria-labelledby="compliance-title"
    >
      <div className={marketingSectionContainerClass}>
        <header className="mx-auto max-w-3xl text-center">
          <p className={cn("mb-4", marketingEyebrowClass)}>{COMPLIANCE_HEADING.eyebrow}</p>
          <h2 id="compliance-title" className={headingClass}>
            <TextReveal as="span" className="block" delay={0.05} stagger={0.07} inViewAmount={0.5}>
              {COMPLIANCE_HEADING.titleLead}
            </TextReveal>
            <TextReveal
              as="span"
              className="block"
              delay={0.12}
              stagger={0.07}
              inViewAmount={0.5}
              segments={[{ text: COMPLIANCE_HEADING.titleAccent, className: styles.titleAccent }]}
            />
          </h2>
          <TextReveal
            as="p"
            className={descriptionClass}
            delay={0.22}
            stagger={0.028}
            inViewAmount={0.4}
          >
            {COMPLIANCE_HEADING.description}
          </TextReveal>
        </header>

        <motion.ul
          ref={gridRef}
          className="mx-auto mt-10 max-w-5xl sm:mt-12 lg:mt-14 grid sm:grid-cols-3 lg:grid-cols-5"
          aria-label="Compliance and security standards"
          variants={gridVariants}
          initial="hidden"
          animate={showCards ? "visible" : "hidden"}
        >
          {COMPLIANCE_BADGES.map((badge) => {
            // const { icon: Icon, iconClass } = badgeMeta[badge.id];
            return (
              <motion.li
                key={badge.id}
                className={cn(styles.card, prefersReducedMotion && styles.cardMotionReduce)}
                variants={cardVariants}
              >
                {/* <span className={cn(styles.iconWrap, iconClass)} aria-hidden>
                  <Icon className="size-5 sm:size-[1.35rem]" strokeWidth={1.75} />
                </span> */}
                <div className="w-full h-25 flex items-center justify-center mb-5">
                  <Image src={badge.icon} alt={badge.label} width={100} height={100} aria-hidden className="object-cover" />
                </div>
                <p className={styles.label}>{badge.label}</p>
                <p className={styles.detail}>{badge.detail}</p>
              </motion.li>
            );
          })}
        </motion.ul>

        <TextReveal
          as="p"
          className={styles.footnote}
          delay={0.08}
          stagger={0.022}
          inViewAmount={0.35}
        >
          {COMPLIANCE_HEADING.footnote}
        </TextReveal>
      </div>
    </section>
  );
}
