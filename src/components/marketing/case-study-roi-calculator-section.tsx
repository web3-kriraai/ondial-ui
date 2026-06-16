"use client";

import NumberFlow, { continuous } from "@number-flow/react";
import * as RadixSlider from "@radix-ui/react-slider";
import { Calculator, Sparkles, TrendingUp } from "lucide-react";
import Link from "next/link";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useMemo, useRef, useState } from "react";

import { ONDIAL_ACCENT_STYLE } from "@/components/marketing/split-screen-section";
import {
  marketingEyebrowClass,
  marketingSectionContainerClass,
  marketingSectionShellClass,
} from "@/config/marketing-layout";
import {
  computeRoiResults,
  ROI_CALCULATOR_HEADING,
  ROI_INPUTS,
  ROI_RESULTS,
} from "@/data/case-study-roi-calculator-content";
import { cn } from "@/lib/utils";

const easeOut = [0.22, 1, 0.36, 1] as const;

const currencyFormat = {
  style: "currency" as const,
  currency: "USD",
  maximumFractionDigits: 0,
};

const numberFlowTiming = {
  transformTiming: {
    easing: "cubic-bezier(0.22, 1, 0.36, 1)",
    duration: 420,
  },
  opacityTiming: {
    duration: 280,
    easing: "ease-out",
  },
};

type RoiSliderProps = {
  id: string;
  label: string;
  hint: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (value: number) => void;
  formatValue: (value: number) => string;
};

function RoiSlider({
  id,
  label,
  hint,
  min,
  max,
  step,
  value,
  onChange,
  formatValue,
}: RoiSliderProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <label
            htmlFor={id}
            className="m-0 block text-sm font-semibold text-foreground"
          >
            {label}
          </label>
          <p className="m-0 mt-0.5 text-xs text-muted-foreground">{hint}</p>
        </div>
        <span className="shrink-0 rounded-lg border border-[#534AB7]/15 bg-[#EEEDFE]/80 px-2.5 py-1 text-sm font-bold tabular-nums text-[#534AB7]">
          {formatValue(value)}
        </span>
      </div>

      <RadixSlider.Root
        id={id}
        min={min}
        max={max}
        step={step}
        value={[value]}
        onValueChange={([next]) => onChange(next)}
        className="relative flex h-7 w-full touch-none select-none items-center"
        aria-label={label}
      >
        <RadixSlider.Track className="relative h-1.5 grow overflow-hidden rounded-full bg-[#534AB7]/10">
          <RadixSlider.Range className="absolute h-full rounded-full bg-gradient-to-r from-[#7C75E0] to-[#534AB7]" />
        </RadixSlider.Track>
        <RadixSlider.Thumb
          className={cn(
            "block size-4 rounded-full border-2 border-white bg-[#534AB7]",
            "shadow-[0_0_0_1px_rgb(83_74_183/0.25),0_4px_14px_-2px_rgb(83_74_183/0.45)]",
            "transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#534AB7]/40",
          )}
        />
      </RadixSlider.Root>
    </div>
  );
}

type ResultCardProps = {
  label: string;
  description: string;
  value: number;
  emphasis?: boolean;
  delay?: number;
  show: boolean;
};

