'use client';

import { useMemo, useState } from 'react';

const PUBLIC_FALLBACK = '/img/logo/fav.svg';

/**
 * Tries `preferredSrc`, then common vector paths, then a guaranteed public asset.
 * Use for about/CTA hero art when `/img/vector/*.png` may be missing on disk or CDN.
 */
export default function IllustrationImg({
  preferredSrc,
  alt = '',
  className = '',
  width = 400,
  height = 400,
}) {
  const candidates = useMemo(() => {
    const list = [
      preferredSrc,
      '/img/vector/vector7.png',
      '/img/vector/vector8.png',
      '/img/vector/vector6.png',
      PUBLIC_FALLBACK,
    ]
      .map((s) => (typeof s === 'string' ? s.trim() : ''))
      .filter(Boolean);
    return [...new Set(list)];
  }, [preferredSrc]);

  const [index, setIndex] = useState(0);
  const src = candidates[Math.min(index, candidates.length - 1)] || PUBLIC_FALLBACK;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      loading={index === 0 ? 'eager' : 'lazy'}
      decoding="async"
      onError={() =>
        setIndex((i) => (i + 1 < candidates.length ? i + 1 : i))
      }
    />
  );
}
