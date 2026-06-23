import { CASE_STUDY_TICKER } from "@/data/case-study-page-content";
import { cn } from "@/lib/utils";

export function CaseStudyTickerSection() {
  const items = [...CASE_STUDY_TICKER, ...CASE_STUDY_TICKER];

  return (
    <div className="relative overflow-hidden py-5 sm:py-6" aria-hidden>
      <div className="relative left-1/2 w-[112vw] -translate-x-1/2 -rotate-[1.75deg] border-y border-[#E7E3F5] bg-background py-3.5 shadow-[0_1px_0_rgb(21_16_31/0.03)]">
        <div className="overflow-hidden">
          <div className="flex w-max animate-[scrollTicker_32s_linear_infinite] motion-reduce:animate-none">
            {items.map((item, index) => (
              <span
                key={`${item}-${index}`}
                className={cn(
                  "flex shrink-0 items-center gap-2.5 border-r border-[#E7E3F5] px-7",
                  "font-mono text-[0.8125rem] font-medium whitespace-nowrap text-[#4B4566]",
                )}
              >
                <span className="size-1.5 shrink-0 rounded-full bg-[#157A4A]" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
