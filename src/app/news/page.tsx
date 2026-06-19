import type { Metadata } from "next";

import { MarketingDottedPageShell } from "@/components/layout/marketing-dotted-page-shell";
import { NewsHeroSection } from "@/components/marketing/news-hero-section";
import { NewsProductUpdateSection } from "@/components/marketing/news-product-update-section";

export const metadata: Metadata = {
  title: "News",
  description:
    "Customer success stories and real-world results from teams using OnDial AI voice agents.",
};

export default function NewsPage() {
  return (
    <MarketingDottedPageShell>
      <NewsHeroSection />
      <NewsProductUpdateSection />
    </MarketingDottedPageShell>
  );
}
