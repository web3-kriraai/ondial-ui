"use client";

import { Loader2, Phone, CheckCircle2, AlertCircle, ArrowRight, Lock } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState, type FormEvent } from "react";

import { TextReveal } from "@/components/ui/text-reveal";
import { Input } from "@/components/ui/input";
import CountryPicker, {
  COUNTRIES,
  getConfig,
  type Country,
} from "@/components/ui/country-picker";
import { SearchableSelect } from "@/components/ui/searchable-select";
import { marketingEyebrowClass } from "@/config/marketing-layout";
import { getLanguageDisplayLabel } from "@/lib/languages-data";
import { cn } from "@/lib/utils";

import styles from "./free-trial-call-section.module.css";

type AccessMode = "free_trial" | "signup_required";

type FreeTrialOptions = {
  enabled: boolean;
  countries: string[];
  countryAccess?: Record<string, AccessMode>;
  languageAccess?: Record<string, Record<string, AccessMode>>;
  languagesByCountry: Record<string, string[]>;
  defaultVoices?: Record<string, string>;
  rateLimit?: { perIp: number; windowSec: number };
};

const countryTriggerClass =
  "cursor-pointer flex h-[2.85rem] shrink-0 items-center gap-1.5 rounded-l-full border-0 border-r border-black/10 bg-transparent pl-3.5 pr-2.5 text-sm font-semibold text-foreground focus:outline-none focus-visible:bg-black/[0.03]";

function iso2ToCountryIso(iso2: string): string {
  return String(iso2 || "").trim().toUpperCase();
}

function getCountryAccess(
  options: FreeTrialOptions | null,
  countryIso: string,
): AccessMode {
  const access = options?.countryAccess?.[countryIso];
  if (access === "signup_required" || access === "free_trial") return access;
  return "free_trial";
}

function getLanguageAccess(
  options: FreeTrialOptions | null,
  countryIso: string,
  language: string,
): AccessMode {
  const access = options?.languageAccess?.[countryIso]?.[language];
  if (access === "signup_required" || access === "free_trial") return access;
  return "free_trial";
}

function pickDefaultCountry(
  countries: string[],
  countryAccess?: Record<string, AccessMode>,
): string {
  const list = (countries || []).map((c) => String(c || "").toUpperCase()).filter(Boolean);
  const freeTrial = list.filter((c) => countryAccess?.[c] !== "signup_required");
  if (freeTrial.includes("IN")) return "IN";
  if (freeTrial[0]) return freeTrial[0];
  if (list.includes("IN")) return "IN";
  return list[0] || "IN";
}

function pickDefaultLanguage(
  countryIso: string,
  languages: string[],
  languageAccess?: Record<string, AccessMode>,
): string {
  const langs = languages || [];
  const freeTrial = langs.filter((l) => languageAccess?.[l] !== "signup_required");
  const prefer = freeTrial.length ? freeTrial : langs;
  if (countryIso === "IN") {
    if (prefer.includes("hi-IN")) return "hi-IN";
    if (prefer.includes("hi")) return "hi";
  }
  return prefer[0] || "";
}

function normalizeNationalDigits(
  raw: string,
  dialCode: string,
  max: number,
): string {
  let digits = raw.replace(/\D/g, "");
  const prefix = dialCode.replace("+", "");
  if (digits.startsWith(prefix) && digits.length > max) {
    digits = digits.slice(prefix.length);
  }
  if (digits.startsWith("0") && digits.length > max) {
    digits = digits.slice(1);
  }
  return digits;
}

