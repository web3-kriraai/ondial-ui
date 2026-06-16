"use client";

import { ArrowUpRight, MapPin, Sparkles } from "lucide-react";
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useInView,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { useMemo, useRef, useState } from "react";

import { ONDIAL_ACCENT_STYLE } from "@/components/marketing/split-screen-section";
import {
  marketingEyebrowClass,
  marketingSectionContainerClass,
  marketingSectionShellClass,
} from "@/config/marketing-layout";
import {
  CASE_STUDY_CARDS,
  CASE_STUDY_FILTER_HEADING,
  CASE_STUDY_INDUSTRY_FILTERS,
  type CaseStudyCard,
  type CaseStudyIndustryId,
} from "@/data/case-study-industry-filter-content";
import { cn } from "@/lib/utils";

const easeOut = [0.22, 1, 0.36, 1] as const;
const easeIn = [0.4, 0, 0.2, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: easeOut } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.06 } },
};

const gridRevealVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.12 } },
};

const maxStaggerIndex = 5;
const staggerStep = 0.05;

const cardScrollVariants: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.96, filter: "blur(4px)" },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.52,
      ease: easeOut,
      delay: Math.min(index, maxStaggerIndex) * staggerStep,
    },
  }),
  exit: {
    opacity: 0,
    scale: 0.96,
    y: -14,
    filter: "blur(4px)",
    transition: {
      opacity: { duration: 0.18, ease: easeIn },
      scale: { duration: 0.2, ease: easeIn },
      y: { duration: 0.2, ease: easeIn },
      filter: { duration: 0.15, ease: easeIn },
    },
  },
};

const layoutSpring = {
  type: "spring",
  stiffness: 380,
  damping: 36,
  mass: 0.85,
} as const;

const industryTone: Record<
  CaseStudyCard["industry"],
  { badge: string; metric: string; glow: string }
> = {
  hvac: {
    badge: "border-blue-600/20 bg-blue-600/8 text-blue-700",
    metric: "text-blue-700",
    glow: "group-hover:shadow-[0_24px_48px_-28px_rgb(37_99_235/0.22)]",
  },
  plumbing: {
    badge: "border-cyan-600/20 bg-cyan-600/8 text-cyan-800",
    metric: "text-cyan-800",
    glow: "group-hover:shadow-[0_24px_48px_-28px_rgb(8_145_178/0.22)]",
  },
  healthcare: {
    badge: "border-teal-600/20 bg-teal-600/8 text-teal-700",
    metric: "text-teal-700",
    glow: "group-hover:shadow-[0_24px_48px_-28px_rgb(13_148_136/0.22)]",
  },
  insurance: {
    badge: "border-violet-600/20 bg-violet-600/8 text-violet-700",
    metric: "text-violet-700",
    glow: "group-hover:shadow-[0_24px_48px_-28px_rgb(124_58_237/0.22)]",
  },
  legal: {
    badge: "border-slate-600/20 bg-slate-600/8 text-slate-700",
    metric: "text-slate-800",
    glow: "group-hover:shadow-[0_24px_48px_-28px_rgb(51_65_85/0.2)]",
  },
  "real-estate": {
    badge: "border-[#534AB7]/20 bg-[#EEEDFE] text-[#534AB7]",
    metric: "text-[#534AB7]",
    glow: "group-hover:shadow-[0_24px_48px_-28px_rgb(83_74_183/0.24)]",
  },
};

function FilterPill({
  id,
  label,
  isActive,
  onSelect,
  animatePill,
}: {
  id: CaseStudyIndustryId;
  label: string;
  isActive: boolean;
  onSelect: (id: CaseStudyIndustryId) => void;
  animatePill: boolean;
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(id)}
      className={cn(
        "relative z-1 shrink-0 rounded-full px-4 py-2.5 text-sm font-semibold transition-all duration-300",
        isActive
          ? "text-white"
          : cn(
            "text-foreground/75 hover:text-foreground",
            "hover:text-black hover:bg-[hsl(var(--section-accent-h)_var(--section-accent-s)_var(--section-accent-l))]/20",
          ),
      )}
      aria-pressed={isActive}
      role="tab"
    >
      {isActive && animatePill ? (
        <motion.span
          layoutId="case-study-filter-pill"
          className={cn(
            "absolute inset-0 -z-1 rounded-full",
            "bg-[hsl(var(--section-accent-h)_var(--section-accent-s)_var(--section-accent-l))]",
          )}
          transition={{ type: "spring", stiffness: 420, damping: 32 }}
        />
      ) : isActive ? (
        <span
          className={cn(
            "absolute inset-0 -z-1 rounded-full",
            "bg-[hsl(var(--section-accent-h)_var(--section-accent-s)_var(--section-accent-l))]",
          )}
        />
      ) : null}
      {label}
    </button>
  );
}

