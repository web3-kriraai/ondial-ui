"use client";

import {
  ArrowUpRight,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useState, type CSSProperties } from "react";

import { AboutHeroCta } from "@/components/marketing/about-hero-cta";
import { BlogPageHero } from "@/components/marketing/blog-page-hero";
import { CountryCardsCarousel } from "@/components/marketing/country-cards-carousel";
import { FaqAccordionPanel } from "@/components/marketing/faq-accordion-panel";
import { HubMatteCard } from "@/components/marketing/hub-matte-card";
import matteStyles from "@/components/marketing/hub-matte-card.module.css";
import enterpriseStyles from "@/components/marketing/enterprise-page-sections.module.css";
import { ONDIAL_ACCENT_STYLE } from "@/components/marketing/split-screen-section";
import { TextReveal } from "@/components/ui/text-reveal";
import { marketingDottedSectionShellClass, marketingEyebrowClass, marketingSectionContainerClass } from "@/config/marketing-layout";
import {
  INDUSTRIES_HUB_ADAPTATION,
  INDUSTRIES_HUB_CHALLENGES,
  INDUSTRIES_HUB_COMPARISON,
  INDUSTRIES_HUB_FAQ,
  INDUSTRIES_HUB_FEATURES,
  INDUSTRIES_HUB_FINAL_CTA,
  INDUSTRIES_HUB_HERO,
  INDUSTRIES_HUB_INDUSTRIES,
  INDUSTRIES_HUB_INTRO,
  INDUSTRIES_HUB_RESOURCES,
  INDUSTRIES_HUB_SECURITY,
  INDUSTRIES_HUB_SOLUTIONS,
  INDUSTRIES_HUB_STORIES,
  INDUSTRIES_HUB_TRUSTED,
  INDUSTRIES_HUB_USE_CASES,
  INDUSTRIES_HUB_WHY_CHOOSE,
  INDUSTRIES_HUB_WHY_WORK,
  type IndustriesHubCta,
} from "@/data/industries-hub-content";
import { getMatteThemeByHref, getMatteThemeByIndex } from "@/lib/industries/hub-matte-theme";
import { cn } from "@/lib/utils";

import styles from "./industries-hub-page-sections.module.css";

const HUB_ACCENT_STYLE = {
  ...ONDIAL_ACCENT_STYLE,
  "--showcase-accent-h": "262",
  "--showcase-accent-s": "83%",
  "--showcase-accent-l": "58%",
} as CSSProperties;

const sectionShellClass = "w-full bg-transparent py-14 sm:py-16 lg:py-20";
const pageHeaderShellClass =
  "mx-auto flex w-full min-w-0 max-w-3xl flex-col items-center px-4 sm:px-6 lg:max-w-4xl";
const headingClass =
  "text-balance text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem]";
const descriptionClass =
  "mx-auto mt-4 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg";
const secondaryBtnClass =
  "inline-flex min-h-11 items-center justify-center gap-[0.35rem] rounded-full border border-black/10 bg-background px-[1.35rem] py-[0.85rem] text-[0.9375rem] font-semibold text-foreground no-underline transition-[transform,border-color,background,box-shadow] duration-200 ease-in-out hover:-translate-y-px hover:border-black/[0.14] hover:bg-[color-mix(in_oklab,var(--muted)_35%,var(--background))] hover:shadow-[0_8px_24px_-16px_rgb(15_23_42/0.18)] focus-visible:-translate-y-px focus-visible:border-black/[0.14] focus-visible:bg-[color-mix(in_oklab,var(--muted)_35%,var(--background))] focus-visible:shadow-[0_8px_24px_-16px_rgb(15_23_42/0.18)] focus-visible:outline-none";

const WHY_WORK_ICON_KEYS = [
  "clock",
  "message-square",
  "target",
  "calendar",
  "headphones",
  "workflow",
  "bar-chart",
  "languages",
  "phone-forwarded",
  "phone-incoming",
] as const;

const FEATURE_ICON_KEYS = [
  "message-square",
  "sparkles",
  "workflow",
  "calendar",
  "workflow",
  "bar-chart",
  "file",
  "message-square",
  "users",
  "languages",
  "sparkles",
  "file",
] as const;

