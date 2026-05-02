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

export function DesktopPricingLeftPanel({ minutes, setMinutes, channels, setChannels, numbers, setNumbers, isMobile }: LeftPanelProps) {

  return (
    <div className={cn(
      "flex w-full flex-col text-white",
      isMobile ? "h-auto justify-start p-6 pt-10" : "h-full justify-start p-4 pt-[12px]"
    )}>
      <div className={isMobile ? "mb-6" : "mb-3"}>
        <h3 className={cn("font-bold leading-tight", isMobile ? "mb-1 text-lg" : "mb-0.5 text-[10px]")}>Customize Your Plan</h3>
        <p className={cn("text-white/70 leading-tight", isMobile ? "text-xs" : "text-[6px]")}>
          Adjust the sliders to calculate your credits.
        </p>
      </div>

      <div className={isMobile ? "space-y-6" : "space-y-3"}>
        <div className={cn("mt-1", isMobile ? "space-y-4" : "space-y-2")}>
          <div className="flex items-center justify-between">
            <label className={cn("font-medium leading-none tracking-wide", isMobile ? "text-xs" : "text-[6px]")}>Monthly Call Minutes</label>
            {/* Value is now displayed floating above the thumb */}
          </div>
          <div className="px-2">
            <NumberFlowSlider
              min={100}
              max={10000}
              step={100}
              value={[minutes]}
              onValueChange={(val) => setMinutes(val[0])}
              isMobile={isMobile}
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <label className={cn("font-medium leading-none tracking-wide", isMobile ? "text-xs" : "text-[6px]")}>Channels</label>
          <NumberFlowInput 
            min={1} 
            max={20} 
            value={channels} 
            onChange={setChannels} 
            isMobile={isMobile}
          />
        </div>

        <div className="flex items-center justify-between">
          <label className={cn("font-medium leading-none tracking-wide", isMobile ? "text-xs" : "text-[6px]")}>Phone Numbers</label>
          <NumberFlowInput 
            min={1} 
            max={10} 
            value={numbers} 
            onChange={setNumbers} 
            isMobile={isMobile}
          />
        </div>
      </div>
    </div>
  );
}
