import { testimonialPhotoPath } from "@/data/home-testimonial-images";

export type TestimonialPhotoCard = {
  id: string;
  type: "photo" | "placeholder";
  width: number;
  height: number;
  spacerBefore?: number;
  src?: string;
  alt?: string;
  animationDelay: number;
};

export type TestimonialPhotoColumn = {
  id: string;
  side: "left" | "right" | "center";
  /** px offset on 1200px artboard → converted to % in CSS */
  offset: number;
  width: number;
  paddingTop?: number;
  /** Negative margin (rem) for the top placeholder clip - center stagger */
  topPlaceholderPull?: number;
  /** Outer columns only show at xl; default md */
  showFrom?: "md" | "lg";
  cards: TestimonialPhotoCard[];
};

export const TESTIMONIAL_HERO_COPY = {
  eyebrow: "Testimonials",
  titleBold: "Trusted by leaders",
  titleMuted: "from various industries",
  description: "Learn why professionals trust our solutions to complete their customer journeys.",
  ctaLabel: "Read Success Stories",
  ctaHref: "/contact",
} as const;

export const TESTIMONIAL_ARTBOARD_WIDTH = 1200;
export const TESTIMONIAL_ARTBOARD_HEIGHT = 420;
/** Horizontal gap between columns on the 1200px artboard */
export const TESTIMONIAL_COL_GAP = 12;
/** Vertical gap between cards in a column (artboard px → spacer height) */
export const TESTIMONIAL_CARD_GAP = 10;

const u = (id: string) => testimonialPhotoPath(id);

