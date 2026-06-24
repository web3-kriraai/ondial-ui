"use client";

import {
  Antenna,
  ArrowUpRight,
  BarChart3,
  Bot,
  Building2,
  Car,
  Check,
  ChevronDown,
  Clock,
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
  Maximize2,
  PhoneCall,
  Plane,
  Plug,
  Rocket,
  Scale,
  ShieldCheck,
  ShoppingCart,
  SlidersHorizontal,
  Sparkles,
  Sprout,
  Stethoscope,
  Target,
  TrendingDown,
  Truck,
  UserCheck,
  Zap,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { motion, useInView, useReducedMotion, type Variants } from "framer-motion";
import { useMemo, useRef, useState, type CSSProperties, type ReactNode } from "react";

import { AboutHeroCta } from "@/components/marketing/about-hero-cta";
import { FaqAccordionPanel } from "@/components/marketing/faq-accordion-panel";
import enterpriseStyles from "@/components/marketing/enterprise-page-sections.module.css";
import { AuthCollagePanel } from "@/components/auth/auth-collage-panel";
import { ONDIAL_ACCENT_STYLE } from "@/components/marketing/split-screen-section";
import { TextReveal } from "@/components/ui/text-reveal";
import { marketingEyebrowClass, marketingSectionContainerClass } from "@/config/marketing-layout";
import {
  SERVICES_FAQ,
  SERVICES_FINAL_CTA,
  SERVICES_HERO,
  SERVICES_HOW_IT_WORKS,
  SERVICES_INDUSTRIES,
  SERVICES_INDUSTRY_FILTERS,
  SERVICES_WHY_CHOOSE,
  type ServicesCta,
  type ServicesIndustry,
  type ServicesIndustryCategory,
} from "@/data/services-content";
import { cn } from "@/lib/utils";

import styles from "./services-page-sections.module.css";

const SERVICES_ACCENT_STYLE = {
  ...ONDIAL_ACCENT_STYLE,
  "--showcase-accent-h": "262",
  "--showcase-accent-s": "83%",
  "--showcase-accent-l": "58%",
} as CSSProperties;

const sectionShellClass = "w-full bg-transparent py-16 sm:py-20 lg:py-24";

function SectionDivider() {
  return <hr className={styles.sectionDivider} aria-hidden />;
}
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
  clock: Clock,
  "user-check": UserCheck,
  sliders: SlidersHorizontal,
  maximize: Maximize2,
};

