"use client";

import { useEffect, useState } from "react";

import styles from "./showcase-carousel.module.css";

type CarouselSlideImageProps = {
  src: string;
  alt: string;
  shouldLoad: boolean;
  priority?: boolean;
};

export function CarouselSlideImage({
  src,
  alt,
  shouldLoad,
  priority = false,
}: CarouselSlideImageProps) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!shouldLoad) return;

    let cancelled = false;
    const img = new window.Image();

    img.decoding = "async";
    if (priority) {
      img.fetchPriority = "high";
    }

    img.onload = () => {
      if (!cancelled) setIsReady(true);
    };
    img.onerror = () => {
      if (!cancelled) setIsReady(false);
    };
    img.src = src;

    return () => {
      cancelled = true;
      img.onload = null;
      img.onerror = null;
    };
  }, [shouldLoad, src, priority]);

  return (
    <div
      className={`${styles.carouselImage} ${isReady ? styles.carouselImageReady : ""}`}
      style={isReady ? { backgroundImage: `url("${src}")` } : undefined}
      role="img"
      aria-label={alt}
    />
  );
}
