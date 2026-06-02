import { SplitScreenSection, SplitSectionLink } from "@/components/marketing/split-screen-section";
import { cn } from "@/lib/utils";

const problemPoints = [
  "Manual call queues eat hours your team should spend closing deals",
  "Inconsistent scripts make every customer experience feel different",
  "Scaling outreach means hiring faster—not sounding better",
];

const featureItems = [
  { title: "Natural voice agents", detail: "Human-like tone, pacing, and turn-taking on every call." },
  { title: "24/7 coverage", detail: "Reminders, surveys, and support without shift planning." },
  { title: "Live analytics", detail: "Transcripts, outcomes, and sentiment in one dashboard." },
  { title: "CRM-ready hooks", detail: "Sync outcomes to the tools your team already uses." },
];

function ProblemList() {
  return (
    <ul className="mt-2 space-y-3">
      {problemPoints.map((point) => (
        <li key={point} className="flex gap-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
          <span
            className="mt-2 size-1.5 shrink-0 rounded-full bg-[hsl(var(--section-accent-h)_var(--section-accent-s)_var(--section-accent-l))]"
            aria-hidden
          />
          {point}
        </li>
      ))}
    </ul>
  );
}

function FeaturesList() {
  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {featureItems.map((item) => (
        <li
          key={item.title}
          className="rounded-2xl border border-border/60 bg-background/80 p-4 shadow-sm"
        >
          <p className="font-semibold text-foreground">{item.title}</p>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.detail}</p>
        </li>
      ))}
    </ul>
  );
}

export function HomeProblemSection() {
  return (
    <SplitScreenSection
      id="problem"
      aria-label="The problem we solve"
      eyebrow="The problem"
      title="Your team shouldn't live on the phone"
      description="Outbound and inbound calls still run on spreadsheets, sticky notes, and burnt-out reps—while customers expect instant, consistent answers."
      visualPosition="right"
      tone="default"
      visualLabel="Problem — UI placeholder"
    >
      <ProblemList />
      <div className="mt-8">
        <SplitSectionLink href="/about">See how teams switch</SplitSectionLink>
      </div>
    </SplitScreenSection>
  );
}

export function HomeFeaturesSection() {
  return (
    <SplitScreenSection
      id="features"
      aria-label="Product features"
      eyebrow="Features"
      title="Everything you need to run voice at scale"
      description="From the first scripted agent to production traffic—Ondial keeps quality high while volume climbs."
      visualPosition="left"
      tone="default"
      visualLabel="Features — UI placeholder"
    >
      <FeaturesList />
    </SplitScreenSection>
  );
}

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
        <SplitSectionLink href="/services" variant="ghost">
          Get started now
        </SplitSectionLink>
        <SplitSectionLink href="/about" variant="ghost" className="border-primary-foreground/20 bg-transparent">
          Talk to sales
        </SplitSectionLink>
      </div>
    </SplitScreenSection>
  );
}
