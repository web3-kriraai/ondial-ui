export type PaginationItem = number | "ellipsis";

type GetPaginationRangeOptions = {
  /** Pages shown on each side of the current page. */
  siblingCount?: number;
};

/**
 * Returns a compact page list with ellipsis markers, e.g. [1, "ellipsis", 4, 5, 6, "ellipsis", 40].
 */
export function getPaginationRange(
  currentPage: number,
  totalPages: number,
  { siblingCount = 1 }: GetPaginationRangeOptions = {},
): PaginationItem[] {
  if (totalPages <= 0) return [];
  if (totalPages === 1) return [1];

  const delta = siblingCount;
  const pages: number[] = [];

  for (let page = 1; page <= totalPages; page += 1) {
    if (
      page === 1 ||
      page === totalPages ||
      (page >= currentPage - delta && page <= currentPage + delta)
    ) {
      pages.push(page);
    }
  }

  const range: PaginationItem[] = [];
  let previous: number | undefined;

  for (const page of pages) {
    if (previous !== undefined) {
      if (page - previous === 2) {
        range.push(previous + 1);
      } else if (page - previous !== 1) {
        range.push("ellipsis");
      }
    }

    range.push(page);
    previous = page;
  }

  return range;
}

export function clampPage(page: number, totalPages: number): number {
  if (totalPages <= 0) return 1;
  return Math.min(Math.max(page, 1), totalPages);
}

export function getPageSlice<T>(items: T[], currentPage: number, pageSize: number): T[] {
  const totalPages = Math.ceil(items.length / pageSize) || 1;
  const start = (clampPage(currentPage, totalPages) - 1) * pageSize;
  return items.slice(start, start + pageSize);
}

export function getPaginationSummary(
  currentPage: number,
  pageSize: number,
  totalItems: number,
): string {
  if (totalItems === 0) return "No results";

  const start = (currentPage - 1) * pageSize + 1;
  const end = Math.min(currentPage * pageSize, totalItems);

  return `Showing ${start}–${end} of ${totalItems}`;
}
