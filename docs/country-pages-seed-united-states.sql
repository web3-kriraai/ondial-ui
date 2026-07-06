-- ============================================================
-- Seed: United States country page
-- Run in the Supabase SQL Editor AFTER docs/country-pages-schema.sql
-- has been applied.
--
-- Upserts the full USA country page content (hero through FAQs).
-- Uses $tag$ dollar-quoting for every JSONB literal so apostrophes
-- and quotes in the copy do not need manual escaping.
-- ============================================================

INSERT INTO country_pages (
  slug, country_name, country_code, meta_title, meta_description, status,
  hero, overview, why_choose_us, industry_solutions, language_support,
  use_cases, compliance_security, integrations, comparisons, faqs
) VALUES (
  'united-states',
  'United States',
  'US',
  'Enterprise AI Voice Agents for USA Businesses | OnDial',
  'Scale your US customer support with OnDial''s enterprise AI Voice Agents. Navigate TCPA compliance, support US English and Spanish, and operate 24/7 across all time zones.',
  'published',

  -- ---------------------------------------------------------
  -- hero
  -- ---------------------------------------------------------
  $hero$
  {
    "title": "Enterprise AI Voice Agent Solutions for Businesses in the United States",
    "description": "Empower your US-based enterprise with conversational AI voice agents capable of resolving complex customer requests, integrating with your local tech stack, and seamlessly transferring high-value calls to human agents.",
    "bullets": [
      {
        "title": "Coast-to-Coast 24/7 Coverage",
        "description": "Deliver zero-wait-time support from Eastern Standard Time (EST) to Hawaii-Aleutian Standard Time (HST)."
      },
      {
        "title": "Native Dialect & Bilingual Fluency",
        "description": "Flawless comprehension of regional American English accents (Midwestern, Southern, Northeast) and US Spanish."
      },
      {
        "title": "US Telecom & Privacy Alignment",
        "description": "Built-in safeguards to support TCPA compliance, CCPA data privacy, and STIR/SHAKEN robocall mitigation."
      },
      {
        "title": "Industry-Specific Security",
        "description": "Architecture designed to support HIPAA (Healthcare) and GLBA (Financial Services) compliance requirements."
      },
      {
        "title": "Seamless CRM Integrations",
        "description": "Native connections to Salesforce, Zendesk, Hubspot, and US-centric platforms like ServiceTitan and Epic Systems."
      }
    ],
    "primaryCta": { "label": "Book Demo", "href": "/contact" },
    "secondaryCta": { "label": "Talk to an Expert", "href": "/contact" }
  }
  $hero$::jsonb,

  -- ---------------------------------------------------------
  -- overview
  -- ---------------------------------------------------------
  $overview$
  {
    "title": "The United States Contact Center & CX Market Overview",
    "paragraphs": [
      "The United States contact center market is the world's largest, valued at over $25 billion, and is characterized by a rapid shift from traditional offshore outsourcing to AI-driven, onshore-quality automation. American consumers have notoriously high customer service expectations, demanding zero wait times, native-sounding accents, and instant omnichannel resolution. With US domestic labor costs for call center agents averaging $17 to $22 per hour and turnover rates exceeding 40%, enterprises are aggressively adopting Generative AI to manage tier-1 support, scale operations during seasonal peaks, and reserve expensive human capital for complex problem-solving.",
      "Digital transformation in the US telecom sector is heavily influenced by federal regulations designed to protect consumer privacy and reduce spam. The Federal Communications Commission's (FCC) STIR/SHAKEN mandate requires caller ID authentication, making it critical for outbound business calls to avoid \"Scam Likely\" labels. Consequently, US enterprises require AI voice solutions that do more than just speak—they must intelligently navigate local telecom compliance, honor Do Not Call (DNC) registries automatically, and provide frictionless handoffs to human agents when caller frustration is detected."
    ]
  }
  $overview$::jsonb,

  -- ---------------------------------------------------------
  -- why_choose_us
  -- ---------------------------------------------------------
  $why_choose_us$
  {
    "title": "Why Businesses in the USA Choose OnDial",
    "intro": "Operating a contact center in the United States requires managing vast geographic distances, diverse linguistic nuances, and strict federal regulations. OnDial provides an enterprise-grade AI voice solution purpose-built for the realities of the US market.",
    "items": [
      {
        "title": "Comprehensive Time Zone Management",
        "description": "The US spans six primary time zones. OnDial enables businesses to offer 24/7 localized support, allowing a New York-based financial firm to seamlessly service a customer in Los Angeles at 8 PM Pacific Time without paying steep after-hours staffing premiums."
      },
      {
        "title": "Advanced Regional Accent Handling",
        "description": "American English is not a monolith. OnDial's natural language processing is trained on diverse US phonetics, ensuring the AI accurately understands the pacing of a New Yorker, the drawl of a Southern caller, or the distinct vocabulary of the Pacific Northwest."
      },
      {
        "title": "Bilingual Capabilities for a Diverse Economy",
        "description": "With over 41 million native Spanish speakers in the US, bilingual support is an enterprise necessity, not a luxury. OnDial seamlessly switches between US English and US Spanish within the same conversation, capturing \"Spanglish\" nuances effortlessly."
      },
      {
        "title": "Strict Regulatory Alignment",
        "description": "We integrate directly with your compliance workflows. OnDial supports Telephone Consumer Protection Act (TCPA) opt-in verification limits, honors the National Do Not Call Registry dynamically, and utilizes STIR/SHAKEN-compliant SIP trunks so your outbound AI agents maintain verified caller reputations."
      }
    ]
  }
  $why_choose_us$::jsonb,

  -- ---------------------------------------------------------
  -- industry_solutions
  -- ---------------------------------------------------------
  $industry_solutions$
  {
    "title": "US Industry Solutions",
    "industries": [
      {
        "name": "Healthcare & Medical Providers",
        "description": "US healthcare requires strict data protection and complex scheduling workflows. OnDial supports HIPAA-compliant architectures to automate patient appointment scheduling, handle Medicare Open Enrollment surges, and conduct post-discharge follow-up calls without compromising Protected Health Information (PHI).",
        "useCases": []
      },
      {
        "name": "Financial Services & Debt Collection",
        "description": "Banks, credit unions, and collection agencies must navigate the Gramm-Leach-Bliley Act (GLBA) and the Fair Debt Collection Practices Act (FDCPA). OnDial AI agents handle routine balance inquiries, fraud alert verifications, and PCI-compliant payment collections while strictly adhering to FDCPA time-of-day calling restrictions.",
        "useCases": []
      },
      {
        "name": "Home Services & Property Management",
        "description": "In a market dominated by platforms like ServiceTitan, speed-to-lead is critical. OnDial answers 24/7 emergency HVAC dispatch calls, qualifies Zillow real estate leads instantly, and triages property maintenance requests based on severity before routing to on-call US technicians.",
        "useCases": []
      },
      {
        "name": "Logistics & Freight Brokerage",
        "description": "The US freight network relies on constant communication between brokers and drivers. OnDial automates routine \"check calls\" to truck drivers on interstates, tracking location and ETA, and logging the data directly into US freight management systems (TMS) to reduce manual dispatcher workloads.",
        "useCases": []
      }
    ]
  }
  $industry_solutions$::jsonb,

  -- ---------------------------------------------------------
  -- language_support
  -- ---------------------------------------------------------
  $language_support$
  {
    "title": "Language & Dialect Support for the US Market",
    "languages": [
      {
        "name": "American English",
        "description": "Comprehensive understanding of Standard American English, plus robust handling of regional variations including Southern American English, African American Vernacular English (AAVE), and Northeastern dialects."
      },
      {
        "name": "US Spanish",
        "description": "Optimized for the vocabulary and phrasing common in the United States, including the ability to understand code-switching (Spanglish) without conversation breakdown."
      },
      {
        "name": "Mandarin & Tagalog",
        "description": "Support for the third and fourth most spoken languages in the US, ideal for businesses operating in highly diverse metropolitan areas like California or New York."
      }
    ]
  }
  $language_support$::jsonb,

  -- ---------------------------------------------------------
  -- use_cases
  -- ---------------------------------------------------------
  $use_cases$
  {
    "title": "Country-Specific Use Cases",
    "items": [
      {
        "title": "Medicare Open Enrollment Triage",
        "description": "Handling the massive Q4 spike in healthcare inquiries by pre-qualifying seniors based on zip code and basic health needs before routing them to a licensed US insurance broker."
      },
      {
        "title": "Freight & Logistics Check Calls",
        "description": "Calling long-haul truckers to verify load status across state lines and automatically updating Transportation Management Systems (TMS)."
      },
      {
        "title": "TCPA-Compliant Lead Reactivation",
        "description": "Executing outbound campaigns to aged mortgage or insurance leads, utilizing dynamic scrubbing against the National DNC registry before dialing."
      },
      {
        "title": "Weather-Related Flight/Hotel Rebooking",
        "description": "Managing massive, sudden call spikes during US hurricane season or winter blizzards, allowing travelers to use voice AI to instantly rebook canceled itineraries."
      },
      {
        "title": "ServiceTitan Emergency Dispatch",
        "description": "Answering after-hours plumbing or HVAC calls, identifying if the issue is a genuine emergency (e.g., active leak), and alerting the on-call local technician."
      }
    ]
  }
  $use_cases$::jsonb,

  -- ---------------------------------------------------------
  -- compliance_security
  -- ---------------------------------------------------------
  $compliance_security$
  {
    "title": "Compliance & Security",
    "items": [
      {
        "title": "TCPA & DNC",
        "description": "OnDial incorporates DNC registry checks and manages opt-in/opt-out consent dynamically to support alignment with the Telephone Consumer Protection Act."
      },
      {
        "title": "STIR/SHAKEN",
        "description": "We utilize compliant telephony infrastructure to ensure your business numbers are authenticated, drastically reducing the risk of \"Scam Likely\" flags on US cellular networks."
      },
      {
        "title": "HIPAA & CCPA",
        "description": "OnDial's architecture provides end-to-end encryption, data redaction capabilities, and strict access controls to support healthcare entities maintaining HIPAA compliance and California businesses adhering to CCPA data privacy mandates."
      },
      {
        "title": "PCI-DSS",
        "description": "Secure voice-based payment collection workflows allow callers to input credit card data without sensitive numbers touching your local servers."
      }
    ]
  }
  $compliance_security$::jsonb,

  -- ---------------------------------------------------------
  -- integrations
  -- ---------------------------------------------------------
  $integrations$
  {
    "title": "Enterprise Integrations",
    "intro": "OnDial connects seamlessly with the tools powering American commerce:",
    "groups": [
      {
        "label": "CRM",
        "items": ["Salesforce", "HubSpot", "Microsoft Dynamics", "Zoho"]
      },
      {
        "label": "Support & Ticketing",
        "items": ["Zendesk", "Freshdesk", "ServiceNow"]
      },
      {
        "label": "Industry Specific",
        "items": ["ServiceTitan (Home Services)", "Epic Systems (Healthcare - via API)", "Encompass (Mortgage)"]
      },
      {
        "label": "Telephony & API",
        "items": ["Twilio", "SIP trunking", "Webhooks", "REST APIs"]
      }
    ]
  }
  $integrations$::jsonb,

  -- ---------------------------------------------------------
  -- comparisons
  -- ---------------------------------------------------------
  $comparisons$
  {
    "title": "Compare AI Voice Agents",
    "items": [
      {
        "title": "AI Voice Agent vs. Traditional US Call Center",
        "description": "US-based call centers struggle with high attrition and minimum wages ranging from $15 to $20+ per hour. OnDial provides onshore-quality, native-accented voice interactions at a fraction of the cost, allowing you to scale up instantly during peak seasons without the overhead of HR, training, and benefits."
      },
      {
        "title": "AI Voice Agent vs. Legacy IVR",
        "description": "American consumers frequently \"zero out\" or abandon calls when faced with rigid \"Press 1 for Sales\" menus. OnDial replaces static IVRs with natural, conversational AI that understands complex, multi-intent sentences, resolving the issue immediately or passing full context to a live agent."
      },
      {
        "title": "AI Voice Agent vs. Human Receptionist",
        "description": "Small-to-medium US enterprises often miss leads because receptionists cannot manage simultaneous calls. OnDial acts as a limitless front desk, answering infinite concurrent calls, qualifying leads, and scheduling appointments directly into calendars, ensuring you never miss revenue due to a busy signal."
      }
    ]
  }
  $comparisons$::jsonb,

  -- ---------------------------------------------------------
  -- faqs
  -- ---------------------------------------------------------
  $faqs$
  [
    {
      "question": "Does OnDial comply with TCPA and National Do Not Call regulations?",
      "answer": "Yes, OnDial supports TCPA and DNC compliance by integrating directly with your consent databases and DNC registries. The platform can automatically suppress calls to restricted numbers and instantly honor verbal \"do not call\" requests during live AI conversations."
    },
    {
      "question": "Can the AI handle regional American accents and Spanglish?",
      "answer": "OnDial's natural language models are trained specifically on US dialects, including Southern, Midwestern, and AAVE, as well as US Spanish. It smoothly comprehends code-switching between English and Spanish within the same sentence."
    },
    {
      "question": "How does OnDial avoid my outbound calls being labeled as \"Scam Likely\" by US carriers?",
      "answer": "OnDial utilizes telecommunication partners that fully adhere to the FCC's STIR/SHAKEN caller ID authentication framework. This ensures your outbound AI calls receive an A-level attestation, minimizing carrier blocking and spam labeling."
    },
    {
      "question": "Can OnDial operate across all US time zones simultaneously?",
      "answer": "Yes, OnDial provides seamless 24/7 coverage from Eastern to Hawaii-Aleutian time zones. You can configure specific AI workflows, routing rules, and human-handoff availability based on the caller's specific local time zone."
    },
    {
      "question": "Is OnDial suitable for US healthcare companies requiring HIPAA compliance?",
      "answer": "OnDial provides HIPAA-compliant infrastructure, featuring end-to-end encryption, automated PII/PHI redaction in call transcripts, and secure data storage, enabling US medical providers to automate scheduling and intake securely."
    },
    {
      "question": "Can we use our existing US toll-free (800/888) numbers with OnDial?",
      "answer": "Absolutely. You can easily port your existing toll-free or local geographic US numbers via SIP forwarding, or provision new numbers directly within the OnDial platform to maintain your established brand presence."
    }
  ]
  $faqs$::jsonb
)
ON CONFLICT (slug) DO UPDATE SET
  country_name        = EXCLUDED.country_name,
  country_code        = EXCLUDED.country_code,
  meta_title          = EXCLUDED.meta_title,
  meta_description    = EXCLUDED.meta_description,
  status              = EXCLUDED.status,
  hero                = EXCLUDED.hero,
  overview            = EXCLUDED.overview,
  why_choose_us       = EXCLUDED.why_choose_us,
  industry_solutions  = EXCLUDED.industry_solutions,
  language_support    = EXCLUDED.language_support,
  use_cases           = EXCLUDED.use_cases,
  compliance_security = EXCLUDED.compliance_security,
  integrations        = EXCLUDED.integrations,
  comparisons         = EXCLUDED.comparisons,
  faqs                = EXCLUDED.faqs,
  updated_at          = now();
