import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * Hides the floating route dev indicator. It uses pointer capture and can throw
   * `releasePointerCapture` in the console when navigating quickly in dev (Next devtools bundle).
   */
  devIndicators: false,
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
    viewTransition: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
