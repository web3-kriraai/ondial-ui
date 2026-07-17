import type { Metadata } from "next";

import { isSeoIndexable } from "./siteConfig";

/**
 * Meta robots for public pages. Always noindex/nofollow off production
 * so page-level metadata cannot override staging protection.
 */
export function indexablePageRobots(): NonNullable<Metadata["robots"]> {
  if (!isSeoIndexable()) {
    return {
      index: false,
      follow: false,
      googleBot: {
        index: false,
        follow: false,
      },
    };
  }

  return {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  };
}
