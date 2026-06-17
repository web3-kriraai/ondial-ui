import { AnalyticsFlowIllustration } from "@/components/marketing/analytics-flow-illustration";
import { IntegrationsFlowIllustration } from "@/components/marketing/integrations-flow-illustration";
import { LeadQualificationIllustration } from "@/components/marketing/lead-qualification-illustration";
import { MultilingualFlowIllustration } from "@/components/marketing/multilingual-flow-illustration";
import type { FeatureIllustrationId } from "@/data/home-features-content";

import flowStyles from "./home-features-illustrations.module.css";
import styles from "./home-features-section.module.css";

type FeatureIllustrationProps = {
  id: FeatureIllustrationId;
  wide?: boolean;
};

export function FeatureIllustration({ id, wide = false }: FeatureIllustrationProps) {
  const className = wide ? styles.illusSvgWide : styles.illusSvg;

  switch (id) {
    case "live-calls":
      return (
        <svg viewBox="0 0 440 160" className={className} aria-hidden xmlns="http://www.w3.org/2000/svg">
          <g>
            <rect x="30" y="14" width="90" height="132" rx="10" fill="#fff" stroke="#CECBF6" strokeWidth="1" />
            <circle cx="75" cy="26" r="4" fill="#CECBF6" />
            <rect x="45" y="36" width="60" height="70" rx="4" fill="#F8F7FF" />
            {[flowStyles.speakBar1, flowStyles.speakBar2, flowStyles.speakBar3, flowStyles.speakBar4, flowStyles.speakBar5, flowStyles.speakBar6, flowStyles.speakBar7].map(
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
            <rect className={flowStyles.speakBtn} x="45" y="114" width="60" height="20" rx="4" fill="#7F77DD" />
            <text className={flowStyles.speakText} x="75" y="128" textAnchor="middle" fontSize="9" fill="#fff" fontWeight="500">
              AI Speaking...
            </text>
          </g>

          <g>
            <line
              className={flowStyles.connector}
              x1="122"
              y1="80"
              x2="158"
              y2="80"
              stroke="#CECBF6"
              strokeWidth="1"
              strokeDasharray="4,3"
            />
            <circle className={flowStyles.connectorDot} cx="140" cy="80" r="3" fill="#7F77DD">
              <animateMotion dur="1.8s" repeatCount="indefinite" path="M-18,0 L18,0" />
            </circle>
          </g>

          <g className={flowStyles.agentCard}>
            <rect x="158" y="30" width="120" height="100" rx="8" fill="#EEEDFE" stroke="#CECBF6" strokeWidth="0.5" />
            <text x="218" y="54" textAnchor="middle" fontSize="9" fill="#534AB7" fontWeight="500">
              AI AGENT
            </text>

            <rect x="172" y="60" width="92" height="36" rx="6" fill="#F8F7FF" stroke="#CECBF6" strokeWidth="0.5" />
            <line className={flowStyles.agentScan} x1="176" y1="68" x2="260" y2="68" stroke="#AFA9EC" strokeWidth="1" strokeLinecap="round" />
            <circle className={flowStyles.agentCore} cx="218" cy="78" r="10" fill="#7F77DD" fillOpacity="0.2" />
            <circle className={flowStyles.agentCoreInner} cx="218" cy="78" r="5" fill="#534AB7" />
            <circle
              className={flowStyles.agentRing}
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
              className={flowStyles.agentDataFlow}
              d="M184,88 C196,92 208,84 218,88 S240,92 252,88"
              fill="none"
              stroke="#AFA9EC"
              strokeWidth="1"
              strokeLinecap="round"
            />

            <rect className={flowStyles.liveBadge} x="168" y="108" width="96" height="14" rx="3" fill="#E1F5EE" />
            <circle className={flowStyles.liveDot} cx="176" cy="112" r="2.5" fill="#085041" />
            <text x="223" y="115" textAnchor="middle" fontSize="8" fill="#085041" fontWeight="500">
              Live — Handling call
            </text>
          </g>

          <g>
            <line
              className={flowStyles.connector}
              x1="280"
              y1="80"
              x2="316"
              y2="80"
              stroke="#CECBF6"
              strokeWidth="1"
              strokeDasharray="4,3"
            />
            <circle
              className={`${flowStyles.connectorDot} ${flowStyles.connectorDotLate}`}
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
            <rect
              className={flowStyles.crmBar1}
              x="326"
              y="56"
              width="76"
              height="6"
              rx="2"
              fill="#AFA9EC"
            />
            <rect className={flowStyles.crmBar2} x="326" y="68" width="60" height="5" rx="2" fill="#E8E6DF" />
            <rect className={flowStyles.crmBar3} x="326" y="78" width="70" height="5" rx="2" fill="#E8E6DF" />
            <rect className={flowStyles.crmBar4} x="326" y="88" width="50" height="5" rx="2" fill="#E8E6DF" />
            <rect className={flowStyles.crmConfirmBadge} x="326" y="100" width="76" height="18" rx="3" fill="#EEEDFE" />
            <text x="352" y="113" textAnchor="middle" fontSize="8" fill="#3C3489" fontWeight="500">
              Auto-logged
            </text>
            <text className={flowStyles.crmCheck} x="380" y="113" textAnchor="middle" fontSize="9" fill="#534AB7" fontWeight="700">
              ✓
            </text>
          </g>
        </svg>
      );
    case "scheduling":
      return (
        <svg viewBox="0 0 220 160" className={className} aria-hidden xmlns="http://www.w3.org/2000/svg">
          <defs>
            <clipPath id="sched-header-clip">
              <rect x="34" y="24" width="152" height="18" />
            </clipPath>
            <clipPath id="sched-cal-clip">
              <rect x="34" y="48" width="152" height="88" rx="4" />
            </clipPath>
          </defs>

          <rect x="30" y="20" width="160" height="135" rx="8" fill="#fff" stroke="#A3D9BE" strokeWidth="0.5" />
          <rect x="30" y="20" width="160" height="28" rx="8" fill="#E1F5EE" stroke="#A3D9BE" strokeWidth="0.5" />
          <rect x="30" y="40" width="160" height="8" fill="#E1F5EE" />

          <g clipPath="url(#sched-header-clip)">
            <text className={flowStyles.schedMonthA} x="70" y="38" textAnchor="middle" fontSize="10" fill="#085041" fontWeight="500">
              May 2026
            </text>
            <text className={flowStyles.schedMonthB} x="70" y="38" textAnchor="middle" fontSize="10" fill="#085041" fontWeight="500">
              June 2026
            </text>
          </g>

          {["M", "T", "W", "T", "F", "S"].map((day, i) => (
            <text key={day + i} x={50 + i * 23} y="60" textAnchor="middle" fontSize="8" fill="#888780">
              {day}
            </text>
          ))}

          <g clipPath="url(#sched-cal-clip)">
            <g className={flowStyles.schedGridSwipe}>
              {[1, 2, 3, 4, 5].map((date, i) => (
                <text key={date} x={50 + i * 23} y="78" textAnchor="middle" fontSize="9" fill="#444441">
                  {date}
                </text>
              ))}
              <text x="165" y="78" textAnchor="middle" fontSize="9" fill="#888780">
                6
              </text>
              <text x="50" y="98" textAnchor="middle" fontSize="9" fill="#444441">
                7
              </text>
              <text x="73" y="98" textAnchor="middle" fontSize="9" fill="#444441">
                8
              </text>
              <text x="96" y="98" textAnchor="middle" fontSize="9" fill="#444441">
                9
              </text>
              <text x="119" y="98" textAnchor="middle" fontSize="9" fill="#444441">
                10
              </text>
              <text x="142" y="98" textAnchor="middle" fontSize="9" fill="#444441">
                11
              </text>
              <text x="165" y="98" textAnchor="middle" fontSize="9" fill="#888780">
                12
              </text>
              {[15, 16, 17, 18, 19, 20].map((date, i) => (
                <text key={date} x={50 + i * 23} y="118" textAnchor="middle" fontSize="9" fill="#444441">
                  {date}
                </text>
              ))}
            </g>

            <line
              className={flowStyles.schedScan}
              x1="38"
              y1="52"
              x2="182"
              y2="52"
              stroke="#A3D9BE"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </g>

          <g className={flowStyles.schedCheckingChip}>
            <rect x="124" y="28" width="62" height="15" rx="7.5" fill="#E1F5EE" stroke="#A3D9BE" strokeWidth="0.5" />
            <text x="155" y="38" textAnchor="middle" fontSize="7" fill="#085041" fontWeight="500">
              Checking slots...
            </text>
          </g>

          <circle className={flowStyles.schedAvail10} cx="73" cy="94" r="12" fill="none" stroke="#A3D9BE" strokeWidth="1.25" />
          <circle className={flowStyles.schedAvail11} cx="96" cy="94" r="12" fill="none" stroke="#A3D9BE" strokeWidth="1.25" />
          <circle className={flowStyles.schedAvail12} cx="119" cy="94" r="12" fill="none" stroke="#A3D9BE" strokeWidth="1.25" />

          <circle className={flowStyles.schedSelected} cx="96" cy="94" r="11" fill="#085041" />
          <text className={flowStyles.schedDate11} x="96" y="98" textAnchor="middle" fontSize="9" fill="#fff" fontWeight="500">
            11
          </text>

          <g className={flowStyles.schedBookedPopup}>
            <rect x="38" y="130" width="144" height="20" rx="4" fill="#E1F5EE" stroke="#A3D9BE" strokeWidth="0.5" />
            <text x="110" y="144" textAnchor="middle" fontSize="9" fill="#085041" fontWeight="500">
              ✓ Booked — Wed 11th, 2:00 PM
            </text>
          </g>
        </svg>
      );
    case "multilingual":
      return <MultilingualFlowIllustration className={className} />;
    case "lead-qualification":
      return <LeadQualificationIllustration className={className} />;
    case "analytics":
      return <AnalyticsFlowIllustration className={className} />;
    case "integrations":
      return <IntegrationsFlowIllustration className={className} />;
    default:
      return null;
  }
}
