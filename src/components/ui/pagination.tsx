"use client";

import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { clampPage, getPaginationRange, getPaginationSummary, type PaginationItem } from "@/lib/pagination";
import { cn } from "@/lib/utils";

export type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
  /** Pages shown on each side of the current page. */
  siblingCount?: number;
  /** Total items for the summary line (optional). */
  totalItems?: number;
  /** Items per page for the summary line (optional). */
  pageSize?: number;
  /** Hide when only one page exists. Default true. */
  hideWhenSinglePage?: boolean;
};

function PaginationEllipsis() {
  return (
    <span
      aria-hidden
      className="flex size-9 items-center justify-center text-muted-foreground"
    >
      <MoreHorizontal className="size-4" />
    </span>
  );
}

function PaginationPageButton({
  page,
  isActive,
  onSelect,
}: {
  page: number;
  isActive: boolean;
  onSelect: (page: number) => void;
}) {
  return (
    <Button
      type="button"
      variant={isActive ? "default" : "outline"}
      size="icon"
      aria-label={`Go to page ${page}`}
      aria-current={isActive ? "page" : undefined}
      className={cn("size-9 rounded-full text-sm font-semibold", isActive && "shadow-sm")}
      onClick={() => onSelect(page)}
    >
      {page}
    </Button>
  );
}

function renderPaginationItem(
  item: PaginationItem,
  index: number,
  currentPage: number,
  onPageChange: (page: number) => void,
) {
  if (item === "ellipsis") {
    return <PaginationEllipsis key={`ellipsis-${index}`} />;
  }

  return (
    <PaginationPageButton
      key={item}
      page={item}
      isActive={item === currentPage}
      onSelect={onPageChange}
    />
  );
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className,
  siblingCount = 1,
  totalItems,
  pageSize,
  hideWhenSinglePage = true,
}: PaginationProps) {
  if (hideWhenSinglePage && totalPages <= 1) {
    return null;
  }

  const safePage = clampPage(currentPage, totalPages);
  const pages = getPaginationRange(safePage, totalPages, { siblingCount });
  const showSummary =
    totalItems !== undefined && pageSize !== undefined && totalItems > 0;

  const goToPage = (page: number) => {
    onPageChange(clampPage(page, totalPages));
  };

  return (
    <nav
      aria-label="Pagination"
      className={cn("flex flex-col items-center gap-4", className)}
    >
      {showSummary ? (
        <p className="text-sm text-muted-foreground">
          {getPaginationSummary(safePage, pageSize, totalItems)}
        </p>
      ) : null}

      <div className="flex flex-wrap items-center justify-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="icon"
          aria-label="Go to previous page"
          className="size-9 rounded-full"
          disabled={safePage <= 1}
          onClick={() => goToPage(safePage - 1)}
        >
          <ChevronLeft />
        </Button>

        <div className="flex flex-wrap items-center justify-center gap-1.5">
          {pages.map((item, index) => renderPaginationItem(item, index, safePage, goToPage))}
        </div>

        <Button
          type="button"
          variant="outline"
          size="icon"
          aria-label="Go to next page"
          className="size-9 rounded-full"
          disabled={safePage >= totalPages}
          onClick={() => goToPage(safePage + 1)}
        >
          <ChevronRight />
        </Button>
      </div>
    </nav>
  );
}
