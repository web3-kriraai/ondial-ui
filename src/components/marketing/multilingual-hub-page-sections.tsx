"use client";

import { ArrowUpRight, ChevronDown, Globe2 } from "lucide-react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useState, type CSSProperties } from "react";

import { AboutHeroCta } from "@/components/marketing/about-hero-cta";
import { BlogPageHero } from "@/components/marketing/blog-page-hero";
import { CountryCardsCarousel } from "@/components/marketing/country-cards-carousel";
import { FaqAccordionPanel } from "@/components/marketing/faq-accordion-panel";
import enterpriseStyles from "@/components/marketing/enterprise-page-sections.module.css";
import { HubMatteCard } from "@/components/marketing/hub-matte-card";
import matteStyles from "@/components/marketing/hub-matte-card.module.css";
import { MultilingualFlowIllustration } from "@/components/marketing/multilingual-flow-illustration";
import { ONDIAL_ACCENT_STYLE } from "@/components/marketing/split-screen-section";
import { TextReveal } from "@/components/ui/text-reveal";
import {
  marketingDottedSectionShellClass,
  marketingEyebrowClass,
  marketingSectionContainerClass,
} from "@/config/marketing-layout";
import {
  MULTILINGUAL_HUB_ALTERNATIVE_COMPARISONS,
  MULTILINGUAL_HUB_BENEFITS,
  MULTILINGUAL_HUB_CHALLENGES,
  MULTILINGUAL_HUB_DEPLOYMENT,
  MULTILINGUAL_HUB_FAQ,
  MULTILINGUAL_HUB_FEATURES,
  MULTILINGUAL_HUB_FINAL_CTA,
  MULTILINGUAL_HUB_HERO,
  MULTILINGUAL_HUB_HOW_IT_WORKS,
  MULTILINGUAL_HUB_INDUSTRY_USE_CASES,
  MULTILINGUAL_HUB_INTEGRATIONS,
  MULTILINGUAL_HUB_IVR_COMPARISON,
  MULTILINGUAL_HUB_LANGUAGES,
  MULTILINGUAL_HUB_QUICK_ANSWERS,
  MULTILINGUAL_HUB_SECURITY,
  MULTILINGUAL_HUB_SOLUTION,
  MULTILINGUAL_HUB_STORY,
  type MultilingualHubCta,
} from "@/data/multilingual-hub-content";
import { getMatteThemeByIndex } from "@/lib/industries/hub-matte-theme";
import { cn } from "@/lib/utils";

import styles from "./multilingual-hub-page-sections.module.css";

const PAGE_ACCENT_STYLE = {
  ...ONDIAL_ACCENT_STYLE,
  "--showcase-accent-h": "210",
  "--showcase-accent-s": "78%",
  "--showcase-accent-l": "46%",
} as CSSProperties;

const sectionShellClass = "w-full bg-transparent py-14 sm:py-16 lg:py-20";
const headingClass =
  "text-balance text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem]";
const descriptionClass =
  "mx-auto mt-4 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg";
const secondaryBtnClass =
  "inline-flex min-h-11 items-center justify-center gap-[0.35rem] rounded-full border border-black/10 bg-background px-[1.35rem] py-[0.85rem] text-[0.9375rem] font-semibold text-foreground no-underline transition-[transform,border-color,background,box-shadow] duration-200 ease-in-out hover:-translate-y-px hover:border-black/[0.14] hover:bg-[color-mix(in_oklab,var(--muted)_35%,var(--background))] hover:shadow-[0_8px_24px_-16px_rgb(15_23_42/0.18)] focus-visible:-translate-y-px focus-visible:border-black/[0.14] focus-visible:bg-[color-mix(in_oklab,var(--muted)_35%,var(--background))] focus-visible:shadow-[0_8px_24px_-16px_rgb(15_23_42/0.18)] focus-visible:outline-none";

const GLOSSARY_ICON_KEYS = [
  "languages",
  "globe",
  "message-square",
  "filter",
  "sparkles",
  "globe",
  "workflow",
  "users",
] as const;

