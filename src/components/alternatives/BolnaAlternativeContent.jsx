'use client';

import AlternativeComparisonContent from '@/components/alternatives/AlternativeComparisonContent';
import { bolnaAlternativePageData } from '@/data/best-bolna-alternative-data';

export default function BolnaAlternativeContent() {
  return <AlternativeComparisonContent data={bolnaAlternativePageData} />;
}
