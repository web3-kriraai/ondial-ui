export type ShowcaseSlide = {
  id: string;
  image: string;
  alt: string;
};

export type ShowcaseStep = {
  number: string;
  label: string;
};

/** Images for the homepage 3D showcase carousel (local assets + curated Unsplash). */
export const SHOWCASE_SLIDES: ShowcaseSlide[] = [
  {
    id: "ai-voice",
    image: "/blog_ai_comm_1777703161729.png",
    alt: "AI-driven voice communications interface",
  },
  {
    id: "connectivity",
    image: "/blog_connectivity_1777703241008.png",
    alt: "Global network connectivity visualization",
  },
  {
    id: "productivity",
    image: "/blog_productivity_1777703371947.png",
    alt: "Team productivity and collaboration tools",
  },
  {
    id: "workspace",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop",
    alt: "Modern digital workspace analytics",
  },
  {
    id: "infrastructure",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop",
    alt: "Cloud infrastructure and global scale",
  },
  {
    id: "design",
    image:
      "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1200&auto=format&fit=crop",
    alt: "Product design and user experience",
  },
  {
    id: "support",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop",
    alt: "Customer support and team collaboration",
  },
];

export const SHOWCASE_STEPS: ShowcaseStep[] = [
  { number: "01", label: "Strategy & Planning" },
  { number: "02", label: "Design & Development" },
  { number: "03", label: "Launch & Growth" },
  { number: "04", label: "Ongoing Support" },
];
