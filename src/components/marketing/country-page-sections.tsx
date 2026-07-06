"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  Building2,
  ChevronDown,
  Languages,
  Scale,
  Sparkles,
} from "lucide-react";
import { motion, useInView, useReducedMotion, type Variants } from "framer-motion";
import { useRef, useState, type CSSProperties, type ReactNode } from "react";

import { AboutHeroCta } from "@/components/marketing/about-hero-cta";
import { CountryCardsCarousel } from "@/components/marketing/country-cards-carousel";
import enterpriseStyles from "@/components/marketing/enterprise-page-sections.module.css";
import { FaqAccordionPanel } from "@/components/marketing/faq-accordion-panel";
import { ONDIAL_ACCENT_STYLE } from "@/components/marketing/split-screen-section";
import { CountryFlag } from "@/components/ui/country-picker";
import {
  marketingEyebrowClass,
  marketingSectionContainerClass,
} from "@/config/marketing-layout";
import type {
  CountryBulletSection,
  CountryComparisonsContent,
  CountryCta,
  CountryFaqItem,
  CountryHeroContent,
  CountryIndustrySolutionsContent,
  CountryIntegrationsContent,
  CountryLanguageSupportContent,
  CountryOverviewContent,
} from "@/lib/countries/types";
import { cn } from "@/lib/utils";

import styles from "./country-page-sections.module.css";

/** Section + pill CTA accent vars (AboutHeroCta reads --showcase-accent-*). */
const COUNTRY_PAGE_ACCENT_STYLE = {
  ...ONDIAL_ACCENT_STYLE,
  "--showcase-accent-h": "262",
  "--showcase-accent-s": "83%",
  "--showcase-accent-l": "58%",
} as CSSProperties;

const sectionShellClass = "w-full bg-transparent py-14 sm:py-16 lg:py-20";
const pageHeaderShellClass =
  "mx-auto flex w-full min-w-0 max-w-3xl flex-col items-center px-4 sm:px-6 lg:max-w-4xl";
const headingClass =
  "text-balance pt-5 text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem]";
const descriptionClass =
  "mx-auto mt-4 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg";
const secondaryBtnClass =
  "inline-flex min-h-11 items-center justify-center gap-[0.35rem] rounded-full border border-black/10 bg-background px-[1.35rem] py-[0.85rem] text-[0.9375rem] font-semibold text-foreground no-underline transition-[transform,border-color,background,box-shadow] duration-200 ease-in-out hover:-translate-y-px hover:border-black/[0.14] hover:bg-[color-mix(in_oklab,var(--muted)_35%,var(--background))] hover:shadow-[0_8px_24px_-16px_rgb(15_23_42/0.18)] focus-visible:-translate-y-px focus-visible:border-black/[0.14] focus-visible:bg-[color-mix(in_oklab,var(--muted)_35%,var(--background))] focus-visible:shadow-[0_8px_24px_-16px_rgb(15_23_42/0.18)] focus-visible:outline-none";

const gridVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.06 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.48, ease: [0.22, 1, 0.36, 1] },
  },
};

function SectionDivider() {
  return <hr className={styles.sectionDivider} aria-hidden />;
}

function FadeInHeading({
  as: Tag = "h2",
  children,
  className,
  id,
}: {
  as?: "h1" | "h2";
  children: string;
  className?: string;
  id?: string;
}) {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const show = prefersReducedMotion || inView;
  const MotionTag = Tag === "h1" ? motion.h1 : motion.h2;

  return (
    <MotionTag
      ref={ref}
      id={id}
      className={className}
      initial={false}
      animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
}

function FadeInParagraph({ children, className }: { children: string; className?: string }) {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const show = prefersReducedMotion || inView;

  return (
    <motion.p
      ref={ref}
      className={className}
      initial={false}
      animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
      transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1], delay: show ? 0.08 : 0 }}
    >
      {children}
    </motion.p>
  );
}

