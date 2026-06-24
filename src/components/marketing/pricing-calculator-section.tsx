"use client";

import NumberFlow, { continuous, type Trend } from "@number-flow/react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState, memo } from "react";

import { ONDIAL_ACCENT_STYLE } from "@/components/marketing/split-screen-section";
import { usePricingCountry } from "@/components/marketing/pricing-country-context";
import { marketingSectionContainerClass } from "@/config/marketing-layout";
import { DASHBOARD_SIGNUP_URL } from "@/config/urls";
import {
  computeCountryCalculatorMonthlyPrice,
  getCountryCalculatorAddons,
} from "@/data/pricing-by-country";
import {
  getPricingPlanForMinutes,
  PRICING_MINUTES_CALCULATOR,
} from "@/data/pricing-plans";
import { cn } from "@/lib/utils";

import styles from "./pricing-calculator-section.module.css";

const MotionLink = motion.create(Link);

const springSnappy = {
  type: "spring" as const,
  stiffness: 420,
  damping: 34,
  mass: 0.72,
};

const springSoft = {
  type: "spring" as const,
  stiffness: 300,
  damping: 30,
  mass: 0.85,
};

const sectionReveal = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: springSoft,
  },
};

const planLabelReveal = {
  initial: { opacity: 0, y: 10, filter: "blur(6px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  exit: { opacity: 0, y: -10, filter: "blur(6px)" },
};

const planLabelRevealReduced = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const numberFlowTiming = {
  transformTiming: {
    easing: "cubic-bezier(0.22, 1, 0.36, 1)",
    duration: 320,
  },
  opacityTiming: {
    duration: 200,
    easing: "ease-out",
  },
} as const;

const TICK_COUNT = 72;
const SCALE_DOT_COUNT = 11;

function formatMinutes(value: number) {
  return value.toLocaleString("en-US");
}

function formatMinutesEndpoint(value: number, position: "min" | "max") {
  if (position === "max" && value >= PRICING_MINUTES_CALCULATOR.maxMinutes) {
    return "100k+";
  }

  return formatMinutes(value);
}

function snapMinutes(raw: number) {
  const { minMinutes, maxMinutes, step } = PRICING_MINUTES_CALCULATOR;
  const stepped = Math.round(raw / step) * step;
  return Math.min(maxMinutes, Math.max(minMinutes, stepped));
}

const priceFlowTimingIdle = {
  transformTiming: {
    easing: "cubic-bezier(0.22, 1, 0.36, 1)",
    duration: 420,
  },
  opacityTiming: {
    duration: 240,
    easing: "ease-out",
  },
} as const;

const priceFlowTimingDrag = {
  transformTiming: {
    easing: "cubic-bezier(0.22, 1, 0.36, 1)",
    duration: 160,
  },
  opacityTiming: {
    duration: 120,
    easing: "ease-out",
  },
} as const;

function useValueTrend(value: number): Trend | undefined {
  const previous = useRef(value);
  const trendRef = useRef<Trend | undefined>(undefined);

  if (value > previous.current) {
    trendRef.current = 1;
  } else if (value < previous.current) {
    trendRef.current = -1;
  }

  previous.current = value;
  return trendRef.current;
}

const SliderTicks = memo(function SliderTicks({ ratio }: { ratio: number }) {
  return (
    <>
      {Array.from({ length: TICK_COUNT }, (_, index) => {
        const tickRatio = index / (TICK_COUNT - 1);
        const tickDistance = Math.abs(tickRatio - ratio) * (TICK_COUNT - 1);
        const isNear = tickDistance > 0 && tickDistance <= 2.5;

        return (
          <div
            key={index}
            className={cn(
              "absolute bottom-0 -translate-x-1/2 rounded-full bg-[#94a3b8]/80 transition-[height,opacity] duration-200 ease-out",
              "w-px",
            )}
            style={{
              left: `${tickRatio * 100}%`,
              height: isNear ? "1.125rem" : "0.875rem",
              opacity: isNear ? 0.95 : 0.55,
            }}
          />
        );
      })}
    </>
  );
});

type MinutesTickSliderProps = {
  value: number;
  onChange: (value: number) => void;
  onDragChange?: (isDragging: boolean) => void;
};

function MinutesValuePill({
  value,
  isDragging,
}: {
  value: number;
  isDragging: boolean;
}) {
  if (isDragging) {
    return (
      <span className={styles.sliderTooltipValue}>{formatMinutes(value)}</span>
    );
  }

  return (
    <NumberFlow
      value={value}
      format={{ maximumFractionDigits: 0 }}
      locales="en-US"
      className={styles.sliderTooltipValue}
      plugins={[continuous]}
      willChange
      {...numberFlowTiming}
    />
  );
}

function SliderSlideHint({ hidden }: { hidden: boolean }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={styles.sliderInstruction}
      aria-hidden
      initial={false}
      animate={
        hidden
          ? { opacity: 0, y: 8, scale: 0.96, rotate: -8 }
          : { opacity: 1, y: 0, scale: 1, rotate: -8 }
      }
      transition={
        prefersReducedMotion
          ? { duration: 0.15 }
          : { type: "spring", stiffness: 320, damping: 28 }
      }
    >
      <svg
        className={styles.sliderInstructionIcon}
        viewBox="0 0 144 141"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M129.189 0.0490494C128.744 0.119441 126.422 0.377545 124.03 0.635648C114.719 1.6446 109.23 2.4893 108.058 3.09936C107.119 3.56864 106.674 4.34295 106.674 5.44576C106.674 6.71281 107.424 7.51058 109.043 7.97986C110.403 8.37875 110.825 8.42567 118.87 9.52847C121.778 9.92736 124.288 10.3028 124.475 10.3732C124.663 10.4436 122.951 11.1006 120.676 11.8749C110.028 15.4414 100.412 20.7677 91.7339 27.9242C88.38 30.7164 81.6957 37.4271 79.2096 40.5009C73.8387 47.2116 69.6874 54.8139 66.5681 63.7302C65.9348 65.4665 65.3484 66.8978 65.2546 66.8978C65.1374 66.8978 63.7771 66.7336 62.2291 66.5693C52.9649 65.5134 43.1847 68.1649 34.1316 74.2186C24.7735 80.46 18.5349 87.7338 10.5371 101.742C2.53943 115.726 -1.0959 127.482 0.287874 135.014C0.89767 138.463 2.0469 140.035 3.97011 140.082C5.28352 140.105 5.37733 139.659 4.20465 139.049C3.05541 138.463 2.6567 137.9 2.32835 136.281C0.616228 128.021 6.24512 113.028 17.4325 96.1104C23.2725 87.241 28.362 81.9147 35.5622 77.1046C43.8649 71.5437 52.7069 69.033 61.1737 69.8308C64.9967 70.1828 64.6917 69.9247 64.1992 72.4822C62.2525 82.5013 63.8005 92.6378 67.9753 97.354C73.1116 103.079 81.9771 102 85.0027 95.2657C86.3395 92.2858 86.3864 87.7103 85.1434 83.9796C83.1498 78.0901 80.007 73.8197 75.4335 70.8163C73.8152 69.7604 70.4848 68.1883 69.875 68.1883C69.359 68.1883 69.4294 67.6487 70.2268 65.3257C72.3377 59.2486 75.457 52.7021 78.4122 48.244C83.2436 40.9232 91.4524 32.5701 99.1687 27.103C105.806 22.4102 113.241 18.5386 120.512 16.0045C123.772 14.8548 129.87 13.1889 130.081 13.3766C130.128 13.447 129.541 14.362 128.791 15.4414C124.78 21.0258 122.716 26.0706 122.388 30.998C122.224 33.7198 122.341 34.588 122.88 34.2595C122.998 34.1891 123.678 32.969 124.405 31.5611C126.281 27.8069 131.722 20.6738 139.579 11.6402C141.127 9.85697 142.652 7.86254 143.027 7.08823C144.552 4.03792 143.52 1.48035 140.377 0.471397C139.439 0.166366 138.102 0.0490408 134.584 0.0255769C132.074 -0.021351 129.635 0.00212153 129.189 0.0490494ZM137.117 4.92955C137.187 5.0234 136.718 5.63346 136.061 6.29045L134.865 7.48712L131.042 6.73627C128.931 6.33739 126.727 5.9385 126.14 5.8681C124.827 5.68039 124.123 5.32843 124.968 5.28151C125.296 5.28151 126.868 5.11725 128.486 4.953C131.3 4.64797 136.812 4.62451 137.117 4.92955ZM71.5168 72.5292C76.2075 74.899 79.4441 78.8175 81.3204 84.355C83.6189 91.1361 81.2266 96.8378 76.0433 96.8847C73.3227 96.9082 70.9773 95.2188 69.5936 92.2389C68.2802 89.4232 67.6938 86.5606 67.5765 82.1259C67.4593 78.3248 67.6 76.4242 68.2333 72.7403L68.4912 71.2856L69.359 71.5906C69.8515 71.7548 70.8132 72.1772 71.5168 72.5292Z"
          fill="currentColor"
        />
      </svg>
      <span className={styles.sliderInstructionLabel}>slide this!</span>
    </motion.div>
  );
}

