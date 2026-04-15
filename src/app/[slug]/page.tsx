import type { Metadata } from "next";
import Link from "next/link";

import { MarketingPageBody } from "@/components/layout/marketing-page-body";
import { Button } from "@/components/ui/button";

type Props = {
  params: Promise<{ slug: string }>;
};

/**
 * Single-segment marketing / CMS-style pages (e.g. `/campaign-name`).
 * More specific routes like `/login` or `/blog` always win over this dynamic segment.
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: slug,
    description: `Marketing page for ${slug}.`,
  };
}

export default async function MarketingSlugPage({ params }: Props) {
  const { slug } = await params;

  return (
    <MarketingPageBody
      title={slug}
      description="Render CMS-driven content for arbitrary single-segment paths. Keep reserved routes as dedicated folders."
    >
      <div className="flex flex-col gap-4">
        <p className="text-sm text-muted-foreground">
          Slug from URL: <span className="font-mono text-foreground">{slug}</span>
        </p>
        <Button variant="outline" className="self-start" render={<Link href="/" prefetch />} nativeButton={false}>
          Back home
        </Button>
      </div>
    </MarketingPageBody>
  );
}
