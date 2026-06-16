"use client";

import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView, useReducedMotion, type Variants } from "framer-motion";
import { useRef } from "react";

import { ONDIAL_ACCENT_STYLE } from "@/components/marketing/split-screen-section";
import { TextReveal } from "@/components/ui/text-reveal";
import {
  marketingSectionContainerClass,
  marketingSectionShellClass,
} from "@/config/marketing-layout";
import {
  NEWS_UPDATE_ITEMS,
  NEWS_UPDATES_HEADING,
  NEWS_UPDATES_IMAGES,
  type NewsUpdateItem,
} from "@/data/news-customer-success-stories-content";
import { cn } from "@/lib/utils";

const easeOut = [0.22, 1, 0.36, 1] as const;

const listVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.08 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.48, ease: easeOut },
  },
};

const imageVariants: Variants = {
  hidden: { opacity: 0, y: 24, rotate: 0 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.62, ease: easeOut },
  },
};

function UpdateItem({ item }: { item: NewsUpdateItem }) {
  return (
    <motion.li variants={itemVariants} className="list-none">
      <article className="max-w-xl">
        <span
          className={cn(
            "inline-flex rounded-full border border-[#534AB7]/35 px-3 py-1",
            "text-xs font-semibold text-[#534AB7]",
          )}
        >
          {item.date}
        </span>
        <h3 className="m-0 mt-3 text-lg font-semibold tracking-tight text-foreground sm:text-xl">
          {item.title}
        </h3>
        <p className="m-0 mt-2 text-sm leading-relaxed text-muted-foreground sm:text-[0.9375rem] sm:leading-[1.65]">
          {item.description}
        </p>
      </article>
    </motion.li>
  );
}

export function NewsProductUpdateSection() {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const sectionInView = useInView(sectionRef, { once: true, amount: 0.12 });
  const show = prefersReducedMotion || sectionInView;

  return (
    <section
      id="news-updates"
      className={cn(marketingSectionShellClass, "bg-background")}
      style={ONDIAL_ACCENT_STYLE}
      aria-labelledby="news-updates-title"
    >
      <div className={marketingSectionContainerClass}>
        <div
          ref={sectionRef}
          className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:gap-14 xl:grid-cols-[minmax(0,1fr)_minmax(0,30rem)] xl:gap-20"
        >
          <div>
            <h2
              id="news-updates-title"
              className="m-0 text-[clamp(2rem,4.5vw,2.75rem)] font-semibold tracking-tight text-foreground"
            >
              <TextReveal as="span" className="block" delay={0.05} stagger={0.06} inViewAmount={0.45}>
                {NEWS_UPDATES_HEADING.title}
              </TextReveal>
            </h2>

            <motion.ul
              className="m-0 mt-8 flex list-none flex-col gap-8 p-0 sm:mt-10 sm:gap-10"
              variants={listVariants}
              initial="hidden"
              animate={show ? "visible" : "hidden"}
            >
              {NEWS_UPDATE_ITEMS.map((item) => (
                <UpdateItem key={item.id} item={item} />
              ))}
            </motion.ul>

            <Link
              href={NEWS_UPDATES_HEADING.ctaHref}
              className={cn(
                "mt-8 inline-flex items-center gap-1 text-sm font-semibold text-[#534AB7] no-underline",
                "transition-opacity duration-300 hover:opacity-70 sm:mt-10",
              )}
            >
              {NEWS_UPDATES_HEADING.ctaLabel}
              <ChevronRight className="size-4" aria-hidden />
            </Link>
          </div>

          <div className="relative mx-auto w-full max-w-md lg:mx-0 lg:max-w-none">
            <motion.div
              variants={imageVariants}
              initial="hidden"
              animate={show ? "visible" : "hidden"}
              className="relative aspect-5/6 w-full"
            >
              <div
                className={cn(
                  "absolute left-[0%] top-[0%] z-0 w-[72%] overflow-hidden rounded-2xl",
                  "shadow-[0_24px_48px_-20px_rgb(15_23_42/0.28)]",
                  prefersReducedMotion ? "rotate-2" : "rotate-2 transition-transform duration-500 hover:rotate-1",
                )}
              >
                <Image
                  src={NEWS_UPDATES_IMAGES.primary}
                  alt={NEWS_UPDATES_IMAGES.primaryAlt}
                  width={640}
                  height={480}
                  className="h-auto w-full object-cover"
                />
              </div>

              <div
                className={cn(
                  "absolute bottom-[0%] right-[0%] z-10 w-[68%] overflow-hidden rounded-2xl",
                  "shadow-[0_20px_40px_-18px_rgb(15_23_42/0.22)]",
                  prefersReducedMotion ? "-rotate-3" : "-rotate-3 transition-transform duration-500 hover:-rotate-2",
                )}
              >
                <Image
                  src={NEWS_UPDATES_IMAGES.secondary}
                  alt={NEWS_UPDATES_IMAGES.secondaryAlt}
                  width={600}
                  height={450}
                  className="h-auto w-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
