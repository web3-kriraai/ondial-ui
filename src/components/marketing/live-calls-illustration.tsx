import styles from "./live-calls-illustration.module.css";

type LiveCallsIllustrationProps = {
  className?: string;
};

export function LiveCallsIllustration({ className }: LiveCallsIllustrationProps) {
  return (
    <svg viewBox="0 0 440 160" className={className} aria-hidden xmlns="http://www.w3.org/2000/svg">
      <g>
        <rect x="30" y="14" width="90" height="132" rx="10" fill="#fff" stroke="#CECBF6" strokeWidth="1" />
        <circle cx="75" cy="26" r="4" fill="#CECBF6" />
        <rect x="45" y="36" width="60" height="70" rx="4" fill="#F8F7FF" />
        {[styles.speakBar1, styles.speakBar2, styles.speakBar3, styles.speakBar4, styles.speakBar5, styles.speakBar6, styles.speakBar7].map(
          (barClass, index) => (
            <rect
              key={index}
              className={barClass}
              x={50 + index * 7.5}
              y={58}
              width="4.5"
              height="26"
              rx="2"
              fill="#7F77DD"
            />
          ),
        )}
        <rect className={styles.speakBtn} x="45" y="114" width="60" height="20" rx="4" fill="#7F77DD" />
        <text className={styles.speakText} x="75" y="128" textAnchor="middle" fontSize="9" fill="#fff" fontWeight="500">
          AI Speaking...
        </text>
      </g>

      <g>
        <line
          className={styles.connector}
          x1="122"
          y1="80"
          x2="158"
          y2="80"
          stroke="#CECBF6"
          strokeWidth="1"
          strokeDasharray="4,3"
        />
        <circle className={styles.connectorDot} cx="140" cy="80" r="3" fill="#7F77DD">
          <animateMotion dur="1.8s" repeatCount="indefinite" path="M-18,0 L18,0" />
        </circle>
      </g>

      <g className={styles.agentCard}>
        <rect x="158" y="30" width="120" height="100" rx="8" fill="#EEEDFE" stroke="#CECBF6" strokeWidth="0.5" />
        <text x="218" y="54" textAnchor="middle" fontSize="9" fill="#534AB7" fontWeight="500">
          AI AGENT
        </text>

        <rect x="172" y="60" width="92" height="36" rx="6" fill="#F8F7FF" stroke="#CECBF6" strokeWidth="0.5" />
        <line className={styles.agentScan} x1="176" y1="68" x2="260" y2="68" stroke="#AFA9EC" strokeWidth="1" strokeLinecap="round" />
        <circle className={styles.agentCore} cx="218" cy="78" r="10" fill="#7F77DD" fillOpacity="0.2" />
        <circle className={styles.agentCoreInner} cx="218" cy="78" r="5" fill="#534AB7" />
        <circle
          className={styles.agentRing}
          cx="218"
          cy="78"
          r="14"
          fill="none"
          stroke="#7F77DD"
          strokeWidth="1.25"
          strokeDasharray="4 8"
          strokeLinecap="round"
        />

        <path
          className={styles.agentDataFlow}
          d="M184,88 C196,92 208,84 218,88 S240,92 252,88"
          fill="none"
          stroke="#AFA9EC"
          strokeWidth="1"
          strokeLinecap="round"
        />

        <rect className={styles.liveBadge} x="168" y="108" width="96" height="14" rx="3" fill="#E1F5EE" />
        <circle className={styles.liveDot} cx="176" cy="112" r="2.5" fill="#085041" />
        <text x="223" y="115" textAnchor="middle" fontSize="8" fill="#085041" fontWeight="500">
          Live - Handling call
        </text>
      </g>

      <g>
        <line
          className={styles.connector}
          x1="280"
          y1="80"
          x2="316"
          y2="80"
          stroke="#CECBF6"
          strokeWidth="1"
          strokeDasharray="4,3"
        />
        <circle
          className={`${styles.connectorDot} ${styles.connectorDotLate}`}
          cx="298"
          cy="80"
          r="3"
          fill="#7F77DD"
        >
          <animateMotion dur="1.8s" begin="0.6s" repeatCount="indefinite" path="M-18,0 L18,0" />
        </circle>
      </g>

      <g>
        <rect x="316" y="30" width="104" height="100" rx="8" fill="#fff" stroke="#CECBF6" strokeWidth="0.5" />
        <text x="368" y="50" textAnchor="middle" fontSize="8" fill="#888780" fontWeight="500">
          CRM Updated
        </text>
        <rect className={styles.crmBar1} x="326" y="56" width="76" height="6" rx="2" fill="#AFA9EC" />
        <rect className={styles.crmBar2} x="326" y="68" width="60" height="5" rx="2" fill="#E8E6DF" />
        <rect className={styles.crmBar3} x="326" y="78" width="70" height="5" rx="2" fill="#E8E6DF" />
        <rect className={styles.crmBar4} x="326" y="88" width="50" height="5" rx="2" fill="#E8E6DF" />
        <rect className={styles.crmConfirmBadge} x="326" y="100" width="76" height="18" rx="3" fill="#EEEDFE" />
        <text x="352" y="113" textAnchor="middle" fontSize="8" fill="#3C3489" fontWeight="500">
          Auto-logged
        </text>
        <text className={styles.crmCheck} x="380" y="113" textAnchor="middle" fontSize="9" fill="#534AB7" fontWeight="700">
          ✓
        </text>
      </g>
    </svg>
  );
}
