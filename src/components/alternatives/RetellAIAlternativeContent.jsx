'use client';

import AlternativeComparisonContent from '@/components/alternatives/AlternativeComparisonContent';
import { retellAIAlternativePageData } from '@/data/best-retell-ai-alternative-data';

export default function RetellAIAlternativeContent() {
  return <AlternativeComparisonContent data={retellAIAlternativePageData} />;
}
