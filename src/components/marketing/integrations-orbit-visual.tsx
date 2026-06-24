"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";

import { INTEGRATION_PARTNERS, type IntegrationPartner } from "@/data/integrations";
import { cn } from "@/lib/utils";

import styles from "./integrations-orbit.module.css";

const RING_DEFS = [
  { id: "inner", radiusRatio: 0.38, phase: 0 },
  { id: "middle", radiusRatio: 0.62, phase: 0.5 },
  { id: "outer", radiusRatio: 0.88, phase: 0 },
] as const;

const MOBILE_QUARTER_RING_RATIOS = [0.68, 0.84, 1] as const;
const OUTER_RADIUS_RATIO = RING_DEFS[RING_DEFS.length - 1].radiusRatio;
const RING_ICON_WEIGHTS = [3, 5, 8] as const;
const ORBIT_WIDTH_FILL = 0.98;
const MOBILE_ORBIT_WIDTH_FILL = 1.04;
const ORBIT_MAX_DIAMETER_PX = 920;
const SCROLL_DURATION_MS = 48_000;
const ARC_INSET = 0.06;
const MOBILE_ORBIT_MQ = "(max-width: 767px)";
const SSR_ORBIT_DIAMETER_PX = 560;

const QUARTER_VIEW = 500;
const SEMI_VIEW_W = 1000;
const SEMI_VIEW_H = 500;
const ICON_VB = 40;
const ICON_WIDE_VB = { w: 56, h: 34 };

type OrbitArcLayout = "semi" | "quarter";

function arcAngleOnVisibleArc(
  layout: OrbitArcLayout,
  slotIndex: number,
  slotCount: number,
  ringPhaseStep: number,
  scrollPhase: number,
): number {
  if (slotCount <= 1) {
    return layout === "quarter" ? (3 * Math.PI) / 4 : Math.PI / 2;
  }

  const [start, end] =
    layout === "quarter"
      ? [Math.PI * (1 - ARC_INSET), (Math.PI / 2) * (1 - ARC_INSET)]
      : [Math.PI * (1 - ARC_INSET), Math.PI * ARC_INSET];

  const span = start - end;
  const segment = span / slotCount;
  const raw = slotIndex + 0.5 + ringPhaseStep + scrollPhase * slotCount;
  const local = ((raw % slotCount) + slotCount) % slotCount;
  return start - segment * local;
}

function orbitCenter(layout: OrbitArcLayout) {
  return layout === "quarter"
    ? { cx: QUARTER_VIEW, cy: QUARTER_VIEW }
    : { cx: SEMI_VIEW_W / 2, cy: SEMI_VIEW_H };
}

function iconPointOnArc(
  layout: OrbitArcLayout,
  angleRad: number,
  radiusVb: number,
) {
  const { cx, cy } = orbitCenter(layout);
  return {
    x: cx + Math.cos(angleRad) * radiusVb,
    y: cy - Math.sin(angleRad) * radiusVb,
  };
}

function ringRadiusVb(
  layout: OrbitArcLayout,
  ringIndex: number,
  def: (typeof RING_DEFS)[number],
): number {
  if (layout === "quarter") {
    return MOBILE_QUARTER_RING_RATIOS[ringIndex] * QUARTER_VIEW;
  }
  return def.radiusRatio * SEMI_VIEW_H;
}

function outerRadiusFromDiameter(orbitDiameterPx: number): number {
  return (orbitDiameterPx / 2) * OUTER_RADIUS_RATIO;
}

function measureOrbitDiameter(viewportWidth: number, columnWidth: number): number {
  if (viewportWidth < 768) {
    const outerR = viewportWidth * MOBILE_ORBIT_WIDTH_FILL;
    return Math.round(
      Math.max(300, Math.min((outerR * 2) / OUTER_RADIUS_RATIO, ORBIT_MAX_DIAMETER_PX)),
    );
  }
  return Math.round(
    Math.max(280, Math.min((columnWidth * ORBIT_WIDTH_FILL) / OUTER_RADIUS_RATIO, ORBIT_MAX_DIAMETER_PX)),
  );
}

