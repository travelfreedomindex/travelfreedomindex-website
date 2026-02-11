import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Disclaimer - Travel Freedom Index',
  description: 'Legal disclaimer for Travel Freedom Index - Important information about data accuracy and liability.',
  robots: 'noindex, nofollow', // Don't index legal pages
};

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Disclaimer
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Last Updated: January 2026
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-lg dark:prose-invert max-w-none">
          {/* Important Notice */}
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-6 mb-8 rounded-r-lg">
            <h2 className="text-xl font-bold text-yellow-900 dark:text-yellow-100 mt-0 mb-2">
              ⚠️ Important Notice
            </h2>
            <p className="text-yellow-800 dark:text-yellow-200 mb-0">
              The Travel Freedom Index ("we," "us," or "our") provides passport ranking and visa information for 
              <strong> general informational and educational purposes only</strong>. By using this website, you 
              acknowledge and agree to the following:
            </p>
          </div>

          {/* Accuracy of Information */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Accuracy of Information
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              While we strive to provide accurate and up-to-date information:
            </p>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li><strong>Visa requirements change frequently</strong> and without notice</li>
              <li>We source data from IATA Timatic, government sources, and public databases</li>
              <li><strong>We cannot guarantee 100% accuracy</strong> of visa policies or rankings</li>
              <li>Information may become outdated between our updates</li>
              <li><strong>Always verify current requirements</strong> with official government sources before making travel plans</li>
            </ul>
          </section>

          {/* No Professional Advice */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              No Professional Advice
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              The information on this website:
            </p>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li>Does <strong>NOT constitute professional legal, immigration, or travel advice</strong></li>
              <li>Is not a substitute for consulting official government immigration authorities</li>
              <li>Should not be relied upon as the sole source for making travel decisions</li>
              <li>Does not establish any professional-client relationship</li>
            </ul>
          </section>

          {/* Limitation of Liability */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Limitation of Liability
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              To the fullest extent permitted by law:
            </p>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li>We are <strong>NOT responsible</strong> for any travel disruptions, denied entry, visa rejections, or financial losses resulting from use of this information</li>
              <li>You use this website and its information <strong>at your own risk</strong></li>
              <li>We disclaim all liability for errors, omissions, or outdated information</li>
              <li>We are not liable for decisions made based on our rankings or data</li>
            </ul>
          </section>

          {/* Data Sources */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Data Sources
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Our data is compiled from:
            </p>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li>IATA Timatic database</li>
              <li>Official government immigration websites</li>
              <li>Wikipedia and publicly available sources</li>
              <li>Diplomatic announcements and news reports</li>
            </ul>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mt-4">
              <p className="text-blue-900 dark:text-blue-100 mb-0">
                <strong>Data Currency:</strong> We update our database weekly, but visa policies can change daily.
              </p>
            </div>
          </section>

          {/* Algorithm Disclaimer */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Algorithm Disclaimer
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Our Reciprocity-Adjusted Travel Freedom Index (RATFI):
            </p>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li>Uses a proprietary algorithm to calculate rankings</li>
              <li>Represents our methodology for measuring passport power</li>
              <li>May differ from other passport ranking systems</li>
              <li>Is intended as an analytical tool, not official government data</li>
            </ul>
          </section>

          {/* Third-Party Links */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Third-Party Links
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              We may link to:
            </p>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li>Government embassy websites</li>
              <li>Official visa application portals</li>
              <li>Travel resources</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 mt-4">
              We are not responsible for the accuracy, content, or availability of third-party websites.
            </p>
          </section>

          {/* Changes to Disclaimer */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Changes to This Disclaimer
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              We reserve the right to modify this disclaimer at any time. Changes become effective immediately upon posting.
            </p>
          </section>

          {/* Contact Us */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Contact Us
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Found an error or outdated information?
            </p>
            <div className="space-y-2 text-gray-700 dark:text-gray-300">
              <p>
                <strong>GitHub Issues:</strong>{' '}
                <a 
                  href="https://github.com/travelfreedomindex/travelfreedomindex-website/issues" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  Report on GitHub
                </a>
              </p>
            </div>
          </section>

          {/* Final Agreement */}
          <div className="bg-gray-100 dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 p-6 rounded-lg text-center">
            <p className="text-gray-800 dark:text-gray-200 font-semibold mb-0">
              By using this website, you acknowledge that you have read, understood, and agree to be bound by this disclaimer.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
