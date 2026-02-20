import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Insights - Travel Freedom Index',
  description: 'Explore insights, analysis, and articles about global passport rankings, visa policies, and diplomatic reciprocity.',
};

export default function InsightsPage() {
  // Article data - will be moved to CMS/database later
  const articles = [
    {
      slug: 'february-2026-data-update',
      title: 'February 2026 Data Update: Fresh Rankings Analysis',
      description: 'Complete analysis of the latest passport rankings update with fresh data from IATA Timatic API, including changes in global mobility and shifts in diplomatic reciprocity.',
      date: '2026-02-12',
      readTime: '8 min',
      category: 'Data Analysis',
      icon: '📊',
    },
  ];

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
            In-depth articles about passport power, diplomatic reciprocity, and global mobility trends.
          </p>

          {/* Articles Grid */}
          <div className="space-y-6 mb-12">
            {articles.map((article) => (
              <Link
                key={article.slug}
                href={`/insights/${article.slug}`}
                className="block bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-200 overflow-hidden group"
              >
                <div className="p-8">
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                    <time dateTime={article.date}>
                      {new Date(article.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </time>
                    <span>•</span>
                    <span>{article.readTime} read</span>
                    <span>•</span>
                    <span className="text-blue-600 font-medium">{article.category}</span>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                        <span className="text-3xl">{article.icon}</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                        {article.title}
                      </h2>
                      <p className="text-gray-600 leading-relaxed">
                        {article.description}
                      </p>
                      <div className="mt-4 inline-flex items-center gap-2 text-blue-600 font-medium group-hover:gap-3 transition-all">
                        <span>Read article</span>
                        <span>→</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Coming Soon */}
          <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl shadow-lg p-8 text-center border border-gray-200">
            <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full mx-auto mb-4">
              <span className="text-2xl">📝</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              More Articles Coming Soon
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We're working on more in-depth analyses covering visa policy trends, regional mobility patterns, and diplomatic relationships.
            </p>
          </div>

          {/* CTA Section */}
          <div className="mt-12 bg-white rounded-xl shadow-lg p-8 border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Explore More
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <Link
                href="/rankings"
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl text-center"
              >
                View Rankings
              </Link>
              <Link
                href="/methodology"
                className="px-6 py-3 bg-white text-blue-600 border-2 border-blue-600 rounded-xl hover:bg-blue-50 transition-colors shadow-lg text-center"
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
