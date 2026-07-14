import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, it } from "node:test";

import { getImportMissingRequired, parseCountryPageImport } from "./parse-country-page-import";

const __dirname = dirname(fileURLToPath(import.meta.url));
const usaTemplate = readFileSync(
  join(__dirname, "../../../docs/country-page-content-template.md"),
  "utf8",
);
const usaExample = usaTemplate.match(/```text\n([\s\S]*?)\n```/)?.[1] ?? "";

describe("parseCountryPageImport", () => {
  it("parses full USA structured template", () => {
    const result = parseCountryPageImport(usaExample);
    assert.equal(result.ok, true);
    assert.equal(result.data.country_name, "United States");
    assert.equal(result.data.slug, "united-states");
    assert.equal(result.data.country_code, "US");
    assert.equal(result.data.status, "published");
    assert.ok(result.data.meta_title?.includes("USA Businesses"));
    assert.ok(result.data.hero?.title?.includes("United States"));
    assert.equal(result.data.hero?.bullets?.length, 5);
    assert.equal(result.data.overview?.paragraphs?.length, 2);
    assert.equal(result.data.whyChooseUs?.items?.length, 4);
    assert.equal(result.data.industrySolutions?.industries?.length, 4);
    assert.equal(result.data.languageSupport?.languages?.length, 3);
    assert.equal(result.data.useCases?.items?.length, 5);
    assert.equal(result.data.complianceSecurity?.items?.length, 4);
    assert.equal(result.data.integrations?.groups?.length, 4);
    assert.equal(result.data.comparisons?.items?.length, 3);
    assert.equal(result.data.faqs?.length, 6);
    assert.ok(result.filledSections.length >= 10);
    assert.equal(getImportMissingRequired(result.data).length, 0);
  });

  it("parses JSON payload with snake_case keys", () => {
    const json = JSON.stringify({
      country_name: "Canada",
      slug: "canada",
      hero: {
        title: "AI for Canada",
        description: "Plain hero description.",
        bullets: [{ title: "Bullet", description: "Desc text" }],
        primaryCta: { label: "Demo", href: "/contact" },
      },
      faqs: [{ question: "Q1?", answer: "A1 answer." }],
    });
    const result = parseCountryPageImport(json);
    assert.equal(result.ok, true);
    assert.equal(result.data.country_name, "Canada");
    assert.equal(result.data.hero?.bullets?.[0]?.description, "<p>Desc text</p>");
    assert.equal(result.data.faqs?.[0]?.answer, "<p>A1 answer.</p>");
    assert.ok(result.warnings.some((w) => w.includes("JSON")));
  });

  it("reports errors for empty paste", () => {
    const result = parseCountryPageImport("   ");
    assert.equal(result.ok, false);
    assert.ok(result.errors.some((e) => e.includes("empty")));
  });

  it("warns on duplicate sections (last wins)", () => {
    const text = `[HERO]
title: First Title
description: First desc.

[HERO]
title: Second Title
description: Second desc.
`;
    const result = parseCountryPageImport(text);
    assert.equal(result.data.hero?.title, "<p>Second Title</p>");
    assert.ok(result.warnings.some((w) => w.includes("Duplicate")));
  });

  it("parses HERO_BULLETS with or without leading dashes", () => {
    const text = `[HERO]
title: Enterprise AI Voice Agent Solutions for Businesses in Argentina
description: OnDial automates inbound and outbound calls in Argentina.

[HERO_BULLETS]
Native Rioplatense Spanish :: Calibrated for local accents and voseo syntax.
Regulatory Alignment :: Architected to support Ley 25,326 and national Do Not Call lists.
- 24/7 Scalability :: Offset operational cost volatility with constant availability.
`;
    const result = parseCountryPageImport(text);
    assert.equal(result.ok, true);
    assert.equal(result.data.hero?.bullets?.length, 3);
    assert.equal(result.data.hero?.bullets?.[0]?.title, "<p>Native Rioplatense Spanish</p>");
    assert.ok(result.data.hero?.bullets?.[0]?.description?.includes("Calibrated for local accents"));
    assert.equal(result.data.hero?.bullets?.[2]?.title, "<p>24/7 Scalability</p>");
    assert.ok(result.data.hero?.title?.includes("<p>"));
    assert.ok(result.data.hero?.description?.includes("<p>"));
    assert.ok(result.data.hero?.description?.includes("OnDial"));
    assert.ok(!result.warnings.some((w) => w.includes("HERO_BULLETS")));
  });
});
