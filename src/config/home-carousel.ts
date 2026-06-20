/**
 * Homepage 3D carousel — single source of truth.
 *
 * Workflow:
 * 1. Add source images to `public/home/carousel/` (JPG or PNG).
 * 2. Run `npm run optimize:assets` to generate lightweight WebP files.
 * 3. Point `image` at the `.webp` path below (same base name as your source file).
 */
export type HomeCarouselSlide = {
  /** Optimized WebP under /public (run `npm run optimize:assets` after updating sources). */
  image: string;
  title: string;
  subtitle: string;
  slug: string;
  href: string;
};

export const HOME_CAROUSEL_SLIDES: readonly HomeCarouselSlide[] = [
  {
    image: "/home/carousel/healthcare.webp",
    title: "Healthcare",
    subtitle: "AI Voice Agents for Healthcare & Medical",
    slug: "healthcare-and-medical-services",
    href: "/industries/healthcare-and-medical-services",
  },
  {
    image: "/home/carousel/insurance.webp",
    title: "Insurance",
    subtitle: "AI Voice Agents for Insurance",
    slug: "insurance-services",
    href: "/industries/insurance-services",
  },
  {
    image: "/home/carousel/banks.webp",
    title: "Finance & Banking",
    subtitle: "AI Voice Agents for Finance & Banking",
    slug: "financial-and-banking-services",
    href: "/industries/financial-and-banking-services",
  },
  {
    image: "/home/carousel/real-estate.webp",
    title: "Real Estate",
    subtitle: "AI Voice Agents for Real Estate",
    slug: "real-estate-services",
    href: "/industries/real-estate-services",
  },
  {
    image: "/home/carousel/Manufacturing.webp",
    title: "Manufacturing",
    subtitle: "AI Voice Agents for Manufacturing",
    slug: "manufacturing-services",
    href: "/industries/manufacturing-services",
  },
  {
    image: "/home/carousel/travel.webp",
    title: "Travel & Tourism",
    subtitle: "AI Voice Agents for Travel & Tourism",
    slug: "travel-and-tourism-services",
    href: "/industries/travel-and-tourism-services",
  },
  {
    image: "/home/carousel/transportation.webp",
    title: "Transportation & Logistics",
    subtitle: "AI Voice Agents for Transportation & Logistics",
    slug: "transportation-and-logistics-services",
    href: "/industries/transportation-and-logistics-services",
  },
  {
    image: "/home/carousel/e-commerce.webp",
    title: "Retail & E-commerce",
    subtitle: "AI Voice Agents for Retail & E-commerce",
    slug: "retail-and-ecommerce-services",
    href: "/industries/retail-and-ecommerce-services",
  },
  {
    image: "/home/carousel/telecommunication.webp",
    title: "Telecommunication",
    subtitle: "AI Voice Agents for Telecommunications",
    slug: "telecommunications-services",
    href: "/industries/telecommunications-services",
  },
  {
    image: "/home/carousel/automotive.webp",
    title: "Automotive",
    subtitle: "AI Voice Agents for Automotive",
    slug: "automotive-services",
    href: "/industries/automotive-services",
  },
  {
    image: "/home/carousel/education.webp",
    title: "Education",
    subtitle: "AI Voice Agents for Education",
    slug: "education-services",
    href: "/industries/education-services",
  },
  {
    image: "/home/carousel/hospitality.webp",
    title: "Hospitality",
    subtitle: "AI Voice Agents for Hospitality",
    slug: "hospitality-services",
    href: "/industries/hospitality-services",
  },
] as const;

/** First visible slide — preloaded for faster LCP. */
export const HOME_CAROUSEL_PRELOAD_IMAGE = HOME_CAROUSEL_SLIDES[0]?.image;
