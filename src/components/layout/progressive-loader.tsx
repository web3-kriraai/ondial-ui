"use client";

import gsap from "gsap";
import { useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";

import { runLoadProgress, runNavigationProgress } from "@/lib/loading-progress";
import {
  LOADER_CLIP_FLAT,
  LOADER_CLIP_TRANSFORM,
  runLoaderExitAnimation,
} from "@/lib/loader-mask-morph";

import styles from "./progressive-loader.module.css";

const MIN_VISIBLE_MS = 1200;
const MIN_COUNTER_RAMP_MS = 2400;
const MAX_WAIT_MS = 14000;

const NAV_MIN_VISIBLE_MS = 700;
const NAV_MIN_COUNTER_RAMP_MS = 1400;
const NAV_MAX_WAIT_MS = 10000;

const COUNTER_COMPLETE_HOLD_MS = 320;

function easeOutCubic(t: number) {
  return 1 - (1 - t) ** 3;
}

export function ProgressiveLoader() {
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();
  const clipId = useId().replace(/:/g, "");
  const panelRef = useRef<HTMLDivElement>(null);
  const clipPathRef = useRef<SVGPathElement>(null);
  const exitTweenRef = useRef<gsap.core.Timeline | gsap.core.Tween | null>(null);

  const [progress, setProgress] = useState(0);
  const [barProgress, setBarProgress] = useState(0);
  const [show, setShow] = useState(true);
  const loadCountRef = useRef(0);
  const displayRef = useRef(0);
  const loadProgressRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const isNavigation = loadCountRef.current > 0;
    loadCountRef.current += 1;

    const minVisibleMs = isNavigation ? NAV_MIN_VISIBLE_MS : MIN_VISIBLE_MS;
    const minCounterRampMs = isNavigation ? NAV_MIN_COUNTER_RAMP_MS : MIN_COUNTER_RAMP_MS;
    const maxWaitMs = isNavigation ? NAV_MAX_WAIT_MS : MAX_WAIT_MS;
    const runProgress = isNavigation ? runNavigationProgress : runLoadProgress;

    setShow(true);
    setProgress(0);
    setBarProgress(0);
    displayRef.current = 0;
    loadProgressRef.current = 0;

    if (clipPathRef.current) {
      clipPathRef.current.setAttribute("d", LOADER_CLIP_FLAT);
    }
    if (panelRef.current) {
      gsap.set(panelRef.current, { opacity: 1, y: 0, yPercent: 0, force3D: true });
    }
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    let cancelled = false;
    let finishRequested = false;
    let counterComplete = false;
    let exitStarted = false;
    const startedAt = performance.now();

    const finishExit = () => {
      if (cancelled) return;
      requestAnimationFrame(() => {
        setShow(false);
        requestAnimationFrame(() => {
          document.body.style.overflow = previousOverflow;
        });
      });
    };

    const startExit = () => {
      if (cancelled || exitStarted) return;
      exitStarted = true;

      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }

      setProgress(100);
      setBarProgress(100);

      const elapsed = performance.now() - startedAt;
      const waitBeforeExit = Math.max(0, minVisibleMs - elapsed);

      window.setTimeout(() => {
        if (cancelled) return;

        const useCurvyExit =
          !prefersReducedMotion && clipPathRef.current !== null && panelRef.current !== null;

        if (useCurvyExit) {
          exitTweenRef.current = runLoaderExitAnimation(
            clipPathRef.current!,
            panelRef.current!,
            finishExit,
          );
          return;
        }

        const panel = panelRef.current;
        if (panel) {
          exitTweenRef.current = gsap.to(panel, {
            yPercent: -100,
            duration: 0.75,
            ease: "power2.inOut",
            onComplete: finishExit,
          });
        } else {
          finishExit();
        }
      }, waitBeforeExit);
    };

    const requestHide = () => {
      if (cancelled || !counterComplete) return;
      window.setTimeout(startExit, COUNTER_COMPLETE_HOLD_MS);
    };

    const tick = () => {
      const elapsed = performance.now() - startedAt;
      const timeCap = easeOutCubic(Math.min(1, elapsed / minCounterRampMs)) * 96;
      const loadCap = loadProgressRef.current;

      let target = Math.max(timeCap, loadCap);
      if (finishRequested) {
        target = 100;
      } else {
        target = Math.min(target, 99);
      }

      const current = displayRef.current;
      const delta = target - current;
      let next = current;

      if (Math.abs(delta) < 0.15) {
        next = target;
      } else {
        const step = Math.max(0.22, Math.min(delta * 0.11, 1.35));
        next = current + step;
      }

      displayRef.current = next;
      const rounded = Math.min(100, Math.round(next));
      setProgress(rounded);
      setBarProgress(Math.min(100, next));

      if (finishRequested && rounded >= 100 && !counterComplete) {
        counterComplete = true;
        requestHide();
      }

      if (!cancelled && !exitStarted) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    rafRef.current = requestAnimationFrame(tick);

    const finish = () => {
      if (cancelled || finishRequested) return;
      finishRequested = true;
      loadProgressRef.current = 100;
    };

    void runProgress((value) => {
      loadProgressRef.current = value;
    })
      .then(finish)
      .catch(finish);

    const timeoutId = window.setTimeout(finish, maxWaitMs);

    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
      exitTweenRef.current?.kill();
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
      document.body.style.overflow = previousOverflow;
    };
  }, [pathname, prefersReducedMotion]);

  if (!show) {
    return null;
  }

  return (
    <div className={styles.viewport}>
      <svg className={styles.clipDefs} aria-hidden>
        <defs>
          <clipPath id={clipId} clipPathUnits="objectBoundingBox" transform={LOADER_CLIP_TRANSFORM}>
            <path ref={clipPathRef} d={LOADER_CLIP_FLAT} />
          </clipPath>
        </defs>
      </svg>

      <div
        ref={panelRef}
        className={styles.panel}
        style={{
          clipPath: `url(#${clipId})`,
          WebkitClipPath: `url(#${clipId})`,
        }}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={progress}
        aria-busy
        aria-label="Loading page"
      >
        <div className={styles.footer}>
          <div className={styles.bottomRow}>
            <span className={styles.counter}>{progress}</span>
          </div>
          <div className={styles.progressTrack} aria-hidden>
            <div
              className={styles.progressFill}
              style={{ transform: `scaleX(${barProgress / 100})` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
