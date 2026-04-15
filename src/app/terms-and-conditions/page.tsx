import type { Metadata } from "next";
import Link from "next/link";

import { MarketingPageBody } from "@/components/layout/marketing-page-body";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Terms and conditions",
  description: "Terms of use for Ondial.",
};

export default function TermsPage() {
  return (
    <MarketingPageBody
      title="Terms and conditions"
      description="Replace this placeholder with your binding terms. Version and effective date should be explicit."
    >
      <div className="flex flex-col gap-4 text-sm leading-relaxed text-muted-foreground">
        <p>
          This is placeholder content only. It does not constitute legal advice. Consult qualified counsel before
          publishing terms of use.
        </p>
        <Button variant="outline" className="self-start" render={<Link href="/" prefetch />} nativeButton={false}>
          Back home
        </Button>
      </div>
    </MarketingPageBody>
  );
}