const WHY_CHOOSE_ICON_KEYS = [
  "clock",
  "languages",
  "shield-check",
  "phone-incoming",
  "sparkles",
  "message-square",
  "bar-chart",
  "workflow",
  "users",
] as const;

function HubCtaButtons({
  ctas,
  centered = true,
  className,
}: {
  ctas: readonly IndustriesHubCta[];
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
    <header className="mx-auto max-w-3xl text-center">
      <p className={cn("mb-4", marketingEyebrowClass)}>{eyebrow}</p>
      <h2 id={titleId} className={headingClass}>
        <TextReveal as="span" className="block" delay={0.05} stagger={0.07} inViewAmount={0.5}>
          {title}
        </TextReveal>
      </h2>
      {description ? (
        <TextReveal as="p" className={descriptionClass} delay={0.2} stagger={0.028} inViewAmount={0.4}>
          {description}
        </TextReveal>
      ) : null}
    </header>
  );
}

export function IndustriesHubHeroSection() {
  const { eyebrow, title, description, ctas } = INDUSTRIES_HUB_HERO;

  return (
    <section
      id="industries-hero"
      className={cn(marketingDottedSectionShellClass, "w-full bg-transparent pb-12 sm:pb-16 lg:pb-20")}
      style={HUB_ACCENT_STYLE}
      aria-labelledby="industries-hero-title"
    >
      <div className={cn(pageHeaderShellClass, "pt-6 sm:pt-8")}>
        <BlogPageHero
          eyebrow={eyebrow}
          title={
            <h1
              id="industries-hero-title"
              className="mx-auto max-w-4xl text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-[2.625rem] lg:leading-tight"
            >
              {title}
            </h1>
          }
          description={description}
        />
        <HubCtaButtons ctas={ctas} className="mt-6" />
      </div>
    </section>
  );
}

export function IndustriesHubTrustedSection() {
  const { eyebrow, title, stats } = INDUSTRIES_HUB_TRUSTED;

  return (
    <section className={sectionShellClass} style={HUB_ACCENT_STYLE} aria-labelledby="industries-trusted-title">
      <div className={marketingSectionContainerClass}>
        <SectionHeader eyebrow={eyebrow} title={title} titleId="industries-trusted-title" />
        <div className={cn(styles.carouselWrap, "mt-8 sm:mt-10")}>
          <CountryCardsCarousel visibleCount={3}>
            {stats.map((stat) => (
              <HubMatteCard
                key={stat.id}
                theme={{
                  iconKey: stat.iconKey,
                  iconBg: stat.iconBg,
                  iconColor: stat.iconColor,
                }}
                title={stat.value}
                titleClassName={matteStyles.matteStatTitle}
              >
                <p className={matteStyles.matteStatLabel}>{stat.label}</p>
              </HubMatteCard>
            ))}
          </CountryCardsCarousel>
        </div>
      </div>
    </section>
  );
}

export function IndustriesHubIntroSection() {
  return (
    <section className={sectionShellClass} style={HUB_ACCENT_STYLE} aria-labelledby="industries-intro-title">
      <div className={marketingSectionContainerClass}>
        <SectionHeader
          eyebrow={INDUSTRIES_HUB_INTRO.eyebrow}
          title={INDUSTRIES_HUB_INTRO.title}
          description={INDUSTRIES_HUB_INTRO.description}
          titleId="industries-intro-title"
        />
      </div>
    </section>
  );
}

