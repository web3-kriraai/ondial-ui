"use client";

import { AppLink as Link } from "@/components/ui/app-link";
import dynamic from "next/dynamic";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type RefObject,
} from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { drawerEase } from "@/components/layout/site-navbar-styles";
import { DASHBOARD_LOGIN_URL, DASHBOARD_SIGNUP_URL } from "@/config/urls";
import { APP_NAME } from "@/lib/constants";
import { cn } from "@/lib/utils";

/** Lazy chunk — Three.js stays out of the initial site bundle. */
const PerspectiveMediaGrid = dynamic(
  () =>
    import("@/components/engagement/perspective-media-grid").then(
      (module) => module.PerspectiveMediaGrid,
    ),
  { ssr: false },
);

/** First open after load, and reopen after every dismiss — strictly 30s. */
const SHOW_DELAY_MS = 30_000;
/** Start warming Three + images shortly after load, well before first open. */
const PRELOAD_AFTER_MS = 2_000;

const LEGACY_STORAGE_KEYS = [
  "ondial-login-engagement-snooze-v3",
  "ondial-login-engagement-snooze-v2",
  "ondial-login-engagement-snooze-until",
  "ondial-login-engagement-dismissed",
] as const;

type LoginEngagementModalProps = {
  scrollerRef: RefObject<HTMLDivElement | null>;
  enabled?: boolean;
};

function clearLegacyDismissKeys() {
  try {
    for (const key of LEGACY_STORAGE_KEYS) {
      window.localStorage.removeItem(key);
    }
  } catch {
    // Ignore quota / private-mode failures.
  }
}

function preloadEngagementAssets() {
  void import("@/components/engagement/perspective-media-grid").then((module) =>
    module.preloadPerspectiveMediaGrid(),
  );
}

