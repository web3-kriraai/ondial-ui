"use client";

import { Clock3, DollarSign, Globe2, Sparkles, TrendingUp } from "lucide-react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
  type PanInfo,
} from "framer-motion";
import { useCallback, useEffect, useRef, useState, type ElementType } from "react";

import { ONDIAL_ACCENT_STYLE } from "@/components/marketing/split-screen-section";
import { TextReveal } from "@/components/ui/text-reveal";
import {
  marketingDottedSectionShellClass,
  marketingEyebrowClass,
  marketingSectionContainerClass,
} from "@/config/marketing-layout";
import {
  ABOUT_WHY_CHOOSE_FEATURES,
  ABOUT_WHY_CHOOSE_HEADING,
  ABOUT_WHY_CHOOSE_SLIDE_MS,
  type WhyChooseFeatureId,
} from "@/data/about-why-choose-content";
import { cn } from "@/lib/utils";

const easeOut = [0.22, 1, 0.36, 1] as const;

const featureMeta: Record<WhyChooseFeatureId, { icon: ElementType; iconClass: string }> = {
  "cost-reduction": { icon: DollarSign, iconClass: "bg-[#e1f5ee] text-[#085041]" },
  "customer-satisfaction": { icon: Clock3, iconClass: "bg-[#e6f1fb] text-[#0c447c]" },
  "global-scalability": {
    icon: Globe2,
    iconClass:
      "bg-[hsl(var(--section-accent-h)_var(--section-accent-s)_var(--section-accent-l)/0.12)] text-[hsl(var(--section-accent-h)_var(--section-accent-s)_calc(var(--section-accent-l)-18%))]",
  },
  "sales-conversion": { icon: TrendingUp, iconClass: "bg-[#faeeda] text-[#633806]" },
};

const STACK_SPRING = { type: "spring" as const, stiffness: 220, damping: 26, mass: 0.85 };
const STACK_DEPTH_STEP = { y: 16, x: 14, scale: 0.035 };
const DRAG_OFFSET_THRESHOLD = 72;
const DRAG_VELOCITY_THRESHOLD = 420;

function getCardDepth(cardIndex: number, activeIndex: number, total: number) {
  return (cardIndex - activeIndex + total) % total;
}

function getStackTransform(depth: number) {
  return {
    y: -(depth * STACK_DEPTH_STEP.y),
    x: depth * STACK_DEPTH_STEP.x,
    scale: 1 - depth * STACK_DEPTH_STEP.scale,
    rotate: depth * 0.35,
    opacity: depth === 0 ? 1 : Math.max(0.72, 1 - depth * 0.08),
  };
}

