"use client";

import Image from "next/image";
import { Play } from "lucide-react";
import { AnimatePresence, motion, useInView, useReducedMotion, type Variants } from "framer-motion";
import { useCallback, useMemo, useRef, useState } from "react";

import { LanguagesVoiceWaveform } from "@/components/marketing/languages-voice-waveform";
import { ONDIAL_ACCENT_STYLE } from "@/components/marketing/split-screen-section";
import { TextReveal } from "@/components/ui/text-reveal";
import {
  marketingEyebrowClass,
  marketingSectionContainerClass,
  marketingSectionShellClass,
} from "@/config/marketing-layout";
import {
  FEATURED_LANGUAGES,
  LANGUAGES_GRID_VISIBLE,
  LANGUAGES_SECTION_HEADING,
  LANGUAGES_SECTION_STATS,
  LANGUAGES_TOTAL_COUNT,
  type FeaturedLanguage,
} from "@/data/languages-section-content";
import { flagImageUrl } from "@/lib/languages-data";
import { cn } from "@/lib/utils";

import styles from "./supported-languages-section.module.css";

const headingClass =
  "text-balance text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem]";

const subtitleClass =
  "mx-auto mt-3 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg";

const easeOut = [0.22, 1, 0.36, 1] as const;

const statsVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.06 },
  },
};

const statVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.38, ease: easeOut },
  },
};

const panelVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: easeOut },
  },
};

const langGridVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.025, delayChildren: 0.08 },
  },
};

const langCellVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: easeOut },
  },
};

const accentGridVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.04, delayChildren: 0.03 },
  },
};

const accentTagVariants: Variants = {
  hidden: { opacity: 0, y: 6 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.24, ease: easeOut },
  },
  exit: { opacity: 0, y: -4, transition: { duration: 0.14 } },
};

function LanguageFlag({
  countryCode,
  alt,
  className,
  size = 24,
}: {
  countryCode: string;
  alt: string;
  className?: string;
  size?: number;
}) {
  return (
    <Image
      src={flagImageUrl(countryCode)}
      alt={alt}
      width={size}
      height={size}
      sizes={`${size}px`}
      className={className}
      loading="lazy"
    />
  );
}

