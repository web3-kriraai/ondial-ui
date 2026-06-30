'use client';

import AlternativeComparisonContent from '@/components/alternatives/AlternativeComparisonContent';
import { ringgAlternativePageData } from '@/data/best-ringg-ai-alternative-data';

export default function RinggAIAlternativeContent() {
  return <AlternativeComparisonContent data={ringgAlternativePageData} />;
}
