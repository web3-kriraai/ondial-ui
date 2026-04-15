import type { Metadata } from "next";
import Link from "next/link";

import { MarketingPageBody } from "@/components/layout/marketing-page-body";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Google sign-in",
  description: "OAuth callback landing.",
  robots: { index: false, follow: false },
};

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function GoogleAuthCallbackPage({ searchParams }: Props) {
  const sp = await searchParams;
  const entries = Object.entries(sp);

  return (
    <MarketingPageBody
      title="Google callback"
      description="Public route for OAuth redirect. Exchange code with your backend; do not trust query params alone on the client."
    >
      <div className="flex flex-col gap-6">
        {entries.length === 0 ? (
          <p className="text-sm text-muted-foreground">No query parameters on this request.</p>
        ) : (
          <dl className="flex flex-col gap-4">
            {entries.map(([key, value]) => (
              <div key={key} className="flex flex-col gap-1 border-b border-border pb-4 last:border-b-0 last:pb-0">
                <dt className="text-sm font-medium text-foreground">{key}</dt>
                <dd className="break-all font-mono text-xs text-muted-foreground">
                  {Array.isArray(value) ? value.join(", ") : value}
                </dd>
              </div>
            ))}
          </dl>
        )}
        <Button variant="outline" className="self-start" render={<Link href="/login" prefetch />} nativeButton={false}>
          Back to log in
        </Button>
      </div>
    </MarketingPageBody>
  );
}
