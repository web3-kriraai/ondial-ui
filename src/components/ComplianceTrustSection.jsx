import Link from 'next/link';
import { cn } from '@/lib/utils';

const GRID_PATTERN_BG =
  "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23500CFD' fill-opacity='0.02'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")";

/** Bump when replacing files under public/img/compliance/ (same filename → stale CDN/browser cache). */
const COMPLIANCE_ASSET_VERSION = '20250617a';

const COMPLIANCE_HEADING = {
  eyebrow: 'Compliance & security',
  title: 'Trust built for AI voice agents',
  description:
    'Calling agents handle sensitive conversations-compliance is a top objection, especially in healthcare and finance. This dedicated trust strip shows how your product meets the standards buyers ask about first.',
};

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function LinkedDescription({ text, links = [] }) {
  if (!links.length) return text;
  const unique = links.filter((link, index, arr) => link?.text && link?.href && arr.findIndex((l) => l.text === link.text) === index);
  if (!unique.length) return text;
  const pattern = new RegExp(`(${unique.map((link) => escapeRegExp(link.text)).join('|')})`, 'g');
  const hrefByText = Object.fromEntries(unique.map((link) => [link.text, link.href]));
  return String(text).split(pattern).map((part, index) => {
    const href = hrefByText[part];
    if (!href) return <span key={index}>{part}</span>;
    return (
      <Link key={index} href={href} className="font-medium text-indigo-600 underline-offset-2 hover:underline">
        {part}
      </Link>
    );
  });
}

const COMPLIANCE_BADGES = [
  {
    id: 'hipaa',
    label: 'HIPAA',
    detail: 'Protected health information on every call',
    logo: '/img/compliance/hipaa.png',
  },
  {
    id: 'gdpr',
    label: 'GDPR',
    detail: 'Privacy-by-design for EU data subjects',
    logo: '/img/compliance/gdpr.png',
  },
  {
    id: 'pci-dss',
    label: 'PCI DSS',
    detail: 'Secure handling of payment conversations',
    logo: '/img/compliance/pci-dss.png',
  },
  {
    id: 'soc-2',
    label: 'SOC 2',
    detail: 'Audited security, availability & confidentiality',
    logo: '/img/compliance/soc-new.png',
  },
  {
    id: 'iso',
    label: 'ISO Compliance & Security',
    detail: 'Quality and information security management standards',
    logo: '/img/compliance/iso-new.png',
  },
];

function resolveBadgeLogoSrc(logo) {
  if (typeof logo === 'string') {
    return `${logo}?v=${COMPLIANCE_ASSET_VERSION}`;
  }
  return logo.src ?? logo;
}

const FOOTNOTE =
  'AI-specific controls for voice transcripts, call recordings, and agent workflows-so regulated teams can deploy with confidence.';

export default function ComplianceTrustSection({
  unifiedGrid = false,
  description,
  descriptionLinks = [],
}) {
  const headingDescription = description || COMPLIANCE_HEADING.description;

  return (
    <section
      id="compliance"
      className={cn(
        'relative w-full overflow-hidden',
        unifiedGrid ? 'bg-transparent py-12 sm:py-14 lg:py-16' : 'bg-white py-14 sm:py-16 lg:py-20',
      )}
      aria-labelledby="compliance-title"
    >
      {unifiedGrid ? (
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-50/30 via-transparent to-transparent" />
        </div>
      ) : (
        <>
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-50/40 via-transparent to-transparent" />
          <div className="pointer-events-none absolute bottom-0 left-0 h-64 w-full bg-gradient-to-t from-white to-transparent" />
          <div
            className="pointer-events-none absolute inset-0 opacity-30"
            style={{ backgroundImage: GRID_PATTERN_BG }}
          />
        </>
      )}
      <div className="relative z-10 mx-auto w-full max-w-[min(100%,92rem)] px-5 sm:px-8 lg:px-12 xl:px-14">
        <header className="mx-auto max-w-3xl text-center">
          <p
            className={cn(
              'mb-4 inline-block rounded-full border border-border/60 bg-transparent px-3 py-1',
              'text-[0.6875rem] font-medium uppercase tracking-[0.12em] text-muted-foreground',
            )}
          >
            {COMPLIANCE_HEADING.eyebrow}
          </p>
          <h2
            id="compliance-title"
            className="text-balance text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-[2.5rem]"
          >
            {COMPLIANCE_HEADING.title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            <LinkedDescription text={headingDescription} links={descriptionLinks} />
          </p>
        </header>

        <ul
          className="mt-10 grid grid-cols-2 gap-6 sm:mt-12 sm:gap-8 lg:grid-cols-3 xl:grid-cols-5 xl:gap-6"
          aria-label="Compliance and security standards"
        >
          {COMPLIANCE_BADGES.map((badge) => (
            <li key={badge.id}>
              <div className="flex h-full flex-col items-center px-2 py-4 text-center sm:px-3 sm:py-5">
                <div className="mb-4 flex h-28 w-28 items-center justify-center sm:h-32 sm:w-32 lg:h-36 lg:w-36">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={resolveBadgeLogoSrc(badge.logo)}
                    alt={`${badge.label} certification`}
                    width={144}
                    height={144}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-contain"
                    style={{ mixBlendMode: 'screen' }}
                  />
                </div>
                <p className="text-sm font-semibold tracking-tight text-foreground sm:text-base">
                  {badge.label}
                </p>
                {/* <p className="mt-1.5 text-xs leading-snug text-muted-foreground sm:text-sm">
                  {badge.detail}
                </p> */}
              </div>
            </li>
          ))}
        </ul>

        <p className="mx-auto mt-8 max-w-2xl text-center text-xs leading-relaxed text-muted-foreground sm:text-sm">
          {FOOTNOTE}
        </p>
      </div>
    </section>
  );
}
