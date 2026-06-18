"use client";

import { useEffect, useRef, useState } from "react";
import Lottie, { type LottieRefCurrentProps } from "lottie-react";

import arrowRightAnimation from "@/assets/animations/arrow-right.json";
import calculatorIconAnimation from "@/assets/animations/calculator-icon.json";
import { ONDIAL_ACCENT_STYLE } from "@/components/marketing/split-screen-section";
import { TextReveal } from "@/components/ui/text-reveal";
import {
  marketingEyebrowClass,
  marketingSectionContainerClass,
  marketingSectionFollowClass,
} from "@/config/marketing-layout";
import { PRICING_CALCULATOR_HEADING } from "@/data/pricing-plans";
import { cn } from "@/lib/utils";

import { DesktopPricingShape } from "./pricing-calculator/desktop-pricing-shape";
import { MobilePricingShape } from "./pricing-calculator/mobile-pricing-shape";

const headingClass =
  "text-balance text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem]";

const subtitleClass =
  "mx-auto max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg";

export function PricingCalculator() {
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const [minutes, setMinutes] = useState(5700);
  const [channels, setChannels] = useState(13);
  const [numbers, setNumbers] = useState(1);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) {
      lottieRef.current?.play();
    } else {
      lottieRef.current?.stop();
      lottieRef.current?.goToAndStop(0, true);
    }
  }, [isHovered]);

  return (
    <section
      id="pricing-calculator"
      className={cn(marketingSectionFollowClass, "bg-background")}
      style={ONDIAL_ACCENT_STYLE}
      aria-labelledby="pricing-calculator-title"
    >
      <div className={marketingSectionContainerClass}>
        <header className="mx-auto max-w-3xl text-center">
          <p className={cn("mb-5 sm:mb-6", marketingEyebrowClass)}>{PRICING_CALCULATOR_HEADING.eyebrow}</p>
          <h2 id="pricing-calculator-title" className={headingClass}>
            <span className="inline-flex flex-wrap items-center justify-center gap-3">
              <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center brightness-0 sm:h-10 sm:w-10">
                <Lottie animationData={calculatorIconAnimation} autoplay loop={false} />
              </span>
              <TextReveal as="span" delay={0.05} stagger={0.07} inViewAmount={0.5}>
                {PRICING_CALCULATOR_HEADING.title}
              </TextReveal>
            </span>
          </h2>
          <TextReveal
            as="p"
            className={cn(subtitleClass, "mt-5 sm:mt-6")}
            delay={0.22}
            stagger={0.028}
            inViewAmount={0.4}
          >
            {PRICING_CALCULATOR_HEADING.description}
          </TextReveal>
        </header>

        <div className="relative mx-auto mt-12 w-full max-w-[1050px] sm:mt-14 lg:mt-16">
          <div className="relative h-[850px] w-full md:h-[560px]">
            <MobilePricingShape
              minutes={minutes}
              setMinutes={setMinutes}
              channels={channels}
              setChannels={setChannels}
              numbers={numbers}
              setNumbers={setNumbers}
              isHovered={isHovered}
              setIsHovered={setIsHovered}
            />
            <DesktopPricingShape
              minutes={minutes}
              setMinutes={setMinutes}
              channels={channels}
              setChannels={setChannels}
              numbers={numbers}
              setNumbers={setNumbers}
              isHovered={isHovered}
              setIsHovered={setIsHovered}
            />

            <div className="absolute bottom-0 right-0 z-20 md:bottom-0 md:right-6">
              <div
                onMouseEnter={() => {
                  setIsHovered(true);
                  lottieRef.current?.play();
                }}
                onMouseLeave={() => {
                  setIsHovered(false);
                  lottieRef.current?.stop();
                  lottieRef.current?.goToAndStop(0, true);
                }}
                className={cn(
                  "flex h-11 w-11 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-black text-white shadow-xl transition-all active:scale-95 lg:h-16 lg:w-16",
                  isHovered ? "shadow-[0_0_30px_rgba(255,255,255,0.1)]" : "",
                )}
              >
                <div className="-rotate-45 h-8 w-8 brightness-0 invert lg:h-10 lg:w-10">
                  <Lottie
                    lottieRef={lottieRef}
                    animationData={arrowRightAnimation}
                    autoplay={false}
                    loop={false}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
