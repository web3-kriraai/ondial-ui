// import { createClient } from 'contentful';
import { unstable_cache } from 'next/cache';
import { deriveStateKeyFromSlug, normalizePublicSlug } from './voiceAIAgentPublishSlugs.js';
import { normalizeKeyFeatureIconName, resolveKeyFeatureIconName } from './keyFeatureIcons.js';

// const VOICE_PAGE_SPACE_ID =
//   process.env.CONTENTFUL_SPACE_ID_PAGE || 's7w7jdx1ex4o';
// const VOICE_PAGE_DELIVERY_TOKEN =
//   process.env.CONTENTFUL_DELIVERY_TOKEN || 'Hlua3T8lrHbdso5QjISnNAdbTayqlHyorPDovPN8ln8';
// const VOICE_PAGE_ENVIRONMENT_ID = process.env.CONTENTFUL_ENVIRONMENT_ID || 'master';
// const CONTENT_TYPE_ID = 'bestAiVoiceAgentState';

/** ISR / cache TTL for published voice landing pages (seconds). */
export const VOICE_AI_PAGE_REVALIDATE_SECONDS = 3600;

// const client = createClient({
//   space: VOICE_PAGE_SPACE_ID,
//   accessToken: VOICE_PAGE_DELIVERY_TOKEN,
// });

export function voiceAIAgentPageCacheTag(slug) {
  return `voice-ai-page:${normalizePublicSlug(slug)}`;
}

const STEP_ICONS = ['Mic', 'Brain', 'MessageSquare', 'BarChart3'];
const STEP_ACCENTS = [
  'from-blue-500 via-cyan-500 to-sky-600',
  'from-emerald-500 via-teal-500 to-cyan-600',
  'from-indigo-500 via-violet-500 to-purple-600',
  'from-cyan-500 via-sky-500 to-blue-600',
];

const WHY_ICONS = ['Globe', 'Zap', 'ShieldCheck', 'TrendingUp', 'Award', 'Languages'];
const WHY_FEATURE_ICON_BG = 'from-indigo-100 to-violet-100';

const KEY_FEATURE_GRADIENT = 'from-[#6A32F8] to-indigo-600';

const DEFAULT_ABOUT_STATS = [
  { value: '100%', label: 'Accuracy Rate', description: 'Speech accuracy' },
  { value: '24/7', label: 'Availability', description: 'Always ready to help' },
  { value: '20+', label: 'Industries', description: 'Successfully served' },
];

function categoryToIndustryIcon(category) {
  if (!category) return 'Globe';
  const c = category.toLowerCase();
  if (c.includes('health')) return 'Stethoscope';
  if (c.includes('real estate') || c.includes('property')) return 'Home';
  if (c.includes('education') || c.includes('government')) return 'GraduationCap';
  if (c.includes('energy') || c.includes('gas')) return 'Zap';
  if (c.includes('retail') || c.includes('fmcg')) return 'ShoppingCart';
  if (c.includes('manufacturing') || c.includes('rubber') || c.includes('bamboo')) return 'Factory';
  return 'Briefcase';
}

function slugifyIndustry(ind) {
  if (ind.slug) return ind.slug;
  return `state-industry-${ind.id}-${ind.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`;
}

function enrichIndustries(industries) {
  if (!industries?.length) return [];
  return industries.map((ind) => ({
    ...ind,
    slug: slugifyIndustry(ind),
    icon: ind.icon || categoryToIndustryIcon(ind.category),
    color: ind.color || 'from-indigo-500 to-purple-600',
    bgColor: ind.bgColor || 'from-indigo-50 to-purple-50',
    useCases: ind.useCases || [],
  }));
}

function enrichHowSteps(steps) {
  if (!steps?.length) return [];
  return steps.map((step, i) => ({
    ...step,
    icon: step.icon || STEP_ICONS[i % STEP_ICONS.length],
    accent: step.accent || STEP_ACCENTS[i % STEP_ACCENTS.length],
  }));
}

function enrichWhyFeatures(features) {
  if (!features?.length) return [];
  return features.map((f, i) => ({
    ...f,
    icon: f.icon || WHY_ICONS[i % WHY_ICONS.length],
    color: WHY_FEATURE_ICON_BG,
  }));
}

function enrichKeyFeatures(features) {
  if (!features?.length) return [];
  return features.map((f) => ({
    ...f,
    icon: normalizeKeyFeatureIconName(resolveKeyFeatureIconName(f)),
    gradient: KEY_FEATURE_GRADIENT,
  }));
}

function enrichAboutForLanguagePageShape(about, stateLabel) {
  if (!about) return null;
  return {
    ...about,
    imageSrc: about.imageSrc || '/img/vector/vector7.png',
    imageAlt: about.imageAlt || `${stateLabel} AI voice agent`,
    backgroundColor: about.backgroundColor || 'from-blue-50 to-indigo-100',
    accentColor: about.accentColor || 'blue',
    stats: about.stats?.length ? about.stats : DEFAULT_ABOUT_STATS,
  };
}

/** Human-readable label from JSON object key (handles `uttar_pradesh`, `united_kingdom_english`, etc.). */
function formatStateLabelFromKey(stateKey) {
  if (!stateKey) return '';
  return String(stateKey)
    .replace(/_/g, ' ')
    .split(/[\s-]+/)
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ');
}

