import { getApiUrl } from "@/config/urls";

type QueryParams = Record<string, string | number | boolean | undefined | null>;

/**
 * Server-side fetch to the Ondial dashboard API.
 * Used by same-origin marketing proxies (`/api/packages`, etc.).
 */
export async function fetchDashboardApi(
  path: string,
  init?: RequestInit & { params?: QueryParams; revalidate?: number | false },
): Promise<Response> {
  const { params, revalidate = 60, ...requestInit } = init ?? {};
  const base = getApiUrl();
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const url = new URL(`${base}${normalizedPath}`);

  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined && value !== null) {
        url.searchParams.set(key, String(value));
      }
    }
  }

  return fetch(url.toString(), {
    ...requestInit,
    headers: {
      Accept: "application/json",
      ...requestInit.headers,
    },
    next:
      revalidate === false
        ? { revalidate: 0 }
        : { revalidate },
  });
}