export function SupportedLanguagesSection() {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const sectionInView = useInView(sectionRef, { once: true, amount: 0.08 });
  const mainInView = useInView(mainRef, { once: true, amount: 0.12 });
  const showPanels = prefersReducedMotion || mainInView;

  const langCellRefs = useRef(new Map<string, HTMLButtonElement>());

  const [selectedId, setSelectedId] = useState(FEATURED_LANGUAGES[0]!.id);
  const [selectedAccentId, setSelectedAccentId] = useState(FEATURED_LANGUAGES[0]!.accents[0]!.id);
  const [playing, setPlaying] = useState(false);

  const selectedLanguage = useMemo(
    () => FEATURED_LANGUAGES.find((lang) => lang.id === selectedId) ?? FEATURED_LANGUAGES[0]!,
    [selectedId],
  );

  const selectedAccent = useMemo(
    () =>
      selectedLanguage.accents.find((accent) => accent.id === selectedAccentId) ??
      selectedLanguage.accents[0]!,
    [selectedLanguage, selectedAccentId],
  );

  const moreCount = Math.max(0, 100 - LANGUAGES_GRID_VISIBLE);
  const previewKey = `${selectedLanguage.id}-${selectedAccent.id}`;

  const setLangCellRef = useCallback((id: string, node: HTMLButtonElement | null) => {
    if (node) {
      langCellRefs.current.set(id, node);
      return;
    }
    langCellRefs.current.delete(id);
  }, []);

  function handleSelectLanguage(language: FeaturedLanguage) {
    setSelectedId(language.id);
    setSelectedAccentId(language.accents[0]!.id);
    setPlaying(false);
    langCellRefs.current.get(language.id)?.scrollIntoView({
      block: "nearest",
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  }

  function handlePlayPreview() {
    setPlaying((current) => !current);
  }

  return (
    <section
      ref={sectionRef}
      id="languages"
      className={cn(marketingSectionShellClass, styles.section)}
      style={ONDIAL_ACCENT_STYLE}
      aria-labelledby="languages-title"
    >
      <div className={marketingSectionContainerClass}>
        <div className={styles.inner}>
          <header className="mx-auto max-w-3xl text-center">
            <motion.p
              className={cn("mb-3", marketingEyebrowClass)}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
              animate={sectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.4, ease: easeOut }}
            >
              {LANGUAGES_SECTION_HEADING.eyebrow}
            </motion.p>
            <h2 id="languages-title" className={headingClass}>
              <TextReveal as="span" className="block" delay={0.05} stagger={0.07} inViewAmount={0.5}>
                {LANGUAGES_SECTION_HEADING.titleLead}
              </TextReveal>
              <TextReveal
                as="span"
                className="block"
                delay={0.14}
                stagger={0.07}
                inViewAmount={0.5}
                segments={[
                  { text: LANGUAGES_SECTION_HEADING.titleTail },
                  {
                    text: LANGUAGES_SECTION_HEADING.titleAccent,
                    className: styles.titleAccent,
                  },
                ]}
              />
            </h2>
            <TextReveal
              as="p"
              className={subtitleClass}
              delay={0.22}
              stagger={0.028}
              inViewAmount={0.4}
            >
              {LANGUAGES_SECTION_HEADING.subtitle}
            </TextReveal>
          </header>

          <motion.ul
            className={styles.stats}
            variants={statsVariants}
            initial="hidden"
            animate={sectionInView ? "visible" : "hidden"}
          >
            {LANGUAGES_SECTION_STATS.map((stat) => (
              <motion.li key={stat.label} className={styles.stat} variants={statVariants}>
                <p className={styles.statValue}>{stat.value}</p>
                <p className={styles.statLabel}>{stat.label}</p>
              </motion.li>
            ))}
          </motion.ul>

          <div ref={mainRef} className={styles.main}>
            <motion.div
              className={styles.langCard}
              variants={panelVariants}
              initial="hidden"
              animate={showPanels ? "visible" : "hidden"}
            >
              <div className={styles.langGridScroll}>
                <motion.div
                  className={styles.langGrid}
                  role="list"
                  aria-label="Featured languages"
                  variants={langGridVariants}
                  initial="hidden"
                  animate={showPanels ? "visible" : "hidden"}
                >
                  {FEATURED_LANGUAGES.map((language) => {
                    const isActive = language.id === selectedId;
                    return (
                      <motion.button
                        key={language.id}
                        ref={(node) => setLangCellRef(language.id, node)}
                        type="button"
                        role="listitem"
                        variants={langCellVariants}
                        className={cn(styles.langCell, isActive && styles.langCellActive)}
                        aria-pressed={isActive}
                        whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
                        onClick={() => handleSelectLanguage(language)}
                      >
                        <LanguageFlag
                          countryCode={language.countryCode}
                          alt={`${language.name} flag`}
                          className={styles.langFlag}
                        />
                        <span className={styles.langName}>{language.name}</span>
                        <span className={styles.langNative}>{language.nativeName}</span>
                      </motion.button>
                    );
                  })}
                </motion.div>
              </div>

              <div className={styles.langCardFoot}>
                <span className={styles.langScrollHint}>Scroll the grid for more languages</span>
                <span className={styles.langCardFootText}>
                  Showing {LANGUAGES_GRID_VISIBLE} of {LANGUAGES_TOTAL_COUNT} languages
                </span>
                <span className={styles.morePill}>+ {moreCount} more</span>
              </div>
            </motion.div>

            <div className={styles.previewStack}>
              <motion.div
                className={styles.voiceCard}
                variants={panelVariants}
                initial="hidden"
                animate={showPanels ? "visible" : "hidden"}
                transition={{ delay: 0.06 }}
              >
                <div className={styles.voiceTop}>
                  <p className={styles.voiceLabel}>Voice preview</p>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={previewKey}
                      className={styles.activeLang}
                      initial={prefersReducedMotion ? false : { opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={prefersReducedMotion ? undefined : { opacity: 0, x: 6 }}
                      transition={{ duration: 0.24, ease: easeOut }}
                    >
                      <LanguageFlag
                        countryCode={selectedAccent.countryCode}
                        alt={`${selectedLanguage.name} flag`}
                        className={styles.activeFlag}
                        size={32}
                      />
                      <div>
                        <p className={styles.activeName}>{selectedLanguage.name}</p>
                        <p className={styles.activeNative}>
                          {selectedLanguage.nativeName} · {selectedAccent.label} · Auto-detected
                        </p>
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  <LanguagesVoiceWaveform playing={playing} languageKey={previewKey} />

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={previewKey}
                      className={styles.transcript}
                      initial={prefersReducedMotion ? false : { opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={prefersReducedMotion ? undefined : { opacity: 0, y: -4 }}
                      transition={{ duration: 0.24, ease: easeOut }}
                    >
                      <p className={styles.callerLine}>{selectedLanguage.callerLine}</p>
                      <p className={styles.agentLine}>{selectedLanguage.agentReply}</p>
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className={styles.voiceFoot}>
                  <motion.button
                    type="button"
                    className={cn(styles.playBtn, playing && styles.playBtnActive)}
                    aria-pressed={playing}
                    aria-label={`Preview ${selectedLanguage.name} voice`}
                    onClick={handlePlayPreview}
                    whileTap={prefersReducedMotion ? undefined : { scale: 0.94 }}
                  >
                    <Play className="size-3 fill-current" aria-hidden />
                  </motion.button>
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={selectedLanguage.id}
                      className={styles.playLabel}
                      initial={prefersReducedMotion ? false : { opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={prefersReducedMotion ? undefined : { opacity: 0 }}
                      transition={{ duration: 0.18 }}
                    >
                      Hear the AI speak in <strong>{selectedLanguage.name}</strong>
                    </motion.p>
                  </AnimatePresence>
                </div>

                <div className={styles.accentSection}>
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={selectedLanguage.id}
                      className={styles.accentTitle}
                      initial={prefersReducedMotion ? false : { opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={prefersReducedMotion ? undefined : { opacity: 0 }}
                      transition={{ duration: 0.18 }}
                    >
                      {selectedLanguage.name} accents
                    </motion.p>
                  </AnimatePresence>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={selectedLanguage.id}
                      className={styles.accentGrid}
                      variants={accentGridVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                    >
                      {selectedLanguage.accents.map((accent) => {
                        const isActive = accent.id === selectedAccentId;
                        return (
                          <motion.button
                            key={accent.id}
                            type="button"
                            variants={accentTagVariants}
                            className={cn(styles.accentTag, isActive && styles.accentTagActive)}
                            aria-pressed={isActive}
                            whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
                            onClick={() => {
                              setSelectedAccentId(accent.id);
                              setPlaying(false);
                            }}
                          >
                            <LanguageFlag
                              countryCode={accent.countryCode}
                              alt={`${accent.label} accent flag`}
                              className={styles.accentFlag}
                              size={14}
                            />
                            {accent.label}
                          </motion.button>
                        );
                      })}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
