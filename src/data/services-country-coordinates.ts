import { geoEqualEarth } from "d3-geo";

/** Approximate country-centroid coordinates for map markers (WGS84). */
export const SERVICES_COUNTRY_COORDINATES: Record<
  string,
  { lat: number; lng: number }
> = {
  dz: { lat: 28.03, lng: 1.66 },
  ar: { lat: -38.42, lng: -63.62 },
  au: { lat: -25.27, lng: 133.78 },
  at: { lat: 47.52, lng: 14.55 },
  bb: { lat: 13.19, lng: -59.54 },
  be: { lat: 50.5, lng: 4.47 },
  bj: { lat: 9.31, lng: 2.32 },
  ba: { lat: 43.92, lng: 17.68 },
  bw: { lat: -22.33, lng: 24.68 },
  br: { lat: -14.24, lng: -51.93 },
  bg: { lat: 42.73, lng: 25.49 },
  ca: { lat: 56.13, lng: -106.35 },
  cl: { lat: -35.68, lng: -71.54 },
  co: { lat: 4.57, lng: -74.3 },
  hr: { lat: 45.1, lng: 15.2 },
  cz: { lat: 49.82, lng: 15.47 },
  dk: { lat: 56.26, lng: 9.5 },
  ec: { lat: -1.83, lng: -78.18 },
  sv: { lat: 13.79, lng: -88.9 },
  ee: { lat: 58.6, lng: 25.01 },
  fi: { lat: 61.92, lng: 25.75 },
  fr: { lat: 46.23, lng: 2.21 },
  de: { lat: 51.17, lng: 10.45 },
  gh: { lat: 7.95, lng: -1.02 },
  gr: { lat: 39.07, lng: 21.82 },
  gd: { lat: 12.12, lng: -61.68 },
  gn: { lat: 9.95, lng: -9.7 },
  hk: { lat: 22.32, lng: 114.17 },
  hu: { lat: 47.16, lng: 19.5 },
  id: { lat: -0.79, lng: 113.92 },
  ie: { lat: 53.41, lng: -8.24 },
  il: { lat: 31.05, lng: 34.85 },
  it: { lat: 41.87, lng: 12.57 },
  jm: { lat: 18.11, lng: -77.3 },
  jp: { lat: 36.2, lng: 138.25 },
  ke: { lat: -0.02, lng: 37.91 },
  mo: { lat: 22.2, lng: 113.54 },
  ml: { lat: 17.57, lng: -4.0 },
  mu: { lat: -20.35, lng: 57.55 },
  mx: { lat: 23.63, lng: -102.55 },
  na: { lat: -22.96, lng: 18.49 },
  nl: { lat: 52.13, lng: 5.29 },
  nz: { lat: -40.9, lng: 174.89 },
  pa: { lat: 8.54, lng: -80.78 },
  pe: { lat: -9.19, lng: -75.02 },
  ph: { lat: 12.88, lng: 121.77 },
  pl: { lat: 51.92, lng: 19.15 },
  pt: { lat: 39.4, lng: -8.22 },
  pr: { lat: 18.22, lng: -66.59 },
  ro: { lat: 45.94, lng: 24.97 },
  sk: { lat: 48.67, lng: 19.7 },
  si: { lat: 46.15, lng: 14.99 },
  za: { lat: -30.56, lng: 22.94 },
  sd: { lat: 12.86, lng: 30.22 },
  ch: { lat: 46.82, lng: 8.23 },
  th: { lat: 15.87, lng: 100.99 },
  tn: { lat: 33.89, lng: 9.54 },
  ug: { lat: 1.37, lng: 32.29 },
  gb: { lat: 55.38, lng: -3.44 },
  us: { lat: 37.09, lng: -95.71 },
  ve: { lat: 6.42, lng: -66.59 },
  vi: { lat: 18.34, lng: -64.9 },
  in: { lat: 20.59, lng: 78.96 },
  my: { lat: 4.21, lng: 101.98 },
};

/**
 * Full-globe projection frame. Must match the width/height
 * `<ComposableMap>` is built with (its own defaults) so the projection math
 * lines up exactly.
 */
export const MAP_VIEWBOX = { width: 800, height: 600 } as const;

/**
 * `geoEqualEarth` projects the globe into a lens/oval shape, not a full
 * rectangle, so a chunk of the 800x600 frame above the Arctic and below the
 * southern tips of South America/Africa is always empty margin. With
 * Antarctica filtered out of the rendered geography, the tallest real
 * content (Greenland, Arctic Russia down to Cape Horn, South Georgia) sits
 * between y=~68 and y=~483. Cropping the visible viewBox to this vertical
 * band removes that dead space top and bottom while keeping a safe margin
 * so no landmass gets clipped.
 */
export const MAP_CROP = { top: 60, height: 440 } as const;

/**
 * Same `geoEqualEarth` projection `@vnedyalk0v/react19-simple-maps` builds
 * internally for an un-configured `<ComposableMap>` (default projection,
 * default width/height, no custom scale/center). Reusing the identical
 * projection here guarantees marker positions land exactly on the rendered
 * country shapes instead of relying on a hand-tuned approximation.
 */
const mapProjection = geoEqualEarth().translate([
  MAP_VIEWBOX.width / 2,
  MAP_VIEWBOX.height / 2,
]);

/**
 * Rounds to 4 decimal places before it ever reaches a style attribute.
 *
 * Browsers store inline CSS numeric values with limited (~single-float)
 * precision, so an unrounded double like `55.084321170668495` gets
 * silently truncated to `55.0843` the moment the server-rendered HTML is
 * parsed. React's hydration then diffs that already-truncated DOM value
 * against the freshly (fully precise) computed client value and reports a
 * mismatch, even though both sides agree on the underlying number.
 * Rounding here keeps the server string and the client string identical.
 */
function roundPercent(value: number): number {
  return Math.round(value * 10_000) / 10_000;
}

export function projectCountryToMapPercent(
  lat: number,
  lng: number,
): { xPct: number; yPct: number } | null {
  const projected = mapProjection([lng, lat]);
  if (!projected) return null;
  const [x, y] = projected;
  return {
    xPct: roundPercent((x / MAP_VIEWBOX.width) * 100),
    yPct: roundPercent(((y - MAP_CROP.top) / MAP_CROP.height) * 100),
  };
}
