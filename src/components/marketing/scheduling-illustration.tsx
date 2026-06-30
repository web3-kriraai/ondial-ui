import styles from "./scheduling-illustration.module.css";

type SchedulingIllustrationProps = {
  className?: string;
};

export function SchedulingIllustration({ className }: SchedulingIllustrationProps) {
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
        <text className={styles.schedMonthA} x="70" y="38" textAnchor="middle" fontSize="10" fill="#085041" fontWeight="500">
          May 2026
        </text>
        <text className={styles.schedMonthB} x="70" y="38" textAnchor="middle" fontSize="10" fill="#085041" fontWeight="500">
          June 2026
        </text>
      </g>

      {["M", "T", "W", "T", "F", "S"].map((day, i) => (
        <text key={day + i} x={50 + i * 23} y="60" textAnchor="middle" fontSize="8" fill="#888780">
          {day}
        </text>
      ))}

      <g clipPath="url(#sched-cal-clip)">
        <g className={styles.schedGridSwipe}>
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
          className={styles.schedScan}
          x1="38"
          y1="52"
          x2="182"
          y2="52"
          stroke="#A3D9BE"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </g>

      <g className={styles.schedCheckingChip}>
        <rect x="124" y="28" width="62" height="15" rx="7.5" fill="#E1F5EE" stroke="#A3D9BE" strokeWidth="0.5" />
        <text x="155" y="38" textAnchor="middle" fontSize="7" fill="#085041" fontWeight="500">
          Checking slots...
        </text>
      </g>

      <circle className={styles.schedAvail10} cx="73" cy="94" r="12" fill="none" stroke="#A3D9BE" strokeWidth="1.25" />
      <circle className={styles.schedAvail11} cx="96" cy="94" r="12" fill="none" stroke="#A3D9BE" strokeWidth="1.25" />
      <circle className={styles.schedAvail12} cx="119" cy="94" r="12" fill="none" stroke="#A3D9BE" strokeWidth="1.25" />

      <circle className={styles.schedSelected} cx="96" cy="94" r="11" fill="#085041" />
      <text className={styles.schedDate11} x="96" y="98" textAnchor="middle" fontSize="9" fill="#fff" fontWeight="500">
        9
      </text>

      <g className={styles.schedBookedPopup}>
        <rect x="38" y="130" width="144" height="20" rx="4" fill="#E1F5EE" stroke="#A3D9BE" strokeWidth="0.5" />
        <text x="110" y="144" textAnchor="middle" fontSize="9" fill="#085041" fontWeight="500">
          ✓ Booked - Wed 9th, 2:00 PM
        </text>
      </g>
    </svg>
  );
}
