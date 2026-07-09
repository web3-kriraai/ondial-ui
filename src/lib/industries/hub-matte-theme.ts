import { SERVICES_INDUSTRIES } from "@/data/services-content";

export type HubMattePaletteEntry = {
  iconBg: string;
  iconColor: string;
};

export type HubMatteTheme = HubMattePaletteEntry & {
  iconKey: string;
};

/** Matte accent palette used across marketing hub cards. */
export const HUB_MATTE_PALETTE = [
  { iconBg: "#FCEBEB", iconColor: "#A32D2D" },
  { iconBg: "#E6F1FB", iconColor: "#0C447C" },
  { iconBg: "#EEEDFE", iconColor: "#534AB7" },
  { iconBg: "#E1F5EE", iconColor: "#085041" },
  { iconBg: "#FAEEDA", iconColor: "#633806" },
] as const satisfies readonly HubMattePaletteEntry[];

export function getMatteThemeByIndex(index: number, iconKey: string): HubMatteTheme {
  const palette = HUB_MATTE_PALETTE[index % HUB_MATTE_PALETTE.length];
  return { iconKey, ...palette };
}

export function getMatteThemeByHref(href: string, iconKey: string): HubMatteTheme {
  const match = SERVICES_INDUSTRIES.find((industry) => industry.href === href);
  if (match) {
    return {
      iconKey: match.iconKey,
      iconBg: match.iconBg,
      iconColor: match.iconColor,
    };
  }
  return getMatteThemeByIndex(0, iconKey);
}