function ResultCard({
  label,
  description,
  value,
  emphasis = false,
  delay = 0,
  show,
}: ResultCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      transition={{ duration: 0.5, ease: easeOut, delay }}
      className={cn(
        "relative overflow-hidden rounded-2xl border p-5 sm:p-6",
        emphasis
          ? [
              "border-[#534AB7]/25 bg-gradient-to-br from-[#534AB7] to-[#4338a8] text-white",
              "shadow-[0_24px_48px_-16px_rgb(83_74_183/0.55),0_0_0_1px_rgb(255_255_255/0.08)_inset]",
            ]
          : [
              "border-[#534AB7]/15 bg-white/90",
              "shadow-[0_16px_40px_-24px_rgb(83_74_183/0.28)]",
              "before:pointer-events-none before:absolute before:inset-0 before:rounded-2xl before:shadow-[inset_0_1px_0_rgb(255_255_255/0.9)]",
            ],
      )}
    >
      {emphasis && (
        <div
          className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10 blur-2xl"
          aria-hidden
        />
      )}

      <div className="relative">
        <p
          className={cn(
            "m-0 text-[0.6875rem] font-semibold uppercase tracking-[0.1em]",
            emphasis ? "text-white/70" : "text-muted-foreground",
          )}
        >
          {label}
        </p>
        <div className="mt-2">
          <NumberFlow
            value={value}
            format={currencyFormat}
            className={cn(
              "font-bold leading-none tracking-tight tabular-nums",
              emphasis
                ? "text-[clamp(1.75rem,4vw,2.25rem)] text-white"
                : "text-[clamp(1.5rem,3.5vw,1.875rem)] text-[#534AB7]",
            )}
            plugins={[continuous]}
            willChange
            {...numberFlowTiming}
          />
        </div>
        <p
          className={cn(
            "m-0 mt-2 text-xs leading-relaxed",
            emphasis ? "text-white/75" : "text-muted-foreground",
          )}
        >
          {description}
        </p>
      </div>
    </motion.div>
  );
}

