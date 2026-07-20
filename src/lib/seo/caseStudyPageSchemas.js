/**
 * Case studies hub + detail page JSON-LD.
 * @see https://www.ondial.ai/case-studies
 */

import { absoluteUrl, SITE_LOGO, SITE_NAME, SITE_URL } from "./siteConfig";

const HUB_PATH = "/case-studies";
const HUB_URL = absoluteUrl(HUB_PATH);

export const CASE_STUDIES_HUB_META = {
  title: "AI Voice Agent Case Studies: Real Client Results | OnDial",
  description:
    "See how 500+ businesses across 20+ industries use OnDial AI voice agents to cut costs, boost CSAT, and automate calls at scale. Read real case studies now.",
};

const CASE_STUDY_LIST_ITEMS = [
  {
    id: "telecom-call-center-automation",
    name: "How AI Voice Agents Reduced Telecom Call Center Volume by 60% and Improved Customer Support Efficiency",
  },
  {
    id: "insurance-claims-voice-ai",
    name: "Voice AI For Insurance Claims: Reducing Routine Status Inquiry Calls By 70 Percent",
  },
  {
    id: "nbfc-debt-collection-voice",
    name: "Voice AI For Debt Collection: Increasing Early Stage EMI Recovery By 40 Percent",
  },
  {
    id: "healthcare-appointment-reminders",
    name: "Automated Appointment Reminders for Healthcare: 42% Drop in Patient No-Shows",
  },
  {
    id: "banking-payment-alerts",
    name: "Automated Payment Alerts and Loan Reminders: 28% Drop in 30-Day Delinquencies",
  },
];

function caseStudyUrl(id) {
  return absoluteUrl(`/case-studies/${id}`);
}

function hubItemListElements() {
  return CASE_STUDY_LIST_ITEMS.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    url: caseStudyUrl(item.id),
    name: item.name,
  }));
}

export function buildCaseStudiesHubSchemas() {
  const { title, description } = CASE_STUDIES_HUB_META;

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${HUB_URL}#webpage`,
    url: HUB_URL,
    name: title,
    description,
    inLanguage: "en-US",
    isPartOf: {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: SITE_NAME,
    },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: SITE_LOGO,
      width: 1200,
      height: 630,
    },
    breadcrumb: {
      "@id": `${HUB_URL}#breadcrumb`,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: `${SITE_URL}/`,
    },
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${HUB_URL}#itemlist`,
    name: "AI Voice Agent Case Studies",
    description:
      "Customer success stories showing how businesses use OnDial's AI voice agents to automate calls and scale support.",
    numberOfItems: CASE_STUDY_LIST_ITEMS.length,
    itemListElement: hubItemListElements(),
  };

  return [webPageSchema, itemListSchema];
}

function breadcrumbList(id, name) {
  return {
    "@type": "BreadcrumbList",
    "@id": `${caseStudyUrl(id)}#breadcrumb`,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${SITE_URL}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Case Studies",
        item: HUB_URL,
      },
      {
        "@type": "ListItem",
        position: 3,
        name,
        item: caseStudyUrl(id),
      },
    ],
  };
}

function sharedCaseStudiesItemList(idSuffix = "itemlist") {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${HUB_URL}#${idSuffix}`,
    name: "OnDial AI Voice Agent Case Studies",
    description:
      "Real businesses, real conversations, real growth - see how teams automate calls and scale support with OnDial AI voice agents.",
    url: HUB_URL,
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    numberOfItems: CASE_STUDY_LIST_ITEMS.length,
    itemListElement: hubItemListElements(),
  };
}

/**
 * @param {{
 *   id: string,
 *   headline: string,
 *   richDetail?: { metaTitle?: string, seoDescription?: string, metaDescription?: string, subtitle?: string },
 * }} item
 */
