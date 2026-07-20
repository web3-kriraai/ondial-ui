import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { BlogPageShell } from "@/components/layout/blog-page-shell";
import { CaseStudyCtaSection } from "@/components/marketing/case-study-cta-section";
import { CaseStudyDetailPageContent } from "@/components/marketing/case-study-detail-sections";
import StructuredData from "@/components/StructuredData";
import {
  CASE_STUDIES,
  getCaseStudyById,
  getRelatedCaseStudies,
} from "@/data/case-study-page-content";
import { buildCaseStudyDetailSchemas } from "@/lib/seo/caseStudyPageSchemas";

type Props = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return CASE_STUDIES.map((item) => ({ id: item.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const item = getCaseStudyById(id);

  if (!item) {
    return { title: "Case Study" };
  }

  const title = item.richDetail?.metaTitle ?? item.headline;
  const description =
    item.richDetail?.seoDescription ??
    item.richDetail?.metaDescription ??
    item.richDetail?.subtitle ??
    item.quote;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://www.ondial.ai/case-studies/${id}`,
      siteName: "OnDial",
      images: [{ url: "https://www.ondial.ai/img/logo/og.png", width: 1200, height: 630, alt: title }],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["https://www.ondial.ai/img/logo/og.png"],
    },
    alternates: {
      canonical: `https://www.ondial.ai/case-studies/${id}`,
    },
  };
}

export default async function CaseStudyDetailPage({ params }: Props) {
  const { id } = await params;
  const item = getCaseStudyById(id);

  if (!item) {
    notFound();
  }

  const related = getRelatedCaseStudies(item.id);

  return (
    <>
      <StructuredData data={buildCaseStudyDetailSchemas(item)} />
      <BlogPageShell>
        <CaseStudyDetailPageContent item={item} related={related} />
        <CaseStudyCtaSection />
      </BlogPageShell>
    </>
  );
}
