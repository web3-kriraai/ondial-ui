"use client";

import { useEffect, useState, type ComponentType } from "react";

import type { MobileNavDrawerProps } from "@/components/layout/mobile-nav-drawer";

/** Loads mobile drawer JS on first menu open (desktop sessions skip this chunk). */
export function LazyMobileNavDrawer(props: MobileNavDrawerProps) {
  const [Drawer, setDrawer] = useState<ComponentType<MobileNavDrawerProps> | null>(null);

  useEffect(() => {
    if (!props.open || Drawer) return;

    void import("@/components/layout/mobile-nav-drawer").then((module) => {
      setDrawer(() => module.MobileNavDrawer);
    });
  }, [props.open, Drawer]);

  if (!props.open && !Drawer) return null;
  if (!Drawer) return null;

  return <Drawer {...props} />;
}
