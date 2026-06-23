import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo/siteConfig";

/**
 * Dynamic robots.ts - replaces public/robots.txt.
 * Next.js serves this at /robots.txt automatically.
 * Ensures public/robots.txt does not exist to avoid conflicts.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "*/feed/",
          "/?s=",
          "/?q=",
          "/login",
          "/signup",
          "/dashboard",
          "/dashboard/",
          "/super-admin/",
          "/seo/",
          "/admin/",
        ],
      },
      // Allow all major AI search / LLM crawlers explicitly
      { userAgent: "OAI-SearchBot", allow: "/" },
      { userAgent: "ChatGPT-User", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "FirecrawlAgent", allow: "/" },
      { userAgent: "AndiBot", allow: "/" },
      { userAgent: "ExaBot", allow: "/" },
      { userAgent: "PhindBot", allow: "/" },
      { userAgent: "YouBot", allow: "/" },
      { userAgent: "CloudBot", allow: "/" },
      { userAgent: "Gemini", allow: "/" },
      // Block internal/admin routes for all crawlers
      { userAgent: "Googlebot", allow: "/", disallow: ["/dashboard/", "/super-admin/"] },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
