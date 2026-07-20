'use client';

import AlternativeComparisonContent from '@/components/alternatives/AlternativeComparisonContent';
import { polyAiAlternativePageData } from '@/data/best-poly-ai-alternative-data';

export default function PolyAIAlternativeContent() {
  return <AlternativeComparisonContent data={polyAiAlternativePageData} />;
}
