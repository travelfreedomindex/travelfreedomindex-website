'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getFlagEmoji, getRegion, COUNTRY_REGIONS } from '@/lib/data';
import type { PassportRanking, RankingView } from '@/lib/types';

export default function RankingsPage() {
  const router = useRouter();
  const [rankings, setRankings] = useState<PassportRanking[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [view, setView] = useState<RankingView>('pri');
  const [sortBy, setSortBy] = useState<'rank' | 'name'>('rank');

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch('/api/rankings');
        const data = await res.json();
        setRankings(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Failed to load rankings:', error);
        setRankings([]);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const filteredRankings = useMemo(() => {
    // Ensure we always start with an array
    if (!Array.isArray(rankings)) return [];
    
    let filtered = [...rankings];

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(r => 
        r.country.toLowerCase().includes(query) ||
        r.country_code.toLowerCase().includes(query)
      );
    }

    // Filter by region
    if (selectedRegion !== 'all') {
      const regionCodes = COUNTRY_REGIONS[selectedRegion] || [];
      filtered = filtered.filter(r => regionCodes.includes(r.country_code.toUpperCase()));
    }

    // Filter out zero ranks
    filtered = filtered.filter(r => {
      if (view === 'pri') return r.pri_rank > 0;
      if (view === 'level1') return r.level1_rank > 0;
      return r.pri_rank > 0 || r.level1_rank > 0;
    });

    // Sort
    if (sortBy === 'rank') {
      const rankKey = view === 'level1' ? 'level1_rank' : 'pri_rank';
      filtered.sort((a, b) => a[rankKey] - b[rankKey]);
    } else {
      filtered.sort((a, b) => a.country.localeCompare(b.country));
    }

    return filtered;
  }, [rankings, searchQuery, selectedRegion, view, sortBy]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <div className="text-xl text-gray-600">Loading rankings...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <span className="text-3xl">📊</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Global Passport Rankings
          </h1>
          <p className="text-lg text-gray-600">
            Compare {rankings.length} countries by visa-free access and diplomatic reciprocity
          </p>
        </div>

        {/* Controls */}
        <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg p-6 mb-6 border border-gray-200">
          {/* View Switcher */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
              <div className="flex items-center justify-center w-6 h-6 bg-purple-100 rounded-full">
                <span className="text-sm">👁️</span>
              </div>
              View Mode
            </label>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setView('level1')}
                className={`px-4 py-2 rounded-xl font-medium transition-all shadow-md ${
                  view === 'level1'
                    ? 'bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg'
                    : 'bg-gradient-to-br from-green-50 to-green-100 text-green-700 border border-green-200 hover:from-green-100 hover:to-green-200'
                }`}
              >
                🌍 TFI
              </button>
              <button
                onClick={() => setView('pri')}
                className={`px-4 py-2 rounded-xl font-medium transition-all shadow-md ${
                  view === 'pri'
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg'
                    : 'bg-gradient-to-br from-blue-50 to-blue-100 text-blue-700 border border-blue-200 hover:from-blue-100 hover:to-blue-200'
                }`}
              >
                🤝 RATFI
              </button>
              <button
                onClick={() => setView('comparison')}
                className={`px-4 py-2 rounded-xl font-medium transition-all shadow-md ${
                  view === 'comparison'
                    ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg'
                    : 'bg-gradient-to-br from-purple-50 to-purple-100 text-purple-700 border border-purple-200 hover:from-purple-100 hover:to-purple-200'
                }`}
              >
                📊 Compare Both
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="grid md:grid-cols-3 gap-4">
            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <div className="flex items-center justify-center w-5 h-5 bg-blue-100 rounded-full">
                  <span className="text-xs">🔍</span>
                </div>
                Search
              </label>
              <input
                type="text"
                placeholder="Country name or code..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
              />
            </div>

            {/* Region Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <div className="flex items-center justify-center w-5 h-5 bg-green-100 rounded-full">
                  <span className="text-xs">🌍</span>
                </div>
                Region
              </label>
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
              >
                <option value="all">All Regions</option>
                {Object.keys(COUNTRY_REGIONS).map(region => (
                  <option key={region} value={region}>{region}</option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <div className="flex items-center justify-center w-5 h-5 bg-amber-100 rounded-full">
                  <span className="text-xs">⬇️</span>
                </div>
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'rank' | 'name')}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
              >
                <option value="rank">Rank</option>
                <option value="name">Country Name</option>
              </select>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-sm text-gray-600 bg-blue-50 rounded-lg px-4 py-2 inline-block">
            Showing {filteredRankings.length} of {rankings.length} countries
          </div>
        </div>

        {/* Rankings Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-br from-gray-50 to-blue-50 border-b-2 border-blue-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rank
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Country
                  </th>
                  {view === 'level1' && (
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      TFI Score
                    </th>
                  )}
                  {view === 'pri' && (
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      RATFI Score
                    </th>
                  )}
                  {view === 'comparison' && (
                    <>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        TFI Rank
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        RATFI Rank
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Difference
                      </th>
                    </>
                  )}
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Region
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredRankings.map((country) => {
                  const rankDiff = view === 'comparison' 
                    ? country.level1_rank - country.pri_rank 
                    : 0;
                  
                  return (
                    <tr key={country.country_code} className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-transparent transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-lg font-semibold text-gray-900">
                          {view === 'level1' ? country.level1_rank : country.pri_rank}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Link 
                          href={`/country/${country.country_code.toLowerCase()}`}
                          className="flex items-center gap-3 hover:text-blue-600 transition-colors"
                        >
                          <span className="text-2xl">{getFlagEmoji(country.country_code)}</span>
                          <span className="font-medium text-gray-900">{country.country}</span>
                        </Link>
                      </td>
                      {view === 'level1' && (
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-lg font-semibold text-green-600">
                            {country.level1_score}
                          </span>
                        </td>
                      )}
                      {view === 'pri' && (
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-lg font-semibold text-blue-600">
                            {country.pri_score.toFixed(2)}
                          </span>
                        </td>
                      )}
                      {view === 'comparison' && (
                        <>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-gray-700">#{country.level1_rank}</span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-gray-700">#{country.pri_rank}</span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {rankDiff > 0 && (
                              <span className="text-green-600 font-medium">↑ {rankDiff}</span>
                            )}
                            {rankDiff < 0 && (
                              <span className="text-red-600 font-medium">↓ {Math.abs(rankDiff)}</span>
                            )}
                            {rankDiff === 0 && (
                              <span className="text-gray-400">—</span>
                            )}
                          </td>
                        </>
                      )}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-600">
                          {getRegion(country.country_code)}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Empty State */}
        {filteredRankings.length === 0 && (
          <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl shadow-lg p-12 text-center border border-gray-200">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <span className="text-3xl">🔍</span>
            </div>
            <p className="text-gray-500 text-lg mb-4">No countries match your filters</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedRegion('all');
              }}
              className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-colors shadow-lg"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
