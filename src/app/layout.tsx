import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";

import { AppLayoutShell } from "@/components/layout/app-layout-shell";
import { AppProviders } from "@/components/providers/app-providers";

import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const fontMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

const fontDisplay = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

export const metadata: Metadata = {
  title: {
    default: "Ondial",
    template: "%s · Ondial",
  },
  description: "Next.js frontend for Ondial",
  icons: {
    icon: "/fav.svg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", fontMono.variable, fontDisplay.variable, "font-sans", geist.variable)}
      suppressHydrationWarning
    >
      <body className="flex min-h-dvh  flex-col">
        <AppProviders>
          <AppLayoutShell>{children}</AppLayoutShell>
        </AppProviders>
      </body>
    </html>
  );
}
