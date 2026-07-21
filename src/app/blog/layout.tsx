import type { Metadata } from "next";
import type { ReactNode } from "react";

/** Blog routes use CMS/meta titles as-is — no root `| OnDial` suffix. */
export const metadata: Metadata = {
  title: {
    template: "%s",
  },
};

export default function BlogLayout({ children }: { children: ReactNode }) {
  return children;
}
