export type TrustedBrand = {
  id: string;
  name: string;
  /** When set, renders `/public` asset instead of the built-in wordmark. */
  logoSrc?: string;
};

/** Swap entries or add `logoSrc` when real customer logos are available. */
export const TRUSTED_BRANDS: readonly TrustedBrand[] = [
  { id: "northwind", name: "Northwind" },
  { id: "fleetline", name: "Fleetline" },
  { id: "pulse", name: "Pulse Health" },
  { id: "arcline", name: "Arcline" },
  { id: "harbor", name: "Harbor Labs" },
  { id: "vertex", name: "Vertex" },
  { id: "scalepath", name: "Scalepath" },
  { id: "relay", name: "Relay" },
] as const;

export const TRUSTED_TEAMS_COUNT = "3,000+";