export function IndustriesHubSolutionsSection() {
  return (
    <section className={sectionShellClass} style={HUB_ACCENT_STYLE} aria-labelledby="industries-solutions-title">
      <div className={marketingSectionContainerClass}>
        <SectionHeader
          eyebrow={INDUSTRIES_HUB_SOLUTIONS.eyebrow}
          title={INDUSTRIES_HUB_SOLUTIONS.title}
          titleId="industries-solutions-title"
        />
        <div className={cn(styles.carouselWrap, "mt-8 sm:mt-10")}>
          <CountryCardsCarousel visibleCount={3}>
            {INDUSTRIES_HUB_INDUSTRIES.map((industry) => {
              const theme = getMatteThemeByHref(industry.href ?? "", industry.iconKey);
              return (
                <HubMatteCard key={industry.id} theme={theme} title={industry.name}>
                  <p className={matteStyles.matteText}>{industry.description}</p>
                  <p className={matteStyles.matteEyebrow}>Challenge: {industry.challenge}</p>
                  <div className={matteStyles.mattePills}>
                    {industry.useCases.map((useCase) => (
                      <span key={useCase} className={matteStyles.mattePill}>
                        {useCase}
                      </span>
                    ))}
                  </div>
                  {industry.href ? (
                    <Link href={industry.href} prefetch className={matteStyles.matteLink}>
                      Learn more about AI voice agents for {industry.name.toLowerCase()}.
                    </Link>
                  ) : null}
                </HubMatteCard>
              );
            })}
          </CountryCardsCarousel>
        </div>
      </div>
    </section>
  );
}

export function IndustriesHubWhyWorkSection() {
  return (
    <section className={sectionShellClass} style={HUB_ACCENT_STYLE} aria-labelledby="industries-why-work-title">
      <div className={marketingSectionContainerClass}>
        <SectionHeader
          eyebrow={INDUSTRIES_HUB_WHY_WORK.eyebrow}
          title={INDUSTRIES_HUB_WHY_WORK.title}
          description={INDUSTRIES_HUB_WHY_WORK.description}
          titleId="industries-why-work-title"
        />
        <div className={cn(styles.carouselWrap, "mt-8 sm:mt-10")}>
          <CountryCardsCarousel visibleCount={3}>
            {INDUSTRIES_HUB_WHY_WORK.items.map((item, index) => (
              <HubMatteCard
                key={item}
                theme={getMatteThemeByIndex(index, WHY_WORK_ICON_KEYS[index % WHY_WORK_ICON_KEYS.length])}
                title={item}
              />
            ))}
          </CountryCardsCarousel>
        </div>
      </div>
    </section>
  );
}

export function IndustriesHubChallengesSection() {
  return (
    <section className={sectionShellClass} style={HUB_ACCENT_STYLE} aria-labelledby="industries-challenges-title">
      <div className={marketingSectionContainerClass}>
        <SectionHeader
          eyebrow={INDUSTRIES_HUB_CHALLENGES.eyebrow}
          title={INDUSTRIES_HUB_CHALLENGES.title}
          description={INDUSTRIES_HUB_CHALLENGES.description}
          titleId="industries-challenges-title"
        />
        <div className={cn(styles.carouselWrap, "mt-8 sm:mt-10")}>
          <CountryCardsCarousel visibleCount={3}>
            {INDUSTRIES_HUB_CHALLENGES.items.map((item) => (
              <HubMatteCard
                key={item.problem}
                theme={{
                  iconKey: item.iconKey,
                  iconBg: item.iconBg,
                  iconColor: item.iconColor,
                }}
                title={item.problem}
              >
                <p className={matteStyles.matteText}>{item.solution}</p>
              </HubMatteCard>
            ))}
          </CountryCardsCarousel>
        </div>
      </div>
    </section>
  );
}

export function IndustriesHubUseCasesSection() {
  return (
    <section className={sectionShellClass} style={HUB_ACCENT_STYLE} aria-labelledby="industries-use-cases-title">
      <div className={marketingSectionContainerClass}>
        <SectionHeader
          eyebrow={INDUSTRIES_HUB_USE_CASES.eyebrow}
          title={INDUSTRIES_HUB_USE_CASES.title}
          description={INDUSTRIES_HUB_USE_CASES.description}
          titleId="industries-use-cases-title"
        />
        <div className={cn(styles.carouselWrap, "mt-8 sm:mt-10")}>
          <CountryCardsCarousel visibleCount={3}>
            {INDUSTRIES_HUB_USE_CASES.groups.map((group) => (
              <HubMatteCard
                key={group.label}
                theme={{
                  iconKey: group.iconKey,
                  iconBg: group.iconBg,
                  iconColor: group.iconColor,
                }}
                title={group.label}
              >
                <ul className={matteStyles.matteList}>
                  {group.items.map((item) => (
                    <li key={item} className={matteStyles.matteListItem}>
                      {item}
                    </li>
                  ))}
                </ul>
              </HubMatteCard>
            ))}
          </CountryCardsCarousel>
        </div>
      </div>
    </section>
  );
}