/** Column layout from `testimonials_hero_pixel_perfect.html` */
export const TESTIMONIAL_HERO_COLUMNS: readonly TestimonialPhotoColumn[] = [
  {
    id: "col-1",
    side: "left",
    offset: 0,
    width: 115,
    paddingTop: 26,
    showFrom: "lg",
    cards: [
      { id: "c1-a", type: "placeholder", width: 115, height: 116, animationDelay: 0.05 },
      { id: "c1-b", type: "photo", spacerBefore: TESTIMONIAL_CARD_GAP, width: 115, height: 124, src: u("photo-1560250097-0b93528c311a"), alt: "", animationDelay: 0.2 },
      { id: "c1-c", type: "photo", spacerBefore: TESTIMONIAL_CARD_GAP, width: 115, height: 120, src: u("photo-1519085360753-af0119f7cbe7"), alt: "", animationDelay: 0.3 },
    ],
  },
  {
    id: "col-2",
    side: "left",
    offset: 122,
    width: 90,
    paddingTop: 8,
    cards: [
      { id: "c2-a", type: "placeholder", width: 90, height: 104, animationDelay: 0.1 },
      { id: "c2-b", type: "photo", spacerBefore: TESTIMONIAL_CARD_GAP, width: 90, height: 118, src: u("photo-1494790108377-be9c29b29330"), alt: "", animationDelay: 0.25 },
      { id: "c2-c", type: "photo", spacerBefore: TESTIMONIAL_CARD_GAP, width: 90, height: 124, src: u("photo-1580489944761-15a19d654956"), alt: "", animationDelay: 0.34 },
    ],
  },
  {
    id: "col-3",
    side: "left",
    offset: 218,
    width: 90,
    paddingTop: 18,
    cards: [
      { id: "c3-a", type: "placeholder", width: 90, height: 112, animationDelay: 0.15 },
      { id: "c3-b", type: "photo", spacerBefore: TESTIMONIAL_CARD_GAP, width: 90, height: 124, src: u("photo-1500648767791-00dcc994a43e"), alt: "", animationDelay: 0.24 },
    ],
  },
  {
    id: "col-4",
    side: "left",
    offset: 314,
    width: 100,
    cards: [
      { id: "c4-a", type: "placeholder", spacerBefore: 8, width: 100, height: 118, animationDelay: 0.08 },
      { id: "c4-b", type: "photo", spacerBefore: TESTIMONIAL_CARD_GAP, width: 100, height: 120, src: u("photo-1568602471122-7832951cc4c5"), alt: "", animationDelay: 0.18 },
    ],
  },
  /* Center band: staggered like side columns - uneven tops, gaps, and tile sizes */
  {
    id: "col-c1",
    side: "center",
    offset: 426,
    width: 82,
    paddingTop: 0,
    topPlaceholderPull: 3.5,
    cards: [
      { id: "cc1-a", type: "placeholder", width: 82, height: 94, animationDelay: 0.06 },
      {
        id: "cc1-b",
        type: "photo",
        spacerBefore: 12,
        width: 82,
        height: 132,
        src: u("photo-1494790108377-be9c29b29330"),
        alt: "",
        animationDelay: 0.21,
      },
    ],
  },
  {
    id: "col-c2",
    side: "center",
    offset: 520,
    width: 76,
    paddingTop: 28,
    topPlaceholderPull: 5,
    cards: [
      { id: "cc2-a", type: "placeholder", width: 76, height: 118, animationDelay: 0.1 },
      {
        id: "cc2-b",
        type: "photo",
        spacerBefore: 8,
        width: 76,
        height: 108,
        src: u("photo-1522075469751-3a6694fb2f61"),
        alt: "",
        animationDelay: 0.27,
      },
    ],
  },
  {
    id: "col-c3",
    side: "center",
    offset: 608,
    width: 84,
    paddingTop: 12,
    topPlaceholderPull: 4,
    cards: [
      { id: "cc3-a", type: "placeholder", spacerBefore: 6, width: 84, height: 102, animationDelay: 0.13 },
      {
        id: "cc3-b",
        type: "photo",
        spacerBefore: 14,
        width: 84,
        height: 126,
        src: u("photo-1507003211169-0a1dd7228f2d"),
        alt: "",
        animationDelay: 0.31,
      },
    ],
  },
  {
    id: "col-c4",
    side: "center",
    offset: 704,
    width: 78,
    paddingTop: 22,
    topPlaceholderPull: 3.25,
    showFrom: "lg",
    cards: [
      { id: "cc4-a", type: "placeholder", width: 78, height: 110, animationDelay: 0.09 },
      {
        id: "cc4-b",
        type: "photo",
        spacerBefore: 10,
        width: 78,
        height: 116,
        src: u("photo-1438761681033-6461ffad8d80"),
        alt: "",
        animationDelay: 0.23,
      },
    ],
  },
  {
    id: "col-5",
    side: "right",
    offset: 314,
    width: 100,
    paddingTop: 8,
    cards: [
      { id: "c5-a", type: "placeholder", width: 100, height: 112, animationDelay: 0.12 },
      { id: "c5-b", type: "photo", spacerBefore: TESTIMONIAL_CARD_GAP, width: 100, height: 122, src: u("photo-1573496359142-b8d87734a5a2"), alt: "", animationDelay: 0.2 },
    ],
  },
  {
    id: "col-6",
    side: "right",
    offset: 218,
    width: 90,
    paddingTop: 16,
    cards: [
      { id: "c6-a", type: "placeholder", width: 90, height: 108, animationDelay: 0.18 },
      { id: "c6-b", type: "photo", spacerBefore: TESTIMONIAL_CARD_GAP, width: 90, height: 122, src: u("photo-1534528741775-53994a69daeb"), alt: "", animationDelay: 0.3 },
      { id: "c6-c", type: "photo", spacerBefore: TESTIMONIAL_CARD_GAP, width: 90, height: 126, src: u("photo-1487412720507-e7ab37603c6f"), alt: "", animationDelay: 0.38 },
    ],
  },
  {
    id: "col-7",
    side: "right",
    offset: 122,
    width: 90,
    paddingTop: 6,
    cards: [
      { id: "c7-a", type: "placeholder", width: 90, height: 102, animationDelay: 0.07 },
      { id: "c7-b", type: "photo", spacerBefore: TESTIMONIAL_CARD_GAP, width: 90, height: 118, src: u("photo-1507003211169-0a1dd7228f2d"), alt: "", animationDelay: 0.22 },
      { id: "c7-c", type: "photo", spacerBefore: TESTIMONIAL_CARD_GAP, width: 90, height: 124, src: u("photo-1438761681033-6461ffad8d80"), alt: "", animationDelay: 0.3 },
    ],
  },
  {
    id: "col-8",
    side: "right",
    offset: 0,
    width: 115,
    paddingTop: 26,
    showFrom: "lg",
    cards: [
      { id: "c8-a", type: "placeholder", width: 115, height: 116, animationDelay: 0.03 },
      { id: "c8-b", type: "photo", spacerBefore: TESTIMONIAL_CARD_GAP, width: 115, height: 122, src: u("photo-1472099645785-5658abf4ff4e"), alt: "", animationDelay: 0.28 },
      { id: "c8-c", type: "photo", spacerBefore: TESTIMONIAL_CARD_GAP, width: 115, height: 120, src: u("photo-1521119989659-a83eee488004"), alt: "", animationDelay: 0.34 },
    ],
  },
] as const;
