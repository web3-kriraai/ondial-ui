import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";

// import { TextReveal } from "@/components/ui/text-reveal";
// import { marketingEyebrowClass } from "@/config/marketing-layout";
import { cn } from "@/lib/utils";

export const ONDIAL_ACCENT_STYLE = {
  "--section-accent-h": "262",
  "--section-accent-s": "83%",
  "--section-accent-l": "58%",
} as CSSProperties;

// type SplitScreenSectionProps = {
//   id?: string;
//   "aria-label": string;
//   eyebrow: string;
//   title: ReactNode;
//   description: string;
//   /** Content column on the left on large screens when `visualPosition` is `right`. */
//   visualPosition?: "left" | "right";
//   visual?: ReactNode;
//   visualLabel?: string;
//   children?: ReactNode;
//   className?: string;
//   contentClassName?: string;
//   visualClassName?: string;
//   tone?: "default" | "muted" | "accent" | "contrast";
// };

// const toneClasses: Record<NonNullable<SplitScreenSectionProps["tone"]>, string> = {
//   default: "bg-background",
//   muted: "bg-background",
//   accent:
//     "bg-[hsl(var(--section-accent-h)_var(--section-accent-s)_var(--section-accent-l)/0.06)]",
//   contrast:
//     "bg-[hsl(var(--section-accent-h)_var(--section-accent-s)_calc(var(--section-accent-l)_-_18%))] text-primary-foreground",
// };

// function DefaultVisual({ label }: { label: string }) {
//   return (
//     <div
//       className="relative flex h-full min-h-[inherit] w-full items-center justify-center p-8 sm:p-10"
//       aria-hidden
//     >
//       <div
//         className={cn(
//           "absolute inset-0 opacity-90",
//           "bg-[radial-gradient(ellipse_80%_70%_at_50%_40%,hsl(var(--section-accent-h)_var(--section-accent-s)_var(--section-accent-l)/0.22),transparent_65%)]",
//         )}
//       />
//       <div
//         className={cn(
//           "absolute inset-6 rounded-3xl border border-[hsl(var(--section-accent-h)_var(--section-accent-s)_var(--section-accent-l)/0.15)]",
//           "bg-[linear-gradient(145deg,hsl(var(--section-accent-h)_var(--section-accent-s)_var(--section-accent-l)/0.08),transparent_55%)]",
//         )}
//       />
//       <div className="relative grid w-full max-w-md gap-3">
//         {[0, 1, 2].map((row) => (
//           <div
//             key={row}
//             className={cn(
//               "flex items-center gap-3 rounded-2xl border border-border/60 bg-background/80 px-4 py-3 shadow-sm backdrop-blur-sm",
//               row === 1 && "ml-6",
//               row === 2 && "ml-3",
//             )}
//           >
//             <span
//               className={cn(
//                 "size-9 shrink-0 rounded-xl",
//                 "bg-[hsl(var(--section-accent-h)_var(--section-accent-s)_var(--section-accent-l)/0.2)]",
//               )}
//             />
//             <div className="min-w-0 flex-1 space-y-1.5">
//               <span className="block h-2 w-3/5 max-w-[8rem] rounded-full bg-foreground/10" />
//               <span className="block h-2 w-full max-w-[12rem] rounded-full bg-muted-foreground/15" />
//             </div>
//           </div>
//         ))}
//       </div>
//       <p className="absolute bottom-6 left-1/2 max-w-[14rem] -translate-x-1/2 text-center text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground/70">
//         {label}
//       </p>
//     </div>
//   );
// }

//  function SplitScreenSection({
//   id,
//   "aria-label": ariaLabel,
//   eyebrow,
//   title,
//   description,
//   visualPosition = "right",
//   visual,
//   visualLabel = "Visual placeholder",
//   children,
//   className,
//   contentClassName,
//   visualClassName,
//   tone = "default",
// }: SplitScreenSectionProps) {
//   const isContrast = tone === "contrast";
//   const visualFirst = visualPosition === "left";

//   const content = (
//     <div
//       className={cn(
//         "flex flex-1 flex-col justify-center px-6 py-14 sm:px-10 sm:py-16 lg:px-14 lg:py-20",
//         contentClassName,
//       )}
//     >
//       <p
//         className={cn(
//           "mb-4 w-fit",
//           isContrast
//             ? "rounded-full border border-primary-foreground/25 bg-primary-foreground/10 px-3 py-1 text-xs font-semibold tracking-wide text-primary-foreground"
//             : marketingEyebrowClass,
//         )}
//       >
//         {eyebrow}
//       </p>
//       {typeof title === "string" ? (
//         <TextReveal
//           as="h2"
//           className={cn(
//             "max-w-xl text-balance text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-[2.35rem]",
//             isContrast ? "text-primary-foreground" : "text-foreground",
//           )}
//         >
//           {title}
//         </TextReveal>
//       ) : (
//         <h2
//           className={cn(
//             "max-w-xl text-balance text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-[2.35rem]",
//             isContrast ? "text-primary-foreground" : "text-foreground",
//           )}
//         >
//           {title}
//         </h2>
//       )}
//       <p
//         className={cn(
//           "mt-4 max-w-lg text-pretty text-base leading-relaxed sm:text-lg",
//           isContrast ? "text-primary-foreground/80" : "text-muted-foreground",
//         )}
//       >
//         {description}
//       </p>
//       {children ? <div className="mt-8">{children}</div> : null}
//     </div>
//   );

//   const visualPanel = (
//     <div
//       className={cn("relative min-h-[42dvh] w-full lg:min-h-0", visualClassName)}
//     >
//       {visual ?? <DefaultVisual label={visualLabel} />}
//     </div>
//   );

//   return (
//     <section
//       id={id}
//       className={cn(
//         "relative grid min-h-dvh w-full grid-cols-1 lg:grid-cols-2 lg:min-h-dvh",
//         toneClasses[tone],
//         className,
//       )}
//       style={ONDIAL_ACCENT_STYLE}
//       aria-label={ariaLabel}
//     >
//       {visualFirst ? (
//         <>
//           {visualPanel}
//           {content}
//         </>
//       ) : (
//         <>
//           {content}
//           {visualPanel}
//         </>
//       )}
//     </section>
//   );
// }

export function SplitSectionLink({
  href,
  children,
  variant = "primary",
  className,
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center justify-center rounded-full px-6 py-2.5 text-sm font-medium transition-colors",
        variant === "primary" &&
          "border border-[hsl(var(--section-accent-h)_var(--section-accent-s)_var(--section-accent-l))] bg-background text-foreground shadow-sm hover:bg-muted/50",
        variant === "ghost" &&
          "border border-primary-foreground/30 bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20",
        className,
      )}
    >
      {children}
    </Link>
  );
}
