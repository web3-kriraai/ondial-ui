"use client";

import { DesktopPricingLeftPanel } from "./desktop-pricing-left-panel";
import { DesktopPricingRightPanel } from "./desktop-pricing-right-panel";

type MobilePricingShapeProps = {
  minutes: number;
  setMinutes: (val: number) => void;
  channels: number;
  setChannels: (val: number) => void;
  numbers: number;
  setNumbers: (val: number) => void;
  isHovered: boolean;
  setIsHovered: (val: boolean) => void;
};

export function MobilePricingShape({ minutes, setMinutes, channels, setChannels, numbers, setNumbers, isHovered, setIsHovered }: MobilePricingShapeProps) {
  // Mobile vertical path with the signature notch on the bottom right
  // Width: 356 (consistent with desktop foreignObject width)
  // Height: 600 (taller for vertical stacking)
  // Increased height to 800 to fit all content comfortably including the new button
  const mobileShapePath = "M0 40 V780 Q0 800 20 800 H295 Q311 798 311 777 Q311 759 330 758 Q353 758 353 735 V20 Q351 -2 331 -1 H20 Q0 0 0 20 Z"
  return (
    <svg
      viewBox="0 0 356 800"
      preserveAspectRatio="none"
      className="relative z-0 block h-full w-full md:hidden drop-shadow-2xl"
    >
      <defs>
        <clipPath id="mobile-pricing-shape-clip">
          <path d={mobileShapePath} />
        </clipPath>
      </defs>

      {/* Draw the backgrounds in SVG so they are perfectly clipped */}
      <g clipPath="url(#mobile-pricing-shape-clip)">
        <rect x="0" y="0" width="356" height="800" fill="#0a0a0a" />
      </g>

      <foreignObject
        x="0"
        y="0"
        width="356"
        height="800"
        style={{ pointerEvents: "none" }}
      >
        <div 
          className="h-full w-full pointer-events-auto"
          style={{ clipPath: `path('${mobileShapePath}')` }}
        >
          <div className="flex h-full w-full flex-col bg-transparent">
            {/* Top Panel: Calculator */}
            <DesktopPricingLeftPanel 
              minutes={minutes} setMinutes={setMinutes}
              channels={channels} setChannels={setChannels}
              numbers={numbers} setNumbers={setNumbers}
              isMobile={true}
            />
            
            {/* Horizontal divider line */}
            <div className="mx-8 h-px bg-white/10" />

            {/* Bottom Panel: Results */}
            <DesktopPricingRightPanel 
              minutes={minutes} channels={channels} numbers={numbers}
              isMobile={true}
              isHovered={isHovered}
              setIsHovered={setIsHovered}
            />
          </div>
        </div>
      </foreignObject>
    </svg>
  );
}
