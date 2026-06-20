"use client";

import { Building2, ChevronLeft, Clock, Sparkles } from "lucide-react";
import Link from "next/link";

import { BlogArticleMotion } from "@/components/marketing/blog-article-motion";
import { proseClassName } from "@/components/marketing/blog-rich-text";
import { CaseStudyGridCard } from "@/components/marketing/case-study-shared";
import type { CaseStudyItem, CaseStudyRichDetail } from "@/data/case-study-page-content";
import { cn } from "@/lib/utils";

type CaseStudyDetailPageContentProps = {
  item: CaseStudyItem;
  related: CaseStudyItem[];
};

function CaseStudyPostHeader({ item }: { item: CaseStudyItem }) {
  const readMinutes = item.richDetail?.readMinutes ?? 3;

  return (
    <header className="mb-6 flex flex-col gap-3 sm:mb-7 sm:gap-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-x-4">
        <Link
          href="/case-studies"
          className="inline-flex shrink-0 items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ChevronLeft className="size-3.5 shrink-0" aria-hidden />
          Back to all case studies
        </Link>

        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground sm:justify-end sm:text-sm">
          <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[0.6875rem] font-medium text-primary sm:text-xs">
            {item.industry}
          </span>
          <span className="text-border/70" aria-hidden>
            ·
          </span>
          <span className="inline-flex items-center gap-1">
            <Building2 className="size-3 shrink-0" aria-hidden />
            {item.company}
          </span>
          <span className="text-border/70" aria-hidden>
            ·
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock className="size-3 shrink-0" aria-hidden />
            {readMinutes} min read
          </span>
        </div>
      </div>

      <h1
        id="case-study-detail-title"
        className="text-balance text-2xl leading-tight font-semibold tracking-tight text-foreground sm:text-3xl lg:text-[2rem] lg:leading-[1.15]"
      >
        {item.headline}
      </h1>

      <div className="flex items-center border-t border-border/40 pt-3.5 sm:pt-4">
        <div className="flex min-w-0 items-center gap-2.5">
          <span
            className="flex size-9 shrink-0 items-center justify-center rounded-full border border-border/50 text-xs font-semibold"
            style={{ background: item.avatarBg, color: item.avatarColor }}
          >
            {item.avatar}
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium leading-none text-foreground">{item.name}</p>
            <p className="mt-1 truncate text-xs text-muted-foreground">
              {item.role} · {item.location}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}

function CaseStudyMetricsBanner({ item }: { item: CaseStudyItem }) {
  return (
    <div className="not-prose relative mb-8 overflow-hidden rounded-2xl border border-border/40 bg-muted/20 shadow-[0_12px_40px_-20px_rgb(15_23_42/0.18)] sm:mb-10 sm:rounded-3xl">
      <div
        className="pointer-events-none absolute inset-0 opacity-80"
        style={{
          background: `linear-gradient(135deg, ${item.industryBg} 0%, color-mix(in srgb, ${item.industryColor} 18%, white) 100%)`,
        }}
        aria-hidden
      />
      <div className="relative grid grid-cols-3 divide-x divide-border/30">
        {item.metrics.map((metric) => (
          <div key={metric.label} className="px-3 py-5 text-center sm:px-4 sm:py-6">
            <p
              className="text-xl leading-none font-semibold tracking-tight sm:text-2xl"
              style={{ color: item.industryColor }}
            >
              {metric.value}
            </p>
            <p className="mt-1.5 text-[0.6875rem] leading-snug text-muted-foreground sm:text-xs">
              {metric.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProseParagraphs({ paragraphs }: { paragraphs: string[] }) {
  return (
    <>
      {paragraphs.map((paragraph) => (
        <p key={paragraph.slice(0, 56)}>{paragraph}</p>
      ))}
    </>
  );
}

function CaseStudyRichProse({
  item,
  detail,
}: {
  item: CaseStudyItem;
  detail: CaseStudyRichDetail;
}) {
  return (
    <div className={proseClassName}>
      {detail.subtitle ? <p>{detail.subtitle}</p> : null}

      {(detail.domain || detail.scale) && (
        <>
          {detail.domain ? (
            <p>
              <strong>Domain:</strong> {detail.domain}
            </p>
          ) : null}
          {detail.scale ? (
            <p>
              <strong>Scale:</strong> {detail.scale}
            </p>
          ) : null}
        </>
      )}

      <h2>Overview</h2>
      <ProseParagraphs paragraphs={detail.overviewParagraphs} />

      <h2>Industry context</h2>
      <ProseParagraphs paragraphs={detail.industryContext} />

      <h2>The problem</h2>
      <ProseParagraphs paragraphs={detail.problemParagraphs} />

      <h2>The solution</h2>
      <ProseParagraphs paragraphs={detail.solutionParagraphs} />

      <h3>How it works</h3>
      <ol>
        {detail.howItWorksSteps.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>

      <h2>Technical deep dive</h2>
      {detail.technicalSections.map((section) => (
        <div key={section.title}>
          <h3>{section.title}</h3>
          <ProseParagraphs paragraphs={section.paragraphs} />
        </div>
      ))}

      <h2>Tech stack</h2>
      <ul>
        {detail.techStack.map((entry) => (
          <li key={entry.label}>
            <strong>{entry.label}:</strong> {entry.detail}
          </li>
        ))}
      </ul>

      <h2>Results</h2>
      <div className="not-prose overflow-x-auto rounded-xl border border-border/50">
        <table className="w-full min-w-[520px] text-left text-sm">
          <thead>
            <tr className="border-b border-border/50 bg-muted/30">
              <th className="px-4 py-3 font-semibold text-foreground">Metric</th>
              <th className="px-4 py-3 font-semibold text-foreground">Before</th>
              <th className="px-4 py-3 font-semibold text-foreground">After</th>
            </tr>
          </thead>
          <tbody>
            {detail.resultsTable.map((row) => (
              <tr key={row.metric} className="border-b border-border/35 last:border-0">
                <td className="px-4 py-3 font-medium text-foreground">{row.metric}</td>
                <td className="px-4 py-3 text-muted-foreground">{row.before}</td>
                <td className="px-4 py-3 font-medium text-[#534AB7]">{row.after}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ul>
        {detail.resultHighlights.map((highlight) => (
          <li key={highlight.slice(0, 56)}>{highlight}</li>
        ))}
      </ul>

      <p>{detail.resultsClosing}</p>

      <h2>How we worked</h2>
      {detail.workflowSteps.map((step) => (
        <div key={step.step}>
          <h3>
            Step {step.step}: {step.title}
          </h3>
          <p>{step.description}</p>
        </div>
      ))}

      <h2>What comes next</h2>
      {detail.whatsNext.map((block) => (
        <div key={block.title}>
          <h3>{block.title}</h3>
          <ProseParagraphs paragraphs={block.paragraphs} />
        </div>
      ))}

      <blockquote>
        <p>&ldquo;{item.quote}&rdquo;</p>
        <footer>
          — {item.name}, {item.role}, {item.company}
        </footer>
      </blockquote>

      {item.tags.length > 0 ? (
        <div className="not-prose mt-8 flex flex-wrap gap-2">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center rounded-full border border-border/50 bg-muted/30 px-3 py-1 text-xs font-medium text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function CaseStudySimpleProse({ item }: { item: CaseStudyItem }) {
  return (
    <div className={proseClassName}>
      {item.problem ? (
        <>
          <h2>The challenge</h2>
          <p>{item.problem}</p>
        </>
      ) : null}

      {item.solution ? (
        <>
          <h2>The OnDial solution</h2>
          <p>{item.solution}</p>
        </>
      ) : null}

      <blockquote>
        <p>&ldquo;{item.quote}&rdquo;</p>
        <footer>
          — {item.name}, {item.role}, {item.company}
        </footer>
      </blockquote>

      {item.tags.length > 0 ? (
        <div className="not-prose mt-8 flex flex-wrap gap-2">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center rounded-full border border-border/50 bg-muted/30 px-3 py-1 text-xs font-medium text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function CaseStudyDetailRelated({
  item,
  related,
}: {
  item: CaseStudyItem;
  related: CaseStudyItem[];
}) {
  if (related.length === 0) return null;

  return (
    <section
      className="mt-12 border-t border-border/35 pt-10 sm:mt-14 sm:pt-12"
      aria-labelledby="case-study-related-title"
    >
      <h2
        id="case-study-related-title"
        className="mb-2 text-2xl font-semibold tracking-tight text-foreground sm:text-[1.625rem]"
      >
        Related case studies
      </h2>
      <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
        See how other {item.industry.toLowerCase()} teams like {item.company} use OnDial.
      </p>

      <div className="not-prose flex flex-wrap gap-4">
        {related.map((relatedItem) => (
          <CaseStudyGridCard key={relatedItem.id} item={relatedItem} />
        ))}
      </div>

      <div className="not-prose mt-8">
        <Link
          href="/case-studies"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-[#534AB7] transition-colors hover:text-[#463E9E] hover:underline"
        >
          <Sparkles className="size-3.5" aria-hidden />
          View all case studies
        </Link>
      </div>
    </section>
  );
}

export function CaseStudyDetailPageContent({ item, related }: CaseStudyDetailPageContentProps) {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 pt-6 pb-12 sm:px-6 sm:pt-8 sm:pb-16 lg:max-w-4xl">
      <article className="flex flex-col gap-0">
        <BlogArticleMotion>
          <CaseStudyPostHeader item={item} />
        </BlogArticleMotion>

        <BlogArticleMotion delay={0.08}>
          <CaseStudyMetricsBanner item={item} />
        </BlogArticleMotion>

        <BlogArticleMotion delay={0.14}>
          <div className={cn("case-study-article-body")}>
            {item.richDetail ? (
              <CaseStudyRichProse item={item} detail={item.richDetail} />
            ) : (
              <CaseStudySimpleProse item={item} />
            )}
          </div>
        </BlogArticleMotion>

        {related.length > 0 ? (
          <BlogArticleMotion delay={0.2}>
            <CaseStudyDetailRelated item={item} related={related} />
          </BlogArticleMotion>
        ) : null}
      </article>
    </div>
  );
}

/* Legacy exports kept for any external imports */
export function CaseStudyDetailHero({ item }: { item: CaseStudyItem }) {
  return <CaseStudyPostHeader item={item} />;
}

export function CaseStudyDetailBody({ item }: { item: CaseStudyItem }) {
  return item.richDetail ? (
    <CaseStudyRichProse item={item} detail={item.richDetail} />
  ) : (
    <CaseStudySimpleProse item={item} />
  );
}
