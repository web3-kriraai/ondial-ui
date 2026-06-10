import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { IndustryHeroHeader } from "@/components/marketing/industry-hero-header";
import { AudioDemoPlayer } from "@/components/marketing/audio-demo-player";
import { Button } from "@/components/ui/button";
import {
  getAllIndustrySlugs,
  getIndustryBySlug,
  getIndustryHeroContent,
} from "@/data/industry-hero-content";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllIndustrySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);
  if (!industry) return { title: "Industry" };

  return {
    title: industry.name,
    description: industry.description,
  };
}

export default async function IndustryPage({ params }: Props) {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);
  if (!industry) notFound();

  const hero = getIndustryHeroContent(industry);

  return (
    <main className="flex flex-1 flex-col">
      <IndustryHeroHeader {...hero} />

      <AudioDemoPlayer tracks={hero.audioDemos} />

      <section className="mx-auto w-full max-w-3xl px-4 pb-14 pt-2 text-center sm:px-6 sm:pb-16">
        <p className="text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
          {industry.description}
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button render={<Link href="/industries" prefetch />} nativeButton={false}>
            Explore all industries
          </Button>
          <Button
            variant="outline"
            render={<Link href="/pricing" prefetch />}
            nativeButton={false}
          >
            View pricing
          </Button>
        </div>
      </section>
    </main>
  );
}
