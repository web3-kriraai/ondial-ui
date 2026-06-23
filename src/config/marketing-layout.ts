/** Shared background for all marketing / homepage sections. */
export const marketingSectionBgClass = "bg-background";

/** Soft off-white surface for dotted marketing routes - warm tint, not pure white. */
export const dottedPageSurfaceClass = "bg-[oklch(0.985_0.006_280)]";

/** Soft off-white surface for dotted marketing routes - warm tint, not pure white. */
export const blogPageSurfaceClass = "bg-[oklch(0.985_0.006_280)]";
/** Matches `SiteShell` main overlap - blog bg must bleed into this zone behind the navbar. */
export const marketingNavClearanceClass =
  "top-[calc(-1*(env(safe-area-inset-top)+4.25rem))]";

/** Blog index / listing content width. */
export const blogListingContainerClass =
  "w-full lg:relative lg:left-1/2 lg:w-screen lg:-translate-x-1/2 lg:px-8 xl:px-12";

export const blogListingInnerClass = "w-full lg:mx-auto lg:max-w-[78rem]";

/** Blog card grid - max 4 columns on xl+; cards stay fixed width via BlogCard max-w. */
export const blogListingGridClass =
  "grid grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 md:gap-7 lg:grid-cols-3 lg:gap-8 xl:grid-cols-4";

/** Shared max-width + horizontal padding for homepage marketing sections. */
export const marketingSectionContainerClass =
  "mx-auto w-full max-w-[min(100%,92rem)] px-5 sm:px-8 lg:px-12 xl:px-14";

/** Section shell on dotted marketing pages - transparent so the page grid shows through. */
export const marketingDottedSectionShellClass =
  "w-full bg-transparent py-14 sm:py-16 lg:py-20";

/** Standard padded marketing section shell (width + background, no dividers). */
export const marketingSectionShellClass = `w-full ${marketingSectionBgClass} py-14 sm:py-16 lg:py-20`;

/** First section on inner pages - tight top under nav, generous bottom. */
export const marketingPageHeroSectionClass = `w-full ${marketingSectionBgClass} pt-[clamp(1.25rem,3vw,2rem)] pb-12 sm:pb-16 lg:pb-20`;

/** Follow-on section - no extra top pad when stacked after another section. */
export const marketingSectionFollowClass = `w-full ${marketingSectionBgClass} pt-10 pb-14 sm:pt-12 sm:pb-16 lg:pt-14 lg:pb-20`;

/** Pill eyebrow used on hero, integrations, split sections, etc. */
export const marketingEyebrowClass =
  "inline-block rounded-full border border-border/60 bg-transparent px-3 py-1 text-[0.6875rem] font-medium uppercase tracking-[0.12em] text-muted-foreground";
