import type { Metadata } from "next";
import Link from "next/link";

import { MarketingPageBody } from "@/components/layout/marketing-page-body";
import { Button } from "@/components/ui/button";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `Industry · ${slug}`,
    description: `How Ondial helps in ${slug.replaceAll("-", " ")}.`,
  };
}

export default async function IndustryPage({ params }: Props) {
  const { slug } = await params;

  return (
    <MarketingPageBody
      title={`Industry: ${slug}`}
      description="Industry-specific landing content. Fetch by slug from your CMS or static generation map."
    >
      <div className="flex flex-col gap-4">
        <p className="text-sm text-muted-foreground">Try `/industries/healthcare` or any slug you support.</p>
        <Button variant="outline" className="self-start" render={<Link href="/" prefetch />} nativeButton={false}>
          Back home
        </Button>
      </div>
    </MarketingPageBody>
  );
}
