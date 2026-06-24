"use client";

import { useEffect, useState, type Ref } from "react";

import { cn } from "@/lib/utils";

const BLUR_FEATHER_MASK =
  "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.95) 2%, rgba(0,0,0,0.72) 16%, rgba(0,0,0,0.38) 36%, rgba(0,0,0,0.14) 52%, transparent 100%)";

/** Distance from scroll bottom before blur fades out (footer zone). */
const FOOTER_REVEAL_OFFSET_PX = 220;

type ShellBottomBlurProps = {
  scrollContainerRef?: Ref<HTMLElement | null>;
  enabled?: boolean;
};

/** Fixed feathered blur at the shell bottom - hidden when the footer scrolls into view. */
export function ShellBottomBlur({ scrollContainerRef, enabled = true }: ShellBottomBlurProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!enabled) return;

    const scroller =
      scrollContainerRef && typeof scrollContainerRef !== "function" ? scrollContainerRef.current : null;
    if (!scroller) return;

    const update = () => {
      const distanceFromBottom = scroller.scrollHeight - scroller.scrollTop - scroller.clientHeight;
      setVisible(distanceFromBottom > FOOTER_REVEAL_OFFSET_PX);
    };

    update();
    scroller.addEventListener("scroll", update, { passive: true });
    const resizeObserver = new ResizeObserver(update);
    resizeObserver.observe(scroller);

    return () => {
      scroller.removeEventListener("scroll", update);
      resizeObserver.disconnect();
    };
  }, [scrollContainerRef, enabled]);

  if (!enabled) return null;

  return (
    <div
      className={cn(
        "pointer-events-none fixed z-20 overflow-hidden rounded-b-[1.5rem]",
        "bottom-2 left-2 right-2 sm:bottom-3 sm:left-3 sm:right-3 lg:bottom-3.75 lg:left-3.5 lg:right-3.5",
        "h-[40dvh] min-h-36 max-h-92 pr-14 sm:pr-16",
        "transition-opacity duration-300 ease-out",
        visible ? "opacity-100" : "opacity-0",
      )}
      aria-hidden
    >
      <div
        className="absolute inset-0 backdrop-blur-xs backdrop-saturate-150"
        style={{
          WebkitMaskImage: BLUR_FEATHER_MASK,
          maskImage: BLUR_FEATHER_MASK,
        }}
      />
    </div>
  );
}
