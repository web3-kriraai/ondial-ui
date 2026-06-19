import type { Metadata } from "next";

import { AuthPageShell } from "@/components/auth/auth-page-shell";
import { AuthSplitLayout } from "@/components/auth/auth-split-layout";

import { SignupForm } from "./signup-form";

export const metadata: Metadata = {
  title: "Sign up | OnDial",
  description: "Create your OnDial account to get started.",
};

export default function SignupPage() {
  return (
    <AuthPageShell fullScreen>
      <AuthSplitLayout fullScreen>
        <SignupForm />
      </AuthSplitLayout>
    </AuthPageShell>
  );
}
