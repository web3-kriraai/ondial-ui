"use client";

import { ArrowUpRight, Award, ChevronDown, HeartPulse, Lock, Radio, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useState, type CSSProperties } from "react";

import { AboutHeroCta } from "@/components/marketing/about-hero-cta";
import { BlogPageHero } from "@/components/marketing/blog-page-hero";
import { CountryCardsCarousel } from "@/components/marketing/country-cards-carousel";
import { FaqAccordionPanel } from "@/components/marketing/faq-accordion-panel";
import { LiveCallsIllustration } from "@/components/marketing/live-calls-illustration";
import enterpriseStyles from "@/components/marketing/enterprise-page-sections.module.css";
import { HubMatteCard } from "@/components/marketing/hub-matte-card";
import { resolveHubMatteIcon } from "@/components/marketing/hub-matte-card";
import matteStyles from "@/components/marketing/hub-matte-card.module.css";
import { PricingCardsCarousel } from "@/components/marketing/pricing-cards-carousel";
import { ServicesCapabilitiesCarousel } from "@/components/marketing/services-capabilities-carousel";
import { ONDIAL_ACCENT_STYLE } from "@/components/marketing/split-screen-section";
import { TextReveal } from "@/components/ui/text-reveal";
import {
  marketingDottedSectionShellClass,
  marketingEyebrowClass,
  marketingSectionContainerClass,
} from "@/config/marketing-layout";
import {
  FEATURES_HUB_ANALYTICS,
  FEATURES_HUB_AUTOMATION,
  FEATURES_HUB_CATEGORIES,
  FEATURES_HUB_FAQ,
  FEATURES_HUB_FINAL_CTA,
  FEATURES_HUB_HERO,
  FEATURES_HUB_HOW_IT_WORKS,
  FEATURES_HUB_INDUSTRIES,
  FEATURES_HUB_INTEGRATIONS,
  FEATURES_HUB_NUMBERS,
  FEATURES_HUB_OVERVIEW,
  FEATURES_HUB_PRICING,
  FEATURES_HUB_QUICK_ANSWER,
  FEATURES_HUB_SECURITY,
  type FeaturesHubCta,
} from "@/data/features-hub-content";
import { PRICING_PLANS } from "@/data/pricing-plans";
import {
  SERVICES_CAPABILITIES,
  SERVICES_CAPABILITIES_SECTION,
} from "@/data/services-capabilities-content";
import { getMatteThemeByHref } from "@/lib/industries/hub-matte-theme";
import { cn } from "@/lib/utils";

import styles from "./features-hub-page-sections.module.css";

const PAGE_ACCENT_STYLE = {
  ...ONDIAL_ACCENT_STYLE,
  "--showcase-accent-h": "262",
  "--showcase-accent-s": "83%",
  "--showcase-accent-l": "58%",
} as CSSProperties;

const sectionShellClass = "w-full bg-transparent py-14 sm:py-16 lg:py-20";
const secondaryBtnClass =
  "inline-flex min-h-11 items-center justify-center gap-[0.35rem] rounded-full border border-black/10 bg-background px-[1.35rem] py-[0.85rem] text-[0.9375rem] font-semibold text-foreground no-underline transition-[transform,border-color,background,box-shadow] duration-200 ease-in-out hover:-translate-y-px hover:border-black/[0.14] hover:bg-[color-mix(in_oklab,var(--muted)_35%,var(--background))] hover:shadow-[0_8px_24px_-16px_rgb(15_23_42/0.18)] focus-visible:-translate-y-px focus-visible:border-black/[0.14] focus-visible:bg-[color-mix(in_oklab,var(--muted)_35%,var(--background))] focus-visible:shadow-[0_8px_24px_-16px_rgb(15_23_42/0.18)] focus-visible:outline-none";

const SECURITY_EXTRA_ICONS: Record<string, LucideIcon> = {
  "heart-pulse": HeartPulse,
  award: Award,
  lock: Lock,
  antenna: Radio,
};

