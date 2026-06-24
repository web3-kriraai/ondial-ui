"use client";

import {
  ChevronRight,
  Clock3,
  Mail,
  MapPin,
  Phone,
  Sparkles,
  MessageSquare,
} from "lucide-react";
import Link from "next/link";
import { useState, type ElementType, type FormEvent } from "react";
import { Turnstile } from "@marsidev/react-turnstile";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";

import { ONDIAL_ACCENT_STYLE } from "@/components/marketing/split-screen-section";
import { TextReveal } from "@/components/ui/text-reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import CountryPicker, { getConfig } from "@/components/ui/country-picker";
import {
  marketingDottedSectionShellClass,
  marketingEyebrowClass,
  marketingSectionContainerClass,
} from "@/config/marketing-layout";
import {
  CONTACT_CHANNELS,
  CONTACT_FORM,
  CONTACT_HERO,
  CONTACT_SIDE,
  CONTACT_SUBJECTS,
  type ContactChannelId,
} from "@/data/contact-content";
import { cn } from "@/lib/utils";

const channelIcons: Record<ContactChannelId, ElementType> = {
  phone: Phone,
  email: Mail,
  office: MapPin,
  hours: Clock3,
};

const fieldInputClass =
  "w-full min-h-11 rounded-xl border border-black/[0.08] bg-background px-[0.9rem] py-[0.65rem] text-[0.9375rem] leading-[1.4] text-foreground transition-[border-color,box-shadow] duration-200 ease-in-out placeholder:text-muted-foreground focus-visible:border-[hsl(var(--section-accent-h)_var(--section-accent-s)_var(--section-accent-l)/0.35)] focus-visible:shadow-[0_0_0_3px_hsl(var(--section-accent-h)_var(--section-accent-s)_var(--section-accent-l)/0.12)] focus-visible:outline-none";

const selectClass = cn(
  fieldInputClass,
  "appearance-none bg-[linear-gradient(45deg,transparent_50%,var(--muted-foreground)_50%),linear-gradient(135deg,var(--muted-foreground)_50%,transparent_50%)] bg-[position:calc(100%-1.1rem)_calc(50%-0.15rem),calc(100%-0.75rem)_calc(50%-0.15rem)] bg-[size:0.35rem_0.35rem,0.35rem_0.35rem] bg-no-repeat pr-8",
);

function ChannelItem({ channel }: { channel: (typeof CONTACT_CHANNELS)[number] }) {
  const Icon = channelIcons[channel.id];

  const content = (
    <>
      <span
        className="grid size-9 shrink-0 place-items-center rounded-4xl bg-[hsl(var(--section-accent-h)_var(--section-accent-s)_var(--section-accent-l)/0.62)] text-white"
        aria-hidden
      >
        <Icon className="size-4" strokeWidth={1.75} />
      </span>
      <span className="flex min-w-0 flex-1 flex-col gap-[0.1rem]">
        <span className="text-sm font-bold text-foreground">{channel.title}</span>
        {channel.lines?.map((line) => (
          <span key={line} className="text-[0.8125rem] leading-[1.4] text-foreground">
            {line}
          </span>
        ))}
        {channel.detail ? (
          <span className="text-xs leading-[1.4] text-muted-foreground">{channel.detail}</span>
        ) : null}
      </span>
      <ChevronRight
        className="size-4 shrink-0 text-[hsl(var(--section-accent-h)_var(--section-accent-s)_var(--section-accent-l))]"
        aria-hidden
        strokeWidth={2}
      />
    </>
  );

  const channelItemClass =
    "flex items-center gap-3 rounded-[0.875rem] border border-black/[0.06] bg-background p-3 no-underline transition-[border-color,transform,box-shadow] duration-200 ease-in-out hover:-translate-y-px hover:border-[hsl(var(--section-accent-h)_var(--section-accent-s)_var(--section-accent-l)/0.22)] hover:shadow-[0_10px_24px_-18px_rgb(15_23_42/0.16)]";

  if (channel.href) {
    return (
      <a href={channel.href} className={channelItemClass}>
        {content}
      </a>
    );
  }

  return <div className={channelItemClass}>{content}</div>;
}

