"use client";

import type { IndustryHeroContent } from "@/data/industry-hero-content";
import { Globe } from "lucide-react";
import { Bebas_Neue } from "next/font/google";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import type { CSSProperties } from "react";

import { useLoaderComplete } from "@/components/providers/loader-context";
import styles from "./industry-hero-header.module.css";

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-bebas-neue",
});

type IndustryHeroHeaderProps = IndustryHeroContent;

const ease = [0.22, 1, 0.36, 1] as const;

const variants = {
  bg: {
    hidden: { opacity: 1, scale: 1.07 },
    visible: { opacity: 1, scale: 1, transition: { duration: 1.4, ease } },
  },
  title: {
    hidden: { opacity: 0, y: -90, scale: 1.06 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { delay: 0.3, duration: 0.75, ease } },
  },
  fg: {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { delay: 0.65, duration: 0.9, ease } },
  },
  content: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { delay: 0.9, duration: 0.6, ease } },
  },
};

/** Parallax depth config - positive = follows cursor, negative = opposes */
const DEPTH = {
  bg: { x: -22, y: -13 },
  title: { x: 16, y: 9 },
  fg: { x: 10, y: 6 },
  content: { x: 6, y: 4 },
};

const SPRING = { stiffness: 28, damping: 22, mass: 1.4 };

export function IndustryHeroHeader({
  title,
  highlight,
  subtitle,
  backgroundImage,
  foregroundImage,
}: IndustryHeroHeaderProps) {
  const loaderDone = useLoaderComplete();
  const animateState = loaderDone ? "visible" : "hidden";

  /* Normalised mouse position: -1 … +1 relative to article centre */
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springX = useSpring(rawX, SPRING);
  const springY = useSpring(rawY, SPRING);

  /* Per-layer derived transforms */
  const bgX = useTransform(springX, v => v * DEPTH.bg.x);
  const bgY = useTransform(springY, v => v * DEPTH.bg.y);
  const titleX = useTransform(springX, v => v * DEPTH.title.x);
  const titleY = useTransform(springY, v => v * DEPTH.title.y);
  const fgX = useTransform(springX, v => v * DEPTH.fg.x);
  const fgY = useTransform(springY, v => v * DEPTH.fg.y);
  const contentX = useTransform(springX, v => v * DEPTH.content.x);
  const contentY = useTransform(springY, v => v * DEPTH.content.y);

  function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    rawX.set(((e.clientX - left) / width - 0.5) * 2);
    rawY.set(((e.clientY - top) / height - 0.5) * 2);
  }

  function handleMouseLeave() {
    rawX.set(0);
    rawY.set(0);
  }

  return (
    <section className={`relative w-full flex justify-center px-4 sm:px-6 pb-10 mt-[calc(-1*(env(safe-area-inset-top)+4.25rem))] ${bebasNeue.variable}`}>
      <div className="relative w-full max-w-full md:max-w-[85vw] xl:max-w-[60vw] h-[65vh] md:h-[60vh] min-h-[380px]" style={{ marginTop: "calc(env(safe-area-inset-top) + 4.25rem + 1.5rem)" }}>

        <article
          className="absolute inset-0 overflow-hidden rounded-3xl [clip-path:inset(0_round_1.5rem)]"
          aria-label={`${highlight} hero`}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {/* 1 - Background: parallax deep layer + entrance fade/zoom */}
          <motion.div
            style={{ x: bgX, y: bgY }}
            className="absolute inset-[-3%] w-[106%] h-[106%]"
          >
            <motion.img
              src={backgroundImage}
              alt={`${title} industry background`}
              draggable={false}
              variants={variants.bg}
              initial="hidden"
              animate={animateState}
              className="absolute inset-0 w-full h-full object-cover object-[center_40%] select-none pointer-events-none filter-[saturate(1.3)_brightness(0.95)]"
            />
          </motion.div>

          {/* 2 - Title: entrance only, no parallax */}
          <motion.p
            variants={variants.title}
            initial="hidden"
            animate={animateState}
            className="absolute left-1/2 top-[18%] w-[88%] m-0 -translate-x-1/2 -translate-y-1/2 uppercase text-white text-center wrap-break-word leading-[1.05] [text-shadow:0_2px_18px_rgba(0,0,0,0.45)] text-[clamp(2.5rem,8vw,8rem)] pointer-events-none"
            style={{ fontFamily: "var(--font-bebas-neue), 'Bebas Neue', sans-serif" }}
          >
            {title}
          </motion.p>

          {/* 3 - Foreground: parallax close layer + rises-up entrance (renders after title → on top) */}
          {foregroundImage && (
            <motion.div
              style={{ x: fgX, y: fgY }}
              className="absolute inset-[-2%] w-[104%] h-[104%]"
            >
              <motion.img
                src={foregroundImage}
                alt={`${title} industry foreground illustration`}
                draggable={false}
                variants={variants.fg}
                initial="hidden"
                animate={animateState}
                className="absolute inset-0 w-full h-full object-cover object-[center_25%] select-none pointer-events-none"
              />
            </motion.div>
          )}

          {/* gradient overlay - fades in slowly after bg is visible */}
          <motion.div
            className={styles.blurOverlay}
            initial={{ opacity: 0 }}
            animate={loaderDone ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.5, duration: 1.4, ease: [0.25, 0, 0.35, 1] }}
            aria-hidden
          />

          {/* blur layers - each layer staggers in for a soft progressive effect */}
          {[1, 2, 3, 4, 5].map((index) => (
            <motion.div
              key={index}
              className={`${styles.layer} pointer-events-none`}
              style={{ "--index": index, "--layers": 5 } as CSSProperties}
              initial={{ opacity: 0 }}
              animate={loaderDone ? { opacity: 1 } : { opacity: 0 }}
              transition={{
                delay: 0.45 + index * 0.08,
                duration: 1.2,
                ease: [0.25, 0, 0.35, 1],
              }}
              aria-hidden
            />
          ))}

          {/* 4 - Bottom content: subtle parallax + fade-up entrance */}
          <motion.div
            style={{ x: contentX, y: contentY }}
            className="absolute bottom-0 w-full pointer-events-none"
          >
            <motion.div
              variants={variants.content}
              initial="hidden"
              animate={animateState}
              className="text-white grid place-items-center content-center gap-1 pb-5 min-h-[28%]"
            >
              <div className="w-[6ch] h-px bg-white mb-2" aria-hidden />
              <h1 className="m-0 flex items-center gap-2 text-[clamp(0.9rem,1.6vw,1.1rem)]">
                <Globe className="w-[1.1rem] h-[1.1rem] shrink-0" aria-hidden />
                <span>{highlight}</span>
              </h1>
              <p className="m-0 opacity-75 text-[clamp(0.8rem,1.4vw,0.95rem)]">
                {subtitle}
              </p>
            </motion.div>
          </motion.div>

        </article>

      </div>
    </section>
  );
}
