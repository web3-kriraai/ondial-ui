import type { Metadata } from "next";

import { MarketingDottedPageShell } from "@/components/layout/marketing-dotted-page-shell";
import { ContactMissionSection } from "@/components/marketing/contact-mission-section";
import { ContactPageSection } from "@/components/marketing/contact-page-section";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with OnDial.",
};

export default function ContactPage() {
  return (
    <MarketingDottedPageShell>
      <ContactPageSection />
      <ContactMissionSection />
    </MarketingDottedPageShell>
  );
}
