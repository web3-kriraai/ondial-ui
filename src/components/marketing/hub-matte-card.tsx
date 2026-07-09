"use client";

import {
  BarChart3,
  Bell,
  Building2,
  Calendar,
  Car,
  Check,
  Clock,
  CreditCard,
  FileCheck,
  Filter,
  Globe2,
  GraduationCap,
  Headphones,
  Hotel,
  Languages,
  MessageSquare,
  Package,
  PhoneCall,
  PhoneForwarded,
  PhoneIncoming,
  PhoneMissed,
  Radio,
  RefreshCw,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Target,
  Users,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import type { CSSProperties, ReactNode } from "react";

import type { HubMatteTheme } from "@/lib/industries/hub-matte-theme";
import { cn } from "@/lib/utils";

import styles from "./hub-matte-card.module.css";

const ICON_MAP: Record<string, LucideIcon> = {
  "phone-missed": PhoneMissed,
  "phone-incoming": PhoneIncoming,
  "phone-forwarded": PhoneForwarded,
  clock: Clock,
  users: Users,
  calendar: Calendar,
  filter: Filter,
  target: Target,
  headphones: Headphones,
  workflow: Workflow,
  "shield-check": ShieldCheck,
  "credit-card": CreditCard,
  "message-square": MessageSquare,
  bell: Bell,
  "bar-chart": BarChart3,
  package: Package,
  "refresh-cw": RefreshCw,
  globe: Globe2,
  languages: Languages,
  sparkles: Sparkles,
  building: Building2,
  file: FileCheck,
  check: Check,
  car: Car,
  cart: ShoppingCart,
  graduation: GraduationCap,
  hotel: Hotel,
  antenna: Radio,
};

export function resolveHubMatteIcon(key: string): LucideIcon {
  return ICON_MAP[key] ?? PhoneCall;
}

type HubMatteCardProps = {
  theme: HubMatteTheme;
  title: string;
  children?: ReactNode;
  className?: string;
  titleAs?: "h3" | "p";
  titleClassName?: string;
};

export function HubMatteCard({
  theme,
  title,
  children,
  className,
  titleAs: TitleTag = "h3",
  titleClassName,
}: HubMatteCardProps) {
  const Icon = resolveHubMatteIcon(theme.iconKey);
  const cardStyle = {
    "--card-accent": theme.iconColor,
    "--card-soft": theme.iconBg,
  } as CSSProperties;

  return (
    <article className={cn(styles.matteCard, className)} style={cardStyle}>
      <div className={styles.matteCardInner}>
        <Icon className={styles.matteWatermark} strokeWidth={1.15} aria-hidden />
        <span className={styles.matteIcon} aria-hidden>
          <Icon className="size-5" strokeWidth={1.85} />
        </span>
        <TitleTag className={cn(styles.matteTitle, titleClassName)}>{title}</TitleTag>
        {children}
      </div>
    </article>
  );
}
