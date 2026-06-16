"use client";

import { Building2, Globe2, HeartPulse, Store } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

import {
  ABOUT_MISSION_CUSTOMERS,
  ABOUT_MISSION_INDUSTRIES,
  type MissionCustomerId,
  type MissionIndustryId,
} from "@/data/about-mission-content";
import { cn } from "@/lib/utils";

const easeOut = [0.22, 1, 0.36, 1] as const;

const industryMeta: Record<
  MissionIndustryId,
  { icon: typeof HeartPulse; iconClass: string }
> = {
  health: { icon: HeartPulse, iconClass: "bg-[#e1f5ee] text-[#085041]" },
  retail: { icon: Store, iconClass: "bg-[#e6f1fb] text-[#0c447c]" },
  enterprise: { icon: Building2, iconClass: "bg-[#faeeda] text-[#633806]" },
  "more-industries": { icon: Globe2, iconClass: "bg-[#e6f1fb] text-[#0c447c]" },
};

const customerToneClass: Record<MissionCustomerId, string> = {
  c1: "bg-[#e6f1fb] text-[#0c447c]",
  c2: "bg-[#e1f5ee] text-[#085041]",
  c3: "bg-[hsl(var(--section-accent-h)_var(--section-accent-s)_var(--section-accent-l)/0.14)] text-[hsl(var(--section-accent-h)_var(--section-accent-s)_calc(var(--section-accent-l)-18%))]",
  c4: "bg-[#faeeda] text-[#633806]",
};

type AboutMissionHubVisualProps = {
  show: boolean;
};

function ConnectorPath({
  d,
  stroke,
  prefersReducedMotion,
}: {
  d: string;
  stroke: string;
  prefersReducedMotion: boolean | null;
}) {
  return (
    <motion.path
      d={d}
      fill="none"
      stroke={stroke}
      strokeWidth="2"
      strokeLinecap="round"
      initial={prefersReducedMotion ? undefined : { strokeDashoffset: 0 }}
      strokeDasharray={prefersReducedMotion ? undefined : "6 5"}
      animate={prefersReducedMotion ? undefined : { strokeDashoffset: -44 }}
      transition={
        prefersReducedMotion
          ? undefined
          : { duration: 24, repeat: Infinity, ease: "linear", repeatType: "loop" }
      }
    />
  );
}

function DesktopConnectors({ prefersReducedMotion }: { prefersReducedMotion: boolean | null }) {
  return (
    <svg
      className="pointer-events-none absolute inset-0 hidden h-full w-full sm:block"
      viewBox="0 0 560 320"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
    >
      <defs>
        <linearGradient id="mission-line-in" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="hsl(262 83% 58% / 0.35)" />
          <stop offset="100%" stopColor="hsl(262 83% 58% / 0.65)" />
        </linearGradient>
        <linearGradient id="mission-line-out" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="hsl(262 83% 58% / 0.65)" />
          <stop offset="100%" stopColor="hsl(262 83% 58% / 0.25)" />
        </linearGradient>
      </defs>

      <ConnectorPath
        prefersReducedMotion={prefersReducedMotion}
        d="M 200 58 C 200 95, 240 105, 280 118"
        stroke="url(#mission-line-in)"
      />
      <ConnectorPath
        prefersReducedMotion={prefersReducedMotion}
        d="M 360 58 C 360 95, 320 105, 280 118"
        stroke="url(#mission-line-in)"
      />
      <ConnectorPath
        prefersReducedMotion={prefersReducedMotion}
        d="M 280 168 C 280 205, 64 215, 64 268"
        stroke="url(#mission-line-out)"
      />
      <ConnectorPath
        prefersReducedMotion={prefersReducedMotion}
        d="M 280 168 C 280 205, 184 215, 184 268"
        stroke="url(#mission-line-out)"
      />
      <ConnectorPath
        prefersReducedMotion={prefersReducedMotion}
        d="M 280 168 C 280 205, 376 215, 376 268"
        stroke="url(#mission-line-out)"
      />
      <ConnectorPath
        prefersReducedMotion={prefersReducedMotion}
        d="M 280 168 C 280 205, 496 215, 504 268"
        stroke="url(#mission-line-out)"
      />
    </svg>
  );
}

