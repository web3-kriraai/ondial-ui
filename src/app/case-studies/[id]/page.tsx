import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { BlogPageShell } from "@/components/layout/blog-page-shell";
import { CaseStudyCtaSection } from "@/components/marketing/case-study-cta-section";
import { CaseStudyDetailPageContent } from "@/components/marketing/case-study-detail-sections";
import {
  CASE_STUDIES,
  getCaseStudyById,
  getRelatedCaseStudies,
} from "@/data/case-study-page-content";

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

  const description = item.richDetail?.subtitle ?? item.quote;

  return {
    title: item.headline,
    description,
    openGraph: {
      title: item.headline,
      description,
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
    <BlogPageShell>
      <CaseStudyDetailPageContent item={item} related={related} />
      <CaseStudyCtaSection />
    </BlogPageShell>
  );
}
