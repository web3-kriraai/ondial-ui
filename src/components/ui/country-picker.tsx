"use client";

import { useState, useEffect, useRef } from "react";
import { Search, ChevronDown } from "lucide-react";

export interface Country {
  name: string;
  code: string;
  iso2: string;
  min: number;
  max: number;
}

export const COUNTRIES: Country[] = [
  { name: "Afghanistan", code: "+93", iso2: "af", min: 9, max: 9 },
  { name: "Albania", code: "+355", iso2: "al", min: 9, max: 9 },
  { name: "Algeria", code: "+213", iso2: "dz", min: 9, max: 9 },
  { name: "Argentina", code: "+54", iso2: "ar", min: 10, max: 11 },
  { name: "Australia", code: "+61", iso2: "au", min: 9, max: 9 },
  { name: "Austria", code: "+43", iso2: "at", min: 7, max: 13 },
  { name: "Bangladesh", code: "+880", iso2: "bd", min: 10, max: 10 },
  { name: "Belgium", code: "+32", iso2: "be", min: 9, max: 9 },
  { name: "Brazil", code: "+55", iso2: "br", min: 10, max: 11 },
  { name: "Canada", code: "+1", iso2: "ca", min: 10, max: 10 },
  { name: "Chile", code: "+56", iso2: "cl", min: 9, max: 9 },
  { name: "China", code: "+86", iso2: "cn", min: 11, max: 11 },
  { name: "Colombia", code: "+57", iso2: "co", min: 10, max: 10 },
  { name: "Denmark", code: "+45", iso2: "dk", min: 8, max: 8 },
  { name: "Egypt", code: "+20", iso2: "eg", min: 10, max: 10 },
  { name: "Finland", code: "+358", iso2: "fi", min: 9, max: 11 },
  { name: "France", code: "+33", iso2: "fr", min: 9, max: 9 },
  { name: "Germany", code: "+49", iso2: "de", min: 5, max: 12 },
  { name: "Ghana", code: "+233", iso2: "gh", min: 9, max: 9 },
  { name: "Greece", code: "+30", iso2: "gr", min: 10, max: 10 },
  { name: "Hong Kong", code: "+852", iso2: "hk", min: 8, max: 8 },
  { name: "Hungary", code: "+36", iso2: "hu", min: 9, max: 9 },
  { name: "India", code: "+91", iso2: "in", min: 10, max: 10 },
  { name: "Indonesia", code: "+62", iso2: "id", min: 9, max: 12 },
  { name: "Ireland", code: "+353", iso2: "ie", min: 9, max: 9 },
  { name: "Israel", code: "+972", iso2: "il", min: 9, max: 9 },
  { name: "Italy", code: "+39", iso2: "it", min: 9, max: 11 },
  { name: "Japan", code: "+81", iso2: "jp", min: 10, max: 10 },
  { name: "Kenya", code: "+254", iso2: "ke", min: 9, max: 9 },
  { name: "Malaysia", code: "+60", iso2: "my", min: 9, max: 10 },
  { name: "Mexico", code: "+52", iso2: "mx", min: 10, max: 10 },
  { name: "Netherlands", code: "+31", iso2: "nl", min: 9, max: 9 },
  { name: "New Zealand", code: "+64", iso2: "nz", min: 8, max: 10 },
  { name: "Nigeria", code: "+234", iso2: "ng", min: 10, max: 10 },
  { name: "Norway", code: "+47", iso2: "no", min: 8, max: 8 },
  { name: "Pakistan", code: "+92", iso2: "pk", min: 10, max: 10 },
  { name: "Philippines", code: "+63", iso2: "ph", min: 10, max: 10 },
  { name: "Poland", code: "+48", iso2: "pl", min: 9, max: 9 },
  { name: "Portugal", code: "+351", iso2: "pt", min: 9, max: 9 },
  { name: "Romania", code: "+40", iso2: "ro", min: 9, max: 9 },
  { name: "Russia", code: "+7", iso2: "ru", min: 10, max: 10 },
  { name: "Saudi Arabia", code: "+966", iso2: "sa", min: 9, max: 9 },
  { name: "Singapore", code: "+65", iso2: "sg", min: 8, max: 8 },
  { name: "South Africa", code: "+27", iso2: "za", min: 9, max: 9 },
  { name: "South Korea", code: "+82", iso2: "kr", min: 9, max: 11 },
  { name: "Spain", code: "+34", iso2: "es", min: 9, max: 9 },
  { name: "Sri Lanka", code: "+94", iso2: "lk", min: 9, max: 9 },
  { name: "Sweden", code: "+46", iso2: "se", min: 9, max: 9 },
  { name: "Switzerland", code: "+41", iso2: "ch", min: 9, max: 9 },
  { name: "Taiwan", code: "+886", iso2: "tw", min: 9, max: 9 },
  { name: "Thailand", code: "+66", iso2: "th", min: 9, max: 9 },
  { name: "Turkey", code: "+90", iso2: "tr", min: 10, max: 10 },
  { name: "UAE", code: "+971", iso2: "ae", min: 9, max: 9 },
  { name: "Ukraine", code: "+380", iso2: "ua", min: 9, max: 9 },
  { name: "United Kingdom", code: "+44", iso2: "gb", min: 10, max: 10 },
  { name: "United States", code: "+1", iso2: "us", min: 10, max: 10 },
  { name: "Vietnam", code: "+84", iso2: "vn", min: 9, max: 10 },
].sort((a, b) => a.name.localeCompare(b.name));