export function AboutWhyChooseSection() {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.35 });
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const progressRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  const activeFeature = ABOUT_WHY_CHOOSE_FEATURES[activeIndex]!;
  const { icon: Icon, iconClass } = featureMeta[activeFeature.id];

  const goToNext = useCallback(() => {
    setActiveIndex((current) => (current + 1) % ABOUT_WHY_CHOOSE_FEATURES.length);
  }, []);

  const goToPrevious = useCallback(() => {
    setActiveIndex((current) =>
      current === 0 ? ABOUT_WHY_CHOOSE_FEATURES.length - 1 : current - 1,
    );
  }, []);

  const goToSlide = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  const handleCardDragEnd = useCallback(
    (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      const swipedLeft =
        info.offset.x < -DRAG_OFFSET_THRESHOLD || info.velocity.x < -DRAG_VELOCITY_THRESHOLD;
      const swipedRight =
        info.offset.x > DRAG_OFFSET_THRESHOLD || info.velocity.x > DRAG_VELOCITY_THRESHOLD;

      if (swipedLeft) {
        goToNext();
      } else if (swipedRight) {
        goToPrevious();
      }
    },
    [goToNext, goToPrevious],
  );

  useEffect(() => {
    progressRef.current = 0;
    setProgress(0);
  }, [activeIndex]);

  useEffect(() => {
    if (rafRef.current !== null) {
      window.cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }

    if (!isInView || isPaused) return;

    if (prefersReducedMotion) {
      const timer = window.setTimeout(goToNext, ABOUT_WHY_CHOOSE_SLIDE_MS);
      progressRef.current = 1;
      setProgress(1);
      return () => window.clearTimeout(timer);
    }

    const startedAt = performance.now();
    const startProgress = progressRef.current;

    const tick = (now: number) => {
      const elapsed = now - startedAt;
      const nextProgress = Math.min(1, startProgress + elapsed / ABOUT_WHY_CHOOSE_SLIDE_MS);
      progressRef.current = nextProgress;
      setProgress(nextProgress);

      if (nextProgress >= 1) {
        progressRef.current = 0;
        setProgress(0);
        goToNext();
        return;
      }

      rafRef.current = window.requestAnimationFrame(tick);
    };

    rafRef.current = window.requestAnimationFrame(tick);

    return () => {
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [activeIndex, goToNext, isInView, isPaused, prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="why-choose-ondial"
      className={cn(marketingDottedSectionShellClass, "relative")}
      style={ONDIAL_ACCENT_STYLE}
      aria-labelledby="why-choose-ondial-title"
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setIsPaused(false);
        }
      }}
    >
      <div className={marketingSectionContainerClass}>
        <header className="relative z-1 mx-auto max-w-176 text-center">
          <p className={cn(marketingEyebrowClass, "mb-4 inline-flex items-center gap-[0.4rem]")}>
            <Sparkles
              className="h-3.5 w-3.5 text-[hsl(var(--section-accent-h)_var(--section-accent-s)_var(--section-accent-l))]"
              aria-hidden
              strokeWidth={1.75}
            />
            {ABOUT_WHY_CHOOSE_HEADING.eyebrow}
          </p>
          <h2
            id="why-choose-ondial-title"
            className="text-balance text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem]"
          >
            <TextReveal as="span" className="block" delay={0.05} stagger={0.07} inViewAmount={0.5}>
              {ABOUT_WHY_CHOOSE_HEADING.titleLead}
            </TextReveal>
            <TextReveal
              as="span"
              className="block"
              delay={0.14}
              stagger={0.07}
              inViewAmount={0.5}
              segments={[
                {
                  text: ABOUT_WHY_CHOOSE_HEADING.titleAccent,
                  className:
                    "text-[hsl(var(--section-accent-h)_var(--section-accent-s)_var(--section-accent-l))]",
                },
              ]}
            />
          </h2>
          <TextReveal
            as="p"
            className="mx-auto m-0 mt-4 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg"
            delay={0.24}
            stagger={0.028}
            inViewAmount={0.4}
          >
            {ABOUT_WHY_CHOOSE_HEADING.description}
          </TextReveal>
        </header>

        <div
          className="relative z-1 mt-[clamp(2.25rem,5vw,3.25rem)] grid items-stretch gap-[clamp(1.5rem,4vw,2.5rem)] md:grid-cols-2 lg:gap-[clamp(2rem,4vw,3rem)]"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="flex min-h-[clamp(18rem,42vw,22rem)] flex-col justify-between gap-6">
            <div className="relative min-h-[clamp(12rem,28vw,15rem)]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeFeature.id}
                  className="flex flex-col gap-4"
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={prefersReducedMotion ? undefined : { opacity: 0, y: -10 }}
                  transition={{ duration: 0.42, ease: easeOut }}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={cn(
                        "grid h-11 w-11 shrink-0 place-items-center rounded-[0.875rem]",
                        iconClass,
                      )}
                      aria-hidden
                    >
                      <Icon className="h-5 w-5" strokeWidth={1.75} />
                    </span>
                    <span className="text-xs font-bold tracking-[0.12em] text-muted-foreground">
                      {activeFeature.index}
                    </span>
                  </div>
                  <h3 className="m-0 text-[clamp(1.25rem,2.4vw,1.625rem)] font-semibold leading-[1.4] tracking-[-0.02em] text-foreground">
                    {activeFeature.title}
                  </h3>
                  <p className="m-0 max-w-none text-base leading-[1.7] text-muted-foreground">
                    {activeFeature.description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex flex-col gap-3">
              <div
                className="relative h-0.5 w-full overflow-hidden rounded-full bg-black/8"
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.round(progress * 100)}
                aria-label={`Benefit ${activeIndex + 1} of ${ABOUT_WHY_CHOOSE_FEATURES.length}`}
              >
                <div
                  className="absolute inset-0 origin-left rounded-full bg-[hsl(var(--section-accent-h)_var(--section-accent-s)_var(--section-accent-l))] will-change-transform motion-reduce:transition-none"
                  style={{ transform: `scaleX(${progress})` }}
                />
              </div>

              <div className="flex flex-wrap gap-2">
                {ABOUT_WHY_CHOOSE_FEATURES.map((feature, index) => (
                  <button
                    key={feature.id}
                    type="button"
                    className={cn(
                      "inline-flex h-8 min-w-9 cursor-pointer items-center justify-center rounded-full border border-black/8 bg-background px-[0.55rem] text-[0.6875rem] font-bold tracking-[0.08em] text-muted-foreground transition-[border-color,color,background-color] duration-200 hover:border-black/14 hover:text-foreground",
                      index === activeIndex &&
                      "border-[hsl(var(--section-accent-h)_var(--section-accent-s)_var(--section-accent-l)/0.35)] bg-[hsl(var(--section-accent-h)_var(--section-accent-s)_var(--section-accent-l)/0.1)] text-[hsl(var(--section-accent-h)_var(--section-accent-s)_calc(var(--section-accent-l)-18%))]",
                      index < activeIndex && "text-foreground",
                    )}
                    aria-label={`Show benefit ${feature.index}`}
                    aria-current={index === activeIndex ? "step" : undefined}
                    onClick={() => goToSlide(index)}
                  >
                    {feature.index}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex min-h-[clamp(18rem,42vw,22rem)] items-stretch justify-center overflow-visible">
            <div className="relative h-full min-h-[clamp(18rem,42vw,22rem)] w-full sm:w-[80%] overflow-visible pt-15 pr-11 perspective-distant">
              {ABOUT_WHY_CHOOSE_FEATURES.map((feature, index) => {
                const depth = getCardDepth(
                  index,
                  activeIndex,
                  ABOUT_WHY_CHOOSE_FEATURES.length,
                );
                const transform = getStackTransform(depth);
                const isFront = depth === 0;

                return (
                  <motion.div
                    key={feature.id}
                    className={cn(
                      "absolute inset-x-0 bottom-0 top-15 overflow-hidden rounded-[1.35rem] border will-change-[transform,opacity] origin-top backface-hidden motion-reduce:transition-none",
                      isFront
                        ? "cursor-grab touch-none border-black/10 shadow-[0_4px_6px_rgb(15_23_42/0.04),0_22px_44px_-16px_rgb(15_23_42/0.22)] active:cursor-grabbing"
                        : "border-black/6 shadow-[0_6px_18px_-10px_rgb(15_23_42/0.12)]",
                    )}
                    style={{
                      backgroundColor: feature.illustrationBg,
                      zIndex: 40 - depth * 10,
                    }}
                    initial={false}
                    animate={transform}
                    transition={prefersReducedMotion ? { duration: 0.35, ease: easeOut } : STACK_SPRING}
                    drag={isFront && !prefersReducedMotion ? "x" : false}
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.85}
                    dragMomentum={false}
                    whileDrag={{
                      scale: 1.02,
                      rotate: 0,
                      cursor: "grabbing",
                    }}
                    onDragStart={() => setIsPaused(true)}
                    onDragEnd={(event, info) => {
                      handleCardDragEnd(event, info);
                      setIsPaused(false);
                    }}
                  >
                    <Image
                      src={feature.image}
                      alt={isFront ? feature.imageAlt : ""}
                      fill
                      className={cn(
                        "object-cover",
                        !isFront && "saturate-[0.92] brightness-[0.96]",
                      )}
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      draggable={false}
                      aria-hidden={!isFront}
                    />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