function MinutesTickSlider({ value, onChange, onDragChange }: MinutesTickSliderProps) {
  const prefersReducedMotion = useReducedMotion();
  const { minMinutes, maxMinutes } = PRICING_MINUTES_CALCULATOR;
  const trackRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const pendingMinutesRef = useRef<number | null>(null);
  const rafCommitRef = useRef<number | null>(null);

  const ratio = useMemo(
    () => (value - minMinutes) / (maxMinutes - minMinutes),
    [value, minMinutes, maxMinutes],
  );

  const flushMinutes = useCallback(() => {
    rafCommitRef.current = null;
    const next = pendingMinutesRef.current;
    if (next === null) return;
    pendingMinutesRef.current = null;
    onChange(next);
  }, [onChange]);

  const scheduleMinutesCommit = useCallback(
    (nextMinutes: number) => {
      if (nextMinutes === value && pendingMinutesRef.current === null) return;
      pendingMinutesRef.current = nextMinutes;
      if (rafCommitRef.current !== null) return;
      rafCommitRef.current = window.requestAnimationFrame(flushMinutes);
    },
    [flushMinutes, value],
  );

  useEffect(() => {
    return () => {
      if (rafCommitRef.current !== null) {
        window.cancelAnimationFrame(rafCommitRef.current);
      }
    };
  }, []);

  const updateFromPointer = useCallback(
    (clientX: number) => {
      const rect = trackRef.current?.getBoundingClientRect();
      if (!rect) return;

      const nextRatio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
      const rawMinutes = minMinutes + nextRatio * (maxMinutes - minMinutes);
      const nextMinutes = snapMinutes(rawMinutes);

      if (nextMinutes !== value) {
        scheduleMinutesCommit(nextMinutes);
      }
    },
    [minMinutes, maxMinutes, scheduleMinutesCommit, value],
  );

  const handlePointerDown = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      event.preventDefault();
      setIsDragging(true);
      setHasInteracted(true);
      onDragChange?.(true);
      event.currentTarget.setPointerCapture(event.pointerId);
      updateFromPointer(event.clientX);
    },
    [onDragChange, updateFromPointer],
  );

  const handlePointerMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (!event.currentTarget.hasPointerCapture(event.pointerId)) return;
      updateFromPointer(event.clientX);
    },
    [updateFromPointer],
  );

  const endDrag = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(false);
    onDragChange?.(false);
    if (rafCommitRef.current !== null) {
      window.cancelAnimationFrame(rafCommitRef.current);
      rafCommitRef.current = null;
    }
    if (pendingMinutesRef.current !== null) {
      onChange(pendingMinutesRef.current);
      pendingMinutesRef.current = null;
    }
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  }, [onChange, onDragChange]);

  const pillTransition = useMemo(
    () =>
      prefersReducedMotion || isDragging
        ? { duration: 0 as const }
        : springSnappy,
    [prefersReducedMotion, isDragging],
  );

  const tooltipScaleTransition = useMemo(
    () =>
      prefersReducedMotion
        ? { duration: 0.15 as const }
        : { type: "spring" as const, stiffness: 520, damping: 28, mass: 0.55 },
    [prefersReducedMotion],
  );

  return (
    <div className="relative w-full select-none">
      <div
        ref={trackRef}
        role="slider"
        tabIndex={0}
        aria-label="Monthly minutes"
        aria-valuemin={minMinutes}
        aria-valuemax={maxMinutes}
        aria-valuenow={value}
        aria-valuetext={`${formatMinutes(value)} minutes`}
        className={cn(
          "relative touch-none pt-13 outline-none sm:pt-14",
          isDragging ? "cursor-grabbing" : "cursor-pointer",
          "rounded-lg focus-visible:ring-2 focus-visible:ring-[#2F67D8]/30 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
        )}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onKeyDown={(event) => {
          const { step } = PRICING_MINUTES_CALCULATOR;
          if (event.key === "ArrowRight" || event.key === "ArrowUp") {
            event.preventDefault();
            setHasInteracted(true);
            onChange(snapMinutes(value + step));
          }
          if (event.key === "ArrowLeft" || event.key === "ArrowDown") {
            event.preventDefault();
            setHasInteracted(true);
            onChange(snapMinutes(value - step));
          }
          if (event.key === "Home") {
            event.preventDefault();
            setHasInteracted(true);
            onChange(minMinutes);
          }
          if (event.key === "End") {
            event.preventDefault();
            setHasInteracted(true);
            onChange(maxMinutes);
          }
        }}
      >
        <SliderSlideHint hidden={isDragging || hasInteracted} />
        {/* Tooltip pill - same left % as active spike */}
        <motion.div
          className="pointer-events-none absolute top-0 z-20 -translate-x-1/2"
          animate={{
            left: `${ratio * 100}%`,
            scale: isDragging ? 1.045 : 1,
          }}
          transition={{
            left: pillTransition,
            scale: tooltipScaleTransition,
          }}
        >
          <div className={styles.sliderTooltip}>
            <motion.div
              className={styles.sliderTooltipPill}
              animate={{
                boxShadow: isDragging
                  ? "0 8px 28px rgb(47 103 216 / 0.18)"
                  : "0 3px 10px rgb(47 103 216 / 0.1)",
              }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.22 }}
            >
              <MinutesValuePill value={value} isDragging={isDragging} />
            </motion.div>
          </div>
        </motion.div>

        <div className="pointer-events-none relative h-9 w-full sm:h-10" aria-hidden>
          <SliderTicks ratio={ratio} />

          {/* Active spike - exact ratio position, matches pill center */}
          <motion.div
            className="absolute bottom-0 z-10 -translate-x-1/2 rounded-full bg-[#2F67D8]"
            style={{ width: "2px" }}
            animate={{
              left: `${ratio * 100}%`,
              height: isDragging ? "2rem" : "1.875rem",
              boxShadow: isDragging
                ? "0 0 0 4px rgb(47 103 216 / 0.16), 0 0 18px rgb(47 103 216 / 0.22)"
                : "0 0 0 3px rgb(47 103 216 / 0.12)",
            }}
            transition={{
              left: pillTransition,
              height: tooltipScaleTransition,
              boxShadow: { duration: prefersReducedMotion ? 0 : 0.22 },
            }}
          />
        </div>
      </div>

      <div
        className="pointer-events-none mt-3 flex justify-between"
        aria-hidden
      >
        {Array.from({ length: SCALE_DOT_COUNT }, (_, index) => (
          <span key={index} className="size-1 rounded-full bg-[#94a3b8]/70" />
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
        <p className="m-0">
          <span className="font-medium text-foreground">
            {formatMinutesEndpoint(minMinutes, "min")}
          </span>{" "}
          minutes
        </p>
        <p className="m-0">
          <span className="font-medium text-foreground">
            {formatMinutesEndpoint(maxMinutes, "max")}
          </span>{" "}
          minutes
        </p>
      </div>
    </div>
  );
}

type CalculatorAddOnStepperProps = {
  label: string;
  unitLabel: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
};

function CalculatorAddOnStepper({
  label,
  unitLabel,
  value,
  min,
  max,
  onChange,
}: CalculatorAddOnStepperProps) {
  const clamp = useCallback(
    (next: number) => Math.min(max, Math.max(min, next)),
    [max, min],
  );

  const decrement = useCallback(() => {
    onChange(clamp(value - 1));
  }, [clamp, onChange, value]);

  const increment = useCallback(() => {
    onChange(clamp(value + 1));
  }, [clamp, onChange, value]);

  return (
    <div className={styles.addOnRow} role="group" aria-label={label}>
      <div className={styles.addOnCopy}>
        <p className={styles.addOnLabel}>{label}</p>
        <p className={styles.addOnUnit}>{unitLabel}</p>
      </div>
      <div className={styles.addOnStepper}>
        <button
          type="button"
          className={styles.addOnStepperButton}
          aria-label={`Decrease ${label}`}
          disabled={value <= min}
          onClick={decrement}
        >
          <Minus className="size-3.5" aria-hidden strokeWidth={2} />
        </button>
        <NumberFlow
          value={value}
          format={{ maximumFractionDigits: 0 }}
          locales="en-US"
          className={styles.addOnStepperValue}
          plugins={[continuous]}
          willChange
          {...numberFlowTiming}
        />
        <button
          type="button"
          className={styles.addOnStepperButton}
          aria-label={`Increase ${label}`}
          disabled={value >= max}
          onClick={increment}
        >
          <Plus className="size-3.5" aria-hidden strokeWidth={2} />
        </button>
      </div>
    </div>
  );
}

const MemoCalculatorAddOns = memo(function CalculatorAddOns({
  channels,
  numbers,
  onChannelsChange,
  onNumbersChange,
}: {
  channels: number;
  numbers: number;
  onChannelsChange: (value: number) => void;
  onNumbersChange: (value: number) => void;
}) {
  const { countryId } = usePricingCountry();
  const { channels: channelConfig, numbers: numberConfig } = useMemo(
    () => getCountryCalculatorAddons(countryId),
    [countryId],
  );

  return (
    <div className={styles.addOnList}>
      <CalculatorAddOnStepper
        label={channelConfig.label}
        unitLabel={channelConfig.unitLabel}
        value={channels}
        min={channelConfig.min}
        max={channelConfig.max}
        onChange={onChannelsChange}
      />
      <CalculatorAddOnStepper
        label={numberConfig.label}
        unitLabel={numberConfig.unitLabel}
        value={numbers}
        min={numberConfig.min}
        max={numberConfig.max}
        onChange={onNumbersChange}
      />
    </div>
  );
});

const PlanBuyButton = memo(function PlanBuyButton({
  minutes,
  monthlyPrice,
  isDragging = false,
}: {
  minutes: number;
  monthlyPrice: number;
  isDragging?: boolean;
}) {
  const prefersReducedMotion = useReducedMotion();
  const { country } = usePricingCountry();
  const plan = useMemo(() => getPricingPlanForMinutes(minutes), [minutes]);
  const displayPrice = Math.round(monthlyPrice * 100) / 100;
  const trend = useValueTrend(displayPrice);
  const isEnterprise = plan.id === "enterprise";
  const href = plan.ctaHref ?? DASHBOARD_SIGNUP_URL;
  const label = isEnterprise ? plan.ctaLabel ?? "Contact Sales" : `Get ${plan.title}`;
  const labelMotion = prefersReducedMotion ? planLabelRevealReduced : planLabelReveal;
  const currencyLabel = `${country.currency.code} ${displayPrice.toFixed(country.currency.monthlyFractionDigits)}`;
  const priceFormat = useMemo(
    () => ({
      minimumFractionDigits: country.currency.monthlyFractionDigits,
      maximumFractionDigits: country.currency.monthlyFractionDigits,
    }),
    [country.currency.monthlyFractionDigits],
  );

  return (
    <MotionLink
      href={href}
      layout
      className={styles.planBuyButton}
      aria-label={
        isEnterprise
          ? `${label} for custom pricing`
          : `${label} for ${currencyLabel} per month`
      }
      whileHover={
        prefersReducedMotion
          ? undefined
          : {
              scale: 1.02,
              y: -1,
              boxShadow: "0 10px 28px rgb(0 0 0 / 0.14)",
              transition: { duration: 0.2 },
            }
      }
      whileTap={prefersReducedMotion ? undefined : { scale: 0.985 }}
      transition={springSnappy}
    >
      <span className={styles.planBuyButtonPlan}>
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={plan.id}
            className={styles.planBuyButtonPlanText}
            {...labelMotion}
            transition={{ duration: prefersReducedMotion ? 0.12 : 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            {label}
          </motion.span>
        </AnimatePresence>
      </span>
      <AnimatePresence mode="popLayout" initial={false}>
        {!isEnterprise ? (
          <motion.span
            key="price-block"
            className={styles.planBuyButtonPriceBlock}
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "auto" }}
            exit={{ opacity: 0, width: 0 }}
            transition={{ duration: prefersReducedMotion ? 0.1 : 0.24, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className={styles.planBuyButtonDivider} aria-hidden />
            <span className={styles.planBuyButtonPrice}>
              <span className={styles.planBuyButtonPriceCurrency} aria-hidden>
                {country.currency.symbol}
              </span>
              <NumberFlow
                value={displayPrice}
                trend={trend}
                format={priceFormat}
                locales={country.currency.locale}
                className={styles.planBuyButtonPriceFlow}
                plugins={[continuous]}
                willChange
                {...(isDragging ? priceFlowTimingDrag : priceFlowTimingIdle)}
              />
              <span className={styles.planBuyButtonSuffix}>/mo</span>
            </span>
          </motion.span>
        ) : null}
      </AnimatePresence>
      <motion.span
        className={styles.planBuyButtonArrow}
        aria-hidden
        initial={false}
        whileHover={prefersReducedMotion ? undefined : { x: 2 }}
        transition={springSnappy}
      >
        <motion.svg
          viewBox="0 0 16 16"
          fill="none"
          initial={false}
          whileHover={prefersReducedMotion ? undefined : { x: 1 }}
          transition={springSnappy}
        >
          <path
            d="M3.5 8h9M9 4.5 12.5 8 9 11.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.svg>
      </motion.span>
    </MotionLink>
  );
});

const PriceCounter = memo(function PriceCounter({
  price,
  isDragging = false,
}: {
  price: number;
  isDragging?: boolean;
}) {
  const prefersReducedMotion = useReducedMotion();
  const { country } = usePricingCountry();
  const displayPrice = Math.round(price * 100) / 100;
  const trend = useValueTrend(displayPrice);
  const currencyLabel = `${country.currency.code} ${displayPrice.toFixed(country.currency.monthlyFractionDigits)}`;
  const priceFormat = useMemo(
    () => ({
      minimumFractionDigits: country.currency.monthlyFractionDigits,
      maximumFractionDigits: country.currency.monthlyFractionDigits,
    }),
    [country.currency.monthlyFractionDigits],
  );

  return (
    <motion.div
      className={styles.priceDisplay}
      role="status"
      aria-live="polite"
      aria-atomic="true"
      aria-label={`Monthly price ${currencyLabel}`}
      animate={
        prefersReducedMotion
          ? undefined
          : {
              scale: isDragging ? 1.012 : 1,
              opacity: isDragging ? 0.94 : 1,
            }
      }
      transition={
        prefersReducedMotion
          ? { duration: 0 }
          : { type: "spring", stiffness: 380, damping: 32, mass: 0.7 }
      }
    >
      <motion.span
        className={styles.priceCurrency}
        aria-hidden
        animate={prefersReducedMotion ? undefined : { opacity: isDragging ? 0.78 : 0.92 }}
        transition={{ duration: 0.2 }}
      >
        {country.currency.symbol}
      </motion.span>
      <NumberFlow
        value={displayPrice}
        trend={trend}
        format={priceFormat}
        locales={country.currency.locale}
        className={styles.priceFlow}
        plugins={[continuous]}
        isolate
        willChange
        {...(isDragging ? priceFlowTimingDrag : priceFlowTimingIdle)}
      />
    </motion.div>
  );
});

export function PricingCalculatorSection() {
  const prefersReducedMotion = useReducedMotion();
  const { countryId, country } = usePricingCountry();
  const [minutes, setMinutes] = useState<number>(PRICING_MINUTES_CALCULATOR.defaultMinutes);
  const addonDefaults = useMemo(() => getCountryCalculatorAddons(countryId), [countryId]);
  const [channels, setChannels] = useState<number>(addonDefaults.channels.default);
  const [numbers, setNumbers] = useState<number>(addonDefaults.numbers.default);

  useEffect(() => {
    setChannels(addonDefaults.channels.default);
    setNumbers(addonDefaults.numbers.default);
  }, [countryId, addonDefaults.channels.default, addonDefaults.numbers.default]);
  const [isDragging, setIsDragging] = useState(false);
  const monthlyPrice = useMemo(
    () => computeCountryCalculatorMonthlyPrice(countryId, { minutes, channels, numbers }),
    [countryId, minutes, channels, numbers],
  );

  const staggerContainer = useMemo(
    () => ({
      hidden: {},
      show: {
        transition: {
          staggerChildren: prefersReducedMotion ? 0 : 0.09,
          delayChildren: prefersReducedMotion ? 0 : 0.04,
        },
      },
    }),
    [prefersReducedMotion],
  );

  return (
    <section
      id="pricing-calculator"
      className="w-full bg-transparent pb-14 sm:pb-16 lg:pb-20"
      style={ONDIAL_ACCENT_STYLE}
      aria-labelledby="pricing-calculator-title"
    >
      <div className={cn(marketingSectionContainerClass, "max-w-3xl lg:max-w-4xl")}>
        <motion.div
          className="mx-auto flex max-w-3xl flex-col items-center text-center"
          variants={staggerContainer}
          initial={prefersReducedMotion ? false : "hidden"}
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
        >
          <motion.h2
            id="pricing-calculator-title"
            className="m-0 max-w-2xl text-balance text-2xl font-semibold tracking-tight text-foreground sm:text-3xl lg:text-4xl"
            variants={sectionReveal}
          >
            {PRICING_MINUTES_CALCULATOR.title}
          </motion.h2>

          <motion.p
            className="mt-2 text-sm font-medium text-muted-foreground"
            variants={sectionReveal}
          >
            Estimated in {country.currency.code} for {country.name}
          </motion.p>

          <motion.div
            className={cn("mt-4 flex w-full justify-center sm:mt-5", styles.priceDisplayAnchor)}
            variants={sectionReveal}
          >
            <PriceCounter price={monthlyPrice} isDragging={isDragging} />
          </motion.div>

          <motion.div
            className="mt-5 flex w-full justify-center sm:mt-6"
            variants={sectionReveal}
          >
            <PlanBuyButton
              minutes={minutes}
              monthlyPrice={monthlyPrice}
              isDragging={isDragging}
            />
          </motion.div>

          <motion.div
            className="mt-4 space-y-1 sm:mt-5"
            variants={sectionReveal}
          >
            {PRICING_MINUTES_CALCULATOR.descriptionLines.map((line) => (
              <p
                key={line}
                className="m-0 text-pretty text-[0.9375rem] leading-snug text-muted-foreground sm:text-base lg:text-[1.0625rem] lg:leading-relaxed"
              >
                {line}
              </p>
            ))}
          </motion.div>

          <motion.div className="mt-10 w-full sm:mt-12" variants={sectionReveal}>
            <MinutesTickSlider
              value={minutes}
              onChange={setMinutes}
              onDragChange={setIsDragging}
            />
            <MemoCalculatorAddOns
              channels={channels}
              numbers={numbers}
              onChannelsChange={setChannels}
              onNumbersChange={setNumbers}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
