import { cn } from "@/lib/utils";

export function desktopLinkClassName(highlighted: boolean) {
  return cn(
    "relative rounded-full px-3.5 py-3 text-[13px] font-medium leading-none tracking-tight transition-[color,transform] duration-200 ease-out sm:px-4 sm:py-3.5",
    "outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
    "motion-reduce:transform-none",
    highlighted
      ? "font-semibold text-black"
      : "text-white/90 hover:text-white active:scale-[0.98]",
  );
}

export function mobileLinkClassName(active: boolean) {
  return cn(
    "group flex min-h-[3.25rem] w-full items-center justify-between gap-3 rounded-2xl px-4 py-2.5 text-[0.9375rem] font-medium leading-snug tracking-tight transition-[color,background-color,box-shadow,transform] duration-200 ease-out",
    "outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "motion-reduce:transform-none",
    active
      ? "bg-background text-foreground shadow-[inset_0_1px_0_0_rgba(255,255,255,0.85)] ring-1 ring-foreground/10"
      : "text-muted-foreground hover:bg-muted/60 hover:text-foreground active:scale-[0.99]",
  );
}

/** Black pill bar with subtle depth - active link sits in a white elevated pill. */
export const glassBar = cn(
  "relative isolate overflow-hidden rounded-full border border-white/10",
  "bg-linear-to-b from-zinc-900 via-black to-zinc-950",
  "shadow-[0_6px_28px_-10px_rgba(0,0,0,0.45),0_2px_10px_-4px_rgba(0,0,0,0.35),inset_0_1px_0_0_rgba(255,255,255,0.08)]",
  "before:pointer-events-none before:absolute before:inset-x-3 before:top-0 before:h-px before:bg-linear-to-r before:from-transparent before:via-white/15 before:to-transparent sm:before:inset-x-4",
  "max-md:before:hidden",
);

/** Separate CTA pill beside the nav - same black bar + white inner cylinder as nav links. */
export const navCtaShell = cn(glassBar, "shrink-0 p-0.5 sm:p-1");

export const navCtaLink = cn(
  "inline-flex cursor-pointer items-center justify-center rounded-full px-3.5 py-3 text-[13px] font-semibold leading-none tracking-tight sm:px-4 sm:py-3.5",
  "bg-white text-black",
  "shadow-[0_2px_8px_-2px_rgba(0,0,0,0.25),0_1px_3px_rgba(0,0,0,0.12),inset_0_1px_0_0_rgba(255,255,255,0.95)]",
  "transition-[transform,box-shadow] duration-200 ease-out",
  "hover:shadow-[0_3px_12px_-2px_rgba(0,0,0,0.3),0_1px_4px_rgba(0,0,0,0.14),inset_0_1px_0_0_rgba(255,255,255,0.95)]",
  "active:scale-[0.98]",
  "outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
  "motion-reduce:transform-none",
);

/** Inner track - links sit flush inside the black bar. */
export const navTrack = cn(
  "relative flex min-h-0 w-fit max-w-full shrink-0 items-center gap-0.5 self-stretch rounded-full",
);

/** White elevated pill - positioned by magnetic track, not per-link inset. */
export const activeNavPill = cn(
  "pointer-events-none absolute z-0 rounded-full bg-white",
  "shadow-[0_2px_8px_-2px_rgba(0,0,0,0.25),0_1px_3px_rgba(0,0,0,0.12),inset_0_1px_0_0_rgba(255,255,255,0.95)]",
);

export const stickyPillSpring = (reduceMotion: boolean | null) =>
  reduceMotion
    ? { stiffness: 1000, damping: 100, mass: 1 }
    : { stiffness: 260, damping: 22, mass: 1.05 };

export const magneticPullSpring = (reduceMotion: boolean | null) =>
  reduceMotion
    ? { stiffness: 1000, damping: 100, mass: 1 }
    : { stiffness: 180, damping: 14, mass: 0.12 };

export const drawerEase: [number, number, number, number] = [0.22, 1, 0.36, 1];
