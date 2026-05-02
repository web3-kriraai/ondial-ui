"use client";

import { useRef } from "react";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import arrowRightAnimation from "@/assets/animations/arrow-right.json";
import calculatorIconAnimation from "@/assets/animations/calculator-icon.json";
import Text3DFlip from "../ui/text-3d-flip";

import { MobilePricingShape } from "./pricing-calculator/mobile-pricing-shape";
import { DesktopPricingShape } from "./pricing-calculator/desktop-pricing-shape";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

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
    <section className="w-full lg:relative lg:left-1/2 lg:w-screen lg:-translate-x-1/2 lg:px-8 xl:px-12 mt-12 md:mt-16">
      <div className="flex items-center justify-center gap-3 text-3xl font-bold text-gray-900 mb-4">
        <div className="h-10 w-10 brightness-0">
          <Lottie animationData={calculatorIconAnimation} autoplay={true} loop={false} />
        </div>
        <h2>Calculate Your Call Cost</h2>
      </div>
      <Text3DFlip
        animateOnMount
        rotateDirection="top"
        staggerDuration={0.02}
        className="text-pretty text-muted-foreground justify-center mb-7"
      >
        Use our calculator to get a transparent breakdown based on your needs.
      </Text3DFlip>
      <div className="w-full relative lg:mx-auto lg:max-w-[1050px] px-0 md:px-4 transition-all duration-300">
        <div className="relative h-[850px] w-full md:h-[560px]">
          <MobilePricingShape 
            minutes={minutes} setMinutes={setMinutes}
            channels={channels} setChannels={setChannels}
            numbers={numbers} setNumbers={setNumbers}
            isHovered={isHovered} setIsHovered={setIsHovered}
          />
          <DesktopPricingShape 
            minutes={minutes} setMinutes={setMinutes}
            channels={channels} setChannels={setChannels}
            numbers={numbers} setNumbers={setNumbers}
            isHovered={isHovered} setIsHovered={setIsHovered}
          />
        </div>

        {/* Call to Action Button - Positioned to nest perfectly in the notch */}
        <div className="absolute bottom-0 right-0 z-20 md:bottom-0 md:right-10">
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
              "flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-black text-white shadow-xl transition-all active:scale-95 lg:h-16 lg:w-16 overflow-hidden",
              isHovered ? "shadow-[0_0_30px_rgba(255,255,255,0.1)]" : ""
            )}
          >
            <div className="h-8 w-8 brightness-0 invert lg:h-10 lg:w-10 -rotate-45">
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
    </section>
  );
}
