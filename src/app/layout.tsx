import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";

import { AppLayoutShell } from "@/components/layout/app-layout-shell";
import { AppProviders } from "@/components/providers/app-providers";

import "./globals.css";

const fontSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

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
      className={`${fontSans.variable} ${fontMono.variable} ${fontDisplay.variable} h-full antialiased`}
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
