"use client";

import type { CSSProperties } from "react";

import { HeroDemoCtaButton } from "@/components/marketing/hero-demo-cta-button";
import { ThreeDCarousel } from "@/components/marketing/three-d-carousel";
import { TextReveal } from "@/components/ui/text-reveal";
import { marketingEyebrowClass, marketingSectionBgClass } from "@/config/marketing-layout";

import { cn } from "@/lib/utils";

import styles from "./showcase-section.module.css";

function ShowcaseCtas() {
  return (
    <div className={styles.ctaRow}>
      <HeroDemoCtaButton href="/signup" label="Let's Try" />
    </div>
  );
}

export function ShowcaseSection() {
  return (
    <section
      id="hero"
      className={cn(styles.section, marketingSectionBgClass)}
      style={
        {
          "--showcase-accent-h": "262",
          "--showcase-accent-s": "83%",
          "--showcase-accent-l": "58%",
        } as CSSProperties
      }
      aria-label="Platform showcase"
    >
      <header className={styles.header}>
        <p className={cn(marketingEyebrowClass, styles.badgeSpacing)}>
          more than a voice
        </p>
        <TextReveal
          as="h1"
          className={styles.title}
          trigger="loader"
          delay={0.12}
          stagger={0.07}
        >
          Automate Your Calls with OnDial AI Voice Agents
        </TextReveal>
        <p className={styles.description}>
          Explore how teams use AI Call Automation for reminders, outreach, surveys, and
          support from first plan to ongoing scale.
        </p>
        <ShowcaseCtas />
      </header>

      <ThreeDCarousel />
      <p className={styles.caption}>
        Create voice agents that have natural, flowing conversations and provide 24/7
        customer support with human-like understanding.
      </p>
    </section>
  );
}
