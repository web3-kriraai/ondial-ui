/**
 * Resolve the browser/visitor IP on the marketing edge (behind CF / nginx).
 * Used when proxying to the dashboard so rate limits apply per user, not the server.
 */

const MAX_IP_LEN = 128;
const IPV4_DOTTED = /^\d{1,3}(\.\d{1,3}){3}$/;
const MAPPED4_PREFIX = "::ffff:";

export function normalizeVisitorIp(raw: string | null | undefined): string {
  if (raw == null) return "unknown";
  const t = typeof raw === "string" ? raw.trim() : String(raw).trim();
  if (!t) return "unknown";

  let s = t.length > MAX_IP_LEN ? t.slice(0, MAX_IP_LEN) : t;

  if (s.startsWith("[") && s.endsWith("]")) {
    const inner = s.slice(1, -1);
    if (inner.toLowerCase().startsWith(MAPPED4_PREFIX)) {
      const v4 = inner.slice(MAPPED4_PREFIX.length);
      if (IPV4_DOTTED.test(v4)) return v4;
    }
  }

  if (s.toLowerCase().startsWith(MAPPED4_PREFIX)) {
    const v4 = s.slice(MAPPED4_PREFIX.length);
    if (IPV4_DOTTED.test(v4)) return v4;
  }

  return s;
}

function firstForwarded(value: string | null): string | null {
  if (!value) return null;
  const first = value.split(",")[0]?.trim();
  return first || null;
}

/**
 * Prefer edge-provided single-IP headers, then X-Forwarded-For leftmost hop.
 */
export function getVisitorIp(request: Request): string {
  const headers = request.headers;

  const candidates = [
    headers.get("cf-connecting-ip"),
    headers.get("true-client-ip"),
    headers.get("x-real-ip"),
    firstForwarded(headers.get("x-vercel-forwarded-for")),
    firstForwarded(headers.get("x-forwarded-for")),
  ];

  for (const raw of candidates) {
    const ip = normalizeVisitorIp(raw);
    if (ip !== "unknown") return ip;
  }

  const reqIp = (request as Request & { ip?: string }).ip;
  if (typeof reqIp === "string" && reqIp.trim()) {
    return normalizeVisitorIp(reqIp);
  }

  return "unknown";
}

/** Headers to send upstream so dashboard rate-limits the visitor IP. */
export function visitorIpProxyHeaders(request: Request): Record<string, string> {
  const ip = getVisitorIp(request);
  return {
    "x-ondial-visitor-ip": ip,
    "x-real-ip": ip,
    // Put visitor first; upstream proxies may append the marketing server IP.
    "x-forwarded-for": ip,
    "cf-connecting-ip": ip,
  };
}
