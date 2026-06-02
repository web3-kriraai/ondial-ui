"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { SERVICE_MATTE_COLORS } from "@/lib/services-data";

import styles from "./showcase-section.module.css";

export type CarouselCard = {
  num: string;
  category: string;
  title: string;
  description: string;
  color: string;
  /** Optional full-bleed card background — falls back to solid `color` when omitted. */
  image?: string;
};

const CARD_CONTENT: Omit<CarouselCard, "color">[] = [
  {
    num: "01",
    category: "Health",
    title: "Healthcare & Medical",
    description:
      "Automate appointment reminders, prescription refills, follow-ups, lab result notifications, and chronic care management. Improve patient engagement and reduce no-shows.",
  },
  {
    num: "02",
    category: "Finance",
    title: "Finance & Banking",
    description:
      "Enable fraud alerts, loan status updates, payment reminders, credit score notifications, and account activity updates. Enhance customer security and financial communication.",
  },
  {
    num: "03",
    category: "Property",
    title: "Real Estate",
    description:
      "Manage property inquiries, schedule site visits, share market updates, handle lease renewals, and streamline closing process communication.",
  },
  {
    num: "04",
    category: "Retail",
    title: "Retail & E-commerce",
    description:
      "Recover abandoned carts, send order and delivery updates, collect customer feedback, manage returns, and promote seasonal offers with AI-powered outreach.",
  },
  {
    num: "05",
    category: "Insurance",
    title: "Insurance",
    description:
      "Automate policy renewals, claim status updates, premium reminders, and risk assessment notifications. Improve customer trust and response times.",
  },
  {
    num: "06",
    category: "Sales",
    title: "Sales & Lead Generation",
    description:
      "Qualify leads, schedule appointments, follow up with prospects, and launch win-back campaigns. Increase conversions with automated engagement.",
  },
  {
    num: "07",
    category: "BPO",
    title: "Call Centers & BPO",
    description:
      "Automate customer surveys, feedback collection, compliance notifications, and data verification processes. Improve operational efficiency and service quality.",
  },
  {
    num: "08",
    category: "Telecom",
    title: "Telecom",
    description:
      "Handle service activations, billing support, technical assistance, and contract renewal reminders. Deliver faster customer communication and support.",
  },
  {
    num: "09",
    category: "Auto",
    title: "Automotive",
    description:
      "Manage service reminders, warranty extensions, recall notifications, insurance updates, and financing assistance. Keep customers informed throughout the ownership journey.",
    image: "/automotive.jpg",
  },
  {
    num: "10",
    category: "Education",
    title: "Education",
    description:
      "Automate enrollment confirmations, tuition reminders, academic progress updates, and alumni engagement campaigns. Improve communication across the education lifecycle.",
  },
  {
    num: "11",
    category: "Travel",
    title: "Travel & Tourism",
    description:
      "Automate booking confirmations, flight updates, check-in reminders, weather alerts, and loyalty program notifications. Enhance traveler experience with real-time communication.",
  },
  {
    num: "12",
    category: "Hospitality",
    title: "Hospitality Services",
    description:
      "Streamline reservation confirmations, concierge assistance, check-in coordination, guest feedback collection, and loyalty program communication.",
  },
  {
    num: "13",
    category: "Legal",
    title: "Legal Services",
    description:
      "Send case progress updates, appointment reminders, document notifications, and compliance deadline alerts. Deliver secure and professional client communication.",
  },
  {
    num: "14",
    category: "Gov",
    title: "Government Services",
    description:
      "Manage application status updates, tax reminders, license renewals, compliance notifications, and citizen engagement surveys. Improve public service efficiency.",
  },
  {
    num: "15",
    category: "Utilities",
    title: "Utilities",
    description:
      "Automate bill reminders, outage notifications, meter reading appointments, and energy-saving recommendations. Improve customer trust and service transparency.",
  },
  {
    num: "16",
    category: "Non-Profit",
    title: "Non-Profit Organizations",
    description:
      "Run donation campaigns, recruit volunteers, send event invitations, share grant updates, and automate donor appreciation calls. Strengthen community engagement.",
  },
  {
    num: "17",
    category: "Logistics",
    title: "Transportation & Logistics",
    description:
      "Provide delivery tracking updates, delay notifications, documentation reminders, rate quotations, and compliance alerts. Optimize supply chain communication.",
  },
  {
    num: "18",
    category: "Manufacturing",
    title: "Manufacturing",
    description:
      "Automate production updates, quality assurance notifications, maintenance schedules, safety alerts, and supplier coordination workflows.",
  },
  {
    num: "19",
    category: "Construction",
    title: "Construction",
    description:
      "Send project progress updates, permit notifications, material delivery schedules, safety inspection reminders, and payment milestone alerts.",
  },
  {
    num: "20",
    category: "Agriculture",
    title: "Agriculture",
    description:
      "Enable crop management alerts, market updates, insurance claims, loan reminders, and equipment maintenance scheduling. Empower farmers with real-time updates.",
  },
];

