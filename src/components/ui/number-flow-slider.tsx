"use client";

import NumberFlow, { continuous } from '@number-flow/react'
import * as RadixSlider from '@radix-ui/react-slider'
import * as React from 'react'
import { cn } from '@/lib/utils'

export function NumberFlowSlider({ value, className, isMobile, ...props }: RadixSlider.SliderProps & { isMobile?: boolean }) {
	// Trigger subtle haptic 'tick' on value change
	React.useEffect(() => {
		if (value?.[0] !== undefined && typeof window !== 'undefined' && window.navigator?.vibrate) {
			window.navigator.vibrate(2);
		}
	}, [value]);

	return (
		<RadixSlider.Root
			{...props}
			value={value}
			className={cn(className, 'relative flex w-full touch-none select-none items-center', isMobile ? "h-6" : "h-3")}
		>
			<RadixSlider.Track className="relative h-[2px] grow rounded-full bg-white/20">
				<RadixSlider.Range className="absolute h-full rounded-full bg-white" />
			</RadixSlider.Track>
			<RadixSlider.Thumb
				className={cn(
          "relative block rounded-full bg-white shadow-sm ring-1 ring-black/5 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-white/50 hover:scale-110 transition-transform",
          isMobile ? "h-5 w-5" : "h-2.5 w-2.5"
        )}
				aria-label="Monthly Call Minutes"
			>
				{value?.[0] != null && (
					<NumberFlow
						locales="en-US"
						willChange
						value={value[0]}
						isolate
						plugins={[continuous]}
						opacityTiming={{
							duration: 250,
							easing: 'ease-out'
						}}
						transformTiming={{
							easing: 'cubic-bezier(0, 0, 0, 1)',
							duration: 200
						}}
						className={cn(
              "absolute left-1/2 -translate-x-1/2 rounded-full bg-white font-extrabold text-black shadow-md pointer-events-none whitespace-nowrap",
              isMobile ? "bottom-6 px-3 py-1 text-xs" : "bottom-3.5 px-1.5 py-0.5 text-[5px]"
            )}
					/>
				)}
			</RadixSlider.Thumb>
		</RadixSlider.Root>
	)
}
