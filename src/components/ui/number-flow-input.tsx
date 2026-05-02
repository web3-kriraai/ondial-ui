"use client";

import NumberFlow, { continuous } from '@number-flow/react'
import { Minus, Plus } from 'lucide-react'
import * as React from 'react'
import { cn } from "@/lib/utils"

type Props = {
	value?: number
	min?: number
	max?: number
	onChange?: (value: number) => void
  className?: string
  isMobile?: boolean
}

export function NumberFlowInput({ value = 0, min = -Infinity, max = Infinity, onChange, className, isMobile }: Props) {
	const defaultValue = React.useRef(value)
	const inputRef = React.useRef<HTMLInputElement>(null)
	const [animated, setAnimated] = React.useState(true)
	const [showCaret, setShowCaret] = React.useState(true)

	const handleInput: React.InputEventHandler<HTMLInputElement> = ({ currentTarget: el }) => {
		setAnimated(false)
		let next = value
		if (el.value === '') {
			next = defaultValue.current
		} else {
			const num = el.valueAsNumber
			if (!isNaN(num) && min <= num && num <= max) next = num
		}
		el.value = String(next)
		onChange?.(next)
	}

	const handlePointerDown = (diff: number) => (event: React.PointerEvent<HTMLButtonElement>) => {
		setAnimated(true)
		if (event.pointerType === 'mouse') {
			event?.preventDefault()
			inputRef.current?.focus()
		}
		const newVal = Math.min(Math.max(value + diff, min), max)
		if (typeof window !== 'undefined' && window.navigator?.vibrate) {
			window.navigator.vibrate(2);
		}
		onChange?.(newVal)
	}

	return (
		<div className={cn(
      "group flex items-center rounded-full border border-white/20 bg-white/5 font-bold text-white transition-all focus-within:border-white/50 focus-within:bg-white/10 hover:border-white/30", 
      isMobile ? "text-xs" : "text-[6px]",
      className
    )}>
			<button
				aria-hidden="true"
				tabIndex={-1}
				className={cn(
          "flex h-full items-center opacity-70 transition-opacity hover:opacity-100 disabled:opacity-30",
          isMobile ? "pl-3 pr-2 py-2" : "pl-1.5 md:pr-1 py-1"
        )}
				disabled={min != null && value <= min}
				onPointerDown={handlePointerDown(-1)}
			>
				<Minus className={cn(isMobile ? "size-4" : "size-2")} absoluteStrokeWidth strokeWidth={2.5} />
			</button>
			<div className="relative grid items-center justify-items-center text-center [grid-template-areas:'overlap'] *:[grid-area:overlap]">
				<input
					ref={inputRef}
					className={cn(
						showCaret ? 'caret-white' : 'caret-transparent',
						'w-[3em] appearance-none bg-transparent py-1 text-center font-[inherit] text-transparent outline-none m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [appearance:textfield]'
					)}
					style={{ fontKerning: 'none' }}
					type="number"
					min={min}
					step={1}
					autoComplete="off"
					inputMode="numeric"
					max={max}
					value={value}
					onInput={handleInput}
				/>
				<NumberFlow
					value={value}
					locales="en-US"
					format={{ useGrouping: false }}
					aria-hidden="true"
					animated={animated}
					onAnimationsStart={() => setShowCaret(false)}
					onAnimationsFinish={() => setShowCaret(true)}
					className="pointer-events-none"
					willChange
					plugins={[continuous]}
					transformTiming={{
						easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
						duration: 400
					}}
				/>
			</div>
			<button
				aria-hidden="true"
				tabIndex={-1}
				className={cn(
          "flex h-full items-center opacity-70 transition-opacity hover:opacity-100 disabled:opacity-30",
          isMobile ? "pl-2 pr-3 py-2" : "pl-1 pr-1.5 py-1"
        )}
				disabled={max != null && value >= max}
				onPointerDown={handlePointerDown(1)}
			>
				<Plus className={cn(isMobile ? "size-4" : "size-2")} absoluteStrokeWidth strokeWidth={2.5} />
			</button>
		</div>
	)
}
