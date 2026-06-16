import type { Metadata } from "next";

import { NewsHeroSection } from "@/components/marketing/news-hero-section";
import { NewsProductUpdateSection } from "@/components/marketing/news-product-update-section";

export const metadata: Metadata = {
  title: "News",
  description:
    "Customer success stories and real-world results from teams using OnDial AI voice agents.",
};

export default function NewsPage() {
  return (
    <main className="flex flex-1 flex-col">
      <NewsHeroSection />
      <NewsProductUpdateSection />
    </main>
  );
}