function ringIconCounts(total: number): [number, number, number] {
  const weightSum = RING_ICON_WEIGHTS[0] + RING_ICON_WEIGHTS[1] + RING_ICON_WEIGHTS[2];
  let inner = Math.max(2, Math.round((total * RING_ICON_WEIGHTS[0]) / weightSum));
  let middle = Math.max(3, Math.round((total * RING_ICON_WEIGHTS[1]) / weightSum));
  let outer = total - inner - middle;
  if (outer <= middle) {
    middle = Math.max(2, middle - 1);
    outer = total - inner - middle;
  }
  if (outer <= inner) {
    inner = Math.max(2, inner - 1);
    outer = total - inner - middle;
  }
  return [inner, middle, outer];
}

type PlacedIcon = {
  partner: IntegrationPartner;
  slotIndex: number;
  slotCount: number;
  ringPhaseStep: number;
  radiusVb: number;
};

function buildPlacedIcons(layout: OrbitArcLayout): PlacedIcon[] {
  const [innerN, middleN, outerN] = ringIconCounts(INTEGRATION_PARTNERS.length);
  const counts = [innerN, middleN, outerN];
  const placed: PlacedIcon[] = [];
  let offset = 0;

  RING_DEFS.forEach((def, ringIndex) => {
    const ringPartners = INTEGRATION_PARTNERS.slice(offset, offset + counts[ringIndex]);
    offset += counts[ringIndex];
    const radiusVb = ringRadiusVb(layout, ringIndex, def);
    const ringPhaseStep = def.phase === 0.5 ? 0.5 : 0;

    ringPartners.forEach((partner, index) => {
      placed.push({
        partner,
        slotIndex: index,
        slotCount: ringPartners.length,
        ringPhaseStep,
        radiusVb,
      });
    });
  });

  return placed;
}

function applySvgIconTransform(
  el: SVGGElement,
  icon: PlacedIcon,
  scrollPhase: number,
  layout: OrbitArcLayout,
) {
  const angleRad = arcAngleOnVisibleArc(
    layout,
    icon.slotIndex,
    icon.slotCount,
    icon.ringPhaseStep,
    scrollPhase,
  );
  const { x, y } = iconPointOnArc(layout, angleRad, icon.radiusVb);
  const rx = Math.round(x * 1000) / 1000;
  const ry = Math.round(y * 1000) / 1000;
  el.setAttribute("transform", `translate(${rx} ${ry})`);
}