export const CAROUSEL_CARDS: CarouselCard[] = CARD_CONTENT.map((card, index) => ({
  ...card,
  color: SERVICE_MATTE_COLORS[index % SERVICE_MATTE_COLORS.length],
}));

/** Center must scale down enough to beat 3D perspective (front of ring reads closest). */
const MIN_CENTER_SCALE = 0.52;
const MAX_EDGE_SCALE = 1.06;
const CENTER_DEPTH_PULL = 0.22;
const CARD_ASPECT = 36 / 26;
const PACK_FACTOR = 0.9;
const LARGE_SCREEN_MIN = 1024;
/** Fixed card size on large screens — does not shrink when browser zoom changes. */
const LARGE_CARD_WIDTH = 320;
const LARGE_CARD_HEIGHT = Math.round(LARGE_CARD_WIDTH * CARD_ASPECT);

type CarouselLayout = {
  visibleTarget: number;
  width: number;
  height: number;
  ringDepth: number;
  scaleArcDeg: number;
  isLargeScreen: boolean;
};

function isLargeScreen() {
  const viewportWidth = window.visualViewport?.width ?? window.innerWidth;
  return viewportWidth >= LARGE_SCREEN_MIN;
}

/**
 * How many cards should span the front arc (from stage width — resize & zoom).
 * e.g. ~1867px → 8 cards; ~1551px → 6 cards (not 8 packed together).
 */
function getVisibleCardTarget(stageWidth: number, isLarge: boolean): number {
  if (!isLarge) {
    const screenW = window.visualViewport?.width ?? window.innerWidth;
    if (screenW < 640) return 2;
    if (screenW < 768) return 3;
    return 4;
  }

  if (stageWidth >= 1800) return 8;
  if (stageWidth >= 1620) return 7;
  if (stageWidth >= 1420) return 6;
  if (stageWidth >= 1080) return 5;
  if (stageWidth >= 860) return 4;
  return 4;
}

/** Side arc angle so the ring fits ~visibleTarget cards across the stage. */
function getSideAngleRad(visibleTarget: number, step: number) {
  const spread =
    visibleTarget <= 5 ? 0.44 : visibleTarget <= 6 ? 0.5 : visibleTarget <= 7 ? 0.54 : 0.68;
  const sideAngleDeg = Math.min(Math.max((visibleTarget - 1) * step * spread, step * 2), 86);
  return (sideAngleDeg * Math.PI) / 180;
}

function getScaleArcDeg(visibleTarget: number, step: number) {
  return Math.min((visibleTarget - 1) * step * 0.88, 82);
}

function getCardDimensions(
  stageWidth: number,
  isLarge: boolean,
): { width: number; height: number } {
  if (isLarge) {
    return { width: LARGE_CARD_WIDTH, height: LARGE_CARD_HEIGHT };
  }

  const visibleTarget = getVisibleCardTarget(stageWidth, false);
  const width = (stageWidth / visibleTarget) * PACK_FACTOR;
  return { width, height: width * CARD_ASPECT };
}

function getLayoutMetrics(stageWidth: number, ringCardCount: number): CarouselLayout {
  const viewportWidth = window.visualViewport?.width ?? window.innerWidth;
  const isTablet = viewportWidth >= 768 && viewportWidth <= 1024;
  const large = isLargeScreen();
  const visibleTarget = getVisibleCardTarget(stageWidth, large);
  const { width, height } = getCardDimensions(stageWidth, large);
  const step = 360 / ringCardCount;
  const halfStepRad = ((step / 2) * Math.PI) / 180;
  const gapRatio = large ? 0.44 : 0.48;
  const tightRadius = (width * gapRatio) / (2 * Math.sin(halfStepRad));

  const edgeInset = width * (large ? 0.02 : 0.04);
  const halfSpan = stageWidth / 2 - edgeInset;
  const sideAngleRad = getSideAngleRad(visibleTarget, step);
  const edgeRadius = halfSpan / Math.sin(sideAngleRad);
  /**
   * As card count grows (e.g. 20 cards), increase radius to avoid crowding.
   * Keeps prior look for 16 cards while progressively opening spacing above that.
   */
  const cardCountBoost = ringCardCount > 16 ? 1 + Math.min((ringCardCount - 16) * 0.04, 0.2) : 1;
  const ringSpreadBoost = (large && visibleTarget <= 6 ? 0.98 : 1) * cardCountBoost;
  /**
   * Mobile: bias toward tighter radius so only ~3-4 cards are prominent,
   * with a stronger/smoother center curve.
   */
  const mobileEdgeLimit = edgeRadius * 0.68;
  const mobileTightTarget = tightRadius * 0.92;
  /** On large screens, edge radius drives spread — avoids tight ring showing extra cards. */
  const mobileBaseDepth = Math.min(mobileEdgeLimit, mobileTightTarget);
  const mobileRadiusBoost = 2.8;
  const baseRingDepth = large ? edgeRadius * ringSpreadBoost : mobileBaseDepth * mobileRadiusBoost;
  const ringDepth = isTablet ? baseRingDepth * 1.22 : baseRingDepth;
  const scaleArcDeg = getScaleArcDeg(visibleTarget, step);

  return { visibleTarget, width, height, ringDepth, scaleArcDeg, isLargeScreen: large };
}

