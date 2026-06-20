/**
 * Downloads remote homepage images, converts rasters to WebP, and optimizes SVGs.
 * Run: npm run optimize:assets
 */
import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
import { optimize } from "svgo";

const require = createRequire(import.meta.url);
const sharp = require("sharp");

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const publicDir = path.join(root, "public");

const TESTIMONIAL_IDS = [
  "photo-1560250097-0b93528c311a",
  "photo-1519085360753-af0119f7cbe7",
  "photo-1494790108377-be9c29b29330",
  "photo-1580489944761-15a19d654956",
  "photo-1500648767791-00dcc994a43e",
  "photo-1568602471122-7832951cc4c5",
  "photo-1522075469751-3a6694fb2f61",
  "photo-1507003211169-0a1dd7228f2d",
  "photo-1438761681033-6461ffad8d80",
  "photo-1573496359142-b8d87734a5a2",
  "photo-1534528741775-53994a69daeb",
  "photo-1487412720507-e7ab37603c6f",
  "photo-1472099645785-5658abf4ff4e",
  "photo-1521119989659-a83eee488004",
];

const FLAG_CODES = [
  "gb",
  "us",
  "in",
  "fr",
  "de",
  "es",
  "br",
  "sa",
  "jp",
  "kr",
  "cn",
  "it",
  "nl",
  "tr",
  "vn",
  "id",
  "ru",
  "th",
  "au",
  "ca",
  // Languages section accent flags
  "za",
  "mx",
  "ar",
  "co",
  "be",
  "at",
  "ch",
  "pt",
  "tw",
  "hk",
  "ae",
  "eg",
  "bd",
];

const LOADER_SOURCES = [
  { src: "blog_ai_comm_1777703161729.png", dest: "home/loader/main.webp", width: 900 },
  { src: "blog_connectivity_1777703241008.png", dest: "home/loader/extra-1.webp", width: 900 },
  { src: "blog_productivity_1777703371947.png", dest: "home/loader/extra-2.webp", width: 900 },
  { src: "automotive.jpg", dest: "home/loader/extra-3.webp", width: 900 },
];

async function ensureDir(filePath) {
  await mkdir(path.dirname(filePath), { recursive: true });
}

async function downloadToWebp(url, destPath, { width, height, quality = 82 } = {}) {
  await ensureDir(destPath);
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to download ${url}: ${response.status}`);
  }
  const buffer = Buffer.from(await response.arrayBuffer());
  let pipeline = sharp(buffer);
  if (width || height) {
    pipeline = pipeline.resize(width, height, { fit: "cover", withoutEnlargement: false });
  }
  await pipeline.webp({ quality }).toFile(destPath);
  console.log(`  ✓ ${path.relative(publicDir, destPath)}`);
}

async function convertLocalToWebp(relativeSrc, relativeDest, options = {}) {
  const opts = typeof options === "number" ? { width: options } : options;
  const { width, height, quality = 82, fit = "inside" } = opts;
  const srcPath = path.join(publicDir, relativeSrc);
  const destPath = path.join(publicDir, relativeDest);
  await ensureDir(destPath);
  let pipeline = sharp(srcPath);
  if (width || height) {
    pipeline = pipeline.resize(width, height, { fit, withoutEnlargement: fit === "inside" });
  }
  await pipeline.webp({ quality }).toFile(destPath);
  console.log(`  ✓ ${relativeDest}`);
}

async function optimizeCarouselLocals() {
  const carouselDir = path.join(publicDir, "home", "carousel");
  const entries = await readdir(carouselDir, { withFileTypes: true });
  const rasterPattern = /\.(jpe?g|png)$/i;
  let count = 0;

  for (const entry of entries) {
    if (!entry.isFile() || !rasterPattern.test(entry.name)) continue;
    const ext = path.extname(entry.name);
    const base = entry.name.slice(0, -ext.length);
    await convertLocalToWebp(
      path.join("home", "carousel", entry.name),
      path.join("home", "carousel", `${base}.webp`),
      { width: 560, height: 800, fit: "cover", quality: 80 },
    );
    count += 1;
  }

  return count;
}

async function optimizeSvgs(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  let count = 0;
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      count += await optimizeSvgs(fullPath);
      continue;
    }
    if (!entry.name.endsWith(".svg")) continue;
    const source = await readFile(fullPath, "utf8");
    const { data } = optimize(source, {
      path: fullPath,
      multipass: true,
      plugins: [
        "preset-default",
        { name: "removeViewBox", active: false },
      ],
    });
    if (data !== source) {
      await writeFile(fullPath, data);
      count += 1;
      console.log(`  ✓ ${path.relative(publicDir, fullPath)}`);
    }
  }
  return count;
}

async function main() {
  console.log("Optimizing homepage assets...\n");

  console.log("Carousel (local JPG/PNG) → WebP");
  const carouselCount = await optimizeCarouselLocals();
  console.log(`  ${carouselCount} carousel image(s) optimized`);

  console.log("\nTestimonials → WebP");
  for (const id of TESTIMONIAL_IDS) {
    const slug = id.replace("photo-", "");
    const dest = path.join(publicDir, "home", "testimonials", `${slug}.webp`);
    await downloadToWebp(
      `https://images.unsplash.com/${id}?auto=format&fit=crop&w=400&h=500&q=80`,
      dest,
      { width: 400, height: 500 },
    );
  }

  console.log("\nFlags → WebP");
  for (const code of FLAG_CODES) {
    const dest = path.join(publicDir, "flags", `${code}.webp`);
    await downloadToWebp(`https://flagcdn.com/w80/${code}.png`, dest, { width: 80, height: 80 });
  }

  console.log("\nLoader images → WebP");
  for (const item of LOADER_SOURCES) {
    await convertLocalToWebp(item.src, item.dest, { width: item.width });
  }

  console.log("\nOptimizing SVGs with SVGO");
  const svgCount = await optimizeSvgs(publicDir);
  console.log(`  ${svgCount} SVG file(s) updated`);

  console.log("\nDone.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
