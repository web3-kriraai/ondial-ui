import { Suspense } from "react";
import Link from "next/link";
import { PlusCircle, FileText, Globe, Archive, Clock, ChevronLeft, ChevronRight } from "lucide-react";

import { SEO_POSTS_PATH } from "@/config/seo-admin";
import { createServerClient } from "@/lib/db/client";
import type { PostRow } from "@/lib/db/types";
import { PostsSearch } from "@/components/admin/posts-search";
import { PostRowActions } from "@/components/admin/post-row-actions";

const PER_PAGE = 20;

type StatusFilter = "all" | PostRow["status"];

type PostsResult = {
  posts: (PostRow & { authors: { name: string } | null })[];
  total: number;
  counts: Record<StatusFilter, number>;
};

async function getPosts(
  page: number,
  status: StatusFilter,
  search: string,
): Promise<PostsResult> {
  const supabase = createServerClient();
  const start = (page - 1) * PER_PAGE;
  const end = start + PER_PAGE - 1;

  const [allCount, publishedCount, draftCount, archivedCount] = await Promise.all([
    supabase.from("posts").select("id", { count: "exact", head: true }),
    supabase.from("posts").select("id", { count: "exact", head: true }).eq("status", "published"),
    supabase.from("posts").select("id", { count: "exact", head: true }).eq("status", "draft"),
    supabase.from("posts").select("id", { count: "exact", head: true }).eq("status", "archived"),
  ]);

  const counts: Record<StatusFilter, number> = {
    all: allCount.count ?? 0,
    published: publishedCount.count ?? 0,
    draft: draftCount.count ?? 0,
    archived: archivedCount.count ?? 0,
  };

  let query = supabase
    .from("posts")
    .select("id, slug, title, status, category, publish_date, updated_at, authors(name)", {
      count: "exact",
    })
    .order("publish_date", { ascending: false })
    .range(start, end);

  if (status !== "all") query = query.eq("status", status);
  if (search) query = query.ilike("title", `%${search}%`);

  const { data, count } = await query;

  return {
    posts: (data ?? []) as unknown as PostsResult["posts"],
    total: count ?? 0,
    counts,
  };
}

const STATUS_CONFIG = {
  published: { label: "Published", icon: Globe, color: "text-emerald-600 bg-emerald-50 border-emerald-200" },
  draft: { label: "Draft", icon: Clock, color: "text-amber-600 bg-amber-50 border-amber-200" },
  archived: { label: "Archived", icon: Archive, color: "text-gray-500 bg-gray-100 border-gray-200" },
} as const;

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  });
}

function buildUrl(params: Record<string, string | number | undefined>, base = SEO_POSTS_PATH) {
  const p = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== "" && v !== "all") p.set(k, String(v));
  }
  const qs = p.toString();
  return qs ? `${base}?${qs}` : base;
}

type Props = {
  searchParams: Promise<{ page?: string; status?: string; q?: string }>;
};

