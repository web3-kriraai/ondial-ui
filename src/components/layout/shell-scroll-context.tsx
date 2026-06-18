"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  type ReactNode,
  type RefObject,
} from "react";

type ShellScrollContextValue = {
  scrollTo: (options?: ScrollToOptions) => void;
  scrollToTop: (behavior?: ScrollBehavior) => void;
};

const ShellScrollContext = createContext<ShellScrollContextValue | null>(null);

type ShellScrollProviderProps = {
  scrollerRef: RefObject<HTMLDivElement | null>;
  children: ReactNode;
};

export function ShellScrollProvider({ scrollerRef, children }: ShellScrollProviderProps) {
  const scrollTo = useCallback(
    (options?: ScrollToOptions) => {
      const scroller = scrollerRef.current;
      if (scroller) {
        scroller.scrollTo(options);
        return;
      }

      window.scrollTo(options);
    },
    [scrollerRef],
  );

  const scrollToTop = useCallback(
    (behavior: ScrollBehavior = "smooth") => {
      scrollTo({ top: 0, left: 0, behavior });
    },
    [scrollTo],
  );

  const value = useMemo(
    () => ({
      scrollTo,
      scrollToTop,
    }),
    [scrollTo, scrollToTop],
  );

  return <ShellScrollContext.Provider value={value}>{children}</ShellScrollContext.Provider>;
}

export function useShellScroll() {
  const context = useContext(ShellScrollContext);

  if (!context) {
    return {
      scrollTo: (options?: ScrollToOptions) => window.scrollTo(options),
      scrollToTop: (behavior: ScrollBehavior = "smooth") =>
        window.scrollTo({ top: 0, left: 0, behavior }),
    };
  }

  return context;
}
