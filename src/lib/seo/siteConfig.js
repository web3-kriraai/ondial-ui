/**
 * Shared brand & URL constants for JSON-LD schemas and OG metadata.
 * Canonical host MUST match next.config redirect (bare → www).
 */

import { ORGANIZATION_SOCIAL_URLS } from '../../config/social';

export const SITE_URL = 'https://www.ondial.ai';
export const SITE_NAME = 'OnDial';
export const SITE_LEGAL_NAME = 'OnDial AI';
export const SITE_LOGO = `${SITE_URL}/img/logo/og.png`;
export const SITE_DEFAULT_OG = `${SITE_URL}/img/logo/og.png`;

/**
 * True only on the production marketing host (ondial.ai / www.ondial.ai).
 * test.ondial.ai and localhost must stay noindex / nofollow.
 */
export function isSeoIndexable() {
  const configured =
    process.env.NEXT_PUBLIC_APP_URL ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    '';
  try {
    const host = new URL(configured).hostname.replace(/^www\./i, '').toLowerCase();
    return host === 'ondial.ai';
  } catch {
    return false;
  }
}

/**
 * Meta robots for public pages. Always noindex/nofollow off production
 * so page-level metadata cannot override staging protection.
 */
export function indexablePageRobots() {
  if (!isSeoIndexable()) {
    return {
      index: false,
      follow: false,
      googleBot: {
        index: false,
        follow: false,
      },
    };
  }

  return {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  };
}

export const ORGANIZATION_DESCRIPTION =
  'OnDial provides enterprise-grade AI Voice Agents for inbound and outbound call automation, multilingual customer support, lead qualification, appointment scheduling, and business communication automation.';

/** Public contact channels surfaced in Organization / ContactPage schemas. */
export const ORGANIZATION_CONTACT_POINTS = [
  {
    telephone: '+91-9979620507',
    contactType: 'customer service',
    areaServed: ['IN', 'US'],
    availableLanguage: ['English', 'Hindi'],
  },
  {
    telephone: '+91-8160835445',
    contactType: 'sales',
    areaServed: ['IN', 'US'],
    availableLanguage: ['English', 'Hindi'],
  },
];

export const ORGANIZATION_SAME_AS = [...ORGANIZATION_SOCIAL_URLS];

export const ORGANIZATION_ADDRESS = {
  '@type': 'PostalAddress',
  addressCountry: 'IN',
  addressRegion: 'Gujarat',
};

/** Build an absolute URL from a path. Safe for trailing slashes and empty paths. */
export function absoluteUrl(path = '') {
  if (!path) return SITE_URL;
  if (/^https?:\/\//i.test(path)) return path;
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_URL}${cleanPath}`;
}
