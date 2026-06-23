import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * Hides the floating route dev indicator. It uses pointer capture and can throw
   * `releasePointerCapture` in the console when navigating quickly in dev (Next devtools bundle).
   */
  devIndicators: false,
  async redirects() {
    const industrySlugRedirects = [
      ["healthcare-and-medical-services", "ai-voice-agents-healthcare-medical"],
      ["insurance-services", "ai-voice-agents-insurance"],
      ["financial-and-banking-services", "ai-voice-agents-finance-banking"],
      ["real-estate-services", "ai-voice-agents-real-estate"],
      ["call-center-and-bpo-services", "ai-voice-agents-call-centers-bpo"],
      ["travel-and-tourism-services", "ai-voice-agents-travel-tourism"],
      ["transportation-and-logistics-services", "ai-voice-agents-transportation-logistics"],
      ["retail-and-ecommerce-services", "ai-voice-agents-retail-e-commerce"],
      ["telecommunications-services", "ai-voice-agents-telecommunications"],
      ["automotive-services", "ai-voice-agents-automotive"],
      ["education-services", "ai-voice-agents-education"],
      ["hospitality-services", "ai-voice-agents-hospitality"],
      ["legal-services", "ai-voice-agents-legal"],
      ["government-services", "ai-voice-agents-government"],
      ["manufacturing-services", "ai-voice-agents-manufacturing"],
      ["non-profit-organizations-services", "ai-voice-agents-non-profit-organizations"],
      ["event-management-services", "ai-voice-agents-event-management"],
      ["consulting-services", "ai-voice-agents-consulting"],
      ["pharmaceutical-services", "ai-voice-agents-pharmaceuticals"],
      ["sales-and-lead-generation-services", "ai-voice-agents-sales-lead-generation"],
      ["utilities-services", "ai-voice-agents-utilities"],
      ["construction-services", "ai-voice-agents-construction"],
      ["agriculture-services", "ai-voice-agents-agriculture"],
    ] as const;

    return [
      {
        source: "/admin",
        destination: "/seo/posts",
        permanent: false,
      },
      {
        source: "/admin/login",
        destination: "/seo/login",
        permanent: false,
      },
      {
        source: "/admin/posts",
        destination: "/seo/posts",
        permanent: false,
      },
      {
        source: "/admin/posts/new",
        destination: "/seo/posts/new",
        permanent: false,
      },
      {
        source: "/admin/posts/:id",
        destination: "/seo/posts/:id",
        permanent: false,
      },
      {
        source: "/admin/authors",
        destination: "/seo/authors",
        permanent: false,
      },
      {
        source: "/industries",
        destination: "/",
        permanent: true,
      },
      ...industrySlugRedirects.map(([source, destination]) => ({
        source: `/industries/${source}`,
        destination: `/industries/${destination}`,
        permanent: true,
      })),
    ];
  },
  /** Allow tunnel hosts (ngrok, etc.) to hit dev-only routes like `/_next/webpack-hmr` in development. */
  allowedDevOrigins: [
    "*.ngrok-free.dev",
    "*.ngrok.app",
    "*.ngrok.io",
    "127.0.0.1",
    "localhost",
  ],
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "i.pinimg.com",
      },
      {
        protocol: "https",
        hostname: "flagcdn.com",
      },
      {
        protocol: "https",
        hostname: "cdn.simpleicons.org",
      },
      {
        protocol: "https",
        hostname: "assets.codepen.io",
      },
      {
        protocol: "https",
        hostname: "images.ctfassets.net",
      },
      {
        protocol: "https",
        hostname: "downloads.ctfassets.net",
      },
      // Cloudinary CDN
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

export default nextConfig;