function CountryCtaButtons({
  primaryCta,
  secondaryCta,
  centered = true,
}: {
  primaryCta: CountryCta;
  secondaryCta?: CountryCta;
  centered?: boolean;
}) {
  return (
    <div
      className={cn(
        "mt-6 flex w-full flex-wrap items-center gap-3",
        centered && "justify-center",
      )}
    >
      <AboutHeroCta href={primaryCta.href} label={primaryCta.label} />
      {secondaryCta ? (
        <Link href={secondaryCta.href} prefetch className={secondaryBtnClass}>
          {secondaryCta.label}
          <ArrowUpRight
            className="size-4 shrink-0 text-[hsl(var(--section-accent-h)_var(--section-accent-s)_var(--section-accent-l))]"
            strokeWidth={2}
            aria-hidden
          />
        </Link>
      ) : null}
    </div>
  );
}

/**
 * Renders admin-authored HTML (bold/italic/links/lists from the SEO panel's
 * rich-text editors). Content is only ever authored by trusted admins, never
 * untrusted user input — same trust model as the blog content pipeline.
 */
function RichText({ html, className }: { html: string; className?: string }) {
  if (!html) return null;
  return <div className={cn(styles.richText, className)} dangerouslySetInnerHTML={{ __html: html }} />;
}

/** Fade-in variant of RichText for section intros — TextReveal's per-word
 * split can't animate HTML markup, so intros get a block-level reveal instead. */
function RichTextReveal({ html, className }: { html: string; className?: string }) {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const show = prefersReducedMotion || inView;

  if (!html) return null;

  return (
    <motion.div
      ref={ref}
      className={cn(styles.richText, className)}
      initial={{ opacity: 0, y: 10 }}
      animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: show ? 0.15 : 0 }}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

function SectionHeader({
  eyebrow,
  title,
  description,
  titleId,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  titleId?: string;
}) {
  return (
    <header className="mx-auto max-w-3xl text-center">
      <p className={cn("mb-4", marketingEyebrowClass)}>{eyebrow}</p>
      <FadeInHeading as="h2" id={titleId} className={headingClass}>
        {title}
      </FadeInHeading>
      {description ? <RichTextReveal html={description} className={descriptionClass} /> : null}
    </header>
  );
}

function AnimatedGrid({ children, className }: { children: ReactNode; className?: string }) {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });
  const show = prefersReducedMotion || inView;

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={gridVariants}
      initial="hidden"
      animate={show ? "visible" : "hidden"}
    >
      {children}
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Hero
// ---------------------------------------------------------------------------

export function CountryHeroSection({
  hero,
  countryName,
  countryCode,
}: {
  hero: CountryHeroContent;
  countryName: string;
  countryCode?: string | null;
}) {
  return (
    <section
      id="country-hero"
      className="w-full bg-transparent pb-12 sm:pb-16 lg:pb-20"
      style={COUNTRY_PAGE_ACCENT_STYLE}
      aria-labelledby="country-hero-title"
    >
      <div className={cn(pageHeaderShellClass, "pt-6 sm:pt-8")}>
        <div className={cn(marketingEyebrowClass, "mb-4 inline-flex items-center gap-2")}>
          {countryCode ? (
            <CountryFlag iso2={countryCode} className="h-3 w-4.5" alt={`${countryName} flag`} />
          ) : null}
          {countryName}
        </div>
        <FadeInHeading
          as="h1"
          id="country-hero-title"
          className="mx-auto max-w-4xl text-balance pt-0 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-[2.625rem] lg:leading-tight"
        >
          {hero.title}
        </FadeInHeading>
        <FadeInParagraph className={descriptionClass}>{hero.description}</FadeInParagraph>

        <CountryCtaButtons
          primaryCta={hero.primaryCta}
          secondaryCta={hero.secondaryCta}
        />
      </div>

      {hero.bullets.length > 0 ? (
        <div className={cn(marketingSectionContainerClass, "mt-10 sm:mt-12")}>
          <CountryCardsCarousel visibleCount={3}>
            {hero.bullets.map((bullet, index) => (
              <article key={index} className={styles.heroBulletCard}>
                <span className={styles.heroBulletIcon} aria-hidden>
                  <Sparkles className="size-4" strokeWidth={1.85} />
                </span>
                <h3 className={styles.heroBulletTitle}>{bullet.title}</h3>
                <RichText html={bullet.description} className={styles.heroBulletText} />
              </article>
            ))}
          </CountryCardsCarousel>
        </div>
      ) : null}
    </section>
  );
}

