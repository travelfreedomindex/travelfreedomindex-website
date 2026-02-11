import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Insights - Travel Freedom Index',
  description: 'Explore insights, analysis, and articles about global passport rankings, visa policies, and diplomatic reciprocity.',
};

export default function InsightsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full">
              <span className="text-2xl">💡</span>
            </div>
            <h1 className="text-4xl font-bold text-gray-900">
              Insights & Analysis
            </h1>
          </div>
          <p className="text-lg text-gray-600 mb-12">
            Coming soon: In-depth articles about passport power, diplomatic reciprocity, and global mobility trends.
          </p>

          {/* Placeholder for future articles */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl shadow-lg p-12 text-center border border-blue-200">
            <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mx-auto mb-6">
              <span className="text-4xl">📝</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Articles Coming Soon
            </h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              We're working on comprehensive articles covering passport rankings, visa policy trends, and diplomatic relationships. Check back soon or explore our current rankings and methodology.
            </p>
            <div className="flex gap-4 justify-center">
              <Link
                href="/rankings"
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl"
              >
                View Rankings
              </Link>
              <Link
                href="/methodology"
                className="px-6 py-3 bg-white text-blue-600 border-2 border-blue-600 rounded-xl hover:bg-blue-50 transition-colors shadow-lg"
              >
                Learn Methodology
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
