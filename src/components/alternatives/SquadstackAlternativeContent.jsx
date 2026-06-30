'use client';

import AlternativeComparisonContent from '@/components/alternatives/AlternativeComparisonContent';
import { squadstackAlternativePageData } from '@/data/best-squadstack-alternative-data';

export default function SquadstackAlternativeContent() {
  return <AlternativeComparisonContent data={squadstackAlternativePageData} />;
}
