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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://ondial.ai"),
  title: {
    default: "Ondial | Enterprise AI Voice Agents",
    template: "%s · Ondial",
  },
  description: "Automate your customer support and sales with Ondial's state-of-the-art AI voice agents. Never miss a call again.",
  keywords: ["AI voice agents", "customer support automation", "AI sales calls", "virtual receptionist", "Ondial"],
  authors: [{ name: "Ondial" }],
  creator: "Ondial",
  publisher: "Ondial",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Ondial | Enterprise AI Voice Agents",
    description: "Automate your customer support and sales with Ondial's state-of-the-art AI voice agents. Never miss a call again.",
    url: "https://ondial.ai",
    siteName: "Ondial",
    images: [
      {
        url: "/img/og-image.jpg", // Make sure to add this image to your public folder
        width: 1200,
        height: 630,
        alt: "Ondial AI Voice Agents",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ondial | Enterprise AI Voice Agents",
    description: "Automate your customer support and sales with Ondial's state-of-the-art AI voice agents.",
    images: ["/img/og-image.jpg"],
    creator: "@OndialAI",
  },
  icons: {
    icon: "/fav.svg",
    apple: "/fav.svg", // Fallback, consider adding proper apple-touch-icon
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
        {/* Schema.org JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Ondial",
              url: "https://ondial.ai",
              logo: "https://ondial.ai/fav.svg",
              description: "Enterprise AI voice agents for customer support and sales automation.",
              sameAs: [
                "https://twitter.com/OndialAI",
                "https://www.linkedin.com/company/ondial"
              ],
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+1-800-555-0199", // Update with real number
                contactType: "customer support",
                availableLanguage: ["English"]
              }
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Ondial",
              url: "https://ondial.ai",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://ondial.ai/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            }),
          }}
        />

        <AppProviders>
          <AppLayoutShell>{children}</AppLayoutShell>
        </AppProviders>
      </body>
    </html>
  );
}
