'use client';

import AlternativeComparisonContent from '@/components/alternatives/AlternativeComparisonContent';
import { koreAIAlternativePageData } from '@/data/best-kore-ai-alternative-data';

export default function KoreAIAlternativeContent() {
  return <AlternativeComparisonContent data={koreAIAlternativePageData} />;
}
