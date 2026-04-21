import type { Metadata } from "next";

import { AuthPageShell } from "@/components/auth/auth-page-shell";

import { SignupForm } from "./signup-form";

export const metadata: Metadata = {
  title: "Sign up | Ondial",
  description: "Create your Ondial account to get started.",
};

export default function SignupPage() {
  return (
    <AuthPageShell>
      <SignupForm />
    </AuthPageShell>
  );
}
