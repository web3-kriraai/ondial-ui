"use client";

import {
  Antenna,
  ArrowUpRight,
  BarChart3,
  Bot,
  Building2,
  Car,
  ChevronDown,
  Database,
  Factory,
  FileCheck,
  Globe2,
  GraduationCap,
  HardHat,
  Headphones,
  Heart,
  Hotel,
  Landmark,
  LayoutGrid,
  LineChart,
  MapPin,
  PhoneCall,
  Plane,
  Plug,
  Rocket,
  Scale,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Sprout,
  Stethoscope,
  Target,
  TrendingDown,
  Truck,
  Zap,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { motion, useInView, useReducedMotion, type Variants } from "framer-motion";
import { useRef, useState, type CSSProperties, type ReactNode } from "react";

import { AboutHeroCta } from "@/components/marketing/about-hero-cta";
import { BlogPageHero } from "@/components/marketing/blog-page-hero";
import { FaqAccordionPanel } from "@/components/marketing/faq-accordion-panel";
import enterpriseStyles from "@/components/marketing/enterprise-page-sections.module.css";
import { IndustryStatsBento } from "@/components/marketing/industry-stats-bento";
import { ServicesCapabilitiesCarousel } from "@/components/marketing/services-capabilities-carousel";
import { ServicesCountriesMap } from "@/components/marketing/services-countries-map";
import { ServicesIndustriesCarousel } from "@/components/marketing/services-industries-carousel";
import { ONDIAL_ACCENT_STYLE } from "@/components/marketing/split-screen-section";
import { TextReveal } from "@/components/ui/text-reveal";
import { marketingDottedSectionShellClass, marketingEyebrowClass, marketingSectionContainerClass } from "@/config/marketing-layout";
import { SERVICES_CAPABILITIES, SERVICES_CAPABILITIES_SECTION } from "@/data/services-capabilities-content";
import {
  SERVICES_FAQ,
  SERVICES_FINAL_CTA,
  SERVICES_HERO,
  SERVICES_HOW_IT_WORKS,
  SERVICES_INDUSTRIES,
  SERVICES_WHY_CHOOSE,
  type ServicesCta,
} from "@/data/services-content";
import {
  SERVICES_COUNTRIES,
  SERVICES_COUNTRIES_SECTION,
} from "@/data/services-countries-content";
import { cn } from "@/lib/utils";

import styles from "./services-page-sections.module.css";

const SERVICES_ACCENT_STYLE = {
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

const ICON_MAP: Record<string, LucideIcon> = {
  stethoscope: Stethoscope,
  landmark: Landmark,
  building: Building2,
  cart: ShoppingCart,
  file: FileCheck,
  target: Target,
  headphones: Headphones,
  antenna: Antenna,
  car: Car,
  graduation: GraduationCap,
  plane: Plane,
  hotel: Hotel,
  scale: Scale,
  zap: Zap,
  heart: Heart,
  truck: Truck,
  factory: Factory,
  "hard-hat": HardHat,
  sprout: Sprout,
  hospital: Building2,
  "trending-down": TrendingDown,
  shield: ShieldCheck,
  plug: Plug,
  chart: BarChart3,
  globe: Globe2,
  database: Database,
  layout: LayoutGrid,
  rocket: Rocket,
  bot: Bot,
  "chart-line": LineChart,
};

const COUNTRY_STAT_ICONS: Record<string, LucideIcon> = {
  countries: Globe2,
  states: MapPin,
  cities: Building2,
};

function resolveIcon(key: string): LucideIcon {
  return ICON_MAP[key] ?? PhoneCall;
}

function SectionDivider() {
  return <hr className={styles.sectionDivider} aria-hidden />;
}

function SectionHeader({
  eyebrow,
  title,
  description,
  titleId,
  align = "center",
}: {
  eyebrow: string;
  title: string;
  description?: string;
  titleId?: string;
  align?: "center" | "start";
}) {
  return (
    <header
      className={cn(
        "max-w-3xl",
        align === "center" ? "mx-auto text-center" : "text-left",
      )}
    >
      <p className={cn("mb-4", marketingEyebrowClass)}>{eyebrow}</p>
      <h2 id={titleId} className={headingClass}>
        <TextReveal as="span" className="block" delay={0.05} stagger={0.07} inViewAmount={0.5}>
          {title}
        </TextReveal>
      </h2>
      {description ? (
        <TextReveal
          as="p"
          className={cn(
            descriptionClass,
            align === "start" ? "mx-0" : "max-w-2xl",
          )}
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

function ServicesCtaButtons({
  ctas,
  centered = false,
  className,
}: {
  ctas: readonly ServicesCta[];
  centered?: boolean;
  className?: string;
}) {
  const [primary, secondary] = ctas;

  return (
    <div
      className={cn(
        "mt-6 flex w-full flex-wrap items-center gap-3",
        centered && "justify-center",
        className,
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

export function ServicesHeroSection() {
  return (
    <section
      id="services-hero"
      className="w-full bg-transparent pb-12 sm:pb-16 lg:pb-20"
      style={SERVICES_ACCENT_STYLE}
      aria-labelledby="services-hero-title"
    >
      <div className={cn(pageHeaderShellClass, "pt-6 sm:pt-8")}>
        <BlogPageHero
          eyebrow={SERVICES_HERO.tag}
          title={
            <h1
              id="services-hero-title"
              className="mx-auto max-w-4xl text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-[2.625rem] lg:leading-tight"
            >
              <TextReveal as="span" className="block" delay={0.08} stagger={0.04} inViewAmount={0.2}>
                {SERVICES_HERO.titleLead}
              </TextReveal>
              <TextReveal
                as="span"
                className={cn("block", styles.titleAccent)}
                delay={0.14}
                stagger={0.04}
                inViewAmount={0.2}
              >
                {SERVICES_HERO.titleAccent}
              </TextReveal>
            </h1>
          }
          description={SERVICES_HERO.description}
        />

        <ServicesCtaButtons ctas={SERVICES_HERO.ctas} centered />

        <IndustryStatsBento
          stats={SERVICES_HERO.stats.map(({ value, label }) => ({ value, label }))}
          className="mt-10 sm:mt-12"
        />
      </div>
    </section>
  );
}

function WhyChooseCard({
  title,
  description,
  iconKey,
  iconBg,
  iconColor,
  wide = false,
}: {
  title: string;
  description: string;
  iconKey: string;
  iconBg: string;
  iconColor: string;
  wide?: boolean;
}) {
  const Icon = resolveIcon(iconKey);

  return (
    <motion.article
      className={cn(styles.whyCard, wide ? styles.whyCardWide : styles.whyCardNarrow)}
      variants={cardVariants}
    >
      <div className={styles.whyCardIcon} style={{ background: iconBg }} aria-hidden>
        <Icon className="size-5" style={{ color: iconColor }} strokeWidth={1.85} />
      </div>

      <h3 className={styles.whyCardTitle}>{title}</h3>
      <p className={styles.whyCardText}>{description}</p>

      <span className={styles.whyArrowBtn} aria-hidden>
        <ArrowUpRight className="size-3.5" strokeWidth={2.25} />
      </span>
    </motion.article>
  );
}

export function ServicesWhyChooseSection() {
  const [first, second, ...rest] = SERVICES_WHY_CHOOSE.cards;

  return (
    <>
      <SectionDivider />
      <section
        className={cn(sectionShellClass, styles.section)}
        style={SERVICES_ACCENT_STYLE}
        aria-labelledby="services-why-title"
      >
        <div className={pageHeaderShellClass}>
          <SectionHeader
            eyebrow={SERVICES_WHY_CHOOSE.eyebrow}
            title={SERVICES_WHY_CHOOSE.title}
            description={SERVICES_WHY_CHOOSE.description}
            titleId="services-why-title"
          />
        </div>

        <div className={cn(marketingSectionContainerClass, "mt-8 sm:mt-10")}>
          <AnimatedGrid className={styles.whyGrid}>
            {first ? (
              <WhyChooseCard
                title={first.title}
                description={first.description}
                iconKey={first.iconKey}
                iconBg={first.iconBg}
                iconColor={first.iconColor}
                wide
              />
            ) : null}
            {second ? (
              <WhyChooseCard
                title={second.title}
                description={second.description}
                iconKey={second.iconKey}
                iconBg={second.iconBg}
                iconColor={second.iconColor}
                wide
              />
            ) : null}
            {rest.map((card) => (
              <WhyChooseCard
                key={card.id}
                title={card.title}
                description={card.description}
                iconKey={card.iconKey}
                iconBg={card.iconBg}
                iconColor={card.iconColor}
              />
            ))}
          </AnimatedGrid>
        </div>
      </section>
    </>
  );
}

export function ServicesCapabilitiesSection() {
  return (
    <>
      <SectionDivider />
      <section
        id="services-capabilities"
        className={cn(sectionShellClass, styles.section)}
        style={SERVICES_ACCENT_STYLE}
        aria-labelledby="services-capabilities-title"
      >
        <div className={pageHeaderShellClass}>
          <SectionHeader
            eyebrow={SERVICES_CAPABILITIES_SECTION.eyebrow}
            title={SERVICES_CAPABILITIES_SECTION.title}
            description={SERVICES_CAPABILITIES_SECTION.description}
            titleId="services-capabilities-title"
          />
        </div>

        <div className={cn(marketingSectionContainerClass, "mt-8 sm:mt-10")}>
          <ServicesCapabilitiesCarousel capabilities={SERVICES_CAPABILITIES} />
        </div>
      </section>
    </>
  );
}

export function ServicesIndustriesSection() {
  return (
    <>
      <SectionDivider />
      <section
        id="services-industries"
        className={cn(sectionShellClass, styles.section)}
        style={SERVICES_ACCENT_STYLE}
        aria-labelledby="services-industries-title"
      >
        <div className={pageHeaderShellClass}>
          <div className={styles.industriesIntro}>
            <SectionHeader
              eyebrow="Industries we serve"
              title="Industries We Serve"
              description="Every industry has unique communication needs. Browse sectors below to see how OnDial delivers purpose-built AI call automation at scale."
              titleId="services-industries-title"
            />
            <div className={styles.industryBadgeWrap}>
              <span className={styles.industryCountBadge}>
                <Sparkles className="size-3.5 shrink-0" strokeWidth={1.75} aria-hidden />
                {SERVICES_INDUSTRIES.length} industries with ready-to-deploy templates
              </span>
            </div>
          </div>
        </div>

        <div className={cn(marketingSectionContainerClass, "mt-8 sm:mt-10")}>
          <div className={styles.industriesCarouselWrap}>
            <ServicesIndustriesCarousel industries={SERVICES_INDUSTRIES} />
          </div>
        </div>
      </section>
    </>
  );
}

export function ServicesHowItWorksSection() {
  return (
    <>
      <SectionDivider />
      <section
        className={cn(sectionShellClass, styles.section)}
        style={SERVICES_ACCENT_STYLE}
        aria-labelledby="services-hiw-title"
      >
        <div className={marketingSectionContainerClass}>
          <SectionHeader
            eyebrow={SERVICES_HOW_IT_WORKS.eyebrow}
            title={SERVICES_HOW_IT_WORKS.title}
            description={SERVICES_HOW_IT_WORKS.description}
            titleId="services-hiw-title"
          />
          <AnimatedGrid className={styles.timeline}>
            {SERVICES_HOW_IT_WORKS.steps.map((step, index) => {
              const Icon = resolveIcon(step.iconKey);
              return (
                <motion.article key={step.id} className={styles.timelineStep} variants={cardVariants}>
                  <span className={styles.timelineNum}>{index + 1}</span>
                  <Icon className={cn(styles.timelineIcon, "size-5")} strokeWidth={1.75} aria-hidden />
                  <h3 className={styles.timelineTitle}>{step.title}</h3>
                  <p className={styles.timelineText}>{step.description}</p>
                </motion.article>
              );
            })}
          </AnimatedGrid>
        </div>
      </section>
    </>
  );
}

export function ServicesCountriesSection() {
  return (
    <>
      <SectionDivider />
      <section
        id="services-countries"
        className={cn(sectionShellClass, styles.section)}
        style={SERVICES_ACCENT_STYLE}
        aria-labelledby="services-countries-title"
      >
        <div className={pageHeaderShellClass}>
          <div className={styles.industriesIntro}>
            <SectionHeader
              eyebrow={SERVICES_COUNTRIES_SECTION.eyebrow}
              title={SERVICES_COUNTRIES_SECTION.title}
              description={SERVICES_COUNTRIES_SECTION.description}
              titleId="services-countries-title"
            />
            <div className={styles.industryBadgeWrap}>
              <span className={styles.industryCountBadge}>
                <Globe2 className="size-3.5 shrink-0" strokeWidth={1.75} aria-hidden />
                {SERVICES_COUNTRIES.length} unique countries served worldwide
              </span>
            </div>
          </div>
        </div>

        <div className={cn(marketingSectionContainerClass, styles.countriesSectionBody)}>
          <AnimatedGrid className={styles.countriesStatsRow}>
            {SERVICES_COUNTRIES_SECTION.stats.map((stat) => {
              const Icon = COUNTRY_STAT_ICONS[stat.id] ?? Globe2;
              return (
                <motion.div key={stat.id} className={styles.countriesStatItem} variants={cardVariants}>
                  <span className={styles.countriesStatIcon} aria-hidden>
                    <Icon className="size-4" strokeWidth={1.85} />
                  </span>
                  <div>
                    <p className={styles.countriesStatValue}>{stat.value}</p>
                    <p className={styles.countriesStatLabel}>{stat.label}</p>
                  </div>
                </motion.div>
              );
            })}
          </AnimatedGrid>

          <div className={styles.countriesMapWrap}>
            <ServicesCountriesMap countries={SERVICES_COUNTRIES} />
          </div>
        </div>
      </section>
    </>
  );
}

export function ServicesFaqSection() {
  const prefersReducedMotion = useReducedMotion();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <>
      <SectionDivider />
      <section
        id="services-faq"
        className={cn(sectionShellClass, styles.section)}
        style={SERVICES_ACCENT_STYLE}
        aria-labelledby="services-faq-title"
      >
        <div className={marketingSectionContainerClass}>
          <div className={styles.faqSplit}>
            <div className={styles.faqIntro}>
              <p className={marketingEyebrowClass}>{SERVICES_FAQ.eyebrow}</p>
              <h2 id="services-faq-title" className={styles.faqIntroTitle}>
                {SERVICES_FAQ.title}
              </h2>
              <p className={styles.faqIntroText}>{SERVICES_FAQ.description}</p>
              <Link href="/contact" prefetch className={styles.faqHelpLink}>
                Talk to our team
                <ArrowUpRight className="size-3.5" aria-hidden />
              </Link>
            </div>

            <div className={enterpriseStyles.faqList}>
              {SERVICES_FAQ.items.map((item, index) => {
                const isOpen = openIndex === index;
                const panelId = `services-faq-panel-${item.id}`;
                const triggerId = `services-faq-trigger-${item.id}`;

                return (
                  <div
                    key={item.id}
                    className={cn(enterpriseStyles.faqItem, isOpen && enterpriseStyles.faqItemOpen)}
                  >
                    <button
                      type="button"
                      id={triggerId}
                      className={enterpriseStyles.faqTrigger}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                    >
                      <span
                        className={cn(
                          enterpriseStyles.faqQuestion,
                          isOpen && enterpriseStyles.faqQuestionOpen,
                        )}
                      >
                        {item.question}
                      </span>
                      <motion.span
                        className={cn(
                          enterpriseStyles.faqToggle,
                          isOpen && enterpriseStyles.faqToggleOpen,
                        )}
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
                    <FaqAccordionPanel isOpen={isOpen} panelId={panelId} triggerId={triggerId}>
                      <p className={enterpriseStyles.faqAnswer}>{item.answer}</p>
                    </FaqAccordionPanel>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export function ServicesFinalCtaSection() {
  return (
    <>
      <SectionDivider />
      <section
        className={cn(marketingDottedSectionShellClass, styles.ctaSection)}
        style={SERVICES_ACCENT_STYLE}
        aria-labelledby="services-final-cta-title"
      >
        <div className={marketingSectionContainerClass}>
          <motion.div
            className={styles.ctaShell}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className={styles.ctaEyebrow}>
              <Sparkles
                className="size-3.5 shrink-0 text-[hsl(var(--section-accent-h)_var(--section-accent-s)_var(--section-accent-l))]"
                aria-hidden
                strokeWidth={1.75}
              />
              {SERVICES_FINAL_CTA.eyebrow}
            </p>

            <h2 id="services-final-cta-title" className={styles.ctaTitle}>
              <TextReveal
                as="span"
                className={styles.ctaTitleLine}
                delay={0.05}
                stagger={0.06}
                inViewAmount={0.45}
              >
                {SERVICES_FINAL_CTA.titleLine1}
              </TextReveal>
              <TextReveal
                as="span"
                className={styles.ctaTitleLine}
                delay={0.1}
                stagger={0.06}
                inViewAmount={0.45}
              >
                {SERVICES_FINAL_CTA.titleLine2}
              </TextReveal>
            </h2>

            <TextReveal
              as="p"
              className={styles.ctaDescription}
              delay={0.14}
              stagger={0.024}
              inViewAmount={0.4}
            >
              {SERVICES_FINAL_CTA.description}
            </TextReveal>

            <ServicesCtaButtons
              ctas={SERVICES_FINAL_CTA.ctas}
              centered
              className={styles.ctaButtonRow}
            />

            <ul className={styles.ctaTrustLine} aria-label="Key benefits">
              {SERVICES_FINAL_CTA.trustItems.map((item) => (
                <li key={item} className={styles.ctaTrustItem}>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>
    </>
  );
}
