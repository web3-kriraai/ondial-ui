import { SplitScreenSection, SplitSectionLink } from "@/components/marketing/split-screen-section";

export function HomeCtaSection() {
  return (
    <SplitScreenSection
      id="cta"
      aria-label="Get started"
      eyebrow="Ready when you are"
      title="Put your next thousand calls on autopilot"
      description="Spin up a voice agent in minutes, test with real numbers, and go live when your script sounds right."
      visualPosition="right"
      tone="contrast"
      visualLabel="Get started — UI placeholder"
      contentClassName="lg:px-16"
    >
      <div className="flex flex-wrap items-center gap-3">
        <SplitSectionLink href="/pricing" variant="ghost">
          Get started now
        </SplitSectionLink>
        <SplitSectionLink href="/about" variant="ghost" className="border-primary-foreground/20 bg-transparent">
          Talk to sales
        </SplitSectionLink>
      </div>
    </SplitScreenSection>
  );
}
