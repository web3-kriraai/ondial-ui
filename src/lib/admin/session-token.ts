export const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7; // 7 days

/** Create a signed, time-limited session token (never stores the raw password in the cookie). */
export async function createSessionToken(secret: string): Promise<string> {
  const issuedAt = Date.now().toString(36);
  const nonce = randomHex(16);
  const payload = `${issuedAt}.${nonce}`;
  const signature = await signPayload(payload, secret);
  return `${payload}.${signature}`;
}

/** Verify HMAC signature and expiry. */
export async function verifySessionToken(token: string, secret: string): Promise<boolean> {
  const parts = token.split(".");
  if (parts.length !== 3) return false;

  const [issuedAt, nonce, signature] = parts;
  if (!issuedAt || !nonce || !signature) return false;

  const issuedMs = Number.parseInt(issuedAt, 36);
  if (!Number.isFinite(issuedMs)) return false;
  if (Date.now() - issuedMs > SESSION_TTL_SECONDS * 1000) return false;

  const payload = `${issuedAt}.${nonce}`;
  const expected = await signPayload(payload, secret);

  return safeEqual(signature, expected);
}

/** Verify cookie value (edge + Node safe — uses Web Crypto only). */
export async function isValidSessionCookieValue(
  cookieValue: string | undefined,
  secret: string,
): Promise<boolean> {
  if (!cookieValue) return false;
  return verifySessionToken(cookieValue, secret);
}

/** Constant-time compare for the login password / API header secret. */
export function safeEqualSecret(provided: string, secret: string): boolean {
  return safeEqual(provided, secret);
}

function randomHex(byteCount: number): string {
  const bytes = new Uint8Array(byteCount);
  globalThis.crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
}

async function signPayload(payload: string, secret: string): Promise<string> {
  const key = await globalThis.crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await globalThis.crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(payload),
  );
  return base64UrlEncode(new Uint8Array(signature));
}

function base64UrlEncode(bytes: Uint8Array): string {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}
