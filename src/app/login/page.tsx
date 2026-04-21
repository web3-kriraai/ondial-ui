"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

function GoogleIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-1 .67-2.28 1.07-3.71 1.07-2.85 0-5.27-1.92-6.13-4.51H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.87 14.13c-.22-.67-.35-1.39-.35-2.13s.13-1.46.35-2.13V7.03H2.18C1.43 8.52 1 10.21 1 12s.43 3.48 1.18 4.97l3.69-2.84z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.03l3.69 2.84c.86-2.59 3.28-4.51 6.13-4.51z" fill="#EA4335" />
    </svg>
  );
}

const inputClass =
  "h-10 rounded-full border border-border/70 bg-muted/40 px-3.5 text-[14px] leading-normal shadow-none transition-[border-color,background-color,box-shadow] duration-200 " +
  "placeholder:text-[14px] placeholder:text-muted-foreground/55 " +
  "hover:border-border hover:bg-muted/55 " +
  "focus-visible:border-foreground/25 focus-visible:bg-background focus-visible:ring-1 focus-visible:ring-foreground/15";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);

  return (
    <div className="flex min-h-0 flex-1 flex-col items-center justify-center bg-muted/25 px-4 pb-10 pt-20 sm:pt-38 sm:px-6">
      <div className="w-full max-w-[380px] animate-in fade-in slide-in-from-bottom-2 duration-500">
        <h1
          className="mb-1 text-center text-[28px] font-bold leading-tight tracking-tight text-foreground"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Welcome back
        </h1>
        <p className="mb-4 text-center text-[13px] leading-snug text-muted-foreground/90">
          Enter your email and password to access your account.
        </p>

        <form className="flex flex-col gap-3.5" onSubmit={(e) => e.preventDefault()}>
          <div className="grid gap-1.5">
            <Label htmlFor="email" className="text-[13px] font-semibold leading-none text-foreground">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              autoComplete="email"
              className={inputClass}
            />
          </div>

          <div className="grid gap-1.5">
            <Label htmlFor="password" className="text-[13px] font-semibold leading-none text-foreground">
              Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                autoComplete="current-password"
                className={`${inputClass} pr-11`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((p) => !p)}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted-foreground transition-colors hover:text-foreground"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="size-4" strokeWidth={1.75} /> : <Eye className="size-4" strokeWidth={1.75} />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between gap-2 pt-0">
            <div className="flex items-center gap-2">
              <Checkbox
                id="remember"
                checked={remember}
                onCheckedChange={(v) => setRemember(!!v)}
                className="size-3.5 rounded border-border/80 data-[state=checked]:bg-foreground data-[state=checked]:text-background"
              />
              <Label htmlFor="remember" className="cursor-pointer text-[12px] font-normal leading-none text-muted-foreground">
                Remember me
              </Label>
            </div>
            <button
              type="button"
              className="shrink-0 text-[12px] text-muted-foreground underline-offset-2 transition-colors hover:text-foreground hover:underline"
            >
              Forgot password
            </button>
          </div>

          <Button
            type="submit"
            className="h-10 w-full rounded-full bg-foreground text-[14px] font-semibold text-background shadow-none transition-opacity hover:opacity-90"
          >
            Sign in
          </Button>

          <div className="relative py-0">
            <div className="absolute inset-x-0 top-1/2 h-px bg-border/80" />
          </div>

          <Button
            type="button"
            variant="outline"
            className="h-10 w-full rounded-full border-border/80 bg-background text-[14px] font-medium shadow-none transition-colors hover:bg-muted/20"
          >
            <GoogleIcon className="mr-2 size-4" />
            Sign in with Google
          </Button>
        </form>

        <p className="mt-6 text-center text-[12px] leading-relaxed text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="font-semibold text-foreground underline-offset-2 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
