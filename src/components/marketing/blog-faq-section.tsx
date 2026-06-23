"use client";

import { AnimatePresence, motion, useInView, useReducedMotion, type Variants } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useId, useRef, useState } from "react";

import { useLoaderComplete } from "@/components/providers/loader-context";
import type { BlogFaqSection as BlogFaqSectionType } from "@/lib/blog/types";
import { cn } from "@/lib/utils";

const easeOut = [0.22, 1, 0.36, 1] as const;

const listVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.08,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.48, ease: easeOut },
  },
};

type BlogFaqSectionProps = {
  faqs: BlogFaqSectionType;
};

export function BlogFaqSection({ faqs }: BlogFaqSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const baseId = useId();
  const loaderComplete = useLoaderComplete();
  const inView = useInView(sectionRef, { once: true, amount: 0.12 });
  const prefersReducedMotion = useReducedMotion();
  const show = loaderComplete && (prefersReducedMotion || inView);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section ref={sectionRef} className="mt-16 border-t border-border/35 pt-12 sm:mt-20 sm:pt-16">
      <div className="flex flex-col items-center text-center mb-10 max-w-2xl mx-auto">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-black/[0.06] bg-black/[0.015] px-3.5 py-1.5 text-xs font-medium text-muted-foreground mb-4">
          <ChevronDown className="size-3.5 text-[#534AB7] rotate-180" />
          AI Voice Agent FAQs
        </span>
        <h2 className="text-2xl font-bold leading-tight tracking-tight text-foreground sm:text-3xl md:text-[2.25rem] mb-4">
          Frequently Asked Questions About <span className="block sm:inline text-[#534AB7]">AI Voice Agents</span>
        </h2>
        <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
          Get comprehensive answers to common questions about AI voice agents and how they can transform your customer service.
        </p>
        <div className="h-0.5 w-16 bg-[#534AB7]/40 rounded-full mt-6" />
      </div>

      <motion.div
        className="flex flex-col gap-3"
        variants={listVariants}
        initial="hidden"
        animate={show ? "visible" : "hidden"}
      >
        {faqs.items.map((item, index) => {
          const isOpen = openIndex === index;
          const panelId = `${baseId}-panel-${index}`;
          const triggerId = `${baseId}-trigger-${index}`;

          return (
            <motion.div
              key={item.question}
              variants={itemVariants}
              className={cn(
                "overflow-hidden rounded-2xl border shadow-[0_1px_2px_rgb(15_23_42/0.04)] backdrop-blur-sm transition-[border-color,background-color,box-shadow] duration-300",
                isOpen
                  ? "border-[#534AB7]/25 bg-white/80 shadow-[0_8px_24px_-16px_rgb(83_74_183/0.2)]"
                  : "border-border/45 bg-white/45 hover:border-border/65 hover:bg-white/60",
              )}
            >
              <button
                type="button"
                id={triggerId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className={cn(
                  "flex w-full cursor-pointer items-center justify-between gap-4 px-4 py-4 text-left sm:px-5 sm:py-[1.125rem]",
                  "rounded-2xl transition-colors duration-200",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#534AB7]/35 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
                )}
              >
                <span className="text-sm font-medium leading-snug text-foreground sm:text-[0.9375rem]">
                  {item.question}
                </span>

                <motion.span
                  aria-hidden
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={
                    prefersReducedMotion
                      ? { duration: 0 }
                      : { type: "spring", stiffness: 360, damping: 26 }
                  }
                  className={cn(
                    "flex size-8 shrink-0 items-center justify-center rounded-full border transition-colors duration-200",
                    isOpen
                      ? "border-[#534AB7]/25 bg-[#534AB7]/10 text-[#534AB7]"
                      : "border-border/50 bg-background/80 text-muted-foreground",
                  )}
                >
                  <ChevronDown className="size-4" strokeWidth={2.25} />
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen ? (
                  <motion.div
                    id={panelId}
                    role="region"
                    aria-labelledby={triggerId}
                    initial={prefersReducedMotion ? false : { height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={prefersReducedMotion ? undefined : { height: 0, opacity: 0 }}
                    transition={{ duration: 0.34, ease: easeOut }}
                    className="overflow-hidden"
                  >
                    <motion.p
                      initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={prefersReducedMotion ? undefined : { opacity: 0, y: 4 }}
                      transition={{ duration: 0.28, ease: easeOut, delay: prefersReducedMotion ? 0 : 0.04 }}
                      className="cursor-default px-4 pb-4 whitespace-pre-line text-sm leading-relaxed text-muted-foreground sm:px-5 sm:pb-5"
                    >
                      {item.answer}
                    </motion.p>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
