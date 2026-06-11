import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * Hides the floating route dev indicator. It uses pointer capture and can throw
   * `releasePointerCapture` in the console when navigating quickly in dev (Next devtools bundle).
   */
  devIndicators: false,
  async redirects() {
    return [
      {
        source: "/industries",
        destination: "/",
        permanent: true,
      },
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
    ],
  },
};

export default nextConfig;
