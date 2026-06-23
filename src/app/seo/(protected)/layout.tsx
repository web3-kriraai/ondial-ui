import type { ReactNode } from "react";
import Link from "next/link";
import { LayoutDashboard, Users, FileText, Rss } from "lucide-react";

import { AdminNavLink } from "@/components/admin/admin-nav-link";
import { AdminLogoutButton } from "@/components/admin/admin-logout-button";
import { SEO_AUTHORS_PATH, SEO_POSTS_PATH } from "@/config/seo-admin";
import { requireAdminAuth } from "@/lib/admin/session";

export default async function SeoProtectedLayout({ children }: { children: ReactNode }) {
  await requireAdminAuth();

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#f4f4f5] font-sans">
      <aside className="flex h-full w-56 shrink-0 flex-col bg-[#0a0a0a]">
        <div className="flex h-14 items-center gap-2.5 border-b border-white/[0.06] px-5">
          <div className="flex size-7 items-center justify-center rounded-md bg-[#534AB7]">
            <Rss className="size-3.5 text-white" strokeWidth={2.5} />
          </div>
          <span className="text-sm font-semibold tracking-tight text-white">OnDial SEO</span>
        </div>

        <nav className="flex flex-1 flex-col gap-0.5 p-3 pt-4">
          <p className="mb-1.5 px-2 text-[0.625rem] font-semibold uppercase tracking-widest text-white/25">
            Content
          </p>
          <AdminNavLink href={SEO_POSTS_PATH}>
            <LayoutDashboard className="size-4 shrink-0" />
            Posts
          </AdminNavLink>
          <AdminNavLink href={SEO_AUTHORS_PATH}>
            <Users className="size-4 shrink-0" />
            Authors
          </AdminNavLink>

          <p className="mb-1.5 mt-4 px-2 text-[0.625rem] font-semibold uppercase tracking-widest text-white/25">
            Site
          </p>
          <Link
            href="/blog"
            target="_blank"
            className="flex items-center gap-2.5 rounded-md px-3 py-2 text-sm text-white/45 transition-colors hover:bg-white/[0.06] hover:text-white/80"
          >
            <FileText className="size-4 shrink-0" />
            View blog ↗
          </Link>
        </nav>

        <div className="border-t border-white/[0.06] p-3">
          <AdminLogoutButton />
        </div>
      </aside>

      <main className="flex flex-1 flex-col overflow-hidden">{children}</main>
    </div>
  );
}
