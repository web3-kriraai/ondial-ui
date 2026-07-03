"use client";

import { ComposableMap, Geographies, Geography } from "@vnedyalk0v/react19-simple-maps";
import { motion } from "framer-motion";
import type { Feature, Geometry } from "geojson";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { Topology } from "topojson-specification";

import { CountryFlag } from "@/components/ui/country-picker";
import type { ServicesCountry } from "@/data/services-countries-content";
import {
  MAP_CROP,
  MAP_VIEWBOX,
  projectCountryToMapPercent,
  SERVICES_COUNTRY_COORDINATES,
} from "@/data/services-country-coordinates";
import { SERVICES_COUNTRIES_SECTION } from "@/data/services-countries-content";
import worldTopology from "@/data/world-countries-110m.json";
import { cn } from "@/lib/utils";

import styles from "./services-countries-map.module.css";

type ServicesCountriesMapProps = {
  countries: readonly ServicesCountry[];
  className?: string;
};

type PlacedCountry = ServicesCountry & {
  xPct: number;
  yPct: number;
};

type WorldGeographyFeature = Feature<Geometry> & { rsmKey: string };

const worldAtlasTopology = worldTopology as unknown as Topology;

const FEATURED_ISO2 = [
  "us",
  "in",
  "gb",
  "de",
  "au",
  "br",
  "jp",
  "ca",
  "fr",
  "za",
] as const;

function MapPinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden>
      <path
        d="M12 2C8.14 2 5 5.14 5 9c0 5.25 6.14 12.05 6.4 12.34a0.8 0.8 0 0 0 1.2 0C12.86 21.05 19 14.25 19 9c0-3.86-3.14-7-7-7z"
        fill="currentColor"
      />
      <circle cx="12" cy="9" r="2.75" fill="white" />
    </svg>
  );
}

