"use client";

import { motion, useReducedMotion } from "framer-motion";

const CYCLE = 6;
const popEase = [0.22, 1, 0.36, 1] as const;
const HUB = { cx: 220, cy: 80, r: 28 } as const;

const CONN_START = 0.14;
const CONN_STEP = 0.082;
const BADGE_AT = 0.66;
const PULSE_START = 0.74;
const PULSE_STEP = 0.028;
const FADE_OUT = 0.9;

const INTEGRATIONS = [
  {
    id: "calendly",
    x: 140,
    y: 12,
    w: 60,
    h: 30,
    title: "Calendly",
    sub: "Scheduling",
    line: { x1: 210, y1: 54, x2: 180, y2: 28 },
  },
  {
    id: "twilio",
    x: 240,
    y: 12,
    w: 60,
    h: 30,
    title: "Twilio",
    sub: "Voice",
    line: { x1: 230, y1: 54, x2: 260, y2: 28 },
  },
  {
    id: "hubspot",
    x: 300,
    y: 62,
    w: 58,
    h: 36,
    title: "HubSpot",
    sub: "CRM",
    line: { x1: 248, y1: 80, x2: 300, y2: 80 },
  },
  {
    id: "slack",
    x: 240,
    y: 118,
    w: 60,
    h: 30,
    title: "Slack",
    sub: "Alerts",
    line: { x1: 230, y1: 106, x2: 260, y2: 132 },
  },
  {
    id: "zapier",
    x: 140,
    y: 118,
    w: 60,
    h: 30,
    title: "Zapier",
    sub: "Automation",
    line: { x1: 210, y1: 106, x2: 180, y2: 132 },
  },
  {
    id: "salesforce",
    x: 82,
    y: 62,
    w: 58,
    h: 36,
    title: "Salesforce",
    sub: "CRM",
    line: { x1: 192, y1: 80, x2: 140, y2: 80 },
  },
] as const;

const loop = { duration: CYCLE, repeat: Infinity, ease: "linear" as const };

function connSlot(index: number) {
  return CONN_START + index * CONN_STEP;
}

function lineTimes(index: number) {
  const start = connSlot(index);
  return [0, start, start + 0.038, FADE_OUT, 1] as const;
}

function nodeTimes(index: number) {
  const start = connSlot(index);
  return [0, start + 0.032, start + 0.058, FADE_OUT, 1] as const;
}

function pulseTimes(index: number) {
  const start = PULSE_START + index * PULSE_STEP;
  return [0, start, start + 0.018, start + 0.034, 1] as const;
}

type IntegrationsFlowIllustrationProps = {
  className?: string;
};

function HubCore({ enabled }: { enabled: boolean }) {
  if (!enabled) {
    return (
      <>
        <text x={HUB.cx} y={75} textAnchor="middle" fontSize="8" fill="#534AB7" fontWeight="500">
          AI
        </text>
        <text x={HUB.cx} y={88} textAnchor="middle" fontSize="8" fill="#534AB7" fontWeight="500">
          AGENT
        </text>
      </>
    );
  }

  return (
    <>
      <motion.circle
        cx={HUB.cx}
        cy={HUB.cy}
        r={HUB.r + 10}
        fill="none"
        stroke="#A3D9BE"
        strokeWidth="0.75"
        animate={{ opacity: [0, 0, 0.45, 0, 0], scale: [0.9, 0.9, 1.15, 1.25, 0.9] }}
        transition={{ ...loop, times: [0, BADGE_AT, BADGE_AT + 0.06, BADGE_AT + 0.14, 1], ease: "easeOut" }}
        style={{ transformOrigin: `${HUB.cx}px ${HUB.cy}px` }}
      />
      <motion.circle
        cx={HUB.cx}
        cy={HUB.cy}
        r={HUB.r}
        fill="#EEEDFE"
        stroke="#CECBF6"
        strokeWidth="1"
        animate={{ opacity: [0, 1, 1, 1, 0], scale: [0.88, 1, 1, 1.025, 0.92] }}
        transition={{ ...loop, times: [0, 0.1, BADGE_AT, FADE_OUT, 1], ease: popEase }}
        style={{ transformOrigin: `${HUB.cx}px ${HUB.cy}px` }}
      />
      <motion.g
        animate={{ opacity: [0, 1, 1, 0.25, 0.25, 1, 0] }}
        transition={{ ...loop, times: [0, 0.12, 0.5, BADGE_AT, BADGE_AT + 0.04, FADE_OUT, 1], ease: "easeInOut" }}
      >
        <text x={HUB.cx} y={75} textAnchor="middle" fontSize="8" fill="#534AB7" fontWeight="500">
          AI
        </text>
        <text x={HUB.cx} y={88} textAnchor="middle" fontSize="8" fill="#534AB7" fontWeight="500">
          AGENT
        </text>
      </motion.g>
    </>
  );
}

