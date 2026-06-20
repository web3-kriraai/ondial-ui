import { buildLlmsTxt } from "@/lib/seo/llmsTxt";

export async function GET() {
  const content = buildLlmsTxt();
  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
