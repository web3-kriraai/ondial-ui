import type { ReactNode } from "react";

import { redirectIfAuthenticated } from "@/lib/admin/session";

/** Already signed in → send to posts instead of showing login again. */
export default async function SeoLoginLayout({ children }: { children: ReactNode }) {
  await redirectIfAuthenticated();
  return <>{children}</>;
}
