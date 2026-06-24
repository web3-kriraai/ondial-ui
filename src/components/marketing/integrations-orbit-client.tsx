"use client";

import { IntegrationsOrbitVisual } from "@/components/marketing/integrations-orbit-visual";
import { cn } from "@/lib/utils";

import styles from "./integrations-section.module.css";

type IntegrationsOrbitClientProps = {
  className?: string;
};

export function IntegrationsOrbitClient({ className }: IntegrationsOrbitClientProps) {
  return (
    <div className={cn(styles.orbitLazyRoot, className)} data-orbit-lazy="loaded">
      <IntegrationsOrbitVisual />
    </div>
  );
}
