import gsap from "gsap";

/** Clip-path artboard — bottom edge maps to the panel’s physical bottom. */
const CLIP_W = 1440;
const CLIP_H = 1000;
const CLIP_BOTTOM = 1000;

export const LOADER_CLIP_TRANSFORM = `scale(${1 / CLIP_W}, ${1 / CLIP_H})`;

/** Flat loader silhouette — top pinned at y=0. */
export function buildLoaderClipPath(t: number) {
  const bow = t * 132;
  const controlY = CLIP_BOTTOM - bow;

  if (t <= 0) {
    return `M0,0 H${CLIP_W} V${CLIP_BOTTOM} H0 Z`;
  }

  return `M0,0 H${CLIP_W} V${CLIP_BOTTOM} C1260,${controlY} 180,${controlY} 0,${CLIP_BOTTOM} Z`;
}

export const LOADER_CLIP_FLAT = buildLoaderClipPath(0);

export function runLoaderExitAnimation(
  clipPath: SVGPathElement,
  panel: HTMLElement,
  onComplete: () => void,
) {
  gsap.set(panel, { y: 0, yPercent: 0, opacity: 1, force3D: true });
  clipPath.setAttribute("d", LOADER_CLIP_FLAT);

  const curve = { t: 0 };

  const tl = gsap.timeline({ onComplete });

  tl.to(curve, {
    t: 1,
    duration: 0.9,
    delay: 0.55,
    ease: "power2.inOut",
    onUpdate: () => {
      clipPath.setAttribute("d", buildLoaderClipPath(curve.t));
    },
  });

  tl.to(
    panel,
    {
      yPercent: -100,
      duration: 1.15,
      ease: "power3.inOut",
    },
    "-=0.12",
  );

  return tl;
}
