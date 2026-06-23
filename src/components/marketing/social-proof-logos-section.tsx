import Image from "next/image";

import { TRUSTED_BRANDS, TRUSTED_TEAMS_COUNT } from "@/data/trusted-brands";

import styles from "./social-proof-logos-section.module.css";

function BrandWordmark({ name }: { name: string }) {
  const slug = name.replace(/\s+/g, " ").trim();
  const compact = slug.length > 12;

  return (
    <svg
      className={styles.wordmark}
      viewBox="0 0 160 32"
      role="img"
      aria-label={slug}
      xmlns="http://www.w3.org/2000/svg"
    >
      <text
        x="0"
        y="24"
        fill="currentColor"
        fontSize={compact ? "15" : "17"}
        fontWeight="600"
        letterSpacing={compact ? "-0.02em" : "-0.03em"}
        fontFamily="var(--font-poppins), ui-sans-serif, system-ui, sans-serif"
      >
        {slug}
      </text>
    </svg>
  );
}

function BrandLogo({ name, logoSrc }: { name: string; logoSrc?: string }) {
  if (logoSrc) {
    return (
      <Image
        src={logoSrc}
        loading="lazy"
        alt={`${name} logo`}
        width={140}
        height={40}
        className={styles.logoImage}
      />
    );
  }

  return <BrandWordmark name={name} />;
}

export function SocialProofLogosSection() {
  const loop = [...TRUSTED_BRANDS, ...TRUSTED_BRANDS];

  return (
    <section className={styles.section} aria-labelledby="social-proof-heading">
      <header className={styles.header}>
        <p id="social-proof-heading" className={styles.eyebrow}>
          Trusted by{" "}
          <span className={styles.eyebrowStrong}>{TRUSTED_TEAMS_COUNT} teams</span> worldwide
        </p>
      </header>

      <div className={styles.marquee}>
        <div className={styles.viewport}>
          <ul className={styles.track} aria-label="Companies that trust OnDial">
            {loop.map((brand, index) => (
              <li
                key={`${brand.id}-${index}`}
                className={styles.logoItem}
                aria-hidden={index >= TRUSTED_BRANDS.length}
              >
                <BrandLogo name={brand.name} logoSrc={brand.logoSrc} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
