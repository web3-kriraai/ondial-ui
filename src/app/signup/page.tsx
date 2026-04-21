import type { Metadata } from "next";
import { SignupForm } from "./signup-form";

export const metadata: Metadata = {
  title: "Sign up | Ondial",
  description: "Create your Ondial account to get started.",
};

export default function SignupPage() {
  return (
    <div className="flex min-h-0 flex-1 flex-col items-center justify-center bg-muted/25 px-4 pb-10 pt-42 sm:pt-38 sm:px-6">
      <SignupForm />
    </div>
  );
}
