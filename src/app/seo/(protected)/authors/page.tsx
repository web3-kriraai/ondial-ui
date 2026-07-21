"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Plus, Loader2, Trash2, Pencil, User, CheckCircle2, AlertCircle, Save } from "lucide-react";
import type { AuthorRow } from "@/lib/db/types";
import { ImageUpload } from "@/components/admin/image-upload";
import { SEO_FETCH_INIT } from "@/lib/admin/seo-fetch";

const FIELD =
  "w-full rounded-lg border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-[#534AB7] focus:bg-white focus:ring-2 focus:ring-[#534AB7]/10";
const LABEL = "block text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1";

type Toast = { type: "success" | "error"; message: string };

type AuthorForm = {
  name: string;
  slug: string;
  designation: string;
  description: string;
  avatar_url: string;
};

const EMPTY_FORM: AuthorForm = {
  name: "",
  slug: "",
  designation: "",
  description: "",
  avatar_url: "",
};

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export default function SeoAuthorsPage() {
  const [authors, setAuthors] = useState<AuthorRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<Toast | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<AuthorForm>(EMPTY_FORM);

  function showToastMsg(type: "success" | "error", message: string) {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3000);
  }

  const fetchAuthors = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/authors", SEO_FETCH_INIT);
      if (!res.ok) {
        setAuthors([]);
        return;
      }
      const data = await res.json();
      setAuthors(Array.isArray(data) ? data : []);
    } catch {
      setAuthors([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAuthors();
  }, [fetchAuthors]);

  function resetForm() {
    setForm(EMPTY_FORM);
    setEditingId(null);
    setShowForm(false);
  }

  function openCreateForm() {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setShowForm(true);
  }

  function openEditForm(author: AuthorRow) {
    setEditingId(author.id);
    setForm({
      name: author.name ?? "",
      slug: author.slug ?? "",
      designation: author.designation ?? "",
      description: author.description ?? "",
      avatar_url: author.avatar_url ?? "",
    });
    setShowForm(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    const payload = {
      ...form,
      slug: (form.slug || slugify(form.name)).trim().toLowerCase(),
      designation: form.designation || null,
      description: form.description || null,
      avatar_url: form.avatar_url || null,
    };

    try {
      const res = editingId
        ? await fetch(`/api/admin/authors?id=${editingId}`, {
            method: "PATCH",
            ...SEO_FETCH_INIT,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          })
        : await fetch("/api/admin/authors", {
            method: "POST",
            ...SEO_FETCH_INIT,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });

      if (!res.ok) {
        const err = (await res.json()) as { error?: string };
        throw new Error(err.error ?? "Failed");
      }

      showToastMsg("success", editingId ? "Author updated!" : "Author created!");
      resetForm();
      fetchAuthors();
    } catch (err) {
      showToastMsg("error", err instanceof Error ? err.message : "Error");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string, name: string) {
    if (!confirm(`Delete author "${name}"? This will fail if they have posts.`)) return;
    const res = await fetch(`/api/admin/authors?id=${id}`, {
      method: "DELETE",
      ...SEO_FETCH_INIT,
    });
    if (res.ok) {
      showToastMsg("success", "Author deleted.");
      if (editingId === id) resetForm();
      fetchAuthors();
    } else {
      showToastMsg("error", "Delete failed — author may have posts.");
    }
  }

  const isEditing = Boolean(editingId);

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <div className="flex h-14 shrink-0 items-center justify-between border-b border-gray-200 bg-white px-6">
        <div>
          <h1 className="text-sm font-semibold text-gray-900">Authors</h1>
          <p className="text-xs text-gray-400">{authors.length} total</p>
        </div>
        <button
          onClick={() => (showForm && !isEditing ? resetForm() : openCreateForm())}
          className="flex items-center gap-1.5 rounded-lg bg-[#534AB7] px-3.5 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#4338ca]"
        >
          <Plus className="size-3.5" /> New author
        </button>
      </div>

      {toast && (
        <div
          className={`absolute right-5 top-16 z-50 flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium shadow-lg ${
            toast.type === "success" ? "bg-emerald-600 text-white" : "bg-red-600 text-white"
          }`}
        >
          {toast.type === "success" ? <CheckCircle2 className="size-4" /> : <AlertCircle className="size-4" />}
          {toast.message}
        </div>
      )}

      <div className="flex-1 overflow-y-auto p-4">
        {showForm && (
          <form onSubmit={handleSubmit} className="mb-4 rounded-xl bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
            <h2 className="mb-4 text-sm font-semibold text-gray-900">
              {isEditing ? "Edit Author" : "New Author"}
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={LABEL}>Name *</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) =>
                    setForm((p) => ({
                      ...p,
                      name: e.target.value,
                      slug: isEditing ? p.slug : slugify(e.target.value),
                    }))
                  }
                  placeholder="Jane Smith"
                  className={FIELD}
                  required
                />
              </div>
              <div>
                <label className={LABEL}>Slug *</label>
                <input
                  type="text"
                  value={form.slug}
                  onChange={(e) => setForm((p) => ({ ...p, slug: e.target.value }))}
                  placeholder="jane-smith"
                  className={`${FIELD} font-mono`}
                  required
                />
              </div>
              <div>
                <label className={LABEL}>Designation</label>
                <input
                  type="text"
                  value={form.designation}
                  onChange={(e) => setForm((p) => ({ ...p, designation: e.target.value }))}
                  placeholder="CTO at OnDial"
                  className={FIELD}
                />
              </div>
              <div className="col-span-2">
                <label className={LABEL}>Avatar</label>
                <ImageUpload
                  value={form.avatar_url}
                  onChange={(url) => setForm((p) => ({ ...p, avatar_url: url }))}
                  folder="blog/authors"
                  placeholderAspect="square"
                  label="Avatar"
                />
              </div>
              <div className="col-span-2">
                <label className={LABEL}>Bio</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
                  placeholder="Short bio paragraph…"
                  rows={3}
                  className={`${FIELD} resize-none`}
                />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <button
                type="submit"
                disabled={saving}
                className="flex items-center gap-1.5 rounded-lg bg-[#534AB7] px-4 py-2 text-xs font-semibold text-white hover:bg-[#4338ca] disabled:opacity-60"
              >
                {saving ? (
                  <Loader2 className="size-3.5 animate-spin" />
                ) : isEditing ? (
                  <Save className="size-3.5" />
                ) : (
                  <Plus className="size-3.5" />
                )}
                {isEditing ? "Save changes" : "Create author"}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="rounded-lg border border-gray-200 px-4 py-2 text-xs font-medium text-gray-500 hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="size-6 animate-spin text-gray-300" />
          </div>
        ) : authors.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 rounded-xl bg-white py-20 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
            <User className="size-10 text-gray-300" strokeWidth={1.5} />
            <p className="text-sm font-medium text-gray-500">No authors yet</p>
          </div>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {authors.map((author) => (
              <div
                key={author.id}
                className={`rounded-xl bg-white p-4 shadow-[0_1px_3px_rgba(0,0,0,0.06)] ${
                  editingId === author.id ? "ring-2 ring-[#534AB7]/30" : ""
                }`}
              >
                <div className="flex items-start gap-3">
                  {author.avatar_url ? (
                    <div className="relative size-10 shrink-0 overflow-hidden rounded-full bg-gray-100">
                      <Image src={author.avatar_url} alt={author.name} fill className="object-cover" unoptimized />
                    </div>
                  ) : (
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#534AB7]/10 text-[#534AB7]">
                      <User className="size-5" />
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-gray-900">{author.name}</p>
                    {author.designation && (
                      <p className="truncate text-xs text-gray-500">{author.designation}</p>
                    )}
                    <p className="mt-0.5 font-mono text-xs text-gray-400">/blog/author/{author.slug}</p>
                  </div>
                  <div className="flex shrink-0 items-center gap-0.5">
                    <button
                      type="button"
                      onClick={() => openEditForm(author)}
                      className="rounded p-1 text-gray-300 transition-colors hover:text-[#534AB7]"
                      title="Edit author"
                    >
                      <Pencil className="size-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(author.id, author.name)}
                      className="rounded p-1 text-gray-300 transition-colors hover:text-red-500"
                      title="Delete author"
                    >
                      <Trash2 className="size-3.5" />
                    </button>
                  </div>
                </div>
                {author.description && (
                  <p className="mt-3 text-xs leading-relaxed text-gray-500 line-clamp-2">{author.description}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
