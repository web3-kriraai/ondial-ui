import "server-only";

import { createClient } from "@supabase/supabase-js";

import type { Database } from "@/lib/db/types";

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(
      `Missing required env var: ${name}. Add it to your .env.local file.`,
    );
  }
  return value;
}

/**
 * Server-side Supabase client using the service-role key.
 * Only ever used in server components, API routes, and server actions.
 * Never exposed to the browser bundle.
 */
export function createServerClient() {
  return createClient<Database>(
    requireEnv("SUPABASE_URL"),
    requireEnv("SUPABASE_SERVICE_KEY"),
    {
      auth: { persistSession: false },
    },
  );
}

/**
 * Lightweight public client for use in API route handlers that only
 * need anon-level read access (e.g. revalidation checks).
 */
export function createPublicClient() {
  return createClient<Database>(
    requireEnv("SUPABASE_URL"),
    requireEnv("SUPABASE_ANON_KEY"),
    {
      auth: { persistSession: false },
    },
  );
}

export function isSupabaseConfigured(): boolean {
  return Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_KEY);
}
