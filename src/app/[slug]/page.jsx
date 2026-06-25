import fs from 'fs';
import path from 'path';
import SubServiceHeroSection from '@/components/SubServiceHeroSection';
import NotFound from '@/components/NotFound';
import VoiceAIAgent from '@/components/VoiceAIAgent';
import KeyFeature from '@/components/KeyFeature';
import CTASection from '@/components/CTASection';
import FAQSection from '@/components/FAQSection';
import HowOnDialWorks from '@/components/HowOnDialWorks';
import IndustrySurveySection from '@/components/IndustrySurveySection';
import WhyChooseSection from '@/components/WhyChooseSection';
import KeyBenefits from '@/components/BenefitsService';
import AccentSection from '@/components/AccentSection';
import VoiceAIAgentStateLanding from '@/components/VoiceAIAgentStateLanding';
// import { getVoiceAIAgentStatePagePayload } from '@/lib/voiceAIAgentStates';
import { normalizePublicSlug } from '@/lib/voiceAIAgentPublishSlugs';
import StructuredData from '@/components/StructuredData';
import {
  buildServiceSchema,
  buildLocalBusinessSchema,
  buildBreadcrumbSchema,
} from '@/lib/seo/schemaBuilders';

export const revalidate = 3600;

async function getVoiceAIAgentDataFromJson(slug) {
  try {
    const filePath = path.join(process.cwd(), 'data', 'voice-ai-agent.json');
    const jsonData = fs.readFileSync(filePath, 'utf8');
    const allData = JSON.parse(jsonData);

    let language = null;
    let languageData = null;

    for (const [key, data] of Object.entries(allData.languages)) {
      if (data.slug === slug) {
        language = key;
        languageData = data;
        break;
      }
    }

    if (!languageData) {
      language = slug;
      if (slug.startsWith('best-') && slug.includes('-voice-agent')) {
        const voiceAgentIndex = slug.indexOf('-voice-agent');
        if (voiceAgentIndex > 5) {
          language = slug.substring(5, voiceAgentIndex);
        }
      }

      if (allData.languages[language]) {
        languageData = allData.languages[language];
      } else {
        const extractedLang = language.split('-')[0];
        if (allData.languages[extractedLang]) {
          language = extractedLang;
          languageData = allData.languages[extractedLang];
        }
      }
    }

    if (!languageData) {
      return null;
    }

    if (languageData.about) {
      return {
        language,
        heroData: languageData.hero
          ? { ...languageData.hero, slug, urlSlug: slug }
          : null,
        aboutData: { ...languageData.about, slug, urlSlug: slug },
        howAgentWorksData: languageData.howAgentWorks ? { ...languageData.howAgentWorks } : null,
        useCasesData: languageData.useCases ? { ...languageData.useCases } : null,
        keyBenefitsData: languageData.keyBenefits ? { ...languageData.keyBenefits } : null,
        whyChooseData: languageData.whyChoose ? { ...languageData.whyChoose } : null,
        keyFeaturesData: languageData.keyFeatures
          ? { ...languageData.keyFeatures, slug, urlSlug: slug }
          : null,
        ctaData: languageData.cta ? { ...languageData.cta, slug, urlSlug: slug } : null,
        faqData: languageData.faqs
          ? { ...languageData, faqs: languageData.faqs, slug, urlSlug: slug }
          : null,
        accentsData: languageData.accents ? { ...languageData.accents } : null,
        metaData: languageData.meta ? { ...languageData.meta } : null,
      };
    }

    if (languageData.hero) {
      return {
        language,
        heroData: { ...languageData.hero, slug, urlSlug: slug },
        aboutData: { ...languageData.hero, slug, urlSlug: slug },
        howAgentWorksData: languageData.howAgentWorks ? { ...languageData.howAgentWorks } : null,
        useCasesData: languageData.useCases ? { ...languageData.useCases } : null,
        keyBenefitsData: languageData.keyBenefits ? { ...languageData.keyBenefits } : null,
        accentsData: languageData.accents ? { ...languageData.accents } : null,
        whyChooseData: languageData.whyChoose ? { ...languageData.whyChoose } : null,
        metaData: languageData.meta ? { ...languageData.meta } : null,
      };
    }

    return null;
  } catch {
    return null;
  }
}

