"use client";

import { ArrowRight } from "lucide-react";
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  type ComponentType,
  type ReactNode,
  type RefObject,
} from "react";

import { cn } from "@/lib/utils";

import type { LottieComponentProps, LottieRefCurrentProps } from "lottie-react";

export type LazyLottieHandle = {
  ensureLoaded: () => Promise<void>;
  play: () => void;
  reset: () => void;
};

type LazyLottieProps = {
  animationData: LottieComponentProps["animationData"];
  className?: string;
  autoplay?: boolean;
  loop?: boolean;
  lottieRef?: RefObject<LottieRefCurrentProps | null>;
  fallback?: ReactNode;
  fallbackClassName?: string;
  /** `interaction` = first hover/focus (homepage). `visible` = in viewport. `idle` = after idle. */
  loadTrigger?: "interaction" | "visible" | "idle";
};

function DefaultArrowFallback({ className }: { className?: string }) {
  return <ArrowRight className={cn("size-6 text-white", className)} strokeWidth={2.25} aria-hidden />;
}

export const LazyLottie = forwardRef<LazyLottieHandle, LazyLottieProps>(function LazyLottie(
  {
    animationData,
    className,
    autoplay = false,
    loop = false,
    lottieRef: externalRef,
    fallback,
    fallbackClassName,
    loadTrigger = "interaction",
  },
  ref,
) {
  const wrapRef = useRef<HTMLSpanElement>(null);
  const internalRef = useRef<LottieRefCurrentProps>(null);
  const lottieRef = externalRef ?? internalRef;
  const [Lottie, setLottie] = useState<ComponentType<LottieComponentProps> | null>(null);
  const loadingRef = useRef<Promise<void> | null>(null);

  const ensureLoaded = useCallback(async () => {
    if (Lottie) return;
    if (!loadingRef.current) {
      loadingRef.current = import("lottie-react").then((mod) => {
        setLottie(() => mod.default);
      });
    }
    await loadingRef.current;
  }, [Lottie]);

  const play = useCallback(() => {
    void ensureLoaded().then(() => {
      requestAnimationFrame(() => lottieRef.current?.play());
    });
  }, [ensureLoaded, lottieRef]);

  const reset = useCallback(() => {
    if (!Lottie) return;
    lottieRef.current?.stop();
    lottieRef.current?.goToAndStop(0, true);
  }, [Lottie, lottieRef]);

  useImperativeHandle(ref, () => ({ ensureLoaded, play, reset }), [ensureLoaded, play, reset]);

  useEffect(() => {
    if (loadTrigger === "interaction" || Lottie) return;

    if (loadTrigger === "idle") {
      const idleId =
        typeof requestIdleCallback !== "undefined"
          ? requestIdleCallback(() => {
              void ensureLoaded();
            })
          : window.setTimeout(() => {
              void ensureLoaded();
            }, 2000);

      return () => {
        if (typeof cancelIdleCallback !== "undefined" && typeof idleId === "number") {
          cancelIdleCallback(idleId);
        } else {
          window.clearTimeout(idleId as number);
        }
      };
    }

    const node = wrapRef.current;
    if (!node || loadTrigger !== "visible") return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          void ensureLoaded();
          observer.disconnect();
        }
      },
      { rootMargin: "120px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [Lottie, loadTrigger, ensureLoaded]);

  const onInteract = () => {
    void ensureLoaded();
  };

  if (!Lottie) {
    return (
      <span
        ref={wrapRef}
        className={cn("inline-flex", className)}
        onPointerEnter={loadTrigger === "interaction" ? onInteract : undefined}
        onFocus={loadTrigger === "interaction" ? onInteract : undefined}
      >
        {fallback ?? <DefaultArrowFallback className={fallbackClassName} />}
      </span>
    );
  }

  return (
    <span ref={wrapRef} className={cn("inline-flex", className)}>
      <Lottie
        lottieRef={lottieRef}
        animationData={animationData}
        autoplay={autoplay}
        loop={loop}
        className={className}
      />
    </span>
  );
});
