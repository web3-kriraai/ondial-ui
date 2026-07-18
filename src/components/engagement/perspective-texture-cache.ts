import { HOME_CAROUSEL_SLIDES } from "@/config/home-carousel";

export const ENGAGEMENT_GRID_IMAGES = HOME_CAROUSEL_SLIDES.map((slide) => slide.image);

const imageCache = new Map<string, HTMLImageElement>();
const inflight = new Map<string, Promise<HTMLImageElement>>();

function loadImage(src: string): Promise<HTMLImageElement> {
  const cached = imageCache.get(src);
  if (cached) return Promise.resolve(cached);

  const pending = inflight.get(src);
  if (pending) return pending;

  const promise = new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.decoding = "async";
    image.onload = () => {
      imageCache.set(src, image);
      inflight.delete(src);
      resolve(image);
    };
    image.onerror = () => {
      inflight.delete(src);
      reject(new Error(`Failed to load engagement texture: ${src}`));
    };
    image.src = src;
  });

  inflight.set(src, promise);
  return promise;
}

/** Warm decode carousel images so reopen does not re-decode from network. */
export function preloadEngagementImages(
  images: readonly string[] = ENGAGEMENT_GRID_IMAGES,
): Promise<void> {
  return Promise.allSettled(images.map((src) => loadImage(src))).then(() => undefined);
}

export function getCachedEngagementImage(src: string): HTMLImageElement | null {
  return imageCache.get(src) ?? null;
}

export async function getEngagementImage(src: string): Promise<HTMLImageElement | null> {
  try {
    return await loadImage(src);
  } catch {
    return null;
  }
}
