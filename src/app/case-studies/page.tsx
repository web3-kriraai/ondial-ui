import type { Metadata } from "next";
import Link from "next/link";

import { MarketingPageBody } from "@/components/layout/marketing-page-body";
import { Button } from "@/components/ui/button";
import { INDUSTRIES_NAV_ITEMS } from "@/config/industries-nav";

export const metadata: Metadata = {
  title: "Case studies",
  description: "See how teams use Ondial voice agents to scale outreach, support, and operations.",
};

export default function CaseStudiesPage() {
  return (
    <MarketingPageBody
      title="Case studies"
      description="Real-world results from teams automating reminders, outreach, surveys, and support with AI voice."
    >
      <Button
        variant="outline"
        className="self-center"
        render={
          <Link href={INDUSTRIES_NAV_ITEMS[0]?.href ?? "/pricing"} prefetch />
        }
        nativeButton={false}
      >
        Explore industries
      </Button>
    </MarketingPageBody>
  );
}