export default async function SeoPostsPage({ searchParams }: Props) {
  const sp = await searchParams;
  const page = Math.max(1, parseInt(sp.page ?? "1", 10));
  const status = (["all", "published", "draft", "archived"].includes(sp.status ?? "")
    ? sp.status
    : "all") as StatusFilter;
  const search = (sp.q ?? "").trim();

  const { posts, total, counts } = await getPosts(page, status, search);
  const totalPages = Math.max(1, Math.ceil(total / PER_PAGE));

  const STATUS_TABS: { key: StatusFilter; label: string }[] = [
    { key: "all", label: "All" },
    { key: "published", label: "Published" },
    { key: "draft", label: "Draft" },
    { key: "archived", label: "Archived" },
  ];

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <div className="flex h-14 shrink-0 items-center justify-between border-b border-gray-200 bg-white px-6">
        <div>
          <h1 className="text-sm font-semibold text-gray-900">Posts</h1>
          <p className="text-xs text-gray-400">{counts.all} total</p>
        </div>
        <Link
          href={`${SEO_POSTS_PATH}/new`}
          className="flex items-center gap-1.5 rounded-lg bg-[#534AB7] px-3.5 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#4338ca]"
        >
          <PlusCircle className="size-3.5" /> New post
        </Link>
      </div>

      <div className="grid shrink-0 grid-cols-4 gap-3 p-4">
        {(["all", "published", "draft", "archived"] as const).map((key) => (
          <Link
            key={key}
            href={buildUrl({ status: key === "all" ? undefined : key })}
            className={`rounded-xl px-4 py-3 shadow-[0_1px_3px_rgba(0,0,0,0.06)] transition-all ${
              status === key
                ? "bg-[#534AB7] text-white"
                : "bg-white hover:shadow-[0_2px_6px_rgba(0,0,0,0.1)]"
            }`}
          >
            <p
              className={`text-[0.65rem] font-semibold uppercase tracking-wider mb-0.5 ${status === key ? "text-white/70" : "text-gray-400"}`}
            >
              {key === "all" ? "Total" : key.charAt(0).toUpperCase() + key.slice(1)}
            </p>
            <p className={`text-2xl font-bold ${status === key ? "text-white" : "text-gray-900"}`}>
              {counts[key]}
            </p>
          </Link>
        ))}
      </div>

      <div className="flex shrink-0 items-center justify-between gap-3 border-b border-gray-100 bg-white px-4 py-2">
        <div className="flex items-center gap-0.5">
          {STATUS_TABS.map(({ key, label }) => (
            <Link
              key={key}
              href={buildUrl({ status: key === "all" ? undefined : key, q: search || undefined })}
              className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                status === key
                  ? "bg-[#534AB7]/10 text-[#534AB7]"
                  : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              }`}
            >
              {label}
              <span
                className={`rounded-full px-1.5 py-0.5 text-[10px] font-semibold ${
                  status === key ? "bg-[#534AB7] text-white" : "bg-gray-100 text-gray-500"
                }`}
              >
                {counts[key]}
              </span>
            </Link>
          ))}
        </div>

        <Suspense>
          <PostsSearch defaultValue={search} />
        </Suspense>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-4 pt-3">
        {posts.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 rounded-xl bg-white py-20 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
            <FileText className="size-10 text-gray-300" strokeWidth={1.5} />
            <p className="text-sm font-medium text-gray-500">
              {search ? `No posts matching "${search}"` : "No posts yet"}
            </p>
            {!search && (
              <Link
                href={`${SEO_POSTS_PATH}/new`}
                className="mt-1 rounded-lg bg-[#534AB7] px-4 py-2 text-xs font-semibold text-white hover:bg-[#4338ca]"
              >
                Create your first post
              </Link>
            )}
          </div>
        ) : (
          <div className="overflow-hidden rounded-xl bg-white shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Title
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Status
                  </th>
                  <th className="hidden px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-400 md:table-cell">
                    Author
                  </th>
                  <th className="hidden px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-400 lg:table-cell">
                    Published
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {posts.map((post) => {
                  const cfg = STATUS_CONFIG[post.status] ?? STATUS_CONFIG.draft;
                  const Icon = cfg.icon;
                  return (
                    <tr key={post.id} className="group transition-colors hover:bg-gray-50/60">
                      <td className="px-4 py-3.5">
                        <div>
                          <p className="font-medium text-gray-900 line-clamp-1 group-hover:text-[#534AB7] transition-colors">
                            {post.title}
                          </p>
                          <p className="mt-0.5 font-mono text-xs text-gray-400">/blog/{post.slug}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3.5">
                        <span
                          className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium ${cfg.color}`}
                        >
                          <Icon className="size-3" />
                          {cfg.label}
                        </span>
                      </td>
                      <td className="hidden px-4 py-3.5 text-xs text-gray-500 md:table-cell">
                        {(post as { authors?: { name: string } | null }).authors?.name ?? (
                          <span className="text-gray-300">—</span>
                        )}
                      </td>
                      <td className="hidden px-4 py-3.5 text-xs text-gray-500 lg:table-cell">
                        {formatDate(post.publish_date)}
                      </td>
                      <td className="px-4 py-3.5">
                        <PostRowActions
                          postId={post.id}
                          slug={post.slug}
                          title={post.title}
                          status={post.status}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex shrink-0 items-center justify-between border-t border-gray-100 bg-white px-4 py-3">
          <p className="text-xs text-gray-500">
            Showing{" "}
            <span className="font-medium text-gray-800">
              {(page - 1) * PER_PAGE + 1}–{Math.min(page * PER_PAGE, total)}
            </span>{" "}
            of <span className="font-medium text-gray-800">{total}</span> posts
          </p>

          <div className="flex items-center gap-1">
            {page > 1 ? (
              <Link
                href={buildUrl({ page: page - 1, status: status === "all" ? undefined : status, q: search || undefined })}
                className="flex h-7 w-7 items-center justify-center rounded-md border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors"
              >
                <ChevronLeft className="size-3.5" />
              </Link>
            ) : (
              <span className="flex h-7 w-7 items-center justify-center rounded-md border border-gray-100 text-gray-300 cursor-not-allowed">
                <ChevronLeft className="size-3.5" />
              </span>
            )}

            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 2)
              .reduce<(number | "…")[]>((acc, p, idx, arr) => {
                if (idx > 0 && p - (arr[idx - 1] as number) > 1) acc.push("…");
                acc.push(p);
                return acc;
              }, [])
              .map((p, i) =>
                p === "…" ? (
                  <span key={`ellipsis-${i}`} className="flex h-7 w-7 items-center justify-center text-xs text-gray-400">
                    …
                  </span>
                ) : (
                  <Link
                    key={p}
                    href={buildUrl({ page: p === 1 ? undefined : p, status: status === "all" ? undefined : status, q: search || undefined })}
                    className={`flex h-7 w-7 items-center justify-center rounded-md text-xs font-medium transition-colors ${
                      p === page
                        ? "bg-[#534AB7] text-white"
                        : "border border-gray-200 text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {p}
                  </Link>
                ),
              )}

            {page < totalPages ? (
              <Link
                href={buildUrl({ page: page + 1, status: status === "all" ? undefined : status, q: search || undefined })}
                className="flex h-7 w-7 items-center justify-center rounded-md border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors"
              >
                <ChevronRight className="size-3.5" />
              </Link>
            ) : (
              <span className="flex h-7 w-7 items-center justify-center rounded-md border border-gray-100 text-gray-300 cursor-not-allowed">
                <ChevronRight className="size-3.5" />
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