export function ContactPageSection() {
  const [agreedToPrivacy, setAgreedToPrivacy] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [countryCode, setCountryCode] = useState("+91");

  const clearError = (field: string) => {
    if (errors[field]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[field];
        return copy;
      });
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newErrors: Record<string, string> = {};
    const formData = new FormData(event.currentTarget);
    const name = (formData.get("name") as string || "").trim();
    const email = (formData.get("email") as string || "").trim();
    const phone = (formData.get("phone") as string || "").trim();
    const message = (formData.get("message") as string || "").trim();

    if (!name) {
      newErrors.name = "Full name is required";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      newErrors.email = "Email address is required";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    let cleanPhone = phone.replace(/[\s\-()]/g, '');

    if (!phone) {
      newErrors.phone = "Phone number is required";
    } else {
      const cfg = getConfig(countryCode);
      let digitsOnly = cleanPhone.replace(/\D/g, '');
      const cleanPrefix = countryCode.replace('+', '');

      if (digitsOnly.startsWith(cleanPrefix) && digitsOnly.length > cfg.max) {
        digitsOnly = digitsOnly.slice(cleanPrefix.length);
      } else if (digitsOnly.startsWith('0') && digitsOnly.length > cfg.max) {
        digitsOnly = digitsOnly.slice(1);
      }

      if (digitsOnly.length < cfg.min) {
        newErrors.phone = `${cfg.name} phone numbers should have at least ${cfg.min} digits`;
      } else if (digitsOnly.length > cfg.max) {
        newErrors.phone = `${cfg.name} phone numbers should have maximum ${cfg.max} digits`;
      } else {
        if (countryCode === "+91") {
          const indianMobileRegex = /^[6-9]\d{9}$/;
          if (!indianMobileRegex.test(digitsOnly)) {
            newErrors.phone = "Please enter a valid 10-digit Indian phone number (starts with 6-9)";
          }
        }
      }

      if (!newErrors.phone) {
        cleanPhone = digitsOnly;
      }
    }

    if (!message) {
      newErrors.message = "Message is required";
    }

    if (!turnstileToken) {
      newErrors.turnstile = "Please complete the CAPTCHA verification.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setSubmitError("");

      // Scroll to the first error field
      const firstErrorField = Object.keys(newErrors)[0];
      const elementId = firstErrorField === "turnstile" ? "contact-form" : `contact-${firstErrorField}`;
      const element = document.getElementById(elementId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
        if (firstErrorField !== "turnstile") {
          // Focus the input element
          setTimeout(() => {
            (element as HTMLElement).focus();
          }, 100);
        }
      }
      return;
    }

    setSubmitError("");
    setErrors({});
    setIsSubmitting(true);

    const phoneWithCountryCode = `${countryCode} ${cleanPhone}`.trim();

    const submitData = {
      name,
      email,
      phone: phoneWithCountryCode,
      subject: formData.get("subject"),
      message,
      turnstileToken,
    };

    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://dashboard-test.ondial.ai/api';
      const res = await fetch(`${baseUrl}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submitData),
      });

      const data = await res.json();

      if (!res.ok) {
        setSubmitError(data?.error || "Failed to submit. Please try again.");
      } else {
        setSubmitSuccess(true);
      }
    } catch (err) {
      setSubmitError("Network error. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      className={cn(marketingDottedSectionShellClass, "py-10! pb-20!")}
      style={ONDIAL_ACCENT_STYLE}
      aria-labelledby="contact-title"
    >
      <div className={marketingSectionContainerClass}>
        <header className="mx-auto mb-[clamp(1.75rem,4vw,2.5rem)] max-w-176 text-center">
          <p className={cn(marketingEyebrowClass, "mb-4 inline-flex items-center gap-[0.4rem]")}>
            <Sparkles
              className="size-3.5 text-[hsl(var(--section-accent-h)_var(--section-accent-s)_var(--section-accent-l))]"
              aria-hidden
              strokeWidth={1.75}
            />
            {CONTACT_HERO.eyebrow}
          </p>
          <h1
            id="contact-title"
            className="m-0 text-balance text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem]"
          >
            <TextReveal as="span" delay={0.05} stagger={0.07} inViewAmount={0.45}>
              {CONTACT_HERO.titleAccent}
            </TextReveal>
            <TextReveal
              as="span"
              className={cn(
                "block text-[hsl(var(--section-accent-h)_var(--section-accent-s)_var(--section-accent-l))]",
              )}
              delay={0.12}
              stagger={0.07}
              inViewAmount={0.45}
            >
              {CONTACT_HERO.title}
            </TextReveal>
          </h1>
          <TextReveal
            as="p"
            className="mx-auto mt-4 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg"
            delay={0.16}
            stagger={0.028}
            inViewAmount={0.4}
          >
            {CONTACT_HERO.description}
          </TextReveal>
        </header>

        <div className="relative rounded-3xl">
          <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl" aria-hidden>
            <div className="absolute inset-[-30%_auto_auto_50%] h-[min(24rem,70%)] w-[min(36rem,90%)] -translate-x-1/2 rounded-full" />
          </div>

          <div className="relative z-1 grid items-start gap-[clamp(1.5rem,4vw,2.25rem)] lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] lg:gap-[clamp(2rem,4vw,2.75rem)]">
            <div className="rounded-[1.125rem] border border-black/[0.07] bg-[rgb(15_23_42/0.015)] p-[clamp(1.15rem,3vw,1.5rem)]">
              <header className="mb-5">
                <h2 className="mb-[0.4rem] text-[clamp(1.25rem,2.8vw,1.5rem)] font-bold leading-tight tracking-[-0.02em] text-foreground">
                  {CONTACT_FORM.title}
                </h2>
                <p className="m-0 text-[0.9375rem] leading-[1.55] text-muted-foreground">
                  {CONTACT_FORM.description}
                </p>
              </header>

              {submitSuccess ? (
                <div className="flex flex-col items-center justify-center p-8 text-center bg-[hsl(var(--section-accent-h)_var(--section-accent-s)_var(--section-accent-l)/0.05)] rounded-2xl border border-[hsl(var(--section-accent-h)_var(--section-accent-s)_var(--section-accent-l)/0.2)]">
                  <CheckCircle2 className="size-12 text-green-500 mb-4" />
                  <h3 className="text-xl font-bold text-foreground mb-2">Message Sent!</h3>
                  <p className="text-muted-foreground">Thank you for contacting us. Our team will get back to you shortly.</p>
                </div>
              ) : (
                <form id="contact-form" className="flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="flex flex-col gap-[0.45rem]">
                      <Label htmlFor="contact-name" className="text-[0.8125rem] font-bold text-foreground">
                        {CONTACT_FORM.fields.name.label}
                        <span className="text-red-500" aria-hidden>
                          *
                        </span>
                      </Label>
                      <Input
                        id="contact-name"
                        name="name"
                        type="text"
                        required
                        autoComplete="name"
                        placeholder={CONTACT_FORM.fields.name.placeholder}
                        className={cn(
                          fieldInputClass,
                          errors.name && "border-red-500! focus-visible:border-red-500! focus-visible:shadow-[0_0_0_3px_rgba(239,68,68,0.15)]"
                        )}
                        onChange={() => clearError("name")}
                      />
                      {errors.name && <span className="text-xs text-red-500 mt-1">{errors.name}</span>}
                    </div>
                    <div className="flex flex-col gap-[0.45rem]">
                      <Label htmlFor="contact-email" className="text-[0.8125rem] font-bold text-foreground">
                        {CONTACT_FORM.fields.email.label}
                        <span className="text-red-500" aria-hidden>
                          *
                        </span>
                      </Label>
                      <Input
                        id="contact-email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        placeholder={CONTACT_FORM.fields.email.placeholder}
                        className={cn(
                          fieldInputClass,
                          errors.email && "border-red-500! focus-visible:border-red-500! focus-visible:shadow-[0_0_0_3px_rgba(239,68,68,0.15)]"
                        )}
                        onChange={() => clearError("email")}
                      />
                      {errors.email && <span className="text-xs text-red-500 mt-1">{errors.email}</span>}
                    </div>
                  </div>

                  <div className="flex flex-col gap-[0.45rem]">
                    <Label htmlFor="contact-phone" className="text-[0.8125rem] font-bold text-foreground">
                      {CONTACT_FORM.fields.phone.label}
                      <span className="text-red-500" aria-hidden>
                        *
                      </span>
                    </Label>
                    <div className={cn(
                      "flex items-stretch rounded-xl border border-black/8 bg-background relative",
                      errors.phone && "border-red-500! focus-within:border-red-500! focus-within:ring-[3px] focus-within:ring-red-500/15"
                    )}>
                      <CountryPicker
                        value={countryCode}
                        onChange={(code) => {
                          setCountryCode(code);
                          clearError("phone");
                        }}
                      />
                      <Input
                        id="contact-phone"
                        name="phone"
                        type="tel"
                        required
                        autoComplete="tel"
                        placeholder={`e.g. ${'9'.repeat(getConfig(countryCode).max)}`}
                        className={cn(
                          fieldInputClass,
                          "rounded-r-xl! rounded-l-none! border-none! shadow-none! focus-visible:shadow-none!",
                        )}
                        onChange={() => clearError("phone")}
                      />
                    </div>
                    {errors.phone && <span className="text-xs text-red-500 mt-1">{errors.phone}</span>}
                  </div>

                  <div className="flex flex-col gap-[0.45rem]">
                    <Label htmlFor="contact-subject" className="text-[0.8125rem] font-bold text-foreground">
                      {CONTACT_FORM.fields.subject.label}
                      <span className="text-red-500" aria-hidden>
                        *
                      </span>
                    </Label>
                    <select
                      id="contact-subject"
                      name="subject"
                      required
                      defaultValue={CONTACT_SUBJECTS[0]?.id}
                      className={selectClass}
                    >
                      {CONTACT_SUBJECTS.map((subject) => (
                        <option key={subject.id} value={subject.id}>
                          {subject.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-col gap-[0.45rem]">
                    <Label htmlFor="contact-message" className="text-[0.8125rem] font-bold text-foreground">
                      {CONTACT_FORM.fields.message.label}
                      <span className="text-red-500" aria-hidden>
                        *
                      </span>
                    </Label>
                    <textarea
                      id="contact-message"
                      name="message"
                      required
                      rows={5}
                      placeholder={CONTACT_FORM.fields.message.placeholder}
                      className={cn(
                        fieldInputClass,
                        "min-h-34 resize-y",
                        errors.message && "border-red-500! focus-visible:border-red-500! focus-visible:shadow-[0_0_0_3px_rgba(239,68,68,0.15)]"
                      )}
                      onChange={() => clearError("message")}
                    />
                    {errors.message && <span className="text-xs text-red-500 mt-1">{errors.message}</span>}
                  </div>

                  <div className="flex flex-col gap-3">
                    {submitError && (
                      <div className="flex items-center gap-2 p-3 text-sm text-red-600 bg-red-50 rounded-lg border border-red-100">
                        <AlertCircle className="size-4 shrink-0" />
                        <p className="m-0">{submitError}</p>
                      </div>
                    )}

                    <div className="min-h-[65px] flex flex-col gap-1">
                      <div className="w-[302px] h-[67px] overflow-hidden rounded-xl border border-black/8 bg-background">
                        <Turnstile
                          siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '1x00000000000000000000AA'}
                          onSuccess={(token) => {
                            setTurnstileToken(token);
                            clearError("turnstile");
                          }}
                          onError={() => setSubmitError("CAPTCHA verification failed.")}
                          options={{
                            theme: "light",
                          }}
                        />
                      </div>
                      {errors.turnstile && <span className="text-xs text-red-500 mt-1 block">{errors.turnstile}</span>}
                    </div>

                    <div className="mt-[0.35rem] flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-5">
                      <label className="flex cursor-pointer items-start gap-[0.55rem] text-[0.8125rem] leading-[1.45] text-muted-foreground">
                        <input
                          type="checkbox"
                          checked={agreedToPrivacy}
                          onChange={(event) => setAgreedToPrivacy(event.target.checked)}
                          className="mt-[0.1rem] size-4 shrink-0 accent-[hsl(var(--section-accent-h)_var(--section-accent-s)_var(--section-accent-l))]"
                        />
                        <span>
                          {CONTACT_FORM.privacyLabel}{" "}
                          <Link
                            href="/privacy"
                            className="text-[hsl(var(--section-accent-h)_var(--section-accent-s)_calc(var(--section-accent-l)-12%))] underline underline-offset-2"
                          >
                            privacy policy
                          </Link>
                        </span>
                      </label>
                      <Button
                        type="submit"
                        size="lg"
                        disabled={!agreedToPrivacy || isSubmitting}
                        className="h-11! w-full rounded-xl! bg-[hsl(var(--section-accent-h)_var(--section-accent-s)_var(--section-accent-l))]! font-semibold! text-white hover:bg-[hsl(var(--section-accent-h)_var(--section-accent-s)_calc(var(--section-accent-l)-6%))]! sm:w-auto sm:min-w-42"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 size-4 animate-spin" />
                            Submitting...
                          </>
                        ) : (
                          CONTACT_FORM.submitLabel
                        )}
                      </Button>
                    </div>
                  </div>
                </form>
              )}
            </div>

            <aside className="sticky top-6 flex flex-col gap-[1.15rem] self-start lg:top-18">
              <header className="flex flex-col gap-[0.6rem]">
                <h2 className="m-0 text-[clamp(1.25rem,2.8vw,1.625rem)] font-bold leading-[1.3] tracking-[-0.02em] text-foreground">
                  {CONTACT_SIDE.asideTitle}
                </h2>
                <p className="m-0 text-[0.9375rem] leading-[1.65] text-muted-foreground">
                  {CONTACT_SIDE.asideDescription}
                </p>
              </header>

              <div className="rounded-2xl border border-black/[0.07] bg-[rgb(15_23_42/0.015)] p-4">
                <div className="mb-[0.85rem] flex items-start gap-3">
                  <span
                    className="grid size-10 shrink-0 place-items-center rounded-xl bg-[hsl(var(--section-accent-h)_var(--section-accent-s)_var(--section-accent-l)/0.12)] text-[hsl(var(--section-accent-h)_var(--section-accent-s)_calc(var(--section-accent-l)-12%))]"
                    aria-hidden
                  >
                    <MessageSquare className="size-4.5" strokeWidth={1.75} />
                  </span>
                  <div>
                    <h3 className="mb-[0.15rem] text-base font-bold text-foreground">{CONTACT_SIDE.title}</h3>
                    <p className="m-0 text-[0.8125rem] leading-[1.45] text-muted-foreground">
                      {CONTACT_SIDE.description}
                    </p>
                  </div>
                </div>

                <ul className="m-0 flex list-none flex-col gap-[0.65rem] p-0">
                  {CONTACT_CHANNELS.map((channel) => (
                    <li key={channel.id}>
                      <ChannelItem channel={channel} />
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}
