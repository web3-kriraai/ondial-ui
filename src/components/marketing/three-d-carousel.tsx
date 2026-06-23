"use client";

import { useEffect, useRef, useState, type CSSProperties, type SyntheticEvent } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Bebas_Neue } from "next/font/google";

import { CarouselSlideImage } from "@/components/marketing/carousel-slide-image";
import { HOME_CAROUSEL_PRELOAD_IMAGE, HOME_CAROUSEL_SLIDES } from "@/config/home-carousel";

import styles from "./showcase-carousel.module.css";

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-bebas-neue",
});

const CARD_COUNT = HOME_CAROUSEL_SLIDES.length;
const MOBILE_MEDIA = "(max-width: 767px)";
const AUTO_ROTATE_DURATION_S = 32;
const AUTO_ROTATE_DURATION_REDUCED_S = 128;
const DRAG_ROTATION_FACTOR = 0.22;
const INERTIA_MULTIPLIER = 220;
const MAX_INERTIA_ROTATION = 95;
const INERTIA_DURATION_S = 0.7;
const IMAGE_LOAD_STAGGER_MS = 140;
const INITIAL_IMAGE_LOAD_COUNT = 2;

function getAutoRotateDuration() {
  if (typeof window === "undefined") return AUTO_ROTATE_DURATION_S;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ? AUTO_ROTATE_DURATION_REDUCED_S
    : AUTO_ROTATE_DURATION_S;
}

function isMobileViewport() {
  if (typeof window === "undefined") return false;
  return window.matchMedia(MOBILE_MEDIA).matches;
}

function readRotationY(element: HTMLElement): number {
  const fromGsap = gsap.getProperty(element, "rotationY");
  if (typeof fromGsap === "number" && !Number.isNaN(fromGsap)) return fromGsap;

  const transform = window.getComputedStyle(element).transform;
  if (!transform || transform === "none") return 0;

  if (transform.startsWith("matrix3d(")) {
    const values = transform
      .slice(9, -1)
      .split(",")
      .map((part) => Number.parseFloat(part.trim()));
    if (values.length === 16) {
      return (Math.atan2(values[2], values[0]) * 180) / Math.PI;
    }
  }

  if (transform.startsWith("matrix(")) {
    const values = transform
      .slice(7, -1)
      .split(",")
      .map((part) => Number.parseFloat(part.trim()));
    if (values.length === 6) {
      return (Math.atan2(values[1], values[0]) * 180) / Math.PI;
    }
  }

  return 0;
}

function blockImageExtraction(event: SyntheticEvent) {
  event.preventDefault();
}