export function IntegrationsOrbitVisual() {
  const svgRef = useRef<SVGSVGElement>(null);
  const slotsRef = useRef<Map<string, SVGGElement>>(new Map());
  const iconsRef = useRef<PlacedIcon[]>([]);
  const scrollPhaseRef = useRef(0);
  const rafRef = useRef(0);
  const layoutRef = useRef<OrbitArcLayout>("semi");

  const [arcLayout, setArcLayout] = useState<OrbitArcLayout>("semi");
  const [orbitDiameterPx, setOrbitDiameterPx] = useState(SSR_ORBIT_DIAMETER_PX);
  const [layoutReady, setLayoutReady] = useState(false);
  const [iconsReady, setIconsReady] = useState(false);

  const placedIcons = useMemo(() => buildPlacedIcons(arcLayout), [arcLayout]);
  iconsRef.current = placedIcons;
  layoutRef.current = arcLayout;

  useEffect(() => {
    setLayoutReady(true);
  }, []);

  useEffect(() => {
    if (!layoutReady) return;
    setIconsReady(true);
  }, [layoutReady]);

  useLayoutEffect(() => {
    if (!layoutReady) return;

    const mq = window.matchMedia(MOBILE_ORBIT_MQ);
    const sync = () => {
      const next: OrbitArcLayout = mq.matches ? "quarter" : "semi";
      layoutRef.current = next;
      setArcLayout(next);
    };
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, [layoutReady]);

  useLayoutEffect(() => {
    if (!layoutReady) return;

    const svg = svgRef.current;
    if (!svg) return;

    let measureRaf = 0;
    const measure = () => {
      cancelAnimationFrame(measureRaf);
      measureRaf = requestAnimationFrame(() => {
        const column = svg.closest("[data-orbit-column]") as HTMLElement | null;
        const viewportWidth =
          window.visualViewport?.width ?? window.innerWidth;
        const columnWidth = column?.clientWidth ?? svg.clientWidth;
        const next = measureOrbitDiameter(viewportWidth, columnWidth);
        setOrbitDiameterPx((prev) => (prev === next ? prev : next));
      });
    };

    measure();
    const observer = new ResizeObserver(measure);
    const column = svg.closest("[data-orbit-column]");
    if (column) observer.observe(column);
    observer.observe(svg);
    return () => {
      cancelAnimationFrame(measureRaf);
      observer.disconnect();
    };
  }, [arcLayout, layoutReady]);

  useLayoutEffect(() => {
    if (!iconsReady) return;

    for (const icon of placedIcons) {
      const el = slotsRef.current.get(icon.partner.id);
      if (el) applySvgIconTransform(el, icon, scrollPhaseRef.current, arcLayout);
    }
  }, [placedIcons, arcLayout, iconsReady]);

  useLayoutEffect(() => {
    if (!iconsReady) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const startedAt = performance.now();
    const tick = (now: number) => {
      const phase = ((now - startedAt) % SCROLL_DURATION_MS) / SCROLL_DURATION_MS;
      scrollPhaseRef.current = phase;
      const icons = iconsRef.current;
      const layoutNow = layoutRef.current;
      for (const icon of icons) {
        const el = slotsRef.current.get(icon.partner.id);
        if (el) applySvgIconTransform(el, icon, phase, layoutNow);
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [arcLayout, iconsReady]);

  const renderLayout = layoutReady ? arcLayout : "semi";
  const renderDiameterPx = layoutReady ? orbitDiameterPx : SSR_ORBIT_DIAMETER_PX;
  const isQuarter = renderLayout === "quarter";
  const outerR = Math.ceil(outerRadiusFromDiameter(renderDiameterPx));
  const stageHeightPx = isQuarter ? outerR : Math.ceil(renderDiameterPx / 2);
  const pivotWidthPx = isQuarter ? outerR : renderDiameterPx;
  const pivotHeightPx = isQuarter ? outerR : stageHeightPx;
  const viewBox = isQuarter ? `0 0 ${QUARTER_VIEW} ${QUARTER_VIEW}` : `0 0 ${SEMI_VIEW_W} ${SEMI_VIEW_H}`;
  const { cx, cy } = orbitCenter(renderLayout);

  return (
    <div
      className={cn(styles.semiOrbitWrap, isQuarter && styles.semiOrbitWrapQuarter)}
      data-orbit-layout={renderLayout}
      aria-hidden
    >
      <div
        className={cn(styles.semiOrbitStage, isQuarter && styles.semiOrbitStageQuarter)}
        style={{ height: stageHeightPx, minHeight: stageHeightPx }}
      >
        <div
          className={cn(styles.orbitPivot, isQuarter && styles.orbitPivotQuarter)}
          style={{ width: pivotWidthPx, height: pivotHeightPx }}
        >
          <svg
            ref={svgRef}
            className={styles.semiOrbitGuides}
            viewBox={viewBox}
            fill="none"
            preserveAspectRatio={isQuarter ? "xMaxYMax meet" : "xMidYMax meet"}
            aria-hidden
          >
            {RING_DEFS.map((def, ringIndex) => {
              const r = ringRadiusVb(renderLayout, ringIndex, def);
              if (isQuarter) {
                return (
                  <path
                    key={def.id}
                    d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx} ${cy - r}`}
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeDasharray="6 8"
                  />
                );
              }
              return (
                <path
                  key={def.id}
                  d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeDasharray="6 8"
                />
              );
            })}

            {iconsReady
              ? placedIcons.map((icon) => {
                const wide = icon.partner.logoFit === "wide";
                const w = wide ? ICON_WIDE_VB.w : ICON_VB;
                const h = wide ? ICON_WIDE_VB.h : ICON_VB;

                return (
                  <g
                    key={icon.partner.id}
                    ref={(el) => {
                      if (el) slotsRef.current.set(icon.partner.id, el);
                      else slotsRef.current.delete(icon.partner.id);
                    }}
                  >
                    <image
                      href={icon.partner.logoSrc}
                      x={-w / 2}
                      y={-h / 2}
                      width={w}
                      height={h}
                      preserveAspectRatio="xMidYMid meet"
                    />
                  </g>
                );
              })
              : null}
          </svg>
        </div>
      </div>
    </div>
  );
}
