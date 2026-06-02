"use client";

import { ArrowRight } from "lucide-react";
import { useState, type FormEvent } from "react";

import { FOOTER_NEWSLETTER } from "@/config/footer";
import { cn } from "@/lib/utils";

type FooterNewsletterFormProps = {
  className?: string;
};

export function FooterNewsletterForm({ className }: FooterNewsletterFormProps) {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <p className={cn("text-sm text-muted-foreground", className)} role="status">
        Thanks—you&apos;re on the list. We&apos;ll be in touch soon.
      </p>
    );
  }

  return (
    <form className={cn("relative", className)} onSubmit={handleSubmit}>
      <label htmlFor="footer-newsletter-email" className="sr-only">
        Email for newsletter
      </label>
      <input
        id="footer-newsletter-email"
        name="email"
        type="email"
        required
        autoComplete="email"
        placeholder={FOOTER_NEWSLETTER.placeholder}
        className={cn(
          "h-11 w-full rounded-full border border-border/80 bg-background pr-12 pl-4 text-sm text-foreground shadow-sm outline-none",
          "placeholder:text-muted-foreground/70 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/40",
        )}
      />
      <button
        type="submit"
        className={cn(
          "absolute top-1/2 right-1 flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-foreground text-background",
          "transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        )}
        aria-label={FOOTER_NEWSLETTER.buttonLabel}
      >
        <ArrowRight className="size-4" aria-hidden />
      </button>
    </form>
  );
}
