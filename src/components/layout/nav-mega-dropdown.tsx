"use client";

import { navChevronSpring } from "@/lib/nav-dropdown-motion";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { forwardRef, type FocusEvent } from "react";

import styles from "./nav-mega-dropdown-trigger.module.css";

type NavMegaDropdownProps = {
  label: string;
  active: boolean;
  highlighted: boolean;
  open: boolean;
  triggerClassName: string;
  onPointerEnter: () => void;
  onPointerLeave: () => void;
  onFocus: () => void;
  onBlur?: (event: FocusEvent<HTMLButtonElement>) => void;
};

export const NavMegaDropdown = forwardRef<HTMLButtonElement, NavMegaDropdownProps>(
  function NavMegaDropdown(
    {
      label,
      active,
      highlighted,
      open,
      triggerClassName,
      onPointerEnter,
      onPointerLeave,
      onFocus,
      onBlur,
    },
    ref,
  ) {
    return (
      <div
        className={styles.triggerWrap}
        onMouseEnter={onPointerEnter}
        onMouseLeave={onPointerLeave}
      >
        <button
          ref={ref}
          type="button"
          data-nav-dropdown-trigger
          className={triggerClassName}
          aria-expanded={open}
          aria-haspopup="menu"
          aria-current={active ? "page" : undefined}
          onFocus={() => onFocus()}
          onBlur={(event) => onBlur?.(event)}
        >
          <span className="relative z-10 inline-flex items-center gap-1">
            {label}
            <motion.span
              animate={{ rotate: open ? 180 : 0 }}
              transition={navChevronSpring}
            >
              <ChevronDown
                className={cn("size-3.5 opacity-70", highlighted && "opacity-90")}
                aria-hidden
              />
            </motion.span>
          </span>
        </button>
      </div>
    );
  },
);
