"use client";

import { motion, useReducedMotion } from "framer-motion";

import { TextReveal } from "@/components/ui/text-reveal";
import { marketingEyebrowClass } from "@/config/marketing-layout";
import { cn } from "@/lib/utils";

const easeOut = [0.22, 1, 0.36, 1] as const;

type BlogPageHeroProps = {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  className?: string;
  align?: "center" | "start";
};

export function BlogPageHero({
  eyebrow = "Insights & Updates",
  title,
  description,
  className,
  align = "center",
}: BlogPageHeroProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.header
      initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: easeOut }}
      className={cn(
        "flex flex-col gap-2.5 sm:gap-3",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className,
      )}
    >
      {eyebrow ? (
        <motion.span
          initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: easeOut, delay: 0.05 }}
          className={marketingEyebrowClass}
        >
          {eyebrow}
        </motion.span>
      ) : null}

      <div className={cn("w-full", align === "center" ? "max-w-4xl" : "max-w-3xl")}>
        {typeof title === "string" ? (
          <h1 className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-[2.625rem] lg:leading-tight">
            <TextReveal as="span" className="inline" delay={0.08} stagger={0.04} inViewAmount={0.2}>
              {title}
            </TextReveal>
          </h1>
        ) : (
          title
        )}
      </div>

      {description ? (
        typeof description === "string" ? (
          <p
            className={cn(
              "max-w-3xl text-balance text-[0.9375rem] leading-snug text-muted-foreground sm:text-base lg:max-w-4xl lg:text-[1.0625rem] lg:leading-relaxed",
              align === "center" && "text-center",
            )}
          >
            {description}
          </p>
        ) : (
          description
        )
      ) : null}
    </motion.header>
  );
}
