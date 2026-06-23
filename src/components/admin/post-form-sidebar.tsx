"use client";

import type { ReactNode, RefObject } from "react";
import { Archive, Clock, Globe, Search } from "lucide-react";

import { AuthorSelect } from "@/components/admin/author-select";
import { ImageUpload, type ImageDimensions } from "@/components/admin/image-upload";
import { PublishDatePicker } from "@/components/admin/publish-date-picker";
import type { AuthorRow } from "@/lib/db/types";
import { cn } from "@/lib/utils";

const STATUS_OPTS = [
  { value: "draft" as const, label: "Draft", icon: Clock, color: "text-amber-600" },
  { value: "published" as const, label: "Published", icon: Globe, color: "text-emerald-600" },
  { value: "archived" as const, label: "Archived", icon: Archive, color: "text-gray-500" },
];

const FIELD =
  "w-full rounded-lg border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-[#534AB7] focus:bg-white focus:ring-2 focus:ring-[#534AB7]/10";

const LABEL = "mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-500";

const PANEL =
  "overflow-visible rounded-xl border border-gray-200/80 bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.06)]";

type PostFormSidebarProps = {
  authorRef: RefObject<HTMLDivElement | null>;
  authors: AuthorRow[];
  authorError: string | null;
  form: {
    author_id: string;
    category: string;
    featured_image_url: string;
    featured_image_width: number | null;
    featured_image_height: number | null;
    meta_description: string;
    meta_title: string;
    publish_date: string;
    status: "draft" | "published" | "archived";
    title: string;
  };
  onAuthorChange: (authorId: string) => void;
  onFeaturedImageChange: (url: string, dims?: ImageDimensions) => void;
  onFieldChange: (key: string, value: string) => void;
  onPublishDateChange: (value: string) => void;
};

function SidebarGroup({
  title,
  description,
  children,
  className,
}: {
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn(PANEL, className)}>
      <div className="mb-4 border-b border-gray-100 pb-3">
        <h2 className="text-[11px] font-bold uppercase tracking-wider text-gray-800">{title}</h2>
        {description ? (
          <p className="mt-1 text-[11px] leading-relaxed text-gray-400">{description}</p>
        ) : null}
      </div>
      <div className="flex flex-col gap-4">{children}</div>
    </section>
  );
}

function InlineError({ id, message }: { id: string; message: string }) {
  return (
    <p id={id} role="alert" className="mt-1.5 text-xs text-red-600">
      {message}
    </p>
  );
}

export function PostFormSidebar({
  authorRef,
  authors,
  authorError,
  form,
  onAuthorChange,
  onFeaturedImageChange,
  onFieldChange,
  onPublishDateChange,
}: PostFormSidebarProps) {
  return (
    <aside className="flex w-full min-w-0 flex-col gap-4 xl:sticky xl:top-0 xl:w-[400px] xl:shrink-0 xl:self-start 2xl:w-[420px]">
      <SidebarGroup title="Publish" description="Status, author, and schedule before saving.">
        <div>
          <p className={LABEL}>Status</p>
          <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-3 xl:grid-cols-1">
            {STATUS_OPTS.map(({ value, label, icon: Icon, color }) => (
              <label
                key={value}
                className={cn(
                  "flex cursor-pointer items-center gap-2.5 rounded-lg border px-3 py-2.5 text-sm transition-all",
                  form.status === value
                    ? "border-[#534AB7]/35 bg-[#534AB7]/5 shadow-sm"
                    : "border-gray-200 hover:border-gray-300 hover:bg-gray-50/80",
                )}
              >
                <input
                  type="radio"
                  name="status"
                  value={value}
                  checked={form.status === value}
                  onChange={() => onFieldChange("status", value)}
                  className="sr-only"
                />
                <Icon className={cn("size-4 shrink-0", color)} />
                <span
                  className={cn(
                    "text-xs font-medium",
                    form.status === value ? "text-gray-900" : "text-gray-600",
                  )}
                >
                  {label}
                </span>
                {form.status === value ? (
                  <span className="ml-auto size-1.5 rounded-full bg-[#534AB7]" />
                ) : null}
              </label>
            ))}
          </div>
        </div>

        <div ref={authorRef}>
          <label className={LABEL} htmlFor="author">
            Author <span className="text-red-400">*</span>
          </label>
          <AuthorSelect
            id="author"
            value={form.author_id}
            onChange={onAuthorChange}
            authors={authors}
            error={authorError}
          />
          {authorError ? (
            <InlineError id="author-error" message={authorError} />
          ) : authors.length === 0 ? (
            <p className="mt-1.5 text-[11px] text-amber-600">
              No authors yet — add one under Authors first.
            </p>
          ) : (
            <p className="mt-1.5 text-[11px] text-gray-400">Required for every post.</p>
          )}
        </div>

        <div>
          <label className={LABEL} htmlFor="publish_date">
            Publish date
          </label>
          <PublishDatePicker
            id="publish_date"
            value={form.publish_date}
            onChange={onPublishDateChange}
          />
        </div>
      </SidebarGroup>

      <SidebarGroup title="Featured image" description="Shown on the blog listing and post header.">
        <ImageUpload
          value={form.featured_image_url}
          onChange={onFeaturedImageChange}
          initialDimensions={
            form.featured_image_width && form.featured_image_height
              ? { width: form.featured_image_width, height: form.featured_image_height }
              : null
          }
          folder="blog/featured"
          placeholderAspect="video"
          label="Featured image"
        />
      </SidebarGroup>

      <SidebarGroup
        title="SEO"
        description="Search and social preview metadata."
        className="pb-6"
      >
        <div className="flex items-center gap-2 rounded-lg border border-[#534AB7]/15 bg-[#534AB7]/4 px-3 py-2">
          <Search className="size-3.5 shrink-0 text-[#534AB7]" />
          <p className="text-[11px] text-gray-600">
            Leave meta title empty to use the post title.
          </p>
        </div>

        <div>
          <label className={LABEL} htmlFor="meta_title">
            Meta title
          </label>
          <input
            id="meta_title"
            type="text"
            value={form.meta_title}
            onChange={(e) => onFieldChange("meta_title", e.target.value)}
            placeholder={form.title || "Defaults to post title"}
            className={`${FIELD} text-xs`}
          />
        </div>

        <div>
          <label className={LABEL} htmlFor="meta_description">
            Meta description
          </label>
          <textarea
            id="meta_description"
            value={form.meta_description}
            onChange={(e) => onFieldChange("meta_description", e.target.value)}
            placeholder="Short summary for Google & social (160 chars max)"
            rows={3}
            className={`${FIELD} resize-none text-xs`}
          />
          <p
            className={cn(
              "mt-1 text-right text-xs",
              form.meta_description.length > 160 ? "text-red-500" : "text-gray-400",
            )}
          >
            {form.meta_description.length}/160
          </p>
        </div>

        <div>
          <label className={LABEL} htmlFor="category">
            Category
          </label>
          <input
            id="category"
            type="text"
            value={form.category}
            onChange={(e) => onFieldChange("category", e.target.value)}
            placeholder="Insights"
            className={`${FIELD} text-xs`}
          />
        </div>
      </SidebarGroup>
    </aside>
  );
}