function validatePhone(
  raw: string,
  dialCode: string,
  iso2: string,
): { ok: true; digits: string } | { ok: false; message: string } {
  const trimmed = raw.trim();
  if (!trimmed) {
    return { ok: false, message: "Phone number is required." };
  }

  const cfg = getConfig(dialCode, iso2.toLowerCase());
  const digits = normalizeNationalDigits(trimmed, dialCode, cfg.max);

  if (digits.length < cfg.min) {
    return {
      ok: false,
      message: `${cfg.name} numbers need at least ${cfg.min} digits.`,
    };
  }
  if (digits.length > cfg.max) {
    return {
      ok: false,
      message: `${cfg.name} numbers can have at most ${cfg.max} digits.`,
    };
  }

  if (dialCode === "+91" || iso2.toUpperCase() === "IN") {
    if (!/^[6-9]\d{9}$/.test(digits)) {
      return {
        ok: false,
        message: "Enter a valid 10-digit Indian mobile number (starts with 6–9).",
      };
    }
  } else if (
    dialCode === "+1" ||
    iso2.toUpperCase() === "US" ||
    iso2.toUpperCase() === "CA"
  ) {
    // NANP: area code + exchange cannot start with 0/1
    if (!/^[2-9]\d{2}[2-9]\d{6}$/.test(digits)) {
      return {
        ok: false,
        message: `Enter a valid ${cfg.name} 10-digit number.`,
      };
    }
  }

  if (!/^\d+$/.test(digits)) {
    return { ok: false, message: "Phone number can only include digits." };
  }

  return { ok: true, digits };
}

