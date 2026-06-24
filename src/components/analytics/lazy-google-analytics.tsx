"use client";

import { useEffect, useRef } from "react";

import { useLoaderComplete } from "@/components/providers/loader-context";

const GA_MEASUREMENT_ID = "G-S0BEQDE207";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function installGtagStub() {
  window.dataLayer = window.dataLayer ?? [];
  if (window.gtag) return;

  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer?.push(args);
  };
}

/**
 * Defers gtag.js until after the intro loader finishes and the main thread is idle.
 * Keeps GA enabled without competing with LCP the way eager <head> scripts do.
 */
export function LazyGoogleAnalytics() {
  const isLoaderComplete = useLoaderComplete();
  const loadedRef = useRef(false);

  useEffect(() => {
    installGtagStub();
  }, []);

  useEffect(() => {
    if (!isLoaderComplete || loadedRef.current) return;

    const loadAnalytics = () => {
      if (loadedRef.current) return;
      loadedRef.current = true;

      const script = document.createElement("script");
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
      script.async = true;
      script.onload = () => {
        window.gtag?.("js", new Date());
        window.gtag?.("config", GA_MEASUREMENT_ID);
      };
      document.head.appendChild(script);
    };

    let idleHandle: number | null = null;

    const cancelIdle = () => {
      if (idleHandle === null) return;
      if (typeof cancelIdleCallback !== "undefined" && typeof idleHandle === "number") {
        cancelIdleCallback(idleHandle);
      } else {
        window.clearTimeout(idleHandle);
      }
      idleHandle = null;
    };

    const onInteraction = () => {
      removeInteractionListeners();
      cancelIdle();
      loadAnalytics();
    };

    const removeInteractionListeners = () => {
      window.removeEventListener("pointerdown", onInteraction);
      window.removeEventListener("keydown", onInteraction);
      window.removeEventListener("scroll", onInteraction, true);
    };

    window.addEventListener("pointerdown", onInteraction, { passive: true });
    window.addEventListener("keydown", onInteraction, { passive: true });
    window.addEventListener("scroll", onInteraction, { passive: true, capture: true });

    idleHandle =
      typeof requestIdleCallback !== "undefined"
        ? requestIdleCallback(() => loadAnalytics(), { timeout: 2000 })
        : window.setTimeout(loadAnalytics, 2000);

    return () => {
      removeInteractionListeners();
      cancelIdle();
    };
  }, [isLoaderComplete]);

  return null;
}
