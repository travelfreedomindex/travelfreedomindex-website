import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About - Travel Freedom Index',
  description: 'Learn about the Travel Freedom Index project, our mission, and how we measure passport power through diplomatic reciprocity.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="flex items-center gap-3 mb-8">
          <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full">
            <span className="text-2xl">ℹ️</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900">
            About Travel Freedom Index
          </h1>
        </div>

        <div className="prose prose-lg max-w-none">
          <section className="mb-12 bg-white rounded-xl shadow-lg p-8 border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-10 h-10 bg-purple-100 rounded-full">
                <span className="text-xl">🎯</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                Our Mission
              </h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              The Reciprocity-Adjusted Travel Freedom Index (RATFI) was created to provide a more nuanced understanding of passport power beyond simple visa-free destination counts. We believe that true diplomatic strength is measured not just by how many doors your passport opens, but by the strategic importance and network connectivity of those relationships.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Our mission is to offer transparent, data-driven insights into global mobility patterns while highlighting the importance of strategic diplomatic networks between nations.
            </p>
            <div className="bg-blue-50 p-5 rounded-lg">
              <div className="grid md:grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-3xl font-bold text-blue-600">201</div>
                  <div className="text-sm text-gray-600">Countries Analyzed</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600">~40,200</div>
                  <div className="text-sm text-gray-600">Bilateral Relationships</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600">20,922</div>
                  <div className="text-sm text-gray-600">Reciprocal Relationships</div>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full">
                <span className="text-xl">🔍</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                What Makes RATFI Different
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl shadow-lg border border-blue-200">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">📊</span>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Traditional Indices
                  </h3>
                </div>
                <p className="text-gray-700 text-sm">
                  Count all visa-free destinations equally, regardless of reciprocity or diplomatic significance.
                </p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl shadow-lg border border-green-200">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">🤝</span>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Reciprocity-Adjusted Travel Freedom Index (RATFI)
                  </h3>
                </div>
                <p className="text-gray-700 text-sm">
                  Uses network analysis to reward diplomatic relationships with well-connected, influential nations. 
                  Quality over quantity.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12 bg-white rounded-xl shadow-lg p-8 border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-10 h-10 bg-green-100 rounded-full">
                <span className="text-xl">💚</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                Open Source Commitment
              </h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              We believe in transparency and community collaboration. Our entire codebase, methodology, and data processing pipeline are open source and available on GitHub. We welcome contributions, feedback, and discussions from the community.
            </p>
            <a
              href="https://github.com/travelfreedomindex/travelfreedomindex-website"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-xl hover:from-gray-900 hover:to-black transition-all shadow-lg hover:shadow-xl"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
              View on GitHub
            </a>
          </section>

          <section className="mb-12 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl shadow-lg p-8 border border-purple-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-10 h-10 bg-purple-100 rounded-full">
                <span className="text-xl">⚙️</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                How It Works
              </h2>
            </div>
            <ol className="space-y-4 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="font-bold text-purple-600 text-lg">1.</span>
                <div>
                  <strong className="text-gray-900">Data Collection:</strong>
                  <span className="text-gray-700"> We gather visa requirements from official government sources, embassy websites, and the IATA Travel Centre database to ensure accuracy.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-bold text-purple-600 text-lg">2.</span>
                <div>
                  <strong className="text-gray-900">Reciprocity Analysis:</strong>
                  <span className="text-gray-700"> For each country pair, we determine if visa policies are mutual (reciprocal), one-sided (asymmetric advantages/penalties), or restricted.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-bold text-purple-600 text-lg">3.</span>
                <div>
                  <strong className="text-gray-900">Network Analysis:</strong>
                  <span className="text-gray-700"> We apply a modified PageRank algorithm that values diplomatic relationships with well-connected, influential nations. Countries gain higher scores by having access to strategically important destinations in the global network.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-bold text-purple-600 text-lg">4.</span>
                <div>
                  <strong className="text-gray-900">Score Calculation:</strong>
                  <span className="text-gray-700"> Rankings are generated using weighted scoring (visa-free: 1.0×, VOA: 0.8×, eTA: 0.7×) combined with reciprocity bonuses to reward mutual diplomatic cooperation.</span>
                </div>
              </li>
            </ol>
            <p className="text-gray-700 leading-relaxed mt-4">
              For detailed technical information, see our{' '}
              <Link href="/methodology" className="text-blue-600 hover:underline">
                Methodology page
              </Link>.
            </p>
          </section>

          <section className="mb-12 bg-white rounded-xl shadow-lg p-8 border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full">
                <span className="text-xl">🤲</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                Get Involved
              </h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              We're always looking for contributors to help improve the project:
            </p>
            <ul className="space-y-3 text-gray-700 mb-6">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">✓</span>
                <span>Report data inaccuracies or suggest improvements</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">✓</span>
                <span>Contribute code enhancements or new features</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">✓</span>
                <span>Share insights and analysis based on our data</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">✓</span>
                <span>Translate content to make it accessible worldwide</span>
              </li>
            </ul>
            <div className="flex flex-wrap gap-4">
              <a
                href="https://github.com/travelfreedomindex/travelfreedomindex-website/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl"
              >
                Report an Issue
              </a>
              <a
                href="https://github.com/travelfreedomindex/travelfreedomindex-website/blob/main/CONTRIBUTING.md"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-white text-blue-600 border-2 border-blue-600 rounded-xl hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl"
              >
                Contribution Guide
              </a>
            </div>
          </section>

          <section className="mb-12 bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl shadow-lg p-8 border border-amber-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-10 h-10 bg-amber-100 rounded-full">
                <span className="text-xl">📧</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                Contact
              </h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              Have questions, suggestions, or want to collaborate? Reach out to us:
            </p>
            <ul className="space-y-2 text-gray-700">
              <li>
                <strong>GitHub:</strong>{' '}
                <a
                  href="https://github.com/travelfreedomindex/travelfreedomindex-website"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  github.com/travelfreedomindex/travelfreedomindex-website
                </a>
              </li>
              <li>
                <strong>Issues & Discussions:</strong>{' '}
                <a
                  href="https://github.com/travelfreedomindex/travelfreedomindex-website/discussions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  GitHub Discussions
                </a>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
