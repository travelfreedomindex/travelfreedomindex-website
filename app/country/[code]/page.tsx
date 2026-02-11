import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getCountryByCodeServer, getAllRankingsServer } from '@/lib/data-server';
import { getFlagEmoji } from '@/lib/data';
import { ReciprocitySection } from '@/components/ReciprocitySection';
import type { Metadata } from 'next';

interface CountryPageProps {
  params: Promise<{ code: string }>;
}

export async function generateMetadata({ params }: CountryPageProps): Promise<Metadata> {
  const { code } = await params;
  const country = await getCountryByCodeServer(code);
  
  if (!country) {
    return {
      title: 'Country Not Found',
    };
  }

  return {
    title: `${country.country} Passport Ranking - Travel Freedom Index`,
    description: `${country.country} passport ranks #${country.pri_rank} in the Reciprocity-Adjusted Travel Freedom Index with a TFI score of ${country.level1_score}. Explore diplomatic reciprocity and global mobility.`,
    openGraph: {
      title: `${country.country} Passport Ranking`,
      description: `RATFI Rank: #${country.pri_rank} | TFI Score: ${country.level1_score}`,
    },
  };
}

export async function generateStaticParams() {
  const rankings = await getAllRankingsServer();
  return rankings.map((country) => ({
    code: country.country_code.toLowerCase(),
  }));
}

