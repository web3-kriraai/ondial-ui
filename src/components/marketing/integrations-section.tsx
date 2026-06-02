import Link from "next/link";

import { IntegrationsOrbitVisual } from "@/components/marketing/integrations-orbit-visual";
import { INTEGRATIONS_API_CALLOUT, INTEGRATIONS_HEADING } from "@/data/integrations";
import {
  marketingSectionBgClass,
  marketingSectionContainerClass,
} from "@/config/marketing-layout";
import { cn } from "@/lib/utils";

import styles from "./integrations-section.module.css";

export function IntegrationsSection() {
  return (
    <section
      id="integrations"
      className={cn(marketingSectionBgClass, "w-full", styles.integrationsSection)}
      aria-labelledby="integrations-title"
    >
      <div className={cn(marketingSectionContainerClass, "relative max-md:px-3")}>
        <div className={styles.composition} data-composition>
          <header className={styles.copy}>
            <p className="mx-auto mb-4 inline-block rounded-full border border-border/60 bg-transparent px-3 py-1 text-[0.6875rem] font-medium uppercase tracking-[0.12em] text-muted-foreground md:mx-0">
              {INTEGRATIONS_HEADING.eyebrow}
            </p>
            <h2
              id="integrations-title"
              className="text-center text-balance text-3xl font-semibold leading-tight tracking-tight text-foreground max-md:pt-1 sm:text-4xl md:text-left lg:text-[2.5rem]"
            >
              {INTEGRATIONS_HEADING.title}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-pretty text-center text-base leading-relaxed text-muted-foreground max-md:max-w-[21rem] sm:text-lg md:mx-0 md:max-w-xl md:text-left">
              {INTEGRATIONS_HEADING.description}
            </p>
          </header>

          <div className={styles.orbitColumn} data-orbit-column data-orbit-layer>
            <IntegrationsOrbitVisual />
          </div>
        </div>
      </div>
    </section>
  );
}
