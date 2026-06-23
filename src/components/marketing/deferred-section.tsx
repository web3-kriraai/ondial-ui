"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type DeferredSectionProps = {
  children: ReactNode;
  minHeight?: string;
  className?: string;
};

/** Mounts children near the viewport so their JS/CSS load after first paint. */
export function DeferredSection({
  children,
  minHeight = "24rem",
  className,
}: DeferredSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "280px 0px 0px 0px", threshold: 0.01 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={className} style={!inView ? { minHeight } : undefined}>
      {inView ? children : null}
    </div>
  );
}
