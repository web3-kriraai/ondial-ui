import {
  Zap,
  Shield,
  Clock,
  Bot,
  Mic,
  Languages,
  DollarSign,
  Users,
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
  BarChart3,
  Code2,
  Hotel,
} from 'lucide-react';

export const polyAiAlternativePageData = {
  competitor: { name: 'PolyAI' },

  meta: {
    title: "PolyAI Alternative: OnDial Vs PolyAI Pricing & Features",
    description:
      "Compare OnDial vs PolyAI: transparent per-minute pricing, a free 14-day trial, same-day setup, and self-serve dashboard control. Start your free trial now.",
    canonical: '/best-poly-ai-alternative',
  },

  hero: {
    badge: 'OnDial vs PolyAI',
    title: 'Best PolyAI Alternative',
    subtitle:
      'OnDial matches PolyAI on enterprise voice dialog agents, multilingual support, and compliance depth - then adds transparent per-minute pricing, a free trial, and same-day setup without a sales call.',
    highlights: [
      'No public pricing - third-party estimates around $150k/year',
      'No self-serve signup or free trial without a sales call',
      'POC to live typically takes 4-6 weeks under managed setup',
      'Many agent changes go through account teams, not a self-serve dashboard',
    ],
    description:
      'Businesses that try PolyAI hit no public pricing, no self-serve signup, and no way to test without a sales call. The voice engine is strong, but cost visibility is slow and managed setup can take weeks. OnDial is the best PolyAI alternative in 2026 - transparent per-minute pricing, a free trial, and every core PolyAI capability plus more.',
    primaryButtonText: 'Start Free Trial',
    secondaryButtonText: 'Compare Features',
    primaryButtonLink: '/signup',
    secondaryButtonLink: '#comparison',
    stats: [
      { value: '$0.055/min', label: 'transparent per-minute pricing', icon: DollarSign },
      { value: 'Free trial', label: 'self-serve signup, no sales call', icon: Zap },
      { value: 'Same day', label: 'go live in minutes, not weeks', icon: Clock },
      { value: '99.4%', label: 'transcription accuracy', icon: Mic },
    ],
  },

  whatIsCompetitor: {
    badge: 'What is PolyAI?',
    title: 'Understanding the platform you are comparing',
    summary:
      'PolyAI is an enterprise conversational AI company founded in 2017 by Cambridge machine learning researchers, building dialog agents for voice and chat used by large enterprises worldwide.',
    stats: [
      { label: 'Founded', value: '2017' },
      { label: 'Languages', value: '45+' },
      { label: 'Integrations', value: '130+' },
      { label: 'Pricing', value: 'Not public' },
    ],
    highlights: [
      'Enterprise dialog agents for voice and chat across banking, healthcare, insurance & hospitality',
      'Agent Studio plus Agent Developer Kit (ADK) for building and deploying agents',
      'Proprietary Raven model trained on 1B+ enterprise conversations',
      'Fully managed service serving PG&E, Fogo de Chão, banks, and hospitality brands',
    ],
    paragraphs: [
      'PolyAI is an enterprise conversational AI platform founded in 2017 by Cambridge machine learning researchers. The company builds dialog agents for voice and chat, positioned as a fully managed service for large enterprises rather than a self-serve product. Customers include PG&E, Fogo de Chão, major banks, and hospitality brands across consumer services, financial services, healthcare, hotels, insurance, restaurants, retail, telecom, travel, and utilities.',
      'The platform centers on Agent Studio for designing agents and an Agent Developer Kit (ADK) for deeper customization. PolyAI’s proprietary conversational model, Raven, is trained on more than one billion enterprise conversations. Analyst Agents provide analytics on top of live deployments, and the stack claims 130 plus pre-built integrations plus multilingual support across 45 languages.',
      'Compliance coverage includes SOC 2, HIPAA, GDPR, PCI DSS, and ISO 27001. Pricing is not listed publicly, and signup requires a sales conversation. That combination of strong enterprise voice capability and slow cost visibility is why many teams start looking for a PolyAI alternative that they can try, price, and deploy the same day.',
    ],
  },

  competitorFeatures: {
    badge: 'Competitor Capabilities',
    title: 'What PolyAI offers today',
    subtitle:
      'PolyAI lists a strong enterprise feature set aimed at large contact centers that want managed conversational AI for voice and chat.',
    features: [
      {
        icon: Workflow,
        title: 'Agent Studio',
        summary: 'Design and deploy conversational dialog agents for voice and chat.',
        description:
          'Agent Studio is PolyAI’s primary surface for building dialog agents. Teams design conversation flows, configure channels, and launch agents under PolyAI’s managed delivery model rather than a fully self-serve builder.',
      },
      {
        icon: Bot,
        title: 'Raven Conversational Model',
        summary: 'Proprietary model trained on 1B+ enterprise conversations.',
        description:
          'Raven is PolyAI’s proprietary conversational model, trained on more than one billion enterprise conversations. It powers the natural language understanding and response quality that enterprise buyers associate with the PolyAI brand.',
      },
      {
        icon: Plug,
        title: '130+ Pre-Built Integrations',
        summary: 'Connectors across telephony, CRM, and enterprise systems.',
        description:
          'PolyAI documents 130 plus pre-built integrations. In practice, many connections are delivered through the managed service, so CRM and backend wiring may still need internal engineering or account team involvement.',
      },
      {
        icon: Languages,
        title: 'Multilingual Support',
        summary: '45 languages for global contact center deployments.',
        description:
          'PolyAI supports 45 languages for voice and chat agents. Coverage is strong for multinational enterprises, though teams that need 100 plus languages or deeper regional Indian language packs often compare PolyAI competitors with broader language catalogs.',
      },
      {
        icon: Shield,
        title: 'Enterprise Compliance',
        summary: 'SOC 2, HIPAA, GDPR, PCI DSS, and ISO 27001.',
        description:
          'PolyAI publishes SOC 2, HIPAA, GDPR, PCI DSS, and ISO 27001 compliance. That stack satisfies many global procurement reviews, though India-specific TRAI DLT and DPDP readiness is not clearly stated on public materials.',
      },
      {
        icon: BarChart3,
        title: 'Analyst Agents',
        summary: 'Analytics layer for monitoring conversational performance.',
        description:
          'Analyst Agents provide analytics on live PolyAI deployments. Review summaries still call out limits around analytics depth, LLM sandbox access, and dashboard control compared with self-serve platforms.',
      },
      {
        icon: Code2,
        title: 'Agent Developer Kit (ADK)',
        summary: 'Developer toolkit for deeper customization beyond Studio.',
        description:
          'The Agent Developer Kit lets technical teams customize agents beyond Agent Studio. Further changes often still route through the account team or ADK workstreams, which slows iteration for mid-market teams that want day-to-day dashboard control.',
      },
    ],
  },

  whyLookForAlternative: {
    badge: 'Why Businesses Look for a PolyAI Alternative',
    title: 'Where PolyAI falls short for growing teams',
    subtitle:
      'PolyAI has a strong enterprise voice engine and recognizable logos in banking, hospitality, and utilities, making it popular with large contact centers, but businesses deploying AI Voice Agents for Call Centers & BPO increasingly look for platforms that offer transparent pricing, self-serve deployment, and faster implementation. The same buyers start searching for alternatives to PolyAI when they cannot see pricing upfront, cannot trial without a sales call, need dedicated templates for real estate or recruitment, or find that scaling means renegotiating a managed contract after a 4-6 week rollout.',
    subtitleLinks: [
      { text: 'AI Voice Agents for Call Centers & BPO', href: '/industries/ai-voice-agents-call-centers-bpo' },
    ],
    reasons: [
      {
        icon: DollarSign,
        title: 'High Pricing',
        summary: 'No public pricing - third-party estimates around $150k/year with no free tier.',
        description:
          'PolyAI does not publish pricing. Third-party estimates put typical spend around $150,000 per year, with no free tier and a required sales process before teams can even test. A Capterra review notes fluctuating multi-factor billing that makes forecasting hard. Finance and ops teams evaluating PolyAI competitors in 2026 want per-minute cost shown upfront and a free trial before committing enterprise budget.',
      },
      {
        icon: Layers,
        title: 'Limited Customization',
        summary: 'Further changes go through account teams or ADK - limited dashboard control.',
        description:
          'PolyAI offers Agent Studio and an ADK, but day-to-day iteration is still heavily managed. Further changes often go through the account team or ADK workstreams. Review summaries cite no analytics depth, no LLM sandbox, and no dashboard control for many buyers. Teams that want self-service control over agent prompts, branching, and experiments look for an AI voice agent alternative to PolyAI with a true self-serve console.',
      },
      {
        icon: Scale,
        title: 'Industry-Specific Requirements',
        summary: 'Strong in FS, healthcare, hotels & retail - no dedicated real estate, automotive, or recruitment.',
        description:
          'PolyAI covers consumer services, financial services, healthcare, hotels, insurance, restaurants, retail, telecom, travel, and utilities. What is missing are dedicated industry templates for real estate, automotive, and recruitment. Businesses in those verticals often find PolyAI’s industry-specific packaging insufficient and start looking for a PolyAI alternative with ready-to-deploy templates for those use cases.',
      },
      {
        icon: Plug,
        title: 'Integration Challenges',
        summary: '130+ integrations, but often via managed service - CRM may need internal engineering.',
        description:
          'PolyAI lists 130 plus integrations, which looks strong on paper. In practice, many connections are delivered through the managed service rather than plug-and-play self-serve connectors. CRM wiring may still need internal engineering effort. Teams that want native Salesforce, HubSpot, and calendar sync without a multi-week integration project evaluate PolyAI competitors with clearer self-serve integration paths.',
      },
      {
        icon: AlertTriangle,
        title: 'Scalability Concerns',
        summary: 'High volume capable, but POC to live takes 4-6 weeks and scaling means renegotiating.',
        description:
          'PolyAI can handle high volume enterprise traffic, but the path from proof of concept to live typically takes four to six weeks under managed setup. Scaling beyond the initial contract often means renegotiating scope, concurrency, and pricing with the account team. Teams that need same-day pilots and elastic volume without a new commercial cycle look for a PolyAI alternative with transparent usage pricing and minutes-to-live deployment.',
      },
    ],
  },

  comparison: {
    badge: 'OnDial vs PolyAI',
    title: 'OnDial vs PolyAI: Quick Comparison',
    subtitle:
      'This table compares OnDial and PolyAI on the points where PolyAI shows a documented gap, partial support, or undisclosed status.',
    closing:
      'The comparison shows that OnDial covers every category where PolyAI is partial, undisclosed, or absent - especially pricing transparency, free trial access, and same-day deployment.',
    rows: [
      {
        feature: 'Public Self-Serve Pricing',
        ondial: 'yes',
        competitor: 'no',
      },
      {
        feature: 'Free Trial Available',
        ondial: 'yes',
        competitor: 'no',
      },
      {
        feature: 'Self-Serve Signup Without Sales Call',
        ondial: 'yes',
        competitor: 'no',
      },
      {
        feature: 'Per-Minute Cost Shown Upfront',
        ondial: 'yes',
        competitor: 'no',
      },
      {
        feature: 'Deployment Time (Minutes / Same Day)',
        ondial: 'yes',
        competitor: 'partial',
        competitorNote: '4-6 weeks typical',
      },
      {
        feature: 'Dedicated Industry Templates (Real Estate, Automotive, Recruitment)',
        ondial: 'yes',
        competitor: 'no',
      },
      {
        feature: 'Voice Cloning for Branded AI Voice',
        ondial: 'yes',
        competitor: 'not-stated',
      },
      {
        feature: 'Built-In Regional Compliance (TRAI DLT, DPDP)',
        ondial: 'yes',
        competitor: 'not-stated',
      },
      {
        feature: 'Self-Service Dashboard Control Over Agent Changes',
        ondial: 'yes',
        competitor: 'partial',
        competitorNote: 'many updates through account teams',
      },
      {
        feature: 'Transparent Enterprise Pricing Without Minimum Spend Disclosed',
        ondial: 'yes',
        competitor: 'no',
      },
    ],
  },

  whyOnDial: {
    badge: 'Why Choose OnDial',
    title: 'Why OnDial is the best PolyAI alternative',
    intro:
      'OnDial is built to do everything PolyAI does for voice automation, and then go further - transparent per-minute pricing, a free trial, same-day setup, and self-serve control without waiting on an account team.',
    highlightPills: ['Transparent pricing', 'Free trial', 'Same-day setup'],
    features: [
      {
        icon: Bot,
        title: 'Better Call Automation',
        summary: 'Inbound and outbound AI agents live in minutes with CRM logging.',
        description:
          'OnDial handles inbound and outbound calls from a single AI agent that runs 24/7. The platform supports thousands of simultaneous conversations with elastic infrastructure. PolyAI’s automation is strong for large enterprises under a managed model. OnDial’s automation covers appointment booking, lead qualification, reminders, surveys, and support tier one through prebuilt industry templates without a multi-week managed rollout.',
      },
      {
        icon: Rocket,
        title: 'Faster Deployment',
        summary: 'Same-day setup vs PolyAI’s typical 4-6 week POC-to-live path.',
        description:
          'OnDial gets teams live in under 30 minutes using prebuilt templates for healthcare, AI Voice Agents for Banking & Finance, education, real estate, ecommerce, logistics, insurance, and recruitment. Connect a phone number, pick a template, and the agent is ready. PolyAI’s managed setup commonly takes four to six weeks from proof of concept to live, which is too slow for teams that need to prove value this week.',
        descriptionLinks: [
          { text: 'AI Voice Agents for Banking & Finance', href: '/industries/ai-voice-agents-finance-banking' },
        ],
      },
      {
        icon: Mic,
        title: 'Higher Call Accuracy',
        summary: '99.4% transcription accuracy with sub-200ms latency.',
        description:
          'OnDial publishes a 99.4 percent transcription accuracy figure, with response latency under 200 milliseconds. Intent detection, sentiment analysis, and lead scoring happen inside every call. PolyAI’s Raven model is trained on massive enterprise conversation volume, but teams still lack a free way to benchmark accuracy on their own scripts before buying.',
      },
      {
        icon: Workflow,
        title: 'Flexible AI Workflows',
        summary: 'No-code branching and escalation with self-serve dashboard control.',
        description:
          'OnDial runs custom logic, branching conversations, and objective-based campaigns through a no-code configuration model. Business teams define audience, objective, and success criteria, then launch. Human escalation kicks in with full context. Where PolyAI often routes further changes through account teams or ADK workstreams, OnDial keeps day-to-day agent control in the customer’s dashboard.',
      },
      {
        icon: Shield,
        title: 'Enterprise-Grade Security',
        summary: 'HIPAA, GDPR, PCI DSS, SOC 2, ISO, plus TRAI DLT & DPDP readiness.',
        description:
          'OnDial displays HIPAA, GDPR, PCI DSS, SOC 2, and ISO compliance badges, making it well suited for AI Voice Agents for Healthcare and other regulated industries that require secure, compliant voice automation. PolyAI also covers SOC 2, HIPAA, GDPR, PCI DSS, and ISO 27001, but regional India compliance is not clearly stated publicly. OnDial gives regulated teams both the global stack and India-ready posture without a long enterprise sales cycle.',
        descriptionLinks: [
          { text: 'AI Voice Agents for Healthcare', href: '/industries/ai-voice-agents-healthcare-medical' },
        ],
      },
      {
        icon: DollarSign,
        title: 'Cost-Effective Pricing',
        summary: 'All-in pricing from $0.055/min - one bill, free trial, no $150k estimate.',
        description:
          'OnDial pricing is usage based and transparent, starting at $0.055 per minute for up to 10,000 minutes and dropping to $0.045 per minute above 25,000 minutes. The price includes the AI stack, telephony connectors, and platform fees. PolyAI has no public pricing, with third-party estimates around $150,000 per year and no free tier - so finance teams cannot model cost before a sales call.',
      },
    ],
  },

  ondialFeatures: {
    badge: 'Platform Capabilities',
    title: 'Key Features of OnDial',
    subtitle:
      'OnDial brings every capability a business needs to run voice AI at scale, with each feature built around a real outcome rather than a checkbox. Explore the complete AI Voice Agent Features to see everything included in the platform.',
    subtitleLinks: [
      { text: 'AI Voice Agent Features', href: '/features' },
    ],
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
          'Voice AI Analytics turns every call into structured data. The dashboard shows sentiment, CSAT, resolution rate, intent, lead score, and conversion tracking. Call summaries are auto generated. Managers spot failing scripts, hostile calls, and compliance risks without listening to recordings. This is the self-serve analytics depth many PolyAI buyers say they lack.',
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
    title: 'Use Cases Where OnDial Outperforms PolyAI',
    subtitle:
      'OnDial ships prebuilt templates for these industries, with transparent pricing and same-day setup. PolyAI covers several of these verticals as a managed enterprise service but does not offer the same self-serve speed or dedicated templates for real estate, automotive, and recruitment.',
    industries: [
      {
        icon: Stethoscope,
        title: 'Healthcare',
        summary: 'Appointment booking, reminders, lab follow-ups & chronic care with HIPAA documentation.',
        bullets: ['60% no-show reduction cited on OnDial', '3x more after-hours appointments', '85% patient satisfaction'],
        edge: 'Same-day HIPAA-ready setup - PolyAI healthcare is enterprise-managed with no free trial.',
        description:
          'Healthcare providers use OnDial for appointment booking, reminder calls 24 to 48 hours before a visit, lab result follow ups, prescription refill requests, insurance pre authorization queries, post visit follow ups, and chronic disease management. OnDial publishes a 60 percent no show reduction, 3 times more after hours appointments, and 85 percent patient satisfaction. PolyAI serves healthcare under a managed model with HIPAA coverage, but teams cannot trial pricing or go live the same day without a sales-led engagement.',
      },
      {
        icon: Shield,
        title: 'Insurance',
        summary: 'Policy renewals, claims intake, fraud alerts & KYC with PCI DSS posture.',
        bullets: ['Compliance transcripts & audit logs', 'Premium reminders & cross-sell', 'Regulatory reporting support'],
        edge: 'Transparent per-minute pricing vs PolyAI’s undisclosed enterprise contracts.',
        description:
          'Insurance carriers and brokers use OnDial for policy renewals, claims intake, premium reminders, fraud alerts, KYC verification, and cross sell campaigns. Compliance transcripts and audit logs support regulatory reporting. OnDial’s PCI DSS posture covers payment conversations. PolyAI also serves insurance enterprises, but without public pricing or a free trial, procurement cycles stretch while finance teams wait on custom quotes.',
      },
      {
        icon: Building2,
        title: 'Real Estate',
        summary: 'Property inquiries, showing scheduling & broker routing with CRM sync.',
        bullets: ['Calendar booking inside the call', 'Post-visit follow-ups', 'Lead nurture at scale'],
        edge: 'Dedicated real estate templates - PolyAI has no dedicated real estate packaging.',
        description:
          'Real estate firms use OnDial for property inquiries, showing scheduling, lead nurturing, post visit follow ups, and broker lead routing. The agent books showings directly into the calendar and syncs to the CRM. OnDial has a dedicated real estate industry page with templates. PolyAI does not list dedicated real estate industry packaging, which leaves brokers and franchises building flows through a managed project instead of a template.',
      },
      {
        icon: GraduationCap,
        title: 'Education',
        summary: 'Enrollment, fee reminders, attendance alerts & onboarding nudges.',
        bullets: ['Enrollment confirmation calls', 'Fee & attendance reminders', 'Course recommendations'],
        edge: 'Self-serve templates and free trial - PolyAI is oriented to large enterprise contact centers.',
        description:
          'Education providers use OnDial for enrollment calls, student follow ups, fee reminders, attendance alerts, course recommendations, and onboarding nudges. OnDial has a dedicated education page with templates and integration patterns. PolyAI’s enterprise focus means education and EdTech teams often need a lighter, self-serve PolyAI alternative to launch enrollment and fee reminder campaigns quickly.',
      },
      {
        icon: ShoppingCart,
        title: 'E-commerce',
        summary: 'Cart recovery, COD confirmation, order updates & returns with live CRM data.',
        bullets: ['Abandoned cart recovery', 'COD confirmation & delivery rescheduling', 'Post-purchase feedback'],
        edge: 'Minutes-to-live campaigns vs PolyAI’s 4-6 week managed rollout.',
        description:
          'Ecommerce brands use OnDial for cart abandonment recovery, COD confirmation, order status updates, return processing, delivery rescheduling, and post purchase feedback. The agent pulls order data from the CRM or ecommerce platform in real time. PolyAI serves retail and restaurants as enterprise verticals, but seasonal ecommerce teams usually cannot wait four to six weeks for a managed POC when peak season is already approaching.',
      },
      {
        icon: Landmark,
        title: 'Banking & Finance',
        summary: 'Loan origination, EMI reminders, KYC & fraud alerts with TRAI DLT and PCI DSS.',
        bullets: ['Debt recovery & settlement calls', 'Credit card sales outreach', 'Fraud alert automation'],
        edge: 'TRAI DLT & DPDP readiness documented - not clearly stated for PolyAI publicly.',
        description:
          'Banks, lenders, and fintechs use OnDial for loan origination calls, EMI reminders, debt recovery, KYC verification, fraud alerts, credit card sales, and settlement discussions. OnDial supports TRAI DLT and DPDP for India plus PCI DSS for payment conversations. PolyAI has strong banking logos and global compliance badges, but India-specific TRAI DLT and DPDP readiness is not clearly stated on public materials.',
      },
      {
        icon: UserPlus,
        title: 'Recruitment',
        summary: 'Candidate screening, interview scheduling & onboarding reminders at volume.',
        bullets: ['First-call screening', 'Job offer follow-ups', 'Employee satisfaction surveys'],
        edge: 'Dedicated recruitment templates - PolyAI has no dedicated recruitment vertical.',
        description:
          'Recruitment agencies and HR tech firms use OnDial for candidate screening, interview scheduling, job offer follow ups, onboarding reminders, and employee satisfaction surveys. OnDial has a recruitment template in its enterprise page. PolyAI does not publish a dedicated recruitment industry offering, so high-volume hiring teams need a PolyAI alternative with screening and scheduling templates out of the box.',
      },
      {
        icon: Car,
        title: 'Automotive',
        summary: 'Service reminders, test drives, recalls & post-service feedback.',
        bullets: ['Service reminder automation', 'Test drive booking', 'Recall notification calls'],
        edge: 'Dedicated automotive templates - PolyAI has no dedicated automotive packaging.',
        description:
          'Dealerships and service centers use OnDial for service reminder calls, test drive bookings, recall notifications, and post-service feedback. OnDial ships automotive-ready templates. PolyAI does not list a dedicated automotive vertical, which pushes dealers toward alternatives that already understand service-lane and sales-floor call flows.',
      },
      {
        icon: Hotel,
        title: 'Hospitality',
        summary: 'Reservations, guest inquiries & loyalty outreach with same-day launch.',
        bullets: ['Reservation confirmations', 'Guest FAQ automation', 'Loyalty program outreach'],
        edge: 'Self-serve launch vs PolyAI hospitality managed deployments for large brands.',
        description:
          'Hotels and restaurant groups use OnDial for reservation confirmations, guest inquiries, waitlist management, and loyalty outreach. PolyAI has strong hospitality logos including Fogo de Chão, but mid-market hospitality brands often need a free trial and same-day setup rather than a fully managed enterprise engagement.',
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
    title: 'Migration from PolyAI to OnDial',
    subtitle:
      'Switching voice AI platforms feels risky, but OnDial has built the migration path to remove that risk. Templates, CRM sync, and onboarding support make the move straightforward.',
    steps: [
      {
        icon: ArrowRightLeft,
        title: 'How Easy is the Transition?',
        summary: 'Prebuilt templates for 8+ industries - most teams live in under 30 minutes.',
        description:
          'The transition is straightforward. OnDial ships prebuilt templates for 8 plus industries, so most teams start from a template that already matches their use case rather than rebuilding a managed PolyAI project from scratch. The platform’s no code setup means business teams create, launch, and manage campaigns without waiting on an account team. Most teams are live in under 30 minutes for a single use case, and full enterprise deployment typically takes 3 weeks.',
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
        summary: 'Rebuild PolyAI dialog flows with self-serve dashboard control.',
        description:
          'Existing PolyAI dialog flows rebuild inside OnDial using the campaign configuration model. Define the audience, the objective, the success criteria, and the escalation rules. Branching logic, API triggers, and human handoff all map across. Where PolyAI required account team or ADK changes for further iteration, OnDial handles CRM sync, calendar booking, and agent edits natively in the customer dashboard.',
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
    badge: 'What You Gain',
    title: 'Benefits of Switching to OnDial',
    subtitle: 'Switching to OnDial changes the math on voice AI. Cost per call drops, customer experience improves, and teams scale without growing headcount.',
    benefits: [
      {
        icon: 'DollarSign',
        title: 'Reduce Operational Costs',
        summary: 'Under $1 per AI resolution vs $7.16 for a human inbound call.',
        description:
          'OnDial handles calls for under $1 per resolution, compared to a $7.16 average for a human inbound call. Mid market businesses reduce cost per contact by over 60 percent in the first six months. The unified pricing model means one bill covers AI, telephony, and platform, so finance teams can budget without waiting on a custom $150k-style enterprise quote.',
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
          'OnDial’s elastic infrastructure handles thousands of simultaneous calls without provisioning new hardware or hiring new agents. Seasonal spikes, campaign launches, and growth surges do not trigger recruiting cycles or contract renegotiations. Teams scale call volume 10 times without scaling headcount.',
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
      question: 'Is OnDial a good alternative to PolyAI?',
      answer:
        'Yes. OnDial covers core PolyAI capabilities including enterprise voice dialog agents, multilingual support, compliance-ready deployments, and analytics. OnDial adds transparent per-minute pricing, a free trial, self-serve signup without a sales call, same-day setup, and dedicated templates for verticals PolyAI does not package, including real estate, automotive, and recruitment.',
    },
    {
      question: 'How does OnDial pricing compare to PolyAI?',
      answer:
        'OnDial pricing starts at $0.055 per minute and drops to $0.045 per minute above 25,000 minutes, with the AI stack, telephony connectors, and platform fees included. PolyAI does not publish pricing. Third-party estimates put typical annual spend around $150,000, with no free tier and a required sales process before teams can model cost.',
    },
    {
      question: 'Can I switch from PolyAI to OnDial without losing data?',
      answer:
        'Yes. Contact lists, call scripts, and CRM mappings transfer into OnDial through the onboarding workflow. Phone numbers can be ported or new numbers provisioned. Existing call recordings and transcripts can be imported for analytics context. OnDial’s team scopes the migration timeline with each customer.',
    },
    {
      question: 'Does OnDial support the same integrations as PolyAI?',
      answer:
        'OnDial supports Twilio, HubSpot, Salesforce, Calendly, Slack, and Zapier natively with self-serve setup. PolyAI documents 130 plus integrations, but many are delivered through a managed service and may still need internal engineering. OnDial covers CRM sync and calendar booking without a multi-week integration project.',
    },
    {
      question: 'Which industries is OnDial best suited for?',
      answer:
        'OnDial ships prebuilt templates for healthcare, insurance, real estate, automotive, travel, education, finance, ecommerce, logistics, and recruitment. The platform is particularly strong for teams that need HIPAA, GDPR, PCI DSS, SOC 2, and ISO compliance badges plus India’s TRAI DLT and DPDP readiness - without waiting on a managed enterprise rollout.',
    },
    {
      question: 'Is OnDial better for outbound or inbound calls?',
      answer:
        'Both. OnDial runs inbound and outbound from a single AI agent, with 24/7 coverage. Inbound handles support, lead intake, and FAQs. Outbound handles cold outreach, reminders, renewals, surveys, and recovery campaigns. The same analytics, CRM sync, and escalation rules apply to both directions.',
    },
    {
      question: 'How long does it take to get started with OnDial?',
      answer:
        'Most teams are live in under 30 minutes for a single use case. Pick an industry template, connect a phone number, configure the objective, and launch. Full enterprise deployment across multiple use cases and teams typically takes 3 weeks with OnDial’s onboarding support - compared with PolyAI’s typical 4-6 week POC-to-live path.',
    },
  ],

  cta: {
    badgeIcon: 'Bot',
    badgeText: 'Ready to Switch?',
    title: 'Start with OnDial - the best',
    highlightedTitle: 'PolyAI alternative',
    description:
      'OnDial matches every core PolyAI capability, then adds transparent per-minute pricing from $0.055, a free trial, same-day setup, and self-serve dashboard control. Start a free 14 day trial and go live in under 30 minutes.',
    primaryButtonText: 'Start Free Trial',
    secondaryButtonText: 'Book Free Demo',
    primaryButtonLink: '/signup',
    secondaryButtonLink: '/contact',
  },
};
