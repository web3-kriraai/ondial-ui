import {
  ProblemCardIllustration,
  problemSectionAccentStyle,
} from "@/components/marketing/home-problem-illustrations";
import { TextReveal } from "@/components/ui/text-reveal";
import {
  marketingEyebrowClass,
  marketingSectionContainerClass,
  marketingSectionShellClass,
} from "@/config/marketing-layout";
import { HOME_PROBLEM_CARDS, HOME_PROBLEM_HEADING } from "@/data/home-problem-content";
import { cn } from "@/lib/utils";

/** Fixed card footprint - illustration ~58%, content ~42%. */
const PROBLEM_CARD_WIDTH = 280;
const PROBLEM_CARD_HEIGHT = 400;

/** Illustration zone height - 58% of card; tight uniform inset. */
const PROBLEM_ILLUSTRATION_RATIO = 58;
const PROBLEM_CONTENT_RATIO = 100 - PROBLEM_ILLUSTRATION_RATIO;

export function HomeProblemSection() {
  return (
    <section
      id="problem"
      className={cn(marketingSectionShellClass, "bg-background")}
      style={problemSectionAccentStyle}
      aria-labelledby="problem-title"
    >
      <div className={marketingSectionContainerClass}>
        <header className="mx-auto max-w-3xl text-center">
          <p className={cn("mb-4", marketingEyebrowClass)}>{HOME_PROBLEM_HEADING.eyebrow}</p>
          <TextReveal
            as="h2"
            id="problem-title"
            className="text-balance text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem]"
            segments={[
              { text: "Your team shouldn't live on the" },
              {
                text: "phone",
                className:
                  "text-[hsl(var(--section-accent-h)_var(--section-accent-s)_var(--section-accent-l))]",
              },
            ]}
          />
          <p className="mx-auto mt-4 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            {HOME_PROBLEM_HEADING.tagline}
          </p>
        </header>

        <ul className="mx-auto mt-12 grid grid-cols-1 justify-items-center gap-5 sm:mt-14 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4 xl:gap-6">
          {HOME_PROBLEM_CARDS.map((card) => (
            <li
              key={card.id}
              className={cn(
                "flex shrink-0 flex-col overflow-hidden rounded-2xl border border-border/60 bg-card",
                "shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_24px_-12px_rgba(15,23,42,0.12)]",
                "transition-[box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:shadow-[0_2px_4px_rgba(15,23,42,0.05),0_16px_32px_-14px_rgba(15,23,42,0.14)]",
              )}
              style={{
                width: `min(100%, ${PROBLEM_CARD_WIDTH}px)`,
                height: PROBLEM_CARD_HEIGHT,
              }}
            >
              <div
                className="min-h-0 shrink-0 bg-[#f5f0e8] p-2"
                style={{ flex: `${PROBLEM_ILLUSTRATION_RATIO} 1 0` }}
              >
                <ProblemCardIllustration type={card.illustration} className="size-full" />
              </div>
              <div
                className="flex min-h-0 flex-col bg-card px-4 pb-4 pt-3.5"
                style={{ flex: `${PROBLEM_CONTENT_RATIO} 1 0` }}
              >
                <span className="mb-3 w-fit shrink-0 rounded-full bg-[#fce7e9] px-3 py-1.5 text-[11px] font-semibold leading-none tracking-wide text-[#be123c]">
                  {card.badge}
                </span>
                <h3 className="line-clamp-2 shrink-0 text-[1.0625rem] font-semibold leading-snug text-foreground">
                  {card.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                  {card.description}
                </p>
              </div>
            </li>
          ))}
        </ul>       
      </div>
    </section>
  );
}
