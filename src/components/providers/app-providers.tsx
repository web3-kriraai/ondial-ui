"use client";

import { ThemeProvider } from "next-themes";

import { Toaster } from "@/components/ui/sonner";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" forcedTheme="light" enableSystem={false} disableTransitionOnChange>
      {/* Flex chain so `SiteShell` can `flex-1` fill the viewport (no stray gap under the footer). */}
      <div className="flex h-dvh min-h-0 flex-1 flex-col">{children}</div>
      <Toaster />
    </ThemeProvider>
  );
}
