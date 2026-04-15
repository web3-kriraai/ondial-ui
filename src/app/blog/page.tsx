import type { Metadata } from "next";
import Link from "next/link";

import { MarketingPageBody } from "@/components/layout/marketing-page-body";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Blog",
  description: "Articles and updates from Ondial.",
};

const SAMPLE_POSTS = [
  { id: "hello-world", title: "Hello world" },
  { id: "next-steps", title: "Next steps with your API" },
] as const;

export default function BlogIndexPage() {
  return (
    <MarketingPageBody
      title="Blog"
      description="Index posts from your backend or CMS. Below are example links to dynamic routes."
    >
      <ul className="flex flex-col gap-2">
        {SAMPLE_POSTS.map((post) => (
          <li key={post.id}>
            <Button variant="link" className="h-auto p-0" render={<Link href={`/blog/${post.id}`} prefetch />} nativeButton={false}>
              {post.title}
            </Button>
          </li>
        ))}
      </ul>
      <Button variant="outline" render={<Link href="/blog/author/team" prefetch />} nativeButton={false}>
        Sample author page
      </Button>
    </MarketingPageBody>
  );
}
