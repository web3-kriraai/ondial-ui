import NumberFlow, { continuous } from '@number-flow/react'
import { cn } from '@/lib/utils'

type RightPanelProps = {
  minutes: number;
  channels: number;
  numbers: number;
  isMobile?: boolean;
  isHovered?: boolean;
  setIsHovered?: (val: boolean) => void;
};

export function DesktopPricingRightPanel({ minutes, channels, numbers, isMobile, isHovered, setIsHovered }: RightPanelProps) {
  const voiceCost = minutes * 0.055;
  const channelCost = channels * 4.90;
  const numberCost = numbers * 4.90;
  const totalCost = voiceCost + channelCost + numberCost;

  return (
    <div className={cn(
      "flex w-full flex-col text-white px-6 md:px-0",
      isMobile ? "h-auto justify-start py-10" : "h-full justify-between pt-3 pb-0 md:pl-4 md:pr-7"
    )}>
      <div className="flex flex-col items-start w-full">
        <div className={cn("flex items-center", isMobile ? "gap-2 mb-2" : "gap-1.5 mb-1")}>
          <span className={cn("font-bold text-white/40 tracking-wide uppercase", isMobile ? "text-[10px]" : "text-[6px]")}>Monthly Cost</span>
          <span className={cn("rounded-full bg-[#5b51ea] font-bold text-white tracking-widest uppercase shadow-sm", isMobile ? "px-2 py-1 text-[8px]" : "px-1.5 py-0.5 text-[4px]")}>
            ESSENTIAL
          </span>
        </div>
        <div className={cn("flex items-baseline w-full", isMobile ? "mb-6" : "mb-4")}>
          <NumberFlow
            value={totalCost}
            format={{ style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 }}
            className={cn("font-black text-white leading-none tracking-tight tabular-nums", isMobile ? "text-3xl" : "text-[13px]")}
            suffix="/month"
            plugins={[continuous]}
            willChange
            transformTiming={{
              easing: 'cubic-bezier(0, 0, 0, 1)',
              duration: 200
            }}
          />
        </div>

        <div className={cn("w-full bg-white/5 shadow-sm border border-white/10 text-center", isMobile ? "rounded-2xl p-4 mb-8" : "rounded-xl p-2 mb-4")}>
          <div className={cn("text-white/30 uppercase tracking-widest font-bold", isMobile ? "text-[8px] mb-1" : "text-[4px] mb-0.5")}>CURRENT PRICING TIER</div>
          <div className={cn("font-extrabold text-indigo-300", isMobile ? "text-sm mb-4" : "text-[6px] mb-2")}>0 - 10,000 minutes</div>
          
          <div className={cn("flex justify-between text-white/60", isMobile ? "text-[8px] px-2" : "text-[4px] px-1")}>
            <div className="flex flex-col items-center">
              <span className={cn("leading-tight opacity-70", isMobile ? "mb-1" : "mb-0.5")}>Per<br/>minute:</span>
              <span className={cn("font-bold text-white tabular-nums", isMobile ? "text-xs" : "text-[5px]")}>$0.055</span>
            </div>
            <div className="flex flex-col items-center">
              <span className={cn("leading-tight opacity-70", isMobile ? "mb-1" : "mb-0.5")}>Per<br/>number:</span>
              <span className={cn("font-bold text-white tabular-nums", isMobile ? "text-xs" : "text-[5px]")}>$4.9</span>
            </div>
            <div className="flex flex-col items-center">
              <span className={cn("leading-tight opacity-70", isMobile ? "mb-1" : "mb-0.5")}>Per<br/>channel:</span>
              <span className={cn("font-bold text-white tabular-nums", isMobile ? "text-xs" : "text-[5px]")}>$4.9</span>
            </div>
          </div>
        </div>

        <div className={cn("w-full px-1", isMobile ? "space-y-4" : "space-y-2")}>
          <div className={cn("flex justify-between items-center", isMobile ? "text-xs" : "text-[5.5px]")}>
            <span className="text-white/40 font-medium">Voice Calls</span>
            <div className="font-bold text-white tabular-nums">
              <NumberFlow
                value={voiceCost}
                format={{ style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 }}
                plugins={[continuous]}
                willChange
                transformTiming={{
                  easing: 'cubic-bezier(0, 0, 0, 1)',
                  duration: 200
                }}
              />
            </div>
          </div>
          <div className={cn("flex justify-between items-center", isMobile ? "text-xs" : "text-[5.5px]")}>
            <span className="text-white/40 font-medium">Concurrent channels</span>
            <div className="font-bold text-white tabular-nums">
              <NumberFlow
                value={channelCost}
                format={{ style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 }}
                plugins={[continuous]}
                willChange
                transformTiming={{
                  easing: 'cubic-bezier(0, 0, 0, 1)',
                  duration: 200
                }}
              />
            </div>
          </div>
          <div className={cn("flex justify-between items-center", isMobile ? "text-xs" : "text-[5.5px]")}>
            <span className="text-white/40 font-medium">Phone Numbers</span>
            <div className="font-bold text-white tabular-nums">
              <NumberFlow
                value={numberCost}
                format={{ style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 }}
                plugins={[continuous]}
                willChange
                transformTiming={{
                  easing: 'cubic-bezier(0, 0, 0, 1)',
                  duration: 200
                }}
              />
            </div>
          </div>
        </div>

        {/* Purchase Plan Button - Absolutely positioned on desktop for perfect lockup with the arrow */}
        <div className={cn("w-full mt-auto", isMobile ? "pt-8 pb-4" : "relative h-8")}>
          <button 
            onMouseEnter={() => setIsHovered?.(true)}
            onMouseLeave={() => setIsHovered?.(false)}
            className={cn(
              "group transition-all active:scale-[0.98] cursor-pointer",
              isMobile ? "relative w-full flex items-center justify-center translate-y-6" : "absolute bottom-[-12px] right-[20px] flex items-center"
            )}
          >
            <span className="relative">
              <span className={cn(
                "font-semibold transition-all duration-300 whitespace-nowrap",
                isMobile ? "text-[14px]" : "text-[8px]",
                isHovered ? "text-white" : "text-white/70"
              )}>
                Purchase Plan
              </span>
              {/* Hand-drawn SVG Underline */}
              <svg 
                className={cn(
                  "absolute bottom-[-1px] left-0 w-full h-[3px] pointer-events-none transition-opacity duration-300",
                  isHovered ? "opacity-100" : "opacity-0"
                )}
                viewBox="0 0 100 10" 
                preserveAspectRatio="none"
              >
                <path 
                  d="M0 5c20-3 40-3 100 0" 
                  stroke="white" 
                  strokeWidth="2" 
                  fill="none" 
                  strokeLinecap="round"
                  style={{
                    strokeDasharray: 120,
                    strokeDashoffset: isHovered ? 0 : 120,
                    transition: 'stroke-dashoffset 0.4s ease-in-out'
                  }}
                />
              </svg>
            </span>
            {/* Subtle glow behind text on hover */}
            <div className={cn(
              "absolute inset-0 bg-white/5 blur-xl rounded-full transition-opacity duration-500 pointer-events-none",
              isHovered ? "opacity-100" : "opacity-0",
              isMobile ? "" : "left-auto -right-2 w-32 h-8"
            )} />
          </button>
        </div>
      </div>
    </div>
  );
}
