import type { Metadata } from "next";

import { ContactMissionSection } from "@/components/marketing/contact-mission-section";
import { ContactPageSection } from "@/components/marketing/contact-page-section";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Ondial.",
};

export default function ContactPage() {
  return (
    <main className="flex flex-1 flex-col">
      <ContactPageSection />
      <ContactMissionSection />
    </main>
  );
}