async function resolvePage(slug) {
  const normalized = normalizePublicSlug(slug);
  if (!normalized) return null;

  // Contentful disabled — voice state pages use data/voice-ai-agent.json only.
  // const cms = await getVoiceAIAgentStatePagePayload(normalized);
  // if (cms?.heroData) {
  //   return { kind: 'cms', data: cms };
  // }

  const json = await getVoiceAIAgentDataFromJson(normalized);
  if (json?.heroData) {
    return { kind: 'json', data: json };
  }

  return null;
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const page = await resolvePage(slug);

  const defaultMeta = {
    title: 'Voice AI Agents | OnDial - Advanced AI Voice Technology',
    description:
      "Transform your business with OnDial's advanced voice AI agents. Multilingual support, ChatGPT integration, and 24/7 availability.",
  };

  const metaData = page?.data?.metaData || defaultMeta;

  return {
    title: metaData.title,
    description: metaData.description,
    alternates: {
      canonical: metaData.canonical || `https://www.ondial.ai/${slug}`,
    },
    openGraph: {
      title: metaData.title,
      description: metaData.description,
      type: 'website',
      siteName: 'OnDial',
    },
    twitter: {
      card: 'summary_large_image',
      title: metaData.title,
      description: metaData.description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

function JsonVoiceAIAgentPage({ data, slug }) {
  let language = data.language || slug;
  if (slug.startsWith('best-') && slug.includes('-voice-agent')) {
    const voiceAgentIndex = slug.indexOf('-voice-agent');
    if (voiceAgentIndex > 5) {
      language = slug.substring(5, voiceAgentIndex);
    }
  }

  return (
    <div className="min-h-screen">
      <SubServiceHeroSection
        title={data.heroData.title}
        subtitle={data.heroData.subtitle}
        description={data.heroData.description}
        primaryButtonText={data.heroData.primaryButtonText}
        secondaryButtonText={data.heroData.secondaryButtonText}
        primaryButtonLink={data.heroData.primaryButtonLink}
        secondaryButtonLink={data.heroData.secondaryButtonLink}
      />
      <VoiceAIAgent data={data.aboutData} />

      {data.keyFeaturesData && <KeyFeature data={data.keyFeaturesData} />}

      {data.useCasesData && (
        <IndustrySurveySection
          title={data.useCasesData.title}
          subtitle={data.useCasesData.subtitle}
          description={data.useCasesData.description}
          industries={data.useCasesData.industries}
        />
      )}

      {data.keyBenefitsData && (
        <KeyBenefits
          title={data.keyBenefitsData.title}
          description={data.keyBenefitsData.description}
          benefits={data.keyBenefitsData.benefits}
        />
      )}

      {data.accentsData && (
        <AccentSection
          title={data.accentsData.title}
          subtitle={data.accentsData.subtitle}
          description={data.accentsData.description}
          accents={data.accentsData.accentList}
        />
      )}

      {data.howAgentWorksData && (
        <HowOnDialWorks
          title={data.howAgentWorksData.title}
          subtitle={data.howAgentWorksData.subtitle}
          description={data.howAgentWorksData.description}
          steps={data.howAgentWorksData.steps}
        />
      )}

      {data.whyChooseData && (
        <WhyChooseSection
          subtitle={data.whyChooseData.subtitle}
          title={data.whyChooseData.title}
          description={data.whyChooseData.description}
          highlightText={data.whyChooseData.highlightText}
          features={data.whyChooseData.features}
        />
      )}

      {data.ctaData && (
        <CTASection
          badgeIcon={data.ctaData.badgeIcon || 'Bot'}
          badgeText={data.ctaData.badgeText || 'AI-Powered Solutions'}
          title={data.ctaData.title || 'Transform Your Business'}
          highlightedTitle={data.ctaData.highlightedTitle || 'Voice AI Agents'}
          description={data.ctaData.description || 'Experience the power of advanced AI technology.'}
          primaryButtonText={data.ctaData.primaryButtonText || 'Get Started'}
          secondaryButtonText={data.ctaData.secondaryButtonText || 'Contact Us'}
          primaryButtonLink={data.ctaData.primaryButtonLink || '/login'}
          secondaryButtonLink={data.ctaData.secondaryButtonLink || '/contact'}
          imageSrc={language === 'gujarati' ? '/img/vector/vector8.png' : '/img/vector/vector7.png'}
          imageAlt={`${language} AI Voice Agent`}
          showIllustration
          backgroundClass="bg-gradient-to-br from-indigo-50/50 via-purple-50/30 to-blue-50/50"
        />
      )}

      {data.faqData && (
        <FAQSection
          badgeIcon="HelpCircle"
          badgeText={`${language.charAt(0).toUpperCase() + language.slice(1)} Voice AI FAQs`}
          title="Frequently Asked Questions About"
          highlightedTitle={`${language.charAt(0).toUpperCase() + language.slice(1)} AI Voice Agents`}
          description={`Get answers to common questions about OnDial's ${language} voice AI technology and how it can transform your customer interactions.`}
          faqs={data.faqData.faqs || []}
        />
      )}
    </div>
  );
}

export default async function VoiceAIAgentPage({ params }) {
  const { slug } = await params;
  const page = await resolvePage(slug);

  if (!page?.data?.heroData) {
    return <NotFound />;
  }

  const normalizedSlug = normalizePublicSlug(slug);
  const language = page.data?.language || normalizedSlug;
  const titleCaseLang = String(language).charAt(0).toUpperCase() + String(language).slice(1);
  const isStatePage = page.kind === 'cms';

  const slugSchemas = [
    isStatePage
      ? buildLocalBusinessSchema({
          url: `/${normalizedSlug}`,
          name: page.data?.metaData?.title || `OnDial AI Voice Agent - ${titleCaseLang}`,
          description:
            page.data?.metaData?.description ||
            `OnDial's AI voice agent for ${titleCaseLang} with 24/7 call automation.`,
          region: titleCaseLang,
        })
      : buildServiceSchema({
          url: `/${normalizedSlug}`,
          name: page.data?.metaData?.title || `${titleCaseLang} AI Voice Agent | OnDial`,
          description:
            page.data?.metaData?.description ||
            `Deploy ${titleCaseLang} AI voice agents across calls with OnDial's multilingual platform.`,
          serviceType: `${titleCaseLang} AI Voice Agent`,
        }),
    buildBreadcrumbSchema(
      [{ name: titleCaseLang, url: `/${normalizedSlug}` }],
      { anchorUrl: `/${normalizedSlug}` }
    ),
  ];

  if (isStatePage) {
    return (
      <>
        <StructuredData data={slugSchemas} />
        <VoiceAIAgentStateLanding data={page.data} />
      </>
    );
  }

  return (
    <>
      <StructuredData data={slugSchemas} />
      <JsonVoiceAIAgentPage data={page.data} slug={normalizedSlug} />
    </>
  );
}