const DEPLOYMENT_THEMES = [
  { iconKey: "languages", iconBg: "#E6F1FB", iconColor: "#0C447C" },
  { iconKey: "target", iconBg: "#EEEDFE", iconColor: "#534AB7" },
  { iconKey: "sparkles", iconBg: "#FCEBEB", iconColor: "#A32D2D" },
  { iconKey: "check", iconBg: "#E1F5EE", iconColor: "#085041" },
  { iconKey: "workflow", iconBg: "#FAEEDA", iconColor: "#633806" },
] as const;

const HINGLISH_QUOTE =
  'Sir, mera order kab tak deliver ho jayega? (Sir, by when will my order be delivered?)';

function SectionDivider() {
  return <hr className={styles.sectionDivider} aria-hidden />;
}

function HubCtaButtons({
  ctas,
  centered = true,
  className,
}: {
  ctas: readonly MultilingualHubCta[];
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

export function MultilingualHubHeroSection() {
  const { eyebrow, title, description, ctas, stats } = MULTILINGUAL_HUB_HERO;

  return (
    <section
      id="multilingual-hero"
      className={cn(marketingDottedSectionShellClass, "w-full bg-transparent pb-10 sm:pb-14 lg:pb-16")}
      style={PAGE_ACCENT_STYLE}
      aria-labelledby="multilingual-hero-title"
    >
      <div className={cn(marketingSectionContainerClass, styles.heroShell, "pt-6 sm:pt-8")}>
        <div className={styles.heroGrid}>
          <div className={styles.heroCopy}>
            <BlogPageHero
              eyebrow={eyebrow}
              title={
                <h1
                  id="multilingual-hero-title"
                  className="mx-auto max-w-4xl text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:mx-0 lg:text-[2.625rem] lg:leading-tight"
                >
                  {title}
                </h1>
              }
              description={description}
            />
            <HubCtaButtons ctas={ctas} className="mt-6 lg:justify-start" centered={false} />
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
            <MultilingualFlowIllustration className={styles.heroIllustration} />
          </div>
        </div>
      </div>
    </section>
  );
}

export function MultilingualHubQuickAnswersSection() {
  const { eyebrow, title, items } = MULTILINGUAL_HUB_QUICK_ANSWERS;

  return (
    <>
      <SectionDivider />
      <section className={sectionShellClass} style={PAGE_ACCENT_STYLE} aria-labelledby="multilingual-quick-title">
        <div className={marketingSectionContainerClass}>
          <SectionHeader eyebrow={eyebrow} title={title} titleId="multilingual-quick-title" />
          <div className={cn(styles.carouselWrap, "mt-8 sm:mt-10")}>
            <CountryCardsCarousel visibleCount={3}>
              {items.map((item) => (
                <HubMatteCard
                  key={item.question}
                  theme={{
                    iconKey: item.iconKey,
                    iconBg: item.iconBg,
                    iconColor: item.iconColor,
                  }}
                  title={item.question}
                  titleClassName={matteStyles.matteTitleLong}
                >
                  <p className={matteStyles.matteText}>{item.answer}</p>
                </HubMatteCard>
              ))}
            </CountryCardsCarousel>
          </div>
        </div>
      </section>
    </>
  );
}

export function MultilingualHubOverviewSection() {
  const challenges = MULTILINGUAL_HUB_CHALLENGES;
  const solution = MULTILINGUAL_HUB_SOLUTION;

  return (
    <>
      <SectionDivider />
      <section className={sectionShellClass} style={PAGE_ACCENT_STYLE} aria-labelledby="multilingual-overview-title">
        <div className={marketingSectionContainerClass}>
          <SectionHeader
            eyebrow="Platform overview"
            title="Why global teams choose voice automation"
            titleId="multilingual-overview-title"
          />
          <div className={cn(styles.narrativeGrid, "mt-8 sm:mt-10")}>
            <HubMatteCard
              theme={{
                iconKey: challenges.iconKey,
                iconBg: challenges.iconBg,
                iconColor: challenges.iconColor,
              }}
              title={challenges.title}
            >
              <p className={matteStyles.matteText}>{challenges.description}</p>
            </HubMatteCard>
            <HubMatteCard
              theme={{
                iconKey: solution.iconKey,
                iconBg: solution.iconBg,
                iconColor: solution.iconColor,
              }}
              title={solution.title}
            >
              <p className={matteStyles.matteText}>{solution.description}</p>
            </HubMatteCard>
          </div>
        </div>
      </section>
    </>
  );
}

export function MultilingualHubLanguagesSection() {
  const { eyebrow, title, description, groups, note } = MULTILINGUAL_HUB_LANGUAGES;

  return (
    <>
      <SectionDivider />
      <section className={sectionShellClass} style={PAGE_ACCENT_STYLE} aria-labelledby="multilingual-languages-title">
        <div className={marketingSectionContainerClass}>
          <SectionHeader
            eyebrow={eyebrow}
            title={title}
            description={description}
            titleId="multilingual-languages-title"
          />
          <div className={styles.languageBadgeWrap}>
            <span className={styles.languageCountBadge}>
              <Globe2 className="size-3.5 shrink-0" strokeWidth={1.75} aria-hidden />
              100+ languages with automatic detection
            </span>
          </div>
          <div className={cn(styles.carouselWrap, "mt-8 sm:mt-10")}>
            <CountryCardsCarousel visibleCount={3}>
              {groups.map((group) => (
                <HubMatteCard
                  key={group.languages}
                  theme={{
                    iconKey: group.iconKey,
                    iconBg: group.iconBg,
                    iconColor: group.iconColor,
                  }}
                  title={group.languages}
                >
                  <span className={styles.typeBadge}>{group.type}</span>
                  <p className={matteStyles.matteText}>{group.notes}</p>
                </HubMatteCard>
              ))}
            </CountryCardsCarousel>
          </div>
          <p className={styles.languageNote}>{note}</p>
        </div>
      </section>
    </>
  );
}

export function MultilingualHubIndustryUseCasesSection() {
  const { eyebrow, title, description, rows } = MULTILINGUAL_HUB_INDUSTRY_USE_CASES;

  return (
    <>
      <SectionDivider />
      <section className={sectionShellClass} style={PAGE_ACCENT_STYLE} aria-labelledby="multilingual-use-cases-title">
        <div className={marketingSectionContainerClass}>
          <SectionHeader
            eyebrow={eyebrow}
            title={title}
            description={description}
            titleId="multilingual-use-cases-title"
          />
          <div className={cn(styles.carouselWrap, "mt-8 sm:mt-10")}>
            <CountryCardsCarousel visibleCount={3}>
              {rows.map((row) => (
                <HubMatteCard
                  key={row.industry}
                  theme={{
                    iconKey: row.iconKey,
                    iconBg: row.iconBg,
                    iconColor: row.iconColor,
                  }}
                  title={row.industry}
                >
                  <p className={styles.cardMeta}>Multilingual workflow</p>
                  <p className={matteStyles.matteText}>{row.workflow}</p>
                  <p className={styles.cardMeta}>Outcome</p>
                  <p className={matteStyles.matteText}>{row.outcome}</p>
                </HubMatteCard>
              ))}
            </CountryCardsCarousel>
          </div>
        </div>
      </section>
    </>
  );
}

export function MultilingualHubFeaturesSection() {
  const { eyebrow, title, items } = MULTILINGUAL_HUB_FEATURES;

  return (
    <>
      <SectionDivider />
      <section className={sectionShellClass} style={PAGE_ACCENT_STYLE} aria-labelledby="multilingual-features-title">
        <div className={marketingSectionContainerClass}>
          <SectionHeader eyebrow={eyebrow} title={title} titleId="multilingual-features-title" />
          <div className={cn(styles.carouselWrap, "mt-8 sm:mt-10")}>
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
          </div>
        </div>
      </section>
    </>
  );
}

export function MultilingualHubHowItWorksSection() {
  const { eyebrow, title, steps } = MULTILINGUAL_HUB_HOW_IT_WORKS;

  return (
    <>
      <SectionDivider />
      <section
        id="how-it-works"
        className={sectionShellClass}
        style={PAGE_ACCENT_STYLE}
        aria-labelledby="multilingual-hiw-title"
      >
        <div className={marketingSectionContainerClass}>
          <SectionHeader eyebrow={eyebrow} title={title} titleId="multilingual-hiw-title" />
          <div className={cn(styles.hiwGrid, "mt-8 sm:mt-10")}>
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

export function MultilingualHubBenefitsSection() {
  const { eyebrow, title, items } = MULTILINGUAL_HUB_BENEFITS;

  return (
    <>
      <SectionDivider />
      <section className={sectionShellClass} style={PAGE_ACCENT_STYLE} aria-labelledby="multilingual-benefits-title">
        <div className={marketingSectionContainerClass}>
          <SectionHeader eyebrow={eyebrow} title={title} titleId="multilingual-benefits-title" />
          <div className={cn(styles.carouselWrap, "mt-8 sm:mt-10")}>
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
          </div>
        </div>
      </section>
    </>
  );
}

export function MultilingualHubComparisonSection() {
  const ivr = MULTILINGUAL_HUB_IVR_COMPARISON;
  const alternatives = MULTILINGUAL_HUB_ALTERNATIVE_COMPARISONS;

  return (
    <>
      <SectionDivider />
      <section className={sectionShellClass} style={PAGE_ACCENT_STYLE} aria-labelledby="multilingual-comparison-title">
        <div className={marketingSectionContainerClass}>
          <SectionHeader eyebrow={ivr.eyebrow} title={ivr.title} titleId="multilingual-comparison-title" />
          <div className={cn(styles.tableWrap, "mx-auto mt-8 max-w-4xl")}>
            <table className={styles.dataTable}>
              <thead>
                <tr>
                  <th scope="col">Capability</th>
                  <th scope="col">OnDial</th>
                  <th scope="col">Traditional IVR</th>
                </tr>
              </thead>
              <tbody>
                {ivr.rows.map((row) => (
                  <tr key={row.capability}>
                    <td>{row.capability}</td>
                    <td className={styles.dataTableOndial}>{row.ondial}</td>
                    <td>{row.traditional}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className={styles.comparisonSectionGap}>
            <SectionHeader eyebrow={alternatives.eyebrow} title={alternatives.title} />
            <div className={cn(styles.carouselWrap, "mt-8 sm:mt-10")}>
              <CountryCardsCarousel visibleCount={3}>
                {alternatives.items.map((item) => (
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
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export function MultilingualHubSecuritySection() {
  const { eyebrow, title, description, badges } = MULTILINGUAL_HUB_SECURITY;

  return (
    <>
      <SectionDivider />
      <section className={sectionShellClass} style={PAGE_ACCENT_STYLE} aria-labelledby="multilingual-security-title">
        <div className={marketingSectionContainerClass}>
          <SectionHeader eyebrow={eyebrow} title={title} titleId="multilingual-security-title" />
          <p className={cn(styles.proseBlock, "mt-6")}>{description}</p>
          <div className={styles.complianceBadges}>
            {badges.map((badge) => (
              <span key={badge} className={styles.complianceBadge}>
                {badge}
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export function MultilingualHubIntegrationsSection() {
  const { eyebrow, title, description, items } = MULTILINGUAL_HUB_INTEGRATIONS;

  return (
    <>
      <SectionDivider />
      <section className={sectionShellClass} style={PAGE_ACCENT_STYLE} aria-labelledby="multilingual-integrations-title">
        <div className={marketingSectionContainerClass}>
          <SectionHeader
            eyebrow={eyebrow}
            title={title}
            description={description}
            titleId="multilingual-integrations-title"
          />
          <div className={cn(styles.carouselWrap, "mt-8 sm:mt-10")}>
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

export function MultilingualHubStorySection() {
  const { eyebrow, title, disclaimer, body, iconKey, iconBg, iconColor } = MULTILINGUAL_HUB_STORY;
  const [beforeQuote, afterQuote] = body.split(HINGLISH_QUOTE);

  return (
    <>
      <SectionDivider />
      <section className={sectionShellClass} style={PAGE_ACCENT_STYLE} aria-labelledby="multilingual-story-title">
        <div className={marketingSectionContainerClass}>
          <SectionHeader eyebrow={eyebrow} title={title} titleId="multilingual-story-title" />
          <div className={cn(styles.storyCardWide, "mt-8")}>
            <HubMatteCard theme={{ iconKey, iconBg, iconColor }} title="Regional logistics provider">
              <p className={styles.storyDisclaimer}>{disclaimer}</p>
              {beforeQuote ? <p className={matteStyles.matteText}>{beforeQuote.trim()}</p> : null}
              <blockquote className={styles.hinglishQuote}>{HINGLISH_QUOTE}</blockquote>
              {afterQuote ? <p className={matteStyles.matteText}>{afterQuote.trim()}</p> : null}
            </HubMatteCard>
          </div>
        </div>
      </section>
    </>
  );
}

export function MultilingualHubFaqSection() {
  const prefersReducedMotion = useReducedMotion();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <>
      <SectionDivider />
      <section className={sectionShellClass} style={PAGE_ACCENT_STYLE} aria-labelledby="multilingual-faq-title">
        <div className={marketingSectionContainerClass}>
          <SectionHeader
            eyebrow={MULTILINGUAL_HUB_FAQ.eyebrow}
            title={MULTILINGUAL_HUB_FAQ.title}
            titleId="multilingual-faq-title"
          />
          <div className={cn(enterpriseStyles.faqList, "mx-auto mt-8 max-w-3xl")}>
            {MULTILINGUAL_HUB_FAQ.items.map((item, index) => {
              const isOpen = openIndex === index;
              const triggerId = `multilingual-faq-trigger-${index}`;
              const panelId = `multilingual-faq-panel-${index}`;
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

export function MultilingualHubDeploymentSection() {
  const deployment = MULTILINGUAL_HUB_DEPLOYMENT;
  const deploymentCards = [
    { title: deployment.definition.label, body: deployment.definition.text, theme: DEPLOYMENT_THEMES[0]! },
    {
      title: deployment.decisionFramework.label,
      items: deployment.decisionFramework.items,
      theme: DEPLOYMENT_THEMES[1]!,
    },
    { title: deployment.commonMistake.label, body: deployment.commonMistake.text, theme: DEPLOYMENT_THEMES[2]! },
    { title: deployment.checklist.label, items: deployment.checklist.items, theme: DEPLOYMENT_THEMES[3]! },
    { title: deployment.timeline.label, items: deployment.timeline.phases, theme: DEPLOYMENT_THEMES[4]! },
  ] as const;

  return (
    <>
      <SectionDivider />
      <section className={sectionShellClass} style={PAGE_ACCENT_STYLE} aria-labelledby="multilingual-deployment-title">
        <div className={marketingSectionContainerClass}>
          <SectionHeader
            eyebrow={deployment.eyebrow}
            title={deployment.title}
            titleId="multilingual-deployment-title"
          />
          <div className={cn(styles.carouselWrap, "mt-8 sm:mt-10")}>
            <CountryCardsCarousel visibleCount={3}>
              {deploymentCards.map((card) => (
                <HubMatteCard key={card.title} theme={card.theme} title={card.title} titleClassName={matteStyles.matteTitleLong}>
                  {"body" in card && card.body ? (
                    <p className={matteStyles.matteText}>{card.body}</p>
                  ) : (
                    <ul className={matteStyles.matteList}>
                      {card.items?.map((item) => (
                        <li key={item} className={matteStyles.matteListItem}>
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </HubMatteCard>
              ))}
            </CountryCardsCarousel>
          </div>
          <p className={styles.deploymentCarouselLabel}>{deployment.glossary.label}</p>
          <div className={cn(styles.carouselWrap, "mt-4 sm:mt-6")}>
            <CountryCardsCarousel visibleCount={3}>
              {deployment.glossary.terms.map((entry, index) => (
                <HubMatteCard
                  key={entry.term}
                  theme={getMatteThemeByIndex(index, GLOSSARY_ICON_KEYS[index % GLOSSARY_ICON_KEYS.length])}
                  title={entry.term}
                >
                  <p className={matteStyles.matteText}>{entry.definition}</p>
                </HubMatteCard>
              ))}
            </CountryCardsCarousel>
          </div>
        </div>
      </section>
    </>
  );
}

export function MultilingualHubFinalCtaSection() {
  const { title, description, ctas } = MULTILINGUAL_HUB_FINAL_CTA;

  return (
    <>
      <SectionDivider />
      <section
        className={cn(sectionShellClass, "pb-16 sm:pb-20")}
        style={PAGE_ACCENT_STYLE}
        aria-labelledby="multilingual-final-cta-title"
      >
        <div className={marketingSectionContainerClass}>
          <div className={styles.finalCta}>
            <h2 id="multilingual-final-cta-title" className={headingClass}>
              {title}
            </h2>
            <p className={cn(descriptionClass, "mt-3")}>{description}</p>
            <HubCtaButtons ctas={ctas} className="mt-6" />
          </div>
        </div>
      </section>
    </>
  );
}
