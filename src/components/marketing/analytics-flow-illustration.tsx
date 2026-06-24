"use client";

import { useEffect, useRef, useState } from "react";

import styles from "./analytics-illustration.module.css";

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

const BAR_CLASSES = [
  styles.anltBar1,
  styles.anltBar2,
  styles.anltBar3,
  styles.anltBar4,
  styles.anltBar5,
  styles.anltBar6,
  styles.anltBar7,
] as const;

const CYCLE_MS = 6000;
const COUNT_START_RATIO = 0.18;
const COUNT_DURATION_MS = 1050;

/** Counts 0 → target each illustration loop, synced with `.anlt*` CSS keyframes. */
function useCountUp(target: number, decimals: number, active: boolean) {
  const [value, setValue] = useState(0);
  const rafRef = useRef<number>(0);
  const originRef = useRef<number | null>(null);

  useEffect(() => {
    if (!active) {
      setValue(0);
      originRef.current = null;
      return;
    }

    const countStartMs = CYCLE_MS * COUNT_START_RATIO;

    const tick = (now: number) => {
      if (originRef.current === null) originRef.current = now;

      const cycleElapsed = (now - originRef.current) % CYCLE_MS;

      if (cycleElapsed < countStartMs) {
        setValue(0);
      } else {
        const countElapsed = cycleElapsed - countStartMs;
        const progress = Math.min(countElapsed / COUNT_DURATION_MS, 1);
        const eased = 1 - (1 - progress) ** 3;
        const next = eased * target;
        setValue(decimals > 0 ? Number(next.toFixed(decimals)) : Math.round(next));
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      originRef.current = null;
    };
  }, [target, decimals, active]);

  return value;
}

export function AnalyticsFlowIllustration({ className }: { className?: string }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = svgRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.25 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const resolution = useCountUp(94, 0, inView);
  const csat = useCountUp(4.8, 1, inView);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 220 160"
      className={className}
      aria-hidden
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* ── Card shell ── */}
      <rect
        x="20" y="18" width="180" height="124" rx="8"
        fill="#fff" stroke="#F7C1C1" strokeWidth="0.5"
        className={styles.anltCard}
      />

      {/* ── Header bar ── */}
      <rect x="20" y="18" width="180" height="20" rx="8" fill="#FCEBEB" stroke="#F7C1C1" strokeWidth="0.5" />
      <rect x="20" y="30" width="180" height="8" fill="#FCEBEB" />
      <circle cx="30" cy="28" r="2.5" fill="#E85D5D" className={styles.anltDot} />
      <text x="110" y="32" textAnchor="middle" fontSize="8" fill="#A32D2D" fontWeight="500">
        Call Analytics Dashboard
      </text>

      {/* ── Resolution rate metric ── */}
      <rect x="30" y="46" width="72" height="36" rx="4" fill="#FCEBEB" className={styles.anltMetric1} />
      <text
        x="66" y="64"
        textAnchor="middle" fontSize="18" fill="#A32D2D" fontWeight="500"
        className={styles.anltMetricVal}
      >
        {resolution}%
      </text>
      <text x="66" y="76" textAnchor="middle" fontSize="7" fill="#A32D2D">Resolution rate</text>

      {/* ── CSAT metric ── */}
      <rect x="118" y="46" width="72" height="36" rx="4" fill="#E1F5EE" className={styles.anltMetric2} />
      <text
        x="154" y="64"
        textAnchor="middle" fontSize="18" fill="#085041" fontWeight="500"
        className={styles.anltMetricVal}
      >
        {csat.toFixed(1)}★
      </text>
      <text x="154" y="76" textAnchor="middle" fontSize="7" fill="#085041">Avg CSAT score</text>

      {/* ── Chart grid ── */}
      <rect x="30" y="90" width="160" height="40" rx="4" fill="#F8F7FF" />
      {[100, 75, 50, 25].map((pct) => (
        <line
          key={pct}
          x1="34" x2="186"
          y1={CHART_BASELINE - (pct / 100) * 28}
          y2={CHART_BASELINE - (pct / 100) * 28}
          stroke="#EEEDFE" strokeWidth="0.5"
        />
      ))}

      {/* ── Chart bars ── */}
      {BARS.map((bar, i) => (
        <rect
          key={bar.x}
          className={BAR_CLASSES[i]}
          x={bar.x}
          y={CHART_BASELINE - bar.height}
          width={12}
          height={bar.height}
          rx={1}
          fill={bar.fill}
        />
      ))}

      <text x="110" y="152" textAnchor="middle" fontSize="8" fill="#888780">
        Call volume - last 7 days
      </text>
    </svg>
  );
}