export function ServicesCountriesMap({
  countries,
  className,
}: ServicesCountriesMapProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [hoverId, setHoverId] = useState<string | null>(null);

  const placedCountries = useMemo((): PlacedCountry[] => {
    return countries
      .map((country) => {
        const coords = SERVICES_COUNTRY_COORDINATES[country.iso2];
        if (!coords) return null;
        const projected = projectCountryToMapPercent(coords.lat, coords.lng);
        if (!projected) return null;
        return { ...country, ...projected };
      })
      .filter((item): item is PlacedCountry => item !== null);
  }, [countries]);

  const cycleTargets = useMemo(
    () => placedCountries.filter((c) => FEATURED_ISO2.includes(c.iso2 as (typeof FEATURED_ISO2)[number])),
    [placedCountries],
  );

  const resolvedActiveId =
    hoverId ?? activeId ?? cycleTargets[0]?.id ?? placedCountries[0]?.id ?? null;

  useEffect(() => {
    if (hoverId || cycleTargets.length === 0) return undefined;

    let index = cycleTargets.findIndex((c) => c.id === activeId);
    if (index < 0) index = 0;

    const timer = window.setInterval(() => {
      index = (index + 1) % cycleTargets.length;
      setActiveId(cycleTargets[index]?.id ?? null);
    }, 3500);

    return () => window.clearInterval(timer);
  }, [activeId, cycleTargets, hoverId]);

  const selectCountry = useCallback((id: string) => {
    setHoverId(id);
    setActiveId(id);
  }, []);

  const clearHover = useCallback(() => {
    setHoverId(null);
  }, []);

  const flagStripItems = useMemo(() => [...countries, ...countries], [countries]);
  const stats = SERVICES_COUNTRIES_SECTION.stats;

  return (
    <motion.div
      initial={{ opacity: 0, translateY: 18 }}
      whileInView={{ opacity: 1, translateY: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className={cn(styles.mapRoot, className)}
    >
      <figure className={styles.worldMapFigure}>
        <div className={styles.mapStage}>
          <ComposableMap
            projection="geoEqualEarth"
            className={styles.worldMapSvg}
            viewBox={`0 ${MAP_CROP.top} ${MAP_VIEWBOX.width} ${MAP_CROP.height}`}
            aria-label="World map showing OnDial global coverage"
          >
            <defs>
              <pattern
                id="servicesMapDots"
                width={5}
                height={5}
                patternUnits="userSpaceOnUse"
              >
                <circle cx={1.1} cy={1.1} r={1.05} fill="rgb(100 100 105 / 0.75)" />
              </pattern>
            </defs>
            <Geographies geography={worldAtlasTopology}>
              {({ geographies }) =>
                (geographies as WorldGeographyFeature[])
                  .filter((geo) => geo.properties?.name !== "Antarctica")
                  .map((geo) => (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      className={styles.worldMapGeography}
                      style={{
                        default: { fill: "url(#servicesMapDots)", outline: "none" },
                        hover: { fill: "url(#servicesMapDots)", outline: "none" },
                        pressed: { fill: "url(#servicesMapDots)", outline: "none" },
                      }}
                    />
                  ))
              }
            </Geographies>
          </ComposableMap>

          <div className={styles.mapCanvas} aria-hidden={false}>
            <div className={cn(styles.statPill, styles.statPillLeft)}>
              <strong>{stats[0]?.value}</strong>
              {stats[0]?.label}
            </div>
            <div className={cn(styles.statPill, styles.statPillCenter)}>
              <strong>{stats[2]?.value}</strong>
              {stats[2]?.label}
            </div>
            <div className={cn(styles.statPill, styles.statPillRight)}>
              <strong>{stats[1]?.value}</strong>
              {stats[1]?.label}
            </div>

            {placedCountries.map((country) => {
              const isActive = country.id === resolvedActiveId;

              if (isActive) {
                return (
                  <div
                    key={country.id}
                    className={cn(styles.mapLocation, styles.mapLocationActive)}
                    style={{ left: `${country.xPct}%`, top: `${country.yPct}%` }}
                  >
                    <div
                      className={cn(
                        styles.locationBubble,
                        styles.locationBubbleActive,
                      )}
                    >
                      <div className={styles.locationBubbleHead}>
                        <span className={styles.locationFlag} aria-hidden>
                          <CountryFlag iso2={country.iso2} alt="" />
                        </span>
                        <div className={styles.locationText}>
                          <div className={styles.locationName}>{country.name}</div>
                          <div className={styles.locationDesc}>AI voice coverage</div>
                        </div>
                      </div>
                    </div>
                    <span className={styles.pinPulse} aria-hidden />
                    <button
                      type="button"
                      className={styles.pinButton}
                      aria-label={country.name}
                      aria-pressed
                      onMouseEnter={() => selectCountry(country.id)}
                      onFocus={() => selectCountry(country.id)}
                      onMouseLeave={clearHover}
                      onBlur={clearHover}
                    >
                      <MapPinIcon className={styles.pinIcon} />
                    </button>
                    <span className={styles.anchorDot} aria-hidden />
                  </div>
                );
              }

              return (
                <button
                  key={country.id}
                  type="button"
                  className={styles.mapLocationDot}
                  style={{ left: `${country.xPct}%`, top: `${country.yPct}%` }}
                  aria-label={country.name}
                  onMouseEnter={() => selectCountry(country.id)}
                  onFocus={() => selectCountry(country.id)}
                  onMouseLeave={clearHover}
                  onBlur={clearHover}
                  onClick={() => setActiveId(country.id)}
                />
              );
            })}
          </div>
        </div>

        <div className={styles.flagStrip} aria-label="Countries served">
          <div className={styles.flagStripTrack}>
            {flagStripItems.map((country, index) => (
              <span key={`${country.id}-${index}`} className={styles.flagChip}>
                <span className={styles.flagChipIcon} aria-hidden>
                  <CountryFlag iso2={country.iso2} alt="" />
                </span>
                {country.name}
              </span>
            ))}
          </div>
        </div>
      </figure>
    </motion.div>
  );
}
