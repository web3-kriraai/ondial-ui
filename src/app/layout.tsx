import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";

import { AppLayoutShell } from "@/components/layout/app-layout-shell";
import { AppProviders } from "@/components/providers/app-providers";

import "./globals.css";
import { cn } from "@/lib/utils";

const fontSans = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
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
      className={cn("h-full overflow-hidden", "antialiased", "font-sans", fontSans.variable)}
      suppressHydrationWarning
    >
      <body className="flex h-dvh min-h-0 flex-col overflow-hidden font-sans">
        <AppProviders>
          <AppLayoutShell>{children}</AppLayoutShell>
        </AppProviders>
      </body>
    </html>
  );
}
