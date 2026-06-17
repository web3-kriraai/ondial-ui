"use client";

import { motion, useReducedMotion } from "framer-motion";

import flowStyles from "./home-features-illustrations.module.css";

const CYCLE = 6;

const ease = [0.22, 1, 0.36, 1] as const;

type LeadQualificationIllustrationProps = {
  className?: string;
};

function LeadBadge({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      <circle r="6" fill="#fff" stroke="#E6C07A" strokeWidth="0.5" />
      <text y="4" textAnchor="middle" fontSize="8" fill="#633806">
        L
      </text>
    </g>
  );
}

export function LeadQualificationIllustration({ className }: LeadQualificationIllustrationProps) {
  const prefersReducedMotion = useReducedMotion();
  const loop = prefersReducedMotion
    ? { repeat: 0 as const }
    : { duration: CYCLE, repeat: Infinity, ease: "linear" as const };

  return (
    <svg viewBox="0 0 220 160" className={className} aria-hidden xmlns="http://www.w3.org/2000/svg">
      <motion.polygon
        points="40,25 180,25 150,70 70,70"
        fill="#FAEEDA"
        stroke="#E6C07A"
        strokeWidth="0.5"
        animate={prefersReducedMotion ? undefined : { opacity: [0.9, 1, 0.9] }}
        transition={{ duration: CYCLE, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.polygon
        points="70,72 150,72 130,105 90,105"
        fill="#F5D49A"
        stroke="#E6C07A"
        strokeWidth="0.5"
        animate={prefersReducedMotion ? undefined : { opacity: [0.85, 0.85, 1, 1, 0.85] }}
        transition={{ duration: CYCLE, times: [0, 0.28, 0.38, 0.55, 1], repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.polygon
        points="90,107 130,107 118,130 102,130"
        fill="#EFA830"
        stroke="#E6C07A"
        strokeWidth="0.5"
        animate={prefersReducedMotion ? undefined : { opacity: [0.82, 0.82, 0.82, 1, 1, 0.82] }}
        transition={{ duration: CYCLE, times: [0, 0.45, 0.58, 0.68, 0.82, 1], repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Side lead — drops and filters out */}
      <motion.g
        animate={
          prefersReducedMotion
            ? { opacity: 0.35 }
            : {
              x: [68, 68, 82, 82],
              y: [18, 18, 52, 82],
              opacity: [0, 1, 1, 0],
              scale: [0.85, 1, 1, 0.85],
            }
        }
        transition={{
          ...loop,
          times: [0, 0.08, 0.38, 0.48],
          ease,
        }}
      >
        <LeadBadge x={0} y={0} />
      </motion.g>

      {/* Center lead — qualifies */}
      <motion.g
        animate={
          prefersReducedMotion
            ? { y: 108, opacity: 1 }
            : {
              y: [18, 18, 62, 108, 108, 18],
              opacity: [0, 1, 1, 1, 0, 0],
              scale: [0.9, 1, 1, 1.12, 1, 0.9],
            }
        }
        transition={{
          ...loop,
          times: [0, 0.08, 0.35, 0.62, 0.88, 1],
          ease,
        }}
      >
        <motion.g
          animate={prefersReducedMotion ? undefined : { scale: [1, 1, 1.18, 1] }}
          transition={{ duration: CYCLE, times: [0, 0.58, 0.7, 0.82], repeat: Infinity, ease: "easeOut" }}
          style={{ transformOrigin: "0px 0px" }}
        >
          <circle r="6" fill="#fff" transform="translate(108, 0)" stroke="#E6C07A" strokeWidth="0.5" />
          <text y="4" x="108" textAnchor="middle" fontSize="8" fill="#633806">
            L
          </text>
        </motion.g>
      </motion.g>

      {/* Side lead — drops and filters out */}
      <motion.g
        animate={
          prefersReducedMotion
            ? { opacity: 0.35 }
            : {
              x: [152, 152, 138, 138],
              y: [18, 18, 52, 82],
              opacity: [0, 1, 1, 0],
              scale: [0.85, 1, 1, 0.85],
            }
        }
        transition={{
          ...loop,
          times: [0, 0.08, 0.38, 0.48],
          ease,
        }}
      >
        <LeadBadge x={0} y={0} />
      </motion.g>

      <motion.g
        animate={
          prefersReducedMotion
            ? { opacity: 1 }
            : { opacity: [0, 0, 1, 1, 0, 0], y: [0, 0, 0, 0, -4, -4] }
        }
        transition={{ duration: CYCLE, times: [0, 0.28, 0.34, 0.5, 0.56, 1], repeat: Infinity, ease }}
      >
        <rect x="124" y="56" width="58" height="15" rx="7.5" fill="#fff" stroke="#E6C07A" strokeWidth="0.5" />
        <text x="153" y="66.5" textAnchor="middle" fontSize="7" fill="#633806" fontWeight="500">
          Asking questions...
        </text>
      </motion.g>

      <motion.g
        animate={prefersReducedMotion ? { opacity: 1 } : { opacity: [0, 0, 0, 1, 1, 0], x: [0, 0, 0, 0, 0, -8] }}
        transition={{ duration: CYCLE, times: [0, 0.38, 0.44, 0.5, 0.64, 0.72], repeat: Infinity, ease }}
      >
        <rect x="24" y="88" width="42" height="14" rx="7" fill="#EFA830" stroke="#E6C07A" strokeWidth="0.5" />
        <text x="44" y="98" textAnchor="middle" fontSize="7" fill="#fff" fontWeight="600">
          Hot lead
        </text>
      </motion.g>

      <motion.line
        x1="118"
        y1="124"
        x2="188"
        y2="124"
        stroke="#A3D9BE"
        strokeWidth="1"
        strokeDasharray="4,3"
        animate={prefersReducedMotion ? { opacity: 0.6 } : { opacity: [0, 0, 0, 1, 1, 0] }}
        transition={{ duration: CYCLE, times: [0, 0.62, 0.66, 0.7, 0.86, 0.92], repeat: Infinity, ease }}
      />
      <motion.circle
        r="2.5"
        fill="#085041"
        animate={
          prefersReducedMotion
            ? { cx: 154, cy: 124 }
            : { cx: [118, 118, 188, 188], cy: 124, opacity: [0, 0, 0, 1, 1, 0] }
        }
        transition={{ duration: CYCLE, times: [0, 0.66, 0.7, 0.8, 0.86, 0.92], repeat: Infinity, ease }}
      />

      <motion.g
        className={flowStyles.leadQualifiedStatic}
        animate={
          prefersReducedMotion
            ? { opacity: 1, y: 0 }
            : { opacity: [0, 0, 0, 0, 1, 1, 0], y: [14, 14, 14, 14, 0, 0, 10] }
        }
        transition={{ duration: CYCLE, times: [0, 0.68, 0.72, 0.74, 0.8, 0.9, 1], repeat: Infinity, ease }}
      >
        <rect x="74" y="135" width="72" height="18" rx="5" fill="#E1F5EE" stroke="#A3D9BE" strokeWidth="0.5" />
        <text x="110" y="148" textAnchor="middle" fontSize="8" fill="#085041" fontWeight="500">
          ✓ Qualified Lead
        </text>
      </motion.g>
    </svg>
  );
}
