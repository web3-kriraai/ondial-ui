import type { CSSProperties, JSX } from "react";
import { Phone } from "lucide-react";

import styles from "@/components/marketing/home-problem-chart.module.css";
import type { ProblemCardIllustration } from "@/data/home-problem-content";
import { cn } from "@/lib/utils";

type IllustrationProps = {
  className?: string;
};

/** Outer mini-card - same footprint in every problem card image slot. */
const illustrationFrameClass =
  "relative flex h-full min-h-0 w-full flex-col overflow-hidden rounded-[10px] border shadow-[0_2px_10px_-4px_rgba(15,23,42,0.12)]";

/** Main content area below optional header/footer chrome. */
const illustrationBodyClass = "flex min-h-0 flex-1 flex-col";

/** CRM to Spreadsheet copying layout - illustrating manual, slow work. */
function ManualLoggingIllustration({ className }: IllustrationProps) {
  return (
    <div
      className={cn(illustrationFrameClass, "border-[#e8e4dc] bg-white", className)}
      aria-hidden
    >
      <div className="flex shrink-0 items-center justify-between border-b border-[#efefef] bg-[#f7f7f5] px-2 py-1">
        <div className="flex gap-1 pl-1">
          <span className="size-1.5 rounded-full bg-[#ff5f57]" />
          <span className="size-1.5 rounded-full bg-[#febc2e]" />
          <span className="size-1.5 rounded-full bg-[#28c840]" />
        </div>
        <span className="pr-1 text-[6.5px] font-semibold text-[#78716c]">CRM ➔ Spreadsheet</span>
      </div>

      <div className="grid flex-1 grid-cols-11 items-center gap-1.5 p-2">
        {/* Left CRM Card with Call Notes */}
        <div className="col-span-5 flex h-full flex-col rounded border border-[#e8c4bc] bg-[#fffaf8] p-1.5">
          <span className="mb-1 text-[6.5px] font-bold text-[#b24c3d]">Call Notes</span>
          <div className="flex flex-1 flex-col justify-start gap-2 pt-2">
            <div className="h-1.5 w-full rounded bg-[#e8c4bc]/60" />
            <div className="h-1.5 w-[85%] rounded bg-[#e8c4bc]/60" />
            <div className="h-1.5 w-[90%] rounded bg-[#e8c4bc]/60" />
            <div className="h-1.5 w-[70%] rounded bg-[#e8c4bc]/60" />
            <div className="h-1.5 w-[80%] rounded bg-[#e8c4bc]/60" />
            <span className={cn("mt-auto text-[5.5px] font-bold text-[#c45c4a] pt-1", styles.typingCursor)}>
              Writing notes...
            </span>
          </div>
        </div>

        {/* Center Transfer Animation */}
        <div className="col-span-1 flex flex-col items-center justify-center">
          <svg className="h-8 w-full overflow-visible" viewBox="0 0 20 40" fill="none">
            <path
              d="M1 20 H19"
              stroke="#8b5cf6"
              strokeWidth="1.5"
              strokeDasharray="4 3"
              className={styles.copyFlowLine}
            />
            <polygon points="14,17 19,20 14,23" fill="#8b5cf6" className={styles.copyArrowHead} />
          </svg>
        </div>

        {/* Right Spreadsheet grid populating */}
        <div className="col-span-5 flex h-full flex-col rounded border border-[#e2e8f0] bg-[#f8fafc] p-1.5">
          <span className="mb-1 text-[6.5px] font-bold text-[#475569]">CallLog.xlsx</span>
          <div className="flex flex-1 flex-col gap-0.5 border border-[#e2e8f0] bg-white text-[5px]">
            {/* Header row */}
            <div className="grid grid-cols-3 gap-0.5 border-b border-[#e2e8f0] bg-[#f1f5f9] p-0.5 font-semibold text-[#64748b]">
              <span>ID</span>
              <span>Note</span>
              <span>Time</span>
            </div>
            {/* Data rows populating sequentially */}
            <div className="grid grid-cols-3 gap-0.5 p-0.5 text-[#94a3b8] items-center">
              <span className="bg-[#f8fafc]">#1</span>
              <span className={cn("h-1.5 w-[75%] rounded bg-[#8b5cf6]", styles.sheetRow1)} />
              <span className="bg-[#f8fafc]">12s</span>
            </div>
            <div className="grid grid-cols-3 gap-0.5 p-0.5 text-[#94a3b8] items-center">
              <span className="bg-[#f8fafc]">#2</span>
              <span className={cn("h-1.5 w-[50%] rounded bg-[#f4956b]", styles.sheetRow2)} />
              <span className="bg-[#f8fafc]">34s</span>
            </div>
            <div className="grid grid-cols-3 gap-0.5 p-0.5 text-[#94a3b8] items-center">
              <span className="bg-[#f8fafc]">#3</span>
              <span className={cn("h-1.5 w-[85%] rounded bg-[#8b5cf6]", styles.sheetRow3)} />
              <span className="bg-[#f8fafc]">58s</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Call queue hub - on-hold circle, phone icon, busy reps. */
function CallQueuesIllustration({ className }: IllustrationProps) {
  const reps = ["Rep 1", "Rep 2", "Rep 3"];

  return (
    <div
      className={cn(illustrationFrameClass, "border-[#f0ddd6] bg-[#fff5f2]", className)}
      aria-hidden
    >
      <div className="flex h-full min-h-0 flex-col items-center px-2.5 py-3">
        <span className={cn(
          "shrink-0 rounded-full border border-[#e8c4bc] bg-white px-3 py-1.5 text-[8px] font-semibold leading-none text-[#b24c3d] shadow-sm",
          styles.waitingBadge
        )}>
          18 calls waiting
        </span>

        <div className="flex w-full max-w-[210px] min-h-0 flex-1 flex-col items-center justify-evenly gap-3 py-2">
          <div className="relative flex size-16 shrink-0 flex-col items-center justify-center rounded-full border-2 border-[#c45c4a] bg-white shadow-sm">
            <div className={cn("absolute -inset-1 rounded-full border border-[#c45c4a]/30", styles.rippleRing1)} />
            <div className={cn("absolute -inset-3 rounded-full border border-[#c45c4a]/10", styles.rippleRing2)} />
            <span className="text-[7.5px] font-bold tracking-[0.14em] text-[#b24c3d]">ON HOLD</span>
            <Phone className={cn("mt-1 size-4 text-[#b24c3d]", styles.phoneIcon)} strokeWidth={2.25} />
          </div>

          <svg
            className="h-7 w-full max-w-[188px] shrink-0"
            viewBox="0 0 188 28"
            fill="none"
            preserveAspectRatio="xMidYMid meet"
            aria-hidden
          >
            <path
              d="M94 0 L28 26 M94 0 L94 26 M94 0 L160 26"
              stroke="#c45c4a"
              strokeWidth="1.5"
              strokeDasharray="4 3"
              strokeLinecap="round"
              className={styles.dashLine}
            />
          </svg>

          <div className="grid w-full grid-cols-3 gap-2">
            {reps.map((rep, i) => (
              <div
                key={rep}
                className={cn(
                  "rounded-lg border border-[#e7e5e4] bg-white px-1 py-2.5 text-center shadow-sm",
                  styles.repCard
                )}
                style={{ animationDelay: `${i * 0.25}s` }}
              >
                <p className="text-[8px] font-semibold leading-tight text-[#44403c]">{rep}</p>
                <p className="mt-1 text-[8.5px] font-bold leading-none text-[#b24c3d]">Busy</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/** Side-by-side rep scripts with overlapping “Inconsistent!” badge. */
function InconsistentScriptIllustration({ className }: IllustrationProps) {
  const repA = [
    { w: "w-[85%]", active: true },
    { w: "w-[62%]", active: false },
    { w: "w-[75%]", active: true },
    { w: "w-[52%]", active: false },
    { w: "w-[68%]", active: true },
  ];
  const repB = [
    { w: "w-[55%]", active: true },
    { w: "w-[80%]", active: true },
    { w: "w-[48%]", active: false },
    { w: "w-[68%]", active: false },
    { w: "w-[70%]", active: true },
  ];

  return (
    <div
      className={cn(illustrationFrameClass, "relative border-[#e8e4dc] bg-white", className)}
      aria-hidden
    >
      <div className={cn(illustrationBodyClass, "p-2")}>
        <div className="relative grid h-full min-h-0 grid-cols-2 gap-1.5">
          <ScriptCard
            label="Rep A: Pitch Standard"
            headerClass="bg-[#ede9fe] text-[#6d28d9]"
            bars={repA}
            accent="bg-[#8b5cf6]"
            barClassName={styles.scriptBarA}
            isStandard={true}
          />
          <ScriptCard
            label="Rep B: Off Script"
            headerClass="bg-[#ffedd5] text-[#c2410c]"
            bars={repB}
            accent="bg-[#f97316]"
            barClassName={styles.scriptBarB}
            isStandard={false}
          />
          <span className={cn(
            "absolute left-1/2 top-[52%] z-10 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-md border border-[#fecaca] bg-[#fff1f2] px-1.5 py-0.5 text-[7px] font-bold text-[#be123c] shadow-sm",
            styles.inconsistentBadge
          )}>
            Inconsistent!
          </span>
        </div>
      </div>
    </div>
  );
}

function ScriptCard({
  label,
  headerClass,
  bars,
  accent,
  barClassName,
  isStandard,
}: {
  label: string;
  headerClass: string;
  bars: { w: string; active: boolean }[];
  accent: string;
  barClassName: string;
  isStandard: boolean;
}) {
  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden rounded-md border border-[#eceae6] bg-white">
      <div className={cn("shrink-0 px-1 py-1 text-center text-[6px] font-bold", headerClass)}>
        {label}
      </div>
      <div className="flex min-h-0 flex-1 flex-col justify-start gap-2 px-1.5 pt-2 pb-1.5">
        {bars.map((bar, i) => (
          <div key={i} className="flex items-center gap-1">
            <div className="h-1.5 flex-1 rounded-full bg-[#eceae6]">
              {bar.active ? (
                <div
                  className={cn("h-full rounded-full", accent, bar.w, barClassName)}
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              ) : null}
            </div>
            {bar.active && (
              <span className={cn(
                "text-[6px] font-bold shrink-0 leading-none",
                isStandard ? "text-emerald-500" : "text-rose-500",
                isStandard ? styles.standardCheck : styles.offScriptWarning
              )}>
                {isStandard ? "✓" : "!"}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function RepIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

/** Hiring cost chart - rising bars (with stacked rep icons), flat quality line (animated). */
function ScalingHiringIllustration({ className }: IllustrationProps) {
  const qualityRatio = 0.34;

  const bars = [
    { label: "Y1", h: 0.34, fill: "#c4b5fd" },
    { label: "Y2", h: 0.5, fill: "#a78bfa" },
    { label: "Y3", h: 0.64, fill: "#8b5cf6" },
    { label: "Y4", h: 0.78, fill: "#6d28d9" },
    { label: "Y5", h: 0.94, fill: "#1e3a5f" },
  ] as const;

  const gridLines = [0, 0.5, 1];

  return (
    <div
      className={cn(illustrationFrameClass, "border-[#e8e4dc] bg-white", className)}
      aria-hidden
    >
      <div className="flex min-h-0 flex-1 flex-col px-2 pt-1.5 pb-1">
        <div className="flex min-h-0 flex-1 gap-1.5">
          <div className="flex w-4 shrink-0 flex-col justify-between self-stretch text-[6.5px] font-medium leading-none tabular-nums text-[#a8a29e]">
            <span>$$$</span>
            <span>$$</span>
            <span>$</span>
          </div>

          <div className="flex min-h-0 min-w-0 flex-1 flex-col">
            <div className="relative min-h-0 flex-1">
              {gridLines.map((ratio) => (
                <div
                  key={ratio}
                  className="pointer-events-none absolute inset-x-0 border-t border-[#f0eeea]"
                  style={{ bottom: `${ratio * 100}%` }}
                />
              ))}

              <div
                className={cn(
                  "pointer-events-none absolute inset-x-0 z-10 border-t-[1.5px] border-[#e11d48]",
                  styles.lineTrack,
                )}
                style={{ bottom: `${qualityRatio * 100}%` }}
              />

              <div
                className={cn("pointer-events-none absolute inset-x-0 z-20 flex justify-between", styles.dotWrapperFloat)}
                style={{ bottom: `calc(${qualityRatio * 100}% - 6px)` }}
              >
                {bars.map((_, i) => (
                  <div key={i} className="flex flex-1 justify-center">
                    <span
                      className={cn(
                        "flex size-3 items-center justify-center rounded-full bg-white ring-[1.5px] ring-[#e11d48]",
                        styles.dot,
                      )}
                      style={{ animationDelay: `${0.55 + i * 0.07}s, ${1.3 + i * 0.07}s` }}
                    >
                      <span className="size-1.5 rounded-full bg-[#e11d48]" />
                    </span>
                  </div>
                ))}
              </div>

              <div className="absolute inset-0 flex items-end justify-between gap-1">
                {bars.map((bar, i) => (
                  <div key={bar.label} className="flex h-full min-w-0 flex-1 items-end justify-center">
                    <div
                      className="relative w-[82%] max-w-[38px]"
                      style={{ height: `${bar.h * 100}%` }}
                    >
                      <div
                        className={cn("absolute inset-0 rounded-t-lg", styles.barFill)}
                        style={{
                          backgroundColor: bar.fill,
                          animationDelay: `${i * 0.1}s`,
                        }}
                      />
                      <div
                        className={cn(
                          "relative flex h-full flex-col-reverse items-center justify-start gap-0.5 pb-1",
                          styles.barIcons,
                        )}
                        style={{ animationDelay: `${0.5 + i * 0.08}s` }}
                      >
                        {Array.from({ length: i + 1 }).map((_, iconIdx) => (
                          <RepIcon key={iconIdx} className="size-[7px] shrink-0 text-white" />
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-1 flex shrink-0 justify-between gap-0.5 border-t border-[#f5f3ef] pt-1">
              {bars.map((bar) => (
                <span
                  key={bar.label}
                  className="min-w-0 flex-1 text-center text-[6.5px] font-medium text-[#78716c]"
                >
                  {bar.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex shrink-0 items-center justify-center gap-1 border-t border-[#f0eeea] px-2 py-1">
        <span
          className={cn(
            "rounded-full bg-[#fff1f2] px-2 py-0.5 text-[6.5px] font-semibold leading-none text-[#be123c]",
            styles.legend,
          )}
          style={{ animationDelay: "0.75s, 1.25s" }}
        >
          Hiring cost
        </span>
        <span
          className={cn(
            "rounded-full bg-[#fef9c3] px-2 py-0.5 text-[6.5px] font-semibold leading-none text-[#92400e]",
            styles.legend,
          )}
          // style={{ animationDelay: "0.9s, 1.4s" }}
        >
          Cost ↑ Quality flat →
        </span>
      </div>
    </div>
  );
}

const illustrationMap: Record<
  ProblemCardIllustration,
  (props: IllustrationProps) => JSX.Element
> = {
  "manual-logging": ManualLoggingIllustration,
  "call-queues": CallQueuesIllustration,
  "inconsistent-script": InconsistentScriptIllustration,
  "scaling-hiring": ScalingHiringIllustration,
};

export function ProblemCardIllustration({
  type,
  className,
}: {
  type: ProblemCardIllustration;
  className?: string;
}) {
  const Component = illustrationMap[type];

  return (
    <div className={cn("size-full min-h-0", className)}>
      <Component className="h-full min-h-0 w-full" />
    </div>
  );
}

export const problemSectionAccentStyle = {
  "--section-accent-h": "262",
  "--section-accent-s": "83%",
  "--section-accent-l": "58%",
} as CSSProperties;