export function flagCdnUrl(iso2: string, width = 40) {
  const code = String(iso2 || "in").toLowerCase();
  return `https://flagcdn.com/w${width}/${code}.png`;
}

interface CountryFlagProps {
  iso2: string;
  className?: string;
  alt?: string;
}

export function CountryFlag({ iso2, className = "", alt }: CountryFlagProps) {
  const code = String(iso2 || "in").toLowerCase();
  return (
    <img
      src={flagCdnUrl(code)}
      alt={alt ?? `${code.toUpperCase()} flag`}
      className={`pointer-events-none shrink-0 rounded-[2px] object-cover shadow-sm ${className}`}
      loading="lazy"
      width={20}
      height={14}
    />
  );
}

export function getConfig(code: string): Country {
  return COUNTRIES.find((c) => c.code === code) ?? COUNTRIES.find((c) => c.name === "India") ?? COUNTRIES[0];
}

const DEFAULT_TRIGGER_CLASS =
  "cursor-pointer flex h-11 items-center gap-1.5 rounded-l-xl border-r border-black/8 bg-muted/20 px-3 text-sm font-semibold text-foreground focus:outline-none";

interface CountryPickerProps {
  value: string;
  onChange: (code: string, country: Country) => void;
  className?: string;
  buttonClassName?: string;
  dropdownClassName?: string;
}

export default function CountryPicker({
  value,
  onChange,
  className = "",
  buttonClassName = "",
  dropdownClassName = "",
}: CountryPickerProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const selected = getConfig(value) ?? COUNTRIES.find((c) => c.code === "+91") ?? COUNTRIES[0];

  const filtered = COUNTRIES.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.code.includes(search) ||
      c.iso2.includes(search.toLowerCase())
  );

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    if (open) setTimeout(() => searchRef.current?.focus(), 50);
    else setSearch("");
  }, [open]);

  return (
    <div ref={ref} className={`relative ${className}`.trim()}>
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className={buttonClassName ? `${DEFAULT_TRIGGER_CLASS} ${buttonClassName}` : DEFAULT_TRIGGER_CLASS}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Country code ${selected.code}`}
      >
        <CountryFlag iso2={selected.iso2} className="h-3 w-4.5" />
        <span className="tabular-nums">{selected.code}</span>
        <ChevronDown
          className={`h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div
          className={`absolute left-0 top-full z-50 mt-1.5 w-72 overflow-hidden rounded-2xl border border-black/8 bg-background shadow-xl shadow-black/8 ${dropdownClassName}`.trim()}
        >
          {/* Search */}
          <div className="border-b border-black/8 p-2.5">
            <div className="flex items-center gap-2 rounded-full border border-black/8 bg-muted/20 px-3 py-1.5 focus-within:border-black/20 focus-within:bg-background">
              <Search className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
              <input
                ref={searchRef}
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search country name..."
                className="min-w-0 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
              />
            </div>
          </div>

          <ul
            role="listbox"
            className="max-h-56 overflow-y-auto overscroll-contain p-0 m-0 list-none"
          >
            {filtered.length === 0 ? (
              <li className="px-4 py-3 text-center text-xs text-muted-foreground">No results</li>
            ) : (
              filtered.map((c) => (
                <li
                  key={`${c.name}-${c.code}`}
                  role="option"
                  aria-selected={c.code === value}
                  onClick={() => {
                    onChange(c.code, c);
                    setOpen(false);
                  }}
                  className={`flex cursor-pointer items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                    c.code === value
                      ? "bg-black/[0.04] font-semibold text-foreground"
                      : "text-foreground hover:bg-black/[0.02]"
                  }`}
                >
                  <CountryFlag iso2={c.iso2} className="h-3.5 w-5" alt={`${c.name} flag`} />
                  <span className="min-w-0 flex-1 truncate">{c.name}</span>
                  <span className={`shrink-0 text-xs font-medium tabular-nums ${c.code === value ? "text-foreground" : "text-muted-foreground"}`}>
                    {c.code}
                  </span>
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
