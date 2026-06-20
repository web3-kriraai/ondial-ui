"use client";

import Image from "next/image";
import { AppLink as Link } from "@/components/ui/app-link";
import { TextReveal } from "@/components/ui/text-reveal";
import { testimonialPhotoPath } from "@/data/home-testimonial-images";
import {
  TESTIMONIAL_HERO_COLUMNS,
  TESTIMONIAL_HERO_COPY,
  TESTIMONIAL_ARTBOARD_WIDTH,
  type TestimonialPhotoCard,
  type TestimonialPhotoColumn,
} from "@/data/testimonials-hero-gallery";
import {
  marketingEyebrowClass,
  marketingSectionBgClass,
  marketingSectionContainerClass,
} from "@/config/marketing-layout";
import { cn } from "@/lib/utils";

import styles from "./home-testimonials-section.module.css";

const sectionHeadingClass =
  "w-full max-w-3xl text-balance text-3xl font-semibold leading-tight tracking-tight sm:text-4xl";

const sectionDescriptionClass =
  "mt-4 max-w-lg text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg";

const sectionCtaClass =
  "inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90";

const MOBILE_TILES = [
  { src: testimonialPhotoPath("photo-1494790108377-be9c29b29330"), offset: "" },
  { src: testimonialPhotoPath("photo-1507003211169-0a1dd7228f2d"), offset: styles.mobileTileOffset },
  { src: testimonialPhotoPath("photo-1500648767791-00dcc994a43e"), offset: styles.mobileTileOffset2 },
  { src: null, offset: "" },
  { src: testimonialPhotoPath("photo-1438761681033-6461ffad8d80"), offset: styles.mobileTileOffset },
] as const;

function PhotoCard({
  card,
  monochrome,
  topPlaceholderPull,
}: {
  card: TestimonialPhotoCard;
  monochrome?: boolean;
  topPlaceholderPull?: number;
}) {
  const isPlaceholder = card.type === "placeholder";
  const isTopPlaceholder = isPlaceholder && !card.spacerBefore;

  return (
    <>
      {card.spacerBefore ? (
        <span
          className={styles.spacer}
          style={{ "--spacer": card.spacerBefore } as React.CSSProperties}
          aria-hidden
        />
      ) : null}
      <div
        className={cn(styles.photoCard, isTopPlaceholder && styles.topPlaceholder)}
        style={{
          aspectRatio: `${card.width} / ${card.height}`,
          animationDelay: `${card.animationDelay}s`,
          ...(isTopPlaceholder && topPlaceholderPull !== undefined
            ? { "--top-placeholder-pull": `-${topPlaceholderPull}rem` }
            : {}),
        } as React.CSSProperties}
      >
        <div
          className={cn(
            styles.photoCardInner,
            isPlaceholder && styles.placeholder,
          )}
          style={{ animationDelay: `${card.animationDelay}s` }}
        >
          {!isPlaceholder && card.src ? (
            <Image
              src={card.src}
              alt={card.alt ?? ""}
              width={Math.max(card.width, 160)}
              height={Math.max(card.height, 200)}
              sizes="(min-width: 1280px) 96px, (min-width: 768px) 80px, 20vw"
              className={cn(styles.photoImage, monochrome && styles.photoImageMonochrome)}
              loading="lazy"
            />
          ) : null}
        </div>
      </div>
    </>
  );
}

function PhotoColumn({
  column,
  visibility,
}: {
  column: TestimonialPhotoColumn;
  visibility: "md" | "lg";
}) {
  const sideClass =
    column.side === "right"
      ? styles.colRight
      : column.side === "center"
        ? styles.colCenter
        : styles.colLeft;
  const visibilityClass = visibility === "lg" ? styles.colShowLg : styles.colShowMd;

  return (
    <div
      className={cn(styles.col, sideClass, visibilityClass)}
      style={
        {
          "--col-offset": column.offset,
          "--col-width": column.width,
          "--col-padding-top": column.paddingTop ?? 0,
        } as React.CSSProperties
      }
    >
      {column.cards.map((card) => (
        <PhotoCard
          key={card.id}
          card={card}
          monochrome={column.side === "center"}
          topPlaceholderPull={column.topPlaceholderPull}
        />
      ))}
    </div>
  );
}

/** Same content width as pricing cards (`marketingSectionContainerClass`). */
export function HomeTestimonialsSection() {
  return (
    <section
      id="testimonials"
      className={cn(marketingSectionBgClass, "w-full", styles.section)}
      aria-labelledby="testimonials-hero-title"
    >
      <div className={marketingSectionContainerClass}>
        <div
          className={styles.cardWrap}
          style={
            { "--artboard-width": TESTIMONIAL_ARTBOARD_WIDTH } as React.CSSProperties
          }
        >
          <div className={styles.centerBackdrop} aria-hidden />
          <div className={styles.innerSideBlur} aria-hidden />

          <div className={styles.photoGrid}>
          <div className={styles.mobileMosaic} aria-hidden>
            {MOBILE_TILES.map((tile, i) => (
              <div
                key={i}
                className={`${styles.mobileTile} ${tile.offset}`}
              >
                {tile.src ? (
                  <Image
                    src={tile.src}
                    alt="Customer portrait"
                    width={80}
                    height={100}
                    sizes="80px"
                    className={styles.photoImage}
                    loading="lazy"
                  />
                ) : null}
              </div>
            ))}
          </div>

          {TESTIMONIAL_HERO_COLUMNS.map((column) => (
            <PhotoColumn
              key={column.id}
              column={column}
              visibility={column.showFrom ?? "md"}
            />
          ))}
        </div>

        <header className={cn(styles.center, "text-center")}>
          <p className={cn("mb-3", marketingEyebrowClass)}>{TESTIMONIAL_HERO_COPY.eyebrow}</p>
          <h2 id="testimonials-hero-title" className={sectionHeadingClass}>
            <TextReveal
              as="span"
              className="block text-foreground sm:whitespace-nowrap"
              stagger={0.06}
            >
              {TESTIMONIAL_HERO_COPY.titleBold}
            </TextReveal>
            <TextReveal
              as="span"
              className="block text-muted-foreground sm:whitespace-nowrap"
              delay={0.12}
              stagger={0.06}
            >
              {TESTIMONIAL_HERO_COPY.titleMuted}
            </TextReveal>
          </h2>
          <p className={sectionDescriptionClass}>{TESTIMONIAL_HERO_COPY.description}</p>
          <Link
            href={TESTIMONIAL_HERO_COPY.ctaHref}
            prefetch
            className={cn(sectionCtaClass, "mt-6")}
          >
            {TESTIMONIAL_HERO_COPY.ctaLabel}
            <span aria-hidden>→</span>
          </Link>
        </header>
        </div>
      </div>
    </section>
  );
}
