"use client";

import styles from "./integrations-illustration.module.css";

type IntegrationsFlowIllustrationProps = {
  className?: string;
};

const INTEGRATIONS = [
  {
    id: "calendly",
    cx: 170,
    cy: 22,
    title: "Calendly",
    sub: "Scheduling",
    lineClass: styles.intgWire1,
    cardClass: styles.intgCard1,
    lx1: 215,
    ly1: 57,
    lx2: 182,
    ly2: 33,
  },
  {
    id: "twilio",
    cx: 270,
    cy: 22,
    title: "Twilio",
    sub: "Voice",
    lineClass: styles.intgWire2,
    cardClass: styles.intgCard2,
    lx1: 225,
    ly1: 57,
    lx2: 258,
    ly2: 33,
  },
  {
    id: "hubspot",
    cx: 314,
    cy: 73,
    title: "HubSpot",
    sub: "CRM",
    lineClass: styles.intgWire3,
    cardClass: styles.intgCard3,
    lx1: 249,
    ly1: 80,
    lx2: 299,
    ly2: 80,
  },
  {
    id: "slack",
    cx: 270,
    cy: 135,
    title: "Slack",
    sub: "Alerts",
    lineClass: styles.intgWire4,
    cardClass: styles.intgCard4,
    lx1: 225,
    ly1: 104,
    lx2: 258,
    ly2: 127,
  },
  {
    id: "zapier",
    cx: 170,
    cy: 135,
    title: "Zapier",
    sub: "Automation",
    lineClass: styles.intgWire5,
    cardClass: styles.intgCard5,
    lx1: 215,
    ly1: 104,
    lx2: 182,
    ly2: 127,
  },
  {
    id: "salesforce",
    cx: 126,
    cy: 73,
    title: "Salesforce",
    sub: "CRM",
    lineClass: styles.intgWire6,
    cardClass: styles.intgCard6,
    lx1: 191,
    ly1: 80,
    lx2: 141,
    ly2: 80,
  },
] as const;

export function IntegrationsFlowIllustration({ className }: IntegrationsFlowIllustrationProps) {
  return (
    <svg viewBox="0 0 440 160" className={className} aria-hidden xmlns="http://www.w3.org/2000/svg">
      {/* Hub outer pulse ring */}
      <circle
        cx="220"
        cy="80"
        r="42"
        fill="none"
        stroke="#A3D9BE"
        strokeWidth="0.75"
        className={styles.intgHubPulse}
      />

      {/* Hub circle */}
      <circle cx="220" cy="80" r="28" fill="#EEEDFE" stroke="#CECBF6" strokeWidth="1" className={styles.intgHub} />

      {/* Hub label */}
      <g className={styles.intgHubLabel}>
        <text x="220" y="77" textAnchor="middle" fontSize="8" fill="#534AB7" fontWeight="500">
          AI
        </text>
        <text x="220" y="88" textAnchor="middle" fontSize="8" fill="#534AB7" fontWeight="500">
          AGENT
        </text>
      </g>

      {/* Connection wires + cards */}
      {INTEGRATIONS.map((item) => (
        <g key={item.id}>
          {/* Dashed wire */}
          <line
            x1={item.lx1}
            y1={item.ly1}
            x2={item.lx2}
            y2={item.ly2}
            stroke="#CECBF6"
            strokeWidth="0.75"
            strokeDasharray="3,2"
            className={item.lineClass}
          />
          {/* Integration card */}
          <g className={item.cardClass}>
            <rect
              x={item.cx - 32}
              y={item.cy - 14}
              width="64"
              height="28"
              rx="6"
              fill="#fff"
              stroke="#CECBF6"
              strokeWidth="0.75"
            />
            <text x={item.cx} y={item.cy - 1} textAnchor="middle" fontSize="9" fill="#888780" fontWeight="500">
              {item.title}
            </text>
            <text x={item.cx} y={item.cy + 10} textAnchor="middle" fontSize="7" fill="#AFA9EC">
              {item.sub}
            </text>
          </g>
        </g>
      ))}

      {/* "All connected" badge */}
      <g className={styles.intgBadge}>
        <rect x="174" y="68" width="92" height="24" rx="5" fill="#E1F5EE" stroke="#A3D9BE" strokeWidth="0.5" />
        <circle cx="192" cy="80" r="3" fill="#085041" className={styles.intgBadgeDot} />
        <text x="228" y="84" textAnchor="middle" fontSize="8" fill="#085041" fontWeight="500">
          All connected
        </text>
      </g>
    </svg>
  );
}
