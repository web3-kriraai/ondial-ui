import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "../public/integrations");

const icons = (await import("simple-icons")).default ?? (await import("simple-icons"));

function exportSi(key, filename) {
  const icon = icons[key];
  if (!icon?.svg) {
    console.error("missing", key);
    return;
  }
  const svg = icon.svg.replace(/fill="#[^"]+"/g, "");
  fs.writeFileSync(path.join(outDir, filename), svg);
  console.log("wrote", filename);
}

const exports = [
  ["siZoho", "zoho.svg"],
  ["siHubspot", "hubspot.svg"],
  ["siShopify", "shopify.svg"],
  ["siWoocommerce", "woocommerce.svg"],
  ["siGooglecalendar", "googlecalendar.svg"],
  ["siGooglesheets", "googlesheets.svg"],
  ["siGoogledrive", "googledrive.svg"],
  ["siCalendly", "calendly.svg"],
  ["siZendesk", "zendesk.svg"],
  ["siIntercom", "intercom.svg"],
  ["siWhatsapp", "whatsapp.svg"],
];

for (const [key, file] of exports) {
  exportSi(key, file);
}

const v11 = "https://cdn.jsdelivr.net/npm/simple-icons@11.14.0/icons";
for (const slug of ["salesforce", "hubspot", "zoho"]) {
  const res = await fetch(`${v11}/${slug}.svg`);
  if (!res.ok) continue;
  let svg = await res.text();
  svg = svg.replace(/fill="#[^"]+"/g, "");
  fs.writeFileSync(path.join(outDir, `${slug}.svg`), svg);
  console.log("v11", slug);
}
