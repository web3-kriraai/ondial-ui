"use client";

import Image from "next/image";
import { motion, useInView, useReducedMotion, type Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";

import { FooterNewsletterForm } from "@/components/layout/footer-newsletter-form";
import { TextReveal } from "@/components/ui/text-reveal";
import { AppLink as Link } from "@/components/ui/app-link";
import {
  FOOTER_BRAND_TAGLINE,
  FOOTER_COMPANY_LINKS,
  FOOTER_LEGAL_LINKS,
  FOOTER_NEWSLETTER,
  FOOTER_PLATFORM_LINKS,
  FOOTER_SOCIAL_LINKS,
  type FooterNavLink,
} from "@/config/footer";
import { APP_NAME } from "@/lib/constants";
import { cn } from "@/lib/utils";

import styles from "./marketing-site-footer.module.css";

const gridVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.06,
    },
  },
};

const columnVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

function FooterLink({ item }: { item: FooterNavLink }) {
  if (item.external) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.link}
      >
        {item.label}
        <ArrowUpRight className="size-3.5 shrink-0 opacity-70" aria-hidden />
      </a>
    );
  }

  return (
    <Link href={item.href} prefetch className={styles.link}>
      {item.label}
    </Link>
  );
}

function FooterNavColumn({
  title,
  links,
  ariaLabel,
  className,
}: {
  title: string;
  links: readonly FooterNavLink[];
  ariaLabel: string;
  className?: string;
}) {
  return (
    <motion.nav
      className={className}
      aria-label={ariaLabel}
      variants={columnVariants}
    >
      <TextReveal as="p" className={styles.columnTitle} delay={0.04} stagger={0.05}>
        {title}
      </TextReveal>
      <ul className={styles.linkList}>
        {links.map((item) => (
          <li key={item.href}>
            <FooterLink item={item} />
          </li>
        ))}
      </ul>
    </motion.nav>
  );
}

export type MarketingSiteFooterProps = {
  className?: string;
  /** @deprecated CTA card removed — kept for API compatibility. */
  showCtaCard?: boolean;
};

export function MarketingSiteFooter({ className }: MarketingSiteFooterProps) {
  const year = new Date().getFullYear();
  const prefersReducedMotion = useReducedMotion();
  const footerRef = useRef<HTMLElement>(null);
  const footerInView = useInView(footerRef, { once: true, amount: 0.2 });
  const showColumns = prefersReducedMotion || footerInView;

  return (
    <footer ref={footerRef} className={cn(styles.footer, "relative overflow-hidden rounded-b-2xl", className)}>
      {/* Huge subtle background text */}
      <div className="pointer-events-none absolute inset-0 hidden items-center justify-center overflow-hidden select-none md:flex">
        <span
          className="bg-gradient-to-b from-black/[0.07] to-transparent bg-clip-text text-[16vw] lg:text-[23vw] font-black leading-none tracking-tighter text-transparent"
          aria-hidden="true"
        >
          ONDIAL
        </span>
      </div>

      <div className={cn(styles.inner, "relative z-10")}>
        <motion.div
          className={styles.grid}
          variants={gridVariants}
          initial="hidden"
          animate={showColumns ? "visible" : "hidden"}
        >
          <motion.div
            className={cn(styles.brandCol, prefersReducedMotion && styles.columnMotionReduce)}
            variants={columnVariants}
          >
            <Link href="/" prefetch className={styles.brandMark}>
              <Image src="/fav.svg" alt="" width={32} height={32} className="size-8" loading="lazy" />
              <span className={styles.brandName}>{APP_NAME}</span>
            </Link>
            <p className={styles.tagline}>{FOOTER_BRAND_TAGLINE}</p>
            <div className={styles.newsletterWrap}>
              <FooterNewsletterForm className="max-w-full" />
            </div>
            <TextReveal as="p" className={styles.copyright} delay={0.1} stagger={0.04}>
              {`© ${year} ${APP_NAME}. All rights reserved.`}
            </TextReveal>
          </motion.div>

          <FooterNavColumn
            title="Company"
            links={FOOTER_COMPANY_LINKS}
            ariaLabel="Company links"
          />

          <FooterNavColumn
            title="Platform"
            links={FOOTER_PLATFORM_LINKS}
            ariaLabel="Platform links"
            className={styles.hideSm}
          />

          <FooterNavColumn
            title="Social"
            links={FOOTER_SOCIAL_LINKS}
            ariaLabel="Social links"
            className={styles.hideMd}
          />

          <FooterNavColumn title="Legal" links={FOOTER_LEGAL_LINKS} ariaLabel="Legal links" />
        </motion.div>
      </div>
    </footer>
  );
}