export function ThreeDCarousel() {
  const stageRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const xPosRef = useRef(0);
  const isDraggingRef = useRef(false);
  const autoRotateTweenRef = useRef<gsap.core.Tween | null>(null);
  const inertiaTweenRef = useRef<gsap.core.Tween | null>(null);
  const startAutoRotateRef = useRef<(() => void) | null>(null);
  const lastDragTsRef = useRef(0);
  const velocityRef = useRef(0);
  const useMobileCssSpinRef = useRef(true);
  const [loadedImageCount, setLoadedImageCount] = useState(INITIAL_IMAGE_LOAD_COUNT);

  useEffect(() => {
    if (!HOME_CAROUSEL_PRELOAD_IMAGE) return;

    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = HOME_CAROUSEL_PRELOAD_IMAGE;
    link.type = "image/webp";
    document.head.appendChild(link);

    return () => {
      link.remove();
    };
  }, []);

  useEffect(() => {
    if (loadedImageCount >= CARD_COUNT) return;

    const timer = window.setTimeout(() => {
      setLoadedImageCount((count) => Math.min(count + 1, CARD_COUNT));
    }, IMAGE_LOAD_STAGGER_MS);

    return () => window.clearTimeout(timer);
  }, [loadedImageCount]);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const blockNative = (event: Event) => {
      event.preventDefault();
    };

    stage.addEventListener("contextmenu", blockNative);
    stage.addEventListener("dragstart", blockNative);
    stage.addEventListener("selectstart", blockNative);
    stage.addEventListener("copy", blockNative);

    return () => {
      stage.removeEventListener("contextmenu", blockNative);
      stage.removeEventListener("dragstart", blockNative);
      stage.removeEventListener("selectstart", blockNative);
      stage.removeEventListener("copy", blockNative);
    };
  }, []);

  const stopInertia = () => {
    inertiaTweenRef.current?.kill();
    inertiaTweenRef.current = null;
  };

  const clearMobileCssSpin = (ring: HTMLDivElement) => {
    ring.classList.remove(styles.carouselRingMobileSpin);
    ring.style.animationDuration = "";
    ring.style.animationPlayState = "";
  };

  const freezeMobileCssSpin = (ring: HTMLDivElement) => {
    ring.style.animationPlayState = "paused";
    const rotationY = readRotationY(ring);
    clearMobileCssSpin(ring);
    gsap.set(ring, { rotationY, force3D: true });
    return rotationY;
  };

  const pauseAutoRotate = () => {
    const ring = ringRef.current;
    if (!ring) return;

    if (isMobileViewport() && useMobileCssSpinRef.current && ring.classList.contains(styles.carouselRingMobileSpin)) {
      ring.style.animationPlayState = "paused";
      return;
    }

    autoRotateTweenRef.current?.kill();
    autoRotateTweenRef.current = null;
  };

  const resumeAutoRotate = () => {
    if (!isDraggingRef.current) {
      startAutoRotateRef.current?.();
    }
  };

  const onMouseMove = (e: globalThis.MouseEvent) => {
    drag(e.clientX);
  };

  const onTouchMove = (e: globalThis.TouchEvent) => {
    if (e.touches.length > 0) {
      drag(e.touches[0].clientX);
    }
  };

  const onDragEnd = () => {
    isDraggingRef.current = false;
    if (stageRef.current) {
      stageRef.current.style.cursor = "grab";
    }

    stopInertia();
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const momentum = gsap.utils.clamp(
      -MAX_INERTIA_ROTATION,
      MAX_INERTIA_ROTATION,
      velocityRef.current * INERTIA_MULTIPLIER,
    );

    if (!reducedMotion && Math.abs(momentum) > 0.8 && ringRef.current) {
      inertiaTweenRef.current = gsap.to(ringRef.current, {
        rotationY: `-=${momentum}`,
        duration: INERTIA_DURATION_S,
        ease: "power3.out",
        overwrite: "auto",
        force3D: true,
        onComplete: () => {
          inertiaTweenRef.current = null;
          resumeAutoRotate();
        },
      });
    } else {
      resumeAutoRotate();
    }

    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("touchmove", onTouchMove);
    window.removeEventListener("mouseup", onDragEnd);
    window.removeEventListener("touchend", onDragEnd);
  };

  const dragStart = (clientX: number) => {
    const ring = ringRef.current;
    if (!ring) return;

    isDraggingRef.current = true;
    xPosRef.current = clientX;
    lastDragTsRef.current = performance.now();
    velocityRef.current = 0;
    stopInertia();

    if (isMobileViewport() && useMobileCssSpinRef.current && ring.classList.contains(styles.carouselRingMobileSpin)) {
      useMobileCssSpinRef.current = false;
      freezeMobileCssSpin(ring);
    } else {
      pauseAutoRotate();
    }

    if (stageRef.current) {
      stageRef.current.style.cursor = "grabbing";
    }
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("mouseup", onDragEnd);
    window.addEventListener("touchend", onDragEnd);
  };

  const drag = (currentClientX: number) => {
    if (!isDraggingRef.current || !ringRef.current) return;
    const now = performance.now();
    const deltaX = currentClientX - xPosRef.current;
    const rotationDelta = deltaX * DRAG_ROTATION_FACTOR;
    const dt = Math.max(now - lastDragTsRef.current, 1);
    const instantaneousVelocity = rotationDelta / dt;
    velocityRef.current = velocityRef.current * 0.78 + instantaneousVelocity * 0.22;

    gsap.set(ringRef.current, {
      rotationY: `-=${rotationDelta}`,
      force3D: true,
    });

    xPosRef.current = currentClientX;
    lastDragTsRef.current = now;
  };

  useGSAP(
    () => {
      const ring = ringRef.current;
      if (!ring) return;

      gsap.set(ring, { force3D: true, transformOrigin: "50% 50%" });

      const startAutoRotate = () => {
        autoRotateTweenRef.current?.kill();
        autoRotateTweenRef.current = null;
        clearMobileCssSpin(ring);

        if (isDraggingRef.current) return;

        const duration = getAutoRotateDuration();

        if (isMobileViewport() && useMobileCssSpinRef.current) {
          ring.classList.add(styles.carouselRingMobileSpin);
          ring.style.animationDuration = `${duration}s`;
          ring.style.animationPlayState = "running";
          return;
        }

        autoRotateTweenRef.current = gsap.to(ring, {
          rotationY: "+=360",
          duration,
          ease: "none",
          repeat: -1,
          force3D: true,
          lazy: false,
        });
      };

      startAutoRotateRef.current = startAutoRotate;
      startAutoRotate();

      const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      const mobileQuery = window.matchMedia(MOBILE_MEDIA);

      const onMotionPreferenceChange = () => startAutoRotate();
      const onViewportChange = () => {
        useMobileCssSpinRef.current = isMobileViewport();
        startAutoRotate();
      };

      reducedMotionQuery.addEventListener("change", onMotionPreferenceChange);
      mobileQuery.addEventListener("change", onViewportChange);

      return () => {
        autoRotateTweenRef.current?.kill();
        autoRotateTweenRef.current = null;
        stopInertia();
        clearMobileCssSpin(ring);
        startAutoRotateRef.current = null;
        reducedMotionQuery.removeEventListener("change", onMotionPreferenceChange);
        mobileQuery.removeEventListener("change", onViewportChange);
      };
    },
    { scope: stageRef },
  );

  const ringStyle = {
    "--n": CARD_COUNT,
  } as CSSProperties;

  return (
    <div
      ref={stageRef}
      className={`${styles.carouselStage} ${styles.carouselStageSecure} ${bebasNeue.variable}`}
      style={{ cursor: "grab" }}
      onContextMenu={blockImageExtraction}
      onDragStart={blockImageExtraction}
      onMouseDown={(e) => dragStart(e.clientX)}
      onTouchStart={(e) => {
        if (e.touches.length > 0) {
          dragStart(e.touches[0].clientX);
        }
      }}
    >
      <div ref={ringRef} className={styles.carouselRing} style={ringStyle}>
        {HOME_CAROUSEL_SLIDES.map((slide, index) => {
          const cardStyle = {
            "--i": index,
          } as CSSProperties;

          return (
            <div
              key={slide.slug}
              className={`carousel-card ${styles.carouselCard} ${styles.carouselCardSecure}`}
              style={cardStyle}
              onContextMenu={blockImageExtraction}
              onDragStart={blockImageExtraction}
            >
              <CarouselSlideImage
                src={slide.image}
                alt={slide.title}
                shouldLoad={index < loadedImageCount}
                priority={index === 0}
              />

              <div className={styles.carouselCardShield} aria-hidden />

              <div className={styles.carouselCardOverlay}>
                <div className={styles.carouselCardHeader}>
                  <h3 className={styles.carouselCardTitle}>{slide.title}</h3>
                </div>
                <div className={styles.carouselCardFooter}>
                  <p className={styles.carouselCardSubtitle}>{slide.subtitle}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