export function FreeTrialCallSection() {
  const [options, setOptions] = useState<FreeTrialOptions | null>(null);
  const [optionsError, setOptionsError] = useState("");
  const [loadingOptions, setLoadingOptions] = useState(true);

  const [countryDial, setCountryDial] = useState("+91");
  const [countryIso, setCountryIso] = useState("IN");
  const [language, setLanguage] = useState("hi-IN");
  const [phone, setPhone] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [languageError, setLanguageError] = useState("");
  const [phoneTouched, setPhoneTouched] = useState(false);

  const applyCountryDefaults = (
    data: FreeTrialOptions,
    preferredIso?: string,
  ) => {
    const iso = pickDefaultCountry(
      preferredIso && data.countries.includes(preferredIso)
        ? [preferredIso, ...data.countries]
        : data.countries,
      data.countryAccess,
    );
    setCountryIso(iso);
    const match = COUNTRIES.find((c) => iso2ToCountryIso(c.iso2) === iso);
    if (match) setCountryDial(match.code);
    const langs = data.languagesByCountry?.[iso] || [];
    setLanguage(
      pickDefaultLanguage(iso, langs, data.languageAccess?.[iso]),
    );
  };

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/demo/free-trial-call", { cache: "no-store" });
        const json = await res.json();
        if (cancelled) return;
        if (!res.ok || !json?.success) {
          setOptionsError(json?.error || "Free trial call is unavailable.");
          setOptions(null);
          return;
        }
        const data = json.data as FreeTrialOptions;
        setOptions(data);
        applyCountryDefaults(data, "IN");
      } catch {
        if (!cancelled) {
          setOptionsError("Could not load free trial call options.");
        }
      } finally {
        if (!cancelled) setLoadingOptions(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // Auto-dismiss success/error toast messages after ~6s
  useEffect(() => {
    if (!success && !error) return undefined;
    const timer = window.setTimeout(() => {
      setSuccess("");
      setError("");
    }, 6000);
    return () => window.clearTimeout(timer);
  }, [success, error]);

  const allowedIso2 = useMemo(
    () => (options?.countries || []).map((c) => c.toLowerCase()),
    [options?.countries],
  );

  const countryAccess = getCountryAccess(options, countryIso);
  const countryNeedsSignup = countryAccess === "signup_required";
  const languageNeedsSignup =
    !countryNeedsSignup &&
    Boolean(language) &&
    getLanguageAccess(options, countryIso, language) === "signup_required";

  const languages = useMemo(() => {
    if (!options || countryNeedsSignup) return [];
    return options.languagesByCountry?.[countryIso] || [];
  }, [options, countryIso, countryNeedsSignup]);

  const languageOptions = useMemo(
    () =>
      languages.map((code) => ({
        value: code,
        label: getLanguageDisplayLabel(code),
        searchText: code,
      })),
    [languages],
  );

  const phoneCfg = useMemo(
    () => getConfig(countryDial, countryIso.toLowerCase()),
    [countryDial, countryIso],
  );

  const selectedCountryName = useMemo(() => {
    const match = COUNTRIES.find((c) => iso2ToCountryIso(c.iso2) === countryIso);
    return match?.name || countryIso;
  }, [countryIso]);

  const onCountryChange = (code: string, country?: Country) => {
    setCountryDial(code);
    const iso = iso2ToCountryIso(country?.iso2 || getConfig(code).iso2);
    if (options && !options.countries.includes(iso)) {
      setError(`This country is not available.`);
      return;
    }
    setCountryIso(iso);
    const langs = options?.languagesByCountry?.[iso] || [];
    setLanguage(
      pickDefaultLanguage(iso, langs, options?.languageAccess?.[iso]),
    );
    setError("");
    setPhoneError("");
    setLanguageError("");
    setSuccess("");
  };

  const onPhoneChange = (value: string) => {
    const sanitized = value.replace(/[^\d\s\-()]/g, "");
    setPhone(sanitized);
    setSuccess("");
    if (phoneTouched || phoneError) {
      const result = validatePhone(sanitized, countryDial, countryIso);
      setPhoneError(result.ok ? "" : result.message);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSuccess("");
    setPhoneTouched(true);

    if (!options?.enabled) {
      setError("Free trial calls are currently disabled.");
      return;
    }

    if (getCountryAccess(options, countryIso) === "signup_required") {
      setError("This country is used with sign up. Please create an account to continue.");
      return;
    }

    if (getLanguageAccess(options, countryIso, language) === "signup_required") {
      setError("This language is used with sign up. Please create an account to continue.");
      return;
    }

    const phoneResult = validatePhone(phone, countryDial, countryIso);
    if (!phoneResult.ok) {
      setPhoneError(phoneResult.message);
      return;
    }
    setPhoneError("");

    if (!language) {
      setLanguageError("Please select a language.");
      return;
    }
    if (!languages.includes(language)) {
      setLanguageError("Please select a language available for this country.");
      return;
    }
    setLanguageError("");

    if (!options.countries.includes(countryIso)) {
      setError(
        `Free trial calls are not configured for ${countryIso}. Try a supported country.`,
      );
      return;
    }

    const toNumber = `${countryDial}${phoneResult.digits}`;
    setSubmitting(true);
    try {
      const res = await fetch("/api/demo/free-trial-call", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          toNumber,
          country: countryIso,
          language,
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json?.success) {
        setError(
          json?.error ||
            (res.status === 429
              ? "Daily free trial limit reached. Try again tomorrow."
              : "Could not start the call. Please try again."),
        );
        return;
      }
      setSuccess(
        json.message ||
          "Call started — answer your phone to hear the OnDial AI agent.",
      );
      setPhone("");
      setPhoneTouched(false);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loadingOptions) {
    return (
      <section className={styles.section} aria-busy="true" aria-label="Loading free trial call">
        <div className={styles.loading}>
          <Loader2 className="size-7 animate-spin" />
        </div>
      </section>
    );
  }

  if (optionsError || !options?.enabled || !options.countries?.length) {
    return null;
  }

  return (
    <section
      id="free-trial-call"
      className={styles.section}
      aria-labelledby="free-trial-call-heading"
    >
      <div className={styles.content}>
        <div className={styles.header}>
          <p className={cn(marketingEyebrowClass, styles.eyebrow)}>Try it live</p>
          <TextReveal
            as="h2"
            id="free-trial-call-heading"
            className={styles.title}
          >
            Get a free trial call on your phone
          </TextReveal>
          <p className={styles.description}>
            Pick a language - we&apos;ll call you with an OnDial AI agent.
            Limited to a few tries per day.
          </p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form} noValidate>
          <div className={styles.field}>
            <label htmlFor="ftc-phone" className={styles.label}>
              Your phone number
            </label>
            <div
              className={cn(
                styles.phoneShell,
                phoneError && !countryNeedsSignup && styles.phoneShellInvalid,
              )}
            >
              <CountryPicker
                value={countryDial}
                iso2={countryIso.toLowerCase()}
                allowedIso2={allowedIso2}
                onChange={onCountryChange}
                buttonClassName={countryTriggerClass}
                dropdownClassName="rounded-2xl"
              />
              <Input
                id="ftc-phone"
                type="tel"
                inputMode="numeric"
                autoComplete="tel-national"
                placeholder={`Mobile number (${phoneCfg.min}${phoneCfg.min === phoneCfg.max ? "" : `–${phoneCfg.max}`} digits)`}
                value={phone}
                maxLength={phoneCfg.max + 4}
                aria-invalid={Boolean(phoneError) && !countryNeedsSignup}
                aria-describedby={
                  phoneError && !countryNeedsSignup ? "ftc-phone-error" : undefined
                }
                onChange={(e) => onPhoneChange(e.target.value)}
                onBlur={() => {
                  if (countryNeedsSignup) return;
                  setPhoneTouched(true);
                  const result = validatePhone(phone, countryDial, countryIso);
                  setPhoneError(result.ok ? "" : result.message);
                }}
                className={styles.phoneInput}
                required={!countryNeedsSignup && !languageNeedsSignup}
                disabled={countryNeedsSignup}
              />
            </div>
            {!countryNeedsSignup && phoneError ? (
              <p id="ftc-phone-error" role="alert" className={styles.fieldError}>
                {phoneError}
              </p>
            ) : null}
          </div>

          {countryNeedsSignup ? (
            <div className={styles.signupGate} role="status">
              <p className={styles.signupGateBadge}>Used for sign up</p>
              <h3 className={styles.signupGateTitle}>
                {selectedCountryName} is available with an OnDial account
              </h3>
              <p className={styles.signupGateText}>
                Free trial dialing is limited to selected countries. For{" "}
                {selectedCountryName}, create a free account to set up AI voice
                agents and start calling.
              </p>
              <Link href="/signup" prefetch className={styles.signupGateCta}>
                <Lock className="size-4" />
                Sign up to continue
                <ArrowRight className="size-4" />
              </Link>
              <p className={styles.signupGateHint}>
                Or switch the country above to one with free trial enabled.
              </p>
            </div>
          ) : (
            <>
              <div className={styles.field}>
                <label htmlFor="ftc-language" className={styles.label}>
                  Language
                </label>
                <SearchableSelect
                  id="ftc-language"
                  value={language}
                  options={languageOptions}
                  onChange={(value) => {
                    setLanguage(value);
                    setLanguageError("");
                    setError("");
                    setSuccess("");
                  }}
                  placeholder="Select language"
                  searchPlaceholder="Search language…"
                  emptyText="No languages found"
                  aria-label="Language"
                  disabled={!languageOptions.length}
                  triggerClassName="h-[2.85rem] rounded-full bg-white focus-visible:border-[rgb(83_74_183/0.4)] focus-visible:shadow-[0_0_0_3px_rgb(83_74_183/0.12)]"
                />
                {languageError ? (
                  <p role="alert" className={styles.fieldError}>
                    {languageError}
                  </p>
                ) : null}
              </div>

              {languageNeedsSignup ? (
                <div className={styles.signupGate} role="status">
                  <p className={styles.signupGateBadge}>Used for sign up</p>
                  <h3 className={styles.signupGateTitle}>
                    {getLanguageDisplayLabel(language)} is available with an
                    OnDial account
                  </h3>
                  <p className={styles.signupGateText}>
                    Free trial dialing is limited to selected languages. For{" "}
                    {getLanguageDisplayLabel(language)}, create a free account
                    to set up AI voice agents and start calling.
                  </p>
                  <Link href="/signup" prefetch className={styles.signupGateCta}>
                    <Lock className="size-4" />
                    Sign up to continue
                    <ArrowRight className="size-4" />
                  </Link>
                  <p className={styles.signupGateHint}>
                    Or switch the language above to one with free trial enabled.
                  </p>
                </div>
              ) : (
                <>
                  {error ? (
                    <p role="alert" className={cn(styles.alert, styles.alertError)}>
                      <AlertCircle className="mt-0.5 size-4 shrink-0" />
                      <span>{error}</span>
                    </p>
                  ) : null}

                  {success ? (
                    <p
                      role="status"
                      className={cn(styles.alert, styles.alertSuccess)}
                    >
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0" />
                      <span>{success}</span>
                    </p>
                  ) : null}

                  <button
                    type="submit"
                    disabled={submitting || !languages.length}
                    className={styles.submit}
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="size-4 animate-spin" />
                        Calling…
                      </>
                    ) : (
                      <>
                        <Phone className="size-4" />
                        Call me now
                      </>
                    )}
                  </button>

                  {options.rateLimit?.perIp ? (
                    <p className={styles.footnote}>
                      Up to {options.rateLimit.perIp} free trial calls per day
                      from your network.
                    </p>
                  ) : null}
                </>
              )}
            </>
          )}
        </form>
      </div>
    </section>
  );
}
