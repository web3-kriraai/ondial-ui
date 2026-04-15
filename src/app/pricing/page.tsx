import type { Metadata } from "next";
import Link from "next/link";

import { MarketingPageBody } from "@/components/layout/marketing-page-body";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Plans and pricing for Ondial.",
};

export default function PricingPage() {
  return (
    <MarketingPageBody
      title="Pricing"
      description="Outline tiers here. Prefer Card composition from shadcn when you build real plans."
    >
      <ul className="flex flex-col gap-3 text-sm text-muted-foreground">
        <li>Starter — placeholder</li>
        <li>Growth — placeholder</li>
        <li>Enterprise — placeholder</li>
      </ul>
      <Button variant="outline" render={<Link href="/contact" prefetch />} nativeButton={false}>
        Talk to sales
      </Button>
    </MarketingPageBody>
  );
}