function ConnectionWire({
  line,
  index,
  enabled,
}: {
  line: (typeof INTEGRATIONS)[number]["line"];
  index: number;
  enabled: boolean;
}) {
  if (!enabled) {
    return (
      <line
        x1={line.x1}
        y1={line.y1}
        x2={line.x2}
        y2={line.y2}
        stroke="#CECBF6"
        strokeWidth="0.5"
        strokeDasharray="3,2"
      />
    );
  }

  const times = lineTimes(index);

  return (
    <>
      <motion.line
        x1={line.x1}
        y1={line.y1}
        x2={line.x2}
        y2={line.y2}
        stroke="#CECBF6"
        strokeWidth="0.75"
        strokeDasharray="3,2"
        animate={{ pathLength: [0, 0, 1, 1, 0], opacity: [0, 0, 0.85, 0.85, 0] }}
        transition={{ ...loop, times: [...times], ease: popEase }}
      />
      <motion.circle
        r="2.5"
        fill="#7F77DD"
        animate={{
          cx: [line.x1, line.x1, line.x2, line.x2, line.x2],
          cy: [line.y1, line.y1, line.y2, line.y2, line.y2],
          opacity: [0, 0, 0.9, 0, 0],
        }}
        transition={{ ...loop, times: [...pulseTimes(index)], ease: "easeInOut" }}
      />
    </>
  );
}

function IntegrationCard({
  x,
  y,
  w,
  h,
  title,
  sub,
  index,
  enabled,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  title: string;
  sub: string;
  index: number;
  enabled: boolean;
}) {
  const cx = x + w / 2;
  const cy = y + h / 2;

  if (!enabled) {
    return (
      <g>
        <text x={cx} y={y + 16} textAnchor="middle" fontSize="8" fill="#888780">
          {title}
        </text>
        <text x={cx} y={y + 28} textAnchor="middle" fontSize="7" fill="#AFA9EC">
          {sub}
        </text>
      </g>
    );
  }

  const times = nodeTimes(index);
  const connectAt = connSlot(index) + 0.058;

  return (
    <motion.g
      animate={{ opacity: [0, 0, 1, 1, 0], scale: [0.72, 0.72, 1, 1, 0.9] }}
      transition={{ ...loop, times: [...times], ease: popEase }}
      style={{ transformOrigin: `${cx}px ${cy}px` }}
    >
      <motion.rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx="6"
        fill="#fff"
        strokeWidth="0.75"
        animate={{ stroke: ["#CECBF6", "#CECBF6", "#A3D9BE", "#CECBF6", "#CECBF6"] }}
        transition={{ ...loop, times: [0, connectAt, connectAt + 0.02, connectAt + 0.08, 1], ease: "easeOut" }}
      />
      
      <text x={cx} y={y + 14} textAnchor="middle" fontSize="9" fill="#888780" fontWeight="500">
        {title}
      </text>
      <text x={cx} y={y + 25} textAnchor="middle" fontSize="7" fill="#AFA9EC">
        {sub}
      </text>
    </motion.g>
  );
}

function ConnectedBadge({ enabled }: { enabled: boolean }) {
  if (!enabled) {
    return (
      <g>
        <rect x="174" y="68" width="92" height="24" rx="5" fill="#E1F5EE" stroke="#A3D9BE" strokeWidth="0.5" />
        <circle cx="192" cy="80" r="3" fill="#085041" />
        <text x="228" y="84" textAnchor="middle" fontSize="8" fill="#085041" fontWeight="500">
          All connected
        </text>
      </g>
    );
  }

  return (
    <motion.g
      animate={{ opacity: [0, 0, 1, 1, 0], y: [10, 10, 0, 0, 6], scale: [0.9, 0.9, 1, 1, 0.94] }}
      transition={{ ...loop, times: [0, BADGE_AT, BADGE_AT + 0.05, FADE_OUT, 1], ease: popEase }}
    >
      <rect x="174" y="68" width="92" height="24" rx="5" fill="#E1F5EE" stroke="#A3D9BE" strokeWidth="0.5" />
      <motion.circle
        cx="192"
        cy="80"
        r="3"
        fill="#085041"
        animate={{ opacity: [0, 0, 1, 1, 0], scale: [0.8, 0.8, 1, 1.1, 0.8] }}
        transition={{ ...loop, times: [0, BADGE_AT, BADGE_AT + 0.04, BADGE_AT + 0.12, 1], ease: "easeInOut" }}
        style={{ transformOrigin: "192px 80px" }}
      />
      <text x="228" y="84" textAnchor="middle" fontSize="8" fill="#085041" fontWeight="500">
        All connected
      </text>
    </motion.g>
  );
}

export function IntegrationsFlowIllustration({ className }: IntegrationsFlowIllustrationProps) {
  const prefersReducedMotion = useReducedMotion();
  const enabled = !prefersReducedMotion;

  return (
    <svg viewBox="0 0 440 160" className={className} aria-hidden xmlns="http://www.w3.org/2000/svg">
      <HubCore enabled={enabled} />

      {INTEGRATIONS.map((item, index) => (
        <ConnectionWire key={`wire-${item.id}`} line={item.line} index={index} enabled={enabled} />
      ))}

      {INTEGRATIONS.map((item, index) => (
        <IntegrationCard key={item.id} {...item} index={index} enabled={enabled} />
      ))}

      <ConnectedBadge enabled={enabled} />
    </svg>
  );
}
