import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import type { ReactNode } from "react";

import type { CaseStudyItem } from "@/data/case-study-page-content";
import { getCaseStudyHref } from "@/data/case-study-page-content";
import { cn } from "@/lib/utils";

export function CaseStudySectionHead({
  eyebrow,
  title,
  subtitle,
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle: string;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto mb-9 max-w-[560px] text-center sm:mb-10", className)}>
      {eyebrow ? (
        <p className="mb-3 font-mono text-[11.5px] font-semibold tracking-[0.08em] text-[#7C3AED] uppercase">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="mb-3 text-balance text-[clamp(1.75rem,3.4vw,2.375rem)] font-extrabold tracking-[-0.02em] text-foreground">
        {title}
      </h2>
      <p className="text-[0.96875rem] leading-relaxed text-[#4B4566] sm:text-[15.5px]">{subtitle}</p>
    </div>
  );
}

export function CaseStudyGridCard({ item }: { item: CaseStudyItem }) {
  const href = getCaseStudyHref(item.id);
  const displayMetrics = item.metrics.slice(0, 2);

  return (
    <Link
      href={href}
      prefetch
      className="group/card flex h-full flex-col overflow-hidden rounded-[20px] border border-[#E7E3F5] bg-background no-underline shadow-[0_1px_2px_rgb(21_16_31/0.04),0_8px_24px_-8px_rgb(21_16_31/0.10)] transition-[transform,box-shadow,border-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] transform-gpu backface-hidden hover:-translate-y-1 hover:border-[#D8CFF4] hover:shadow-[0_12px_32px_-8px_rgb(42_14_99/0.18),0_2px_8px_rgb(21_16_31/0.06)]"
    >
      <article className="relative flex h-full flex-col">
        <div
          className="relative h-[58px] overflow-hidden rounded-t-[19px] px-[18px]"
          style={{
            background: `linear-gradient(135deg, ${item.industryBg} 0%, color-mix(in srgb, ${item.industryColor} 38%, ${item.industryBg}) 100%)`,
          }}
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-70"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(255,255,255,0.35) 1px, transparent 1px)",
              backgroundSize: "13px 13px",
            }}
            aria-hidden
          />
          <span
            className="absolute right-[16px] bottom-3.5 z-1 inline-block rounded-full px-2.5 py-1 font-mono text-[12px] font-bold tracking-[0.05em] uppercase backdrop-blur-[3px]"
            style={{
              color: item.industryColor,
              background: "rgba(255,255,255,0.72)",
            }}
          >
            {item.industry}
          </span>
        </div>

        <span
          className="absolute top-[34px] left-[18px] z-2 flex size-[52px] items-center justify-center rounded-[14px] border-[3px] border-white bg-white font-mono text-[15px] font-extrabold shadow-[0_4px_10px_rgb(21_16_31/0.12)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/card:scale-[1.03]"
          style={{ color: item.industryColor }}
        >
          {item.avatar}
        </span>

        <div className="flex flex-1 flex-col px-[22px] pt-[34px] pb-[18px]">
          <div className="mb-2.5 flex items-center justify-between gap-2">
            <span className="truncate text-[13.5px] font-bold text-[#4B4566]">{item.company}</span>
            <span className="flex shrink-0 items-center gap-1 text-[10.5px] font-bold tracking-[0.02em] text-[#157A4A]">
              <Check className="size-3" strokeWidth={3} aria-hidden />
              Verified
            </span>
          </div>

          <h3 className="mb-3 text-[17.5px] leading-[1.32] font-bold tracking-[-0.01em] text-foreground">
            {item.headline}
          </h3>

          <p
            className="mb-5 flex-1 border-l-[2.5px] pl-[13px] text-[13px] leading-[1.55] text-[#4B4566] italic"
            style={{ borderColor: item.industryColor }}
          >
            &ldquo;{item.quote}&rdquo;
          </p>

          <div className="mt-auto flex items-center gap-3.5 rounded-[13px] border border-[#E7E3F5] bg-[#F5F3FC] px-4 py-3">
            {displayMetrics.map((metric, index) => (
              <div key={metric.label} className="contents">
                {index > 0 ? <div className="h-[30px] w-px shrink-0 bg-[#E7E3F5]" aria-hidden /> : null}
                <div className="flex min-w-0 flex-col gap-0.5">
                  <span
                    className="font-mono text-[16.5px] font-bold tracking-[-0.01em]"
                    style={{ color: item.industryColor }}
                  >
                    {metric.value}
                  </span>
                  <span className="text-[10.5px] font-semibold text-[#7A748F]">{metric.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between gap-2.5 border-t border-[#E7E3F5] px-[22px] py-[15px]">
          <div className="min-w-0">
            <strong className="block truncate text-[12.5px] font-bold text-foreground">
              {item.name}
            </strong>
            <span className="block truncate text-[11px] text-[#7A748F]">{item.role}</span>
          </div>
          <span
            className="relative size-9 shrink-0 overflow-hidden rounded-full bg-[#EEE9FC] text-[#6D28D9] transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/card:bg-[#7C3AED]/80 group-hover/card:text-white"
            aria-hidden
          >
            <span className="absolute inset-0 grid place-items-center transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/card:translate-x-[120%] group-hover/card:-translate-y-[120%]">
              <ArrowUpRight className="size-[15px]" strokeWidth={2.6} />
            </span>
            <span className="absolute inset-0 grid place-items-center transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] -translate-x-[120%] translate-y-[120%] group-hover/card:translate-x-0 group-hover/card:translate-y-0">
              <ArrowUpRight className="size-[15px]" strokeWidth={2.6} />
            </span>
          </span>
        </div>
      </article>
    </Link>
  );
}
