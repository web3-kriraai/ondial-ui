import type { Metadata } from "next";
import Link from "next/link";

import { MarketingPageBody } from "@/components/layout/marketing-page-body";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Return policy",
  description: "Returns and refunds for Ondial.",
};

export default function ReturnPolicyPage() {
  return (
    <MarketingPageBody
      title="Return policy"
      description="Describe return windows, eligible items, and refund timelines. Replace this placeholder before launch."
    >
      <div className="flex flex-col gap-4 text-sm leading-relaxed text-muted-foreground">
        <p>This is placeholder content only. Align copy with your jurisdiction and product category.</p>
        <Button variant="outline" className="self-start" render={<Link href="/" prefetch />} nativeButton={false}>
          Back home
        </Button>
      </div>
    </MarketingPageBody>
  );
}
