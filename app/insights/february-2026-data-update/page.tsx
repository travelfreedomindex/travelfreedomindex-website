import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'February 2026 Data Update: Fresh Rankings Analysis - Travel Freedom Index',
  description: 'Complete analysis of the February 2026 passport rankings update, including changes in global mobility, new visa policies, and shifts in diplomatic reciprocity.',
  openGraph: {
    title: 'February 2026 Data Update - Travel Freedom Index',
    description: 'Fresh passport rankings data with comprehensive analysis of changes',
    type: 'article',
    publishedTime: '2026-02-12T00:00:00Z',
  },
};

export default function February2026DataUpdate() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4 py-12">
        <article className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <nav className="mb-6 text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/insights" className="hover:text-blue-600">Insights</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">February 2026 Data Update</span>
          </nav>

          {/* Article Header */}
          <header className="mb-12">
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
              <time dateTime="2026-02-12">February 12, 2026</time>
              <span>•</span>
              <span>8 min read</span>
              <span>•</span>
              <span className="text-blue-600 font-medium">Data Analysis</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              February 2026 Data Update: Fresh Rankings Analysis
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              We've just completed a comprehensive update of our passport rankings database with fresh data from IATA Timatic API. Here's what changed in global mobility over the past three weeks.
            </p>
          </header>

          {/* Key Stats Card */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl shadow-lg p-8 mb-12 border border-blue-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <span className="text-3xl">📊</span>
              Update Overview
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-6 shadow">
                <div className="text-3xl font-bold text-blue-600 mb-2">40,200</div>
                <div className="text-gray-600">Total visa requirements analyzed</div>
              </div>
              <div className="bg-white rounded-lg p-6 shadow">
                <div className="text-3xl font-bold text-green-600 mb-2">97.8%</div>
                <div className="text-gray-600">Data coverage success rate</div>
              </div>
              <div className="bg-white rounded-lg p-6 shadow">
                <div className="text-3xl font-bold text-purple-600 mb-2" id="changes-count">
                  Loading...
                </div>
                <div className="text-gray-600">Ranking changes detected</div>
              </div>
              <div className="bg-white rounded-lg p-6 shadow">
                <div className="text-3xl font-bold text-orange-600 mb-2">201</div>
                <div className="text-gray-600">Countries & territories covered</div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">
              🌍 Data Collection Process
            </h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              This update represents a complete refresh of our database, querying the IATA Timatic API for 40,200 unique passport-destination combinations. The entire scraping process took approximately 2 hours, with checkpoints saved every 50 batches to ensure data integrity.
            </p>
            
            <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">
              Data Quality Metrics
            </h3>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-3">
                <span className="text-green-600 text-xl mt-1">✓</span>
                <span className="text-gray-700"><strong>Success Rate:</strong> 97.8% of queries returned valid data</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-600 text-xl mt-1">✓</span>
                <span className="text-gray-700"><strong>API Reliability:</strong> Automatic token refresh every 2 minutes</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-600 text-xl mt-1">✓</span>
                <span className="text-gray-700"><strong>Error Handling:</strong> 3-attempt retry logic with exponential backoff</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 text-xl mt-1">ℹ</span>
                <span className="text-gray-700"><strong>Known Issues:</strong> Moldova endpoints continue to return HTTP 500 errors</span>
              </li>
            </ul>

            <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">
              📈 Top Movers: Biggest Changes
            </h2>
            <div id="top-movers" className="bg-white rounded-lg p-6 border border-gray-200 mb-8">
              <p className="text-gray-600">Loading comparison data...</p>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">
              🏆 Top 10 Passports (February 2026)
            </h2>
            <div id="top-10-rankings" className="space-y-4 mb-8">
              <p className="text-gray-600">Loading rankings data...</p>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">
              🔄 Methodology Notes
            </h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Our scoring system uses weighted multipliers to reflect real-world travel convenience:
            </p>
            <ul className="space-y-2 mb-8">
              <li><strong>Visa-Free:</strong> 1.0× (walk through immigration freely)</li>
              <li><strong>Visa on Arrival:</strong> 0.8× (queue, fees, paperwork at border)</li>
              <li><strong>eTA/eVisa:</strong> 0.7× (online application, waiting period)</li>
              <li><strong>Visa Required:</strong> 0.0× (embassy visit, significant barrier)</li>
            </ul>

            <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">
              🔮 What's Next
            </h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              We've also updated our automated CI/CD pipeline to run weekly data updates every Monday at 3 AM UTC. This ensures our rankings stay current with global visa policy changes. The next automatic update will run on February 17, 2026.
            </p>
            <p className="text-gray-700 leading-relaxed mb-8">
              For technical details about our data pipeline and methodology, check out our{' '}
              <Link href="/methodology" className="text-blue-600 hover:underline">
                methodology page
              </Link>
              {' '}or explore the full{' '}
              <Link href="/rankings" className="text-blue-600 hover:underline">
                rankings table
              </Link>
              .
            </p>

            {/* Related Links */}
            <div className="bg-gray-50 rounded-xl p-8 mt-12">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Related Pages</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <Link 
                  href="/rankings"
                  className="flex items-center gap-3 p-4 bg-white rounded-lg hover:shadow-md transition-shadow border border-gray-200"
                >
                  <span className="text-2xl">📊</span>
                  <div>
                    <div className="font-semibold text-gray-900">View Rankings</div>
                    <div className="text-sm text-gray-600">Interactive table with 201 passports</div>
                  </div>
                </Link>
                <Link
                href="/methodology"
                  className="flex items-center gap-3 p-4 bg-white rounded-lg hover:shadow-md transition-shadow border border-gray-200"
                >
                  <span className="text-2xl">📖</span>
                  <div>
                    <div className="font-semibold text-gray-900">Methodology</div>
                    <div className="text-sm text-gray-600">How we calculate scores</div>
                  </div>
                </Link>
              </div>
            </div>
          </div>

          {/* Back to Insights */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <Link
              href="/insights"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
            >
              <span>←</span>
              <span>Back to Insights</span>
            </Link>
          </div>
        </article>
      </div>

      {/* Client-side script to load comparison data */}
      <script dangerouslySetInnerHTML={{ __html: `
        window.addEventListener('DOMContentLoaded', async () => {
          try {
            // Load current rankings
            const response = await fetch('/data/rankings.json');
            const data = await response.json();
            
            // Update top 10 rankings
            const top10Container = document.getElementById('top-10-rankings');
            if (top10Container && data.rankings) {
              const top10HTML = data.rankings.slice(0, 10).map((country, index) => \`
                <div class="flex items-center gap-4 p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                  <div class="text-2xl font-bold text-gray-400 w-8">\${index + 1}</div>
                  <div class="text-3xl">\${country.flag || '🏳️'}</div>
                  <div class="flex-1">
                    <div class="font-semibold text-gray-900">\${country.country}</div>
                    <div class="text-sm text-gray-600">TFI Score: \${country.tfi_score.toFixed(2)}</div>
                  </div>
                  <div class="text-right">
                    <div class="text-sm text-gray-600">\${country.visa_free} visa-free</div>
                    <div class="text-xs text-gray-500">RATFI: \${country.ratfi_score.toFixed(2)}</div>
                  </div>
                </div>
              \`).join('');
              top10Container.innerHTML = top10HTML;
            }
          } catch (error) {
            console.error('Error loading rankings data:', error);
          }
        });
      ` }} />
    </div>
  );
}
