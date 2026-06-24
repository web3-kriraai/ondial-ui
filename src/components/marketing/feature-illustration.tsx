import { AnalyticsFlowIllustration } from "@/components/marketing/analytics-flow-illustration";
import { IntegrationsFlowIllustration } from "@/components/marketing/integrations-flow-illustration";
import { LeadQualificationIllustration } from "@/components/marketing/lead-qualification-illustration";
import { LiveCallsIllustration } from "@/components/marketing/live-calls-illustration";
import { MultilingualFlowIllustration } from "@/components/marketing/multilingual-flow-illustration";
import { SchedulingIllustration } from "@/components/marketing/scheduling-illustration";
import type { FeatureIllustrationId } from "@/data/home-features-content";

import styles from "./home-features-section.module.css";

type FeatureIllustrationProps = {
  id: FeatureIllustrationId;
  wide?: boolean;
};

export function FeatureIllustration({ id, wide = false }: FeatureIllustrationProps) {
  const className = wide ? styles.illusSvgWide : styles.illusSvg;

  switch (id) {
    case "live-calls":
      return <LiveCallsIllustration className={className} />;
    case "scheduling":
      return <SchedulingIllustration className={className} />;
    case "multilingual":
      return <MultilingualFlowIllustration className={className} />;
    case "lead-qualification":
      return <LeadQualificationIllustration className={className} />;
    case "analytics":
      return <AnalyticsFlowIllustration className={className} />;
    case "integrations":
      return <IntegrationsFlowIllustration className={className} />;
    default:
      return null;
  }
}
