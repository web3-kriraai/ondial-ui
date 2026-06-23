import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const outDir = path.join(path.dirname(fileURLToPath(import.meta.url)), "../public/integrations");
const icons = (await import("simple-icons")).default ?? (await import("simple-icons"));

function writeSi(key, file) {
  const icon = icons[key];
  const svg = `<svg role="img" loading="lazy" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>${icon.title}</title><path fill="#${icon.hex}" d="${icon.path}"/></svg>`;
  fs.writeFileSync(path.join(outDir, file), svg);
  console.log("fixed", file);
}

for (const [key, file] of [
  ["siZoho", "zoho.svg"],
  ["siGooglesheets", "googlesheets.svg"],
  ["siCalendly", "calendly.svg"],
  ["siHubspot", "hubspot.svg"],
]) {
  writeSi(key, file);
}