function CaseStudyCardItem({
  card,
  index,
  animate,
  sectionVisible,
}: {
  card: CaseStudyCard;
  index: number;
  animate: boolean;
  sectionVisible: boolean;
}) {
  const tone = industryTone[card.industry];

  const cardClassName = cn(
    "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/55 bg-white p-5 sm:p-6",
    "shadow-[0_1px_0_rgb(255_255_255/0.95)_inset,0_16px_40px_-28px_rgb(15_23_42/0.12)]",
    "transition-[box-shadow,border-color] duration-400 ease-out",
    "hover:border-[hsl(var(--section-accent-h)_var(--section-accent-s)_var(--section-accent-l)/0.2)]",
    tone.glow,
  );

  if (!animate) {
    return (
      <article className={cardClassName}>
        <CaseStudyCardBody card={card} tone={tone} />
      </article>
    );
  }

  return (
    <motion.div
      layout
      variants={cardScrollVariants}
      custom={index}
      initial="hidden"
      animate={sectionVisible ? "visible" : "hidden"}
      exit="exit"
      whileHover={{ y: -4, transition: { duration: 0.22, ease: easeOut } }}
      transition={{ layout: layoutSpring }}
      className="h-full will-change-transform"
      style={{ transformOrigin: "center top" }}
    >
      <article className={cardClassName}>
        <CaseStudyCardBody card={card} tone={tone} />
      </article>
    </motion.div>
  );
}

function CaseStudyCardBody({
  card,
  tone,
}: {
  card: CaseStudyCard;
  tone: (typeof industryTone)[CaseStudyCard["industry"]];
}) {
  return (
    <>
      <div
        className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: "hsl(262 83% 58% / 0.1)" }}
        aria-hidden
      />

      <div className="relative flex flex-wrap items-center gap-2">
        <span
          className={cn(
            "inline-flex rounded-full border px-2.5 py-1 text-[0.6875rem] font-semibold uppercase tracking-wide",
            tone.badge,
          )}
        >
          {card.industryLabel}
        </span>
        <span className="inline-flex items-center gap-1 text-[0.6875rem] font-medium text-muted-foreground">
          <MapPin className="h-3 w-3" aria-hidden />
          {card.location}
        </span>
        <span className="ml-auto text-[0.6875rem] font-medium text-muted-foreground">
          {card.readTime}
        </span>
      </div>

      <p className="relative mt-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {card.company}
      </p>

      <h3 className="relative mt-2 flex items-start gap-2 text-lg font-semibold leading-snug tracking-tight text-foreground sm:text-xl">
        <span className="flex-1">{card.headline}</span>
        <ArrowUpRight
          className="mt-1 h-4 w-4 shrink-0 text-[hsl(var(--section-accent-h)_var(--section-accent-s)_var(--section-accent-l))] opacity-40 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
          aria-hidden
        />
      </h3>

      <p className="relative mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
        {card.summary}
      </p>

      <div
        className={cn(
          "relative mt-5 rounded-xl border border-border/50 bg-slate-50/80 px-4 py-3 backdrop-blur-sm",
          "transition-colors duration-300 group-hover:border-border/70 group-hover:bg-white/90",
        )}
      >
        <p className={cn("m-0 text-2xl font-bold leading-none tracking-tight", tone.metric)}>
          {card.metric.value}
        </p>
        <p className="m-0 mt-1 text-xs font-medium text-muted-foreground">{card.metric.label}</p>
      </div>
    </>
  );
}

