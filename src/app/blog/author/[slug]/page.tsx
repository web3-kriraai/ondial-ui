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
    title: `Author · ${slug}`,
    description: `Posts by ${slug}.`,
  };
}

export default async function BlogAuthorPage({ params }: Props) {
  const { slug } = await params;

  return (
    <MarketingPageBody
      title={`Author: ${slug}`}
      description="List posts for this author from your data source. Slug is decoded from the URL segment."
    >
      <div className="flex flex-col gap-4">
        <p className="text-sm text-muted-foreground">Author archive placeholder for `{slug}`.</p>
        <Button variant="outline" className="self-start" render={<Link href="/blog" prefetch />} nativeButton={false}>
          All posts
        </Button>
      </div>
    </MarketingPageBody>
  );
}
