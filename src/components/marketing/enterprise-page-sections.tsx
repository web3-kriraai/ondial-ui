"use client";

import {
  ArrowUpRight,
  BarChart3,
  Bot,
  Building2,
  Check,
  ChevronDown,
  Clock,
  Globe2,
  Headphones,
  Layers,
  Link2,
  Mic,
  Rocket,
  Scale,
  Server,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
  Zap,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { motion, useInView, useReducedMotion, type Variants } from "framer-motion";
import { useRef, useState, type CSSProperties, type ReactNode } from "react";

import { AboutHeroCta } from "@/components/marketing/about-hero-cta";
import { FaqAccordionPanel } from "@/components/marketing/faq-accordion-panel";
import { BlogPageHero } from "@/components/marketing/blog-page-hero";
import { ONDIAL_ACCENT_STYLE } from "@/components/marketing/split-screen-section";
import { TextReveal } from "@/components/ui/text-reveal";
import { marketingEyebrowClass, marketingSectionContainerClass } from "@/config/marketing-layout";
import {
  ENTERPRISE_COMPARISON,
  ENTERPRISE_COMPLIANCE,
  ENTERPRISE_DEPLOYMENT,
  ENTERPRISE_FAQ,
  ENTERPRISE_FINAL_CTA,
  ENTERPRISE_HERO,
  ENTERPRISE_HOW_IT_WORKS,
  ENTERPRISE_INTEGRATIONS,
  ENTERPRISE_PRICING,
  ENTERPRISE_SHIFT_SECTION,
  ENTERPRISE_USE_CASES,
  ENTERPRISE_WHY_CHOOSE,
  type EnterpriseCta,
} from "@/data/enterprise-content";
import { cn } from "@/lib/utils";

import styles from "./enterprise-page-sections.module.css";

const ENTERPRISE_ACCENT_STYLE = {
  ...ONDIAL_ACCENT_STYLE,
  "--showcase-accent-h": "262",
  "--showcase-accent-s": "83%",
  "--showcase-accent-l": "58%",
} as CSSProperties;

const sectionShellClass = "w-full bg-transparent py-14 sm:py-16 lg:py-20";
const headingClass =
  "text-balance text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem]";
const descriptionClass =
  "mx-auto mt-4 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg";
const secondaryBtnClass =
  "inline-flex min-h-11 items-center justify-center gap-[0.35rem] rounded-full border border-black/10 bg-background px-[1.35rem] py-[0.85rem] text-[0.9375rem] font-semibold text-foreground no-underline transition-[transform,border-color,background,box-shadow] duration-200 ease-in-out hover:-translate-y-px hover:border-black/[0.14] hover:bg-[color-mix(in_oklab,var(--muted)_35%,var(--background))] hover:shadow-[0_8px_24px_-16px_rgb(15_23_42/0.18)] focus-visible:-translate-y-px focus-visible:border-black/[0.14] focus-visible:bg-[color-mix(in_oklab,var(--muted)_35%,var(--background))] focus-visible:shadow-[0_8px_24px_-16px_rgb(15_23_42/0.18)] focus-visible:outline-none";

const gridVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.08 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.48, ease: [0.22, 1, 0.36, 1] },
  },
};

function SectionHeader({
  eyebrow,
  title,
  description,
  titleId,
  titleAccent,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  titleId?: string;
  titleAccent?: string;
}) {
  return (
    <header className="mx-auto max-w-3xl text-center">
      <p className={cn("mb-4", marketingEyebrowClass)}>{eyebrow}</p>
      <h2 id={titleId} className={headingClass}>
        {titleAccent ? (
          <>
            <TextReveal as="span" className="block" delay={0.05} stagger={0.07} inViewAmount={0.5}>
              {title}
            </TextReveal>
            <TextReveal
              as="span"
              className={cn("block", styles.titleAccent)}
              delay={0.12}
              stagger={0.07}
              inViewAmount={0.5}
            >
              {titleAccent}
            </TextReveal>
          </>
        ) : (
          <TextReveal as="span" className="block" delay={0.05} stagger={0.07} inViewAmount={0.5}>
            {title}
          </TextReveal>
        )}
      </h2>
      {description ? (
        <TextReveal
          as="p"
          className={descriptionClass}
          delay={0.2}
          stagger={0.028}
          inViewAmount={0.4}
        >
          {description}
        </TextReveal>
      ) : null}
    </header>
  );
}

