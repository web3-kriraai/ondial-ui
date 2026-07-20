import {
  PhoneCall,
  Zap,
  Shield,
  Clock,
  Globe,
  Bot,
  Mic,
  DollarSign,
  Users,
  Building2,
  Stethoscope,
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
  BookOpen,
  TestTube2,
  KeyRound,
} from 'lucide-react';

export const retellAIAlternativePageData = {
  competitor: { name: 'Retell AI' },

  meta: {
    title: "Best Retell AI Alternative | OnDial's AI Voice Agents",
    description:
      'Looking for the best Retell AI alternative? OnDial offers flat predictable pricing, no-code setup, 100+ languages, and dedicated support on every plan. Compare now.',
    canonical: '/best-retell-ai-alternative',
  },

  hero: {
    badge: 'OnDial vs Retell AI',
    title: 'Best Retell AI Alternative',
    subtitle:
      'Retell AI voice quality is strong, but bills get hard to predict, setup feels built for engineers, and help often means Discord. OnDial gives everything Retell offers - natural AI voice agents, inbound and outbound, analytics, and integrations - plus simple flat pricing, deep language support, and no-code setup.',
    highlights: [
      'Voice-only rate of $0.07/min becomes $0.13–$0.31/min all-in',
      'Developer-first setup - ops teams need engineering for changes',
      'Support often means Discord on starter plans',
      'No dedicated real estate, education, automotive, or recruitment pages',
    ],
    description:
      'Teams that try Retell AI for AI phone agents often hit stacked component pricing, a steep learning curve, and community-only support on lower plans. OnDial is built for predictable bills, no-code launches, and dedicated help on every plan.',
    primaryButtonText: 'Start Free Trial',
    secondaryButtonText: 'Compare Features',
    primaryButtonLink: '/signup',
    secondaryButtonLink: '#comparison',
    stats: [
      { value: '100+', label: 'languages supported', icon: Globe },
      { value: 'Flat pricing', label: 'from $0.055/min all-in', icon: DollarSign },
      { value: 'No-code', label: 'go live in under 30 minutes', icon: Zap },
      { value: '<200ms', label: 'sub-200 millisecond latency', icon: Clock },
    ],
  },

  whatIsCompetitor: {
    badge: 'What is Retell AI?',
    title: 'Understanding the platform you are comparing',
    summary:
      'Retell AI is a voice agent platform to build, test, deploy, and monitor AI phone agents with LLM-based natural conversations, aimed at developers and engineering-led teams.',
    stats: [
      { label: 'Launched', value: '2022' },
      { label: 'Latency', value: '~600ms' },
      { label: 'Languages', value: '31+' },
      { label: 'Voice rate', value: '$0.07/min' },
    ],
    highlights: [
      'LLM-based agents with natural, fast phone conversations',
      'Assemble agents from LLM + voice engine + telephony stack',
      'Targets developers and engineering-led teams',
      'G2 reviewers call it closer to infrastructure than a ready-to-run business tool',
    ],
    paragraphs: [
      'Retell AI is a voice agent platform designed to build, test, deploy, and monitor AI phone agents. Conversations are LLM-based and marketed as natural and fast. The company launched in 2022 and positions itself as third-generation voice AI - teams assemble an agent from an LLM, a voice engine, and a telephony stack rather than buying a finished business product.',
      'The platform targets developers and engineering-led teams. Product surfaces include an agentic call flow builder, real-time function calling, a streaming knowledge base, testing and QA tools, and a telephony stack with SIP, Twilio, and branded caller ID. Enterprise customers get HIPAA, SOC 2 Type II, SSO, PII redaction, and on-prem options.',
      'On G2, reviewers often describe Retell AI as closer to infrastructure than a ready-to-run business tool. That developer-first posture is why many non-engineering teams start searching for a Retell AI alternative with flat pricing, no-code setup, and dedicated support.',
    ],
  },

  competitorFeatures: {
    badge: 'Competitor Capabilities',
    title: 'What Retell AI offers today',
    subtitle:
      'Retell AI lists a strong technical feature set aimed at teams that can wire LLMs, voice engines, and telephony together.',
    features: [
      {
        icon: PhoneCall,
        title: 'AI Voice Agents',
        summary: 'Realistic voices with roughly 600ms response latency.',
        description:
          'Retell AI ships AI phone agents with realistic voices and published latency around 600 milliseconds. Agents handle inbound and outbound calls with LLM-driven conversation, aimed at teams that want natural sounding phone AI.',
      },
      {
        icon: Workflow,
        title: 'Agentic Call Flow Builder',
        summary: 'Visual builder that is still maturing - complex agents need the API.',
        description:
          'The call flow builder lets teams design agentic conversations visually. Reviews and product notes describe it as maturing. Complex agents often still require API work, which keeps the platform developer-first for advanced use cases.',
      },
      {
        icon: Zap,
        title: 'Real-Time Function Calling',
        summary: 'Mid-call tools and API actions driven by the LLM.',
        description:
          'Live conversations can trigger functions and external APIs in real time. This is one of Retell AI’s stronger technical features for teams that already have backend services to connect.',
      },
      {
        icon: BookOpen,
        title: 'Streaming Knowledge Base',
        summary: 'Document and knowledge retrieval billed as an extra per-minute cost.',
        description:
          'Retell AI offers a streaming knowledge base so agents can pull from documents during a call. That capability is billed as an additional per-minute cost on top of the voice rate, which adds to total spend.',
      },
      {
        icon: TestTube2,
        title: 'Testing and QA',
        summary: 'Tools to test and monitor agents before and after go-live.',
        description:
          'Teams can build, test, deploy, and monitor agents from one platform. QA tooling helps catch script and flow issues before production volume, which fits Retell’s developer and engineering audience.',
      },
      {
        icon: Plug,
        title: 'Telephony Stack',
        summary: 'SIP, Twilio, and branded caller ID for production calling.',
        description:
          'Retell AI supports SIP, Twilio, and branded caller ID so teams can connect numbers and place production calls. Telephony is a separate cost layer alongside voice and LLM usage.',
      },
      {
        icon: KeyRound,
        title: 'Enterprise Security',
        summary: 'HIPAA, SOC 2 Type II, SSO, PII redaction, and on-prem on enterprise.',
        description:
          'Enterprise plans include HIPAA, SOC 2 Type II, SSO, PII redaction, and on-prem options. Security depth is real for regulated buyers, but many of these controls sit behind enterprise packaging rather than every plan.',
      },
    ],
  },

  whyLookForAlternative: {
    badge: 'Why Businesses Look for a Retell AI Alternative',
    title: 'Where Retell AI falls short for growing teams',
    subtitle:
      'Retell AI has strong voice quality and a solid developer toolkit. The same teams start searching for alternatives when bills stack across voice, LLM, telephony, and knowledge base, when ops cannot change flows without engineering, when industry templates are missing, or when support on starter plans means Discord and email instead of dedicated help.',
    reasons: [
      {
        icon: DollarSign,
        title: 'High Pricing',
        summary: '$0.07/min voice only - real cost often $0.13–$0.31/min all-in.',
        description:
          'Retell AI lists a voice rate around $0.07 per minute, but the real cost climbs once LLM usage, telephony, and the streaming knowledge base are added. Teams commonly see $0.13 to $0.31 per minute all-in. At 10,000 minutes, that estimates roughly $1,200 to $1,800 per month - hard to budget compared with flat per-minute platforms. Concurrency above the free 20 slots also costs about $8 per slot per month, and billing can continue during silence and hold.',
      },
      {
        icon: Layers,
        title: 'Limited Customization',
        summary: 'Steep learning curve - 87 G2 mentions of difficult navigation.',
        description:
          'Retell AI is flexible for engineers, but the learning curve is steep for business teams. G2 reviews include about 87 mentions of difficult navigation. The agentic builder is still maturing, and complex agents often need the API. Operations teams cannot change prompts, flows, or campaigns without engineering help, which slows iteration and pushes teams toward a no-code Retell AI alternative.',
      },
      {
        icon: Scale,
        title: 'Industry-Specific Requirements',
        summary: 'Pages for healthcare, FS, insurance, logistics, retail & travel - gaps elsewhere.',
        description:
          'Retell AI publishes industry pages for healthcare, financial services, insurance, logistics, home services, retail, travel, and debt collection. There are no dedicated pages for real estate, education, automotive, or recruitment. Teams in those verticals need templates, scripts, and go-to-market patterns that Retell does not ship out of the box.',
      },
      {
        icon: Plug,
        title: 'Integration Challenges',
        summary: 'HubSpot, Salesforce, Twilio, and Zapier exist but need API configuration.',
        description:
          'Retell AI connects to HubSpot, Salesforce, Twilio, and Zapier, but setup typically requires API configuration rather than plug-and-play connectors. That friction adds engineering time and ongoing maintenance. Teams that want native, no-code CRM and calendar sync look for a Retell AI competitor that ships integrations ready to use.',
      },
      {
        icon: AlertTriangle,
        title: 'Scalability Concerns',
        summary: 'Volume accuracy issues on G2; concurrency and silence billing add cost at scale.',
        description:
          'Retell AI can handle millions of calls, but accuracy can stumble at volume - about 66 G2 mentions cite accuracy problems under load. Free concurrency starts at 20 slots, with extra slots at roughly $8 each per month. Billing during silence and hold further inflates cost at scale. For teams that need predictable concurrency pricing and consistent accuracy, those limits become a reason to switch.',
      },
    ],
  },

  comparison: {
    badge: 'OnDial vs Retell AI',
    title: 'OnDial vs Retell AI: Quick Comparison',
    subtitle:
      'This table compares OnDial and Retell AI on the points where Retell shows a documented gap, partial support, or undisclosed status.',
    closing:
      'The comparison shows that OnDial covers every category where Retell AI is partial, USD-only, or absent - with flat pricing, no-code setup, and dedicated support without enterprise gating on the basics.',
    rows: [
      {
        feature: 'No Code Setup',
        ondial: 'yes',
        competitor: 'partial',
        competitorNote: 'developer first',
      },
      {
        feature: 'Flat Predictable Per Minute Pricing',
        ondial: 'yes',
        competitor: 'partial',
        competitorNote: 'component stacked',
      },
      {
        feature: 'Local Currency Pricing for India (INR)',
        ondial: 'yes',
        competitor: 'no',
        competitorNote: 'USD only',
      },
      {
        feature: '100+ Languages with Regional Accents',
        ondial: 'yes',
        competitor: 'partial',
        competitorNote: '31+ languages, non-English inconsistent',
      },
      {
        feature: 'PCI DSS Compliance',
        ondial: 'yes',
        competitor: 'not-stated',
      },
      {
        feature: '24/7 Dedicated Support on All Plans',
        ondial: 'yes',
        competitor: 'partial',
        competitorNote: 'community/email on starter, 24/7 enterprise only',
      },
      {
        feature: 'Plug and Play Native Integrations',
        ondial: 'yes',
        competitor: 'partial',
        competitorNote: 'API config required',
      },
      {
        feature: 'Real Estate Industry Solution',
        ondial: 'yes',
        competitor: 'no',
      },
      {
        feature: 'Education Industry Solution',
        ondial: 'yes',
        competitor: 'no',
      },
      {
        feature: 'Automotive Industry Solution',
        ondial: 'yes',
        competitor: 'no',
      },
    ],
  },

  whyOnDial: {
    badge: 'Why Choose OnDial',
    title: 'Why OnDial is the best Retell AI alternative',
    intro:
      'OnDial is built to do everything Retell AI does, and then go further - flat predictable pricing, no-code setup, 100+ languages, sub 200 millisecond latency, and dedicated support on every plan.',
    highlightPills: ['Flat pricing', 'No-code setup', '100+ languages'],
    features: [
      {
        icon: Bot,
        title: 'Better Call Automation',
        summary: 'Inbound, outbound, and 24/7 coverage without assembling your own stack.',
        description:
          'OnDial handles inbound and outbound calls from a single AI agent that runs 24/7. Natural voice agents, analytics, and integrations ship together so teams do not assemble LLM, voice, and telephony as separate products. Retell AI voice quality is strong, but the stack is closer to infrastructure. OnDial’s automation covers appointment booking, lead qualification, reminders, surveys, and support tier one through prebuilt industry templates.',
      },
      {
        icon: Rocket,
        title: 'Faster Deployment',
        summary: 'No-code setup - live in under 30 minutes without an engineering project.',
        description:
          'OnDial gets teams live in under 30 minutes using prebuilt templates for healthcare, finance, education, real estate, ecommerce, logistics, insurance, automotive, and recruitment. Connect a phone number, pick a template, and the agent is ready. Retell AI setup feels built for engineers - ops teams often cannot change flows without development work.',
      },
      {
        icon: Mic,
        title: 'Higher Call Accuracy',
        summary: '99.4% transcription accuracy with sub-200ms latency.',
        description:
          'OnDial publishes 99.4 percent transcription accuracy with response latency under 200 milliseconds. Intent detection, sentiment analysis, and lead scoring happen inside every call. Retell AI publishes roughly 600 millisecond latency and G2 reviews flag accuracy issues at volume. OnDial is built for consistent quality as call volume grows.',
      },
      {
        icon: Workflow,
        title: 'Flexible AI Workflows',
        summary: 'No-code branching, objectives, and escalation - no Discord-first support path.',
        description:
          'OnDial runs custom logic, branching conversations, and objective based campaigns through a no-code configuration model. Business teams define audience, objective, and success criteria, then launch. Human escalation kicks in when a call needs a person, with full context captured. Changes do not require API work or waiting on an engineering sprint.',
      },
      {
        icon: Shield,
        title: 'Enterprise-Grade Security',
        summary: 'HIPAA, GDPR, PCI DSS, SOC 2, ISO, TRAI DLT & DPDP readiness documented.',
        description:
          'OnDial displays HIPAA, GDPR, PCI DSS, SOC 2, and ISO compliance badges on its homepage, with India specific TRAI DLT and DPDP readiness on the enterprise page. Retell AI offers HIPAA and SOC 2 Type II on enterprise, but PCI DSS is not publicly stated. OnDial documents PCI DSS for payment conversations without leaving buyers guessing.',
      },
      {
        icon: DollarSign,
        title: 'Cost-Effective Pricing',
        summary: 'Essential $0.055, Growth $0.050, Scale $0.045 - one predictable bill.',
        description:
          'OnDial pricing is flat and transparent: Essential at $0.055 per minute, Growth at $0.050, and Scale at $0.045. Concurrent channels and numbers are $4.90 each per month. The price includes the AI stack, telephony connectors, and platform fees. Retell’s $0.07 voice rate looks lower on paper, but LLM, telephony, and knowledge base stack on top to $0.13–$0.31 per minute - harder to predict and often more expensive at 10,000 minutes.',
      },
    ],
  },

  ondialFeatures: {
    badge: 'Platform Capabilities',
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
          'Voice AI Analytics turns every call into structured data. The dashboard shows sentiment, CSAT, resolution rate, intent, lead score, and conversion tracking. Call summaries are auto generated. Managers spot failing scripts, hostile calls, and compliance risks without listening to recordings.',
      },
      {
        icon: 'Languages',
        category: 'intelligence',
        title: 'Multi-Language Conversations',
        summary: '100+ languages with 50+ regional accents and auto language detection.',
        description:
          'Multi Language Conversations on OnDial cover 100 plus languages with 50 plus regional accents. The agent auto detects the caller’s language and responds naturally, with no extra setup. Retell AI lists 31 plus languages with inconsistent non-English quality - OnDial is built for global and regional coverage out of the box.',
      },
    ],
  },

  useCases: {
    badge: 'Use Cases',
    title: 'Use Cases Where OnDial Outperforms Retell AI',
    subtitle:
      'OnDial ships prebuilt templates for these industries, with native CRM sync and compliance posture built in. Retell AI covers several verticals but lacks dedicated pages for real estate, education, automotive, and recruitment.',
    industries: [
      {
        icon: Stethoscope,
        title: 'Healthcare',
        summary: 'Appointment booking, reminders, lab follow-ups & chronic care with HIPAA documentation.',
        bullets: ['60% no-show reduction cited on OnDial', '3x more after-hours appointments', '85% patient satisfaction'],
        edge: 'No-code healthcare templates - Retell setup stays developer-first.',
        description:
          'Healthcare providers use OnDial for appointment booking, reminder calls 24 to 48 hours before a visit, lab result follow ups, prescription refill requests, insurance pre authorization queries, post visit follow ups, and chronic disease management. OnDial publishes a 60 percent no show reduction, 3 times more after hours appointments, and 85 percent patient satisfaction. Retell AI has a healthcare page and enterprise HIPAA, but clinic ops teams still need engineering help to change flows.',
      },
      {
        icon: Shield,
        title: 'Insurance',
        summary: 'Policy renewals, claims intake, fraud alerts & KYC with PCI DSS posture.',
        bullets: ['Compliance transcripts & audit logs', 'Premium reminders & cross-sell', 'Regulatory reporting support'],
        edge: 'PCI DSS documented - Retell AI does not publicly state PCI DSS.',
        description:
          'Insurance carriers and brokers use OnDial for policy renewals, claims intake, premium reminders, fraud alerts, KYC verification, and cross sell campaigns. Compliance transcripts and audit logs support regulatory reporting. OnDial’s PCI DSS posture covers payment conversations. Retell AI lists insurance as a vertical with HIPAA and SOC 2 on enterprise, but PCI DSS is not publicly stated.',
      },
      {
        icon: Building2,
        title: 'Real Estate',
        summary: 'Property inquiries, showing scheduling & broker routing with CRM sync.',
        bullets: ['Calendar booking inside the call', 'Post-visit follow-ups', 'Lead nurture at scale'],
        edge: 'Dedicated real estate templates - Retell AI has no dedicated real estate page.',
        description:
          'Real estate firms use OnDial for property inquiries, showing scheduling, lead nurturing, post visit follow ups, and broker lead routing. The agent books showings directly into the calendar and syncs to the CRM. OnDial has a dedicated real estate industry page with templates. Retell AI does not have a dedicated real estate industry page, which leaves teams to build flows from scratch.',
      },
      {
        icon: GraduationCap,
        title: 'Education',
        summary: 'Enrollment, fee reminders, attendance alerts & onboarding nudges.',
        bullets: ['Enrollment confirmation calls', 'Fee & attendance reminders', 'Course recommendations'],
        edge: 'Dedicated education page with templates - Retell AI has no dedicated education page.',
        description:
          'Education providers use OnDial for enrollment calls, student follow ups, fee reminders, attendance alerts, course recommendations, and onboarding nudges. OnDial has a dedicated education page with templates and integration patterns. Retell AI does not publish a dedicated education industry page, so education teams have to design their own conversation scripts.',
      },
      {
        icon: Car,
        title: 'Automotive',
        summary: 'Service reminders, test drive bookings, recalls & post-service feedback.',
        bullets: ['Service reminder automation', 'Test drive scheduling', 'Recall & feedback calls'],
        edge: 'Dedicated automotive templates - Retell AI has no dedicated automotive page.',
        description:
          'Dealerships and service centers use OnDial for service reminder calls, test drive bookings, recall notifications, and post service feedback. OnDial ships automotive-ready templates with CRM sync. Retell AI does not have a dedicated automotive industry page, so dealership teams start from a blank developer workflow.',
      },
      {
        icon: Landmark,
        title: 'Banking & Finance',
        summary: 'Loan origination, EMI reminders, KYC & fraud alerts with TRAI DLT and PCI DSS.',
        bullets: ['Debt recovery & settlement calls', 'Credit card sales outreach', 'Fraud alert automation'],
        edge: 'Flat INR-friendly pricing - Retell AI is USD only with stacked component costs.',
        description:
          'Banks, lenders, and fintechs use OnDial for loan origination calls, EMI reminders, debt recovery, KYC verification, fraud alerts, credit card sales, and settlement discussions. OnDial supports TRAI DLT and DPDP for India plus PCI DSS for payment conversations, with local currency pricing for India. Retell AI serves financial services but prices in USD only and stacks LLM and telephony on top of the voice rate.',
      },
      {
        icon: UserPlus,
        title: 'Recruitment',
        summary: 'Candidate screening, interview scheduling & onboarding reminders at volume.',
        bullets: ['First-call screening', 'Job offer follow-ups', 'Employee satisfaction surveys'],
        edge: 'Dedicated recruitment templates - Retell AI has no dedicated recruitment page.',
        description:
          'Recruitment agencies and HR tech firms use OnDial for candidate screening, interview scheduling, job offer follow ups, onboarding reminders, and employee satisfaction surveys. OnDial has a recruitment template in its enterprise page. Retell AI does not publish a dedicated recruitment industry page, which leaves high volume hiring teams building custom API flows.',
      },
    ],
  },

  industriesUsingOnDial: {
    badge: 'Industry Coverage',
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
    badge: 'Easy Migration',
    title: 'Migration from Retell AI to OnDial',
    subtitle:
      'Switching voice AI platforms feels risky, but OnDial has built the migration path to remove that risk. Templates, CRM sync, and onboarding support make the move straightforward.',
    steps: [
      {
        icon: ArrowRightLeft,
        title: 'How Easy is the Transition?',
        summary: 'Prebuilt templates for 8+ industries - most teams live in under 30 minutes.',
        description:
          'The transition is straightforward. OnDial ships prebuilt templates for 8 plus industries, so most teams start from a template that already matches their use case rather than rebuilding API-driven Retell agents from scratch. The platform’s no-code setup means business teams create, launch, and manage campaigns without a central technical dependency. Most teams are live in under 30 minutes for a single use case, and full enterprise deployment typically takes 3 weeks.',
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
        summary: 'Rebuild Retell flows with no-code campaigns instead of API-first agents.',
        description:
          'Existing Retell AI call flows rebuild inside OnDial using the campaign configuration model. Define the audience, the objective, the success criteria, and the escalation rules. Branching logic, function calling patterns, and human handoff all map across. Where Retell required API configuration for HubSpot, Salesforce, or Zapier, OnDial handles CRM sync, calendar booking, and notifications with plug-and-play native integrations.',
      },
      {
        icon: Users,
        title: 'Team Training & Support',
        summary: 'No-code interface with dedicated support - not Discord-first on starter plans.',
        description:
          'OnDial’s no-code interface means business users learn the platform quickly without a developer in the loop. Dedicated support is available on all plans, with enterprise onboarding, regular check ins, and priority support when needed. The contact page commits to a 24 hour response window on email. For larger rollouts, OnDial scopes training and change management with the customer’s team directly.',
      },
    ],
  },

  switchBenefits: {
    badge: 'What You Gain',
    title: 'Benefits of Switching to OnDial',
    subtitle:
      'Switching to OnDial changes the math on voice AI. Cost per call drops, customer experience improves, and teams scale without growing headcount.',
    benefits: [
      {
        icon: 'DollarSign',
        title: 'Reduce Operational Costs',
        summary: 'Flat rates from $0.055/min vs Retell’s stacked $0.13–$0.31/min all-in.',
        description:
          'OnDial handles calls with transparent Essential, Growth, and Scale rates from $0.055 to $0.045 per minute. Mid market businesses reduce cost per contact by over 60 percent in the first six months compared with human agents. The unified pricing model means one bill covers AI, telephony, and platform - no separate LLM, knowledge base, or silence billing surprises.',
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
        summary: 'Thousands of simultaneous calls without $8/slot concurrency surprises.',
        description:
          'OnDial’s elastic infrastructure handles thousands of simultaneous calls without provisioning new hardware or hiring new agents. Concurrent channels and numbers are priced simply at $4.90 each per month. Seasonal spikes, campaign launches, and growth surges do not trigger recruiting cycles or opaque concurrency invoices.',
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
    badge: 'Proven Results',
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
      question: 'Is OnDial a good alternative to Retell AI?',
      answer:
        'Yes. OnDial covers everything Retell AI does, including natural AI voice agents, inbound and outbound calling, analytics, and integrations. OnDial adds flat predictable pricing, no-code setup, 100 plus languages with regional accents, PCI DSS documentation, dedicated support on all plans, and industry templates for real estate, education, automotive, and recruitment.',
    },
    {
      question: 'How does OnDial pricing compare to Retell AI?',
      answer:
        'OnDial pricing is flat: Essential at $0.055 per minute, Growth at $0.050, and Scale at $0.045, with concurrent channels and numbers at $4.90 each per month. The AI stack, telephony connectors, and platform fees are included. Retell AI’s voice rate is about $0.07 per minute, but LLM, telephony, and knowledge base typically push the real cost to $0.13–$0.31 per minute - roughly $1,200 to $1,800 per month at 10,000 minutes.',
    },
    {
      question: 'Can I switch from Retell AI to OnDial without losing data?',
      answer:
        'Yes. Contact lists, call scripts, and CRM mappings transfer into OnDial through the onboarding workflow. Phone numbers can be ported or new numbers provisioned. Existing call recordings and transcripts can be imported for analytics context. OnDial’s team scopes the migration timeline with each customer.',
    },
    {
      question: 'Does OnDial support the same integrations as Retell AI?',
      answer:
        'OnDial supports Twilio, HubSpot, Salesforce, Calendly, Slack, and Zapier with plug-and-play native connectors. Retell AI also connects to HubSpot, Salesforce, Twilio, and Zapier, but typically requires API configuration. OnDial covers CRM sync and calendar booking without a developer project.',
    },
    {
      question: 'Which industries is OnDial best suited for?',
      answer:
        'OnDial ships prebuilt templates for healthcare, insurance, real estate, automotive, travel, education, finance, ecommerce, logistics, and recruitment. Compared with Retell AI, OnDial is especially strong where Retell lacks dedicated pages - real estate, education, automotive, and recruitment - and for teams that need INR pricing in India.',
    },
    {
      question: 'Is OnDial better for outbound or inbound calls?',
      answer:
        'Both. OnDial runs inbound and outbound from a single AI agent, with 24/7 coverage. Inbound handles support, lead intake, and FAQs. Outbound handles cold outreach, reminders, renewals, surveys, and recovery campaigns. The same analytics, CRM sync, and escalation rules apply to both directions.',
    },
    {
      question: 'How long does it take to get started with OnDial?',
      answer:
        'Most teams are live in under 30 minutes for a single use case. Pick an industry template, connect a phone number, configure the objective, and launch. Full enterprise deployment across multiple use cases and teams typically takes 3 weeks with OnDial’s onboarding support - without the Discord-first learning curve common on Retell starter plans.',
    },
  ],

  cta: {
    badgeIcon: 'Bot',
    badgeText: 'Ready to Switch?',
    title: 'Start with OnDial - the best',
    highlightedTitle: 'Retell AI alternative',
    description:
      'OnDial matches every Retell AI capability, then adds flat predictable pricing from $0.055/min, no-code setup, 100 plus languages, PCI DSS documentation, and dedicated support on every plan. Start a free 14 day trial and go live in under 30 minutes.',
    primaryButtonText: 'Start Free Trial',
    secondaryButtonText: 'Book Free Demo',
    primaryButtonLink: '/signup',
    secondaryButtonLink: '/contact',
  },
};
