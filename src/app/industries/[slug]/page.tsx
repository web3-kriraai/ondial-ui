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
import { INDUSTRY_SEO_METADATA } from "@/lib/services-data";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllIndustrySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);
  if (!industry) return { title: "Industry", robots: { index: false } };

  const seo = INDUSTRY_SEO_METADATA[slug];
  const title = seo?.title ?? industry.name;
  const description = seo?.description ?? industry.description;
  const url = `https://www.ondial.ai/industries/${slug}`;

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: "OnDial",
      images: [{ url: "https://www.ondial.ai/img/logo/og.png", width: 1200, height: 630, alt: title }],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["https://www.ondial.ai/img/logo/og.png"],
      creator: "@ondialai",
    },
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
        <IndustryPageSections
          content={pageContent}
          industryName={industry.name}
          industrySlug={industry.slug}
        />
      </main>
    </DemoSyncProvider>
  );
}
