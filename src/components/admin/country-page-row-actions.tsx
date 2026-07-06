"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import { SEO_COUNTRIES_PATH } from "@/config/seo-admin";
import { SEO_FETCH_INIT } from "@/lib/admin/seo-fetch";
import type { CountryPageRow } from "@/lib/db/types";

type CountryPageRowActionsProps = {
  countryPageId: string;
  slug: string;
  countryName: string;
  status: CountryPageRow["status"];
};

export function CountryPageRowActions({ countryPageId, slug, countryName, status }: CountryPageRowActionsProps) {
  const router = useRouter();
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  async function handleDelete() {
    setDeleting(true);
    setError("");
    try {
      const res = await fetch(`/api/admin/country-pages?id=${countryPageId}`, {
        method: "DELETE",
        ...SEO_FETCH_INIT,
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error((data as { error?: string }).error ?? "Delete failed");
      }
      setDeleteOpen(false);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete failed");
      setDeleting(false);
    }
  }

  function closeDialog() {
    if (deleting) return;
    setDeleteOpen(false);
    setError("");
  }

  return (
    <>
      <div className="flex items-center gap-2">
        <Link
          href={`${SEO_COUNTRIES_PATH}/${countryPageId}`}
          className="rounded-md px-2.5 py-1 text-xs font-medium text-[#534AB7] transition-colors hover:bg-[#534AB7]/8"
        >
          Edit
        </Link>
        {status === "published" && (
          <Link
            href={`/countries/${slug}`}
            target="_blank"
            className="rounded-md px-2.5 py-1 text-xs font-medium text-gray-500 transition-colors hover:bg-gray-100"
          >
            View ↗
          </Link>
        )}
        <button
          type="button"
          onClick={() => setDeleteOpen(true)}
          className="rounded-md px-2.5 py-1 text-xs font-medium text-red-600 transition-colors hover:bg-red-50"
        >
          Delete
        </button>
      </div>

      <ConfirmDialog
        open={deleteOpen}
        title="Delete this country page?"
        description={
          error
            ? `${error} — try again or cancel.`
            : `"${countryName}" will be permanently removed from the site and sitemap. This cannot be undone.`
        }
        confirmLabel="Delete page"
        cancelLabel="Keep page"
        variant="danger"
        loading={deleting}
        onConfirm={handleDelete}
        onCancel={closeDialog}
      />
    </>
  );
}
