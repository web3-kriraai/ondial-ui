"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

import { SEO_LOGIN_PATH } from "@/config/seo-admin";
import { SEO_FETCH_INIT } from "@/lib/admin/seo-fetch";

export function AdminLogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/auth", { method: "DELETE", ...SEO_FETCH_INIT });
    router.push(SEO_LOGIN_PATH);
    router.refresh();
  }

  return (
    <button
      onClick={handleLogout}
      className="flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-sm text-white/40 transition-colors hover:bg-white/[0.06] hover:text-white/80"
    >
      <LogOut className="size-4 shrink-0" />
      Sign out
    </button>
  );
}