function resolveSecurityIcon(iconKey: string): LucideIcon {
  return SECURITY_EXTRA_ICONS[iconKey] ?? resolveHubMatteIcon(iconKey);
}

function HubCtaButtons({
  ctas,
  centered = true,
  className,
}: {
  ctas: readonly FeaturesHubCta[];
  centered?: boolean;
  className?: string;
}) {
  const [primary, ...secondaries] = ctas;

  return (
    <div
      className={cn(
        "flex w-full flex-wrap items-center gap-3",
        centered && "justify-center",
        className,
      )}
    >
      {primary ? <AboutHeroCta href={primary.href} label={primary.label} /> : null}
      {secondaries.map((cta) => (
        <Link key={cta.label} href={cta.href} prefetch className={secondaryBtnClass}>
          {cta.label}
          <ArrowUpRight
            className="size-4 shrink-0 text-[hsl(var(--section-accent-h)_var(--section-accent-s)_var(--section-accent-l))]"
            strokeWidth={2}
            aria-hidden
          />
        </Link>
      ))}
    </div>
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
    <header className={styles.sectionHeader}>
      <p className={cn(styles.sectionEyebrow, marketingEyebrowClass)}>{eyebrow}</p>
      <h2 id={titleId} className={styles.sectionTitle}>
        <TextReveal as="span" className="block" delay={0.05} stagger={0.07} inViewAmount={0.5}>
          {title}
        </TextReveal>
      </h2>
      {description ? (
        <TextReveal as="p" className={styles.sectionDescription} delay={0.2} stagger={0.028} inViewAmount={0.4}>
          {description}
        </TextReveal>
      ) : null}
    </header>
  );
}

function SubSectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <header className={styles.subSectionHeader}>
      <p className={cn(styles.sectionEyebrow, marketingEyebrowClass)}>{eyebrow}</p>
      <h3 className={styles.subSectionTitle}>{title}</h3>
      {description ? <p className={styles.subSectionDescription}>{description}</p> : null}
    </header>
  );
}

function FeatureCarousel({
  items,
}: {
  items: readonly {
    title: string;
    description: string;
    iconKey: string;
    iconBg: string;
    iconColor: string;
  }[];
}) {
  return (
    <CountryCardsCarousel visibleCount={3}>
      {items.map((item) => (
        <HubMatteCard
          key={item.title}
          theme={{
            iconKey: item.iconKey,
            iconBg: item.iconBg,
            iconColor: item.iconColor,
          }}
          title={item.title}
        >
          <p className={matteStyles.matteText}>{item.description}</p>
        </HubMatteCard>
      ))}
    </CountryCardsCarousel>
  );
}

