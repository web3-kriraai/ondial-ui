"use client";

import { useEffect, useState, type ComponentType } from "react";

import type { NavDropdownPortalProps } from "@/components/layout/nav-dropdown-portal";

/** Loads mega-menu panel JS/CSS on first open. */
export function LazyNavDropdownPortal(props: NavDropdownPortalProps) {
  const [Portal, setPortal] = useState<ComponentType<NavDropdownPortalProps> | null>(null);

  useEffect(() => {
    if (!props.open || Portal) return;

    import("@/components/layout/nav-dropdown-portal").then((module) => {
      setPortal(() => module.NavDropdownPortal);
    });
  }, [props.open, Portal]);

  if (!Portal) return null;

  return <Portal {...props} />;
}
