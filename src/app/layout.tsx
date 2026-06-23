import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import { Poppins } from "next/font/google";
import Script from "next/script";

import { AppLayoutShell } from "@/components/layout/app-layout-shell";
import { AppProviders } from "@/components/providers/app-providers";
import StructuredData from "@/components/StructuredData";
import { organizationSchema } from "@/lib/seo/organizationSchema";
import { websiteSchema } from "@/lib/seo/websiteSchema";
import { softwareApplicationSchema } from "@/lib/seo/softwareApplicationSchema";

import "./globals.css";
import { cn } from "@/lib/utils";

const fontSans = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.ondial.ai"),
  title: {
    default: "Best AI Voice Agents to Automate Your Phone Calls | OnDial",
    template: "%s | OnDial",
  },
  description: "Discover the best AI voice agents to automate your phone calls, reduce costs, and improve customer satisfaction with OnDial's Top AI Call Agents solution.",
  keywords: ["AI voice agents", "customer support automation", "AI sales calls", "virtual receptionist", "OnDial"],
  authors: [{ name: "OnDial" }],
  creator: "OnDial",
  publisher: "OnDial",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "https://www.ondial.ai",
  },
  openGraph: {
    title: "Best AI Voice Agents to Automate Your Phone Calls | OnDial",
    description: "Discover the best AI voice agents to automate your phone calls, reduce costs, and improve customer satisfaction with OnDial's Top AI Call Agents solution.",
    url: "https://www.ondial.ai",
    siteName: "OnDial",
    images: [
      {
        url: "/img/logo/og.png",
        width: 1200,
        height: 630,
        alt: "OnDial AI Voice Agents",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Best AI Voice Agents to Automate Your Phone Calls | OnDial",
    description: "Discover the best AI voice agents to automate your phone calls, reduce costs, and improve customer satisfaction with OnDial's Top AI Call Agents solution.",
    images: ["/img/logo/og.png"],
    creator: "@ondialai",
  },
  icons: {
    icon: "/fav.svg",
    apple: "/fav.svg",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google17567a3d804df7df",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = (await headers()).get("x-pathname") ?? "/";

  return (
    <html
      lang="en"
      className={cn("h-full overflow-hidden", "antialiased", "font-sans", fontSans.variable)}
      suppressHydrationWarning
    >
      <body className="flex h-dvh min-h-0 flex-col overflow-hidden font-sans">
        {/* Google tag (gtag.js) */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-S0BEQDE207"
          strategy="lazyOnload"
        />
        <Script id="google-analytics" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-S0BEQDE207');
          `}
        </Script>

        {/* Schema.org JSON-LD */}
        <StructuredData data={[organizationSchema, websiteSchema, softwareApplicationSchema]} />

        <AppProviders>
          <AppLayoutShell initialPathname={pathname}>{children}</AppLayoutShell>
        </AppProviders>
      </body>
    </html>
  );
}