export function IndustriesHubFeaturesSection() {
  return (
    <section className={sectionShellClass} style={HUB_ACCENT_STYLE} aria-labelledby="industries-features-title">
      <div className={marketingSectionContainerClass}>
        <SectionHeader
          eyebrow={INDUSTRIES_HUB_FEATURES.eyebrow}
          title={INDUSTRIES_HUB_FEATURES.title}
          description={INDUSTRIES_HUB_FEATURES.description}
          titleId="industries-features-title"
        />
        <div className={cn(styles.carouselWrap, "mt-8 sm:mt-10")}>
          <CountryCardsCarousel visibleCount={3}>
            {INDUSTRIES_HUB_FEATURES.items.map((item, index) => (
              <HubMatteCard
                key={item}
                theme={getMatteThemeByIndex(index, FEATURE_ICON_KEYS[index % FEATURE_ICON_KEYS.length])}
                title={item}
                titleClassName={matteStyles.matteTitleLong}
              />
            ))}
          </CountryCardsCarousel>
        </div>
      </div>
    </section>
  );
}

export function IndustriesHubComparisonSection() {
  const { rows } = INDUSTRIES_HUB_COMPARISON;

  return (
    <section className={sectionShellClass} style={HUB_ACCENT_STYLE} aria-labelledby="industries-comparison-title">
      <div className={marketingSectionContainerClass}>
        <SectionHeader
          eyebrow={INDUSTRIES_HUB_COMPARISON.eyebrow}
          title={INDUSTRIES_HUB_COMPARISON.title}
          titleId="industries-comparison-title"
        />
        <div className={cn(styles.tableWrap, "mt-8")}>
          <table className={styles.comparisonTable}>
            <thead>
              <tr>
                <th scope="col">Industry</th>
                <th scope="col">Common challenge</th>
                <th scope="col">AI solution</th>
                <th scope="col">Primary benefit</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.industry}>
                  <td>{row.industry}</td>
                  <td>{row.challenge}</td>
                  <td>{row.solution}</td>
                  <td>{row.benefit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export function IndustriesHubAdaptationSection() {
  return (
    <section className={sectionShellClass} style={HUB_ACCENT_STYLE} aria-labelledby="industries-adaptation-title">
      <div className={marketingSectionContainerClass}>
        <SectionHeader
          eyebrow={INDUSTRIES_HUB_ADAPTATION.eyebrow}
          title={INDUSTRIES_HUB_ADAPTATION.title}
          titleId="industries-adaptation-title"
        />
        <p className={cn(styles.proseBlock, "mt-6")}>{INDUSTRIES_HUB_ADAPTATION.description}</p>
      </div>
    </section>
  );
}

export function IndustriesHubSecuritySection() {
  return (
    <section className={sectionShellClass} style={HUB_ACCENT_STYLE} aria-labelledby="industries-security-title">
      <div className={marketingSectionContainerClass}>
        <SectionHeader
          eyebrow={INDUSTRIES_HUB_SECURITY.eyebrow}
          title={INDUSTRIES_HUB_SECURITY.title}
          titleId="industries-security-title"
        />
        <p className={cn(styles.proseBlock, "mt-6")}>{INDUSTRIES_HUB_SECURITY.description}</p>
      </div>
    </section>
  );
}

export function IndustriesHubStoriesSection() {
  return (
    <section className={sectionShellClass} style={HUB_ACCENT_STYLE} aria-labelledby="industries-stories-title">
      <div className={marketingSectionContainerClass}>
        <SectionHeader
          eyebrow={INDUSTRIES_HUB_STORIES.eyebrow}
          title={INDUSTRIES_HUB_STORIES.title}
          description={INDUSTRIES_HUB_STORIES.description}
          titleId="industries-stories-title"
        />
        <div className={cn(styles.carouselWrap, "mt-8 sm:mt-10")}>
          <CountryCardsCarousel visibleCount={3}>
            {INDUSTRIES_HUB_STORIES.stories.map((story) => (
              <HubMatteCard
                key={story.title}
                theme={{
                  iconKey: story.iconKey,
                  iconBg: story.iconBg,
                  iconColor: story.iconColor,
                }}
                title={story.title}
              >
                <p className={matteStyles.matteText}>{story.body}</p>
              </HubMatteCard>
            ))}
          </CountryCardsCarousel>
        </div>
      </div>
    </section>
  );
}

export function IndustriesHubWhyChooseSection() {
  return (
    <section className={sectionShellClass} style={HUB_ACCENT_STYLE} aria-labelledby="industries-why-choose-title">
      <div className={marketingSectionContainerClass}>
        <SectionHeader
          eyebrow={INDUSTRIES_HUB_WHY_CHOOSE.eyebrow}
          title={INDUSTRIES_HUB_WHY_CHOOSE.title}
          titleId="industries-why-choose-title"
        />
        <div className={cn(styles.carouselWrap, "mt-8 sm:mt-10")}>
          <CountryCardsCarousel visibleCount={3}>
            {INDUSTRIES_HUB_WHY_CHOOSE.items.map((item, index) => (
              <HubMatteCard
                key={item}
                theme={getMatteThemeByIndex(index, WHY_CHOOSE_ICON_KEYS[index % WHY_CHOOSE_ICON_KEYS.length])}
                title={item}
                titleClassName={matteStyles.matteTitleLong}
              />
            ))}
          </CountryCardsCarousel>
        </div>
      </div>
    </section>
  );
}

export function IndustriesHubFaqSection() {
  const prefersReducedMotion = useReducedMotion();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className={sectionShellClass} style={HUB_ACCENT_STYLE} aria-labelledby="industries-faq-title">
      <div className={marketingSectionContainerClass}>
        <SectionHeader
          eyebrow={INDUSTRIES_HUB_FAQ.eyebrow}
          title={INDUSTRIES_HUB_FAQ.title}
          titleId="industries-faq-title"
        />
        <div className={cn(enterpriseStyles.faqList, "mx-auto mt-8 max-w-3xl")}>
          {INDUSTRIES_HUB_FAQ.items.map((item, index) => {
            const isOpen = openIndex === index;
            const triggerId = `industries-faq-trigger-${index}`;
            const panelId = `industries-faq-panel-${index}`;
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
  );
}

export function IndustriesHubResourcesSection() {
  return (
    <section className={sectionShellClass} style={HUB_ACCENT_STYLE} aria-labelledby="industries-resources-title">
      <div className={marketingSectionContainerClass}>
        <SectionHeader
          eyebrow={INDUSTRIES_HUB_RESOURCES.eyebrow}
          title={INDUSTRIES_HUB_RESOURCES.title}
          titleId="industries-resources-title"
        />
        <nav className={cn(styles.resourceLinks, "mt-8")} aria-label="Related resources">
          {INDUSTRIES_HUB_RESOURCES.links.map((link) => (
            <Link key={link.href} href={link.href} prefetch className={styles.resourceLink}>
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </section>
  );
}

export function IndustriesHubFinalCtaSection() {
  const { title, description, ctas } = INDUSTRIES_HUB_FINAL_CTA;

  return (
    <section className={cn(sectionShellClass, "pb-16 sm:pb-20")} style={HUB_ACCENT_STYLE} aria-labelledby="industries-final-cta-title">
      <div className={marketingSectionContainerClass}>
        <div className={styles.finalCta}>
          <h2 id="industries-final-cta-title" className={headingClass}>
            {title}
          </h2>
          <p className={cn(descriptionClass, "mt-3")}>{description}</p>
          <HubCtaButtons ctas={ctas} className="mt-6" />
        </div>
      </div>
    </section>
  );
}
