import type { Metadata } from "next";
import Link from "next/link";

import { MarketingPageBody } from "@/components/layout/marketing-page-body";
import { Button } from "@/components/ui/button";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Post · ${id}`,
    description: `Blog post ${id}.`,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { id } = await params;

  return (
    <MarketingPageBody
      title={`Post: ${id}`}
      description="Load article body from your API or CMS using the id param. This page is public."
    >
      <div className="flex flex-col gap-4">
        <p className="text-sm text-muted-foreground">Article content placeholder for `{id}`.</p>
        <Button variant="outline" className="self-start" render={<Link href="/blog" prefetch />} nativeButton={false}>
          All posts
        </Button>
      </div>
    </MarketingPageBody>
  );
}
