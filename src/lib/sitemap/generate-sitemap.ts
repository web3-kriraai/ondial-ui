/**
 * Sitemap is now served dynamically by src/app/sitemap.xml/route.ts.
 * This function is kept as a no-op so existing call sites in the admin
 * routes compile without changes.
 */
export async function generateAndWriteSitemap(): Promise<number> {
  return 0;
}
