"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { AnimatedStat, AnimatedFeatureCard } from './AnimatedComponents';
import { getFlagEmoji } from '@/lib/data';
import type { PassportRanking } from '@/lib/types';

const InteractiveWorldMap = dynamic(() => import('./InteractiveWorldMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[600px] flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600">Loading interactive map...</p>
      </div>
    </div>
  ),
});

interface HomeClientProps {
  topPRI: PassportRanking[];
  topLevel1: PassportRanking[];
  allCountries: PassportRanking[];
}

export function HomeClient({ topPRI, topLevel1, allCountries }: HomeClientProps) {
  // Calculate dynamic statistics from actual data
  const totalPassports = 207; // Total passports analyzed
  const totalCountries = 201; // Total destination countries
  const totalRelationships = totalPassports * totalCountries; // 207 × 201 = 41,607

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 transition-colors duration-300">
      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-3 pb-0 mb-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-0"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full mb-4">
            <span className="text-3xl">🌍</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-1">
            Travel Freedom Index
          </h1>
          <p className="text-sm md:text-base text-slate-600 mb-1">
            Measuring <span className="font-semibold text-indigo-600">True Passport Power</span> Through Diplomatic Reciprocity
          </p>
          <p className="text-xs text-slate-500 mb-6">
            Click on country flags to explore rankings
          </p>
        </motion.div>
      </section>

      {/* Full Width Interactive World Map */}
      <section className="w-full">
        <InteractiveWorldMap data={allCountries} viewMode="tfi" />
      </section>

      {/* CTA Buttons */}
      <section className="container mx-auto px-4 mb-16 mt-12">
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <Link 
            href="/rankings"
            className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            View Full Rankings
          </Link>
          <Link 
            href="/methodology"
            className="px-8 py-4 bg-white text-indigo-600 rounded-xl font-semibold hover:bg-slate-50 transition-colors shadow-lg border-2 border-indigo-600"
          >
            Learn the Methodology
          </Link>
        </motion.div>
      </section>

      {/* Animated Stats Section */}
      <section className="bg-gradient-to-br from-white to-gray-50 py-16 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="mb-8 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mb-3">
              <span className="text-2xl">📊</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Global Coverage</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-lg p-6 border border-blue-200">
              <AnimatedStat end={totalPassports} label="Passports Analyzed" suffix="" />
            </div>
            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl shadow-lg p-6 border border-indigo-200">
              <AnimatedStat end={totalCountries} label="Countries Tracked" suffix="" />
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl shadow-lg p-6 border border-green-200">
              <AnimatedStat end={totalRelationships} label="Bilateral Relationships" suffix="" />
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl shadow-lg p-6 border border-purple-200">
              <AnimatedStat end={2} label="Ranking Methodologies" />
            </div>
          </div>
        </div>
      </section>

      {/* Top 10 Comparison */}
      <section className="container mx-auto px-4 py-16">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center justify-center w-12 h-12 bg-amber-100 rounded-full mb-3">
            <span className="text-2xl">🏆</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Top 10 Passports</h2>
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Level 1: Visa-Free */}
          <motion.div
            className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl shadow-lg p-6 border border-green-200"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-green-100 rounded-full">
                <span className="text-xl">🌍</span>
              </div>
              TFI: Travel Freedom Index
            </h3>
            <p className="text-sm text-gray-600 mb-4">Weighted score based on ease of access to destinations</p>
            <ol className="space-y-3">
              {topLevel1.map((country, idx) => (
                <motion.li
                  key={country.country_code}
                  className="flex items-center gap-3 bg-white/50 rounded-lg p-2"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05, duration: 0.3 }}
                >
                  <span className="text-gray-500 font-mono w-6">{idx + 1}.</span>
                  <span className="text-2xl">{getFlagEmoji(country.country_code)}</span>
                  <Link 
                    href={`/country/${country.country_code.toLowerCase()}`}
                    className="flex-1 hover:text-green-600 transition-colors"
                  >
                    {country.country}
                  </Link>
                  <span className="font-semibold text-green-700">{country.level1_score}</span>
                </motion.li>
              ))}
            </ol>
          </motion.div>

          {/* PRI: Reciprocity */}
          <motion.div
            className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-lg p-6 border border-blue-200"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full">
                <span className="text-xl">🤝</span>
              </div>
              RATFI: Reciprocity-Adjusted Index
            </h3>
            <p className="text-sm text-gray-600 mb-4">Values strategic network position and connectivity</p>
            <ol className="space-y-3">
              {topPRI.map((country, idx) => (
                <motion.li
                  key={country.country_code}
                  className="flex items-center gap-3 bg-white/50 rounded-lg p-2"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05, duration: 0.3 }}
                >
                  <span className="text-gray-500 font-mono w-6">{idx + 1}.</span>
                  <span className="text-2xl">{getFlagEmoji(country.country_code)}</span>
                  <Link 
                    href={`/country/${country.country_code.toLowerCase()}`}
                    className="flex-1 hover:text-blue-600 transition-colors font-medium"
                  >
                    {country.country}
                  </Link>
                  <span className="font-bold text-blue-600">{country.pri_score.toFixed(2)}</span>
                </motion.li>
              ))}
            </ol>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gradient-to-br from-white to-gray-50 py-16 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-3">
              <span className="text-2xl">💡</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Why RATFI Matters</h2>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl shadow-lg p-6 border border-purple-200">
              <AnimatedFeatureCard
              icon="🔄"
              title="Network Analysis"
              description="Identifies countries with visa-free access to well-connected, influential nations in the global diplomatic network"
              delay={0}
              />
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-lg p-6 border border-blue-200">
              <AnimatedFeatureCard
                icon="📊"
                title="Advanced Algorithm"
                description="Uses modified PageRank algorithm to evaluate the quality of diplomatic partnerships"
                delay={0.1}
              />
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl shadow-lg p-6 border border-green-200">
              <AnimatedFeatureCard
                icon="🌐"
                title="Open Source"
                description="Fully transparent methodology with open-source implementation on GitHub"
                delay={0.2}
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <motion.div
          className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl shadow-lg p-12 border border-blue-200"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
            <span className="text-3xl">🔍</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Explore the Complete Rankings
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Compare all {totalCountries} countries, search by region, and discover which passports have the strongest diplomatic networks
          </p>
          <Link 
            href="/rankings"
            className="inline-block px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-colors shadow-lg text-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
          >
            View Full Rankings →
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