function resolveIcon(key: string): LucideIcon {
  return ICON_MAP[key] ?? PhoneCall;
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

function ServicesCtaButtons({
  ctas,
  centered = false,
}: {
  ctas: readonly ServicesCta[];
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

export function ServicesHeroSection() {
  return (
    <section
      id="services-hero"
      className={cn(
        "w-full bg-transparent pb-14 sm:pb-16 lg:pb-20",
        "lg:min-h-[clamp(36rem,calc(100svh-13rem),48rem)]",
      )}
      style={SERVICES_ACCENT_STYLE}
      aria-labelledby="services-hero-title"
    >
      <div
        className={cn(
          marketingSectionContainerClass,
          "pt-8 sm:pt-10 lg:flex lg:min-h-[inherit] lg:flex-col lg:justify-center",
        )}
      >
        <div className="grid items-center gap-10 sm:gap-12 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)] lg:items-center lg:gap-14 xl:gap-16">
          <div className={styles.heroContent}>
            <span className={styles.heroTag}>
              <PhoneCall className="size-3.5" strokeWidth={2} aria-hidden />
              {SERVICES_HERO.tag}
            </span>
            <h1 id="services-hero-title" className={styles.heroTitle}>
              <TextReveal as="span" className="block" delay={0.05} stagger={0.04}>
                {SERVICES_HERO.title}
              </TextReveal>
            </h1>
            <TextReveal
              as="p"
              className={styles.heroDescription}
              delay={0.18}
              stagger={0.024}
              inViewAmount={0.3}
            >
              {SERVICES_HERO.description}
            </TextReveal>
            <ServicesCtaButtons ctas={SERVICES_HERO.ctas} />
            <div className={styles.heroStats}>
              {SERVICES_HERO.stats.map((stat) => (
                <div key={stat.id} className={styles.heroStat}>
                  <p className={styles.heroStatValue}>{stat.value}</p>
                  <p className={styles.heroStatLabel}>{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.heroVisualColumn}>
            <div className={styles.heroVisualFrame}>
              <AuthCollagePanel fit="width" className="h-full w-full min-h-[inherit]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ServicesWhyChooseSection() {
  return (
    <>
      <SectionDivider />
      <section
        className={cn(sectionShellClass, styles.section)}
        style={SERVICES_ACCENT_STYLE}
        aria-labelledby="services-why-title"
      >
        <div className={marketingSectionContainerClass}>
          <SectionHeader
            eyebrow={SERVICES_WHY_CHOOSE.eyebrow}
            title={SERVICES_WHY_CHOOSE.title}
            description={SERVICES_WHY_CHOOSE.description}
            titleId="services-why-title"
          />
          <AnimatedGrid className={cn(styles.whyGrid, "mt-10 sm:mt-14")}>
            {SERVICES_WHY_CHOOSE.cards.map((card) => {
              const Icon = resolveIcon(card.iconKey);
              return (
                <motion.article key={card.id} className={styles.featureCard} variants={cardVariants}>
                  <span
                    className={styles.featureIcon}
                    style={{ background: card.iconBg, color: card.iconColor }}
                    aria-hidden
                  >
                    <Icon className="size-5" strokeWidth={1.85} />
                  </span>
                  <h3 className={styles.featureTitle}>{card.title}</h3>
                  <p className={styles.featureText}>{card.description}</p>
                </motion.article>
              );
            })}
          </AnimatedGrid>
        </div>
      </section>
    </>
  );
}

function IndustryDetailPanel({
  industry,
  index,
}: {
  industry: ServicesIndustry;
  index: number;
}) {
  const Icon = resolveIcon(industry.iconKey);

  return (
    <motion.div
      key={industry.id}
      className={styles.industryDetail}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className={styles.industryDetailHeader}>
        <span className={styles.industryIndex} aria-hidden>
          {String(index + 1).padStart(2, "0")}
        </span>
        <span
          className={styles.industryDetailIcon}
          style={{ background: industry.iconBg, color: industry.iconColor }}
          aria-hidden
        >
          <Icon className="size-6" strokeWidth={1.75} />
        </span>
        <div className="min-w-0 flex-1">
          <p className={styles.industryDetailTitle}>{industry.name}</p>
        </div>
        {industry.href ? (
          <Link href={industry.href} prefetch className={styles.learnMoreBtn}>
            Learn more
            <ArrowUpRight className="size-3.5 text-[#534AB7]" aria-hidden />
          </Link>
        ) : null}
      </div>
      <div className={styles.industryDetailBody}>
        <p className={styles.industryDescription}>{industry.description}</p>
        <div className={styles.outcomeBox}>
          <h4 className={styles.detailColumnTitle}>Key capabilities</h4>
          {industry.highlights.map((highlight) => (
            <div key={highlight} className={styles.outcomeItem}>
              <Check className="mt-0.5 size-3.5 shrink-0 text-[#1D9E75]" strokeWidth={2.5} aria-hidden />
              <span>{highlight}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function ServicesIndustriesSection() {
  const [activeFilter, setActiveFilter] = useState<ServicesIndustryCategory>("all");
  const [activeIndustryId, setActiveIndustryId] = useState(SERVICES_INDUSTRIES[0]!.id);

  const filteredIndustries = useMemo(() => {
    if (activeFilter === "all") return SERVICES_INDUSTRIES;
    return SERVICES_INDUSTRIES.filter((industry) => industry.category === activeFilter);
  }, [activeFilter]);

  const activeIndustry = useMemo(() => {
    const match = filteredIndustries.find((industry) => industry.id === activeIndustryId);
    return match ?? filteredIndustries[0] ?? SERVICES_INDUSTRIES[0]!;
  }, [activeIndustryId, filteredIndustries]);

  const handleFilter = (filter: ServicesIndustryCategory) => {
    setActiveFilter(filter);
    const nextList =
      filter === "all"
        ? SERVICES_INDUSTRIES
        : SERVICES_INDUSTRIES.filter((industry) => industry.category === filter);
    if (!nextList.find((industry) => industry.id === activeIndustryId) && nextList[0]) {
      setActiveIndustryId(nextList[0].id);
    }
  };

  return (
    <>
      <SectionDivider />
      <section
        id="services-industries"
        className={cn(sectionShellClass, styles.section)}
        style={SERVICES_ACCENT_STYLE}
        aria-labelledby="services-industries-title"
      >
        <div className={marketingSectionContainerClass}>
          <SectionHeader
            eyebrow="Industries we serve"
            title="Industries We Serve"
            description="Every industry has unique communication needs. Select a sector below to explore how OnDial delivers purpose-built AI call automation."
            titleId="services-industries-title"
          />

          <div className={cn(styles.filterTabsWrap, "mt-10 sm:mt-14")}>
            <div className={styles.filterTabs}>
              {SERVICES_INDUSTRY_FILTERS.map((filter) => (
                <button
                  key={filter.id}
                  type="button"
                  className={cn(
                    styles.filterTab,
                    activeFilter === filter.id && styles.filterTabActive,
                  )}
                  onClick={() => handleFilter(filter.id)}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

        <div className={styles.industryGrid}>
          {filteredIndustries.map((industry) => {
            const Icon = resolveIcon(industry.iconKey);
            const isActive = industry.id === activeIndustry.id;
            const globalIndex = SERVICES_INDUSTRIES.findIndex((item) => item.id === industry.id);

            return (
              <button
                key={industry.id}
                type="button"
                className={cn(styles.industryCard, isActive && styles.industryCardActive)}
                onClick={() => setActiveIndustryId(industry.id)}
                aria-pressed={isActive}
              >
                <div className={styles.industryCardTop}>
                  <span className={styles.industryIndex} aria-hidden>
                    {String(globalIndex + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={styles.industryIcon}
                    style={{ background: industry.iconBg, color: industry.iconColor }}
                    aria-hidden
                  >
                    <Icon className="size-4" strokeWidth={1.85} />
                  </span>
                </div>
                <p className={styles.industryName}>{industry.name}</p>
                <p className={styles.industrySummary}>{industry.summary}</p>
              </button>
            );
          })}
        </div>

        <IndustryDetailPanel
          industry={activeIndustry}
          index={SERVICES_INDUSTRIES.findIndex((item) => item.id === activeIndustry.id)}
        />
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
        <AnimatedGrid className={styles.hiwGrid}>
          {SERVICES_HOW_IT_WORKS.steps.map((step, index) => {
            const Icon = resolveIcon(step.iconKey);
            return (
              <motion.article key={step.id} className={styles.hiwCard} variants={cardVariants}>
                <span className={styles.hiwNum}>{index + 1}</span>
                <Icon className={cn(styles.hiwIcon, "size-5")} strokeWidth={1.75} aria-hidden />
                <h3 className={styles.hiwTitle}>{step.title}</h3>
                <p className={styles.hiwText}>{step.description}</p>
              </motion.article>
            );
          })}
        </AnimatedGrid>
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
        <SectionHeader
          eyebrow={SERVICES_FAQ.eyebrow}
          title={SERVICES_FAQ.title}
          description={SERVICES_FAQ.description}
          titleId="services-faq-title"
        />
        <div className={cn(enterpriseStyles.faqList, "mt-10 sm:mt-14")}>
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
                <FaqAccordionPanel
                  isOpen={isOpen}
                  panelId={panelId}
                  triggerId={triggerId}
                >
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

export function ServicesFinalCtaSection() {
  return (
    <>
      <SectionDivider />
      <section
        className={cn(sectionShellClass, "pb-16 sm:pb-24", styles.section)}
        style={SERVICES_ACCENT_STYLE}
        aria-labelledby="services-final-cta-title"
      >
        <div className={marketingSectionContainerClass}>
          <div className={enterpriseStyles.ctaPanel}>
            <p className={cn(marketingEyebrowClass, "mb-4 inline-flex items-center gap-1.5")}>
              <Sparkles
                className="size-3.5 text-[hsl(var(--section-accent-h)_var(--section-accent-s)_var(--section-accent-l))]"
                aria-hidden
                strokeWidth={1.75}
              />
              {SERVICES_FINAL_CTA.eyebrow}
            </p>
          <h2 id="services-final-cta-title" className={headingClass}>
            <TextReveal as="span" className="block" delay={0.05} stagger={0.06} inViewAmount={0.45}>
              {SERVICES_FINAL_CTA.title}
            </TextReveal>
          </h2>
          <TextReveal
            as="p"
            className={cn(descriptionClass, "mt-4")}
            delay={0.16}
            stagger={0.024}
            inViewAmount={0.4}
          >
            {SERVICES_FINAL_CTA.description}
          </TextReveal>
          <ServicesCtaButtons ctas={SERVICES_FINAL_CTA.ctas} centered />
          <div className={styles.trustRow}>
            {SERVICES_FINAL_CTA.trustItems.map((item) => (
              <span key={item} className={styles.trustItem}>
                <Check className="size-3.5 text-[#1D9E75]" strokeWidth={2.5} aria-hidden />
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
    </>
  );
}
