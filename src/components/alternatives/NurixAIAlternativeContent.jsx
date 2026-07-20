'use client';

import AlternativeComparisonContent from '@/components/alternatives/AlternativeComparisonContent';
import { nurixAIAlternativePageData } from '@/data/best-nurix-ai-alternative-data';

export default function NurixAIAlternativeContent() {
  return <AlternativeComparisonContent data={nurixAIAlternativePageData} />;
}
