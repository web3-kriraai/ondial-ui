"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type FaqAccordionPanelProps = {
  isOpen: boolean;
  panelId: string;
  triggerId: string;
  className?: string;
  children: ReactNode;
};

/**
 * Always renders FAQ answer content in the DOM for SSR/SEO.
 * Collapsed state is handled visually via height/opacity — content stays in HTML source.
 */
export function FaqAccordionPanel({
  isOpen,
  panelId,
  triggerId,
  className,
  children,
}: FaqAccordionPanelProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      id={panelId}
      role="region"
      aria-labelledby={triggerId}
      aria-hidden={!isOpen}
      initial={false}
      animate={{
        height: isOpen ? "auto" : 0,
        opacity: prefersReducedMotion ? 1 : isOpen ? 1 : 0,
      }}
      transition={{
        duration: prefersReducedMotion ? 0 : 0.32,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn("overflow-hidden", className)}
    >
      {children}
    </motion.div>
  );
}