function EnterpriseCtaButtons({
  ctas,
  centered = false,
}: {
  ctas: readonly EnterpriseCta[];
  centered?: boolean;
}) {
  const [primary, secondary] = ctas;

  return (
    <div
      className={cn(
        "mt-6 flex w-full flex-wrap items-center gap-3",
        centered && "justify-center",
      )}
    >
      {primary ? <AboutHeroCta href={primary.href} label={primary.label} /> : null}
      {secondary ? (
        <Link href={secondary.href} prefetch className={secondaryBtnClass}>
          {secondary.label}
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

function AnimatedGrid({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
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

function FeatureCard({
  icon: Icon,
  title,
  description,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
}) {
  return (
    <motion.article className={styles.card} variants={cardVariants}>
      <span className={styles.cardIcon} aria-hidden>
        <Icon className="size-4" strokeWidth={1.85} />
      </span>
      <h3 className={styles.cardTitle}>{title}</h3>
      <p className={styles.cardText}>{description}</p>
    </motion.article>
  );
}

const statIcons: Record<string, LucideIcon> = {
  thousands: Layers,
  latency: Zap,
  trai: ShieldCheck,
  availability: Clock,
};

export function EnterpriseHeroSection() {
  return (
    <section
      id="enterprise-hero"
      className="w-full bg-transparent pb-12 sm:pb-16 lg:pb-20"
      style={ENTERPRISE_ACCENT_STYLE}
      aria-labelledby="enterprise-hero-title"
    >
      <div className={cn(marketingSectionContainerClass, "pt-6 sm:pt-8")}>
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center lg:gap-12">
          <div>
            <BlogPageHero
              eyebrow={ENTERPRISE_HERO.eyebrow}
              align="start"
              title={
                <h1
                  id="enterprise-hero-title"
                  className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-[2.625rem] lg:leading-tight"
                >
                  <TextReveal as="span" className="block" delay={0.05} stagger={0.04}>
                    {ENTERPRISE_HERO.titleLead}
                  </TextReveal>
                  <TextReveal
                    as="span"
                    className={cn("block", styles.titleAccent)}
                    delay={0.12}
                    stagger={0.04}
                  >
                    {ENTERPRISE_HERO.titleAccent}
                  </TextReveal>
                </h1>
              }
              description={ENTERPRISE_HERO.description}
            />
            <EnterpriseCtaButtons ctas={ENTERPRISE_HERO.ctas} />
          </div>

          <AnimatedGrid className={styles.statGrid}>
            {ENTERPRISE_HERO.stats.map((stat) => {
              const Icon = statIcons[stat.id] ?? Sparkles;
              return (
                <motion.div key={stat.id} className={styles.statTile} variants={cardVariants}>
                  <span className={styles.statIcon} aria-hidden>
                    <Icon className="size-4" strokeWidth={1.85} />
                  </span>
                  <div>
                    <p className={styles.statValue}>{stat.value}</p>
                    <p className={styles.statLabel}>{stat.label}</p>
                  </div>
                </motion.div>
              );
            })}
          </AnimatedGrid>
        </div>
      </div>
    </section>
  );
}

const shiftIcons: Record<string, LucideIcon> = {
  "people-constraints": Users,
  "what-agent-does": Bot,
  "enterprise-scale": TrendingUp,
  "built-for-india": Globe2,
};

export function EnterpriseShiftSection() {
  return (
    <section
      className={cn(sectionShellClass, styles.section)}
      style={ENTERPRISE_ACCENT_STYLE}
      aria-labelledby="enterprise-shift-title"
    >
      <div className={marketingSectionContainerClass}>
        <SectionHeader
          eyebrow={ENTERPRISE_SHIFT_SECTION.eyebrow}
          title={ENTERPRISE_SHIFT_SECTION.title}
          description={ENTERPRISE_SHIFT_SECTION.description}
          titleId="enterprise-shift-title"
        />
        <AnimatedGrid className={cn(styles.cardGrid4, "mt-10 sm:mt-12")}>
          {ENTERPRISE_SHIFT_SECTION.cards.map((card) => (
            <FeatureCard
              key={card.id}
              icon={shiftIcons[card.id] ?? Sparkles}
              title={card.title}
              description={card.description}
            />
          ))}
        </AnimatedGrid>
      </div>
    </section>
  );
}

const whyChooseIcons: Record<string, LucideIcon> = {
  concurrent: Layers,
  latency: Zap,
  "voice-quality": Mic,
  analytics: BarChart3,
  "sales-automation": TrendingUp,
  "voice-cloning": Headphones,
};

export function EnterpriseWhyChooseSection() {
  return (
    <section
      className={cn(sectionShellClass, styles.section)}
      style={ENTERPRISE_ACCENT_STYLE}
      aria-labelledby="enterprise-why-title"
    >
      <div className={marketingSectionContainerClass}>
        <SectionHeader
          eyebrow={ENTERPRISE_WHY_CHOOSE.eyebrow}
          title={ENTERPRISE_WHY_CHOOSE.title}
          description={ENTERPRISE_WHY_CHOOSE.description}
          titleId="enterprise-why-title"
        />
        <div className={styles.pillRow}>
          {ENTERPRISE_WHY_CHOOSE.pills.map((pill) => (
            <span key={pill.id} className={styles.pill}>
              <span className={styles.pillLabel}>{pill.label}</span>
              <span aria-hidden>·</span>
              <span>{pill.detail}</span>
            </span>
          ))}
        </div>
        <AnimatedGrid className={cn(styles.cardGrid6, "mt-10 sm:mt-12")}>
          {ENTERPRISE_WHY_CHOOSE.features.map((feature) => (
            <FeatureCard
              key={feature.id}
              icon={whyChooseIcons[feature.id] ?? Sparkles}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </AnimatedGrid>
        <p className={styles.quoteBox}>{ENTERPRISE_WHY_CHOOSE.closingQuote}</p>
      </div>
    </section>
  );
}

export function EnterpriseHowItWorksSection() {
  return (
    <section
      className={cn(sectionShellClass, styles.section)}
      style={ENTERPRISE_ACCENT_STYLE}
      aria-labelledby="enterprise-how-title"
    >
      <div className={marketingSectionContainerClass}>
        <SectionHeader
          eyebrow={ENTERPRISE_HOW_IT_WORKS.eyebrow}
          title={ENTERPRISE_HOW_IT_WORKS.title}
          titleId="enterprise-how-title"
        />
        <AnimatedGrid className={styles.stepList}>
          {ENTERPRISE_HOW_IT_WORKS.steps.map((step) => (
            <motion.article key={step.id} className={styles.stepCard} variants={cardVariants}>
              <span className={styles.stepNumber}>{step.step}</span>
              <h3 className={styles.cardTitle}>{step.title}</h3>
              <p className={styles.cardText}>{step.description}</p>
            </motion.article>
          ))}
        </AnimatedGrid>
        <div className={styles.badgeRow}>
          {ENTERPRISE_HOW_IT_WORKS.trustBadges.map((badge) => (
            <span key={badge} className={styles.badge}>
              <Check className="size-3.5" strokeWidth={2.5} aria-hidden />
              {badge}
            </span>
          ))}
        </div>
        <p className={styles.quoteBox}>{ENTERPRISE_HOW_IT_WORKS.closingQuote}</p>
      </div>
    </section>
  );
}

export function EnterpriseUseCasesSection() {
  return (
    <section
      className={cn(sectionShellClass, styles.section)}
      style={ENTERPRISE_ACCENT_STYLE}
      aria-labelledby="enterprise-use-cases-title"
    >
      <div className={marketingSectionContainerClass}>
        <SectionHeader
          eyebrow={ENTERPRISE_USE_CASES.eyebrow}
          title={ENTERPRISE_USE_CASES.title}
          description={ENTERPRISE_USE_CASES.description}
          titleId="enterprise-use-cases-title"
        />
        <AnimatedGrid className={cn(styles.cardGrid6, "mt-10 sm:mt-12")}>
          {ENTERPRISE_USE_CASES.cases.map((useCase) => (
            <motion.article key={useCase.id} className={styles.card} variants={cardVariants}>
              <p className={styles.useCaseCategory}>{useCase.category}</p>
              <h3 className={styles.cardTitle}>{useCase.title}</h3>
              <p className={styles.cardText}>{useCase.description}</p>
              <p className={styles.coversLabel}>{useCase.coversLabel}</p>
              <p className={styles.cardText}>{useCase.covers}</p>
            </motion.article>
          ))}
        </AnimatedGrid>
        <p className={styles.quoteBox}>{ENTERPRISE_USE_CASES.closingQuote}</p>
      </div>
    </section>
  );
}

export function EnterpriseComplianceSection() {
  return (
    <section
      className={cn(sectionShellClass, styles.section)}
      style={ENTERPRISE_ACCENT_STYLE}
      aria-labelledby="enterprise-compliance-title"
    >
      <div className={marketingSectionContainerClass}>
        <SectionHeader
          eyebrow={ENTERPRISE_COMPLIANCE.eyebrow}
          title={ENTERPRISE_COMPLIANCE.title}
          description={ENTERPRISE_COMPLIANCE.description}
          titleId="enterprise-compliance-title"
        />
        <AnimatedGrid className={cn(styles.cardGrid2, "mt-10 sm:mt-12")}>
          {ENTERPRISE_COMPLIANCE.pillars.map((pillar) => (
            <motion.article key={pillar.id} className={styles.card} variants={cardVariants}>
              <p className={styles.useCaseCategory}>{pillar.label}</p>
              <h3 className={styles.cardTitle}>{pillar.title}</h3>
              <p className={styles.cardText}>{pillar.description}</p>
            </motion.article>
          ))}
        </AnimatedGrid>
        <h3 className={cn(styles.governanceTitle, "mt-10 text-center sm:mt-12")}>
          {ENTERPRISE_COMPLIANCE.complianceTeamTitle}
        </h3>
        <AnimatedGrid className={styles.cardGrid4}>
          {ENTERPRISE_COMPLIANCE.complianceBenefits.map((benefit) => (
            <FeatureCard
              key={benefit.id}
              icon={ShieldCheck}
              title={benefit.title}
              description={benefit.description}
            />
          ))}
        </AnimatedGrid>
        <div className={styles.governanceBox}>
          <p className={styles.governanceTitle}>{ENTERPRISE_COMPLIANCE.governanceTitle}</p>
          <ul className={styles.hybridList}>
            {ENTERPRISE_COMPLIANCE.governanceBullets.map((bullet) => (
              <li key={bullet} className={styles.hybridItem}>
                <span className={styles.checkDot} aria-hidden />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

const integrationIcons: Record<string, LucideIcon> = {
  crm: Link2,
  "inbound-outbound": Headphones,
  elastic: Server,
};

export function EnterpriseIntegrationsSection() {
  return (
    <section
      className={cn(sectionShellClass, styles.section)}
      style={ENTERPRISE_ACCENT_STYLE}
      aria-labelledby="enterprise-integrations-title"
    >
      <div className={marketingSectionContainerClass}>
        <SectionHeader
          eyebrow={ENTERPRISE_INTEGRATIONS.eyebrow}
          title={ENTERPRISE_INTEGRATIONS.title}
          description={ENTERPRISE_INTEGRATIONS.description}
          titleId="enterprise-integrations-title"
        />
        <AnimatedGrid className={cn(styles.cardGrid3, "mt-10 sm:mt-12")}>
          {ENTERPRISE_INTEGRATIONS.columns.map((column) => {
            const Icon = integrationIcons[column.id] ?? Link2;
            return (
              <motion.article key={column.id} className={styles.card} variants={cardVariants}>
                <span className={styles.cardIcon} aria-hidden>
                  <Icon className="size-4" strokeWidth={1.85} />
                </span>
                <h3 className={styles.cardTitle}>{column.title}</h3>
                <p className={styles.cardText}>{column.description}</p>
                <ul className={cn(styles.hybridList, "mt-4")}>
                  {column.bullets.map((bullet) => (
                    <li key={bullet} className={styles.hybridItem}>
                      <span className={styles.checkDot} aria-hidden />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </motion.article>
            );
          })}
        </AnimatedGrid>
      </div>
    </section>
  );
}

export function EnterpriseComparisonSection() {
  return (
    <section
      className={cn(sectionShellClass, styles.section)}
      style={ENTERPRISE_ACCENT_STYLE}
      aria-labelledby="enterprise-comparison-title"
    >
      <div className={marketingSectionContainerClass}>
        <SectionHeader
          eyebrow={ENTERPRISE_COMPARISON.eyebrow}
          title={ENTERPRISE_COMPARISON.title}
          description={ENTERPRISE_COMPARISON.description}
          titleId="enterprise-comparison-title"
        />
        <div className={styles.comparisonWrap}>
          <div className="overflow-x-auto">
            <table className={styles.comparisonTable}>
            <thead>
              <tr>
                <th scope="col">Dimension</th>
                <th scope="col">Traditional teams</th>
                <th scope="col">OnDial AI agents</th>
              </tr>
            </thead>
            <tbody>
              {ENTERPRISE_COMPARISON.rows.map((row) => (
                <tr key={row.id}>
                  <td>{row.dimension}</td>
                  <td>{row.traditional}</td>
                  <td className={styles.comparisonOndial}>{row.ondial}</td>
                </tr>
              ))}
            </tbody>
            </table>
          </div>
        </div>
        <h3 className={cn(styles.cardTitle, "mt-10 text-center")}>
          {ENTERPRISE_COMPARISON.hybridTitle}
        </h3>
        <div className={styles.hybridGrid}>
          {ENTERPRISE_COMPARISON.hybridColumns.map((column) => (
            <article key={column.id} className={styles.hybridCard}>
              <h4 className={styles.hybridTitle}>{column.title}</h4>
              <ul className={styles.hybridList}>
                {column.items.map((item) => (
                  <li key={item} className={styles.hybridItem}>
                    <span className={styles.checkDot} aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const deploymentIcons: Record<string, LucideIcon> = {
  templates: Layers,
  "no-tech": Users,
  "cross-dept": Rocket,
};

export function EnterpriseDeploymentSection() {
  return (
    <section
      className={cn(sectionShellClass, styles.section)}
      style={ENTERPRISE_ACCENT_STYLE}
      aria-labelledby="enterprise-deployment-title"
    >
      <div className={marketingSectionContainerClass}>
        <SectionHeader
          eyebrow={ENTERPRISE_DEPLOYMENT.eyebrow}
          title={ENTERPRISE_DEPLOYMENT.title}
          description={ENTERPRISE_DEPLOYMENT.description}
          titleId="enterprise-deployment-title"
        />
        <AnimatedGrid className={cn(styles.cardGrid3, "mt-10 sm:mt-12")}>
          {ENTERPRISE_DEPLOYMENT.features.map((feature) => (
            <FeatureCard
              key={feature.id}
              icon={deploymentIcons[feature.id] ?? Rocket}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </AnimatedGrid>
        <AnimatedGrid className={cn(styles.cardGrid3, "mt-6")}>
          {ENTERPRISE_DEPLOYMENT.departments.map((dept) => (
            <motion.article key={dept.id} className={styles.card} variants={cardVariants}>
              <h3 className={styles.cardTitle}>{dept.label}</h3>
              <p className={styles.cardText}>{dept.detail}</p>
            </motion.article>
          ))}
        </AnimatedGrid>
        <p className={cn(styles.governanceTitle, "mt-10 text-center")}>
          {ENTERPRISE_DEPLOYMENT.industryTemplatesLabel}
        </p>
        <div className={styles.chipRow}>
          {ENTERPRISE_DEPLOYMENT.industryTemplates.map((template) => (
            <span key={template} className={styles.chip}>
              {template}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

const pricingIcons: Record<string, LucideIcon> = {
  grow: TrendingUp,
  budget: Scale,
  reach: Building2,
};

export function EnterprisePricingSection() {
  return (
    <section
      className={cn(sectionShellClass, styles.section)}
      style={ENTERPRISE_ACCENT_STYLE}
      aria-labelledby="enterprise-pricing-title"
    >
      <div className={marketingSectionContainerClass}>
        <SectionHeader
          eyebrow={ENTERPRISE_PRICING.eyebrow}
          title={ENTERPRISE_PRICING.title}
          description={ENTERPRISE_PRICING.description}
          titleId="enterprise-pricing-title"
        />
        <AnimatedGrid className={cn(styles.cardGrid3, "mt-10 sm:mt-12")}>
          {ENTERPRISE_PRICING.valueCards.map((card) => (
            <FeatureCard
              key={card.id}
              icon={pricingIcons[card.id] ?? TrendingUp}
              title={card.title}
              description={card.description}
            />
          ))}
        </AnimatedGrid>
        <div className={styles.bulletGrid}>
          {ENTERPRISE_PRICING.bullets.map((bullet) => (
            <div key={bullet} className={styles.bulletItem}>
              <Check className="mt-0.5 size-4 shrink-0 text-[#534AB7]" strokeWidth={2.5} aria-hidden />
              <span>{bullet}</span>
            </div>
          ))}
        </div>
        <div className="mt-8 flex justify-center">
          <AboutHeroCta
            href={ENTERPRISE_PRICING.cta.href}
            label={ENTERPRISE_PRICING.cta.label}
          />
        </div>
      </div>
    </section>
  );
}

export function EnterpriseFaqSection() {
  const prefersReducedMotion = useReducedMotion();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="enterprise-faq"
      className={cn(sectionShellClass, styles.section)}
      style={ENTERPRISE_ACCENT_STYLE}
      aria-labelledby="enterprise-faq-title"
    >
      <div className={marketingSectionContainerClass}>
        <SectionHeader
          eyebrow={ENTERPRISE_FAQ.eyebrow}
          title={ENTERPRISE_FAQ.titleLead}
          titleAccent={ENTERPRISE_FAQ.titleAccent}
          description={ENTERPRISE_FAQ.description}
          titleId="enterprise-faq-title"
        />
        <div className={styles.faqList}>
          {ENTERPRISE_FAQ.items.map((item, index) => {
            const isOpen = openIndex === index;
            const panelId = `enterprise-faq-panel-${item.id}`;
            const triggerId = `enterprise-faq-trigger-${item.id}`;

            return (
              <div
                key={item.id}
                className={cn(styles.faqItem, isOpen && styles.faqItemOpen)}
              >
                <button
                  type="button"
                  id={triggerId}
                  className={styles.faqTrigger}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                >
                  <span
                    className={cn(
                      styles.faqQuestion,
                      isOpen && styles.faqQuestionOpen,
                    )}
                  >
                    {item.question}
                  </span>
                  <motion.span
                    className={cn(styles.faqToggle, isOpen && styles.faqToggleOpen)}
                    aria-hidden
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={
                      prefersReducedMotion
                        ? { duration: 0 }
                        : { type: "spring", stiffness: 360, damping: 26 }
                    }
                  >
                    <ChevronDown className="size-4" strokeWidth={2.25} />
                  </motion.span>
                </button>
                <FaqAccordionPanel
                  isOpen={isOpen}
                  panelId={panelId}
                  triggerId={triggerId}
                >
                  <p className={styles.faqAnswer}>{item.answer}</p>
                </FaqAccordionPanel>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function EnterpriseFinalCtaSection() {
  return (
    <section
      className={cn(sectionShellClass, "pb-16 sm:pb-20", styles.section)}
      style={ENTERPRISE_ACCENT_STYLE}
      aria-labelledby="enterprise-final-cta-title"
    >
      <div className={marketingSectionContainerClass}>
        <div className={styles.ctaPanel}>
          <p className={cn(marketingEyebrowClass, "mb-4 inline-flex items-center gap-1.5")}>
            <Sparkles
              className="size-3.5 text-[hsl(var(--section-accent-h)_var(--section-accent-s)_var(--section-accent-l))]"
              aria-hidden
              strokeWidth={1.75}
            />
            {ENTERPRISE_FINAL_CTA.eyebrow}
          </p>
          <h2 id="enterprise-final-cta-title" className={headingClass}>
            <TextReveal as="span" className="block" delay={0.05} stagger={0.06} inViewAmount={0.45}>
              {ENTERPRISE_FINAL_CTA.title}
            </TextReveal>
          </h2>
          <TextReveal
            as="p"
            className={cn(descriptionClass, "mt-4")}
            delay={0.16}
            stagger={0.024}
            inViewAmount={0.4}
          >
            {ENTERPRISE_FINAL_CTA.description}
          </TextReveal>
          <EnterpriseCtaButtons ctas={ENTERPRISE_FINAL_CTA.ctas} centered />
        </div>
      </div>
    </section>
  );
}
