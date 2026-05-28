import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, Calendar, Clock, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  params: Promise<{ id: string }>;
};

// Simple static mapping for demo purposes
const POST_CONTENT: Record<string, any> = {
  "future-of-ai-communications": {
    title: "The Future of AI-Driven Voice Communications",
    image: "/blog_ai_comm_1777703161729.png",
    date: "May 12, 2026",
    readTime: "6 min read",
    author: "Alex Rivera",
    category: "AI & Innovation",
  },
  "scaling-global-connectivity": {
    title: "Scaling Global Connectivity: A New Era of Networking",
    image: "/blog_connectivity_1777703241008.png",
    date: "May 10, 2026",
    readTime: "8 min read",
    author: "Sarah Chen",
    category: "Connectivity",
  },
  "maximizing-team-productivity": {
    title: "Maximizing Productivity with Holographic Tools",
    image: "/blog_productivity_1777703371947.png",
    date: "May 08, 2026",
    readTime: "5 min read",
    author: "Marcus Thorne",
    category: "Productivity",
  },
  "security-in-decentralized-networks": {
    title: "Securing the Future: Safety in Decentralized Networks",
    image: "/blog_ai_comm_1777703161729.png",
    date: "May 05, 2026",
    readTime: "10 min read",
    author: "Elena Vance",
    category: "Security",
  }
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const post = POST_CONTENT[id] || { title: "Blog Post" };
  return {
    title: post.title,
    description: `Read more about ${post.title} on the Ondial blog.`,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { id } = await params;
  const post = POST_CONTENT[id];

  if (!post) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center p-8">
        <h1 className="mb-4 text-2xl font-bold">Post not found</h1>
        <Button render={<Link href="/blog" />} nativeButton={false}>Back to Blog</Button>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-4xl px-4 pt-32 pb-24 md:pt-40 lg:max-w-5xl lg:px-8 lg:pt-32 xl:max-w-6xl xl:px-10">
      <Link 
        href="/blog" 
        className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ChevronLeft className="size-4" /> Back to all posts
      </Link>

      <article className="flex flex-col">
        {/* Header */}
        <header className="mb-10">
          <div className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-muted-foreground">
            <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
              {post.category}
            </span>
            <span className="text-border">·</span>
            <span className="flex items-center gap-1.5">
              <Calendar className="size-3.5 shrink-0" aria-hidden />
              {post.date}
            </span>
            <span className="text-border">·</span>
            <span className="flex items-center gap-1.5">
              <Clock className="size-3.5 shrink-0" aria-hidden />
              {post.readTime}
            </span>
          </div>
          <h1 className="mb-8 text-balance text-3xl font-semibold leading-snug text-foreground sm:text-4xl">
            {post.title}
          </h1>
          <div className="flex items-center justify-between border-y border-border/50 py-5">
            <div className="flex items-center gap-3">
              <div className="relative size-10 overflow-hidden rounded-full border border-border/50 bg-muted">
                <Image src="/blog_author_avatar_1777703411435.png" alt={post.author} fill className="object-cover" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-foreground">{post.author}</span>
                <span className="text-sm text-muted-foreground">Ondial Team</span>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Share2 className="size-4" />
            </Button>
          </div>
        </header>

        {/* Featured Image */}
        <div className="relative mb-12 aspect-2/1 w-full overflow-hidden rounded-[2rem] border border-border/50 shadow-2xl">
          <Image src={post.image} alt={post.title} fill className="object-cover" priority />
        </div>

        {/* Content */}
        <div className="prose prose-slate prose-base dark:prose-invert max-w-none prose-headings:font-semibold prose-p:text-muted-foreground prose-p:leading-7">
          <p className="not-prose mb-8 text-lg leading-relaxed text-foreground/90">
            This is a sample blog post placeholder. In a real application, this content would be fetched from a CMS like Sanity, Contentful, or a local Markdown directory.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          <h2>Innovative Communication Strategies</h2>
          <p>
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <ul className="list-disc pl-6 space-y-4 my-8">
            <li>Artificial Intelligence integration for real-time translation.</li>
            <li>Low-latency global networking via software-defined protocols.</li>
            <li>Holographic presence in collaborative virtual environments.</li>
          </ul>
          <p>
            Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida.
          </p>
        </div>
      </article>
    </div>
  );
}