export function LoginEngagementModal({
  scrollerRef,
  enabled = true,
}: LoginEngagementModalProps) {
  const titleId = useId();
  const descriptionId = useId();
  const prefersReducedMotion = useReducedMotion();
  const primaryActionRef = useRef<HTMLAnchorElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const overflowRestoreRef = useRef<string | null>(null);
  const openTimerRef = useRef<number | null>(null);
  const preloadTimerRef = useRef<number | null>(null);

  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  /** Keep the WebGL scene mounted after the first open so reopen is cheap. */
  const [keepEngine, setKeepEngine] = useState(false);

  const clearOpenTimer = useCallback(() => {
    if (openTimerRef.current !== null) {
      window.clearTimeout(openTimerRef.current);
      openTimerRef.current = null;
    }
  }, []);

  const scheduleOpen = useCallback(
    (delayMs = SHOW_DELAY_MS) => {
      if (!enabled) return;
      clearOpenTimer();
      openTimerRef.current = window.setTimeout(() => {
        openTimerRef.current = null;
        setKeepEngine(true);
        setOpen(true);
      }, delayMs);
    },
    [clearOpenTimer, enabled],
  );

  const dismissAndReschedule = useCallback(() => {
    setOpen(false);
    scheduleOpen(SHOW_DELAY_MS);
  }, [scheduleOpen]);

  const closeForNavigation = useCallback(() => {
    clearOpenTimer();
    setOpen(false);
  }, [clearOpenTimer]);

  // Mount + preload during delay + first open strictly 30s after window load.
  useEffect(() => {
    clearLegacyDismissKeys();

    const mountFrame = window.requestAnimationFrame(() => {
      setMounted(true);
    });

    if (!enabled) {
      clearOpenTimer();
      const closeFrame = window.setTimeout(() => setOpen(false), 0);
      return () => {
        window.cancelAnimationFrame(mountFrame);
        window.clearTimeout(closeFrame);
        clearOpenTimer();
        if (preloadTimerRef.current !== null) {
          window.clearTimeout(preloadTimerRef.current);
        }
      };
    }

    let cancelled = false;

    const beginSession = () => {
      if (cancelled) return;

      preloadTimerRef.current = window.setTimeout(() => {
        preloadTimerRef.current = null;
        if (!cancelled) preloadEngagementAssets();
      }, PRELOAD_AFTER_MS);

      scheduleOpen(SHOW_DELAY_MS);
    };

    if (document.readyState === "complete") {
      beginSession();
    } else {
      window.addEventListener("load", beginSession, { once: true });
    }

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(mountFrame);
      window.removeEventListener("load", beginSession);
      clearOpenTimer();
      if (preloadTimerRef.current !== null) {
        window.clearTimeout(preloadTimerRef.current);
        preloadTimerRef.current = null;
      }
    };
  }, [enabled, scheduleOpen, clearOpenTimer]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        dismissAndReschedule();
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;

      const focusable = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      );
      const first = focusable[0];
      const last = focusable.at(-1);
      if (!first || !last) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, dismissAndReschedule]);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!open || !scroller) return;

    if (overflowRestoreRef.current === null) {
      overflowRestoreRef.current = scroller.style.overflowY;
    }
    scroller.style.overflowY = "hidden";

    return () => {
      if (overflowRestoreRef.current !== null) {
        scroller.style.overflowY = overflowRestoreRef.current;
        overflowRestoreRef.current = null;
      }
    };
  }, [open, scrollerRef]);

  useEffect(() => {
    if (!open) return;
    const id = window.requestAnimationFrame(() => {
      primaryActionRef.current?.focus({ preventScroll: true });
    });
    return () => window.cancelAnimationFrame(id);
  }, [open]);

  if (!mounted || !enabled) return null;

  const showShell = open || keepEngine;

  const panelTransition = prefersReducedMotion
    ? { duration: 0.01 }
    : { duration: 0.42, ease: drawerEase };

  const backdropTransition = prefersReducedMotion
    ? { duration: 0.01 }
    : { duration: 0.28, ease: drawerEase };

  return createPortal(
    <div
      className={cn(
        "fixed inset-0 z-120 flex items-end justify-center sm:items-center sm:p-4",
        !open && "pointer-events-none invisible",
      )}
      aria-hidden={!open}
    >
      <AnimatePresence>
        {open ? (
          <motion.button
            key="login-engagement-backdrop"
            type="button"
            tabIndex={-1}
            aria-label="Dismiss login prompt"
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={prefersReducedMotion ? undefined : { opacity: 0 }}
            transition={backdropTransition}
            className="absolute inset-0 cursor-pointer bg-black/45 backdrop-blur-[3px]"
            onClick={dismissAndReschedule}
          />
        ) : null}
      </AnimatePresence>

      {showShell ? (
        <motion.div
          ref={panelRef}
          role={open ? "dialog" : undefined}
          aria-modal={open ? true : undefined}
          aria-labelledby={open ? titleId : undefined}
          aria-describedby={open ? descriptionId : undefined}
          initial={false}
          animate={
            open
              ? { opacity: 1, y: 0 }
              : prefersReducedMotion
                ? { opacity: 0 }
                : { opacity: 0, y: "40%" }
          }
          transition={panelTransition}
          className={cn(
            "relative z-10 isolate h-[min(92dvh,42rem)] w-full max-w-[min(94vw,70rem)] overflow-hidden",
            "rounded-t-[1.75rem] border border-white/80 bg-white shadow-[0_-12px_48px_-12px_rgba(0,0,0,0.35)]",
            "sm:h-[min(86dvh,42rem)] sm:rounded-[1.75rem] sm:shadow-[0_28px_80px_-24px_rgba(0,0,0,0.4)]",
            !open && "pointer-events-none",
          )}
        >
          <div className="absolute inset-0 bg-white">
            <PerspectiveMediaGrid
              active={open}
              reduceMotion={Boolean(prefersReducedMotion)}
              aria-label="A perspective gallery of OnDial experiences"
            />
          </div>

          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_48%_48%_at_50%_50%,rgb(255_255_255/0.96)_0%,rgb(255_255_255/0.82)_38%,rgb(255_255_255/0.12)_72%,transparent_100%)]"
          />

          <div className="absolute inset-0 z-10 flex items-center justify-center overflow-y-auto px-5 py-20 sm:px-8">
            <div className="flex w-full max-w-xl flex-col items-center text-center">
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#534AB7] sm:text-[11px]">
                Your calls. Your AI team.
              </p>
              <h2
                id={titleId}
                className="text-balance text-[2.45rem] font-semibold leading-[0.88] tracking-[-0.065em] text-black sm:text-5xl lg:text-[4.25rem]"
              >
                Never miss
                <br />
                <span className="text-[#534AB7]">another call.</span>
              </h2>
              <p
                id={descriptionId}
                className="mt-5 max-w-md text-pretty text-sm leading-relaxed text-black/55 sm:text-base"
              >
                Log in to build, launch, and improve AI voice agents that work around the
                clock.
              </p>

              <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row sm:gap-5">
                <Link
                  ref={primaryActionRef}
                  href={DASHBOARD_LOGIN_URL}
                  prefetch={false}
                  onClick={closeForNavigation}
                  tabIndex={open ? 0 : -1}
                  className={cn(
                    "inline-flex h-11 cursor-pointer items-center justify-center gap-1.5 rounded-full px-7",
                    "bg-black text-sm font-semibold text-white",
                    "transition-[transform,background-color,box-shadow] duration-200",
                    "hover:bg-[#534AB7] hover:shadow-[0_12px_28px_-12px_rgb(83_74_183/0.7)]",
                    "active:scale-[0.98] motion-reduce:active:scale-100",
                    "outline-none focus-visible:ring-2 focus-visible:ring-black/40 focus-visible:ring-offset-2",
                  )}
                >
                  Log in
                  <ArrowRight className="size-4" aria-hidden />
                </Link>
                <Link
                  href={DASHBOARD_SIGNUP_URL}
                  prefetch={false}
                  onClick={closeForNavigation}
                  tabIndex={open ? 0 : -1}
                  className="inline-flex h-10 cursor-pointer items-center gap-1 text-sm font-semibold text-black transition-opacity hover:opacity-55 focus-visible:rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/30 focus-visible:ring-offset-4"
                >
                  Start free trial
                  <ArrowRight className="size-3.5" aria-hidden />
                </Link>
              </div>

              <button
                type="button"
                onClick={dismissAndReschedule}
                tabIndex={open ? 0 : -1}
                className="mt-5 cursor-pointer text-[11px] font-medium text-black/40 transition-colors hover:text-black/70"
              >
                Maybe later
              </button>
            </div>
          </div>
        </motion.div>
      ) : null}
    </div>,
    document.body,
  );
}
