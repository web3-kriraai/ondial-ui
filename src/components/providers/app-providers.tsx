"use client";

import { ThemeProvider } from "next-themes";

import { LazyGoogleAnalytics } from "@/components/analytics/lazy-google-analytics";
import { ProgressiveLoader } from "@/components/layout/progressive-loader";
import { LoaderProvider } from "@/components/providers/loader-context";
import { Toaster } from "@/components/ui/sonner";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" forcedTheme="light" enableSystem={false} disableTransitionOnChange>
      <LoaderProvider>
        <LazyGoogleAnalytics />
        <ProgressiveLoader />
        {/* Flex chain so `SiteShell` can `flex-1` fill the viewport (no stray gap under the footer). */}
        <div className="flex h-dvh min-h-0 flex-1 flex-col">{children}</div>
        <Toaster />
      </LoaderProvider>
    </ThemeProvider>
  );
}
