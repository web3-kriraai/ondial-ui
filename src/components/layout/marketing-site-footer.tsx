import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { FooterNewsletterForm } from "@/components/layout/footer-newsletter-form";
import {
  FOOTER_BRAND_TAGLINE,
  FOOTER_COMPANY_LINKS,
  FOOTER_CTA,
  FOOTER_LEGAL_LINKS,
  FOOTER_NEWSLETTER,
  FOOTER_SOCIAL_LINKS,
  type FooterNavLink,
} from "@/config/footer";
import { APP_NAME } from "@/lib/constants";
import { cn } from "@/lib/utils";

const columnLinkClass =
  "inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground";

function FooterNavColumn({
  title,
  links,
  ariaLabel,
}: {
  title: string;
  links: readonly FooterNavLink[];
  ariaLabel: string;
}) {
  return (
    <nav aria-label={ariaLabel}>
      <p className="mb-4 text-sm font-semibold text-foreground">{title}</p>
      <ul className="flex flex-col gap-2.5">
        {links.map((item) => (
          <li key={item.href}>
            {item.external ? (
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={columnLinkClass}
              >
                {item.label}
                <ArrowUpRight className="size-3.5 shrink-0 opacity-70" aria-hidden />
              </a>
            ) : (
              <Link href={item.href} prefetch className={columnLinkClass}>
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}

function FooterCtaVisual() {
  const orbitAvatars = [
    "bg-violet-200",
    "bg-amber-200",
    "bg-sky-200",
    "bg-rose-200",
    "bg-emerald-200",
    "bg-orange-200",
  ];

  return (
    <div
      className="relative mx-auto flex aspect-square w-full max-w-[280px] items-center justify-center sm:max-w-none lg:max-w-[320px]"
      aria-hidden
    >
      <div className="absolute inset-[8%] rounded-full border border-dashed border-border/70" />
      <div className="absolute inset-[22%] rounded-full border border-dashed border-border/60" />
      <div className="absolute inset-[36%] rounded-full border border-dashed border-border/50" />
      {orbitAvatars.map((tone, index) => {
        const angle = (index / orbitAvatars.length) * 360;
        return (
          <span
            key={tone}
            className={cn(
              "absolute size-9 rounded-full border-2 border-background shadow-sm",
              tone,
            )}
            style={{
              left: "50%",
              top: "50%",
              transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-118px) rotate(-${angle}deg)`,
            }}
          />
        );
      })}
      <div className="relative z-10 flex size-14 items-center justify-center rounded-2xl border border-border/60 bg-background shadow-md">
        <Image src="/fav.svg" alt="" width={32} height={32} className="size-8" />
      </div>
    </div>
  );
}

function FooterCtaCard() {
  return (
    <div className="overflow-hidden rounded-3xl border border-border/60 bg-card shadow-[0_8px_40px_-16px_rgba(0,0,0,0.12)]">
      <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-2 lg:items-center lg:gap-10 lg:p-10">
        <div className="max-w-lg">
          <p className="mb-2 text-sm font-medium text-muted-foreground">{FOOTER_CTA.eyebrow}</p>
          <h2 className="text-balance text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            {FOOTER_CTA.title}
          </h2>
          <p className="mt-3 text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
            {FOOTER_CTA.description}
          </p>
          <Link
            href={FOOTER_CTA.buttonHref}
            prefetch
            className={cn(
              "mt-6 inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background",
              "transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            )}
          >
            {FOOTER_CTA.buttonLabel}
            <ArrowUpRight className="size-4" aria-hidden />
          </Link>
        </div>
        <FooterCtaVisual />
      </div>
    </div>
  );
}

export type MarketingSiteFooterProps = {
  className?: string;
  /** Show the pre-footer CTA card (homepage-style). Default true. */
  showCtaCard?: boolean;
};

export function MarketingSiteFooter({ className, showCtaCard = true }: MarketingSiteFooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer
      className={cn(
        "relative z-0 mt-0 w-full shrink-0 rounded-b-2xl bg-background",
        "pb-[max(0.5rem,env(safe-area-inset-bottom,0px))]",
        className,
      )}
    >
      <div className="mx-auto w-full max-w-[min(100%,92rem)] px-5 pt-10 pb-6 sm:px-8 sm:pt-12 lg:px-12 xl:px-14">
        {showCtaCard ? (
          <div className="mb-10 sm:mb-12">
            <FooterCtaCard />
          </div>
        ) : null}

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-x-12 lg:gap-y-10">
          <div className="lg:col-span-4 xl:col-span-3">
            <Link href="/" className="inline-flex items-center gap-2.5" prefetch>
              <Image src="/fav.svg" alt="" width={28} height={28} className="size-7" />
              <span className="text-lg font-semibold tracking-tight text-foreground">{APP_NAME}</span>
            </Link>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
              {FOOTER_BRAND_TAGLINE}
            </p>
          </div>

          <div className="lg:col-span-2 lg:col-start-5 xl:col-start-4">
            <FooterNavColumn title="Company" links={FOOTER_COMPANY_LINKS} ariaLabel="Company" />
          </div>

          <div className="lg:col-span-2">
            <FooterNavColumn title="Socials" links={FOOTER_SOCIAL_LINKS} ariaLabel="Social links" />
          </div>

          <div className="sm:col-span-2 lg:col-span-4 xl:col-span-5">
            <p className="mb-2 text-sm font-semibold text-foreground">{FOOTER_NEWSLETTER.title}</p>
            <p className="mb-4 max-w-md text-sm leading-relaxed text-muted-foreground">
              {FOOTER_NEWSLETTER.description}
            </p>
            <FooterNewsletterForm className="max-w-md xl:max-w-lg" />
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-center text-xs text-muted-foreground sm:text-left">
            © {year} {APP_NAME}. All rights reserved.
          </p>
          <nav aria-label="Legal">
            <ul className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 sm:justify-end">
              {FOOTER_LEGAL_LINKS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    prefetch
                    className="text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
