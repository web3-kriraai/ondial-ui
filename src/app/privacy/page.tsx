import type { Metadata } from "next";
import Link from "next/link";

import { MarketingPageBody } from "@/components/layout/marketing-page-body";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: "How Ondial handles your data.",
};

export default function PrivacyPage() {
  return (
    <MarketingPageBody
      title="Privacy policy"
      description="Replace this placeholder with your final legal copy. Last updated date should be maintained with your releases."
    >
      <div className="flex flex-col gap-4 text-sm leading-relaxed text-muted-foreground">
        <p>
          This is placeholder content only. It does not constitute legal advice. Consult qualified counsel before
          publishing a privacy policy.
        </p>
        <Button variant="outline" className="self-start" render={<Link href="/" prefetch />} nativeButton={false}>
          Back home
        </Button>
      </div>
    </MarketingPageBody>
  );
}
