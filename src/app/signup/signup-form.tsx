"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, User, Building2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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

  const validateField = (name: string, value: string) => {
    let error = "";
    switch (name) {
      case "fullname":
        if (!value.trim()) error = "Full name is required";
        else if (value.trim().length < 2) error = "Name must be at least 2 characters";
        break;
      case "email":
        if (!value.trim()) error = "Email address is required";
        else if (!/\S+@\S+\.\S+/.test(value)) error = "Please enter a valid email address";
        break;
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
    
    // Clear error when user starts typing
    if (errors[id]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[id];
        return newErrors;
      });
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    const error = validateField(id, value);
    if (error) {
      setErrors((prev) => ({ ...prev, [id]: error }));
    }
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
      // Scroll to first error for better UX
      const firstErrorField = Object.keys(newErrors)[0];
      document.getElementById(firstErrorField)?.focus();
      return;
    }

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
    <div className="w-full max-w-[420px] animate-in fade-in slide-in-from-bottom-2 duration-500">
      <h1
        className="mb-1 text-center text-[28px] font-bold leading-tight tracking-tight text-foreground"
        style={{ fontFamily: "var(--font-display)" }}
      >
        Create account
      </h1>
      <p className="mb-4 text-center text-[13px] leading-snug text-muted-foreground/90">
        Join us and start your journey today.
      </p>

      <form className="flex flex-col gap-3" onSubmit={handleSubmit} noValidate>
        {/* Who are you? selector */}
        <div className="grid gap-1.5">
          <Label className="text-[13px] font-semibold leading-none text-foreground">
            Who are you?
          </Label>
          <div className="flex p-1 bg-muted/40 rounded-full border border-border/40">
            <button
              type="button"
              onClick={() => setUserType("individual")}
              className={`flex-1 flex items-center justify-center gap-2 py-1 rounded-full text-[12px] font-medium transition-all duration-200 ${
                userType === "individual"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <User className="size-3.5" />
              Individual
            </button>
            <button
              type="button"
              onClick={() => setUserType("organization")}
              className={`flex-1 flex items-center justify-center gap-2 py-1 rounded-full text-[12px] font-medium transition-all duration-200 ${
                userType === "organization"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Building2 className="size-3.5" />
              Organization
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="grid gap-1.5">
            <Label htmlFor="fullname" className={`text-[13px] font-semibold leading-none transition-colors ${errors.fullname ? "text-destructive" : "text-foreground"}`}>
              Full name
            </Label>
            <Input
              id="fullname"
              placeholder="John Doe"
              className={inputClass}
              value={formData.fullname}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={!!errors.fullname}
            />
            {errors.fullname && (
              <p className="text-[11px] font-medium text-destructive animate-in fade-in slide-in-from-top-1 duration-200">
                {errors.fullname}
              </p>
            )}
          </div>

          <div className="grid gap-1.5">
            <Label htmlFor="email" className={`text-[13px] font-semibold leading-none transition-colors ${errors.email ? "text-destructive" : "text-foreground"}`}>
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              className={inputClass}
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={!!errors.email}
            />
            {errors.email && (
              <p className="text-[11px] font-medium text-destructive animate-in fade-in slide-in-from-top-1 duration-200">
                {errors.email}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="grid gap-1.5">
            <Label htmlFor="phone" className={`text-[13px] font-semibold leading-none transition-colors ${errors.phone ? "text-destructive" : "text-foreground"}`}>
              Phone number
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+1 (555) 000-0000"
              className={inputClass}
              value={formData.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={!!errors.phone}
            />
            {errors.phone && (
              <p className="text-[11px] font-medium text-destructive animate-in fade-in slide-in-from-top-1 duration-200">
                {errors.phone}
              </p>
            )}
          </div>

          <div className="grid gap-1.5">
            <Label htmlFor="referral" className="text-[13px] font-semibold leading-none text-foreground">
              Referral code <span className="text-muted-foreground/60 font-normal">(optional)</span>
            </Label>
            <Input
              id="referral"
              placeholder="ABC-123"
              className={inputClass}
              value={formData.referral}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="grid gap-1.5">
          <Label htmlFor="password" className={`text-[13px] font-semibold leading-none transition-colors ${errors.password ? "text-destructive" : "text-foreground"}`}>
            Password
          </Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Create a password"
              className={`${inputClass} pr-11`}
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={!!errors.password}
            />
            <button
              type="button"
              onClick={() => setShowPassword((p) => !p)}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted-foreground transition-colors hover:text-foreground"
            >
              {showPassword ? <EyeOff className="size-4" strokeWidth={1.75} /> : <Eye className="size-4" strokeWidth={1.75} />}
            </button>
          </div>
          {errors.password && (
            <p className="text-[11px] font-medium text-destructive animate-in fade-in slide-in-from-top-1 duration-200">
              {errors.password}
            </p>
          )}
        </div>

        <div className="grid gap-1.5">
          <Label htmlFor="confirmPassword" className={`text-[13px] font-semibold leading-none transition-colors ${errors.confirmPassword ? "text-destructive" : "text-foreground"}`}>
            Confirm password
          </Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your password"
              className={`${inputClass} pr-11`}
              value={formData.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={!!errors.confirmPassword}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((p) => !p)}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted-foreground transition-colors hover:text-foreground"
            >
              {showConfirmPassword ? <EyeOff className="size-4" strokeWidth={1.75} /> : <Eye className="size-4" strokeWidth={1.75} />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-[11px] font-medium text-destructive animate-in fade-in slide-in-from-top-1 duration-200">
              {errors.confirmPassword}
            </p>
          )}
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="mt-0.5 h-10 w-full rounded-full bg-foreground text-[14px] font-semibold text-background shadow-none transition-all hover:opacity-90 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Creating account..." : "Create account"}
        </Button>

        <div className="relative py-0">
          <div className="absolute inset-x-0 top-1/2 h-px bg-border/70" />
          <div className="relative flex justify-center text-[10px] uppercase tracking-wider">
            <span className="bg-[#fcfcff] px-3 font-medium text-muted-foreground/60">Or continue with</span>
          </div>
        </div>

        <Button
          type="button"
          variant="outline"
          className="h-10 w-full rounded-full border-border/80 bg-background text-[14px] font-medium shadow-none transition-colors hover:bg-muted/20"
        >
          <GoogleIcon className="mr-2 size-3.5" />
          Continue with Google
        </Button>
      </form>

      <p className="mt-5 text-center text-[12px] leading-relaxed text-muted-foreground">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-foreground underline-offset-2 hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}