function labelFromSlug(slug) {
  return String(slug || '')
    .split('-')
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

// function isContentfulNotFoundError(error) {
//   if (!error) return false;
//
//   const name = String(error?.name || '').toLowerCase();
//   const message = String(error?.message || '').toLowerCase();
//   const status = Number(error?.status ?? error?.statusCode ?? error?.sys?.id);
//   const detailsType = String(error?.details?.type || '').toLowerCase();
//
//   if (name === 'notfound') return true;
//   if (status === 404) return true;
//   if (detailsType.includes('notfound')) return true;
//   if (message.includes('resource could not be found')) return true;
//
//   return false;
// }

export async function listVoiceAIAgentStateSlugs() {
  // Contentful disabled — slugs come from data/voice-ai-agent.json or static routes.
  return [];
  // try {
  //   const entries = await client.getEntries({
  //     content_type: CONTENT_TYPE_ID,
  //     select: 'sys.id',
  //   });
  //   return entries.items.map((item) => item.sys.id);
  // } catch (error) {
  //   console.error('Error listing voice page slugs:', error);
  //   return [];
  // }
}

/**
 * @param {string} slug URL slug e.g. best-english-voice-agent-united-kingdom
 * @returns {Promise<null | { stateKey: string, stateLabel: string, record: object }>}
 */
async function getVoiceAIAgentStateRecordUncached(slug) {
  // Contentful disabled.
  return null;
  // const normalized = normalizePublicSlug(slug);
  // if (!normalized) return null;
  //
  // try {
  //   const entry = await client.getEntry(normalized);
  //   const stateData = entry?.fields?.states;
  //   if (!stateData) return null;
  //
  //   const record = typeof stateData === 'object' && stateData['en-US'] ? stateData['en-US'] : stateData;
  //   const stateKey = deriveStateKeyFromSlug(normalized) || normalized.replace(/-/g, '_');
  //   const stateLabel =
  //     formatStateLabelFromKey(stateKey) || labelFromSlug(normalized) || normalized;
  //
  //   return { stateKey, stateLabel, record };
  // } catch (error) {
  //   if (!isContentfulNotFoundError(error)) {
  //     console.error(`Error fetching voice page ${normalized}:`, error.message);
  //   }
  // }
  //
  // return null;
}

export async function getVoiceAIAgentStateRecord(slug) {
  const normalized = normalizePublicSlug(slug);
  if (!normalized) return null;

  return unstable_cache(
    () => getVoiceAIAgentStateRecordUncached(normalized),
    ['voice-ai-agent-state-record', normalized],
    {
      revalidate: VOICE_AI_PAGE_REVALIDATE_SECONDS,
      tags: [voiceAIAgentPageCacheTag(normalized)],
    }
  )();
}

function buildVoiceAIAgentStatePagePayload(slug, found) {
  const { stateKey, stateLabel, record } = found;
  const r = record;

  return {
    stateKey,
    stateLabel,
    metaData: r.meta || null,
    heroData: r.hero ? { ...r.hero, slug, urlSlug: slug } : null,
    aboutData: r.about
      ? {
          ...enrichAboutForLanguagePageShape(r.about, stateLabel),
          slug,
          urlSlug: slug,
        }
      : null,
    keyFeaturesData: r.keyFeatures
      ? {
          ...r.keyFeatures,
          features: enrichKeyFeatures(r.keyFeatures.features),
          slug,
          urlSlug: slug,
        }
      : null,
    howAgentWorksData: r.howAgentWorks
      ? {
          ...r.howAgentWorks,
          steps: enrichHowSteps(r.howAgentWorks.steps),
        }
      : null,
    benefitsBlock: r.benefits || null,
    useCasesData: r.useCases
      ? {
          ...r.useCases,
          industries: enrichIndustries(r.useCases.industries),
        }
      : null,
    businessBenefits: r.businessBenefits || null,
    whyChooseData: r.whyChoose
      ? {
          ...r.whyChoose,
          features: enrichWhyFeatures(r.whyChoose.features),
        }
      : null,
    ctaData: r.cta ? { ...r.cta, slug, urlSlug: slug } : null,
    faqData: r.faqs?.length ? { faqs: r.faqs, slug, urlSlug: slug } : null,
  };
}

async function getVoiceAIAgentStatePagePayloadUncached(slug) {
  const found = await getVoiceAIAgentStateRecordUncached(slug);
  if (!found) return null;
  return buildVoiceAIAgentStatePagePayload(normalizePublicSlug(slug), found);
}

/**
 * Normalized payload for the state landing page (enriched for shared UI components).
 */
export async function getVoiceAIAgentStatePagePayload(slug) {
  // Contentful disabled — pages load from data/voice-ai-agent.json via app/[slug]/page.jsx.
  return null;
  // const normalized = normalizePublicSlug(slug);
  // if (!normalized) return null;
  //
  // return unstable_cache(
  //   () => getVoiceAIAgentStatePagePayloadUncached(normalized),
  //   ['voice-ai-agent-state-payload', normalized],
  //   {
  //     revalidate: VOICE_AI_PAGE_REVALIDATE_SECONDS,
  //     tags: [voiceAIAgentPageCacheTag(normalized)],
  //   }
  // )();
}