export function CaseStudyIndustryFilterSection() {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.12 });
  const show = prefersReducedMotion || isInView;
  const [activeFilter, setActiveFilter] = useState<CaseStudyIndustryId>("all");

  const filteredCards = useMemo(
    () =>
      activeFilter === "all"
        ? CASE_STUDY_CARDS
        : CASE_STUDY_CARDS.filter((card) => card.industry === activeFilter),
    [activeFilter],
  );

  const animatePill = !prefersReducedMotion && show;
  const animateCards = !prefersReducedMotion;

  return (
    <section
      ref={sectionRef}
      id="case-study-filter"
      className={marketingSectionShellClass}
      style={ONDIAL_ACCENT_STYLE}
      aria-labelledby="case-study-filter-title"
    >
      <div className={marketingSectionContainerClass}>
        <motion.header
          className="mx-auto mb-8 max-w-2xl text-center sm:mb-10"
          variants={stagger}
          initial="hidden"
          animate={show ? "visible" : "hidden"}
        >
          <motion.p
            variants={fadeUp}
            className={cn(marketingEyebrowClass, "mb-4 inline-flex items-center gap-1.5")}
          >
            <Sparkles
              className="h-3.5 w-3.5 text-[hsl(var(--section-accent-h)_var(--section-accent-s)_var(--section-accent-l))]"
              aria-hidden
            />
            {CASE_STUDY_FILTER_HEADING.eyebrow}
          </motion.p>
          <motion.h2
            variants={fadeUp}
            id="case-study-filter-title"
            className="m-0 text-balance text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
          >
            {CASE_STUDY_FILTER_HEADING.title}
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-3 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground"
          >
            {CASE_STUDY_FILTER_HEADING.description}
          </motion.p>
        </motion.header>

        {/* Filter pills */}
        <motion.div
          className="mb-8 flex justify-center sm:mb-10"
          variants={fadeUp}
          initial="hidden"
          animate={show ? "visible" : "hidden"}
        >
          <div
            className={cn(
              "flex max-w-full gap-1 overflow-x-auto rounded-full border border-border/50 bg-white/90 p-1.5 shadow-[0_8px_32px_-20px_rgb(15_23_42/0.14)] backdrop-blur-md",
              "scrollbar-none [-ms-overflow-style:none] [scrollbar-width:none]",
            )}
            role="tablist"
            aria-label="Filter case studies by industry"
          >
            {CASE_STUDY_INDUSTRY_FILTERS.map((filter) => (
              <FilterPill
                key={filter.id}
                id={filter.id}
                label={filter.label}
                isActive={activeFilter === filter.id}
                onSelect={setActiveFilter}
                animatePill={animatePill}
              />
            ))}
          </div>
        </motion.div>

        {/* Results count */}
        <motion.p
          className="mb-5 text-center text-sm text-muted-foreground"
          aria-live="polite"
          variants={fadeUp}
          initial="hidden"
          animate={show ? "visible" : "hidden"}
        >
          Showing{" "}
          <span className="font-semibold text-foreground">{filteredCards.length}</span>{" "}
          {filteredCards.length === 1 ? "story" : "stories"}
          {activeFilter !== "all" ? (
            <>
              {" "}
              in{" "}
              <span className="font-semibold text-[hsl(var(--section-accent-h)_var(--section-accent-s)_var(--section-accent-l))]">
                {CASE_STUDY_INDUSTRY_FILTERS.find((f) => f.id === activeFilter)?.label}
              </span>
            </>
          ) : null}
        </motion.p>

        {/* Card grid */}
        <LayoutGroup id="case-study-filter-grid">
          <motion.div
            layout
            variants={gridRevealVariants}
            initial="hidden"
            animate={show ? "visible" : "hidden"}
            transition={{ layout: layoutSpring }}
            className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6"
          >
            <AnimatePresence mode="sync">
              {filteredCards.map((card, index) => (
                <CaseStudyCardItem
                  key={card.id}
                  card={card}
                  index={index}
                  animate={animateCards}
                  sectionVisible={show}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>

        <AnimatePresence>
          {filteredCards.length === 0 ? (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-8 text-center text-sm text-muted-foreground"
            >
              No stories in this category yet. Try another filter.
            </motion.p>
          ) : null}
        </AnimatePresence>
      </div>
    </section>
  );
}
