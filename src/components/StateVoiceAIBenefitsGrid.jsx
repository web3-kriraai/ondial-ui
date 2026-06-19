import KeyBenefits from '@/components/BenefitsService';

const ICON_CYCLE = ['CheckCircle', 'Zap', 'TrendingUp', 'PhoneCall', 'Award'];

/**
 * Maps simple string benefit lines to the KeyBenefits card grid (same UI as language pages).
 */
export default function StateVoiceAIBenefitsGrid({ title, items = [] }) {
  if (!items?.length) return null;

  const benefits = items.map((text, i) => ({
    icon: ICON_CYCLE[i % ICON_CYCLE.length],
    title: text,
    description: '',
  }));

  return <KeyBenefits title={title} description="" benefits={benefits} />;
}
