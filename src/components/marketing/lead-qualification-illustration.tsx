"use client";

import flowStyles from "./lead-qualification-illustration.module.css";

type LeadQualificationIllustrationProps = {
  className?: string;
};

export function LeadQualificationIllustration({ className }: LeadQualificationIllustrationProps) {
  return (
    <svg viewBox="0 0 220 160" className={className} aria-hidden xmlns="http://www.w3.org/2000/svg">
      {/* ── Funnel layers ── */}
      <polygon
        className={flowStyles.leadFunnelTop}
        points="40,25 180,25 150,70 70,70"
        fill="#FAEEDA"
        stroke="#E6C07A"
        strokeWidth="0.5"
      />
      <polygon
        className={flowStyles.leadFunnelMid}
        points="70,72 150,72 130,105 90,105"
        fill="#F5D49A"
        stroke="#E6C07A"
        strokeWidth="0.5"
      />
      <polygon
        className={flowStyles.leadFunnelBot}
        points="90,107 130,107 118,130 102,130"
        fill="#EFA830"
        stroke="#E6C07A"
        strokeWidth="0.5"
      />

      {/* ── Left side lead - filters out ── */}
      <g transform="translate(78, 50)">
        <g className={flowStyles.leadParticle1}>
          <circle r="6" fill="#fff" stroke="#E6C07A" strokeWidth="0.5" />
          <text y="4" textAnchor="middle" fontSize="8" fill="#633806">L</text>
        </g>
      </g>

      {/* ── Right side lead - filters out ── */}
      <g transform="translate(142, 50)">
        <g className={flowStyles.leadParticle3}>
          <circle r="6" fill="#fff" stroke="#E6C07A" strokeWidth="0.5" />
          <text y="4" textAnchor="middle" fontSize="8" fill="#633806">L</text>
        </g>
      </g>

      {/* ── Center hot lead - qualifies ── */}
      <g transform="translate(110, 118)">
        <g className={flowStyles.leadParticle2}>
          <circle className={flowStyles.leadHotGlow} r="9" fill="none" stroke="#E6C07A" strokeWidth="1.25" />
          <circle r="6" fill="#fff" stroke="#E6C07A" strokeWidth="0.5" />
          <text y="4" textAnchor="middle" fontSize="8" fill="#633806">L</text>
        </g>
      </g>

      {/* ── Asking questions chip ── */}
      <g className={flowStyles.leadAskChip}>
        <rect x="124" y="56" width="58" height="15" rx="7.5" fill="#fff" stroke="#E6C07A" strokeWidth="0.5" />
        <text x="153" y="66.5" textAnchor="middle" fontSize="7" fill="#633806" fontWeight="500">
          Asking questions...
        </text>
      </g>

      {/* ── Hot lead tag ── */}
      <g className={flowStyles.leadHotTag}>
        <rect x="24" y="88" width="42" height="14" rx="7" fill="#EFA830" stroke="#E6C07A" strokeWidth="0.5" />
        <text x="44" y="98" textAnchor="middle" fontSize="7" fill="#fff" fontWeight="600">
          Hot lead
        </text>
      </g>

      {/* ── Route line + dot ── */}
      <line
        className={flowStyles.leadRoute}
        x1="118"
        y1="124"
        x2="188"
        y2="124"
        stroke="#A3D9BE"
        strokeWidth="1"
        strokeDasharray="4,3"
      />
      <circle className={flowStyles.leadRouteDot} cx="154" cy="124" r="2.5" fill="#085041" />

      {/* ── Qualified Lead popup ── */}
      <g className={flowStyles.leadQualifiedPopup}>
        <rect x="74" y="135" width="72" height="18" rx="5" fill="#E1F5EE" stroke="#A3D9BE" strokeWidth="0.5" />
        <text x="110" y="148" textAnchor="middle" fontSize="8" fill="#085041" fontWeight="500">
          ✓ Qualified Lead
        </text>
      </g>
    </svg>
  );
}
