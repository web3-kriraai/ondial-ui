/**
 * Public URL configuration for the marketing site and dashboard API.
 * Values come from NEXT_PUBLIC_* env vars (inlined at build time).
 */

export function trimTrailingSlash(url: string): string {
  return url.replace(/\/$/, "");
}

/** Marketing site origin (e.g. https://test.ondial.ai). */
export function getAppUrl(): string {
  return trimTrailingSlash(
    process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  );
}

/** Dashboard API base URL (e.g. https://dashboard-test.ondial.ai/api). */
export function getApiUrl(): string {
  const configured = process.env.NEXT_PUBLIC_API_URL;
  if (configured) return trimTrailingSlash(configured);
  return `${getAppUrl()}/api`;
}

/**
 * Dashboard web app origin (e.g. https://dashboard-test.ondial.ai).
 * Set NEXT_PUBLIC_DASHBOARD_URL explicitly, or it is derived from NEXT_PUBLIC_API_URL.
 */
export function getDashboardUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_DASHBOARD_URL;
  if (explicit) return trimTrailingSlash(explicit);
  return trimTrailingSlash(getApiUrl().replace(/\/api\/?$/, ""));
}

export function dashboardPath(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${getDashboardUrl()}${normalized}`;
}

/** Resolved at build time for static content modules. */
export const DASHBOARD_LOGIN_URL = dashboardPath("/login");
export const DASHBOARD_SIGNUP_URL = dashboardPath("/signup");

export function isExternalHref(href: string): boolean {
  return /^https?:\/\//i.test(href);
}
