export const COMPLIANCE_HEADING = {
  eyebrow: "Compliance & security",
  titleLead: "Enterprise-grade security for",
  titleAccent: "AI voice agents",
  description:
    "Protect every AI-powered conversation with enterprise-grade security, privacy, and compliance. OnDial meets global standards including HIPAA, GDPR, PCI DSS, SOC 2, and ISO 27001, helping businesses deploy AI voice agents with confidence.",
  footnote:
    "AI-specific controls for voice transcripts, call recordings, and agent workflows - so regulated teams can deploy with confidence.",
  cta: {
    label: "Book a demo",
    href: "/contact",
  },
} as const;

export type ComplianceBadgeId = "hipaa" | "gdpr" | "pci-dss" | "soc-2" | "iso-security";

export type ComplianceBadge = {
  id: ComplianceBadgeId;
  icon: string;
  label: string;
  detail: string;
};

export const COMPLIANCE_BADGES: readonly ComplianceBadge[] = [
  {
    id: "hipaa",
    label: "HIPAA",
    icon: "/home/ComplianceAndsecurity/hipaa.png",
    detail: "Protected health information on every call",
  },
  {
    id: "gdpr",
    label: "GDPR",
    icon: "/home/ComplianceAndsecurity/gdpr.png",
    detail: "Privacy-by-design for EU data subjects",
  },
  {
    id: "pci-dss",
    label: "PCI DSS",
    icon: "/home/ComplianceAndsecurity/pci-dss.png",
    detail: "Secure handling of payment conversations",
  },
  {
    id: "soc-2",
    label: "SOC 2",
    icon: "/home/ComplianceAndsecurity/soc-new.png",
    detail: "Audited security, availability & confidentiality",
  },
  {
    id: "iso-security",
    label: "ISO Compliance & Security",
    icon: "/home/ComplianceAndsecurity/iso-new.png",
    detail: "Iso certified security and compliance",
  },
] as const;