function MobileConnectors({ prefersReducedMotion }: { prefersReducedMotion: boolean | null }) {
  return (
    <svg
      className="pointer-events-none absolute inset-0 block h-full w-full sm:hidden"
      viewBox="0 0 300 400"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
    >
      <defs>
        <linearGradient id="mission-line-in-mobile" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="hsl(262 83% 58% / 0.35)" />
          <stop offset="100%" stopColor="hsl(262 83% 58% / 0.65)" />
        </linearGradient>
        <linearGradient id="mission-line-out-mobile" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="hsl(262 83% 58% / 0.65)" />
          <stop offset="100%" stopColor="hsl(262 83% 58% / 0.25)" />
        </linearGradient>
      </defs>

      <ConnectorPath
        prefersReducedMotion={prefersReducedMotion}
        d="M 98 46 C 98 88, 118 118, 150 138"
        stroke="url(#mission-line-in-mobile)"
      />
      <ConnectorPath
        prefersReducedMotion={prefersReducedMotion}
        d="M 202 46 C 202 88, 182 118, 150 138"
        stroke="url(#mission-line-in-mobile)"
      />
      <ConnectorPath
        prefersReducedMotion={prefersReducedMotion}
        d="M 150 188 C 150 218, 78 236, 78 276"
        stroke="url(#mission-line-out-mobile)"
      />
      <ConnectorPath
        prefersReducedMotion={prefersReducedMotion}
        d="M 150 188 C 150 218, 222 236, 222 276"
        stroke="url(#mission-line-out-mobile)"
      />
      <ConnectorPath
        prefersReducedMotion={prefersReducedMotion}
        d="M 150 198 C 112 262, 78 300, 78 342"
        stroke="url(#mission-line-out-mobile)"
      />
      <ConnectorPath
        prefersReducedMotion={prefersReducedMotion}
        d="M 150 198 C 188 262, 222 300, 222 342"
        stroke="url(#mission-line-out-mobile)"
      />
    </svg>
  );
}

