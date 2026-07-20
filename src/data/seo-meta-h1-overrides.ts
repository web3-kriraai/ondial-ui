/**
 * SEO Meta Title, Meta Description, and H1 overrides from the
 * "Meta and Heading Update" spreadsheet.
 * Applied on language voice pages, industry pages, and blog posts.
 */
export type SeoMetaH1Override = {
  title: string;
  description: string;
  /** Page H1 — omit when the sheet left H1 blank (blog posts). */
  h1?: string;
};

export const SEO_META_H1_OVERRIDES: Record<string, SeoMetaH1Override> = {
  'best-mizo-voice-ai-agent-mizoram': {
    title: 'Enterprise Mizo AI Voice Agent in Mizoram | OnDial',
    description:
      'Deploy Mizo AI Voice Agents in Mizoram with OnDial. Automate customer support, sales, appointment booking, and inbound calls with natural Mizo conversations.',
    h1: 'Enterprise Mizo AI Voice Agent for Businesses in Mizoram',
  },
  'best-odia-voice-ai-agent-odisha': {
    title: 'AI Voice Agent for Odisha Businesses in Odia | OnDial',
    description:
      "Transform customer calls with OnDial's AI Voice Agent for Odisha. Handle support, sales, lead qualification, and appointments in fluent Odia, 24/7.",
    h1: 'Enterprise Odia AI Voice Agent for Businesses in Odisha',
  },
  'best-bhojpuri-voice-ai-agent-bihar': {
    title: 'AI Voice Agent for Bihar Businesses in Bhojpuri | OnDial',
    description:
      "Automate customer support, sales, and appointment booking with OnDial's Bhojpuri AI Voice Agent. Deliver natural conversations for businesses across Bihar.",
    h1: 'AI Voice Agent with Bhojpuri Language Support for Bihar Businesses',
  },
  'best-tulu-voice-ai-agent-karnataka': {
    title: 'AI Voice Agent for Karnataka Businesses in Tulu | OnDial',
    description:
      "Automate customer support, sales, and appointment booking with OnDial's Tulu AI Voice Agent. Deliver natural conversations for businesses across Karnataka.",
    h1: 'AI Voice Agent with Tulu Language Support for Karnataka Businesses',
  },
  'best-tamil-voice-ai-agent-tamil-nadu': {
    title: 'AI Voice Agent for Tamil Nadu Businesses | OnDial',
    description:
      "Deploy OnDial's Tamil AI Voice Agent in Tamil Nadu to automate customer support, inbound calls, lead qualification, and appointment scheduling 24/7.",
    h1: 'Automate Business Calls with a Tamil AI Voice Agent',
  },
  'best-garo-voice-ai-agent-meghalaya': {
    title: 'Garo AI Voice Agent for Businesses in Meghalaya | OnDial',
    description:
      "Automate customer support, sales, and appointment booking with OnDial's Garo AI Voice Agent. Deliver natural Garo conversations for businesses in Meghalaya.",
    h1: 'AI Voice Agent with Garo Language Support for Meghalaya Businesses',
  },
  'best-rajasthani-voice-ai-agent-rajasthan': {
    title: 'Rajasthani AI Voice Agent for Businesses in Rajasthan | OnDial',
    description:
      "Transform business communication in Rajasthan using OnDial's AI Calling Agent with fluent Rajasthani conversations, CRM integration, and 24/7 automation.",
    h1: 'AI Voice Agent with Rajasthani Language Support for Rajasthan Businesses',
  },
  'best-haryanvi-voice-ai-agent-haryana': {
    title: 'Haryanvi AI Voice Agent for Businesses in Haryana | OnDial',
    description:
      "Automate customer support, sales, and appointment booking with OnDial's Haryanvi AI Voice Agent. Deliver natural conversations for businesses in Haryana.",
    h1: 'AI Voice Agent with Haryanvi Language Support for Haryana Businesses',
  },
  'best-malayalam-voice-ai-agent-kerala': {
    title: 'Malayalam AI Voice Agent for Businesses in Kerala | OnDial',
    description:
      "Automate customer support, sales, and appointment booking with OnDial's Malayalam AI Voice Agent. Deliver natural conversations for businesses in Kerala.",
    h1: 'Automate Business Calls with a Malayalam AI Voice Agent',
  },
  'best-pahari-voice-ai-agent-himachal-pradesh': {
    title: 'Pahari AI Voice Agent for Himachal Pradesh Businesses | OnDial',
    description:
      "Deploy OnDial's Pahari AI Voice Agent in Himachal Pradesh to automate inbound calls, lead qualification, customer support, and bookings 24/7.",
    h1: 'AI Voice Agent with Pahari Language Support for Himachal Pradesh Businesses',
  },
  'best-chhattisgarhi-voice-ai-agent-chhattisgarh': {
    title: 'Chhattisgarhi AI Voice Agent for Businesses | OnDial',
    description:
      "Deploy OnDial's Chhattisgarhi AI Voice Agent to automate customer support, sales, and appointment booking with natural conversations across Chhattisgarh.",
    h1: 'Automate Business Calls with a Chhattisgarhi AI Voice Agent',
  },
  'best-garhwali-voice-ai-agent-uttarakhand': {
    title: 'Garhwali AI Voice Agent in Uttarakhand | OnDial',
    description:
      "Deploy OnDial's Garhwali AI Voice Agent to automate customer support, sales, and appointment booking with natural conversations across Uttarakhand.",
    h1: 'AI Voice Agent with Garhwali Language Support for Uttarakhand Businesses',
  },
  'best-bengali-voice-ai-agent-west-bengal': {
    title: 'Bengali AI Voice Agent in West Bengal | OnDial',
    description:
      "Deploy OnDial's Bengali AI Voice Agent to automate customer support, sales, and appointment booking with natural conversations across West Bengal.",
    h1: 'AI Voice Agent with Bengali Language Support for West Bengal Businesses',
  },
  'best-punjabi-voice-ai-agent-punjab': {
    title: 'Enterprise AI Voice Agent in Punjabi for Punjab | OnDial',
    description:
      "Scale your business with OnDial's Punjabi AI Calling Agent in Punjab. Automate customer calls, lead qualification, bookings, and support around the clock.",
    h1: 'Punjabi AI Calling Agent for Businesses in Punjab',
  },
  'best-assamese-voice-ai-agent-assam': {
    title: 'Best Assamese AI Voice Agent in Assam | OnDial',
    description:
      "Automate customer calls with OnDial's Assamese AI Voice Agent in Assam. Improve support, qualify leads, schedule appointments, and engage customers 24/7.",
    h1: 'Enterprise Assamese AI Voice Agent in Assam',
  },
  'best-konkani-voice-ai-agent-goa': {
    title: 'Konkani AI Voice Agent for Businesses in Goa | OnDial',
    description:
      "Automate customer calls with OnDial's Konkani AI Voice Agent in Goa. Handle support, lead qualification, appointment booking, and sales conversations 24/7.",
    h1: '24/7 Konkani AI Voice Agent Solutions in Goa',
  },
  'best-kashmiri-voice-ai-agent-kashmir': {
    title: 'Kashmiri AI Voice Agent for Businesses in Kashmir | OnDial',
    description:
      "Enhance customer engagement with OnDial's Kashmiri AI Voice Agent. Automate business calls, customer service, appointments, and lead capture in Kashmir.",
    h1: 'AI Voice Agent for Kashmiri Businesses in Kashmir',
  },
  'best-hindi-voice-ai-agent-india': {
    title: 'Hindi AI Calling Agent for Businesses in India | OnDial',
    description:
      "Deliver natural Hindi conversations with OnDial's AI Voice Agent. Automate customer support, appointment booking, lead generation, and business calls.",
    h1: 'Hindi AI Calling Agent for Businesses in India',
  },

  // Industry pages (path without /industries/ prefix used as key below)
  'ai-voice-agents-real-estate': {
    title: 'AI Voice Agents for Real Estate Lead Qualification & Sales',
    description:
      "Convert more property inquiries with OnDial's AI Voice Agents. Automate lead qualification, follow-ups, customer support, and appointment booking.",
    h1: 'Enterprise AI Voice Agents for Real Estate Businesses',
  },
  'ai-voice-agents-construction': {
    title: 'AI Voice Agents for Construction Companies | OnDial',
    description:
      "Automate project inquiries, lead qualification, site visit scheduling, and customer support with OnDial's AI Voice Agents for construction companies.",
    h1: 'Enterprise AI Voice Agents for Construction Companies',
  },
  'ai-voice-agents-non-profit-organizations': {
    title: 'AI Calling Agents for Non-Profit Organizations | OnDial',
    description:
      "Empower your non-profit with OnDial's AI Voice Agents. Automate donor outreach, volunteer coordination, event reminders, and supporter engagement 24/7.",
    h1: 'AI Voice Agents for Non-Profit Organizations',
  },

  // Blog posts (meta only — H1 blank in sheet)
  'exploring-benefits-voice-assistants-everyday-tasks': {
    title: 'Top Benefits of AI Voice Assistants for Daily Life | OnDial',
    description:
      'Learn how voice assistants streamline daily tasks, save time, boost productivity, and enhance customer interactions with intelligent AI from OnDial.',
  },
  'best-ai-voice-agents-for-indian-businesses': {
    title: 'AI Voice Agents for Indian Businesses: Complete Guide | OnDial',
    description:
      'Discover the best AI voice agents for Indian businesses in 2026. Compare features, use cases, and benefits to choose the right solution with OnDial.',
  },
  'happens-customer-satisfaction-calls-go-unanswered-hours': {
    title: 'How Unanswered Calls Impact Customer Satisfaction | OnDial',
    description:
      "Discover how unanswered calls affect customer satisfaction, revenue, and loyalty. Learn how OnDial's AI voice agents ensure every call is answered 24/7.",
  },
};

export function getSeoMetaH1Override(slug: string): SeoMetaH1Override | undefined {
  return SEO_META_H1_OVERRIDES[slug];
}
