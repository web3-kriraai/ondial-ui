/**
 * Next.js Instrumentation Hook
 *
 * `register()` is called once when the server starts (every deploy / restart).
 * We use it to regenerate the static sitemap.xml so Google always gets a fresh
 * file even if no posts were published since the last deploy.
 *
 * Docs: https://nextjs.org/docs/app/building-your-application/optimizing/instrumentation
 */
export async function register() {
  // Only run on the Node.js runtime (not Edge) and only in production-like envs
  if (process.env.NEXT_RUNTIME === "nodejs") {
    // Dynamic import keeps this out of the Edge bundle entirely
    const { generateAndWriteSitemap } = await import(
      "@/lib/sitemap/generate-sitemap"
    );

    generateAndWriteSitemap()
      .then((count) =>
        console.log(`[startup] Sitemap ready — ${count} published posts`),
      )
      .catch((err) =>
        console.error("[startup] Sitemap generation failed:", err),
      );
  }
}
