"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import {
  CalendarDays,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock3,
} from "lucide-react";
import { cn } from "@/lib/utils";

/** `YYYY-MM-DDTHH:MM` in IST, same shape as datetime-local */
export type PublishDateValue = string;

type PublishDatePickerProps = {
  id?: string;
  value: PublishDateValue;
  onChange: (value: PublishDateValue) => void;
};

const HOURS = Array.from({ length: 12 }, (_, index) => index + 1);
const MINUTES = Array.from({ length: 60 }, (_, index) => index);
const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"] as const;
const DROPDOWN_LIST_HEIGHT = "max-h-44"; // fixed scroll area (~176px, ~6 items visible)

type OpenPanel = "calendar" | "hour" | "minute" | null;

function pad(value: number) {
  return String(value).padStart(2, "0");
}

function parseValue(value: string) {
  const [datePart = "", timePart = "12:00"] = value.split("T");
  const [hourRaw = "12", minuteRaw = "00"] = timePart.split(":");
  const hour24 = Number(hourRaw);
  const minute = Number(minuteRaw);

  const period: "AM" | "PM" = hour24 >= 12 ? "PM" : "AM";
  const hour12 = hour24 % 12 || 12;

  return {
    datePart: datePart || getIstDatePart(),
    hour12: Number.isFinite(hour12) ? hour12 : 12,
    minute: Number.isFinite(minute) ? minute : 0,
    period,
  };
}

function getIstDatePart(date = new Date()) {
  return new Intl.DateTimeFormat("sv-SE", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

function to24Hour(hour12: number, period: "AM" | "PM") {
  if (period === "AM") return hour12 === 12 ? 0 : hour12;
  return hour12 === 12 ? 12 : hour12 + 12;
}

export function combinePublishDate(
  datePart: string,
  hour12: number,
  minute: number,
  period: "AM" | "PM",
): PublishDateValue {
  const hour24 = to24Hour(hour12, period);
  return `${datePart}T${pad(hour24)}:${pad(minute)}`;
}

export function formatPublishDatePreview(value: string) {
  if (!value.includes("T")) return "Pick a date and time";

  const date = new Date(`${value}:00+05:30`);
  if (Number.isNaN(date.getTime())) return "Pick a date and time";

  return new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(date);
}

export function getIstDatetimeLocal(dateStr?: string | null): PublishDateValue {
  const date = dateStr ? new Date(dateStr) : new Date();
  return new Intl.DateTimeFormat("sv-SE", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  })
    .format(date)
    .replace(" ", "T");
}

function formatDateLabel(datePart: string) {
  const [year, month, day] = datePart.split("-").map(Number);
  if (!year || !month || !day) return "Select date";

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(year, month - 1, day));
}

function parseDateParts(datePart: string) {
  const [year, month, day] = datePart.split("-").map(Number);
  return {
    year: year || new Date().getFullYear(),
    month: (month || 1) - 1,
    day: day || 1,
  };
}

function buildCalendarCells(year: number, month: number) {
  const firstWeekday = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const cells: Array<{
    day: number;
    datePart: string;
    inMonth: boolean;
  }> = [];

  for (let index = 0; index < 42; index += 1) {
    const dayIndex = index - firstWeekday + 1;
    let cellYear = year;
    let cellMonth = month;
    let cellDay = dayIndex;

    if (dayIndex < 1) {
      cellMonth -= 1;
      if (cellMonth < 0) {
        cellMonth = 11;
        cellYear -= 1;
      }
      cellDay = daysInPrevMonth + dayIndex;
    } else if (dayIndex > daysInMonth) {
      cellMonth += 1;
      if (cellMonth > 11) {
        cellMonth = 0;
        cellYear += 1;
      }
      cellDay = dayIndex - daysInMonth;
    }

    const datePart = `${cellYear}-${pad(cellMonth + 1)}-${pad(cellDay)}`;
    cells.push({
      day: cellDay,
      datePart,
      inMonth: dayIndex >= 1 && dayIndex <= daysInMonth,
    });
  }

  return cells;
}

const TRIGGER_CLASS =
  "flex w-full items-center justify-between gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-900 transition-all outline-none hover:bg-white focus:border-[#534AB7] focus:bg-white focus:ring-2 focus:ring-[#534AB7]/10";

