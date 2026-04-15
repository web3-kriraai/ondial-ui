import type { Metadata } from "next";
import Link from "next/link";

import { MarketingPageBody } from "@/components/layout/marketing-page-body";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Sign up",
  description: "Create an account.",
  robots: { index: false, follow: true },
};

export default function SignupPage() {
  return (
    <MarketingPageBody
      title="Sign up"
      description="Public page shell — wire registration to your API when you are ready."
    >
      <div className="flex flex-col gap-4">
        <p className="text-sm text-muted-foreground">
          Replace this block with your registration fields and validation.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button render={<Link href="/login" prefetch />} nativeButton={false}>
            Log in
          </Button>
          <Button variant="outline" render={<Link href="/" prefetch />} nativeButton={false}>
            Back home
          </Button>
        </div>
      </div>
    </MarketingPageBody>
  );
}
