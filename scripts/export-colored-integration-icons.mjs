import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "../public/integrations");

const icons = (await import("simple-icons")).default ?? (await import("simple-icons"));

function writeColoredSi(key, filename) {
  const icon = icons[key];
  if (!icon) {
    console.error("missing", key);
    return;
  }
  const svg = `<svg role="img" loading="lazy" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>${icon.title}</title><path fill="#${icon.hex}" d="${icon.path}"/></svg>`;
  fs.writeFileSync(path.join(outDir, filename), svg);
  console.log("si", filename, `#${icon.hex}`);
}

const siExports = [
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

for (const [key, file] of siExports) {
  writeColoredSi(key, file);
}

async function fetchIconify(iconId, filename) {
  const res = await fetch(`https://api.iconify.design/${iconId}.svg`);
  if (!res.ok) {
    console.error("iconify fail", iconId);
    return;
  }
  fs.writeFileSync(path.join(outDir, filename), await res.text());
  console.log("iconify", filename);
}

await fetchIconify("logos:salesforce", "salesforce.svg");
await fetchIconify("logos:magento", "magento.svg");
await fetchIconify("logos:google-calendar", "googlecalendar.svg");
await fetchIconify("logos:woocommerce", "woocommerce.svg");
await fetchIconify("logos:zendesk-icon", "zendesk.svg");
await fetchIconify("logos:intercom-icon", "intercom.svg");
await fetchIconify("logos:google-drive", "googledrive.svg");
await fetchIconify("logos:shopify", "shopify.svg");