type FixedListDropdownProps<T extends string | number> = {
  id?: string;
  label: string;
  value: T;
  options: readonly T[];
  formatOption?: (value: T) => string;
  onChange: (value: T) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

function FixedListDropdown<T extends string | number>({
  id,
  label,
  value,
  options,
  formatOption = (option) => String(option),
  onChange,
  open,
  onOpenChange,
}: FixedListDropdownProps<T>) {
  const listId = useId();
  const listRef = useRef<HTMLUListElement>(null);
  const selectedRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    selectedRef.current?.scrollIntoView({ block: "nearest" });
  }, [open]);

  return (
    <div className="relative min-w-0 flex-1">
      <button
        id={id}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => onOpenChange(!open)}
        className={cn(
          TRIGGER_CLASS,
          open && "border-[#534AB7]/40 bg-white ring-2 ring-[#534AB7]/10",
        )}
      >
        <span className="truncate font-medium">{formatOption(value)}</span>
        <ChevronDown
          className={cn("size-4 shrink-0 text-gray-400 transition-transform", open && "rotate-180")}
        />
      </button>

      {open ? (
        <div
          className="absolute z-50 mt-1.5 w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg shadow-gray-200/60"
          role="presentation"
        >
          <p className="border-b border-gray-100 px-3 py-2 text-[10px] font-semibold uppercase tracking-wide text-gray-400">
            {label}
          </p>
          <ul
            id={listId}
            ref={listRef}
            role="listbox"
            aria-label={label}
            className={cn(DROPDOWN_LIST_HEIGHT, "overflow-y-auto overscroll-contain p-1")}
          >
            {options.map((option) => {
              const isSelected = option === value;
              return (
                <li key={String(option)} role="option" aria-selected={isSelected}>
                  <button
                    ref={isSelected ? selectedRef : undefined}
                    type="button"
                    onClick={() => {
                      onChange(option);
                      onOpenChange(false);
                    }}
                    className={cn(
                      "flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors",
                      isSelected
                        ? "bg-[#534AB7]/10 font-semibold text-[#534AB7]"
                        : "text-gray-800 hover:bg-gray-50",
                    )}
                  >
                    <span>{formatOption(option)}</span>
                    {isSelected ? <Check className="size-3.5 shrink-0" /> : null}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

type CalendarPopoverProps = {
  id?: string;
  datePart: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (datePart: string) => void;
  onToday: () => void;
};

function CalendarPopover({
  id,
  datePart,
  open,
  onOpenChange,
  onSelect,
  onToday,
}: CalendarPopoverProps) {
  const initial = parseDateParts(datePart);
  const [viewYear, setViewYear] = useState(initial.year);
  const [viewMonth, setViewMonth] = useState(initial.month);
  const todayPart = getIstDatePart();

  useEffect(() => {
    if (!open) return;
    const parts = parseDateParts(datePart);
    setViewYear(parts.year);
    setViewMonth(parts.month);
  }, [open, datePart]);

  const monthLabel = new Intl.DateTimeFormat("en-IN", {
    month: "long",
    year: "numeric",
  }).format(new Date(viewYear, viewMonth, 1));

  const cells = useMemo(
    () => buildCalendarCells(viewYear, viewMonth),
    [viewYear, viewMonth],
  );

  function shiftMonth(delta: number) {
    const next = new Date(viewYear, viewMonth + delta, 1);
    setViewYear(next.getFullYear());
    setViewMonth(next.getMonth());
  }

  return (
    <div className="relative min-w-0 flex-1">
      <button
        id={id}
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => onOpenChange(!open)}
        className={cn(
          TRIGGER_CLASS,
          open && "border-[#534AB7]/40 bg-white ring-2 ring-[#534AB7]/10",
        )}
      >
        <span className="flex items-center gap-2 truncate">
          <CalendarDays className="size-4 shrink-0 text-[#534AB7]" />
          <span className="font-medium">{formatDateLabel(datePart)}</span>
        </span>
        <ChevronDown
          className={cn("size-4 shrink-0 text-gray-400 transition-transform", open && "rotate-180")}
        />
      </button>

      {open ? (
        <div
          className="absolute z-50 mt-1.5 w-[min(100%,280px)] overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg shadow-gray-200/60"
          role="dialog"
          aria-label="Choose publish date"
        >
          <div className="flex items-center justify-between border-b border-gray-100 px-3 py-2.5">
            <button
              type="button"
              onClick={() => shiftMonth(-1)}
              className="flex size-7 items-center justify-center rounded-md text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900"
              aria-label="Previous month"
            >
              <ChevronLeft className="size-4" />
            </button>
            <p className="text-sm font-semibold text-gray-900">{monthLabel}</p>
            <button
              type="button"
              onClick={() => shiftMonth(1)}
              className="flex size-7 items-center justify-center rounded-md text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900"
              aria-label="Next month"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-0.5 px-2 pt-2">
            {WEEKDAYS.map((day) => (
              <span
                key={day}
                className="py-1 text-center text-[10px] font-semibold uppercase tracking-wide text-gray-400"
              >
                {day}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-0.5 px-2 pb-2">
            {cells.map((cell) => {
              const isSelected = cell.datePart === datePart;
              const isToday = cell.datePart === todayPart;

              return (
                <button
                  key={cell.datePart}
                  type="button"
                  onClick={() => {
                    onSelect(cell.datePart);
                    onOpenChange(false);
                  }}
                  className={cn(
                    "flex size-9 items-center justify-center rounded-lg text-sm transition-colors",
                    !cell.inMonth && "text-gray-300",
                    cell.inMonth && !isSelected && "text-gray-800 hover:bg-gray-100",
                    isToday && !isSelected && "font-semibold text-[#534AB7]",
                    isSelected && "bg-[#534AB7] font-semibold text-white shadow-sm",
                  )}
                >
                  {cell.day}
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-between border-t border-gray-100 px-3 py-2">
            <button
              type="button"
              onClick={() => {
                onToday();
                onOpenChange(false);
              }}
              className="text-xs font-medium text-[#534AB7] transition-colors hover:text-[#4338ca]"
            >
              Today
            </button>
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="text-xs font-medium text-gray-500 transition-colors hover:text-gray-800"
            >
              Close
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export function PublishDatePicker({ id, value, onChange }: PublishDatePickerProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [openPanel, setOpenPanel] = useState<OpenPanel>(null);

  const parsed = useMemo(() => parseValue(value), [value]);
  const preview = useMemo(() => formatPublishDatePreview(value), [value]);

  useEffect(() => {
    if (!openPanel) return;

    function handlePointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpenPanel(null);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpenPanel(null);
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [openPanel]);

  function update(
    patch: Partial<{
      datePart: string;
      hour12: number;
      minute: number;
      period: "AM" | "PM";
    }>,
  ) {
    const next = { ...parsed, ...patch };
    onChange(combinePublishDate(next.datePart, next.hour12, next.minute, next.period));
  }

  function setToday() {
    onChange(getIstDatetimeLocal());
    setOpenPanel(null);
  }

  function setOpen(panel: OpenPanel) {
    setOpenPanel((current) => (current === panel ? null : panel));
  }

  return (
    <div ref={rootRef} className="flex flex-col gap-3">
      <div className="rounded-lg border border-[#534AB7]/15 bg-[#534AB7]/4 px-3.5 py-2.5">
        <p className="text-[11px] font-medium uppercase tracking-wide text-[#534AB7]/70">
          Scheduled for
        </p>
        <p className="mt-0.5 text-sm font-medium leading-snug text-gray-900">{preview}</p>
        <p className="mt-0.5 text-[11px] text-gray-500">Asia/Kolkata (IST)</p>
      </div>

      <div>
        <p className="mb-1.5 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-gray-500">
          <CalendarDays className="size-3.5" />
          Date
        </p>
        <div className="flex flex-col gap-2 sm:flex-row">
          <CalendarPopover
            id={id ? `${id}-date` : undefined}
            datePart={parsed.datePart}
            open={openPanel === "calendar"}
            onOpenChange={(open) => setOpen(open ? "calendar" : null)}
            onSelect={(datePart) => update({ datePart })}
            onToday={setToday}
          />
          <button
            type="button"
            onClick={setToday}
            className="shrink-0 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-xs font-medium text-gray-700 transition-colors hover:border-[#534AB7]/30 hover:bg-[#534AB7]/5 hover:text-[#534AB7] sm:min-w-[7.5rem]"
          >
            Use today
          </button>
        </div>
      </div>

      <div>
        <p className="mb-1.5 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-gray-500">
          <Clock3 className="size-3.5" />
          Time
        </p>
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <FixedListDropdown
              id={id ? `${id}-hour` : undefined}
              label="Hour"
              value={parsed.hour12}
              options={HOURS}
              open={openPanel === "hour"}
              onOpenChange={(open) => setOpen(open ? "hour" : null)}
              onChange={(hour12) => update({ hour12 })}
            />
            <FixedListDropdown
              id={id ? `${id}-minute` : undefined}
              label="Minute"
              value={parsed.minute}
              options={MINUTES}
              formatOption={pad}
              open={openPanel === "minute"}
              onOpenChange={(open) => setOpen(open ? "minute" : null)}
              onChange={(minute) => update({ minute })}
            />
          </div>

          <div className="flex rounded-lg border border-gray-200 bg-gray-50 p-1">
            {(["AM", "PM"] as const).map((period) => (
              <button
                key={period}
                type="button"
                onClick={() => update({ period })}
                className={cn(
                  "flex-1 rounded-md py-2.5 text-xs font-semibold transition-colors",
                  parsed.period === period
                    ? "bg-[#534AB7] text-white shadow-sm"
                    : "text-gray-600 hover:bg-white hover:text-gray-900",
                )}
              >
                {period}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