export function buildCaseStudyDetailSchemas(item) {
  if (!item?.id) return [];

  const url = caseStudyUrl(item.id);
  const name = item.richDetail?.metaTitle ?? item.headline;
  const description =
    item.richDetail?.seoDescription ??
    item.richDetail?.metaDescription ??
    item.richDetail?.subtitle ??
    item.headline;

  if (item.id === "telecom-call-center-automation") {
    const webPageSchema = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${url}#webpage`,
      url,
      name,
      description,
      inLanguage: "en",
      isPartOf: {
        "@type": "WebSite",
        url: `${SITE_URL}/`,
        name: SITE_NAME,
      },
      about: {
        "@type": "Thing",
        name: "AI Voice Agents for Telecom Call Center Automation",
      },
      author: {
        "@type": "Organization",
        name: SITE_NAME,
        url: `${SITE_URL}/`,
      },
      publisher: {
        "@type": "Organization",
        name: SITE_NAME,
        url: `${SITE_URL}/`,
        logo: {
          "@type": "ImageObject",
          url: SITE_LOGO,
        },
      },
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: SITE_LOGO,
      },
      breadcrumb: {
        "@id": `${url}#breadcrumb`,
      },
      mainEntity: {
        "@id": `${url}#itemlist`,
      },
    };

    const sectionItemList = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "@id": `${url}#itemlist`,
      name: item.headline,
      description:
        "Key stages of the AI voice agent solution deployed for a regional telecom operator, from problem to results.",
      itemListOrder: "https://schema.org/ItemListOrderAscending",
      numberOfItems: 6,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Overview", url: `${url}#overview` },
        {
          "@type": "ListItem",
          position: 2,
          name: "Industry Context",
          url: `${url}#industry-context`,
        },
        { "@type": "ListItem", position: 3, name: "The Problem", url: `${url}#the-problem` },
        { "@type": "ListItem", position: 4, name: "The Solution", url: `${url}#the-solution` },
        {
          "@type": "ListItem",
          position: 5,
          name: "Technical Deep Dive",
          url: `${url}#technical-deep-dive`,
        },
        { "@type": "ListItem", position: 6, name: "Results", url: `${url}#results` },
      ],
    };

    return [webPageSchema, sectionItemList];
  }

  if (item.id === "insurance-claims-voice-ai") {
    return [
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name,
        description,
        inLanguage: "en-US",
        isPartOf: {
          "@type": "WebSite",
          "@id": `${SITE_URL}/#website`,
          url: `${SITE_URL}/`,
          name: SITE_NAME,
        },
        about: { "@type": "Thing", name: "Voice AI for Insurance Claims Processing" },
        publisher: { "@type": "Organization", name: SITE_NAME, url: `${SITE_URL}/` },
        primaryImageOfPage: { "@type": "ImageObject", url: SITE_LOGO },
      },
      {
        ...sharedCaseStudiesItemList("all-case-studies"),
        "@id": `${url}#all-case-studies`,
      },
    ];
  }

  if (item.id === "nbfc-debt-collection-voice") {
    return [
      {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "WebPage",
            "@id": `${url}#webpage`,
            url,
            name,
            description,
            inLanguage: "en-US",
            isPartOf: {
              "@type": "WebSite",
              "@id": `${SITE_URL}/#website`,
              url: `${SITE_URL}/`,
              name: SITE_NAME,
            },
            about: {
              "@type": "Organization",
              name: "Regional NBFC",
            },
            breadcrumb: {
              "@id": `${url}#breadcrumb`,
            },
            primaryImageOfPage: {
              "@type": "ImageObject",
              url: SITE_LOGO,
              width: 1200,
              height: 630,
            },
            publisher: {
              "@type": "Organization",
              name: SITE_NAME,
              url: `${SITE_URL}/`,
            },
          },
          breadcrumbList(item.id, item.headline),
        ],
      },
      {
        ...sharedCaseStudiesItemList("itemlist"),
        "@id": `${url}#itemlist`,
        name: "OnDial Case Studies",
      },
    ];
  }

  if (item.id === "healthcare-appointment-reminders") {
    return [
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name,
        description,
        inLanguage: "en-US",
        isPartOf: {
          "@type": "WebSite",
          "@id": `${SITE_URL}/#website`,
          url: `${SITE_URL}/`,
          name: SITE_NAME,
        },
        about: {
          "@type": "Thing",
          name: "Automated Appointment Reminders for Healthcare",
        },
        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
            { "@type": "ListItem", position: 2, name: "Case Studies", item: HUB_URL },
            {
              "@type": "ListItem",
              position: 3,
              name: "Automated Appointment Reminders for Healthcare",
              item: url,
            },
          ],
        },
        primaryImageOfPage: { "@type": "ImageObject", url: SITE_LOGO },
        publisher: { "@type": "Organization", name: SITE_NAME, url: `${SITE_URL}/` },
      },
      sharedCaseStudiesItemList(),
    ];
  }

  if (item.id === "banking-payment-alerts") {
    return [
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": url,
        url,
        name,
        description,
        inLanguage: "en-US",
        isPartOf: {
          "@type": "WebSite",
          name: SITE_NAME,
          url: `${SITE_URL}/`,
        },
        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
            { "@type": "ListItem", position: 2, name: "Case Studies", item: HUB_URL },
            {
              "@type": "ListItem",
              position: 3,
              name: "Automated Payment Alerts and Loan Reminders",
              item: url,
            },
          ],
        },
        primaryImageOfPage: { "@type": "ImageObject", url: SITE_LOGO },
        publisher: {
          "@type": "Organization",
          name: SITE_NAME,
          url: `${SITE_URL}/`,
          logo: {
            "@type": "ImageObject",
            url: `${SITE_URL}/fav.svg`,
          },
        },
        about: {
          "@type": "Thing",
          name: "AI Voice Agents for Banking Payment Alerts and Loan Reminders",
        },
      },
      sharedCaseStudiesItemList(),
    ];
  }

  return [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${url}#webpage`,
      url,
      name,
      description,
      inLanguage: "en-US",
      isPartOf: {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: `${SITE_URL}/`,
        name: SITE_NAME,
      },
      publisher: { "@type": "Organization", name: SITE_NAME, url: `${SITE_URL}/` },
      primaryImageOfPage: { "@type": "ImageObject", url: SITE_LOGO },
      breadcrumb: breadcrumbList(item.id, item.headline),
    },
  ];
}
