import NotFound from '@/components/NotFound';
import VoiceAIAgentStateLanding from '@/components/VoiceAIAgentStateLanding';
// import { getVoiceAIAgentStatePagePayload } from '@/lib/voiceAIAgentStates';
import { normalizePublicSlug } from '@/lib/voiceAIAgentPublishSlugs';
import StructuredData from '@/components/StructuredData';
import {
  buildLocalBusinessSchema,
  buildBreadcrumbSchema,
} from '@/lib/seo/schemaBuilders';

export const revalidate = 3600;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  // Contentful disabled.
  // const data = await getVoiceAIAgentStatePagePayload(slug);
  const data = null;

  const defaultMeta = {
    title: 'Voice AI Agent | OnDial',
    description:
      'Deploy OnDial’s AI voice agent with regional language coverage and 24/7 call automation.',
  };

  const metaData = data?.metaData || defaultMeta;

  return {
    title: metaData.title,
    description: metaData.description,
    alternates: {
      canonical: metaData.canonical || `https://www.ondial.ai/voice-ai-agent-state/${slug}`,
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

export default async function VoiceAIAgentStatePage({ params }) {
  const { slug } = await params;
  const normalized = normalizePublicSlug(slug);
  // Contentful disabled — use /{slug} with data/voice-ai-agent.json instead.
  // const data = await getVoiceAIAgentStatePagePayload(normalized);
  const data = null; 

  if (!data?.heroData) {
    return <NotFound />;
  }

  const region = data?.heroData?.stateName || data?.heroData?.title || normalized;
  const stateSchemas = [
    buildLocalBusinessSchema({
      url: `/voice-ai-agent-state/${normalized}`,
      name: data?.metaData?.title || `OnDial AI Voice Agent - ${region}`,
      description:
        data?.metaData?.description ||
        `Deploy OnDial's AI voice agent across ${region} with regional language coverage and 24/7 call automation.`,
      region,
    }),
    buildBreadcrumbSchema(
      [
        { name: 'Voice AI Agent States', url: '/voice-ai-agent-state' },
        { name: region, url: `/voice-ai-agent-state/${normalized}` },
      ],
      { anchorUrl: `/voice-ai-agent-state/${normalized}` }
    ),
  ];

  return (
    <>
      <StructuredData data={stateSchemas} />
      <VoiceAIAgentStateLanding data={data} />
    </>
  );
}
