"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Check, ChevronDown, User } from "lucide-react";
import type { AuthorRow } from "@/lib/db/types";
import { cn } from "@/lib/utils";

type AuthorSelectProps = {
  id?: string;
  value: string;
  onChange: (authorId: string) => void;
  authors: AuthorRow[];
  error?: string | null;
  disabled?: boolean;
};

function AuthorAvatar({ author }: { author: AuthorRow }) {
  if (author.avatar_url) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={author.avatar_url}
        alt=""
        className="size-7 shrink-0 rounded-full object-cover ring-1 ring-gray-200"
      />
    );
  }

  const initials = author.name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");

  return (
    <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#534AB7]/10 text-[10px] font-semibold text-[#534AB7] ring-1 ring-[#534AB7]/15">
      {initials || <User className="size-3.5" />}
    </span>
  );
}

export function AuthorSelect({
  id,
  value,
  onChange,
  authors,
  error,
  disabled,
}: AuthorSelectProps) {
  const listboxId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  const selected = authors.find((author) => author.id === value) ?? null;
  const hasError = Boolean(error);

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      <button
        id={id}
        type="button"
        disabled={disabled || authors.length === 0}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        aria-invalid={hasError}
        aria-describedby={hasError ? `${id}-error` : undefined}
        onClick={() => setOpen((prev) => !prev)}
        className={cn(
          "flex w-full items-center gap-2.5 rounded-lg border bg-gray-50 px-3 py-2.5 text-left text-sm transition-all outline-none",
          "focus:border-[#534AB7] focus:bg-white focus:ring-2 focus:ring-[#534AB7]/10",
          hasError
            ? "border-red-300 bg-red-50/40 focus:border-red-500 focus:ring-red-500/15"
            : "border-gray-200 hover:bg-white",
          (disabled || authors.length === 0) && "cursor-not-allowed opacity-60",
        )}
      >
        {selected ? (
          <>
            <AuthorAvatar author={selected} />
            <span className="min-w-0 flex-1 truncate text-gray-900">{selected.name}</span>
            {selected.designation ? (
              <span className="hidden truncate text-xs text-gray-400 sm:inline">
                {selected.designation}
              </span>
            ) : null}
          </>
        ) : (
          <span className="flex-1 text-gray-400">Select an author…</span>
        )}
        <ChevronDown
          className={cn(
            "size-4 shrink-0 text-gray-400 transition-transform",
            open && "rotate-180",
          )}
        />
      </button>

      {open && authors.length > 0 ? (
        <ul
          id={listboxId}
          role="listbox"
          aria-labelledby={id}
          className="absolute z-30 mt-1.5 max-h-60 w-full overflow-auto rounded-xl border border-gray-200 bg-white p-1 shadow-lg shadow-gray-200/60"
        >
          {authors.map((author) => {
            const isSelected = author.id === value;
            return (
              <li key={author.id} role="option" aria-selected={isSelected}>
                <button
                  type="button"
                  onClick={() => {
                    onChange(author.id);
                    setOpen(false);
                  }}
                  className={cn(
                    "flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-sm transition-colors",
                    isSelected
                      ? "bg-[#534AB7]/8 text-[#534AB7]"
                      : "text-gray-800 hover:bg-gray-50",
                  )}
                >
                  <AuthorAvatar author={author} />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-medium">{author.name}</span>
                    {author.designation ? (
                      <span className="block truncate text-xs text-gray-400">
                        {author.designation}
                      </span>
                    ) : null}
                  </span>
                  {isSelected ? <Check className="size-4 shrink-0 text-[#534AB7]" /> : null}
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
