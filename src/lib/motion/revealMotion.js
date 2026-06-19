/**
 * Framer Motion props that work on client-side route transitions.
 * `whileInView` can leave content at opacity:0 after Next.js soft navigation;
 * `revealOnMount` uses `animate` instead so content always appears.
 */
export function revealMotion(
  revealOnMount,
  { initial, animate, whileInView, viewport, transition }
) {
  if (revealOnMount) {
    return {
      initial,
      animate: animate ?? whileInView,
      transition,
    };
  }

  return {
    initial,
    whileInView,
    viewport: viewport ?? { once: true },
    transition,
  };
}