function applyStageTokens(stage: HTMLDivElement, layout: CarouselLayout) {
  const { width, height, isLargeScreen: large } = layout;
  stage.style.setProperty("--carousel-card-w", `${width}px`);
  stage.style.setProperty("--carousel-card-h", `${height}px`);
  stage.style.minHeight = large ? "27rem" : `${height * 1.18}px`;
  stage.dataset.carouselLayout = large ? "large-fixed" : "fluid";
}

function getInitialRingRotation(cardCount: number) {
  const step = 360 / cardCount;
  return 180 + step * 2;
}

function normalizeAngle(deg: number) {
  let angle = deg % 360;
  if (angle > 180) angle -= 360;
  if (angle < -180) angle += 360;
  return angle;
}

function getOffsetFromFront(index: number, ringRotationY: number, cardAngle: number) {
  return normalizeAngle(ringRotationY - index * cardAngle - 180);
}

function getScaleForOffset(offsetDeg: number, scaleArcDeg: number) {
  const t = Math.min(Math.abs(offsetDeg) / scaleArcDeg, 1);
  return MIN_CENTER_SCALE + (MAX_EDGE_SCALE - MIN_CENTER_SCALE) * t;
}

export function ThreeDCarousel() {
  const stageRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const xPosRef = useRef(0);
  const isDraggingRef = useRef(false);
  const isHoveredRef = useRef(false);
  const autoRotateTweenRef = useRef<gsap.core.Tween | null>(null);
  const [detailCardNum, setDetailCardNum] = useState<string | null>(null);

  const pauseAutoRotate = () => {
    autoRotateTweenRef.current?.pause();
  };

  const resumeAutoRotate = () => {
    if (!isDraggingRef.current && !isHoveredRef.current) {
      autoRotateTweenRef.current?.resume();
    }
  };

  useGSAP(
    () => {
      const stage = stageRef.current;
      const cards = stage?.querySelectorAll(".carousel-card");
      if (!stage || !cards?.length || !ringRef.current) return;

      let cardAngle = 360 / cards.length;
      let ringDepth = 0;
      let scaleArcDeg = 78;
      let hasSetInitialRotation = false;

      const updateCardScales = () => {
        const ringRotationY = Number(gsap.getProperty(ringRef.current, "rotationY")) || 0;

        cards.forEach((card, index) => {
          const offset = getOffsetFromFront(index, ringRotationY, cardAngle);
          const scale = getScaleForOffset(offset, scaleArcDeg);
          const centerFactor = 1 - Math.min(Math.abs(offset) / scaleArcDeg, 1);
          const z =
            -ringDepth -
            centerFactor * ringDepth * CENTER_DEPTH_PULL +
            (1 - centerFactor) * ringDepth * 0.03;

          gsap.set(card, {
            scale,
            z,
          });
        });
      };

      const layoutRing = () => {
        const stageWidth = stage.getBoundingClientRect().width;
        const cardCount = cards.length;
        cardAngle = 360 / cardCount;

        const layout = getLayoutMetrics(stageWidth, cardCount);
        const { width, height } = layout;
        ringDepth = layout.ringDepth;
        scaleArcDeg = layout.scaleArcDeg;
        applyStageTokens(stage, layout);

        gsap.set(cards, {
          left: "50%",
          top: "50%",
          xPercent: -50,
          yPercent: -50,
          width,
          height,
          rotateY: (i) => i * -cardAngle,
          transformOrigin: `50% 50% ${ringDepth}px`,
          z: -ringDepth,
          scale: 1,
          backfaceVisibility: "hidden",
          opacity: 1,
        });

        if (!hasSetInitialRotation) {
          gsap.set(ringRef.current, { rotationY: getInitialRingRotation(cardCount) });
          hasSetInitialRotation = true;
        }
        updateCardScales();
      };

      layoutRing();
      autoRotateTweenRef.current?.kill();
      autoRotateTweenRef.current = gsap.to(ringRef.current, {
        rotationY: "-=360",
        duration: 45,
        ease: "none",
        repeat: -1,
      });

      const resizeObserver =
        typeof ResizeObserver !== "undefined" ? new ResizeObserver(layoutRing) : null;
      resizeObserver?.observe(stage);
      window.addEventListener("resize", layoutRing);
      window.visualViewport?.addEventListener("resize", layoutRing);
      gsap.ticker.add(updateCardScales);

      return () => {
        autoRotateTweenRef.current?.kill();
        autoRotateTweenRef.current = null;
        resizeObserver?.disconnect();
        window.removeEventListener("resize", layoutRing);
        window.visualViewport?.removeEventListener("resize", layoutRing);
        gsap.ticker.remove(updateCardScales);
      };
    },
    { scope: stageRef },
  );

  const onDragEnd = () => {
    isDraggingRef.current = false;
    if (stageRef.current) {
      stageRef.current.style.cursor = "grab";
    }
    resumeAutoRotate();
    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("touchmove", onTouchMove);
    window.removeEventListener("mouseup", onDragEnd);
    window.removeEventListener("touchend", onDragEnd);
  };

  const showCardDetail = (num: string) => {
    if (!isDraggingRef.current) {
      setDetailCardNum(num);
    }
  };

  const hideCardDetail = () => {
    setDetailCardNum(null);
  };

  const onMouseMove = (e: globalThis.MouseEvent) => {
    drag(e.clientX);
  };

  const onTouchMove = (e: globalThis.TouchEvent) => {
    if (e.touches.length > 0) {
      drag(e.touches[0].clientX);
    }
  };

  const dragStart = (clientX: number) => {
    isDraggingRef.current = true;
    setDetailCardNum(null);
    xPosRef.current = Math.round(clientX);
    pauseAutoRotate();
    if (stageRef.current) {
      stageRef.current.style.cursor = "grabbing";
    }
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("mouseup", onDragEnd);
    window.addEventListener("touchend", onDragEnd);
  };

  const drag = (currentClientX: number) => {
    if (!isDraggingRef.current) return;
    const currentX = Math.round(currentClientX);
    const deltaX = currentX - xPosRef.current;
    const rotationDelta = (deltaX * 0.25) % 360;

    gsap.to(ringRef.current, {
      rotationY: `-=${rotationDelta}`,
      duration: 0.75,
      ease: "power2.out",
      overwrite: "auto",
    });

    xPosRef.current = currentX;
  };

  return (
    <div
      ref={stageRef}
      className={styles.carouselStage}
      style={{ cursor: "grab" }}
      onMouseEnter={() => {
        isHoveredRef.current = true;
        pauseAutoRotate();
      }}
      onMouseLeave={() => {
        isHoveredRef.current = false;
        resumeAutoRotate();
      }}
      onMouseDown={(e) => dragStart(e.clientX)}
      onTouchStart={(e) => {
        if (e.touches.length > 0) {
          dragStart(e.touches[0].clientX);
        }
      }}
    >
      <div className={styles.carouselContainer}>
        <div ref={ringRef} className={styles.carouselRing}>
          {CAROUSEL_CARDS.map((card) => {
            const showDetail = Boolean(card.image && detailCardNum === card.num);

            return (
            <div
              key={card.num}
              className={`carousel-card ${styles.carouselCard}${card.image ? ` ${styles.carouselCardHasImage}` : ""}${showDetail ? ` ${styles.carouselCardShowDetail}` : ""}`}
              style={{ backgroundColor: card.color }}
              onMouseEnter={() => showCardDetail(card.num)}
              onMouseLeave={hideCardDetail}
              onFocusCapture={() => showCardDetail(card.num)}
              onBlurCapture={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget as Node)) {
                  hideCardDetail();
                }
              }}
            >
              {card.image ? (
                <div
                  className={styles.carouselCardBg}
                  style={{ backgroundImage: `url(${card.image})` }}
                  aria-hidden
                />
              ) : null}
              <div className={styles.carouselCardInner}>
                <div className={styles.carouselCardHeader}>
                  <span className={styles.carouselCategory}>{card.category}</span>
                  <span className={styles.carouselNum}>{card.num}</span>
                </div>

                <div className={styles.carouselCardFooter}>
                  <h3 className={styles.carouselTitle}>{card.title}</h3>
                  <p className={styles.carouselDescription}>{card.description}</p>
                </div>
              </div>
            </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
