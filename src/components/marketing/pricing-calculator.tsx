"use client";

import { useRef } from "react";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import arrowRightAnimation from "@/assets/animations/arrow-right.json";

export function PricingCalculator() {
  const lottieRef = useRef<LottieRefCurrentProps>(null);

  return (
    <section className="w-full lg:relative lg:left-1/2 lg:w-screen lg:-translate-x-1/2 lg:px-8 xl:px-12 mt-12 md:mt-16">
      <div className="w-full relative lg:mx-auto lg:max-w-[1050px] px-0 md:px-4 transition-all duration-300">
        <div className="relative h-[590px] w-full md:h-[560px]">
          {/* Mobile SVG Shape */}
          <svg
            viewBox="100 100 300 440"
            preserveAspectRatio="none"
            className="h-full w-full md:hidden drop-shadow-2xl"
          >
            <path
              d="M155 99 H386 Q400 100 399 115 V479 Q400 504 380 503 Q360 503 359 521 Q359 539 335 539 H115 Q100 540 101 521 V118 Q100 100 116 99 Z"
              fill="#5D57A3"
            />
          </svg>
          <svg
            viewBox="160 40 360 240"
            preserveAspectRatio="none"
            className="h-full w-full hidden md:block drop-shadow-2xl"
          >
            <path
              d="M160 100 V260 Q160 280 180 280 H470 Q485 280 485 265 Q485 248 499 248 Q514 249 516 234 V60 Q515 40 495 40 H180 Q160 40 160 60 Z"
              fill="#5D57A3"
            />
          </svg>
        </div>
        
        {/* Call to Action Button - Positioned to nest perfectly in the notch */}
        <div className="absolute bottom-0 right-0 z-20 md:bottom-1 md:right-10">
          <div 
            onMouseEnter={() => lottieRef.current?.play()}
            onMouseLeave={() => {
              lottieRef.current?.stop();
              lottieRef.current?.goToAndStop(0, true);
            }}
            className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-black text-white shadow-xl transition-all hover:scale-110 active:scale-95 lg:h-16 lg:w-16 overflow-hidden"
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
