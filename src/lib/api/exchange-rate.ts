export const DEFAULT_USD_TO_INR = 91.57;

type ExchangeRateResponse = {
  success?: boolean;
  rate?: number;
  error?: string;
};

/**
 * Live USD→INR rate via same-origin proxy (`/api/utils/exchange-rate`).
 * Falls back to {@link DEFAULT_USD_TO_INR} when the upstream call fails.
 */
export async function fetchUsdToInrRate(): Promise<number> {
  try {
    const response = await fetch("/api/utils/exchange-rate", {
      method: "GET",
      headers: { Accept: "application/json" },
    });
    const data = (await response.json().catch(() => null)) as ExchangeRateResponse | null;
    const rate = typeof data?.rate === "number" ? data.rate : Number(data?.rate);
    if (Number.isFinite(rate) && rate > 0) {
      return rate;
    }
  } catch {
    /* fall through */
  }
  return DEFAULT_USD_TO_INR;
}

export function usdToInr(amountUsd: number, rate: number, fractionDigits = 2): number {
  if (!Number.isFinite(amountUsd) || !Number.isFinite(rate) || rate <= 0) {
    return amountUsd;
  }
  const converted = amountUsd * rate;
  const factor = 10 ** fractionDigits;
  return Math.round(converted * factor) / factor;
}

/** Whole rupees for monthly / one-off INR display. */
export function usdToInrWhole(amountUsd: number, rate: number): number {
  if (!Number.isFinite(amountUsd) || !Number.isFinite(rate) || rate <= 0) {
    return Math.round(amountUsd);
  }
  return Math.round(amountUsd * rate);
}
