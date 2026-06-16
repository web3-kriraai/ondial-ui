"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type RefObject,
} from "react";
import { createPortal } from "react-dom";
import { motion, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";

const TRACK_INSET_Y = 14;
const SCROLL_IDLE_MS = 850;
const MOBILE_MEDIA_QUERY = "(max-width: 639px)";

type ScrollbarSizing = {
  thumbWidth: number;
  minThumbHeight: number;
  nativeThumbWidth: number;
  edgeMargin: number;
};

function getScrollbarSizing(): ScrollbarSizing {
  if (typeof window === "undefined") {
    return { thumbWidth: 44, minThumbHeight: 132, nativeThumbWidth: 8, edgeMargin: 4 };
  }

  const compact = window.innerWidth < 640;
  return {
    thumbWidth: compact ? 40 : 44,
    minThumbHeight: compact ? 118 : 132,
    nativeThumbWidth: compact ? 7 : 8,
    edgeMargin: 4,
  };
}

type ContainerBounds = {
  top: number;
  left: number;
  width: number;
  height: number;
};

const EXPAND_SPRING = { type: "spring" as const, stiffness: 560, damping: 28, mass: 0.62 };
const COLLAPSE_SPRING = { type: "spring" as const, stiffness: 480, damping: 30, mass: 0.68 };
const CONTENT_SPRING = { type: "spring" as const, stiffness: 500, damping: 26, mass: 0.65 };
const REDUCED_MOTION_TRANSITION = { duration: 0.14 };

type ScrollMetrics = {
  scrollTop: number;
  scrollHeight: number;
  clientHeight: number;
};

type ThumbMetrics = {
  trackHeight: number;
  thumbHeight: number;
  thumbOffset: number;
  nativeThumbHeight: number;
  scrollable: number;
  maxThumbOffset: number;
  isScrollable: boolean;
};

type DragState = {
  pointerId: number;
  startClientY: number;
  startScrollTop: number;
  maxThumbOffset: number;
  scrollable: number;
};

function formatDigitalClock(date: Date) {
  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const hour12 = hours % 12 || 12;
  const meridiem = hours >= 12 ? "PM" : "AM";

  return {
    time: `${hour12.toString().padStart(2, "0")}:${minutes}`,
    meridiem,
  };
}

function getThumbMetrics(
  metrics: ScrollMetrics,
  sizing: ScrollbarSizing,
): ThumbMetrics {
  const { scrollTop, scrollHeight, clientHeight } = metrics;
  const scrollable = Math.max(0, scrollHeight - clientHeight);
  const trackHeight = Math.max(0, clientHeight - TRACK_INSET_Y * 2);

  if (trackHeight <= 0 || scrollable <= 0) {
    return {
      trackHeight,
      thumbHeight: sizing.minThumbHeight,
      thumbOffset: 0,
      nativeThumbHeight: 48,
      scrollable: 0,
      maxThumbOffset: 0,
      isScrollable: false,
    };
  }

  const proportionalHeight = (clientHeight / scrollHeight) * trackHeight;
  const thumbHeight = Math.min(
    trackHeight,
    Math.max(sizing.minThumbHeight, proportionalHeight),
  );
  const nativeThumbHeight = Math.min(
    trackHeight,
    Math.max(40, proportionalHeight),
  );
  const maxThumbOffset = Math.max(0, trackHeight - thumbHeight);
  const thumbOffset = (scrollTop / scrollable) * maxThumbOffset;

  return {
    trackHeight,
    thumbHeight,
    thumbOffset,
    nativeThumbHeight,
    scrollable,
    maxThumbOffset,
    isScrollable: true,
  };
}

function AnalogClockFace({ date }: { date: Date }) {
  const hours = date.getHours() % 12;
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const milliseconds = date.getMilliseconds();

  const secondAngle = ((seconds + milliseconds / 1000) / 60) * 360;
  const minuteAngle = ((minutes + seconds / 60) / 60) * 360;
  const hourAngle = ((hours + minutes / 60) / 12) * 360;

  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      className="shrink-0"
      aria-hidden
    >
      <circle cx="14" cy="14" r="13.5" fill="white" />
      {Array.from({ length: 12 }, (_, index) => (
        <line
          key={index}
          x1="14"
          y1="3.5"
          x2="14"
          y2={index % 3 === 0 ? 5.5 : 4.5}
          stroke="#0F172A"
          strokeWidth={index % 3 === 0 ? 1.1 : 0.55}
          strokeOpacity={0.32}
          transform={`rotate(${index * 30} 14 14)`}
        />
      ))}
      <motion.g
        animate={{ rotate: hourAngle }}
        transition={{ type: "spring", stiffness: 140, damping: 18, mass: 0.55 }}
        style={{ transformOrigin: "14px 14px" }}
      >
        <line
          x1="14"
          y1="14"
          x2="14"
          y2="10"
          stroke="#0F172A"
          strokeWidth="1.35"
          strokeLinecap="round"
        />
      </motion.g>
      <motion.g
        animate={{ rotate: minuteAngle }}
        transition={{ type: "spring", stiffness: 180, damping: 20, mass: 0.5 }}
        style={{ transformOrigin: "14px 14px" }}
      >
        <line
          x1="14"
          y1="14"
          x2="14"
          y2="8"
          stroke="#0F172A"
          strokeWidth="0.95"
          strokeLinecap="round"
        />
      </motion.g>
      <motion.g
        animate={{ rotate: secondAngle }}
        transition={{ type: "tween", duration: 0.05, ease: "linear" }}
        style={{ transformOrigin: "14px 14px" }}
      >
        <line
          x1="14"
          y1="14"
          x2="14"
          y2="7"
          stroke="#534AB7"
          strokeWidth="0.65"
          strokeLinecap="round"
        />
      </motion.g>
      <circle cx="14" cy="14" r="1.1" fill="#0F172A" />
      <circle cx="14" cy="14" r="0.45" fill="#534AB7" />
    </svg>
  );
}

