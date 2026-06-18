"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

const easeOut = [0.22, 1, 0.36, 1] as const;

type BlogArticleMotionProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
};

export function BlogArticleMotion({ children, delay = 0, className }: BlogArticleMotionProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: easeOut, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
