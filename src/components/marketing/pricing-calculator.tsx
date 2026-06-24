"use client";

import { useEffect, useRef, useState } from "react";
import type { LottieRefCurrentProps } from "lottie-react";

import arrowRightAnimation from "@/assets/animations/arrow-right.json";
import calculatorIconAnimation from "@/assets/animations/calculator-icon.json";
import { BlogPageHero } from "@/components/marketing/blog-page-hero";
import { ONDIAL_ACCENT_STYLE } from "@/components/marketing/split-screen-section";
import { TextReveal } from "@/components/ui/text-reveal";
import { LazyLottie, type LazyLottieHandle } from "@/components/ui/lazy-lottie";
import { marketingSectionContainerClass } from "@/config/marketing-layout";
import { PRICING_CALCULATOR_HEADING } from "@/data/pricing-plans";
import { cn } from "@/lib/utils";

import { DesktopPricingShape } from "./pricing-calculator/desktop-pricing-shape";
import { MobilePricingShape } from "./pricing-calculator/mobile-pricing-shape";

export function PricingCalculator() {
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const lazyArrowRef = useRef<LazyLottieHandle>(null);
  const [minutes, setMinutes] = useState(5700);
  const [channels, setChannels] = useState(13);
  const [numbers, setNumbers] = useState(1);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) {
      lazyArrowRef.current?.play();
    } else {
      lazyArrowRef.current?.reset();
    }
  }, [isHovered]);

  return (
    <section
      id="pricing-calculator"
      className="w-full bg-transparent pb-14 sm:pb-16 lg:pb-20"
      style={ONDIAL_ACCENT_STYLE}
      aria-labelledby="pricing-calculator-title"
    >
      <div className="mx-auto flex w-full min-w-0 max-w-3xl flex-col px-4 sm:px-6 lg:max-w-4xl">
        <BlogPageHero
          eyebrow={PRICING_CALCULATOR_HEADING.eyebrow}
          title={
            <h2
              id="pricing-calculator-title"
              className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-2.5 text-balance text-3xl font-semibold tracking-tight text-foreground sm:gap-3 sm:text-4xl lg:text-[2.625rem] lg:leading-tight"
            >
              <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center self-center brightness-0 sm:h-9 sm:w-9">
                <LazyLottie
                  animationData={calculatorIconAnimation}
                  autoplay
                  loop={false}
                  loadTrigger="visible"
                />
              </span>
              <TextReveal
                as="span"
                className="inline"
                delay={0.08}
                stagger={0.04}
                inViewAmount={0.2}
              >
                {PRICING_CALCULATOR_HEADING.title}
              </TextReveal>
            </h2>
          }
          description={PRICING_CALCULATOR_HEADING.description}
        />
      </div>

      <div className={cn(marketingSectionContainerClass, "mt-8 sm:mt-10")}>
        <div className="relative mx-auto w-full max-w-[1050px]">
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
                  lazyArrowRef.current?.play();
                }}
                onMouseLeave={() => {
                  setIsHovered(false);
                  lazyArrowRef.current?.reset();
                }}
                className={cn(
                  "flex h-11 w-11 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-black text-white shadow-xl transition-all active:scale-95 lg:h-16 lg:w-16",
                  isHovered ? "shadow-[0_0_30px_rgba(255,255,255,0.1)]" : "",
                )}
              >
                <div className="-rotate-45 h-8 w-8 brightness-0 invert lg:h-10 lg:w-10">
                  <LazyLottie
                    ref={lazyArrowRef}
                    lottieRef={lottieRef}
                    animationData={arrowRightAnimation}
                    autoplay={false}
                    loop={false}
                    loadTrigger="interaction"
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
