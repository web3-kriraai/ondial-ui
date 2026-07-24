"use client";

import { ChevronDown, Search } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

import { cn } from "@/lib/utils";

export type SearchableSelectOption = {
  value: string;
  label: string;
  searchText?: string;
};

type SearchableSelectProps = {
  id?: string;
  value: string;
  options: SearchableSelectOption[];
  onChange: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  disabled?: boolean;
  className?: string;
  triggerClassName?: string;
  dropdownClassName?: string;
  "aria-label"?: string;
};

/**
 * Select2-style searchable dropdown (matches CountryPicker interaction).
 */
export function SearchableSelect({
  id,
  value,
  options,
  onChange,
  placeholder = "Select…",
  searchPlaceholder = "Search…",
  emptyText = "No results",
  disabled = false,
  className,
  triggerClassName,
  dropdownClassName,
  "aria-label": ariaLabel,
}: SearchableSelectProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const selected = useMemo(
    () => options.find((o) => o.value === value) || null,
    [options, value],
  );

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return options;
    return options.filter((o) => {
      const hay = `${o.label} ${o.value} ${o.searchText || ""}`.toLowerCase();
      return hay.includes(q);
    });
  }, [options, search]);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    if (open) {
      const t = setTimeout(() => searchRef.current?.focus(), 50);
      return () => clearTimeout(t);
    }
    setSearch("");
    return undefined;
  }, [open]);

  return (
    <div ref={ref} className={cn("relative w-full", className)}>
      <button
        id={id}
        type="button"
        disabled={disabled}
        onClick={() => setOpen((p) => !p)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={ariaLabel || placeholder}
        className={cn(
          "flex h-11 w-full items-center gap-2 rounded-xl border border-black/[0.08] bg-background px-[0.9rem] text-left text-[0.9375rem] text-foreground transition-[border-color,box-shadow] duration-200 ease-in-out focus-visible:border-[hsl(262_83%_58%/0.35)] focus-visible:shadow-[0_0_0_3px_hsl(262_83%_58%/0.12)] focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
          triggerClassName,
        )}
      >
        <span
          className={cn(
            "min-w-0 flex-1 truncate",
            !selected && "text-muted-foreground",
          )}
        >
          {selected?.label || placeholder}
        </span>
        <ChevronDown
          className={cn(
            "size-4 shrink-0 text-muted-foreground transition-transform duration-200",
            open && "rotate-180",
          )}
        />
      </button>

      {open ? (
        <div
          className={cn(
            "absolute left-0 top-full z-50 mt-1.5 w-full overflow-hidden rounded-2xl border border-black/[0.08] bg-background shadow-xl shadow-black/8",
            dropdownClassName,
          )}
        >
          <div className="border-b border-black/[0.08] p-2.5">
            <div className="flex items-center gap-2 rounded-full border border-black/[0.08] bg-muted/20 px-3 py-1.5 focus-within:border-black/20 focus-within:bg-background">
              <Search className="size-3.5 shrink-0 text-muted-foreground" />
              <input
                ref={searchRef}
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={searchPlaceholder}
                className="min-w-0 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
              />
            </div>
          </div>

          <ul
            role="listbox"
            className="m-0 max-h-56 list-none overflow-y-auto overscroll-contain p-0"
          >
            {filtered.length === 0 ? (
              <li className="px-4 py-3 text-center text-xs text-muted-foreground">
                {emptyText}
              </li>
            ) : (
              filtered.map((option) => {
                const isSelected = option.value === value;
                return (
                  <li
                    key={option.value}
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => {
                      onChange(option.value);
                      setOpen(false);
                    }}
                    className={cn(
                      "flex cursor-pointer items-center gap-3 px-4 py-2.5 text-sm transition-colors",
                      isSelected
                        ? "bg-black/[0.04] font-semibold text-foreground"
                        : "text-foreground hover:bg-black/[0.02]",
                    )}
                  >
                    <span className="min-w-0 flex-1 truncate">{option.label}</span>
                    <span
                      className={cn(
                        "shrink-0 text-xs font-medium tabular-nums",
                        isSelected ? "text-foreground" : "text-muted-foreground",
                      )}
                    >
                      {option.value}
                    </span>
                  </li>
                );
              })
            )}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
