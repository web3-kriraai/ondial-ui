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
  buildCountryPricingView,
  DEFAULT_PRICING_COUNTRY_ID,
  detectDefaultPricingCountryId,
  isPricingCountryId,
  type CountryPricingView,
  type PricingCountryId,
} from "@/data/pricing-by-country";

const STORAGE_KEY = "ondial-pricing-country";

function readStoredCountryId(): PricingCountryId {
  if (typeof window === "undefined") {
    return DEFAULT_PRICING_COUNTRY_ID;
  }

  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored && isPricingCountryId(stored)) {
    return stored;
  }

  return detectDefaultPricingCountryId();
}

type PricingCountryContextValue = CountryPricingView & {
  countryId: PricingCountryId;
  setCountryId: (countryId: PricingCountryId) => void;
};

const PricingCountryContext = createContext<PricingCountryContextValue | null>(null);

export function PricingCountryProvider({ children }: { children: ReactNode }) {
  const [countryId, setCountryIdState] = useState<PricingCountryId>(DEFAULT_PRICING_COUNTRY_ID);

  useEffect(() => {
    setCountryIdState(readStoredCountryId());

    const handleStorage = (event: StorageEvent) => {
      if (event.key !== STORAGE_KEY || !event.newValue || !isPricingCountryId(event.newValue)) {
        return;
      }
      setCountryIdState(event.newValue);
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const setCountryId = useCallback((nextCountryId: PricingCountryId) => {
    setCountryIdState(nextCountryId);
    window.localStorage.setItem(STORAGE_KEY, nextCountryId);
  }, []);

  const pricingView = useMemo(() => buildCountryPricingView(countryId), [countryId]);

  const value = useMemo(
    () => ({
      countryId,
      ...pricingView,
      setCountryId,
    }),
    [countryId, pricingView, setCountryId],
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
