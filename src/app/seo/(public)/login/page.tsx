"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2, Lock } from "lucide-react";

import { SEO_POSTS_PATH } from "@/config/seo-admin";
import { SEO_FETCH_INIT } from "@/lib/admin/seo-fetch";
import { cn } from "@/lib/utils";

export default function SeoLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [focused, setFocused] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    let redirecting = false;

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        ...SEO_FETCH_INIT,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        redirecting = true;
        router.push(SEO_POSTS_PATH);
        router.refresh();
        return;
      }

      setError("Incorrect password. Please try again.");
      setPassword("");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      if (!redirecting) setLoading(false);
    }
  }

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#f4f4f5] px-4 py-10">
      {/* Ambient brand glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/3 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#534AB7]/[0.07] blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(#534AB7 1px, transparent 1px), linear-gradient(90deg, #534AB7 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
        aria-hidden
      />

      <div className="relative w-full max-w-[26rem]">
        <div className="relative overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-[0_20px_50px_-12px_rgba(83,74,183,0.18),0_8px_24px_-8px_rgba(0,0,0,0.12)]">
          {loading && (
            <div
              className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-3 rounded-2xl bg-white/95 backdrop-blur-[3px]"
              role="status"
              aria-live="polite"
              aria-label="Signing in"
            >
              <div className="relative flex size-16 items-center justify-center">
                <div
                  className="absolute inset-0 animate-spin rounded-full border-[3px] border-[#534AB7]/15 border-t-[#534AB7]"
                  aria-hidden
                />
                <Image
                  src="/img/logo/fav.svg"
                  alt=""
                  width={32}
                  height={32}
                  className="relative size-8"
                />
              </div>
              <div className="text-center">
                <p className="text-sm font-semibold text-gray-900">Signing you in…</p>
                <p className="mt-0.5 text-xs text-gray-500">Verifying your password</p>
              </div>
            </div>
          )}
          {/* Brand */}
          <div className="flex flex-col items-center border-b border-gray-100 bg-gradient-to-b from-white to-gray-50/80 px-8 pb-7 pt-9">
            <Image
              src="/img/logo/OnDial.svg"
              alt="OnDial"
              width={148}
              height={40}
              priority
              className="h-9 w-auto"
            />
            <p className="mt-4 text-center text-sm font-medium text-gray-900">SEO &amp; Blog</p>
            <p className="mt-1 text-center text-xs text-gray-500">Manage posts, authors, and content</p>
          </div>

          {/* Form */}
          <div className="px-8 py-7">
            <h1 className="text-base font-semibold text-gray-900">Sign in</h1>
            <p className="mt-1 text-sm leading-relaxed text-gray-500">
              Enter your password to access the SEO editor.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-5" aria-busy={loading}>
              <div className="flex flex-col gap-2">
                <label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Password
                </label>
                <div
                  className={cn(
                    "relative flex items-center rounded-xl border bg-white transition-all duration-200",
                    error
                      ? "border-red-300 ring-2 ring-red-500/10"
                      : focused
                        ? "border-[#534AB7] ring-2 ring-[#534AB7]/15 shadow-[0_0_0_4px_rgba(83,74,183,0.06)]"
                        : "border-gray-200 hover:border-gray-300",
                  )}
                >
                  <Lock
                    className={cn(
                      "pointer-events-none absolute left-3.5 size-4 shrink-0 transition-colors",
                      focused ? "text-[#534AB7]" : "text-gray-400",
                    )}
                    aria-hidden
                  />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (error) setError("");
                    }}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    autoFocus
                    disabled={loading}
                    className="h-11 w-full min-w-0 bg-transparent py-2.5 pl-10 pr-11 text-sm text-gray-900 outline-none placeholder:text-gray-400 disabled:cursor-not-allowed disabled:opacity-60"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    disabled={loading}
                    className="absolute right-2 flex size-8 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 disabled:pointer-events-none disabled:opacity-40"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                </div>
              </div>

              {error && (
                <p
                  role="alert"
                  className="rounded-xl border border-red-200 bg-red-50 px-3.5 py-2.5 text-sm text-red-700"
                >
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading || !password.trim()}
                aria-busy={loading}
                className="relative flex h-11 items-center justify-center gap-2 rounded-xl bg-[#534AB7] text-sm font-semibold text-white shadow-[0_4px_14px_rgba(83,74,183,0.35)] transition-all hover:bg-[#4338ca] hover:shadow-[0_6px_18px_rgba(83,74,183,0.4)] disabled:cursor-not-allowed disabled:opacity-70 disabled:shadow-none"
              >
                {loading ? (
                  <>
                    <Loader2 className="size-4 animate-spin" aria-hidden />
                    <span>Signing in…</span>
                  </>
                ) : (
                  "Continue"
                )}
              </button>
            </form>
          </div>
        </div>

        <p className="mt-5 text-center text-xs text-gray-400">
          Protected area · Authorized team members only
        </p>
      </div>
    </div>
  );
}
