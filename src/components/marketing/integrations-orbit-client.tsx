"use client";

import { useEffect, useRef, useState } from "react";

import { IntegrationsOrbitVisual } from "@/components/marketing/integrations-orbit-visual";
import { cn } from "@/lib/utils";

import styles from "./integrations-section.module.css";

type IntegrationsOrbitClientProps = {
  className?: string;
};

/** Defers orbit partner SVG fetches until the section nears the viewport. */
export function IntegrationsOrbitClient({ className }: IntegrationsOrbitClientProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "240px 0px 120px 0px", threshold: 0.01 },
    );

    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={rootRef}
      className={cn(styles.orbitLazyRoot, className)}
      data-orbit-lazy={shouldLoad ? "loaded" : "pending"}
      aria-hidden={!shouldLoad}
    >
      {shouldLoad ? <IntegrationsOrbitVisual /> : null}
    </div>
  );
}
