"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, ChevronDown, Globe } from "lucide-react";
import Image from "next/image";
import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { usePricingCountry } from "@/components/marketing/pricing-country-context";
import type { PricingCountryDefinition } from "@/data/pricing-by-country";
import { flagImageUrl } from "@/lib/languages-data";
import { cn } from "@/lib/utils";

type PricingCountryBarProps = {
  className?: string;
};

type MenuPosition = {
  top: number;
  left: number;
  width: number;
};

function CountryFlag({ flagCode, className }: { flagCode: string; className?: string }) {
  return (
    <span
      className={cn(
        "relative inline-flex shrink-0 overflow-hidden rounded-full ring-1 ring-black/10",
        className,
      )}
    >
      <Image
        src={flagImageUrl(flagCode)}
        alt=""
        width={20}
        height={20}
        className="size-full object-cover"
      />
    </span>
  );
}

function useMenuPosition(open: boolean, triggerRef: React.RefObject<HTMLButtonElement | null>) {
  const [position, setPosition] = useState<MenuPosition>({ top: 0, left: 0, width: 260 });

  useLayoutEffect(() => {
    if (!open || !triggerRef.current) return;

    const updatePosition = () => {
      const trigger = triggerRef.current;
      if (!trigger) return;

      const rect = trigger.getBoundingClientRect();
      const width = Math.max(rect.width, 272);
      const left = Math.min(
        Math.max(16, rect.right - width),
        window.innerWidth - width - 16,
      );

      setPosition({
        top: rect.bottom + 10,
        left,
        width,
      });
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);
    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [open, triggerRef]);

  return position;
}

function PricingCountryDropdown() {
  const listboxId = useId();
  const { countryId, country, setCountryId, availableCountries, loading } = usePricingCountry();
  const prefersReducedMotion = useReducedMotion();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [activeIndex, setActiveIndex] = useState(() =>
    availableCountries.findIndex((entry) => entry.id === countryId),
  );
  const menuPosition = useMenuPosition(open, triggerRef);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setActiveIndex(availableCountries.findIndex((entry) => entry.id === countryId));
  }, [countryId, availableCountries]);

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target as Node;
      if (triggerRef.current?.contains(target) || menuRef.current?.contains(target)) {
        return;
      }
      setOpen(false);
    };

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
        return;
      }

      if (event.key === "ArrowDown") {
        event.preventDefault();
        setActiveIndex((index) => (index + 1) % availableCountries.length);
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        setActiveIndex(
          (index) => (index - 1 + availableCountries.length) % availableCountries.length,
        );
      }

      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        const entry = availableCountries[activeIndex];
        if (entry) {
          setCountryId(entry.id);
          setOpen(false);
          triggerRef.current?.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, availableCountries, open, setCountryId]);

  const pickCountry = (entry: PricingCountryDefinition) => {
    setCountryId(entry.id);
    setOpen(false);
    triggerRef.current?.focus();
  };

  const menu = (
    <AnimatePresence>
      {open ? (
        <motion.div
          ref={menuRef}
          initial={prefersReducedMotion ? false : { opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={prefersReducedMotion ? undefined : { opacity: 0, y: -4 }}
          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          style={{
            top: menuPosition.top,
            left: menuPosition.left,
            width: menuPosition.width,
          }}
          className="fixed z-50"
        >
            <ul
              id={listboxId}
              role="listbox"
              aria-label="Choose your country for localized pricing"
              aria-activedescendant={`${listboxId}-${availableCountries[activeIndex]?.id}`}
              className="overflow-hidden rounded-2xl border border-black/10 bg-white p-1.5 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.35)]"
            >
              {availableCountries.map((entry, index) => {
                const selected = entry.id === countryId;
                const active = index === activeIndex;

                return (
                  <li key={entry.id} role="presentation">
                    <button
                      id={`${listboxId}-${entry.id}`}
                      type="button"
                      role="option"
                      aria-selected={selected}
                      onMouseEnter={() => setActiveIndex(index)}
                      onClick={() => pickCountry(entry)}
                      className={cn(
                        "flex w-full cursor-pointer items-center gap-2.5 rounded-xl px-2.5 py-2 text-left transition-colors duration-150 outline-none",
                        selected
                          ? "bg-black text-white"
                          : active
                            ? "bg-zinc-100 text-foreground"
                            : "text-foreground hover:bg-zinc-50",
                        "focus-visible:ring-2 focus-visible:ring-black/15 focus-visible:ring-inset",
                      )}
                    >
                      <CountryFlag flagCode={entry.flagCode} className="size-5" />
                      <span className="min-w-0 flex-1 truncate text-sm font-semibold">
                        {entry.name}
                      </span>
                      <span
                        className={cn(
                          "shrink-0 text-xs font-medium",
                          selected ? "text-white/75" : "text-muted-foreground",
                        )}
                      >
                        {entry.currency.code}
                      </span>
                      <span
                        className={cn(
                          "inline-flex size-4 shrink-0 items-center justify-center rounded-full",
                          selected ? "bg-white text-black" : "opacity-0",
                        )}
                        aria-hidden
                      >
                        <Check className="size-2.5" strokeWidth={3} />
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </motion.div>
      ) : null}
    </AnimatePresence>
  );

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listboxId : undefined}
        onClick={() => setOpen((value) => !value)}
        disabled={loading && availableCountries.length === 0}
        className={cn(
          "group inline-flex h-10 min-w-[12.5rem] cursor-pointer items-center gap-2 rounded-full border border-black/10 bg-zinc-50/80 py-1.5 pr-2 pl-2.5 text-left transition-[border-color,background-color,box-shadow] duration-200 sm:min-w-[15.5rem]",
          "hover:border-black/15 hover:bg-zinc-50",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/10 focus-visible:ring-offset-2",
          open && "border-black/20 bg-white shadow-[0_8px_24px_-14px_rgba(0,0,0,0.28)]",
          loading && "opacity-90",
        )}
      >
        <CountryFlag flagCode={country.flagCode} className="size-5" />
        <span className="min-w-0 flex-1 truncate text-sm font-semibold tracking-tight text-foreground">
          {country.name}
          <span className="font-medium text-muted-foreground"> · {country.currency.code}</span>
        </span>
        <motion.span
          aria-hidden
          animate={{ rotate: open ? 180 : 0 }}
          transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-black/5 text-muted-foreground"
        >
          <ChevronDown className="size-3.5" strokeWidth={2.25} />
        </motion.span>
      </button>

      {mounted ? createPortal(menu, document.body) : null}
    </>
  );
}

export function PricingCountryBar({ className }: PricingCountryBarProps) {
  const { country } = usePricingCountry();
  const shellRef = useRef<HTMLDivElement>(null);
  const [isPinned, setIsPinned] = useState(false);

  useEffect(() => {
    const shell = shellRef.current;
    if (!shell) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsPinned(!entry.isIntersecting);
      },
      {
        root: null,
        threshold: 1,
        rootMargin: "-96px 0px 0px 0px",
      },
    );

    observer.observe(shell);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={shellRef}
      className={cn("relative z-30 mt-6 flex justify-center sm:mt-7", className)}
    >
      <div
        className={cn(
          "sticky top-[calc(env(safe-area-inset-top)+4.35rem)] transition-[filter] duration-300",
          isPinned && "drop-shadow-[0_10px_28px_rgba(0,0,0,0.1)]",
        )}
      >
        <div
          className={cn(
            "inline-flex max-w-[calc(100vw-2rem)] flex-wrap items-center justify-center gap-2 rounded-full border bg-white px-3 py-1.5 shadow-[0_2px_16px_-10px_rgba(0,0,0,0.22)] sm:gap-3 sm:px-4 sm:py-2",
            isPinned ? "border-black/12" : "border-black/10",
          )}
        >
          <span className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <Globe className="size-4 shrink-0" aria-hidden />
            <span>Viewing prices in</span>
          </span>

          <PricingCountryDropdown />
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        Prices updated for {country.name} in {country.currency.code}.
      </p>
    </div>
  );
}
