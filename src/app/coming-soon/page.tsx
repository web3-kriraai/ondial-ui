import type { Metadata } from "next";
import Link from "next/link";

import { MarketingPageBody } from "@/components/layout/marketing-page-body";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Coming soon",
  description: "We are almost ready.",
};

export default function ComingSoonPage() {
  return (
    <MarketingPageBody
      title="Coming soon"
      description="Use this route for pre-launch teasers, waitlists, or feature announcements."
    >
      <div className="flex flex-col gap-4">
        <p className="text-sm text-muted-foreground">Notify visitors when the full experience is available.</p>
        <Button variant="outline" render={<Link href="/" prefetch />} nativeButton={false}>
          Back home
        </Button>
      </div>
    </MarketingPageBody>
  );
}
