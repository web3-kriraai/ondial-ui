import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { IndustryHeroHeader } from "@/components/marketing/industry-hero-header";
import { AudioDemoPlayer } from "@/components/marketing/audio-demo-player";
import { IndustryPageSections } from "@/components/marketing/industry-page-sections";
import { DemoSyncProvider } from "@/components/providers/demo-sync-context";
import {
  getAllIndustrySlugs,
  getIndustryBySlug,
  getIndustryHeroContent,
  getIndustryPageContent,
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

  const hero        = getIndustryHeroContent(industry);
  const pageContent = getIndustryPageContent(industry.slug, industry.name);

  return (
    <DemoSyncProvider>
      <main className="flex flex-1 flex-col">
        <IndustryHeroHeader {...hero} />
        <AudioDemoPlayer tracks={hero.audioDemos} />
        <IndustryPageSections content={pageContent} industryName={industry.name} />
      </main>
    </DemoSyncProvider>
  );
}
