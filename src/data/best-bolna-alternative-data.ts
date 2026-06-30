import {
  PhoneCall,
  Zap,
  Shield,
  Clock,
  Globe,
  Bot,
  Mic,
  Languages,
  DollarSign,
  Users,
  UserCheck,
  Building2,
  Stethoscope,
  ShoppingCart,
  GraduationCap,
  Car,
  Plane,
  Landmark,
  UserPlus,
  ArrowRightLeft,
  Database,
  Workflow,
  AlertTriangle,
  Scale,
  Plug,
  Layers,
  Rocket,
} from 'lucide-react';

export const bolnaAlternativePageData = {
  competitor: { name: 'Bolna' },

  meta: {
    title: "Best Bolna Alternative | OnDial's AI Voice Agents",
    description:
      'Looking for the best Bolna alternative? OnDial offers native CRM sync, 100+ languages, HIPAA and GDPR compliance, and transparent all-in pricing. Compare now.',
    canonical: '/best-bolna-alternative',
  },

  hero: {
    badge: 'Best Bolna Alternative',
    title: 'Best Bolna Alternative',
    subtitle:
      'OnDial matches Bolna on AI voice agents, bulk calling, and multilingual support - then adds native CRM sync, 100+ languages, documented HIPAA and GDPR compliance, and transparent all-in pricing.',
    highlights: [
      'Trustpilot reviews for Bolna sit at 2.5 out of 5',
      'No native Salesforce, HubSpot, or Zoho CRM connectors',
      'Default paid plan caps concurrency at 10 calls',
      'HIPAA, GDPR, and SOC 2 not documented on Bolna’s public site',
    ],
    description:
      'Teams that try Bolna for AI voice agents often hit unpredictable total cost, middleware-only CRM sync, and compliance questions that go unanswered. OnDial is built for regulated workloads, global scale, and finance teams that need one transparent bill.',
    primaryButtonText: 'Start Free Trial',
    secondaryButtonText: 'Compare Features',
    primaryButtonLink: '/signup',
    secondaryButtonLink: '#comparison',
    stats: [
      { value: '100+', label: 'languages supported', icon: Globe },
      { value: 'Free trial', label: 'go live in under 30 minutes', icon: Zap },
      { value: 'HIPAA & GDPR', label: 'documented compliance stack', icon: Shield },
      { value: '<200ms', label: 'sub-200 millisecond latency', icon: Clock },
    ],
  },

  whatIsCompetitor: {
    badge: 'What is Bolna?',
    title: 'Understanding the platform you are comparing',
    summary:
      'Bolna is a voice AI platform built for Indian languages and Indian telephony by Whismurwave Inc., a Y Combinator F25 graduate with $6.3M in seed funding.',
    stats: [
      { label: 'Languages', value: '10+' },
      { label: 'Funding', value: '$6.3M seed' },
      { label: 'Batch', value: 'YC F25' },
      { label: 'Platform fee', value: '$0.02/min' },
    ],
    highlights: [
      'Voice AI Built for India - Hinglish and Tier 2/3 regional accents',
      'Inbound and outbound calling with bulk campaigns and API triggers',
      'Bring your own LLM, STT, and TTS providers across 20+ models',
      'Serves ecommerce, EdTech, HealthTech, BFSI, hospitality & recruitment',
    ],
    paragraphs: [
      'Bolna is a voice AI platform built for Indian languages and Indian telephony. The company, legally Whismurwave Inc., graduated from Y Combinator in the F25 batch and raised a $6.3 million seed round led by General Catalyst in January 2026. Their homepage positions them as Voice AI Built for India, with deep specialization in Hinglish and regional Indian accents across Tier 2 and Tier 3 cities.',
      'The platform supports inbound and outbound calling, bulk campaigns, custom API triggers during live conversations, and human handoff. Bolna lets users bring their own LLM, speech to text, and text to speech providers, with support for 20 plus models across these layers. They serve ecommerce, EdTech, HealthTech, BFSI, hospitality, customer support, and recruitment. Case studies on their site include GoKwik, Awign, Hyreo, Hypothesis, and Futwork.',
      'Bolna offers cloud, India data residency, and on premise deployment options for enterprise customers. Their newsroom claims 1,000 plus companies and 500,000 monthly conversations. The platform charges a $0.02 per minute platform fee on top of underlying model and telephony costs.',
    ],
  },

  competitorFeatures: {
    badge: 'Key Features of Bolna',
    title: 'What Bolna offers today',
    subtitle:
      'Bolna lists a focused set of features on their official site aimed at technical teams building voice agents for Indian use cases.',
    features: [
      {
        icon: PhoneCall,
        title: 'Bulk Calling at Scale',
        summary: 'CSV upload campaigns with thousands of simultaneous AI calls.',
        description:
          'Bolna supports campaigns with thousands of simultaneous AI calls. Users upload a CSV of contacts, configure the agent, and launch. Concurrency beyond 10 calls requires the Pilot plan or Enterprise tier.',
      },
      {
        icon: Zap,
        title: 'Custom API Triggers',
        summary: 'Mid-call API calls via OpenAI-style function calling.',
        description:
          'Live conversations can call external APIs mid call to fetch data or push updates. This works through OpenAI style function calling and is one of Bolna’s stronger technical features.',
      },
      {
        icon: UserCheck,
        title: 'Human in the Loop',
        summary: 'Warm transfer to humans with full conversation context.',
        description:
          'Calls can be transferred to a human agent when the AI cannot resolve the query. The handoff includes context from the conversation so the human does not start cold.',
      },
      {
        icon: Workflow,
        title: 'Workflow Integration',
        summary: 'n8n, Make.com, Zapier, and viaSocket for post-call workflows.',
        description:
          'Bolna connects to n8n, Make.com, Zapier, and viaSocket for post call workflows. Native CRM connectors for Salesforce, HubSpot, and Zoho are not listed on their integrations page.',
      },
      {
        icon: Languages,
        title: 'Multilingual Support',
        summary: '10+ Indian languages including Hinglish, Hindi, Tamil, and Telugu.',
        description:
          'Bolna handles 10 plus Indian languages including Hinglish, Hindi, Tamil, and Telugu. Per language prompts and per language speech providers are supported. Global language coverage depends on the underlying model providers.',
      },
      {
        icon: Plug,
        title: 'Bring Your Own Keys',
        summary: 'Plug in OpenAI, ElevenLabs, Deepgram, or custom endpoints.',
        description:
          'Users can plug in their own OpenAI, ElevenLabs, Deepgram, or custom OpenAI compatible endpoints. Bolna charges a platform fee of $0.02 per minute on top of the underlying model and telephony costs.',
      },
      {
        icon: Layers,
        title: 'Graph Agents (Beta)',
        summary: 'Visual node-based editor with deterministic routing and pre-cached audio.',
        description:
          'A visual node based editor lets users design conversation flows with deterministic routing and pre cached audio on static nodes. This feature is still in beta.',
      },
    ],
  },

  whyLookForAlternative: {
    badge: 'Why Businesses Look for a Bolna Alternative',
    title: 'Where Bolna falls short for growing teams',
    subtitle:
      'Bolna has built a real user base in India. Their newsroom claims 1,000 plus companies and 500,000 monthly conversations. But the same users start searching for alternatives to Bolna when they hit pricing cliffs, bump into the 10 concurrent call cap, try to plug into Salesforce or HubSpot, or ask about HIPAA and GDPR for regulated workloads. Review data on Trustpilot and Reddit shows a clear pattern of churn around cost predictability, compliance gaps, and integration friction.',
    reasons: [
      {
        icon: DollarSign,
        title: 'High Pricing',
        summary: '$0.02/min platform fee - STT, LLM, TTS, and telephony billed separately.',
        description:
          'Bolna does publicly list pricing, but the model is orchestration only. The platform fee is $0.02 per minute, and the actual cost is higher because speech to text, LLM, text to speech, and telephony are billed separately. Reviewers on Ringg AI and Kipps AI note that the total bill scales unpredictably. A user moving from 20,000 to 21,000 minutes can jump from a 100,000 rupee plan to a 180,000 rupee plan. That cliff makes budgeting hard for growing teams and pushes them toward Bolna competitors with simpler pricing.',
      },
      {
        icon: Layers,
        title: 'Limited Customization',
        summary: 'No proprietary fine-tuning path; advanced voice training gated behind enterprise.',
        description:
          'Bolna gives users control over prompts, models, and per language providers. That flexibility is real. What is missing is fine tuning. Bolna does not offer a proprietary trained model or a fine tuning service on top of third party LLMs. Teams that want to train a model on their own call data and call outcomes have no path forward inside Bolna. Voice cloning is supported but advanced custom voice training at scale is gated behind enterprise plans, which limits what mid market teams can do.',
      },
      {
        icon: Scale,
        title: 'Industry-Specific Requirements',
        summary: 'No public HIPAA, BAA, PCI DSS, or dedicated pages for several verticals.',
        description:
          'Bolna lists six industry verticals on their homepage. Healthcare is one of them, but the site does not mention HIPAA, BAA, or any healthcare specific compliance certification. Finance and banking are covered under BFSI, but PCI DSS is not mentioned anywhere on the public site. Education, real estate, automotive, and travel do not have dedicated industry pages. Businesses in regulated industries, or in verticals outside Bolna’s core six, often find the templates and compliance posture insufficient for their needs and start looking for an AI voice agent alternative to Bolna.',
      },
      {
        icon: Plug,
        title: 'Integration Challenges',
        summary: 'No native CRM connectors - every sync goes through Zapier, n8n, or webhooks.',
        description:
          'Bolna’s integrations page lists telephony providers, LLMs, transcribers, synthesizers, and no code automation platforms. What is missing is native CRM connectors. Salesforce, HubSpot, Zoho, Zendesk, and Pipedrive are not listed. Every CRM sync has to go through Zapier, n8n, Make.com, or a custom webhook. Reviewers on BrixiAI explicitly call this out as a limitation. For teams that want plug and play CRM sync, the middleware requirement adds setup time, ongoing subscription cost, and a failure point that does not exist on platforms with native connectors.',
      },
      {
        icon: AlertTriangle,
        title: 'Scalability Concerns',
        summary: 'Default plan caps at 10 concurrent calls; latency stated under 300ms.',
        description:
          'Bolna markets thousands of simultaneous calls, but the default paid plan caps concurrency at 10 calls. The Pilot plan raises that to 100 concurrent calls for an upfront payment of $500 to $1,000. Enterprise plans unlock hundreds or thousands of concurrent calls with custom pricing. Latency is stated at under 300 milliseconds, which is slower than several Bolna competitors that publish sub 200 millisecond figures. For teams that need to handle peak hour spikes without upgrading plans, the default cap is a real bottleneck that surfaces in reviews.',
      },
    ],
  },

  comparison: {
    badge: 'OnDial vs Bolna',
    title: 'OnDial vs Bolna: Quick Comparison',
    subtitle:
      'This table compares OnDial and Bolna on the points where Bolna shows a documented gap, partial support, or undisclosed status.',
    closing:
      'The comparison shows that OnDial covers every category where Bolna is partial, undisclosed, or absent, with no enterprise gating on the basics.',
    rows: [
      { feature: 'HIPAA Compliance', ondial: 'yes', competitor: 'no' },
      { feature: 'GDPR Compliance', ondial: 'yes', competitor: 'no' },
      { feature: 'SOC 2 Compliance', ondial: 'yes', competitor: 'no' },
      { feature: 'PCI DSS Compliance', ondial: 'yes', competitor: 'no' },
      {
        feature: 'Native CRM Integrations (Salesforce, HubSpot)',
        ondial: 'yes',
        competitor: 'no',
      },
      {
        feature: '100+ Language Support',
        ondial: 'yes',
        competitor: 'partial',
        competitorNote: '10+ Indian languages',
      },
      {
        feature: 'Advanced Voice Analytics (Sentiment, Intent)',
        ondial: 'yes',
        competitor: 'no',
      },
      {
        feature: 'Default High Concurrency Without Plan Upgrade',
        ondial: 'yes',
        competitor: 'partial',
        competitorNote: '10 calls on default plan',
      },
      {
        feature: 'Sub 200 Millisecond Response Latency',
        ondial: 'yes',
        competitor: 'partial',
        competitorNote: 'under 300ms stated',
      },
      {
        feature: 'Transparent All-In Per Minute Pricing',
        ondial: 'yes',
        competitor: 'partial',
        competitorNote: '$0.02 platform fee + separate STT/LLM/TTS',
      },
    ],
  },

  whyOnDial: {
    badge: 'Why OnDial is the Best Bolna Alternative',
    title: 'Why OnDial is the best Bolna alternative',
    intro:
      'OnDial is built to do everything Bolna does, and then go further - native CRM sync, advanced analytics, sub 200 millisecond latency, and compliance badges that hold up under procurement review.',
    highlightPills: ['Native CRM sync', '100+ languages', 'Full compliance stack'],
    features: [
      {
        icon: Bot,
        title: 'Better Call Automation',
        summary: 'Thousands of simultaneous conversations without a plan upgrade.',
        description:
          'OnDial handles inbound and outbound calls from a single AI agent that runs 24/7. The platform supports thousands of simultaneous conversations with elastic infrastructure, so peak hour spikes do not require a plan upgrade. Bolna caps default concurrency at 10 calls. OnDial’s automation covers appointment booking, lead qualification, reminders, surveys, and support tier one, all configurable through prebuilt industry templates without engineering work.',
      },
      {
        icon: Rocket,
        title: 'Faster Deployment',
        summary: 'Prebuilt templates for 8+ industries - live in under 30 minutes.',
        description:
          'OnDial gets teams live in under 30 minutes using prebuilt templates for healthcare, finance, education, real estate, ecommerce, logistics, insurance, and recruitment. Connect a phone number, pick a template, and the agent is ready to take calls. Bolna’s no code playground builds an agent in 5 to 8 minutes, but production deployment with telephony, integrations, and CRM sync takes longer, especially without native CRM connectors.',
      },
      {
        icon: Mic,
        title: 'Higher Call Accuracy',
        summary: '99.4% transcription accuracy with sub-200ms latency and native intent detection.',
        description:
          'OnDial publishes a 99.4 percent transcription accuracy figure on its homepage, with response latency under 200 milliseconds. Intent detection, sentiment analysis, and lead scoring happen inside every call. Bolna claims under 300 millisecond latency and does not publish transcription accuracy. Bolna also lacks native sentiment analysis, intent classification, and QA scoring, so accuracy measurement has to happen outside the platform.',
      },
      {
        icon: Workflow,
        title: 'Flexible AI Workflows',
        summary: 'No-code branching, objectives, and escalation - no middleware required.',
        description:
          'OnDial runs custom logic, branching conversations, and objective based campaigns through a no code configuration model. Business teams define audience, objective, and success criteria, then launch. Human escalation kicks in when a call needs a person, with full context captured. Bolna offers Graph Agents in beta for visual flow design, but the broader workflow story depends on Zapier, n8n, or Make.com for anything beyond the call itself.',
      },
      {
        icon: Shield,
        title: 'Enterprise-Grade Security',
        summary: 'HIPAA, GDPR, PCI DSS, SOC 2, ISO, TRAI DLT & DPDP readiness documented.',
        description:
          'OnDial displays HIPAA, GDPR, PCI DSS, SOC 2, and ISO compliance badges on its homepage, with India specific TRAI DLT and DPDP readiness on the enterprise page. Bolna does not publicly list HIPAA, GDPR, SOC 2, ISO 27001, or PCI DSS certifications. Bolna’s on premise option helps with data sovereignty, but the absence of named compliance certifications is a blocker for regulated procurement teams in healthcare, banking, and insurance.',
      },
      {
        icon: DollarSign,
        title: 'Cost-Effective Pricing',
        summary: 'All-in pricing from $0.055/min - one bill covers AI, telephony, and platform.',
        description:
          'OnDial pricing is usage based and transparent, starting at $0.055 per minute for up to 10,000 minutes and dropping to $0.045 per minute above 25,000 minutes. The price includes the AI stack, telephony connectors, and platform fees. Bolna’s $0.02 platform fee is lower on paper, but speech to text, LLM, text to speech, and telephony are billed on top, which makes the total cost per minute higher and harder to predict.',
      },
    ],
  },

  ondialFeatures: {
    badge: 'Key Features of OnDial',
    title: 'Key Features of OnDial',
    subtitle:
      'OnDial brings every capability a business needs to run voice AI at scale, with each feature built around a real outcome rather than a checkbox.',
    categories: [
      { id: 'core', label: 'Core Platform' },
      { id: 'inbound', label: 'Inbound' },
      { id: 'outbound', label: 'Outbound' },
      { id: 'intelligence', label: 'Intelligence' },
    ],
    features: [
      {
        icon: 'Bot',
        category: 'core',
        title: 'AI Voice Agents',
        summary: 'One agent for inbound, outbound, and 24/7 coverage with CRM logging.',
        description:
          'OnDial AI Voice Agents are software systems that handle phone calls using artificial intelligence, without a human on the line. They answer instantly, speak naturally, and log every call to the CRM. One agent handles inbound, outbound, and 24/7 coverage, removing the need to stitch together multiple point solutions.',
      },
      {
        icon: 'PhoneCall',
        category: 'core',
        title: 'AI Phone Calling',
        summary: 'End-to-end outbound and inbound calls at thousands of simultaneous conversations.',
        description:
          'AI Phone Calling on OnDial automates outbound and inbound voice calls end to end. The platform places calls at configured volume, follows the campaign objective, answers questions, and adapts to the conversation. Calls scale to thousands of simultaneous conversations without provisioning new hardware, so peak hour spikes do not break the platform.',
      },
      {
        icon: 'Headphones',
        category: 'inbound',
        title: 'Inbound Call Automation',
        summary: 'Answers in under 3 seconds with smart escalation and full context.',
        description:
          'Inbound Call Automation handles support lines, FAQ lines, and lead intake lines. The agent answers in under 3 seconds, identifies the caller, resolves tier one issues, and escalates to a human with full context when needed. Customer wait times drop, and human agents only handle the calls that actually need them.',
      },
      {
        icon: 'PhoneCall',
        category: 'outbound',
        title: 'Outbound Call Automation',
        summary: 'Cold outreach, EMI reminders, renewals, and surveys with auto-retry.',
        description:
          'Outbound Call Automation runs cold outreach, EMI reminders, payment follow ups, renewal notices, win back campaigns, and surveys at scale. Teams upload a contact list, pick an objective, and launch. Calling guardrails keep outbound within regulated hours. Auto retry handles no answer and busy lines without manual intervention.',
      },
      {
        icon: 'Calendar',
        category: 'outbound',
        title: 'Appointment Booking',
        summary: 'Live calendar checks, confirmations, and CRM sync inside the call.',
        description:
          'Appointment Booking on OnDial checks live calendar availability, schedules the appointment, confirms with the caller, and syncs the booking back to the CRM. Reschedules and cancellations happen inside the same call. Healthcare clinics, salons, real estate agents, and consultants use this to capture bookings outside business hours.',
      },
      {
        icon: 'Target',
        category: 'outbound',
        title: 'Lead Qualification',
        summary: 'BANT-style scoring routes hot leads to sales instantly.',
        description:
          'Lead Qualification uses predefined questions, BANT style frameworks, and AI scoring to route hot leads to the sales team instantly. The agent asks the right questions, captures answers, scores intent, and pushes the lead into the CRM with a status. Sales reps only spend time on leads that actually warrant a conversation.',
      },
      {
        icon: 'Headphones',
        category: 'inbound',
        title: 'Customer Support Automation',
        summary: 'Tier-one FAQs, order lookups, and billing with context-rich escalation.',
        description:
          'Customer Support Automation handles tier one issues end to end. The agent answers FAQs, looks up order status, processes billing inquiries, logs complaints, and follows up after a visit. Human escalation carries the full conversation context so the customer never repeats themselves. Support metrics improve while cost per contact drops.',
      },
      {
        icon: 'BarChart3',
        category: 'intelligence',
        title: 'Voice AI Analytics',
        summary: 'Sentiment, CSAT, intent, lead score, and auto-generated call summaries.',
        description:
          'Voice AI Analytics turns every call into structured data. The dashboard shows sentiment, CSAT, resolution rate, intent, lead score, and conversion tracking. Call summaries are auto generated. Managers spot failing scripts, hostile calls, and compliance risks without listening to recordings. This is the analytics layer Bolna does not offer natively.',
      },
      {
        icon: 'Languages',
        category: 'intelligence',
        title: 'Multi-Language Conversations',
        summary: '100+ languages with 50+ regional accents and auto language detection.',
        description:
          'Multi Language Conversations on OnDial cover 100 plus languages with 50 plus regional accents. The agent auto detects the caller’s language and responds naturally, with no extra setup. English, Hindi, Tamil, Telugu, Bengali, Marathi, Gujarati, Kannada, Malayalam, Punjabi, Spanish, French, German, Portuguese, Japanese, Chinese, Arabic, Korean, Italian, and Russian are all supported out of the box.',
      },
    ],
  },

  useCases: {
    badge: 'Use Cases',
    title: 'Use Cases Where OnDial Outperforms Bolna',
    subtitle:
      'OnDial ships prebuilt templates for these industries, with native CRM sync and compliance posture built in. Bolna covers some of these verticals on its homepage but does not offer the same depth of template, integration, or compliance documentation.',
    industries: [
      {
        icon: Stethoscope,
        title: 'Healthcare',
        summary: 'Appointment booking, reminders, lab follow-ups & chronic care with HIPAA documentation.',
        bullets: ['60% no-show reduction cited on OnDial', '3x more after-hours appointments', '85% patient satisfaction'],
        edge: 'OnDial documents HIPAA - Bolna lists HealthTech but not HIPAA or BAA.',
        description:
          'Healthcare providers use OnDial for appointment booking, reminder calls 24 to 48 hours before a visit, lab result follow ups, prescription refill requests, insurance pre authorization queries, post visit follow ups, and chronic disease management. OnDial publishes a 60 percent no show reduction, 3 times more after hours appointments, and 85 percent patient satisfaction. Bolna lists HealthTech as a vertical but does not document HIPAA or BAA, which is a dealbreaker for US and global healthcare buyers.',
      },
      {
        icon: Shield,
        title: 'Insurance',
        summary: 'Policy renewals, claims intake, fraud alerts & KYC with PCI DSS posture.',
        bullets: ['Compliance transcripts & audit logs', 'Premium reminders & cross-sell', 'Regulatory reporting support'],
        edge: 'PCI DSS documented - Bolna does not publicly state PCI DSS, GDPR, or SOC 2.',
        description:
          'Insurance carriers and brokers use OnDial for policy renewals, claims intake, premium reminders, fraud alerts, KYC verification, and cross sell campaigns. Compliance transcripts and audit logs support regulatory reporting. OnDial’s PCI DSS posture covers payment conversations. Bolna lists BFSI as a vertical but does not publicly state PCI DSS, GDPR, or SOC 2 compliance, which creates procurement friction for insurance IT teams.',
      },
      {
        icon: Building2,
        title: 'Real Estate',
        summary: 'Property inquiries, showing scheduling & broker routing with CRM sync.',
        bullets: ['Calendar booking inside the call', 'Post-visit follow-ups', 'Lead nurture at scale'],
        edge: 'Dedicated real estate templates - Bolna has no dedicated real estate industry page.',
        description:
          'Real estate firms use OnDial for property inquiries, showing scheduling, lead nurturing, post visit follow ups, and broker lead routing. The agent books showings directly into the calendar and syncs to the CRM. OnDial has a dedicated real estate industry page with templates. Bolna does not have a dedicated real estate industry page on their site, which leaves teams to build flows from scratch.',
      },
      {
        icon: GraduationCap,
        title: 'Education',
        summary: 'Enrollment, fee reminders, attendance alerts & onboarding nudges.',
        bullets: ['Enrollment confirmation calls', 'Fee & attendance reminders', 'Course recommendations'],
        edge: 'Dedicated education page with templates - Bolna lists EdTech without templated flows.',
        description:
          'Education providers use OnDial for enrollment calls, student follow ups, fee reminders, attendance alerts, course recommendations, and onboarding nudges. OnDial has a dedicated education page with templates and integration patterns. Bolna lists EdTech as a vertical but does not publish a dedicated education industry page with templated flows, so education teams have to design their own conversation scripts.',
      },
      {
        icon: ShoppingCart,
        title: 'E-commerce',
        summary: 'Cart recovery, COD confirmation, order updates & returns with live CRM data.',
        bullets: ['Abandoned cart recovery', 'COD confirmation & delivery rescheduling', 'Post-purchase feedback'],
        edge: 'Native CRM and ecommerce connectors - Bolna’s integrations page does not document them.',
        description:
          'Ecommerce brands use OnDial for cart abandonment recovery, COD confirmation, order status updates, return processing, delivery rescheduling, and post purchase feedback. The agent pulls order data from the CRM or ecommerce platform in real time. Bolna lists ecommerce as a vertical and offers cart abandonment and COD confirmation templates, but native CRM and ecommerce platform connectors are not documented on their integrations page.',
      },
      {
        icon: Landmark,
        title: 'Banking & Finance',
        summary: 'Loan origination, EMI reminders, KYC & fraud alerts with TRAI DLT and PCI DSS.',
        bullets: ['Debt recovery & settlement calls', 'Credit card sales outreach', 'Fraud alert automation'],
        edge: 'PCI DSS, SOC 2 & ISO documented - Bolna does not publicly list them.',
        description:
          'Banks, lenders, and fintechs use OnDial for loan origination calls, EMI reminders, debt recovery, KYC verification, fraud alerts, credit card sales, and settlement discussions. OnDial supports TRAI DLT and DPDP for India plus PCI DSS for payment conversations. Bolna serves BFSI but does not publicly list PCI DSS, SOC 2, or ISO 27001, which makes enterprise procurement in banking slower and riskier.',
      },
      {
        icon: UserPlus,
        title: 'Recruitment',
        summary: 'Candidate screening, interview scheduling & onboarding reminders at volume.',
        bullets: ['First-call screening', 'Job offer follow-ups', 'Employee satisfaction surveys'],
        edge: 'Analytics and native CRM sync depth beyond Bolna’s recruitment case studies.',
        description:
          'Recruitment agencies and HR tech firms use OnDial for candidate screening, interview scheduling, job offer follow ups, onboarding reminders, and employee satisfaction surveys. OnDial has a recruitment template in its enterprise page. Bolna also serves recruitment with case studies from Awign, Hyreo, and Futwork, but the underlying platform lacks the analytics and CRM sync depth that high volume recruitment requires.',
      },
    ],
  },

  industriesUsingOnDial: {
    badge: 'Industries Using OnDial',
    title: 'Industries Using OnDial',
    subtitle:
      'OnDial is the established choice for businesses that need voice AI with compliance, scale, and CRM sync built in. The platform ships ready to deploy templates across these industries.',
    industries: [
      {
        icon: Stethoscope,
        title: 'Healthcare',
        description:
          'OnDial handles appointment booking, reminders, lab follow ups, prescription refills, and post visit care for clinics, hospitals, and pharmacy chains. HIPAA friendly setup goes live in under 30 minutes.',
      },
      {
        icon: Shield,
        title: 'Insurance',
        description:
          'OnDial supports policy renewals, claims intake, premium reminders, fraud alerts, and cross sell campaigns. Compliance transcripts and audit logs back every call.',
      },
      {
        icon: Building2,
        title: 'Real Estate',
        description:
          'OnDial manages property inquiries, showing scheduling, broker routing, and post visit follow ups. Calendar and CRM sync happen inside the call.',
      },
      {
        icon: Car,
        title: 'Automotive',
        description:
          'OnDial runs service reminder calls, test drive bookings, recall notifications, and post service feedback for dealerships and service centers.',
      },
      {
        icon: Plane,
        title: 'Travel',
        description:
          'OnDial handles booking confirmations, itinerary changes, departure reminders, feedback calls, and loyalty program outreach for travel agencies and airlines.',
      },
      {
        icon: GraduationCap,
        title: 'Education',
        description:
          'OnDial automates enrollment calls, fee reminders, attendance alerts, course recommendations, and onboarding for schools, coaching institutes, and EdTech platforms.',
      },
      {
        icon: Landmark,
        title: 'Finance',
        description:
          'OnDial covers loan origination, EMI reminders, debt recovery, KYC verification, fraud alerts, and settlement discussions for banks, NBFCs, and fintechs.',
      },
    ],
  },

  migration: {
    badge: 'Migration from Bolna to OnDial',
    title: 'Migration from Bolna to OnDial',
    subtitle:
      'Switching voice AI platforms feels risky, but OnDial has built the migration path to remove that risk. Templates, CRM sync, and onboarding support make the move straightforward.',
    steps: [
      {
        icon: ArrowRightLeft,
        title: 'How Easy is the Transition?',
        summary: 'Prebuilt templates for 8+ industries - most teams live in under 30 minutes.',
        description:
          'The transition is straightforward. OnDial ships prebuilt templates for 8 plus industries, so most teams start from a template that already matches their use case rather than building from scratch. The platform’s no code setup means business teams create, launch, and manage campaigns without a central technical dependency. Most teams are live in under 30 minutes for a single use case, and full enterprise deployment typically takes 3 weeks.',
      },
      {
        icon: Database,
        title: 'Data Migration Process',
        summary: 'Contact lists, scripts, CRM mappings, and recordings transfer through onboarding.',
        description:
          'Contact lists, call scripts, and CRM mappings transfer into OnDial through the onboarding workflow. Phone numbers can be ported or new numbers provisioned through OnDial’s telephony partners. Existing call recordings and transcripts can be imported for analytics context. For specific migration timelines and custom data imports, OnDial’s team handles the scoping directly with the customer.',
      },
      {
        icon: Workflow,
        title: 'Workflow Recreation',
        summary: 'Rebuild Bolna flows with native CRM sync instead of Zapier middleware.',
        description:
          'Existing Bolna call flows rebuild inside OnDial using the campaign configuration model. Define the audience, the objective, the success criteria, and the escalation rules. Branching logic, custom API triggers, and human handoff all map across. Where Bolna required Zapier or n8n for post call workflows, OnDial handles CRM sync, calendar booking, and notifications natively, removing the middleware layer.',
      },
      {
        icon: Users,
        title: 'Team Training & Support',
        summary: 'No-code interface with dedicated onboarding and 24-hour email response.',
        description:
          'OnDial’s no code interface means business users learn the platform quickly without a developer in the loop. The enterprise tier includes dedicated onboarding, regular check ins, and priority support. The contact page commits to a 24 hour response window on email. For larger rollouts, OnDial scopes training and change management with the customer’s team directly.',
      },
    ],
  },

  switchBenefits: {
    badge: 'Benefits of Switching',
    title: 'Benefits of Switching to OnDial',
    subtitle: 'Switching to OnDial changes the math on voice AI. Cost per call drops, customer experience improves, and teams scale without growing headcount.',
    benefits: [
      {
        icon: 'DollarSign',
        title: 'Reduce Operational Costs',
        summary: 'Under $1 per AI resolution vs $7.16 for a human inbound call.',
        description:
          'OnDial handles calls for under $1 per resolution, compared to a $7.16 average for a human inbound call. Mid market businesses reduce cost per contact by over 60 percent in the first six months. The unified pricing model means one bill covers AI, telephony, and platform, so finance teams can budget without modeling four vendor invoices.',
      },
      {
        icon: 'Heart',
        title: 'Improve Customer Experience',
        summary: 'Answers in under 3 seconds with 90% tier-one resolution on first call.',
        description:
          'Customers get answers in under 3 seconds, with the AI agent resolving 90 percent of tier one issues on the first call. Sentiment analysis flags frustrated callers in real time. Human escalations carry full context, so customers never repeat themselves. CSAT and NPS scores rise measurably after the switch.',
      },
      {
        icon: 'TrendingUp',
        title: 'Increase Agent Productivity',
        summary: 'AI handles qualification, booking, and FAQs - reps focus on high-value calls.',
        description:
          'Human agents only handle the calls that need a human. Lead qualification, appointment booking, FAQs, and order status lookups are handled by the AI. Agents spend their time on complex, high value conversations. Workforce efficiency improves by up to 30 percent based on OnDial’s published case material.',
      },
      {
        icon: 'Users',
        title: 'Scale Without Hiring',
        summary: 'Thousands of simultaneous calls without provisioning hardware or new hires.',
        description:
          'OnDial’s elastic infrastructure handles thousands of simultaneous calls without provisioning new hardware or hiring new agents. Seasonal spikes, campaign launches, and growth surges do not trigger recruiting cycles. Teams scale call volume 10 times without scaling headcount, which is the core economic promise of voice AI done right.',
      },
      {
        icon: 'Clock',
        title: '24/7 Availability',
        summary: 'Support lines, bookings, and reminders never close - including holidays.',
        description:
          'OnDial runs 24 hours a day, 7 days a week, including holidays. Customers call when they want to call. Appointments get booked outside business hours. Reminders go out on schedule. Support lines never close. This alone shifts the customer experience for industries like healthcare, banking, and ecommerce.',
      },
    ],
  },

  successStories: {
    badge: 'Customer Success Stories',
    title: 'Customer Success Stories',
    intro:
      'OnDial works with 500 plus businesses across healthcare, finance, insurance, real estate, and ecommerce.',
    outcomesTitle: 'Real Business Outcomes',
    outcomesNote:
      'OnDial’s healthcare industry page features a verified testimonial from Dr. Priya Nair, Medical Director at Wellness First Clinics in Bangalore. She reports that OnDial now handles 70 percent of all bookings automatically, with happier staff and patients who love the instant response.',
    examples: [
      {
        title: 'Wellness First Clinics (Bangalore)',
        description:
          'Dr. Priya Nair, Medical Director, reports that OnDial handles 70 percent of all bookings automatically. Staff spend less time on the phone and patients get instant responses for scheduling and reminders.',
      },
      {
        title: 'Mid-market insurance carrier',
        description:
          'A mid market insurance carrier uses OnDial for policy renewal outreach and claims intake across 8 lines of business. Compliance transcripts and audit logs support regulatory reporting on every call.',
      },
      {
        title: 'National real estate franchise',
        description:
          'A national real estate franchise uses OnDial to handle property inquiry calls across 40 markets, booking showings directly into agent calendars with native CRM sync.',
      },
    ],
    roiTitle: 'ROI Achieved with OnDial',
    roiBullets: [
      { label: 'No-show reduction', detail: '60% fewer no-shows reported on healthcare deployments' },
      { label: 'After-hours bookings', detail: '3x more appointments captured outside business hours' },
      { label: 'Cost per resolution', detail: 'Under $1 per AI resolution vs $7.16 for human inbound' },
      { label: 'Contact cost', detail: 'Over 60% reduction in cost per contact in the first six months' },
    ],
    roiDescription:
      'OnDial’s healthcare page reports 85 percent patient satisfaction, $22,000 saved per year per clinic in admin staffing, 90 percent call resolution rate, and under 3 second average answer time. Actual results vary by use case and call volume.',
  },

  faqs: [
    {
      question: 'Is OnDial a good alternative to Bolna?',
      answer:
        'Yes. OnDial covers everything Bolna does, including inbound and outbound calling, multilingual support, and bulk campaigns. OnDial adds native CRM sync, 100 plus language coverage, HIPAA and GDPR compliance, advanced analytics, and sub 200 millisecond latency. For regulated industries and global teams, OnDial is the stronger fit.',
    },
    {
      question: 'How does OnDial pricing compare to Bolna?',
      answer:
        'OnDial pricing starts at $0.055 per minute and drops to $0.045 per minute above 25,000 minutes, with the AI stack, telephony connectors, and platform fees included. Bolna’s $0.02 platform fee is lower on paper, but speech to text, LLM, text to speech, and telephony are billed separately, which makes the total cost harder to predict.',
    },
    {
      question: 'Can I switch from Bolna to OnDial without losing data?',
      answer:
        'Yes. Contact lists, call scripts, and CRM mappings transfer into OnDial through the onboarding workflow. Phone numbers can be ported or new numbers provisioned. Existing call recordings and transcripts can be imported for analytics context. OnDial’s team scopes the migration timeline with each customer.',
    },
    {
      question: 'Does OnDial support the same integrations as Bolna?',
      answer:
        'OnDial supports Twilio, HubSpot, Salesforce, Calendly, Slack, and Zapier natively. Bolna supports Twilio, Plivo, Exotel, Vobiz, and workflow tools like n8n, Make.com, Zapier, and viaSocket, but does not list native CRM connectors for Salesforce or HubSpot. OnDial covers CRM sync without middleware.',
    },
    {
      question: 'Which industries is OnDial best suited for?',
      answer:
        'OnDial ships prebuilt templates for healthcare, insurance, real estate, automotive, travel, education, finance, ecommerce, logistics, and recruitment. The platform is particularly strong in regulated industries because of HIPAA, GDPR, PCI DSS, SOC 2, and ISO compliance badges, plus India’s TRAI DLT and DPDP readiness.',
    },
    {
      question: 'Is OnDial better for outbound or inbound calls?',
      answer:
        'Both. OnDial runs inbound and outbound from a single AI agent, with 24/7 coverage. Inbound handles support, lead intake, and FAQs. Outbound handles cold outreach, reminders, renewals, surveys, and recovery campaigns. The same analytics, CRM sync, and escalation rules apply to both directions.',
    },
    {
      question: 'How long does it take to get started with OnDial?',
      answer:
        'Most teams are live in under 30 minutes for a single use case. Pick an industry template, connect a phone number, configure the objective, and launch. Full enterprise deployment across multiple use cases and teams typically takes 3 weeks with OnDial’s onboarding support.',
    },
  ],

  cta: {
    badgeIcon: 'Bot',
    badgeText: 'Ready to Switch?',
    title: 'Start with OnDial - the best',
    highlightedTitle: 'Bolna alternative',
    description:
      'OnDial matches every Bolna capability, then adds HIPAA, GDPR, PCI DSS, SOC 2, and ISO badges, 100 plus language coverage, native Salesforce and HubSpot connectors, and transparent all-in pricing. Start a free 14 day trial and go live in under 30 minutes.',
    primaryButtonText: 'Start Free Trial',
    secondaryButtonText: 'Book Free Demo',
    primaryButtonLink: '/signup',
    secondaryButtonLink: '/contact',
  },
};
