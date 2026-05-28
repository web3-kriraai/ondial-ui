import type { Metadata } from "next";
import type { BlogPost } from "@/components/marketing/blog-card";
import { BlogList } from "@/components/marketing/blog-list";
import { MarketingPageBody } from "@/components/layout/marketing-page-body";

export const metadata: Metadata = {
  title: "Insights & Updates",
  description: "Stay updated with the latest in AI communications, connectivity, and digital transformation from the Ondial team.",
};

const STATIC_BLOG_POSTS: BlogPost[] = [
  { id: "future-of-ai-communications", title: "The Future of AI-Driven Voice Communications", excerpt: "Discover how large language models are revolutionizing the way we interact with automated voice systems and what to expect in 2026.", date: "May 12, 2026", readTime: "6 min read", category: "AI & Innovation", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80", author: { name: "Alex Rivera", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80" } },
  { id: "scaling-global-connectivity", title: "Scaling Global Connectivity: A New Era of Networking", excerpt: "Exploring the infrastructure requirements and software breakthroughs needed to connect the next billion devices seamlessly.", date: "May 10, 2026", readTime: "8 min read", category: "Connectivity", image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80", author: { name: "Sarah Chen", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80" } },
  { id: "maximizing-team-productivity", title: "Maximizing Productivity with Holographic Tools", excerpt: "A deep dive into the next generation of workspace tools that blend physical and digital environments for ultimate efficiency.", date: "May 08, 2026", readTime: "5 min read", category: "Productivity", image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80", author: { name: "Marcus Thorne", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80" } },
  { id: "security-in-decentralized-networks", title: "Securing the Future: Safety in Decentralized Networks", excerpt: "How encryption and zero-knowledge proofs are becoming the standard for modern communication security protocols.", date: "May 05, 2026", readTime: "10 min read", category: "Security", image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80", author: { name: "Elena Vance", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80" } },
  { id: "5g-and-beyond", title: "5G and Beyond: Preparing for Next-Gen Telecom", excerpt: "What telecommunications companies need to build today to support the high-bandwidth applications of tomorrow.", date: "May 01, 2026", readTime: "7 min read", category: "Infrastructure", image: "https://images.unsplash.com/photo-1614064019488-b4b1a8264585?w=800&q=80", author: { name: "David Kim", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80" } },
  { id: "the-rise-of-edge-computing", title: "The Rise of Edge Computing in Global Networks", excerpt: "Why moving processing closer to the user is the only way to achieve true zero-latency connectivity globally.", date: "Apr 28, 2026", readTime: "9 min read", category: "Architecture", image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80", author: { name: "Alex Rivera", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80" } },
  { id: "quantum-cryptography-explained", title: "Quantum Cryptography for the Modern Web", excerpt: "Understanding the shift from classical encryption methods to quantum-resistant algorithms for data privacy.", date: "Apr 22, 2026", readTime: "12 min read", category: "Security", image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80", author: { name: "Sarah Chen", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80" } },
  { id: "sustainable-data-centers", title: "Building Sustainable Data Centers", excerpt: "Innovations in cooling and power consumption that are driving the next wave of green technology infrastructure.", date: "Apr 18, 2026", readTime: "6 min read", category: "Sustainability", image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80", author: { name: "Marcus Thorne", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80" } },
  { id: "ar-vr-in-enterprise", title: "AR and VR: The New Enterprise Standard", excerpt: "How augmented reality is transforming training, collaboration, and remote assistance across major industries.", date: "Apr 14, 2026", readTime: "8 min read", category: "Productivity", image: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=800&q=80", author: { name: "Elena Vance", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80" } },
  { id: "machine-learning-in-telecom", title: "Machine Learning for Network Optimization", excerpt: "Deploying predictive AI models to automatically route traffic and predict hardware failures before they occur.", date: "Apr 09, 2026", readTime: "11 min read", category: "AI & Innovation", image: "https://images.unsplash.com/photo-1555255707-c07966088b7b?w=800&q=80", author: { name: "David Kim", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80" } },
  { id: "blockchain-for-iot", title: "Blockchain's Role in Securing the IoT Ecosystem", excerpt: "Using distributed ledgers to authenticate and secure millions of connected devices in smart cities.", date: "Apr 05, 2026", readTime: "7 min read", category: "Connectivity", image: "https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?w=800&q=80", author: { name: "Alex Rivera", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80" } },
  { id: "the-evolution-of-wifi", title: "The Evolution of Wi-Fi: Welcoming Wi-Fi 8", excerpt: "What the newest wireless standard means for enterprise networking and consumer smart home experiences.", date: "Apr 01, 2026", readTime: "5 min read", category: "Infrastructure", image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&q=80", author: { name: "Sarah Chen", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80" } },
  { id: "smart-cities-infrastructure", title: "Architecting the Smart City of 2030", excerpt: "The foundational network architecture required to support autonomous vehicles and intelligent grids.", date: "Mar 28, 2026", readTime: "9 min read", category: "Architecture", image: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=800&q=80", author: { name: "Marcus Thorne", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80" } },
  { id: "ai-in-customer-support", title: "AI Voice Agents: The End of Hold Music", excerpt: "How conversational AI is replacing traditional call centers with instant, empathetic customer service.", date: "Mar 24, 2026", readTime: "6 min read", category: "AI & Innovation", image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&q=80", author: { name: "Elena Vance", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80" } },
  { id: "satellite-internet-race", title: "The LEO Satellite Internet Race", excerpt: "An analysis of how low earth orbit satellite constellations are bringing high-speed broadband to rural areas.", date: "Mar 19, 2026", readTime: "10 min read", category: "Connectivity", image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800&q=80", author: { name: "David Kim", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80" } },
  { id: "cybersecurity-trends-2026", title: "Top Cybersecurity Trends for 2026", excerpt: "The most pressing threats facing global organizations today and the tools being built to neutralize them.", date: "Mar 15, 2026", readTime: "8 min read", category: "Security", image: "https://images.unsplash.com/photo-1614064641936-a592654c73cb?w=800&q=80", author: { name: "Alex Rivera", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80" } },
  { id: "the-metaverse-workplace", title: "Redefining the Office in the Metaverse", excerpt: "Are virtual headquarters the solution to the hybrid work dilemma? We explore the latest enterprise platforms.", date: "Mar 10, 2026", readTime: "7 min read", category: "Productivity", image: "https://images.unsplash.com/photo-1617802690992-15d93263d3a9?w=800&q=80", author: { name: "Sarah Chen", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80" } },
  { id: "zero-trust-architecture", title: "Implementing Zero Trust Architecture", excerpt: "A step-by-step guide to migrating legacy networks to a verify-everything security model.", date: "Mar 05, 2026", readTime: "11 min read", category: "Security", image: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=800&q=80", author: { name: "Marcus Thorne", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80" } },
  { id: "nlp-in-business-communications", title: "NLP's Impact on Global Business Comms", excerpt: "Real-time translation and sentiment analysis are breaking down international business barriers.", date: "Feb 28, 2026", readTime: "6 min read", category: "AI & Innovation", image: "https://images.unsplash.com/photo-1555949963-aa79dcee58d1?w=800&q=80", author: { name: "Elena Vance", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80" } },
  { id: "the-future-of-remote-work", title: "The Future of Remote Work Connectivity", excerpt: "Ensuring secure, high-speed, and reliable internet access for the globally distributed workforce.", date: "Feb 22, 2026", readTime: "5 min read", category: "Connectivity", image: "https://images.unsplash.com/photo-1516387938699-a93567ec168e?w=800&q=80", author: { name: "David Kim", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80" } }
];

import Text3DFlip from "@/components/ui/text-3d-flip";

export default function BlogIndexPage() {
  return (
    <MarketingPageBody
      title={
        <h1 className="text-balance text-3xl font-semibold tracking-tight text-foreground">
          The Future of <span className="text-primary">Communication</span>
        </h1>
      }
      description={
        <Text3DFlip 
          animateOnMount 
          rotateDirection="top" 
          staggerDuration={0.02} 
          className="text-pretty text-muted-foreground justify-center"
        >
          Explorations into AI, global connectivity, and the tools shaping how the world connects.
        </Text3DFlip>
      }
    >
      <div className="w-full lg:relative lg:left-1/2 lg:w-screen lg:-translate-x-1/2 lg:px-8 xl:px-12 mt-4">
        <div className="w-full lg:mx-auto lg:max-w-[1600px]">
          <BlogList posts={STATIC_BLOG_POSTS} />
        </div>
      </div>

      <div className="w-full lg:relative lg:left-1/2 lg:w-screen lg:-translate-x-1/2 lg:px-8 xl:px-12 mt-24 mb-12">
        <div className="mx-auto max-w-5xl rounded-[3rem] bg-black p-12 text-center text-white overflow-hidden relative isolate">
          <div className="absolute inset-0 bg-linear-to-br from-purple-500/20 via-transparent to-indigo-500/20 -z-10" />
          <h2 className="text-3xl font-bold mb-4">Stay in the loop</h2>
          <p className="text-white/60 mb-8 max-w-md mx-auto">
            Get the latest insights and updates delivered straight to your inbox. No spam, just value.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-1 rounded-full bg-white/10 border border-white/20 px-6 py-3 text-white outline-none focus:border-white/50 transition-colors"
            />
            <button className="rounded-full bg-white px-8 py-3 font-bold text-black hover:bg-white/90 transition-colors active:scale-95">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </MarketingPageBody>
  );
}
