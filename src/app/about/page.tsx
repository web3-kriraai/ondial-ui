import type { Metadata } from "next";
import Link from "next/link";

import { MarketingPageBody } from "@/components/layout/marketing-page-body";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about Ondial.",
};

export default function AboutPage() {
  return (
    <MarketingPageBody
      title="About"
      description="Tell your story, team, and mission. This route is part of the public shell (no middleware auth)."
    >
      <div className="flex flex-col gap-4">
        <p className="text-sm text-muted-foreground">
          The root layout uses <code className="font-mono text-xs">AppLayoutShell</code> (route-aware footer layout) wrapping{" "}
          <code className="font-mono text-xs">SiteShell</code> with a default{" "}
          <code className="font-mono text-xs">SiteNavbar</code> (<code className="font-mono text-xs">MAIN_NAV</code> in{" "}
          <code className="font-mono text-xs">config/navigation</code>) and <code className="font-mono text-xs">SiteFooter</code>{" "}
          (<code className="font-mono text-xs">FOOTER_LEGAL_LINKS</code> in <code className="font-mono text-xs">config/footer</code>
          ). The legal footer sits after the page in the shell scroll column (scroll down to reach it on short viewports).
        </p>
        <Button variant="outline" render={<Link href="/" prefetch />} nativeButton={false}>
          Back home
        </Button>
      </div>
    </MarketingPageBody>
  );
}
