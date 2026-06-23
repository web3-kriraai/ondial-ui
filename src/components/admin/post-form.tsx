"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import type { Document } from "@contentful/rich-text-types";
import {
  Save,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Trash2,
  HelpCircle,
  Plus,
  MessageSquareQuote,
} from "lucide-react";
import type { AuthorRow, PostRow, PostWithDetail } from "@/lib/db/types";
import { SEO_POSTS_PATH } from "@/config/seo-admin";
import { SEO_FETCH_INIT } from "@/lib/admin/seo-fetch";
import { normalizePostSlug, SLUG_TAKEN_CODE, SLUG_TAKEN_MESSAGE } from "@/lib/blog/post-slug";
import {
  AUTHOR_REQUIRED_MESSAGE,
  CONTENT_REQUIRED_MESSAGE,
  isPostBodyEmpty,
} from "@/lib/blog/post-validation";
import { getIstDatetimeLocal } from "@/components/admin/publish-date-picker";
import { PostFormSidebar } from "@/components/admin/post-form-sidebar";
import { RichTextEditor } from "@/components/admin/rich-text-editor";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";

type PostFormProps = {
  mode: "new" | "edit";
  postId?: string;
  initialData?: Partial<PostRow> | PostWithDetail;
  authors: AuthorRow[];
};

type FormState = {
  title: string;
  slug: string;
  meta_title: string;
  meta_description: string;
  publish_date: string;
  featured_image_url: string;
  featured_image_width: number | null;
  featured_image_height: number | null;
  author_id: string;
  category: string;
  status: "draft" | "published" | "archived";
  body: string;
  faqs_title: string;
  faqs: Array<{ question: string; answer: string }>;
};

function slugify(text: string) {
  return normalizePostSlug(text);
}

function getBodyHtml(body: unknown): string {
  if (!body) return "";
  if (typeof body === "string") return `<p>${body}</p>`;

  const b = body as Record<string, unknown>;

  // New TipTap HTML format
  if (b?.type === "html" && typeof b.content === "string") return b.content;

  // Legacy markdown — show as a preformatted block
  if (b?.type === "markdown" && typeof b.content === "string") {
    return `<pre>${(b.content as string).replace(/</g, "&lt;")}</pre>`;
  }

  // Contentful Rich Text format { json: Document, links: { assets: { block: [] } } }
  // This is what migrated posts look like
  if (b?.json && typeof b.json === "object") {
    try {
      return documentToHtmlString(b.json as Document);
    } catch {
      return "";
    }
  }

  // Bare Contentful document { nodeType: "document", content: [...] }
  if (b?.nodeType === "document") {
    try {
      return documentToHtmlString(b as unknown as Document);
    } catch {
      return "";
    }
  }

  return "";
}

function getInitialFaqsTitle(data?: Partial<PostRow> | PostWithDetail): string {
  const sections = (data as PostWithDetail)?.faq_sections;
  return sections?.[0]?.title ?? "Frequently asked questions";
}

function getInitialFaqs(
  data?: Partial<PostRow> | PostWithDetail,
): Array<{ question: string; answer: string }> {
  const sections = (data as PostWithDetail)?.faq_sections;
  if (!sections || sections.length === 0) return [];
  const items = sections[0].faq_items ?? [];
  return [...items]
    .sort((a, b) => a.sort_order - b.sort_order)
    .map((item) => ({ question: item.question, answer: item.answer }));
}

const FIELD =
  "w-full rounded-lg border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-[#534AB7] focus:bg-white focus:ring-2 focus:ring-[#534AB7]/10";

const ERROR_FIELD =
  "w-full rounded-lg border border-red-300 bg-red-50/50 px-3.5 py-2.5 text-sm text-gray-900 outline-none transition-all focus:border-red-500 focus:bg-white focus:ring-2 focus:ring-red-500/15";

function fieldClass(hasError: boolean) {
  return hasError ? ERROR_FIELD : FIELD;
}

function InlineError({ id, message }: { id: string; message: string }) {
  return (
    <p id={id} role="alert" className="mt-1.5 flex items-start gap-1 text-xs text-red-600">
      <AlertCircle className="mt-0.5 size-3 shrink-0" />
      {message}
    </p>
  );
}

const LABEL = "block text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1.5";

