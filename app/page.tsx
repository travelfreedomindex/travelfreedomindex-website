import { getTopCountriesServer, getAllRankingsServer } from '@/lib/data-server';
import { HomeClient } from '@/components/HomeClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Travel Freedom Index (TFI) - Measuring Global Passport Power Through Diplomatic Reciprocity',
  description: 'Discover passport rankings based on visa-free travel and diplomatic reciprocity. Compare 201 passports across 200 destinations using our Travel Freedom Index (TFI) and Reciprocity-Adjusted Travel Freedom Index (RATFI).',
  keywords: 'passport ranking, visa free travel, passport power, diplomatic reciprocity, travel freedom index, global mobility, TFI, RATFI',
  openGraph: {
    title: 'Travel Freedom Index - Measuring True Passport Power',
    description: 'Discover which passports truly excel at diplomatic reciprocity, not just visa-free access.',
    type: 'website',
  },
};

export default async function HomePage() {
  const topPRI = await getTopCountriesServer(10, 'pri');
  const topLevel1 = await getTopCountriesServer(10, 'level1');
  const allCountries = await getAllRankingsServer();

  return <HomeClient topPRI={topPRI} topLevel1={topLevel1} allCountries={allCountries} />;
}
