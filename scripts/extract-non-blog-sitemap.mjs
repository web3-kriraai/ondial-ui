import { execSync } from "child_process";
import { writeFileSync } from "fs";

const xml = execSync("git show f2aecfb:public/sitemap.xml", { encoding: "utf8" });
const urlBlocks = xml.match(/<url>[\s\S]*?<\/url>/g) ?? [];
const nonBlog = urlBlocks.filter((b) => !b.includes("/blog/"));
const out = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${nonBlog.join("\n")}
</urlset>`;
writeFileSync("src/lib/sitemap/non-blog-entries.xml", out);
console.log(`non-blog entries: ${nonBlog.length}`);