export function FeaturesHubHeroSection() {
  const { eyebrow, title, subtitle, description, ctas, stats } = FEATURES_HUB_HERO;

  return (
    <section
      id="features-hero"
      className={cn(marketingDottedSectionShellClass, "w-full bg-transparent pb-10 sm:pb-14 lg:pb-16")}
      style={PAGE_ACCENT_STYLE}
      aria-labelledby="features-hero-title"
    >
      <div className={cn(marketingSectionContainerClass, styles.heroShell, "pt-6 sm:pt-8")}>
        <div className={styles.heroGrid}>
          <div className={styles.heroLeft}>
            <BlogPageHero
              eyebrow={eyebrow}
              align="center"
              className={styles.heroHeader}
              title={
                <h1
                  id="features-hero-title"
                  className={styles.heroTitle}
                >
                  {title}
                </h1>
              }
              description={<p className={styles.heroDescription}>{description}</p>}
            />
            <p className={styles.heroSubtitle}>{subtitle}</p>
            <HubCtaButtons ctas={ctas} className={styles.heroCtas} centered={false} />
            <div className={styles.heroStats}>
              {stats.map((stat) => (
                <div key={stat.id} className={styles.heroStat}>
                  <p className={styles.heroStatValue}>{stat.value}</p>
                  <p className={styles.heroStatLabel}>{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.heroVisual} aria-hidden>
            <div className={styles.heroVisualFrame}>
              <LiveCallsIllustration className={styles.heroIllustration} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function FeaturesHubQuickAnswerSection() {
  const { eyebrow, title, body } = FEATURES_HUB_QUICK_ANSWER;

  return (
    <>
      <section className={sectionShellClass} style={PAGE_ACCENT_STYLE} aria-labelledby="features-quick-title">
        <div className={marketingSectionContainerClass}>
          <SectionHeader eyebrow={eyebrow} title={title} titleId="features-quick-title" />
          <p className={cn(styles.proseBlock, styles.sectionBody)}>{body}</p>
        </div>
      </section>
    </>
  );
}

export function FeaturesHubOverviewSection() {
  const { eyebrow, title, cards } = FEATURES_HUB_OVERVIEW;

  return (
    <>
      <section className={sectionShellClass} style={PAGE_ACCENT_STYLE} aria-labelledby="features-overview-title">
        <div className={marketingSectionContainerClass}>
          <SectionHeader eyebrow={eyebrow} title={title} titleId="features-overview-title" />
          <div className={cn(styles.narrativeGrid, styles.sectionBody)}>
            {cards.map((card) => (
              <HubMatteCard
                key={card.title}
                theme={{
                  iconKey: card.iconKey,
                  iconBg: card.iconBg,
                  iconColor: card.iconColor,
                }}
                title={card.title}
              >
                <p className={matteStyles.matteText}>{card.description}</p>
              </HubMatteCard>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export function FeaturesHubCapabilitiesSection() {
  const { eyebrow, title, description } = SERVICES_CAPABILITIES_SECTION;

  return (
    <section
      id="platform-capabilities"
      className={sectionShellClass}
      style={PAGE_ACCENT_STYLE}
      aria-labelledby="features-capabilities-title"
    >
      <div className={marketingSectionContainerClass}>
        <SectionHeader
          eyebrow={eyebrow}
          title={title}
          description={description}
          titleId="features-capabilities-title"
        />
        <ServicesCapabilitiesCarousel
          capabilities={SERVICES_CAPABILITIES}
          className={styles.sectionBody}
        />
      </div>
    </section>
  );
}

export function FeaturesHubCategoriesSection() {
  return (
    <>
      <section className={sectionShellClass} style={PAGE_ACCENT_STYLE} aria-labelledby="features-categories-title">
        <div className={marketingSectionContainerClass}>
          <SectionHeader
            eyebrow="Feature categories"
            title="Everything in one platform"
            titleId="features-categories-title"
          />
          {FEATURES_HUB_CATEGORIES.map((category, index) => (
            <div key={category.id} className={cn(styles.categoryBlock, index === 0 && styles.sectionBody)}>
              <SubSectionHeader
                eyebrow={category.eyebrow}
                title={category.title}
                description={category.description}
              />
              <div className={cn(styles.carouselWrap, styles.categoryCarousel)}>
                <FeatureCarousel items={category.items} />
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export function FeaturesHubIntegrationsSection() {
  const { eyebrow, title, description, items } = FEATURES_HUB_INTEGRATIONS;

  return (
    <>
      <section className={sectionShellClass} style={PAGE_ACCENT_STYLE} aria-labelledby="features-integrations-title">
        <div className={marketingSectionContainerClass}>
          <SectionHeader
            eyebrow={eyebrow}
            title={title}
            description={description}
            titleId="features-integrations-title"
          />
          <div className={cn(styles.carouselWrap, styles.sectionBody)}>
            <CountryCardsCarousel visibleCount={3}>
              {items.map((item) => (
                <HubMatteCard
                  key={item.category}
                  theme={{
                    iconKey: item.iconKey,
                    iconBg: item.iconBg,
                    iconColor: item.iconColor,
                  }}
                  title={item.category}
                >
                  <p className={matteStyles.matteText}>{item.tools}</p>
                </HubMatteCard>
              ))}
            </CountryCardsCarousel>
          </div>
        </div>
      </section>
    </>
  );
}

export function FeaturesHubSecuritySection() {
  const { eyebrow, title, description, certifications } = FEATURES_HUB_SECURITY;

  return (
    <>
      <section className={sectionShellClass} style={PAGE_ACCENT_STYLE} aria-labelledby="features-security-title">
        <div className={marketingSectionContainerClass}>
          <SectionHeader eyebrow={eyebrow} title={title} titleId="features-security-title" />
          <p className={cn(styles.proseBlock, styles.sectionBody)}>{description}</p>
          <div className={cn(styles.securityGrid, styles.sectionBodyTight)}>
            {certifications.map((cert) => {
              const Icon = resolveSecurityIcon(cert.iconKey);
              return (
                <article key={cert.label} className={styles.securityItem}>
                  <span
                    className={styles.securityIcon}
                    style={{ background: cert.iconBg, color: cert.iconColor }}
                    aria-hidden
                  >
                    <Icon className="size-[1.125rem]" strokeWidth={2} />
                  </span>
                  <div className={styles.securityCopy}>
                    <h3 className={styles.securityLabel}>{cert.label}</h3>
                    <p className={styles.securityDetail}>{cert.detail}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

export function FeaturesHubAnalyticsSection() {
  const { eyebrow, title, items } = FEATURES_HUB_ANALYTICS;

  return (
    <>
      <section className={sectionShellClass} style={PAGE_ACCENT_STYLE} aria-labelledby="features-analytics-title">
        <div className={marketingSectionContainerClass}>
          <SectionHeader eyebrow={eyebrow} title={title} titleId="features-analytics-title" />
          <div className={cn(styles.carouselWrap, styles.sectionBody)}>
            <FeatureCarousel items={items} />
          </div>
        </div>
      </section>
    </>
  );
}

export function FeaturesHubAutomationSection() {
  const { eyebrow, title, items } = FEATURES_HUB_AUTOMATION;

  return (
    <>
      <section className={sectionShellClass} style={PAGE_ACCENT_STYLE} aria-labelledby="features-automation-title">
        <div className={marketingSectionContainerClass}>
          <SectionHeader eyebrow={eyebrow} title={title} titleId="features-automation-title" />
          <div className={cn(styles.carouselWrap, styles.sectionBody)}>
            <FeatureCarousel items={items} />
          </div>
        </div>
      </section>
    </>
  );
}

export function FeaturesHubIndustriesSection() {
  const { eyebrow, title, description, items } = FEATURES_HUB_INDUSTRIES;

  return (
    <>
      <section className={sectionShellClass} style={PAGE_ACCENT_STYLE} aria-labelledby="features-industries-title">
        <div className={marketingSectionContainerClass}>
          <SectionHeader
            eyebrow={eyebrow}
            title={title}
            description={description}
            titleId="features-industries-title"
          />
          <div className={cn(styles.carouselWrap, styles.sectionBody)}>
            <CountryCardsCarousel visibleCount={3}>
              {items.map((item) => {
                const theme = getMatteThemeByHref(item.href, item.iconKey);
                return (
                  <HubMatteCard key={item.name} theme={theme} title={item.name}>
                    <Link href={item.href} prefetch className={matteStyles.matteLink}>
                      Explore {item.name}
                    </Link>
                  </HubMatteCard>
                );
              })}
            </CountryCardsCarousel>
          </div>
        </div>
      </section>
    </>
  );
}

export function FeaturesHubNumbersSection() {
  const { eyebrow, title, stats } = FEATURES_HUB_NUMBERS;

  return (
    <>
      <section className={sectionShellClass} style={PAGE_ACCENT_STYLE} aria-labelledby="features-numbers-title">
        <div className={marketingSectionContainerClass}>
          <SectionHeader eyebrow={eyebrow} title={title} titleId="features-numbers-title" />
          <div className={cn(styles.statsGrid, styles.sectionBody)}>
            {stats.map((stat) => (
              <div key={stat.label} className={styles.statItem}>
                <p className={styles.statValue}>{stat.value}</p>
                <p className={styles.statLabel}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export function FeaturesHubHowItWorksSection() {
  const { eyebrow, title, steps } = FEATURES_HUB_HOW_IT_WORKS;

  return (
    <>
      <section
        id="how-it-works"
        className={sectionShellClass}
        style={PAGE_ACCENT_STYLE}
        aria-labelledby="features-hiw-title"
      >
        <div className={marketingSectionContainerClass}>
          <SectionHeader eyebrow={eyebrow} title={title} titleId="features-hiw-title" />
          <div className={cn(styles.hiwGrid, styles.sectionBody)}>
            {steps.map((step, index) => (
              <article key={step.title} className={styles.hiwStep}>
                <span className={styles.hiwStepNum} aria-hidden>
                  {index + 1}
                </span>
                <h3 className={styles.hiwStepTitle}>{step.title}</h3>
                <p className={styles.hiwStepText}>{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export function FeaturesHubPricingSection() {
  const { eyebrow, title, description, footnote, ctas } = FEATURES_HUB_PRICING;
  const pricingCards = PRICING_PLANS.map((plan) => ({
    title: plan.title,
    description: plan.description,
    price: plan.price,
    features: plan.features,
  }));

  return (
    <>
      <section className={sectionShellClass} style={PAGE_ACCENT_STYLE} aria-labelledby="features-pricing-title">
        <div className={marketingSectionContainerClass}>
          <SectionHeader
            eyebrow={eyebrow}
            title={title}
            description={description}
            titleId="features-pricing-title"
          />
          <div className={styles.sectionBody}>
            <PricingCardsCarousel cards={pricingCards} />
          </div>
          <p className={styles.pricingFootnote}>{footnote}</p>
          <HubCtaButtons ctas={ctas} className={styles.sectionCtas} />
        </div>
      </section>
    </>
  );
}

export function FeaturesHubFaqSection() {
  const prefersReducedMotion = useReducedMotion();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <>
      <section className={sectionShellClass} style={PAGE_ACCENT_STYLE} aria-labelledby="features-faq-title">
        <div className={marketingSectionContainerClass}>
          <SectionHeader
            eyebrow={FEATURES_HUB_FAQ.eyebrow}
            title={FEATURES_HUB_FAQ.title}
            titleId="features-faq-title"
          />
          <div className={cn(enterpriseStyles.faqList, styles.faqList, styles.sectionBody)}>
            {FEATURES_HUB_FAQ.items.map((item, index) => {
              const isOpen = openIndex === index;
              const triggerId = `features-faq-trigger-${index}`;
              const panelId = `features-faq-panel-${index}`;
              return (
                <div key={item.question} className={cn(enterpriseStyles.faqItem, isOpen && enterpriseStyles.faqItemOpen)}>
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
                      transition={
                        prefersReducedMotion ? { duration: 0 } : { type: "spring", stiffness: 360, damping: 26 }
                      }
                    >
                      <ChevronDown className="size-4" strokeWidth={2.25} />
                    </motion.span>
                  </button>
                  <FaqAccordionPanel isOpen={isOpen} panelId={panelId} triggerId={triggerId}>
                    <p className={enterpriseStyles.faqAnswer}>{item.answer}</p>
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

export function FeaturesHubFinalCtaSection() {
  const { title, description, ctas } = FEATURES_HUB_FINAL_CTA;

  return (
    <>
      <section
        className={cn(sectionShellClass, "pb-16 sm:pb-20")}
        style={PAGE_ACCENT_STYLE}
        aria-labelledby="features-final-cta-title"
      >
        <div className={marketingSectionContainerClass}>
          <div className={styles.finalCta}>
            <h2 id="features-final-cta-title" className={styles.sectionTitle}>
              {title}
            </h2>
            <p className={styles.finalCtaDescription}>{description}</p>
            <HubCtaButtons ctas={ctas} className={styles.sectionCtas} />
          </div>
        </div>
      </section>
    </>
  );
}
