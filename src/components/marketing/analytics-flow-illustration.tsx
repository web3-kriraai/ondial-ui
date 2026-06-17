"use client";

import { animate, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

const CYCLE = 6;
const popEase = [0.22, 1, 0.36, 1] as const;
const CHART_BASELINE = 116;

const BARS = [
  { x: 40, height: 10, fill: "#AFA9EC" },
  { x: 58, height: 18, fill: "#7F77DD" },
  { x: 76, height: 26, fill: "#534AB7" },
  { x: 94, height: 22, fill: "#7F77DD" },
  { x: 112, height: 30, fill: "#3C3489" },
  { x: 130, height: 24, fill: "#534AB7" },
  { x: 148, height: 28, fill: "#3C3489" },
] as const;

type AnalyticsFlowIllustrationProps = {
  className?: string;
};

function useCountUp(
  target: number,
  options: { delay: number; duration: number; decimals?: number; cycle: number; enabled: boolean },
) {
  const { delay, duration, decimals = 0, cycle, enabled } = options;
  const [value, setValue] = useState(enabled ? 0 : target);

  useEffect(() => {
    if (!enabled) {
      setValue(target);
      return;
    }

    setValue(0);
    const controls = animate(0, target, {
      duration,
      delay,
      ease: popEase,
      onUpdate: (latest) => {
        setValue(decimals > 0 ? Number(latest.toFixed(decimals)) : Math.round(latest));
      },
    });

    return () => controls.stop();
  }, [target, delay, duration, decimals, cycle, enabled]);

  return value;
}

function AnimatedMetric({
  x,
  y,
  target,
  suffix,
  decimals = 0,
  fill,
  delay,
  cycle,
  enabled,
}: {
  x: number;
  y: number;
  target: number;
  suffix: string;
  decimals?: number;
  fill: string;
  delay: number;
  cycle: number;
  enabled: boolean;
}) {
  const value = useCountUp(target, { delay, duration: 1.05, decimals, cycle, enabled });
  const display = decimals > 0 ? value.toFixed(decimals) : String(value);

  return (
    <motion.text
      x={x}
      y={y}
      textAnchor="middle"
      fontSize="18"
      fill={fill}
      fontWeight="500"
      animate={enabled ? { opacity: [0.4, 1], scale: [0.96, 1] } : undefined}
      transition={{ duration: 0.5, delay, ease: popEase }}
    >
      {display}
      {suffix}
    </motion.text>
  );
}

function ChartBar({
  x,
  height,
  fill,
  index,
  cycle,
  enabled,
}: {
  x: number;
  height: number;
  fill: string;
  index: number;
  cycle: number;
  enabled: boolean;
}) {
  const growDelay = 1.1 + index * 0.13;
  const isPeak = height === 30;

  if (!enabled) {
    return <rect x={x} y={CHART_BASELINE - height} width={12} height={height} rx={1} fill={fill} />;
  }

  return (
    <motion.rect
      key={`${cycle}-${x}`}
      x={x}
      y={11}
      width={12}
      rx={1}
      fill={fill}
      initial={{ height: 0, y: CHART_BASELINE, opacity: 0.55 }}
      animate={{
        height,
        y: CHART_BASELINE - height,
        opacity: isPeak ? [0.55, 1, 1, 0.85, 1] : [0.55, 1],
      }}
      transition={{
        height: { duration: 0.5, delay: growDelay, ease: popEase },
        y: { duration: 0.5, delay: growDelay, ease: popEase },
        opacity: isPeak
          ? { duration: 2.4, delay: growDelay + 0.55, times: [0, 0.2, 0.55, 0.78, 1], ease: "easeInOut" }
          : { duration: 0.35, delay: growDelay, ease: popEase },
      }}
    />
  );
}

export function AnalyticsFlowIllustration({ className }: AnalyticsFlowIllustrationProps) {
  const prefersReducedMotion = useReducedMotion();
  const enabled = !prefersReducedMotion;
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    if (!enabled) return;
    const timer = window.setInterval(() => setCycle((current) => current + 1), CYCLE * 1000);
    return () => window.clearInterval(timer);
  }, [enabled]);

  return (
    <svg viewBox="0 0 220 160" className={className} aria-hidden xmlns="http://www.w3.org/2000/svg">
      <motion.rect
        x="20"
        y="18"
        width="180"
        height="124"
        rx="8"
        fill="#fff"
        stroke="#F7C1C1"
        strokeWidth="0.5"
        animate={enabled ? { opacity: [0.92, 1, 1, 0.92] } : undefined}
        transition={{ duration: CYCLE, repeat: Infinity, ease: "easeInOut" }}
      />
      <rect x="20" y="18" width="180" height="20" rx="8" fill="#FCEBEB" stroke="#F7C1C1" strokeWidth="0.5" />
      <rect x="20" y="30" width="180" height="8" fill="#FCEBEB" />

      {enabled ? (
        <motion.circle
          cx="30"
          cy="28"
          r="2.5"
          fill="#E85D5D"
          animate={{ opacity: [0.35, 1, 0.35], scale: [0.9, 1.1, 0.9] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
        />
      ) : (
        <circle cx="30" cy="28" r="2.5" fill="#E85D5D" />
      )}

      <text x="110" y="32" textAnchor="middle" fontSize="8" fill="#A32D2D" fontWeight="500">
        Call Analytics Dashboard
      </text>

      <motion.rect
        x="30"
        y="46"
        width="72"
        height="36"
        rx="4"
        fill="#FCEBEB"
        animate={enabled ? { opacity: [0.85, 1, 1, 0.85] } : undefined}
        transition={{ duration: CYCLE, times: [0, 0.15, 0.75, 1], repeat: Infinity, ease: "easeInOut" }}
      />
      <AnimatedMetric
        x={66}
        y={64}
        target={94}
        suffix="%"
        fill="#A32D2D"
        delay={0.2}
        cycle={cycle}
        enabled={enabled}
      />
      <text x="66" y="76" textAnchor="middle" fontSize="7" fill="#A32D2D">
        Resolution rate
      </text>

      <motion.rect
        x="118"
        y="46"
        width="72"
        height="36"
        rx="4"
        fill="#E1F5EE"
        animate={enabled ? { opacity: [0.85, 1, 1, 0.85] } : undefined}
        transition={{ duration: CYCLE, times: [0, 0.2, 0.75, 1], repeat: Infinity, ease: "easeInOut" }}
      />

      <AnimatedMetric
        x={154}
        y={64}
        target={4.8}
        suffix="★"
        decimals={1}
        fill="#085041"
        delay={0.38}
        cycle={cycle}
        enabled={enabled}
      />
      <text x="154" y="76" textAnchor="middle" fontSize="7" fill="#085041">
        Avg CSAT score
      </text>

      <rect x="30" y="90" width="160" height="40" rx="4" fill="#F8F7FF" />
      {[100, 75, 50, 25].map((pct) => (
        <line
          key={pct}
          x1="34"
          x2="186"
          y1={CHART_BASELINE - (pct / 100) * 28}
          y2={CHART_BASELINE - (pct / 100) * 28}
          stroke="#EEEDFE"
          strokeWidth="0.5"
        />
      ))}

      {BARS.map((bar, index) => (
        <ChartBar key={bar.x} {...bar} index={index} cycle={cycle} enabled={enabled} />
      ))}

      <text x="110" y="152" textAnchor="middle" fontSize="8" fill="#888780">
        Call volume — last 7 days
      </text>
    </svg>
  );
}
