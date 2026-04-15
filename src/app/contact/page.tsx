import type { Metadata } from "next";
import Link from "next/link";

import { MarketingPageBody } from "@/components/layout/marketing-page-body";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Ondial.",
};

export default function ContactPage() {
  return (
    <MarketingPageBody
      title="Contact"
      description="Use this route for a contact form, office details, or support links."
    >
      <div className="flex flex-col gap-4">
        <p className="text-sm text-muted-foreground">
          Add a form using your shadcn Field patterns, or embed your preferred contact widget.
        </p>
        <Button variant="outline" render={<Link href="/" prefetch />} nativeButton={false}>
          Back home
        </Button>
      </div>
    </MarketingPageBody>
  );
}
