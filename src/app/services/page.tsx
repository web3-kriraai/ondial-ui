import type { Metadata } from "next";
import Link from "next/link";

import { MarketingPageBody } from "@/components/layout/marketing-page-body";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Services",
  description: "What Ondial offers.",
};

export default function ServicesPage() {
  return (
    <MarketingPageBody
      title="Services"
      description="Summarize offerings in sections or cards. Pull content from your CMS or API when you connect it."
    >
      <ul className="flex flex-col gap-3 text-sm text-muted-foreground">
        <li>Consulting — placeholder</li>
        <li>Implementation — placeholder</li>
        <li>Support — placeholder</li>
      </ul>
      <Button variant="outline" render={<Link href="/pricing" prefetch />} nativeButton={false}>
        View pricing
      </Button>
    </MarketingPageBody>
  );
}