export default async function CountryPage({ params }: CountryPageProps) {
  const { code } = await params;
  const country = await getCountryByCodeServer(code);

  if (!country) {
    notFound();
  }

  // Pre-calculate values to ensure consistent SSR/client rendering
  const priScore = Number(country.pri_score.toFixed(2));
  const level1Score = Number(country.level1_score.toFixed(2));
  const rankDifference = country.level1_rank - country.pri_rank;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb Navigation */}
        <nav className="mb-6 text-sm">
          <ol className="flex items-center space-x-2 text-gray-600">
            <li><Link href="/" className="hover:text-blue-600 transition-colors">Home</Link></li>
            <li><span className="text-gray-400">/</span></li>
            <li><Link href="/rankings" className="hover:text-blue-600 transition-colors">Rankings</Link></li>
            <li><span className="text-gray-400">/</span></li>
            <li className="text-gray-900 font-medium">{country.country}</li>
          </ol>
        </nav>

        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
            <div className="flex items-center gap-4">
              <span className="text-7xl">{getFlagEmoji(country.country_code)}</span>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                  {country.country}
                </h1>
                <p className="text-lg text-gray-500">Passport Power Analysis</p>
              </div>
            </div>
            
            {/* Quick Action Buttons */}
            <div className="flex gap-3">
              <Link
                href="/rankings"
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
              >
                ← All Rankings
              </Link>
              <Link
                href="/methodology"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                Learn More
              </Link>
            </div>
          </div>

          {/* At-a-Glance Summary */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-5 rounded-xl border border-blue-200">
              <div className="text-xs font-semibold text-blue-700 mb-1 uppercase tracking-wide">RATFI Rank</div>
              <div className="text-4xl font-bold text-blue-600 mb-1">
                #{country.pri_rank}
              </div>
              <div className="text-xs text-blue-600">
                Score: {priScore}
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 p-5 rounded-xl border border-green-200">
              <div className="text-xs font-semibold text-green-700 mb-1 uppercase tracking-wide">TFI Rank</div>
              <div className="text-4xl font-bold text-green-600 mb-1">
                #{country.level1_rank}
              </div>
              <div className="text-xs text-green-600">
                Score: {level1Score}
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-5 rounded-xl border border-purple-200">
              <div className="text-xs font-semibold text-purple-700 mb-1 uppercase tracking-wide">Network Effect</div>
              <div className="text-4xl font-bold">
                {rankDifference > 0 && (
                  <span className="text-green-600">↑ {rankDifference}</span>
                )}
                {rankDifference < 0 && (
                  <span className="text-red-600">↓ {Math.abs(rankDifference)}</span>
                )}
                {rankDifference === 0 && (
                  <span className="text-purple-600">—</span>
                )}
              </div>
              <div className="text-xs text-purple-600 mt-1">
                {rankDifference > 0 && 'Higher value'}
                {rankDifference < 0 && 'Lower value'}
                {rankDifference === 0 && 'Equal value'}
              </div>
            </div>

            {country.reciprocity_details && (
              <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-5 rounded-xl border border-amber-200">
                <div className="text-xs font-semibold text-amber-700 mb-1 uppercase tracking-wide">Reciprocal</div>
                <div className="text-4xl font-bold text-amber-600 mb-1">
                  {country.reciprocity_details.counts.reciprocal}
                </div>
                <div className="text-xs text-amber-600">
                  Mutual agreements
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Diplomatic Relationship Breakdown */}
        {country.reciprocity_details && (
          <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-xl">🌐</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                Diplomatic Relationship Breakdown
              </h2>
            </div>
            <ReciprocitySection 
              reciprocityDetails={country.reciprocity_details}
              countryCode={country.country_code}
            />
          </div>
        )}

        {/* Score Calculation Proofs */}
        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          {/* TFI Score Calculation */}
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-green-200 rounded-lg flex items-center justify-center">
                <span className="text-xl">🧮</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                TFI Score Calculation
              </h2>
            </div>
            <div className="space-y-4">
              <p className="text-sm text-gray-700 mb-4">
                Travel Freedom Index (TFI) uses weighted multipliers based on entry requirement types:
              </p>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center bg-white p-3 rounded-lg">
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">Visa-Free</div>
                    <div className="text-xs text-gray-600">{country.visa_free || 0} countries × 1.0</div>
                  </div>
                  <div className="text-xl font-bold text-green-700">
                    {((country.visa_free || 0) * 1.0).toFixed(1)}
                  </div>
                </div>
                
                <div className="flex justify-between items-center bg-white p-3 rounded-lg">
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">Visa on Arrival</div>
                    <div className="text-xs text-gray-600">{country.visa_on_arrival || 0} countries × 0.8</div>
                  </div>
                  <div className="text-xl font-bold text-green-700">
                    {((country.visa_on_arrival || 0) * 0.8).toFixed(1)}
                  </div>
                </div>
                
                <div className="flex justify-between items-center bg-white p-3 rounded-lg">
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">eTA Required</div>
                    <div className="text-xs text-gray-600">{country.eta_required || 0} countries × 0.7</div>
                  </div>
                  <div className="text-xl font-bold text-green-700">
                    {((country.eta_required || 0) * 0.7).toFixed(1)}
                  </div>
                </div>
                
                <div className="flex justify-between items-center bg-gray-100 p-3 rounded-lg opacity-60">
                  <div className="flex-1">
                    <div className="font-semibold text-gray-700">Visa Required</div>
                    <div className="text-xs text-gray-600">{country.visa_required || 0} countries × 0.0</div>
                  </div>
                  <div className="text-xl font-bold text-gray-500">
                    0.0
                  </div>
                </div>
              </div>

              <div className="border-t-2 border-green-300 pt-4 mt-4">
                <div className="flex justify-between items-center">
                  <div className="font-bold text-gray-900 text-lg">Total TFI Score</div>
                  <div className="text-3xl font-bold text-green-700">
                    {level1Score}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RATFI Score Calculation */}
          {country.reciprocity_details && (
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-lg p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-blue-200 rounded-lg flex items-center justify-center">
                  <span className="text-xl">🔄</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  RATFI Score Calculation
                </h2>
              </div>
              <div className="space-y-4">
                <p className="text-sm text-gray-700 mb-4">
                  Reciprocity-Adjusted TFI (RATFI) uses PageRank algorithm with reciprocity weighting:
                </p>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center bg-white p-3 rounded-lg">
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">Reciprocal</div>
                      <div className="text-xs text-gray-600">+1.0 weight each</div>
                    </div>
                    <div className="text-xl font-bold text-green-700">
                      {country.reciprocity_details.counts.reciprocal}
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center bg-white p-3 rounded-lg">
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">Advantages</div>
                      <div className="text-xs text-gray-600">+0.3 weight each</div>
                    </div>
                    <div className="text-xl font-bold text-blue-700">
                      {country.reciprocity_details.counts.advantages}
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center bg-white p-3 rounded-lg">
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">Penalties</div>
                      <div className="text-xs text-gray-600">-0.5 weight each</div>
                    </div>
                    <div className="text-xl font-bold text-red-700">
                      {country.reciprocity_details.counts.penalties}
                    </div>
                  </div>

                  <div className="flex justify-between items-center bg-gray-100 p-3 rounded-lg opacity-60">
                    <div className="flex-1">
                      <div className="font-semibold text-gray-700">Mutual Visa</div>
                      <div className="text-xs text-gray-600">Not counted</div>
                    </div>
                    <div className="text-xl font-bold text-gray-500">
                      {country.reciprocity_details.counts.mutual_visa_required}
                    </div>
                  </div>
                </div>

                <div className="bg-blue-200 p-4 rounded-lg mt-4">
                  <p className="text-xs text-gray-700 mb-2">
                    <strong>PageRank Algorithm:</strong> Score iteratively adjusts based on network connectivity and diplomatic importance of partner countries.
                  </p>
                </div>

                <div className="border-t-2 border-blue-300 pt-4 mt-4">
                  <div className="flex justify-between items-center">
                    <div className="font-bold text-gray-900 text-lg">Final RATFI Score</div>
                    <div className="text-3xl font-bold text-blue-700">
                      {priScore}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Analysis Section */}
        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          {/* Interpretation - Takes 2 columns */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <span className="text-xl">📊</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                Reciprocity Analysis
              </h2>
            </div>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p className="text-lg">
                {country.country}'s passport ranks <strong className="text-blue-600">#{country.pri_rank}</strong> in the Reciprocity-Adjusted Travel Freedom Index (RATFI),
                {country.level1_rank > country.pri_rank 
                  ? ' performing better than its TFI ranking'
                  : country.level1_rank < country.pri_rank
                    ? ' performing below its TFI ranking'
                    : ' maintaining the same position as its TFI ranking'
                }.
              </p>
              
              {country.level1_rank > country.pri_rank && (
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-sm">
                    <strong>High Network Value:</strong> This country's visa-free relationships are with strategically important 
                    and well-connected nations, resulting in a higher RATFI score. The quality and diplomatic network effects 
                    of these relationships outweigh raw destination counts.
                  </p>
                </div>
              )}
              
              {country.level1_rank < country.pri_rank && (
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <p className="text-sm">
                    <strong>Lower Network Value:</strong> While this country may have many visa-free destinations, 
                    they tend to be with less connected nations in the global diplomatic network, resulting in a 
                    lower RATFI score compared to its TFI ranking.
                  </p>
                </div>
              )}

              <p className="text-sm text-gray-600">
                With a TFI score of <strong className="text-green-600">{level1Score}</strong>, travelers with this passport
                enjoy global mobility. The RATFI score of <strong className="text-blue-600">{priScore}</strong> reflects
                the strategic value and network connectivity of these diplomatic relationships.
              </p>
            </div>
          </div>

          {/* Key Statistics - Takes 1 column */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-xl">📈</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                Quick Stats
              </h2>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600 flex items-center gap-2">
                  <span className="text-green-500">✓</span> TFI Score
                </span>
                <span className="text-2xl font-bold text-green-600">
                  {level1Score}
                </span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600 flex items-center gap-2">
                  <span className="text-blue-500">✓</span> RATFI Score
                </span>
                <span className="text-2xl font-bold text-blue-600">
                  {priScore}
                </span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600 flex items-center gap-2">
                  <span className="text-green-500">✓</span> TFI Rank
                </span>
                <span className="text-2xl font-bold text-green-600">
                  #{country.level1_rank}
                </span>
              </div>
              <div className="flex justify-between items-center py-3">
                <span className="text-gray-600 flex items-center gap-2">
                  <span className="text-blue-500">✓</span> RATFI Rank
                </span>
                <span className="text-2xl font-bold text-blue-600">
                  #{country.pri_rank}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