export function AboutMissionHubVisual({ show }: AboutMissionHubVisualProps) {
  const prefersReducedMotion = useReducedMotion();

  const nodeMotion = (delay: number) =>
    prefersReducedMotion
      ? {}
      : {
          initial: { opacity: 0, scale: 0.92, y: 10 },
          animate: show ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.92, y: 10 },
          transition: { duration: 0.5, ease: easeOut, delay },
        };

  return (
    <div
      className="relative grid w-full min-h-86 grid-rows-[auto_auto_auto] justify-items-center gap-4 px-1 py-2 pb-3 min-[400px]:min-h-90 min-[400px]:gap-[1.1rem] min-[400px]:px-2 min-[400px]:pb-[0.85rem] sm:flex sm:min-h-[clamp(18rem,42vw,22rem)] sm:flex-col sm:items-center sm:gap-[clamp(1.25rem,3.5vw,1.75rem)] sm:px-[clamp(0.5rem,2vw,1rem)] sm:py-[clamp(1rem,3vw,1.5rem)]"
      aria-hidden
    >
      <DesktopConnectors prefersReducedMotion={prefersReducedMotion} />
      <MobileConnectors prefersReducedMotion={prefersReducedMotion} />

      <motion.div
        className="relative z-1 flex w-full flex-col items-center gap-[0.4rem] sm:gap-2"
        {...nodeMotion(0.08)}
      >
        <div className="flex items-center justify-center pr-2 sm:pr-[0.65rem]">
          {ABOUT_MISSION_CUSTOMERS.map((customer, index) => (
            <span
              key={customer.id}
              className={cn(
                "grid h-8.5 w-8.5 shrink-0 place-items-center rounded-full border-2 border-background text-[0.5625rem] font-bold tracking-[-0.02em] shadow-[0_4px_14px_-8px_rgb(15_23_42/0.2)] min-[400px]:h-9.5 min-[400px]:w-9.5 min-[400px]:text-[0.625rem] sm:h-11 sm:w-11 sm:text-[0.6875rem]",
                index === 0 ? "ml-0" : "-ml-2 min-[400px]:-ml-[0.55rem] sm:-ml-[0.65rem]",
                customerToneClass[customer.id],
              )}
              style={{ zIndex: ABOUT_MISSION_CUSTOMERS.length - index }}
            >
              {customer.initials}
            </span>
          ))}
        </div>
        <span className="text-[0.6875rem] font-semibold tracking-[0.01em] text-foreground min-[400px]:text-[0.71875rem] sm:text-xs sm:tracking-[0.02em]">
          Customers
        </span>
      </motion.div>

      <motion.div
        className="relative z-2 flex flex-col items-center gap-[0.45rem] p-1 sm:gap-[0.55rem] sm:p-[0.35rem_0.5rem]"
        {...nodeMotion(0.2)}
      >
        <span className="pointer-events-none absolute -inset-x-4 -inset-y-[0.65rem] rounded-full bg-[radial-gradient(circle,hsl(var(--section-accent-h)_var(--section-accent-s)_var(--section-accent-l)/0.12)_0%,transparent_70%)]" />
        <span className="relative grid h-13 w-13 place-items-center rounded-[0.875rem] border-[1.5px] border-[hsl(var(--section-accent-h)_var(--section-accent-s)_var(--section-accent-l)/0.45)] bg-[linear-gradient(145deg,hsl(var(--section-accent-h)_var(--section-accent-s)_var(--section-accent-l)/0.14),var(--background)_35%)] min-[400px]:h-14 min-[400px]:w-14 sm:h-16 sm:w-16 sm:rounded-[1.125rem]">
          <Image
            src="/home/logo-home.png"
            alt=""
            width={44}
            height={44}
            className="h-8 w-8 object-contain min-[400px]:h-9 min-[400px]:w-9 sm:h-11 sm:w-11"
          />
        </span>
        <span className="relative rounded-lg border border-black/8 bg-background px-1.5 py-0.5 text-[0.6875rem] font-bold tracking-[0.04em] whitespace-nowrap text-foreground uppercase min-[400px]:text-xs sm:px-2 sm:text-[0.8125rem]">
          OnDial AI
        </span>
      </motion.div>

      <div className="relative z-1 grid w-full max-w-58 grid-cols-2 gap-x-2.5 gap-y-3.5 min-[400px]:max-w-64 min-[400px]:gap-x-3 min-[400px]:gap-y-4 sm:flex sm:max-w-xl sm:flex-wrap sm:items-start sm:justify-center sm:gap-[clamp(0.65rem,2.5vw,1rem)]">
        {ABOUT_MISSION_INDUSTRIES.map((industry, index) => {
          const { icon: Icon, iconClass } = industryMeta[industry.id];
          const isWrappedLabel = index >= 2;

          return (
            <motion.div
              key={industry.id}
              className="flex w-full min-w-0 flex-col items-center gap-[0.45rem] text-center sm:min-w-19 sm:w-auto sm:gap-[0.65rem]"
              {...nodeMotion(0.32 + index * 0.07)}
            >
              <span
                className={cn(
                  "grid h-9 w-9 shrink-0 place-items-center rounded-full border border-black/8 bg-background shadow-[0_4px_16px_-10px_rgb(15_23_42/0.2)] min-[400px]:h-10 min-[400px]:w-10 sm:h-11 sm:w-11",
                  iconClass,
                )}
              >
                <Icon className="h-4 w-4 min-[400px]:h-4.25 min-[400px]:w-4.25 sm:h-4.5 sm:w-4.5" strokeWidth={1.75} />
              </span>
              <span
                className={cn(
                  "text-[0.6875rem] font-semibold tracking-[0.01em] leading-[1.3] text-foreground min-[400px]:text-[0.71875rem] sm:text-xs sm:leading-normal sm:tracking-[0.02em]",
                  isWrappedLabel && "max-w-22 leading-tight sm:max-w-none",
                )}
              >
                {industry.label}
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
