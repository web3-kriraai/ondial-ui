"use client";

import { NumberFlowInput } from "@/components/ui/number-flow-input";
import { NumberFlowSlider } from "@/components/ui/number-flow-slider";
import { cn } from "@/lib/utils";

type LeftPanelProps = {
  minutes: number;
  setMinutes: (val: number) => void;
  channels: number;
  setChannels: (val: number) => void;
  numbers: number;
  setNumbers: (val: number) => void;
  isMobile?: boolean;
};

export function DesktopPricingLeftPanel({
  minutes,
  setMinutes,
  channels,
  setChannels,
  numbers,
  setNumbers,
  isMobile,
}: LeftPanelProps) {
  const labelClass = cn(
    "font-medium leading-none tracking-wide text-white/90",
    isMobile ? "text-xs" : "text-[8px]",
  );

  const rowClass = cn(
    "flex items-center justify-between gap-4",
    isMobile ? "min-h-10" : "min-h-[18px]",
  );

  return (
    <div
      className={cn(
        "flex w-full flex-col text-white",
        isMobile ? "h-auto justify-start px-6 pt-10 pb-2" : "h-full justify-start px-7 pt-5 pb-4",
      )}
    >
      <header className={isMobile ? "mb-6" : "mb-5"}>
        <h3
          className={cn(
            "font-bold tracking-tight text-white",
            isMobile ? "mb-1.5 text-lg" : "mb-1 text-[14px]",
          )}
        >
          Customize Your Plan
        </h3>
        <p className={cn("leading-snug text-white/55", isMobile ? "text-xs" : "text-[7px]")}>
          Adjust the sliders to calculate your credits.
        </p>
      </header>

      <div className={cn("flex flex-col", isMobile ? "gap-6" : "gap-4")}>
        <div className={cn("flex flex-col", isMobile ? "gap-3 pb-1" : "gap-2 pb-0.5")}>
          <label htmlFor="minutes-slider" className={labelClass}>
            Monthly Call Minutes
          </label>
          <div className={cn("w-full", isMobile ? "px-0.5 pt-1" : "px-0.5 pt-2")}>
            <NumberFlowSlider
              id="minutes-slider"
              min={100}
              max={10000}
              step={100}
              value={[minutes]}
              onValueChange={(val) => setMinutes(val[0])}
              isMobile={isMobile}
            />
          </div>
        </div>

        <div className={cn("bg-white/10", isMobile ? "h-px" : "mx-0.5 h-px")} aria-hidden />

        <div className={cn("flex flex-col", isMobile ? "gap-5" : "gap-3.5")}>
          <div className={rowClass}>
            <label htmlFor="channels-input" className={labelClass}>
              Channels
            </label>
            <NumberFlowInput
              id="channels-input"
              min={1}
              max={20}
              value={channels}
              onChange={setChannels}
              isMobile={isMobile}
            />
          </div>

          <div className={rowClass}>
            <label htmlFor="numbers-input" className={labelClass}>
              Phone Numbers
            </label>
            <NumberFlowInput
              id="numbers-input"
              min={1}
              max={10}
              value={numbers}
              onChange={setNumbers}
              isMobile={isMobile}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
