import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Methodology - Travel Freedom Index',
  description: 'Learn how we calculate passport power through visa-free access and diplomatic reciprocity using modified PageRank algorithm.',
};

export default function MethodologyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="flex items-center gap-3 mb-8">
          <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full">
            <span className="text-2xl">🔬</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900">
            Methodology
          </h1>
        </div>
        
        <div className="prose prose-lg max-w-none">
          {/* Recent Improvements */}
          <section id="recent-improvements" className="mb-12 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl shadow-lg p-8 border-2 border-green-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-10 h-10 bg-green-100 rounded-full">
                <span className="text-xl">✨</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                Recent Improvements
              </h2>
              <span className="text-xs bg-green-600 text-white px-2 py-1 rounded-full font-semibold">Feb 12, 2026</span>
            </div>
            
            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6 border border-green-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <span className="text-lg">🐛</span>
                  Parser Bug Fix - Classification Accuracy
                </h3>
                <p className="text-gray-700 leading-relaxed mb-3">
                  <strong>Issue:</strong> The visa requirement parser incorrectly classified conditional exceptions as universal visa-free access. For example, text stating "must have visa... Hong Kong passport holders do not need visa" was incorrectly marking ALL Chinese passport holders as visa-free.
                </p>
                <p className="text-gray-700 leading-relaxed mb-3">
                  <strong>Impact:</strong> Approximately 95% of visa_free classifications were incorrect, significantly inflating scores for some countries. China showed 139 visa-free destinations when the actual number was closer to 80.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  <strong>Fix:</strong> Reordered conditional logic to check "must have visa" statements BEFORE "do not need visa" exceptions. All data has been reprocessed with the corrected parser as of February 12, 2026 (afternoon).
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 border border-green-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <span className="text-lg">🎯</span>
                  Enhanced Validation - Accuracy Priority
                </h3>
                <p className="text-gray-700 leading-relaxed mb-3">
                  We now use LLM validation on ALL results when processing data with maximum accuracy mode enabled. Previously, validation only occurred for low-confidence results, but the buggy parser assigned high confidence to incorrect classifications.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  <strong>Trade-off:</strong> Processing takes approximately 10x longer, but guarantees accuracy and catches edge cases that rule-based parsing might miss.
                </p>
              </div>

              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <p className="text-sm text-blue-900">
                  <strong>Current Data Quality:</strong> 89.8% success rate (36,083 of 40,200 combinations). The 10.2% missing data is due to gaps in the IATA Timatic API for countries like Moldova, Seychelles, and small island nations with limited diplomatic relations.
                </p>
              </div>
            </div>
          </section>

          {/* Introduction */}
          <section className="mb-12 bg-white rounded-xl shadow-lg p-8 border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full">
                <span className="text-xl">📖</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                Introduction
              </h2>
            </div>
            <p className="text-gray-700 leading-relaxed">
              The Reciprocity-Adjusted Travel Freedom Index (RATFI) offers a novel approach to measuring passport power by considering not just the number of visa-free destinations, but the strategic value and network connectivity of these diplomatic relationships.
            </p>
          </section>

          {/* Travel Freedom Score */}
          <section className="mb-12 bg-gradient-to-br from-green-50 to-green-100 rounded-xl shadow-lg p-8 border border-green-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-10 h-10 bg-green-100 rounded-full">
                <span className="text-xl">🌍</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                TFI: Travel Freedom Index
              </h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              The Travel Freedom Index measures passport strength by evaluating the ease of access to destinations worldwide. Unlike simple counts, we apply weights that reflect the real-world convenience of different entry requirements:
            </p>
            
            <div className="bg-blue-50 p-6 rounded-lg mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">Scoring Weights</h3>
              <ul className="space-y-2 text-gray-700">
                <li><span className="font-mono bg-white px-2 py-1 rounded">1.0×</span> <strong>Visa-Free</strong> – Walk through immigration freely</li>
                <li><span className="font-mono bg-white px-2 py-1 rounded">0.8×</span> <strong>Visa on Arrival</strong> – Minor hassle: queue, fees, paperwork at border</li>
                <li><span className="font-mono bg-white px-2 py-1 rounded">0.7×</span> <strong>eTA/eVisa</strong> – Moderate friction: online application, waiting period, fees</li>
                <li><span className="font-mono bg-white px-2 py-1 rounded">0.0×</span> <strong>Visa Required</strong> – Significant barrier: embassy visit, documentation, uncertainty</li>
              </ul>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg mb-4">
              <h4 className="font-semibold text-gray-900 mb-3">TFI Score Formula:</h4>
              <p className="font-mono text-lg text-center text-gray-800">
                Score = Σ (destination × access multiplier)
              </p>
            </div>
            
            <p className="text-gray-700 leading-relaxed">
              This weighted approach captures the practical reality that visa-on-arrival access (requiring cash, forms, and waiting in line) is not equivalent to truly visa-free travel. The weights reflect measurable friction in the travel experience while maintaining comparability across passports.
            </p>
          </section>

          {/* RAPI: Reciprocity-Based Ranking */}
          <section className="mb-12 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-lg p-8 border border-blue-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full">
                <span className="text-xl">🤝</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                RATFI: Reciprocity-Adjusted Travel Freedom Index
              </h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              The Reciprocity-Adjusted Travel Freedom Index uses a modified PageRank algorithm to evaluate the 
              strategic value of diplomatic relationships. Countries with visa-free access to well-connected, 
              influential nations receive higher scores, regardless of the total number of destinations. 
              This measures the quality and network effects of diplomatic relationships rather than simple quantity.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
              Reciprocity Calculation
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              For each country, we calculate a reciprocity bonus based on three types of relationships:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
              <li><strong>Reciprocal relationships (weight: 1.0×)</strong> - Both countries offer visa-free access to each other</li>
              <li><strong>Asymmetric advantages (weight: 0.3×)</strong> - Country receives visa-free access without reciprocating</li>
              <li><strong>Asymmetric penalties (weight: -0.5×)</strong> - Country offers visa-free access without receiving it</li>
            </ul>
            
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <h4 className="font-semibold text-gray-900 mb-2">Understanding Relationship Types:</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">🤝</span>
                  <div>
                    <strong className="text-green-800">Reciprocal (Symmetric):</strong> Mutual visa-free access between two countries. 
                    For example, if Germany allows French citizens visa-free entry and France allows German citizens visa-free entry, 
                    this is a reciprocal relationship.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-600 font-bold">✈️</span>
                  <div>
                    <strong className="text-yellow-800">Asymmetric Advantage:</strong> One-way benefit where your passport grants visa-free access 
                    to a country, but that country's citizens require a visa to visit yours. This indicates stronger diplomatic or economic positioning.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">🚫</span>
                  <div>
                    <strong className="text-red-800">Asymmetric Penalty:</strong> One-way disadvantage where other countries' citizens can visit 
                    your country visa-free, but you require a visa to visit them. This may reflect immigration concerns or diplomatic imbalances.
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg mb-4">
              <h4 className="font-semibold text-gray-900 mb-3">Reciprocity Score Formula:</h4>
              <p className="font-mono text-lg text-center text-gray-800 mb-3">
                Reciprocity = (reciprocal × 1.0 + advantages × 0.3 - penalties × 0.5) / total_relationships
              </p>
              <p className="text-xs text-gray-600 text-center">
                Result is clamped between 0.0 and 1.0
              </p>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
              Modified PageRank Algorithm
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              We apply a modified PageRank algorithm that weighs diplomatic relationships by their reciprocity:
            </p>
            <div className="bg-gray-50 p-6 rounded-lg mb-4">
              <h4 className="font-semibold text-gray-900 mb-3">Modified PageRank Formula:</h4>
              <div className="font-mono text-lg text-center text-gray-800 mb-4">
                <div className="mb-1">Score(P) = Reciprocity(P) × [(1 - d) / N + d × Σ(...)]</div>
              </div>
              <div className="space-y-2 text-sm text-gray-700">
                <div className="flex items-start gap-2">
                  <strong className="min-w-[120px]">d =</strong>
                  <span>damping factor (0.85)</span>
                </div>
                <div className="flex items-start gap-2">
                  <strong className="min-w-[120px]">N =</strong>
                  <span>total number of countries (201)</span>
                </div>
                <div className="flex items-start gap-2">
                  <strong className="min-w-[120px]">weight(D→P) =</strong>
                  <span>visa-free access weight from destination D to passport P</span>
                </div>
                <div className="flex items-start gap-2">
                  <strong className="min-w-[120px]">OutDegree(D) =</strong>
                  <span>total outgoing relationships from D</span>
                </div>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed">
              This approach ensures that countries with diplomatic relationships to well-connected, influential nations 
              receive higher scores. The algorithm captures network effects where access to strategically important 
              countries is valued more highly than access to many less-connected nations.
            </p>
          </section>

          {/* Data Freshness */}
          <section className="mb-12 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl shadow-lg p-8 border border-indigo-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-10 h-10 bg-indigo-100 rounded-full">
                <span className="text-xl">📡</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                Data Freshness
              </h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              Our dataset is continuously maintained and updated to ensure accuracy:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white p-5 rounded-lg shadow-sm">
                <div className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <span className="text-blue-600">📊</span>
                  Current Dataset
                </div>
                <div className="space-y-1 text-sm text-gray-600">
                  <div>• 201 passports analyzed</div>
                  <div>• 200 destinations per passport</div>
                  <div>• 40,200 bilateral relationships</div>
                  <div>• 4 visa requirement categories</div>
                </div>
              </div>
              <div className="bg-white p-5 rounded-lg shadow-sm">
                <div className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  Verification
                </div>
                <div className="space-y-1 text-sm text-gray-600">
                  <div>• Cross-referenced with IATA data</div>
                  <div>• Validated against official sources</div>
                  <div>• Regular policy monitoring</div>
                </div>
              </div>
            </div>
          </section>

          {/* Data Sources */}
          <section className="mb-12 bg-white rounded-xl shadow-lg p-8 border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-10 h-10 bg-purple-100 rounded-full">
                <span className="text-xl">📊</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                Data Sources
              </h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              Our data is compiled from multiple authoritative sources:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Official government immigration websites</li>
              <li>International Air Transport Association (IATA) Travel Centre</li>
              <li>Embassy and consulate publications</li>
              <li>Verified diplomatic agreements</li>
            </ul>
          </section>

          {/* Update Frequency */}
          <section className="mb-12 bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl shadow-lg p-8 border border-amber-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-10 h-10 bg-amber-100 rounded-full">
                <span className="text-xl">📅</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                Update Frequency
              </h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              Rankings are recalculated regularly to reflect the latest visa policy changes and diplomatic developments. Our data pipeline processes information from official sources to ensure accuracy.
            </p>
            <div className="bg-white p-4 rounded-lg">
              <div className="text-sm text-gray-600 space-y-1">
                <div>• <strong>Data Sources:</strong> Official government immigration websites, IATA Travel Centre</div>
                <div>• <strong>Processing:</strong> Automated data validation and consistency checks</div>
                <div>• <strong>History:</strong> Complete historical data maintained for trend analysis</div>
              </div>
            </div>
          </section>

          {/* Limitations */}
          <section className="mb-12 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl shadow-lg p-8 border border-purple-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-10 h-10 bg-purple-100 rounded-full">
                <span className="text-xl">⚠️</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                Limitations & Considerations
              </h2>
            </div>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="text-purple-600 mt-1 font-bold">•</span>
                <div>
                  <strong>Policy vs. Practice:</strong> Rankings reflect official policies, not practical travel ease (e.g., border wait times, documentation requirements, or enforcement variability).
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-600 mt-1 font-bold">•</span>
                <div>
                  <strong>Weighting Methodology:</strong> Visa-on-arrival (0.8×) and eTA/eVisa (0.7×) are weighted lower than visa-free (1.0×) to reflect the friction and uncertainty of border processing.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-600 mt-1 font-bold">•</span>
                <div>
                  <strong>Disputed Territories:</strong> Handled based on majority international recognition and UN membership status.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-600 mt-1 font-bold">•</span>
                <div>
                  <strong>Network Effects:</strong> The algorithm prioritizes strategic relationships, so a country with fewer but more valuable connections may rank higher than one with many low-value connections.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-600 mt-1 font-bold">•</span>
                <div>
                  <strong>Temporary Changes:</strong> Sudden geopolitical events or policy changes may not be immediately reflected until verified through official channels.
                </div>
              </li>
            </ul>
          </section>

          {/* Open Source */}
          <section className="mb-12 bg-white rounded-xl shadow-lg p-8 border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-10 h-10 bg-green-100 rounded-full">
                <span className="text-xl">💚</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                Open Source & Transparency
              </h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              Our complete methodology and implementation are open source and available on GitHub. We encourage community review, contributions, and discussions about our approach.
            </p>
            <a
              href="https://github.com/travelfreedomindex/travelfreedomindex-website"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-xl hover:from-gray-900 hover:to-black transition-all shadow-lg hover:shadow-xl"
            >
              View on GitHub →
            </a>
          </section>
        </div>
      </div>
    </div>
  );
}