export function CaseStudyRoiCalculatorSection() {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.12 });
  const show = prefersReducedMotion || isInView;

  const [missedCalls, setMissedCalls] = useState<number>(ROI_INPUTS.missedCalls.default);
  const [jobValue, setJobValue] = useState<number>(ROI_INPUTS.jobValue.default);
  const [closeRate, setCloseRate] = useState<number>(ROI_INPUTS.closeRate.default);

  const results = useMemo(
    () => computeRoiResults(missedCalls, jobValue, closeRate),
    [missedCalls, jobValue, closeRate],
  );

  return (
    <section
      ref={sectionRef}
      id="roi-calculator"
      className={cn(
        marketingSectionShellClass,
        "relative overflow-hidden ",
      )}
      style={ONDIAL_ACCENT_STYLE}
      aria-labelledby="roi-calculator-title"
    >

      <div className={cn(marketingSectionContainerClass, "relative")}>
        <header className="mx-auto mb-10 max-w-2xl text-center sm:mb-12">
          <p className={cn(marketingEyebrowClass, "mb-4 inline-flex items-center gap-1.5")}>
            <Sparkles
              className="h-3.5 w-3.5 text-[hsl(var(--section-accent-h)_var(--section-accent-s)_var(--section-accent-l))]"
              aria-hidden
            />
            {ROI_CALCULATOR_HEADING.eyebrow}
          </p>
          <h2
            id="roi-calculator-title"
            className="m-0 text-balance text-2xl font-semibold tracking-tight text-foreground sm:text-3xl lg:text-4xl"
          >
            {ROI_CALCULATOR_HEADING.title}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            {ROI_CALCULATOR_HEADING.description}
          </p>
        </header>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.55, ease: easeOut }}
          className={cn(
            "relative overflow-hidden rounded-3xl border border-[#534AB7]/12 bg-white/80 p-5 shadow-[0_32px_64px_-32px_rgb(83_74_183/0.35)] backdrop-blur-sm sm:p-8 lg:p-10",
            "before:pointer-events-none before:absolute before:inset-0 before:rounded-3xl before:shadow-[inset_0_1px_0_rgb(255_255_255/0.95)]",
          )}
        >
          <div
            className="pointer-events-none absolute -left-20 top-1/2 h-56 w-56 -translate-y-1/2 rounded-full bg-[#534AB7]/8 blur-3xl"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#7C75E0]/15 blur-3xl"
            aria-hidden
          />

          <div className="relative grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-12 xl:gap-16">
            <div>
              <div className="mb-6 flex items-center gap-2.5">
                <span className="grid size-9 place-items-center rounded-xl bg-[#EEEDFE] text-[#534AB7]">
                  <Calculator className="size-4" strokeWidth={1.75} aria-hidden />
                </span>
                <div>
                  <p className="m-0 text-sm font-semibold text-foreground">Your inputs</p>
                  <p className="m-0 text-xs text-muted-foreground">Updates in real time</p>
                </div>
              </div>

              <div className="space-y-7 sm:space-y-8">
                <RoiSlider
                  id={ROI_INPUTS.missedCalls.id}
                  label={ROI_INPUTS.missedCalls.label}
                  hint={ROI_INPUTS.missedCalls.hint}
                  min={ROI_INPUTS.missedCalls.min}
                  max={ROI_INPUTS.missedCalls.max}
                  step={ROI_INPUTS.missedCalls.step}
                  value={missedCalls}
                  onChange={setMissedCalls}
                  formatValue={(v) => v.toLocaleString("en-US")}
                />
                <RoiSlider
                  id={ROI_INPUTS.jobValue.id}
                  label={ROI_INPUTS.jobValue.label}
                  hint={ROI_INPUTS.jobValue.hint}
                  min={ROI_INPUTS.jobValue.min}
                  max={ROI_INPUTS.jobValue.max}
                  step={ROI_INPUTS.jobValue.step}
                  value={jobValue}
                  onChange={setJobValue}
                  formatValue={(v) =>
                    v.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                      maximumFractionDigits: 0,
                    })
                  }
                />
                <RoiSlider
                  id={ROI_INPUTS.closeRate.id}
                  label={ROI_INPUTS.closeRate.label}
                  hint={ROI_INPUTS.closeRate.hint}
                  min={ROI_INPUTS.closeRate.min}
                  max={ROI_INPUTS.closeRate.max}
                  step={ROI_INPUTS.closeRate.step}
                  value={closeRate}
                  onChange={setCloseRate}
                  formatValue={(v) => `${v}%`}
                />
              </div>
            </div>

            <div>
              <div className="mb-6 flex items-center gap-2.5">
                <span className="grid size-9 place-items-center rounded-xl bg-[#534AB7] text-white shadow-[0_8px_20px_-8px_rgb(83_74_183/0.8)]">
                  <TrendingUp className="size-4" strokeWidth={1.75} aria-hidden />
                </span>
                <div>
                  <p className="m-0 text-sm font-semibold text-foreground">Projected impact</p>
                  <p className="m-0 text-xs text-muted-foreground">Based on your scenario</p>
                </div>
              </div>

              <div className="space-y-4 sm:space-y-5">
                <ResultCard
                  label={ROI_RESULTS[1]!.label}
                  description={ROI_RESULTS[1]!.description}
                  value={results.monthlyRevenueRecovery}
                  emphasis
                  delay={0}
                  show={show}
                />
                <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
                  <ResultCard
                    label={ROI_RESULTS[0]!.label}
                    description={ROI_RESULTS[0]!.description}
                    value={results.potentialRevenueLost}
                    delay={0.08}
                    show={show}
                  />
                  <ResultCard
                    label={ROI_RESULTS[2]!.label}
                    description={ROI_RESULTS[2]!.description}
                    value={results.annualRevenueOpportunity}
                    delay={0.16}
                    show={show}
                  />
                </div>
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={show ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.45, delay: 0.28, ease: easeOut }}
                className="m-0 mt-5 text-center text-[0.6875rem] leading-relaxed text-muted-foreground sm:text-left"
              >
                Recovery estimate assumes{" "}
                <span className="font-medium text-foreground">85% capture</span> of recoverable
                missed-call revenue with AI call handling.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.45, delay: 0.34, ease: easeOut }}
                className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-end"
              >
                <Link
                  href="/contact"
                  className={cn(
                    "inline-flex items-center justify-center rounded-full px-6 py-2.5 text-sm font-semibold",
                    "bg-[#534AB7] text-white shadow-[0_12px_28px_-10px_rgb(83_74_183/0.7)]",
                    "transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_32px_-10px_rgb(83_74_183/0.75)]",
                  )}
                >
                  Get your custom ROI report
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
