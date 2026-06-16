export type MissionIndustryId = "health" | "retail" | "enterprise" | "more-industries";

export type MissionIndustry = {
  id: MissionIndustryId;
  label: string;
};

export type MissionCustomerId = "c1" | "c2" | "c3" | "c4";

export type MissionCustomer = {
  id: MissionCustomerId;
  initials: string;
};

export type MissionCommitmentId =
  | "effortless"
  | "connect"
  | "matters"
  | "barriers"
  | "experiences";

export type MissionCommitment = {
  id: MissionCommitmentId;
  label: string;
};

export const ABOUT_MISSION_HEADING = {
  eyebrow: "Our Mission",
  titleLineOne: "Connecting Every Conversation",
  titleLineTwo: "That Matters",
} as const;

export const ABOUT_MISSION_CUSTOMERS: readonly MissionCustomer[] = [
  { id: "c1", initials: "AK" },
  { id: "c2", initials: "JR" },
  { id: "c3", initials: "MS" },
  { id: "c4", initials: "DL" },
] as const;

export const ABOUT_MISSION_INDUSTRIES: readonly MissionIndustry[] = [
  { id: "health", label: "Health" },
  { id: "retail", label: "Retail" },
  { id: "enterprise", label: "Enterprise" },
  { id: "more-industries", label: "More Industries" },
] as const;

export const ABOUT_MISSION_COMMITMENTS: readonly MissionCommitment[] = [
  { id: "effortless", label: "Making Customer Communication Effortless" },
  { id: "connect", label: "Helping Businesses Connect Better" },
  { id: "matters", label: "Ensuring Every Conversation Matters" },
  { id: "barriers", label: "Removing Communication Barriers" },
  { id: "experiences", label: "Creating Meaningful Experiences at Scale" },
] as const;
