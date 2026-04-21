"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, User, Building2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { validateSignupEmail } from "@/lib/auth-form-validation";
import { cn } from "@/lib/utils";

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

/** Match `src/app/login/page.tsx` input styling for auth consistency. */
const inputBase =
  "h-9 rounded-full border border-border/70 bg-muted/40 px-3 text-[13px] leading-normal shadow-none transition-[border-color,background-color,box-shadow] duration-200 " +
  "placeholder:text-[13px] placeholder:text-muted-foreground/55 " +
  "hover:border-border hover:bg-muted/55 " +
  "focus-visible:border-foreground/25 focus-visible:bg-background focus-visible:ring-1 focus-visible:ring-foreground/15";

function inputClass(invalid: boolean) {
  return cn(
    inputBase,
    invalid && "border-destructive/80 focus-visible:border-destructive/50 focus-visible:ring-destructive/25"
  );
}

export function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [userType, setUserType] = useState<"individual" | "organization">("individual");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone: "",
    referral: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);

  const validateField = (name: string, value: string) => {
    let error = "";
    switch (name) {
      case "fullname":
        if (!value.trim()) error = "Full name is required";
        else if (value.trim().length < 2) error = "Name must be at least 2 characters";
        break;
      case "email": {
        const e = validateSignupEmail(value);
        error = e ?? "";
        break;
      }
      case "phone":
        if (!value.trim()) error = "Phone number is required";
        else if (!/^\+?[\d\s-]{10,}$/.test(value)) error = "Please enter a valid phone number (min 10 digits)";
        break;
      case "password":
        if (!value) error = "Password is required";
        else if (value.length < 8) error = "Password must be at least 8 characters";
        break;
      case "confirmPassword":
        if (!value) error = "Please confirm your password";
        else if (value !== formData.password) error = "Passwords do not match";
        break;
    }
    return error;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    setFormError(null);

    setErrors((prev) => {
      const next = { ...prev };
      delete next[id];
      if (id === "password" && next.confirmPassword) delete next.confirmPassword;
      return next;
    });
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    const error = validateField(id, value);
    setErrors((prev) => {
      const next = { ...prev };
      if (error) next[id] = error;
      else delete next[id];
      return next;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors: Record<string, string> = {};
    Object.keys(formData).forEach((key) => {
      if (key === "referral") return; // Skip optional field
      const error = validateField(key, formData[key as keyof typeof formData]);
      if (error) newErrors[key] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setFormError("Please fix the highlighted fields before continuing.");
      const firstErrorField = Object.keys(newErrors)[0];
      document.getElementById(firstErrorField)?.focus();
      return;
    }

    setFormError(null);
    setIsSubmitting(true);
    // Simulate API call
    try {
      console.log("Form submitted successfully:", { ...formData, userType });
      // Here you would typically handle the actual signup logic
      await new Promise(resolve => setTimeout(resolve, 1500));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-[min(28rem,calc(100vw-1.5rem))] origin-top sm:max-w-[min(36rem,calc(100vw-2rem))] animate-in fade-in slide-in-from-bottom-2 duration-500">
      <h1
        className="mb-0.5 text-center text-[1.35rem] font-bold leading-tight tracking-tight text-foreground sm:text-[1.65rem]"
        style={{ fontFamily: "var(--font-display)" }}
      >
        Create account
      </h1>
      <p className="mb-2 text-center text-[11px] leading-snug text-muted-foreground/90 sm:mb-2.5 sm:text-[12px]">
        Join us and start your journey today.
      </p>

      <form className="flex flex-col gap-1.5 sm:gap-2" onSubmit={handleSubmit} noValidate>
        {formError ? (
          <div
            role="alert"
            className="rounded-xl border border-destructive/25 bg-destructive/10 px-3 py-2 text-center text-[12px] font-medium text-destructive"
          >
            {formError}
          </div>
        ) : null}
        {/* Who are you? selector */}
        <div className="grid gap-1">
          <Label className="text-[12px] font-semibold leading-none text-foreground">
            Who are you?
          </Label>
          <div className="flex touch-manipulation rounded-full border border-border/40 bg-muted/40 p-0.5">
            <button
              type="button"
              onClick={() => setUserType("individual")}
              className={`flex min-h-9 flex-1 items-center justify-center gap-1.5 rounded-full py-2 text-[12px] font-medium transition-all duration-200 ${
                userType === "individual"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <User className="size-4" />
              Individual
            </button>
            <button
              type="button"
              onClick={() => setUserType("organization")}
              className={`flex min-h-9 flex-1 items-center justify-center gap-1.5 rounded-full py-2 text-[12px] font-medium transition-all duration-200 ${
                userType === "organization"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Building2 className="size-4" />
              Organization
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2 sm:gap-2">
          <div className="grid gap-1">
            <Label htmlFor="fullname" className={`text-[12px] font-semibold leading-none transition-colors ${errors.fullname ? "text-destructive" : "text-foreground"}`}>
              Full name
            </Label>
            <Input
              id="fullname"
              placeholder="John Doe"
              className={inputClass(!!errors.fullname)}
              value={formData.fullname}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={!!errors.fullname}
              aria-describedby={errors.fullname ? "fullname-error" : undefined}
            />
            {errors.fullname ? (
              <p id="fullname-error" role="status" className="text-[11px] font-medium text-destructive animate-in fade-in slide-in-from-top-1 duration-200">
                {errors.fullname}
              </p>
            ) : null}
          </div>

          <div className="grid gap-1">
            <Label htmlFor="email" className={`text-[12px] font-semibold leading-none transition-colors ${errors.email ? "text-destructive" : "text-foreground"}`}>
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              className={inputClass(!!errors.email)}
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
            />
            {errors.email ? (
              <p id="email-error" role="status" className="text-[11px] font-medium text-destructive animate-in fade-in slide-in-from-top-1 duration-200">
                {errors.email}
              </p>
            ) : null}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2 sm:gap-2">
          <div className="grid gap-1">
            <Label htmlFor="phone" className={`text-[12px] font-semibold leading-none transition-colors ${errors.phone ? "text-destructive" : "text-foreground"}`}>
              Phone number
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+1 (555) 000-0000"
              className={inputClass(!!errors.phone)}
              value={formData.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? "phone-error" : undefined}
            />
            {errors.phone ? (
              <p id="phone-error" role="status" className="text-[11px] font-medium text-destructive animate-in fade-in slide-in-from-top-1 duration-200">
                {errors.phone}
              </p>
            ) : null}
          </div>

          <div className="grid gap-1">
            <Label htmlFor="referral" className="text-[12px] font-semibold leading-none text-foreground">
              Referral code <span className="text-muted-foreground/60 font-normal">(optional)</span>
            </Label>
            <Input
              id="referral"
              placeholder="ABC-123"
              className={inputClass(false)}
              value={formData.referral}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="grid gap-1">
          <Label htmlFor="password" className={`text-[12px] font-semibold leading-none transition-colors ${errors.password ? "text-destructive" : "text-foreground"}`}>
            Password
          </Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Create a password"
              className={cn(inputClass(!!errors.password), "pr-10")}
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={!!errors.password}
              aria-describedby={errors.password ? "password-error" : undefined}
            />
            <button
              type="button"
              onClick={() => setShowPassword((p) => !p)}
              className="absolute right-1 top-1/2 flex size-9 min-h-9 min-w-9 -translate-y-1/2 touch-manipulation items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-foreground"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="size-4" strokeWidth={1.75} /> : <Eye className="size-4" strokeWidth={1.75} />}
            </button>
          </div>
          {errors.password ? (
            <p id="password-error" role="status" className="text-[11px] font-medium text-destructive animate-in fade-in slide-in-from-top-1 duration-200">
              {errors.password}
            </p>
          ) : null}
        </div>

        <div className="grid gap-1">
          <Label htmlFor="confirmPassword" className={`text-[12px] font-semibold leading-none transition-colors ${errors.confirmPassword ? "text-destructive" : "text-foreground"}`}>
            Confirm password
          </Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your password"
              className={cn(inputClass(!!errors.confirmPassword), "pr-10")}
              value={formData.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={!!errors.confirmPassword}
              aria-describedby={errors.confirmPassword ? "confirmPassword-error" : undefined}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((p) => !p)}
              className="absolute right-1 top-1/2 flex size-9 min-h-9 min-w-9 -translate-y-1/2 touch-manipulation items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-foreground"
              aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
            >
              {showConfirmPassword ? <EyeOff className="size-4" strokeWidth={1.75} /> : <Eye className="size-4" strokeWidth={1.75} />}
            </button>
          </div>
          {errors.confirmPassword ? (
            <p id="confirmPassword-error" role="status" className="text-[11px] font-medium text-destructive animate-in fade-in slide-in-from-top-1 duration-200">
              {errors.confirmPassword}
            </p>
          ) : null}
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="mt-0 h-9 w-full rounded-full bg-foreground text-[13px] font-semibold text-background shadow-none transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? "Creating account..." : "Create account"}
        </Button>

        <div className="relative py-0">
          <div className="absolute inset-x-0 top-1/2 h-px bg-border/80" />
          <div className="relative flex justify-center text-[11px] uppercase tracking-wider text-muted-foreground/70">
            <span className="bg-background px-2 font-medium">Or continue with</span>
          </div>
        </div>

        <Button
          type="button"
          variant="outline"
          className="h-9 w-full rounded-full border-border/80 bg-background text-[13px] font-medium shadow-none transition-colors hover:bg-muted/20"
        >
          <GoogleIcon className="mr-2 size-4" />
          Continue with Google
        </Button>
      </form>

      <p className="mt-3 text-center text-[11px] leading-relaxed text-muted-foreground sm:mt-4 sm:text-[12px]">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-foreground underline-offset-2 hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}

