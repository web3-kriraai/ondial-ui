"use client";

import { useEffect, useState } from "react";

import langStyles from "./multilingual-illustration.module.css";

const PILL_LANGUAGES: readonly (readonly string[])[] = [
  ["English", "Hindi", "Español", "Français"],
  ["Deutsch", "日本語", "한국어", "العربية"],
  ["Português", "Italiano", "Русский", "Türkçe"],
  ["中文", "Nederlands", "Polski", "Svenska"],
  ["Tiếng Việt", "ไทย", "Bahasa", "Filipino"],
  ["עברית", "Ελληνικά", "Čeština", "Dansk"],
] as const;

const PILL_POSITIONS = [
  { x: 110, y: 20 },
  { x: 184, y: 50 },
  { x: 185, y: 102 },
  { x: 110, y: 136 },
  { x: 36, y: 102 },
  { x: 38, y: 48 },
] as const;

function useTypewriterCycle(
  words: readonly string[],
  options: { typingMs?: number; eraseMs?: number; pauseMs?: number; startDelay?: number } = {},
) {
  const { typingMs = 120, eraseMs = 120, pauseMs = 1300, startDelay = 0 } = options;
  const [display, setDisplay] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isErasing, setIsErasing] = useState(false);
  const [ready, setReady] = useState(startDelay === 0);

  useEffect(() => {
    if (startDelay > 0) {
      const delayTimer = window.setTimeout(() => setReady(true), startDelay);
      return () => window.clearTimeout(delayTimer);
    }
    return undefined;
  }, [startDelay]);

  useEffect(() => {
    if (!ready) return;

    const word = words[wordIndex % words.length] ?? "";

    if (!isErasing) {
      if (display.length < word.length) {
        const timer = window.setTimeout(() => {
          setDisplay(word.slice(0, display.length + 1));
        }, typingMs);
        return () => window.clearTimeout(timer);
      }

      const timer = window.setTimeout(() => setIsErasing(true), pauseMs);
      return () => window.clearTimeout(timer);
    }

    if (display.length > 0) {
      const timer = window.setTimeout(() => {
        setDisplay(display.slice(0, -1));
      }, eraseMs);
      return () => window.clearTimeout(timer);
    }

    setIsErasing(false);
    setWordIndex((current) => (current + 1) % words.length);
    return undefined;
  }, [display, eraseMs, isErasing, pauseMs, ready, typingMs, wordIndex, words]);

  return display;
}

function LanguagePill({
  x,
  y,
  words,
  startDelay,
  lineX,
  lineY,
}: {
  x: number;
  y: number;
  words: readonly string[];
  startDelay: number;
  lineX: number;
  lineY: number;
}) {
  const label = useTypewriterCycle(words, { startDelay });
  const pillWidth = 64;

  return (
    <g>
      <line
        className={langStyles.langConnector}
        x1={lineX}
        y1={lineY}
        x2={x}
        y2={y}
        stroke="#9AC4EF"
        strokeWidth="0.75"
        strokeDasharray="3,2"
      />
      <rect
        className={langStyles.langPill}
        x={x - pillWidth / 2}
        y={y - 10}
        width={pillWidth}
        height="20"
        rx="10"
        fill="#fff"
        stroke="#9AC4EF"
        strokeWidth="0.5"
      />
      <text x={x} y={y + 3.5} textAnchor="middle" fontSize="9" fill="#0C447C" fontWeight="500">
        {label}
        <tspan className={langStyles.langCursor}>|</tspan>
      </text>
    </g>
  );
}

type MultilingualFlowIllustrationProps = {
  className?: string;
};

export function MultilingualFlowIllustration({ className }: MultilingualFlowIllustrationProps) {
  const center = { x: 110, y: 78 };

  return (
    <svg viewBox="0 0 220 160" className={className} aria-hidden xmlns="http://www.w3.org/2000/svg">
      <circle cx={center.x} cy={center.y} r="50" fill="#E6F1FB" stroke="#9AC4EF" strokeWidth="0.5" />

      <g className={langStyles.globeSpin}>
        <ellipse cx={center.x} cy={center.y} rx="24" ry="48" fill="none" stroke="#9AC4EF" strokeWidth="0.6" />
        <ellipse cx={center.x} cy={center.y} rx="38" ry="48" fill="none" stroke="#9AC4EF" strokeWidth="0.35" opacity="0.55" />
        <line x1="62" y1={center.y} x2="158" y2={center.y} stroke="#9AC4EF" strokeWidth="0.5" />
        <line x1="67" y1="58" x2="153" y2="58" stroke="#9AC4EF" strokeWidth="0.5" />
        <line x1="67" y1="98" x2="153" y2="98" stroke="#9AC4EF" strokeWidth="0.5" />
        <path
          d="M110,30 C92,46 88,62 88,78 C88,94 92,110 110,126 C128,110 132,94 132,78 C132,62 128,46 110,30 Z"
          fill="none"
          stroke="#7CB8E8"
          strokeWidth="0.45"
          opacity="0.7"
        />
        {[0, 1, 2, 3, 4].map((dot) => (
          <circle
            key={dot}
            cx={center.x - 16 + dot * 8}
            cy={center.y - 6 + (dot % 2) * 12}
            r="1.5"
            fill="#0C447C"
            opacity="0.45"
          />
        ))}
      </g>

      {PILL_POSITIONS.map((pos, index) => {
        const angleX = pos.x - center.x;
        const angleY = pos.y - center.y;
        const dist = Math.hypot(angleX, angleY) || 1;
        const lineX = center.x + (angleX / dist) * 34;
        const lineY = center.y + (angleY / dist) * 34;

        return (
          <LanguagePill
            key={index}
            x={pos.x}
            y={pos.y}
            words={PILL_LANGUAGES[index] ?? PILL_LANGUAGES[0]!}
            startDelay={index * 320}
            lineX={lineX}
            lineY={lineY}
          />
        );
      })}

      <rect
        className={langStyles.langCenterBadge}
        x="82"
        y="64"
        width="56"
        height="28"
        rx="6"
        fill="#fff"
        stroke="#9AC4EF"
        strokeWidth="0.5"
      />
      <text x="110" y="75" textAnchor="middle" fontSize="8" fill="#888780">
        100+
      </text>
      <text x="110" y="87" textAnchor="middle" fontSize="8" fill="#0C447C" fontWeight="500">
        Languages
      </text>
    </svg>
  );
}
