import type { ReactNode } from "react";

/** Login and other unauthenticated SEO routes — no sidebar. */
export default function SeoPublicLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
