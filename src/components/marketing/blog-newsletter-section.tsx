"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { Mail, Sparkles } from "lucide-react";
import { useRef } from "react";

import { TextReveal } from "@/components/ui/text-reveal";
import { marketingEyebrowClass } from "@/config/marketing-layout";
import { cn } from "@/lib/utils";

const easeOut = [0.22, 1, 0.36, 1] as const;

type BlogNewsletterSectionProps = {
  className?: string;
};

export function BlogNewsletterSection({ className }: BlogNewsletterSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const prefersReducedMotion = useReducedMotion();
  const show = prefersReducedMotion || inView;

  return (
    <section
      ref={ref}
      aria-labelledby="blog-newsletter-title"
      className={cn("relative w-full", className)}
    >
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, y: 28 }}
        animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
        transition={{ duration: 0.6, ease: easeOut }}
        className="relative isolate mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-[#534AB7]/15 bg-[#1a1733] p-8 text-center text-white shadow-[0_24px_64px_-28px_rgb(83_74_183/0.55)] sm:rounded-[2.75rem] sm:p-12 lg:p-14"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(ellipse 85% 70% at 50% 0%, rgb(83 74 183 / 0.35), transparent 62%), radial-gradient(ellipse 50% 40% at 100% 100%, rgb(225 245 238 / 0.08), transparent 55%)",
          }}
        />

        <MarketingDotOverlay />

        <p className={cn(marketingEyebrowClass, "mb-4 inline-flex items-center gap-1.5 border-white/15 text-white/70")}>
          <Sparkles className="size-3.5 text-[#EEEDFE]" aria-hidden strokeWidth={1.75} />
          Newsletter
        </p>

        <h2
          id="blog-newsletter-title"
          className="mx-auto mb-3 max-w-lg text-balance text-2xl font-semibold tracking-tight sm:text-3xl"
        >
          <TextReveal as="span" className="block" delay={0.05} stagger={0.05} inViewAmount={0.35}>
            Stay in the loop
          </TextReveal>
        </h2>

        <motion.p
          initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
          animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.5, ease: easeOut, delay: 0.12 }}
          className="mx-auto mb-8 max-w-md text-pretty text-sm leading-relaxed text-white/65 sm:text-base"
        >
          Get the latest insights and updates delivered straight to your inbox. No spam, just value.
        </motion.p>

        <motion.form
          initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
          animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.5, ease: easeOut, delay: 0.2 }}
          className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row sm:gap-2.5"
          onSubmit={(event) => event.preventDefault()}
        >
          <label className="sr-only" htmlFor="blog-newsletter-email">
            Email address
          </label>
          <div className="relative flex-1">
            <Mail
              className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-white/35"
              aria-hidden
            />
            <input
              id="blog-newsletter-email"
              type="email"
              placeholder="Enter your email"
              className="h-12 w-full rounded-full border border-white/15 bg-white/8 py-3 pl-11 pr-5 text-sm text-white outline-none transition-[border-color,background-color,box-shadow] duration-200 placeholder:text-white/40 focus:border-white/35 focus:bg-white/12 focus:shadow-[0_0_0_3px_rgb(255_255_255/0.08)]"
            />
          </div>
          <button
            type="submit"
            className="h-12 shrink-0 rounded-full bg-white px-8 text-sm font-semibold text-[#1a1733] transition-[transform,background-color,box-shadow] duration-200 hover:bg-[#EEEDFE] hover:shadow-[0_8px_24px_-8px_rgb(255_255_255/0.35)] active:scale-[0.98] motion-reduce:active:scale-100"
          >
            Subscribe
          </button>
        </motion.form>
      </motion.div>
    </section>
  );
}

function MarketingDotOverlay() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 text-white/10"
      style={{
        backgroundImage: "radial-gradient(circle, currentColor 1px, transparent 1px)",
        backgroundSize: "16px 16px",
        maskImage: "linear-gradient(to bottom, black 20%, transparent 95%)",
        WebkitMaskImage: "linear-gradient(to bottom, black 20%, transparent 95%)",
      }}
    />
  );
}