type ShellScrollIndicatorProps = {
  containerRef: RefObject<HTMLElement | null>;
  className?: string;
};

export function ShellScrollIndicator({ containerRef, className }: ShellScrollIndicatorProps) {
  const prefersReducedMotion = useReducedMotion();

  const [metrics, setMetrics] = useState<ScrollMetrics>({
    scrollTop: 0,
    scrollHeight: 0,
    clientHeight: 0,
  });
  const [bounds, setBounds] = useState<ContainerBounds | null>(null);
  const [sizing, setSizing] = useState<ScrollbarSizing>(() => getScrollbarSizing());
  const [mounted, setMounted] = useState(false);
  const [isMobileViewport, setIsMobileViewport] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(MOBILE_MEDIA_QUERY).matches;
  });
  const [now, setNow] = useState(() => new Date());
  const [isDragging, setIsDragging] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const metricsRef = useRef(metrics);
  metricsRef.current = metrics;

  const dragRef = useRef<DragState | null>(null);
  const idleTimerRef = useRef<number | null>(null);
  const expandedRef = useRef(expanded);
  const clockRafRef = useRef<number | null>(null);

  expandedRef.current = expanded;

  const clearIdleTimer = useCallback(() => {
    if (idleTimerRef.current !== null) {
      window.clearTimeout(idleTimerRef.current);
      idleTimerRef.current = null;
    }
  }, []);

  const expandThumb = useCallback(() => {
    clearIdleTimer();
    if (!expandedRef.current) {
      setExpanded(true);
    }
  }, [clearIdleTimer]);

  const scheduleCollapse = useCallback(() => {
    clearIdleTimer();
    idleTimerRef.current = window.setTimeout(() => {
      if (dragRef.current) {
        scheduleCollapse();
        return;
      }
      setExpanded(false);
    }, SCROLL_IDLE_MS);
  }, [clearIdleTimer]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const media = window.matchMedia(MOBILE_MEDIA_QUERY);
    const syncViewport = () => setIsMobileViewport(media.matches);
    syncViewport();
    media.addEventListener("change", syncViewport);
    return () => media.removeEventListener("change", syncViewport);
  }, []);

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const applyScrollerChrome = () => {
      const hideNative = !window.matchMedia(MOBILE_MEDIA_QUERY).matches;
      el.classList.toggle("shell-scroller", hideNative);
      el.classList.toggle("no-scrollbar", hideNative);
      el.style.setProperty("scrollbar-width", hideNative ? "none" : "");
      el.style.setProperty("-ms-overflow-style", hideNative ? "none" : "");
    };

    applyScrollerChrome();
    const media = window.matchMedia(MOBILE_MEDIA_QUERY);
    media.addEventListener("change", applyScrollerChrome);

    let frame = 0;

    const sync = () => {
      const rect = el.getBoundingClientRect();
      setBounds({
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
      });
      setSizing(getScrollbarSizing());
      setMetrics({
        scrollTop: el.scrollTop,
        scrollHeight: el.scrollHeight,
        clientHeight: el.clientHeight,
      });
    };

    const onScroll = () => {
      if (dragRef.current) return;

      expandThumb();
      scheduleCollapse();

      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(sync);
    };

    sync();
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", sync);
    window.addEventListener("scroll", sync, { passive: true });
    window.visualViewport?.addEventListener("resize", sync);
    window.visualViewport?.addEventListener("scroll", sync);

    const resizeObserver = new ResizeObserver(sync);
    resizeObserver.observe(el);

    const mutationObserver = new MutationObserver(sync);
    mutationObserver.observe(el, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(frame);
      clearIdleTimer();
      media.removeEventListener("change", applyScrollerChrome);
      el.classList.remove("shell-scroller", "no-scrollbar");
      el.style.removeProperty("scrollbar-width");
      el.style.removeProperty("-ms-overflow-style");
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", sync);
      window.removeEventListener("scroll", sync);
      window.visualViewport?.removeEventListener("resize", sync);
      window.visualViewport?.removeEventListener("scroll", sync);
      resizeObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, [clearIdleTimer, containerRef, expandThumb, scheduleCollapse]);

  useEffect(() => {
    if (!expanded) return;

    const tick = () => {
      setNow(new Date());
      clockRafRef.current = requestAnimationFrame(tick);
    };

    clockRafRef.current = requestAnimationFrame(tick);
    return () => {
      if (clockRafRef.current !== null) {
        cancelAnimationFrame(clockRafRef.current);
        clockRafRef.current = null;
      }
    };
  }, [expanded]);

  const scrollFromThumbOffset = useCallback(
    (thumbOffset: number) => {
      const el = containerRef.current;
      if (!el) return;

      const { scrollable, maxThumbOffset } = getThumbMetrics(
        metricsRef.current,
        getScrollbarSizing(),
      );
      if (scrollable <= 0) return;

      const clampedOffset = Math.max(0, Math.min(maxThumbOffset, thumbOffset));
      el.scrollTop =
        maxThumbOffset > 0 ? (clampedOffset / maxThumbOffset) * scrollable : 0;
    },
    [containerRef],
  );

  const handleThumbPointerDown = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      event.preventDefault();
      event.stopPropagation();

      expandThumb();

      const { thumbHeight, trackHeight, isScrollable } = getThumbMetrics(
        metricsRef.current,
        getScrollbarSizing(),
      );
      if (!isScrollable) return;

      const { scrollTop, scrollHeight, clientHeight } = metricsRef.current;
      const scrollable = scrollHeight - clientHeight;
      const maxThumbOffset = Math.max(0, trackHeight - thumbHeight);

      dragRef.current = {
        pointerId: event.pointerId,
        startClientY: event.clientY,
        startScrollTop: scrollTop,
        maxThumbOffset,
        scrollable,
      };

      setIsDragging(true);
      setExpanded(true);
      event.currentTarget.setPointerCapture(event.pointerId);
    },
    [expandThumb],
  );

  const handleThumbPointerMove = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      const drag = dragRef.current;
      if (!drag || drag.pointerId !== event.pointerId) return;

      event.preventDefault();

      const el = containerRef.current;
      if (!el) return;

      const deltaY = event.clientY - drag.startClientY;
      const scrollDelta =
        drag.maxThumbOffset > 0
          ? (deltaY / drag.maxThumbOffset) * drag.scrollable
          : 0;

      el.scrollTop = Math.max(
        0,
        Math.min(drag.scrollable, drag.startScrollTop + scrollDelta),
      );

      setMetrics({
        scrollTop: el.scrollTop,
        scrollHeight: el.scrollHeight,
        clientHeight: el.clientHeight,
      });
    },
    [containerRef],
  );

  const endDrag = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      const drag = dragRef.current;
      if (!drag || drag.pointerId !== event.pointerId) return;

      dragRef.current = null;
      setIsDragging(false);

      if (event.currentTarget.hasPointerCapture(event.pointerId)) {
        event.currentTarget.releasePointerCapture(event.pointerId);
      }

      const el = containerRef.current;
      if (el) {
        setMetrics({
          scrollTop: el.scrollTop,
          scrollHeight: el.scrollHeight,
          clientHeight: el.clientHeight,
        });
      }

      scheduleCollapse();
    },
    [containerRef, scheduleCollapse],
  );

  const handleTrackPointerDown = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      if (dragRef.current) return;

      event.preventDefault();
      expandThumb();

      const { thumbHeight, trackHeight, isScrollable } = getThumbMetrics(
        metricsRef.current,
        getScrollbarSizing(),
      );
      if (!isScrollable) return;

      const rect = event.currentTarget.getBoundingClientRect();
      const clickY = event.clientY - rect.top;
      scrollFromThumbOffset(clickY - thumbHeight / 2);
      setExpanded(true);
      scheduleCollapse();
    },
    [expandThumb, scheduleCollapse, scrollFromThumbOffset],
  );

  const {
    thumbHeight,
    thumbOffset,
    trackHeight,
    nativeThumbHeight,
    scrollable,
    isScrollable,
  } = getThumbMetrics(metrics, sizing);

  if (!mounted || isMobileViewport || !bounds || !isScrollable) return null;

  const digitalClock = formatDigitalClock(now);
  const morphTransition = prefersReducedMotion ? REDUCED_MOTION_TRANSITION : EXPAND_SPRING;
  const collapseTransition = prefersReducedMotion ? REDUCED_MOTION_TRANSITION : COLLAPSE_SPRING;
  const contentTransition = prefersReducedMotion ? REDUCED_MOTION_TRANSITION : CONTENT_SPRING;
  const thumbTop = TRACK_INSET_Y + thumbOffset;

  const indicator = (
    <div
      className={cn("pointer-events-none fixed z-[120]", className)}
      style={{
        top: bounds.top,
        left: bounds.left,
        width: bounds.width,
        height: bounds.height,
      }}
    >
      <div
        className="pointer-events-none relative h-full w-full"
        role="scrollbar"
        aria-controls="main-content"
        aria-orientation="vertical"
      >
        {expanded ? (
          <div
            className="pointer-events-auto absolute z-0"
            style={{
              top: TRACK_INSET_Y,
              right: sizing.edgeMargin,
              width: sizing.thumbWidth,
              height: trackHeight,
            }}
            onPointerDown={handleTrackPointerDown}
            aria-hidden
          />
        ) : null}

        <div
          className="pointer-events-none absolute z-10"
          style={{ top: thumbTop, right: sizing.edgeMargin }}
        >
          <motion.div
            className={cn(
              "pointer-events-auto flex touch-none select-none flex-col items-center overflow-hidden",
              isDragging ? "cursor-grabbing" : "cursor-grab",
            )}
            initial={false}
            animate={{
              width: expanded ? sizing.thumbWidth : sizing.nativeThumbWidth,
              height: expanded ? thumbHeight : nativeThumbHeight,
              borderRadius: 9999,
              backgroundColor: expanded ? "#000000" : "oklch(0.55 0 0 / 0.45)",
              boxShadow: expanded
                ? "0 8px 24px rgba(0,0,0,0.28)"
                : "0 2px 8px rgba(0,0,0,0.12)",
            }}
            transition={expanded ? morphTransition : collapseTransition}
            role="slider"
            aria-label="Scroll position"
            aria-valuemin={0}
            aria-valuemax={scrollable}
            aria-valuenow={metrics.scrollTop}
            tabIndex={0}
            onPointerDown={handleThumbPointerDown}
            onPointerMove={handleThumbPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
          >
            <motion.div
              className="flex w-full flex-1 flex-col items-center justify-between py-3"
              initial={false}
              animate={{
                opacity: expanded ? 1 : 0,
                scale: expanded ? 1 : 0.8,
                y: expanded ? 0 : 4,
              }}
              transition={contentTransition}
              aria-hidden={!expanded}
            >
              <AnalogClockFace date={now} />

              <div className="flex shrink-0 flex-col items-center text-center leading-none text-white">
                <span className="text-[11px] font-semibold tracking-tight tabular-nums">
                  {digitalClock.time}
                </span>
                <span className="mt-0.5 text-[9px] font-medium uppercase tracking-wide opacity-90">
                  {digitalClock.meridiem}
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );

  return createPortal(indicator, document.body);
}
