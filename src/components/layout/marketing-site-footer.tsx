"use client";

import Image from "next/image";
import { motion, useInView, useReducedMotion, type Variants } from "framer-motion";
import { ArrowUpRight, Mail } from "lucide-react";
import { useRef } from "react";

import { MarketingDotBackground } from "@/components/layout/marketing-dot-background";
import { TextReveal } from "@/components/ui/text-reveal";
import { AppLink as Link } from "@/components/ui/app-link";
import {
  FOOTER_BOTTOM_LEGAL_LINKS,
  FOOTER_BRAND_NAME,
  FOOTER_BRAND_TAGLINE,
  FOOTER_COLUMN_TITLES,
  FOOTER_CONTACT_EMAIL,
  FOOTER_COPYRIGHT_ENTITY,
  FOOTER_QUICK_LINKS,
  FOOTER_RESOURCES_LINKS,
  FOOTER_SOCIAL_LINKS,
  type FooterNavLink,
} from "@/config/footer";
import { cn } from "@/lib/utils";

import styles from "./marketing-site-footer.module.css";

const MotionLink = motion.create(Link);

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

function LinkedInIcon() {
  return (
    <svg className={styles.socialIcon} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg className={styles.socialIcon} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
  );
}

function FooterSocialLink({ item }: { item: FooterNavLink }) {
  const prefersReducedMotion = useReducedMotion();
  const Icon = item.label === "Instagram" ? InstagramIcon : LinkedInIcon;

  return (
    <motion.a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.socialLink}
      aria-label={item.label}
      whileHover={prefersReducedMotion ? undefined : { y: -2 }}
      transition={{ type: "spring", stiffness: 420, damping: 28 }}
    >
      <Icon />
    </motion.a>
  );
}

function FooterLink({ item }: { item: FooterNavLink }) {
  const prefersReducedMotion = useReducedMotion();
  const className = cn(styles.link, item.external && styles.linkExternal);

  if (item.external) {
    return (
      <motion.a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        whileHover={prefersReducedMotion ? undefined : { x: 2 }}
        transition={{ type: "spring", stiffness: 420, damping: 28 }}
      >
        <span className={styles.linkLabel}>{item.label}</span>
        <ArrowUpRight className={styles.linkArrow} aria-hidden />
      </motion.a>
    );
  }

  return (
    <MotionLink
      href={item.href}
      prefetch={false}
      className={className}
      whileHover={prefersReducedMotion ? undefined : { x: 3 }}
      transition={{ type: "spring", stiffness: 420, damping: 28 }}
    >
      <span className={styles.linkLabel}>{item.label}</span>
    </MotionLink>
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
  /** @deprecated CTA card removed - kept for API compatibility. */
  showCtaCard?: boolean;
};

export function MarketingSiteFooter({ className }: MarketingSiteFooterProps) {
  const year = new Date().getFullYear();
  const prefersReducedMotion = useReducedMotion();
  const footerRef = useRef<HTMLElement>(null);
  const footerInView = useInView(footerRef, { once: true, amount: 0.2 });
  const showColumns = prefersReducedMotion || footerInView;

  return (
    <footer ref={footerRef} className={cn(styles.footer, className)}>
      <motion.div
        className={styles.dotLayer}
        aria-hidden
        initial={prefersReducedMotion ? false : { opacity: 0 }}
        animate={showColumns ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <MarketingDotBackground animated layered className="inset-0" dotClassName="text-foreground/10" />
      </motion.div>

      <div className={styles.footerGlow} aria-hidden />

      <motion.div
        className={styles.watermark}
        aria-hidden
        initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.98 }}
        animate={showColumns ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.98 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
      >
        <span className={styles.watermarkText}>ONDIAL</span>
      </motion.div>

      <div className={styles.inner}>
        <motion.div
          className={styles.grid}
          variants={gridVariants}
          initial="hidden"
          animate={showColumns ? "visible" : "hidden"}
        >
          <motion.div className={styles.brandCol} variants={columnVariants}>
            <Link href="/" prefetch={false} className={styles.brandMark}>
              <Image src="/fav.svg" alt="OnDial Logo" width={32} height={32} className="size-8" loading="lazy" />
              <span className={styles.brandName}>{FOOTER_BRAND_NAME}</span>
            </Link>
            <p className={styles.tagline}>{FOOTER_BRAND_TAGLINE}</p>
            <motion.a
              href={`mailto:${FOOTER_CONTACT_EMAIL}`}
              className={styles.contactEmail}
              whileHover={prefersReducedMotion ? undefined : { x: 2 }}
              transition={{ type: "spring", stiffness: 420, damping: 28 }}
            >
              <Mail className={styles.contactEmailIcon} aria-hidden strokeWidth={2} />
              <span>{FOOTER_CONTACT_EMAIL}</span>
            </motion.a>
            <div className={styles.socialList}>
              {FOOTER_SOCIAL_LINKS.map((item) => (
                <FooterSocialLink key={item.href} item={item} />
              ))}
            </div>
          </motion.div>

          <FooterNavColumn
            title={FOOTER_COLUMN_TITLES.quickLinks}
            links={FOOTER_QUICK_LINKS}
            ariaLabel="Quick links"
          />

          <FooterNavColumn
            title={FOOTER_COLUMN_TITLES.resources}
            links={FOOTER_RESOURCES_LINKS}
            ariaLabel="Resources"
          />
        </motion.div>

        <motion.div
          className={styles.bottomBar}
          variants={columnVariants}
          initial="hidden"
          animate={showColumns ? "visible" : "hidden"}
        >
          <p className={styles.bottomCopyright}>
            {`© ${year} ${FOOTER_COPYRIGHT_ENTITY}`}
          </p>
          <nav className={styles.bottomLegalNav} aria-label="Legal links">
            {FOOTER_BOTTOM_LEGAL_LINKS.map((item, index) => (
              <span key={item.href} className={styles.bottomLegalItem}>
                {index > 0 ? <span className={styles.bottomLegalSep} aria-hidden>|</span> : null}
                <Link href={item.href} prefetch={false} className={styles.bottomLegalLink}>
                  {item.label}
                </Link>
              </span>
            ))}
          </nav>
        </motion.div>
      </div>
    </footer>
  );
}
