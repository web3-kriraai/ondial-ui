"use client";

import { DesktopPricingLeftPanel } from "./desktop-pricing-left-panel";
import { DesktopPricingRightPanel } from "./desktop-pricing-right-panel";

type DesktopPricingShapeProps = {
  minutes: number;
  setMinutes: (val: number) => void;
  channels: number;
  setChannels: (val: number) => void;
  numbers: number;
  setNumbers: (val: number) => void;
  isHovered: boolean;
  setIsHovered: (val: boolean) => void;
};

export function DesktopPricingShape({ minutes, setMinutes, channels, setChannels, numbers, setNumbers, isHovered, setIsHovered }: DesktopPricingShapeProps) {

  const desktopShapePath =
    "M160 100 V260 Q160 280 180 280 H470 Q485 280 485 265 Q485 248 499 248 Q514 249 516 234 V60 Q515 40 495 40 H180 Q160 40 160 60 Z";

  return (
    <svg
      viewBox="160 40 360 240"
      preserveAspectRatio="none"
      className="relative z-0 hidden h-full w-full md:block drop-shadow-2xl"
    >
      <defs>
        <clipPath id="desktop-pricing-shape-clip">
          <path d={desktopShapePath} />
        </clipPath>
      </defs>

      {/* Draw the backgrounds in SVG so they are perfectly clipped without breaking HTML pointer events */}
      <g clipPath="url(#desktop-pricing-shape-clip)">
        <rect x="160" y="40" width="360" height="240" fill="#0a0a0a" />
      </g>

      {/* The HTML container is no longer clipped, which fixes the browser bug blocking pointer events */}
      <foreignObject
        x="160"
        y="40"
        width="360"
        height="240"
        style={{ pointerEvents: "none" }} // let the foreign object pass events
      >
        <div 
          className="h-full w-full pointer-events-auto"
          style={{ clipPath: "path('M0 60 V220 Q0 240 20 240 H310 Q325 240 325 225 Q325 208 339 208 Q356 207 356 194 V20 Q355 0 335 0 H20 Q0 0 0 20 Z')" }}
        >
          <div className="flex h-full w-full bg-transparent">
            <div className="w-[60%] h-full">
              <DesktopPricingLeftPanel 
                minutes={minutes} setMinutes={setMinutes}
                channels={channels} setChannels={setChannels}
                numbers={numbers} setNumbers={setNumbers}
                isMobile={false}
              />
            </div>
            <div className="w-[40%] h-full">
              <DesktopPricingRightPanel 
                minutes={minutes} channels={channels} numbers={numbers}
                isMobile={false}
                isHovered={isHovered}
                setIsHovered={setIsHovered}
              />
            </div>
          </div>
        </div>
      </foreignObject>
    </svg>
  );
}
