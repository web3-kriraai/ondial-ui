import { cn } from "@/lib/utils";

type MarketingDotBackgroundProps = {
  className?: string;
  /** Dot grid step in px. Default 14. */
  size?: number;
  /** Dot opacity via text color alpha. Default foreground/10. */
  dotClassName?: string;
};

/** Full-bleed radial dot grid with soft edge fade — matches industry page pattern. */
export function MarketingDotBackground({
  className,
  size = 14,
  dotClassName = "text-foreground/10",
}: MarketingDotBackgroundProps) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 -z-10", dotClassName, className)}
      style={{
        backgroundImage: "radial-gradient(circle, currentColor 1px, transparent 1px)",
        backgroundSize: `${size}px ${size}px`,
        maskImage:
          "linear-gradient(to right, transparent, black 8%, black 92%, transparent), linear-gradient(to bottom, transparent, black 6%, black 94%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 8%, black 92%, transparent), linear-gradient(to bottom, transparent, black 6%, black 94%, transparent)",
        maskComposite: "intersect",
        WebkitMaskComposite: "source-in",
      }}
    />
  );
}
