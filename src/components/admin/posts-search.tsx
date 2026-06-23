"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState, useTransition } from "react";
import { Search, Loader2 } from "lucide-react";

const DEBOUNCE_MS = 400;

export function PostsSearch({ defaultValue = "" }: { defaultValue?: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [value, setValue] = useState(defaultValue);
  const [isDebouncing, setIsDebouncing] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Keep input in sync when URL changes (back/forward, tab filters, etc.)
  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  const pushSearch = useCallback(
    (query: string) => {
      const trimmed = query.trim();
      const currentQ = (searchParams.get("q") ?? "").trim();

      if (trimmed === currentQ) {
        setIsDebouncing(false);
        return;
      }

      const params = new URLSearchParams(searchParams.toString());
      if (trimmed) {
        params.set("q", trimmed);
      } else {
        params.delete("q");
      }
      params.delete("page");

      const qs = params.toString();
      startTransition(() => {
        router.push(qs ? `${pathname}?${qs}` : pathname);
      });
      setIsDebouncing(false);
    },
    [router, pathname, searchParams],
  );

  const scheduleSearch = useCallback(
    (query: string) => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      setIsDebouncing(true);
      debounceRef.current = setTimeout(() => pushSearch(query), DEBOUNCE_MS);
    },
    [pushSearch],
  );

  const flushSearch = useCallback(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    pushSearch(value);
  }, [pushSearch, value]);

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  const showSpinner = isDebouncing || isPending;

  return (
    <div className="relative w-56">
      <Search className="absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-gray-400" />
      <input
        type="search"
        value={value}
        onChange={(e) => {
          const next = e.target.value;
          setValue(next);
          scheduleSearch(next);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            flushSearch();
          }
        }}
        placeholder="Search posts…"
        className="w-full rounded-lg border border-gray-200 bg-gray-50 py-1.5 pl-8 pr-8 text-xs text-gray-800 outline-none transition-all placeholder:text-gray-400 focus:border-[#534AB7] focus:bg-white focus:ring-2 focus:ring-[#534AB7]/10"
      />
      {showSpinner && (
        <Loader2 className="absolute right-2.5 top-1/2 size-3.5 -translate-y-1/2 animate-spin text-[#534AB7]" />
      )}
    </div>
  );
}