export function PostForm({ mode, postId, initialData, authors }: PostFormProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [slugManual, setSlugManual] = useState(!!initialData?.slug);
  const [showValidation, setShowValidation] = useState(false);
  const [slugAvailabilityError, setSlugAvailabilityError] = useState<string | null>(null);
  const [slugChecking, setSlugChecking] = useState(false);
  const slugCheckVersion = useRef(0);
  const titleRef = useRef<HTMLDivElement>(null);
  const slugRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const authorRef = useRef<HTMLDivElement>(null);

  const [form, setForm] = useState<FormState>({
    title: initialData?.title ?? "",
    slug: initialData?.slug ?? "",
    meta_title: initialData?.meta_title ?? "",
    meta_description: initialData?.meta_description ?? "",
    publish_date: getIstDatetimeLocal(initialData?.publish_date),
    featured_image_url: initialData?.featured_image_url ?? "",
    featured_image_width: initialData?.featured_image_width ?? null,
    featured_image_height: initialData?.featured_image_height ?? null,
    author_id: initialData?.author_id ?? "",
    category: initialData?.category ?? "Insights",
    status: (initialData?.status as FormState["status"]) ?? "draft",
    body: getBodyHtml(initialData?.body),
    faqs_title: getInitialFaqsTitle(initialData),
    faqs: getInitialFaqs(initialData),
  });

  function setField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => {
      const next = { ...prev, [key]: value };
      // Auto-generate slug from title unless user has manually edited it
      if (key === "title" && !slugManual) {
        next.slug = slugify(value as string);
      }
      return next;
    });
    if (key === "slug") setSlugAvailabilityError(null);
  }

  useEffect(() => {
    const normalized = slugify(form.slug);

    if (!normalized) {
      setSlugAvailabilityError(null);
      setSlugChecking(false);
      return;
    }

    const version = ++slugCheckVersion.current;
    setSlugChecking(true);

    const timer = setTimeout(async () => {
      try {
        const params = new URLSearchParams({ checkSlug: normalized });
        if (mode === "edit" && postId) params.set("excludeId", postId);

        const res = await fetch(`/api/admin/posts?${params.toString()}`, SEO_FETCH_INIT);
        if (!res.ok) return;

        const data = await res.json() as {
          available?: boolean;
          conflictTitle?: string | null;
          error?: string | null;
        };

        if (version !== slugCheckVersion.current) return;

        if (data.available) {
          setSlugAvailabilityError(null);
        } else if (data.conflictTitle) {
          setSlugAvailabilityError(`This slug is already used by “${data.conflictTitle}”.`);
        } else {
          setSlugAvailabilityError(data.error ?? SLUG_TAKEN_MESSAGE);
        }
      } finally {
        if (version === slugCheckVersion.current) setSlugChecking(false);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [form.slug, mode, postId]);

  function showToast(type: "success" | "error", message: string) {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3500);
  }

  const normalizedSlug = slugify(form.slug);
  const titleError =
    showValidation && !form.title.trim() ? "Title is required." : null;
  const slugFormatError = showValidation
    ? !normalizedSlug
      ? form.slug.trim()
        ? "URL slug is invalid."
        : "URL slug is required."
      : null
    : null;
  const slugError = slugFormatError ?? (showValidation ? slugAvailabilityError : null);
  const authorError =
    showValidation && !form.author_id ? AUTHOR_REQUIRED_MESSAGE : null;
  const contentError =
    showValidation && isPostBodyEmpty(form.body) ? CONTENT_REQUIRED_MESSAGE : null;

  function scrollToFirstError(
    fields: Array<{ ref: React.RefObject<HTMLDivElement | null>; hasError: boolean }>,
  ) {
    const target = fields.find((field) => field.hasError)?.ref.current;
    target?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setShowValidation(true);

    const hasTitleError = !form.title.trim();
    const hasSlugFormatError = !normalizedSlug;
    const hasAuthorError = !form.author_id;
    const hasContentError = isPostBodyEmpty(form.body);
    const hasSlugAvailabilityError = Boolean(slugAvailabilityError);

    if (
      hasTitleError ||
      hasSlugFormatError ||
      hasAuthorError ||
      hasContentError ||
      hasSlugAvailabilityError
    ) {
      requestAnimationFrame(() =>
        scrollToFirstError([
          { ref: titleRef, hasError: hasTitleError },
          { ref: slugRef, hasError: hasSlugFormatError || hasSlugAvailabilityError },
          { ref: contentRef, hasError: hasContentError },
          { ref: authorRef, hasError: hasAuthorError },
        ]),
      );
      showToast("error", "Please fix the highlighted fields before saving.");
      return;
    }

    if (slugChecking) {
      showToast("error", "Please wait while the slug is being checked.");
      return;
    }

    setSaving(true);

    const payload: Record<string, unknown> = {
      slug: normalizedSlug,
      title: form.title,
      meta_title: form.meta_title || null,
      meta_description: form.meta_description || null,
      // datetime-local value is in IST — append "+05:30" so Date parses it correctly
      publish_date: new Date(form.publish_date + ":00+05:30").toISOString(),
      featured_image_url: form.featured_image_url || null,
      featured_image_width: form.featured_image_width ?? null,
      featured_image_height: form.featured_image_height ?? null,
      author_id: form.author_id,
      category: form.category || "Insights",
      status: form.status,
      body: form.body ? { type: "html", content: form.body } : null,
    };

    if (form.faqs.length > 0) {
      payload.faqs = { title: form.faqs_title, items: form.faqs };
    }

    try {
      const res = await fetch(
        mode === "new"
          ? "/api/admin/posts"
          : `/api/admin/posts?id=${postId}`,
        {
          method: mode === "new" ? "POST" : "PATCH",
          ...SEO_FETCH_INIT,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );

      if (!res.ok) {
        const err = await res.json().catch(() => ({})) as { error?: string; code?: string };
        if (res.status === 409 || err.code === SLUG_TAKEN_CODE) {
          setShowValidation(true);
          setSlugAvailabilityError(err.error ?? SLUG_TAKEN_MESSAGE);
        }
        throw new Error(err.error ?? "Save failed");
      }

      showToast("success", mode === "new" ? "Post created!" : "Post saved!");
      if (mode === "new") {
        const data = await res.json() as { id?: string };
        if (data.id) router.push(`${SEO_POSTS_PATH}/${data.id}`);
      }
      router.refresh();
    } catch (err) {
      showToast("error", err instanceof Error ? err.message : "Failed to save.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!postId) return;
    setDeleting(true);
    try {
      await fetch(`/api/admin/posts?id=${postId}`, {
        method: "DELETE",
        ...SEO_FETCH_INIT,
      });
      setDeleteOpen(false);
      router.push(SEO_POSTS_PATH);
      router.refresh();
    } catch {
      showToast("error", "Delete failed.");
      setDeleting(false);
    }
  }

  function addFaq() {
    setForm((p) => ({ ...p, faqs: [...p.faqs, { question: "", answer: "" }] }));
  }

  function updateFaq(i: number, field: "question" | "answer", value: string) {
    setForm((p) => {
      const faqs = [...p.faqs];
      faqs[i] = { ...faqs[i], [field]: value };
      return { ...p, faqs };
    });
  }

  function removeFaq(i: number) {
    setForm((p) => ({ ...p, faqs: p.faqs.filter((_, idx) => idx !== i) }));
  }

  return (
    <form onSubmit={handleSave} className="flex h-full min-h-0 flex-col">
      {/* Header */}
      <div className="flex h-14 shrink-0 items-center justify-between border-b border-gray-200 bg-white px-4 md:px-6">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => router.push(SEO_POSTS_PATH)}
            className="text-xs text-gray-400 hover:text-gray-700 transition-colors"
          >
            ← Posts
          </button>
          <span className="text-gray-200">|</span>
          <h1 className="text-sm font-semibold text-gray-900">
            {mode === "new" ? "New post" : "Edit post"}
          </h1>
        </div>

        <div className="flex items-center gap-2">
          {mode === "edit" && (
            <button
              type="button"
              onClick={() => setDeleteOpen(true)}
              disabled={deleting}
              className="flex items-center gap-1.5 rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-medium text-red-600 transition-colors hover:bg-red-100"
            >
              {deleting ? <Loader2 className="size-3.5 animate-spin" /> : <Trash2 className="size-3.5" />}
              Delete
            </button>
          )}
          <button
            type="submit"
            disabled={saving || slugChecking}
            className="flex items-center gap-1.5 rounded-lg bg-[#534AB7] px-4 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-[#4338ca] disabled:opacity-60"
          >
            {saving ? <Loader2 className="size-3.5 animate-spin" /> : <Save className="size-3.5" />}
            {saving ? "Saving…" : "Save"}
          </button>
        </div>
      </div>

      {/* Delete confirm modal */}
      <ConfirmDialog
        open={deleteOpen}
        title="Delete this post?"
        description={`"${form.title || "Untitled"}" will be permanently removed. This cannot be undone.`}
        confirmLabel="Delete post"
        cancelLabel="Cancel"
        variant="danger"
        loading={deleting}
        onConfirm={handleDelete}
        onCancel={() => !deleting && setDeleteOpen(false)}
      />

      {/* Toast */}
      {toast && (
        <div
          className={`absolute right-5 top-16 z-50 flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium shadow-lg ${
            toast.type === "success"
              ? "bg-emerald-600 text-white"
              : "bg-red-600 text-white"
          }`}
        >
          {toast.type === "success" ? (
            <CheckCircle2 className="size-4" />
          ) : (
            <AlertCircle className="size-4" />
          )}
          {toast.message}
        </div>
      )}

      {/* Two-column body — single scroll area so sidebar dropdowns are not clipped */}
      <div className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden">
        <div className="mx-auto grid w-full max-w-[1440px] grid-cols-1 items-start gap-5 p-4 md:p-6 xl:grid-cols-[minmax(0,1fr)_400px] xl:gap-8 2xl:max-w-[1520px] 2xl:grid-cols-[minmax(0,1fr)_420px]">
          <div className="flex min-w-0 flex-col gap-4">
          {/* Title */}
          <div ref={titleRef} className="rounded-xl bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
            <label className={LABEL} htmlFor="title">
              Title <span className="text-red-400">*</span>
            </label>
            <input
              id="title"
              type="text"
              value={form.title}
              onChange={(e) => setField("title", e.target.value)}
              placeholder="Post title…"
              aria-invalid={Boolean(titleError)}
              aria-describedby={titleError ? "title-error" : undefined}
              className={fieldClass(Boolean(titleError))}
            />
            {titleError ? <InlineError id="title-error" message={titleError} /> : null}
            <div ref={slugRef} className="mt-2">
              <label className="mb-1 block text-[10px] font-semibold uppercase tracking-wide text-gray-400">
                URL slug
              </label>
              <div className="flex items-center gap-2">
                <span className="shrink-0 text-xs text-gray-400">/blog/</span>
                <input
                  type="text"
                  value={form.slug}
                  onChange={(e) => {
                    setSlugManual(true);
                    setField("slug", slugify(e.target.value));
                  }}
                  placeholder="post-slug"
                  aria-invalid={Boolean(slugError)}
                  aria-describedby={slugError ? "slug-error" : undefined}
                  className={`flex-1 rounded-md border bg-gray-50 px-2.5 py-1.5 text-xs font-mono text-gray-700 outline-none transition-all focus:bg-white focus:ring-1 ${
                    slugError
                      ? "border-red-300 focus:border-red-500 focus:ring-red-500/15"
                      : "border-gray-200 focus:border-[#534AB7] focus:ring-[#534AB7]/10"
                  }`}
                />
                {slugChecking && (
                  <Loader2 className="size-3.5 shrink-0 animate-spin text-gray-400" aria-hidden />
                )}
              </div>
              {slugError ? (
                <p id="slug-error" role="alert" className="mt-1.5 flex items-start gap-1 text-xs text-red-600">
                  <AlertCircle className="mt-0.5 size-3 shrink-0" />
                  {slugError}
                </p>
              ) : (
                <p className="mt-1.5 text-[11px] text-gray-400">
                  Lowercase letters, numbers, and hyphens only. Must be unique.
                </p>
              )}
            </div>
          </div>

          {/* Body editor */}
          <div ref={contentRef}>
            <label className={LABEL} htmlFor="post-content">
              Content <span className="text-red-400">*</span>
            </label>
            <div
              className={`overflow-hidden rounded-xl transition-shadow ${
                contentError ? "ring-2 ring-red-500/20" : ""
              }`}
            >
              <RichTextEditor
                content={form.body}
                onChange={(html) => setField("body", html)}
              />
            </div>
            {contentError ? (
              <InlineError id="content-error" message={contentError} />
            ) : (
              <p className="mt-1.5 text-[11px] text-gray-400">Required — add the main article text.</p>
            )}
          </div>

          {/* FAQs */}
          <div className="rounded-xl bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
            {/* Header */}
            <div className="mb-4 flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#534AB7]/10 text-[#534AB7]">
                  <HelpCircle className="size-4" strokeWidth={2} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-sm font-semibold text-gray-900">FAQs</h2>
                    <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-gray-500">
                      Optional
                    </span>
                    {form.faqs.length > 0 && (
                      <span className="rounded-full bg-[#534AB7]/10 px-2 py-0.5 text-[10px] font-semibold text-[#534AB7]">
                        {form.faqs.length} {form.faqs.length === 1 ? "item" : "items"}
                      </span>
                    )}
                  </div>
                  <p className="mt-0.5 text-xs text-gray-400">
                    Shown as an accordion at the bottom of the blog post.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={addFaq}
                className="flex shrink-0 items-center gap-1.5 rounded-lg border border-[#534AB7]/20 bg-[#534AB7]/5 px-3 py-1.5 text-xs font-semibold text-[#534AB7] transition-colors hover:border-[#534AB7]/30 hover:bg-[#534AB7]/10"
              >
                <Plus className="size-3.5" />
                Add FAQ
              </button>
            </div>

            {form.faqs.length === 0 ? (
              <button
                type="button"
                onClick={addFaq}
                className="flex w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gray-200 bg-gray-50/50 px-6 py-10 text-center transition-colors hover:border-[#534AB7]/30 hover:bg-[#534AB7]/5"
              >
                <div className="flex size-10 items-center justify-center rounded-full bg-white shadow-sm">
                  <MessageSquareQuote className="size-5 text-gray-300" />
                </div>
                <p className="text-sm font-medium text-gray-500">No FAQs yet</p>
                <p className="max-w-xs text-xs text-gray-400">
                  Add questions and answers that appear below your post content.
                </p>
                <span className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-[#534AB7]">
                  <Plus className="size-3" />
                  Add your first FAQ
                </span>
              </button>
            ) : (
              <div className="flex flex-col gap-4">
                {/* Section heading */}
                <div>
                  <label className={LABEL} htmlFor="faqs_title">
                    Section heading
                  </label>
                  <input
                    id="faqs_title"
                    type="text"
                    value={form.faqs_title}
                    onChange={(e) => setField("faqs_title", e.target.value)}
                    placeholder="Frequently asked questions"
                    className={FIELD}
                  />
                  <p className="mt-1.5 text-[11px] text-gray-400">
                    This is the title shown above the accordion on the live post.
                  </p>
                </div>

                {/* FAQ items */}
                <div className="flex flex-col gap-3">
                  {form.faqs.map((faq, i) => (
                    <div
                      key={i}
                      className="group relative overflow-hidden rounded-xl border border-gray-200 bg-gray-50/40 transition-colors hover:border-[#534AB7]/20 hover:bg-white"
                    >
                      <div className="absolute inset-y-0 left-0 w-1 bg-[#534AB7]/0 transition-colors group-hover:bg-[#534AB7]/40 group-focus-within:bg-[#534AB7]" />

                      <div className="flex items-center justify-between border-b border-gray-100 px-4 py-2.5 pl-5">
                        <div className="flex items-center gap-2">
                          <span className="flex size-6 items-center justify-center rounded-md bg-[#534AB7]/10 text-[10px] font-bold text-[#534AB7]">
                            Q{i + 1}
                          </span>
                          <span className="text-xs font-medium text-gray-500">
                            Question {i + 1}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFaq(i)}
                          title="Remove FAQ"
                          className="flex items-center gap-1 rounded-md px-2 py-1 text-xs text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600"
                        >
                          <Trash2 className="size-3.5" />
                          <span className="hidden sm:inline">Remove</span>
                        </button>
                      </div>

                      <div className="space-y-3 p-4 pl-5">
                        <div>
                          <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-gray-400">
                            Question
                          </label>
                          <input
                            type="text"
                            value={faq.question}
                            onChange={(e) => updateFaq(i, "question", e.target.value)}
                            placeholder="e.g. How much does an AI call bot cost?"
                            className={FIELD}
                          />
                        </div>
                        <div>
                          <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-gray-400">
                            Answer
                          </label>
                          <textarea
                            value={faq.answer}
                            onChange={(e) => updateFaq(i, "answer", e.target.value)}
                            placeholder="Write a clear, concise answer…"
                            rows={3}
                            className={`${FIELD} resize-y min-h-[80px]`}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={addFaq}
                  className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-dashed border-gray-200 py-2.5 text-xs font-medium text-gray-500 transition-colors hover:border-[#534AB7]/30 hover:bg-[#534AB7]/5 hover:text-[#534AB7]"
                >
                  <Plus className="size-3.5" />
                  Add another FAQ
                </button>
              </div>
            )}
          </div>
          </div>

          <PostFormSidebar
            authorRef={authorRef}
            authors={authors}
            authorError={authorError}
            form={form}
            onAuthorChange={(authorId) => setField("author_id", authorId)}
            onPublishDateChange={(value) => setField("publish_date", value)}
            onFieldChange={(key, value) => setField(key as keyof FormState, value as FormState[keyof FormState])}
            onFeaturedImageChange={(url, dims) => {
              setField("featured_image_url", url);
              setForm((prev) => ({
                ...prev,
                featured_image_url: url,
                featured_image_width: dims?.width ?? null,
                featured_image_height: dims?.height ?? null,
              }));
            }}
          />
        </div>
      </div>
    </form>
  );
}
