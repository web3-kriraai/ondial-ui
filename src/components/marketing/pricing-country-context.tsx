"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import {
  buildCountryPricingViewFromCountry,
  DEFAULT_PRICING_COUNTRY_ID,
  detectDefaultPricingCountryId,
  getPricingCountry,
  isPricingCountryId,
  PRICING_COUNTRIES,
  type CountryPricingView,
  type PricingCountryDefinition,
  type PricingCountryId,
} from "@/data/pricing-by-country";
import { fetchPackages, countryIdToIso, countryIsoToId } from "@/lib/api/packages";
import { fetchUsdToInrRate } from "@/lib/api/exchange-rate";
import {
  applyPackagesToCountryDefinition,
  mergeAvailableCountries,
} from "@/lib/pricing/apply-packages";

const STORAGE_KEY = "ondial-pricing-country";

type GeoCountryResponse = {
  success?: boolean;
  detectedCountryIso?: string | null;
  defaultCountryIso?: string;
};

async function detectCountryFromGeoApi(): Promise<PricingCountryId | null> {
  try {
    const response = await fetch("/api/geo/country", {
      method: "GET",
      headers: { Accept: "application/json" },
    });
    const data = (await response.json().catch(() => null)) as GeoCountryResponse | null;
    const iso = data?.detectedCountryIso;
    if (iso && isPricingCountryId(countryIsoToId(iso))) {
      return countryIsoToId(iso);
    }
  } catch {
    /* fall through */
  }
  return null;
}

function readStoredCountryId(): PricingCountryId | null {
  if (typeof window === "undefined") {
    return null;
  }

  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored && isPricingCountryId(stored)) {
    return stored;
  }

  return null;
}

type PricingCountryContextValue = CountryPricingView & {
  countryId: PricingCountryId;
  setCountryId: (countryId: PricingCountryId) => void;
  /** Countries shown in the picker (from API when available). */
  availableCountries: readonly PricingCountryDefinition[];
  loading: boolean;
  error: string | null;
};

const PricingCountryContext = createContext<PricingCountryContextValue | null>(null);

export function PricingCountryProvider({ children }: { children: ReactNode }) {
  const [countryId, setCountryIdState] = useState<PricingCountryId>(DEFAULT_PRICING_COUNTRY_ID);
  const [countryReady, setCountryReady] = useState(false);
  const [liveCountry, setLiveCountry] = useState<PricingCountryDefinition | null>(null);
  const [availableCountries, setAvailableCountries] = useState<readonly PricingCountryDefinition[]>(
    PRICING_COUNTRIES,
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const bootstrapCountry = async () => {
      const stored = readStoredCountryId();
      if (stored) {
        if (!cancelled) {
          setCountryIdState(stored);
          setCountryReady(true);
        }
        return;
      }

      const geoId = await detectCountryFromGeoApi();
      const nextId = geoId ?? detectDefaultPricingCountryId();
      if (!cancelled) {
        setCountryIdState(nextId);
        setCountryReady(true);
      }
    };

    void bootstrapCountry();

    const handleStorage = (event: StorageEvent) => {
      if (event.key !== STORAGE_KEY || !event.newValue || !isPricingCountryId(event.newValue)) {
        return;
      }
      setCountryIdState(event.newValue);
    };

    window.addEventListener("storage", handleStorage);
    return () => {
      cancelled = true;
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  const setCountryId = useCallback((nextCountryId: PricingCountryId) => {
    setCountryIdState(nextCountryId);
    window.localStorage.setItem(STORAGE_KEY, nextCountryId);
  }, []);

  useEffect(() => {
    if (!countryReady) return;

    let cancelled = false;

    const load = async () => {
      setLoading(true);
      setError(null);

      try {
        const [data, usdToInrRate] = await Promise.all([
          fetchPackages(countryIdToIso(countryId)),
          fetchUsdToInrRate(),
        ]);
        if (cancelled) return;

        if (!data.success || !Array.isArray(data.packages)) {
          setError(data.error || "Failed to load pricing");
          setLiveCountry(null);
          return;
        }

        const resolvedIso = data.resolvedCountryIso || data.countryIso || countryIdToIso(countryId);
        const resolvedId = countryIsoToId(resolvedIso);
        const mergedCountries = mergeAvailableCountries(data.availableCountries);

        if (mergedCountries.length > 0) {
          setAvailableCountries(mergedCountries);
        }

        const nameFromCatalog = mergedCountries.find((c) => c.id === resolvedId)?.name;
        const nextCountry = applyPackagesToCountryDefinition(
          data.packages,
          resolvedIso,
          nameFromCatalog,
          { usdToInrRate },
        );
        setLiveCountry(nextCountry);

        // If stored/selected country isn't in the live catalog, snap to the resolved priced country.
        const catalogIds = new Set(mergedCountries.map((entry) => entry.id));
        if (catalogIds.size > 0 && !catalogIds.has(countryId) && resolvedId !== countryId) {
          setCountryIdState(resolvedId);
          window.localStorage.setItem(STORAGE_KEY, resolvedId);
        }
      } catch {
        if (!cancelled) {
          setError("Unable to load live pricing");
          setLiveCountry(null);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    void load();
    return () => {
      cancelled = true;
    };
  }, [countryId, countryReady]);

  const country = liveCountry ?? getPricingCountry(countryId);
  const pricingView = useMemo(
    () => buildCountryPricingViewFromCountry(country),
    [country],
  );

  const value = useMemo(
    () => ({
      countryId,
      ...pricingView,
      availableCountries,
      setCountryId,
      loading: !countryReady || loading,
      error,
    }),
    [countryId, pricingView, availableCountries, setCountryId, countryReady, loading, error],
  );

  return (
    <PricingCountryContext.Provider value={value}>{children}</PricingCountryContext.Provider>
  );
}

export function usePricingCountry() {
  const context = useContext(PricingCountryContext);

  if (!context) {
    throw new Error("usePricingCountry must be used within PricingCountryProvider");
  }

  return context;
}
