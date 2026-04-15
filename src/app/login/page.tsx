import type { Metadata } from "next";
import Link from "next/link";

import { MarketingPageBody } from "@/components/layout/marketing-page-body";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Log in",
  description: "Sign in to your account.",
  robots: { index: false, follow: true },
};

export default function LoginPage() {
  return (
    <MarketingPageBody
      title="Log in"
      description="Public page shell — connect your backend auth here. No middleware is enforced on this marketing site."
    >
      <div className="flex flex-col gap-4">
        <p className="text-sm text-muted-foreground">
          Replace this block with your sign-in form (e.g. email + password or OAuth buttons).
        </p>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button render={<Link href="/signup" prefetch />} nativeButton={false}>
            Create an account
          </Button>
          <Button variant="outline" render={<Link href="/" prefetch />} nativeButton={false}>
            Back home
          </Button>
        </div>
      </div>
    </MarketingPageBody>
  );
}
