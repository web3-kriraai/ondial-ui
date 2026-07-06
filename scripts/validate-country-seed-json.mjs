import fs from "node:fs";

const sql = fs.readFileSync("docs/country-pages-seed-united-states.sql", "utf8");
const tags = [
  "hero",
  "overview",
  "why_choose_us",
  "industry_solutions",
  "language_support",
  "use_cases",
  "compliance_security",
  "integrations",
  "comparisons",
  "faqs",
];

for (const tag of tags) {
  const re = new RegExp(`\\$${tag}\\$([\\s\\S]*?)\\$${tag}\\$`, "m");
  const match = sql.match(re);
  if (!match) {
    console.error(`MISSING: ${tag}`);
    process.exit(1);
  }
  try {
    JSON.parse(match[1].trim());
    console.log(`OK: ${tag}`);
  } catch (error) {
    console.error(`INVALID JSON: ${tag}`, error instanceof Error ? error.message : error);
    process.exit(1);
  }
}

console.log("All JSON blocks valid.");
