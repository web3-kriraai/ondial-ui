"use client";

import {
  Antenna,
  ArrowUpRight,
  BarChart3,
  Bot,
  Building2,
  Car,
  Check,
  ChevronLeft,
  ChevronRight,
  Database,
  Factory,
  FileCheck,
  Globe2,
  GraduationCap,
  HardHat,
  Headphones,
  Heart,
  Hotel,
  Landmark,
  LayoutGrid,
  LineChart,
  PhoneCall,
  Plane,
  Plug,
  Rocket,
  Scale,
  ShieldCheck,
  ShoppingCart,
  Sprout,
  Stethoscope,
  Target,
  TrendingDown,
  Truck,
  Zap,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRef, type CSSProperties } from "react";
import type { Swiper as SwiperType } from "swiper";
import { Autoplay, EffectCreative, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import type { ServicesIndustry } from "@/data/services-content";
import { cn } from "@/lib/utils";

import "swiper/css";
import "swiper/css/effect-creative";
import "swiper/css/pagination";

import styles from "./services-industries-carousel.module.css";

const ICON_MAP: Record<string, LucideIcon> = {
  stethoscope: Stethoscope,
  landmark: Landmark,
  building: Building2,
  cart: ShoppingCart,
  file: FileCheck,
  target: Target,
  headphones: Headphones,
  antenna: Antenna,
  car: Car,
  graduation: GraduationCap,
  plane: Plane,
  hotel: Hotel,
  scale: Scale,
  zap: Zap,
  heart: Heart,
  truck: Truck,
  factory: Factory,
  "hard-hat": HardHat,
  sprout: Sprout,
  hospital: Building2,
  "trending-down": TrendingDown,
  shield: ShieldCheck,
  plug: Plug,
  chart: BarChart3,
  globe: Globe2,
  database: Database,
  layout: LayoutGrid,
  rocket: Rocket,
  bot: Bot,
  "chart-line": LineChart,
};

function resolveIcon(key: string): LucideIcon {
  return ICON_MAP[key] ?? PhoneCall;
}

type IndustryCarouselCardProps = {
  industry: ServicesIndustry;
  index: number;
};

function IndustryCarouselCard({ industry, index }: IndustryCarouselCardProps) {
  const Icon = resolveIcon(industry.iconKey);
  const cardStyle = {
    "--card-accent": industry.iconColor,
    "--card-soft": industry.iconBg,
  } as CSSProperties;

  return (
    <article className={styles.industryCard} style={cardStyle}>
      <div className={styles.industryCardSurface}>
        <div className={styles.industryCardHero}>
          <Icon className={styles.industryCardWatermark} strokeWidth={1.25} aria-hidden />
          <div className={styles.industryCardHeroTop}>
            <span className={styles.industryIndex} aria-hidden>
              {String(index + 1).padStart(2, "0")}
            </span>
            {industry.href ? (
              <Link href={industry.href} prefetch className={styles.learnMoreBtn}>
                Explore industry
                <ArrowUpRight className="size-3.5" aria-hidden />
              </Link>
            ) : null}
          </div>
          <div className={styles.industryCardHeroMain}>
            <span className={styles.industryCardIcon} aria-hidden>
              <Icon className="size-8" strokeWidth={1.75} />
            </span>
            <div className={styles.industryCardHeading}>
              <h3 className={styles.industryCardTitle}>{industry.name}</h3>
              <p className={styles.industryCardSummary}>{industry.summary}</p>
            </div>
          </div>
        </div>

        <div className={styles.industryCardBody}>
          <p className={styles.industryDescription}>{industry.description}</p>
          <div className={styles.highlightsBox}>
            <h4 className={styles.highlightsTitle}>Key capabilities</h4>
            <ul className={styles.highlightsList}>
              {industry.highlights.map((highlight) => (
                <li key={highlight} className={styles.highlightItem}>
                  <Check className="mt-0.5 size-3.5 shrink-0" strokeWidth={2.5} aria-hidden />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </article>
  );
}

type ServicesIndustriesCarouselProps = {
  industries: readonly ServicesIndustry[];
  className?: string;
  autoplayDelayMs?: number;
};

export function ServicesIndustriesCarousel({
  industries,
  className,
  autoplayDelayMs = 4500,
}: ServicesIndustriesCarouselProps) {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ duration: 0.3, delay: 0.15 }}
      className={cn(styles.carouselRoot, className)}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className={styles.carouselInner}
      >
        <Swiper
          className={styles.swiper}
          modules={[EffectCreative, Pagination, Autoplay]}
          effect="creative"
          grabCursor
          slidesPerView={1}
          centeredSlides
          loop={industries.length > 1}
          speed={500}
          spaceBetween={0}
          autoplay={{
            delay: autoplayDelayMs,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          pagination={{ clickable: true }}
          creativeEffect={{
            prev: {
              shadow: true,
              translate: [0, 0, -400],
            },
            next: {
              translate: ["100%", 0, 0],
            },
          }}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
        >
          {industries.map((industry, index) => (
            <SwiperSlide key={industry.id} className={styles.swiperSlide}>
              <IndustryCarouselCard industry={industry} index={index} />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className={styles.navRow}>
          <button
            type="button"
            className={styles.navBtn}
            aria-label="Previous industry"
            onClick={() => swiperRef.current?.slidePrev()}
          >
            <ChevronLeft className="size-5" strokeWidth={2.25} aria-hidden />
          </button>
          <button
            type="button"
            className={styles.navBtn}
            aria-label="Next industry"
            onClick={() => swiperRef.current?.slideNext()}
          >
            <ChevronRight className="size-5" strokeWidth={2.25} aria-hidden />
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