// ---------------------------------------------------------------------------
// Overview
// ---------------------------------------------------------------------------

export function CountryOverviewSection({ overview }: { overview: CountryOverviewContent }) {
  return (
    <>
      <SectionDivider />
      <section className={cn(sectionShellClass, styles.section)} style={COUNTRY_PAGE_ACCENT_STYLE} aria-labelledby="country-overview-title">
        <div className={pageHeaderShellClass}>
          <SectionHeader eyebrow="Market context" title={overview.title} titleId="country-overview-title" />
        </div>
        <div className={cn(marketingSectionContainerClass, "mt-8 sm:mt-10")}>
          <div className={styles.overviewList}>
            {overview.paragraphs.map((paragraph, index) => (
              <RichText key={index} html={paragraph} className={styles.overviewParagraph} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

// ---------------------------------------------------------------------------
// Why choose us
// ---------------------------------------------------------------------------

export function CountryWhyChooseSection({ section }: { section: CountryBulletSection }) {
  return (
    <>
      <SectionDivider />
      <section className={cn(sectionShellClass, styles.section)} style={COUNTRY_PAGE_ACCENT_STYLE} aria-labelledby="country-why-title">
        <div className={pageHeaderShellClass}>
          <SectionHeader
            eyebrow="Why OnDial"
            title={section.title}
            description={section.intro}
            titleId="country-why-title"
          />
        </div>
        <div className={cn(marketingSectionContainerClass, "mt-8 sm:mt-10")}>
          <AnimatedGrid className={styles.bulletGridTwoCol}>
            {section.items.map((item, index) => (
              <motion.article key={index} className={styles.bulletCard} variants={cardVariants}>
                <span className={styles.bulletBadge} aria-hidden>
                  {index + 1}
                </span>
                <h3 className={styles.bulletTitle}>{item.title}</h3>
                <RichText html={item.description} className={styles.bulletText} />
              </motion.article>
            ))}
          </AnimatedGrid>
        </div>
      </section>
    </>
  );
}

// ---------------------------------------------------------------------------
// Industry solutions
// ---------------------------------------------------------------------------

export function CountryIndustrySolutionsSection({ content }: { content: CountryIndustrySolutionsContent }) {
  return (
    <>
      <SectionDivider />
      <section className={cn(sectionShellClass, styles.section)} style={COUNTRY_PAGE_ACCENT_STYLE} aria-labelledby="country-industries-title">
        <div className={pageHeaderShellClass}>
          <SectionHeader
            eyebrow="Industry solutions"
            title={content.title}
            description={content.intro}
            titleId="country-industries-title"
          />
        </div>
        <div className={cn(marketingSectionContainerClass, "mt-8 sm:mt-10")}>
          <AnimatedGrid className={styles.industryGrid}>
            {content.industries.map((industry, index) => (
              <motion.article key={index} className={styles.industryCard} variants={cardVariants}>
                <span className={styles.cardIcon} aria-hidden>
                  <Building2 className="size-4" strokeWidth={1.85} />
                </span>
                <h3 className={styles.industryName}>{industry.name}</h3>
                <RichText html={industry.description} className={styles.industryDescription} />
                {industry.useCases.length > 0 ? (
                  <>
                    <p className={styles.industryUseCasesTitle}>Concrete use cases</p>
                    <ul className={styles.industryUseCasesList}>
                      {industry.useCases.map((useCase, useCaseIndex) => (
                        <li key={useCaseIndex} className={styles.industryUseCaseItem}>
                          <span className={styles.industryUseCaseDot} aria-hidden />
                          {useCase}
                        </li>
                      ))}
                    </ul>
                  </>
                ) : null}
              </motion.article>
            ))}
          </AnimatedGrid>
        </div>
      </section>
    </>
  );
}

// ---------------------------------------------------------------------------
// Language support
// ---------------------------------------------------------------------------

export function CountryLanguageSupportSection({ content }: { content: CountryLanguageSupportContent }) {
  return (
    <>
      <SectionDivider />
      <section className={cn(sectionShellClass, styles.section)} style={COUNTRY_PAGE_ACCENT_STYLE} aria-labelledby="country-languages-title">
        <div className={pageHeaderShellClass}>
          <SectionHeader
            eyebrow="Language support"
            title={content.title}
            description={content.intro}
            titleId="country-languages-title"
          />
        </div>
        <div className={cn(marketingSectionContainerClass, "mt-8 sm:mt-10")}>
          <CountryCardsCarousel visibleCount={3}>
            {content.languages.map((language, index) => (
              <article key={index} className={styles.languageCard}>
                <div className="flex items-center gap-2">
                  <Languages
                    className="size-3.5 shrink-0 text-[hsl(var(--section-accent-h)_var(--section-accent-s)_var(--section-accent-l))]"
                    strokeWidth={2}
                    aria-hidden
                  />
                  <h3 className={styles.languageName}>{language.name}</h3>
                </div>
                <RichText html={language.description} className={styles.languageDescription} />
              </article>
            ))}
          </CountryCardsCarousel>
          {content.note ? <RichText html={content.note} className={styles.languageNote} /> : null}
        </div>
      </section>
    </>
  );
}

// ---------------------------------------------------------------------------
// Use cases (numbered)
// ---------------------------------------------------------------------------

export function CountryUseCasesSection({ section }: { section: CountryBulletSection }) {
  return (
    <>
      <SectionDivider />
      <section className={cn(sectionShellClass, styles.section)} style={COUNTRY_PAGE_ACCENT_STYLE} aria-labelledby="country-use-cases-title">
        <div className={pageHeaderShellClass}>
          <SectionHeader
            eyebrow="Use cases"
            title={section.title}
            description={section.intro}
            titleId="country-use-cases-title"
          />
        </div>
        <div className={cn(marketingSectionContainerClass, "mt-8 sm:mt-10")}>
          <AnimatedGrid className={styles.useCaseGrid}>
            {section.items.map((item, index) => (
              <motion.article key={index} className={styles.useCaseItem} variants={cardVariants}>
                <span className={styles.useCaseNumber} aria-hidden>
                  {index + 1}
                </span>
                <div>
                  <h3 className={styles.useCaseTitle}>{item.title}</h3>
                  <RichText html={item.description} className={styles.useCaseText} />
                </div>
              </motion.article>
            ))}
          </AnimatedGrid>
        </div>
      </section>
    </>
  );
}

// ---------------------------------------------------------------------------
// Compliance & security
// ---------------------------------------------------------------------------

export function CountryComplianceSection({ section }: { section: CountryBulletSection }) {
  return (
    <>
      <SectionDivider />
      <section className={cn(sectionShellClass, styles.section)} style={COUNTRY_PAGE_ACCENT_STYLE} aria-labelledby="country-compliance-title">
        <div className={pageHeaderShellClass}>
          <SectionHeader
            eyebrow="Compliance and security"
            title={section.title}
            titleId="country-compliance-title"
          />
        </div>
        <div className={cn(marketingSectionContainerClass, "mt-8 sm:mt-10")}>
          {section.intro ? <RichText html={section.intro} className={styles.sectionIntro} /> : null}
          <AnimatedGrid className={styles.bulletGridTwoCol}>
            {section.items.map((item, index) => (
              <motion.article key={index} className={styles.bulletCard} variants={cardVariants}>
                <h3 className={styles.bulletTitle}>{item.title}</h3>
                <RichText html={item.description} className={styles.bulletText} />
              </motion.article>
            ))}
          </AnimatedGrid>
        </div>
      </section>
    </>
  );
}

// ---------------------------------------------------------------------------
// Integrations
// ---------------------------------------------------------------------------

export function CountryIntegrationsSection({ content }: { content: CountryIntegrationsContent }) {
  return (
    <>
      <SectionDivider />
      <section className={cn(sectionShellClass, styles.section)} style={COUNTRY_PAGE_ACCENT_STYLE} aria-labelledby="country-integrations-title">
        <div className={pageHeaderShellClass}>
          <SectionHeader
            eyebrow="Integrations"
            title={content.title}
            description={content.intro}
            titleId="country-integrations-title"
          />
        </div>
        <div className={cn(marketingSectionContainerClass, "mt-8 sm:mt-10")}>
          <AnimatedGrid className={styles.integrationGroups}>
            {content.groups.map((group, index) => (
              <motion.div key={index} className={styles.integrationGroup} variants={cardVariants}>
                <p className={styles.integrationLabel}>{group.label}</p>
                <div className={styles.integrationPills}>
                  {group.items.map((item, itemIndex) => (
                    <span key={itemIndex} className={styles.integrationPill}>
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </AnimatedGrid>
          {content.note ? <RichText html={content.note} className={styles.integrationNote} /> : null}
        </div>
      </section>
    </>
  );
}

// ---------------------------------------------------------------------------
// Comparisons
// ---------------------------------------------------------------------------

export function CountryComparisonsSection({ content }: { content: CountryComparisonsContent }) {
  return (
    <>
      <SectionDivider />
      <section className={cn(sectionShellClass, styles.section)} style={COUNTRY_PAGE_ACCENT_STYLE} aria-labelledby="country-comparisons-title">
        <div className={pageHeaderShellClass}>
          <SectionHeader eyebrow="Comparisons" title={content.title} titleId="country-comparisons-title" />
        </div>
        <div className={cn(marketingSectionContainerClass, "mt-8 sm:mt-10")}>
          <AnimatedGrid className={styles.comparisonGrid}>
            {content.items.map((item, index) => (
              <motion.article key={index} className={styles.comparisonCard} variants={cardVariants}>
                <span className={styles.cardIcon} aria-hidden>
                  <Scale className="size-4" strokeWidth={1.85} />
                </span>
                <h3 className={styles.comparisonTitle}>{item.title}</h3>
                <RichText html={item.description} className={styles.comparisonText} />
              </motion.article>
            ))}
          </AnimatedGrid>
        </div>
      </section>
    </>
  );
}

// ---------------------------------------------------------------------------
// FAQs
// ---------------------------------------------------------------------------

export function CountryFaqSection({ faqs, countryName }: { faqs: CountryFaqItem[]; countryName: string }) {
  const prefersReducedMotion = useReducedMotion();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <>
      <SectionDivider />
      <section className={cn(sectionShellClass, styles.section)} style={COUNTRY_PAGE_ACCENT_STYLE} aria-labelledby="country-faq-title">
        <div className={marketingSectionContainerClass}>
          <SectionHeader
            eyebrow="FAQs"
            title={`Frequently Asked Questions — ${countryName}`}
            titleId="country-faq-title"
          />
          <div className={cn(enterpriseStyles.faqList, "mx-auto mt-8 max-w-3xl sm:mt-10")}>
            {faqs.map((item, index) => {
              const isOpen = openIndex === index;
              const panelId = `country-faq-panel-${index}`;
              const triggerId = `country-faq-trigger-${index}`;

              return (
                <div key={index} className={cn(enterpriseStyles.faqItem, isOpen && enterpriseStyles.faqItemOpen)}>
                  <button
                    type="button"
                    id={triggerId}
                    className={enterpriseStyles.faqTrigger}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                  >
                    <span className={cn(enterpriseStyles.faqQuestion, isOpen && enterpriseStyles.faqQuestionOpen)}>
                      {item.question}
                    </span>
                    <motion.span
                      className={cn(enterpriseStyles.faqToggle, isOpen && enterpriseStyles.faqToggleOpen)}
                      aria-hidden
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={prefersReducedMotion ? { duration: 0 } : { type: "spring", stiffness: 360, damping: 26 }}
                    >
                      <ChevronDown className="size-4" strokeWidth={2.25} />
                    </motion.span>
                  </button>
                  <FaqAccordionPanel isOpen={isOpen} panelId={panelId} triggerId={triggerId}>
                    <RichText html={item.answer} className={enterpriseStyles.faqAnswer} />
                  </FaqAccordionPanel>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
