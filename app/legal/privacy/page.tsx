import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - Travel Freedom Index',
  description: 'Privacy policy for Travel Freedom Index - Learn how we collect, use, and protect your data.',
  robots: 'noindex, nofollow', // Don't index legal pages
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Privacy Policy
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Effective Date: January 24, 2026 • Last Updated: January 24, 2026
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-lg dark:prose-invert max-w-none">
          {/* Introduction */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Introduction
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              Travel Freedom Index ("we," "us," or "our") is committed to protecting your privacy. This Privacy Policy 
              explains what information we collect, how we use it, and your rights under applicable data protection laws 
              (including GDPR and CCPA).
            </p>
          </section>

          {/* What Information We Collect */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              What Information We Collect
            </h2>
            
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
              1. Automatically Collected Information
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              When you visit our website, we automatically collect:
            </p>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li><strong>Usage Data:</strong> Pages visited, time spent, referring website</li>
              <li><strong>Device Information:</strong> Browser type, operating system, screen resolution</li>
              <li><strong>Location Data:</strong> Country/region (via IP address) - we do NOT collect precise location</li>
              <li><strong>Technical Data:</strong> IP address (anonymized), timestamps</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3 mt-6">
              2. Information You Provide
            </h3>
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg mb-4">
              <p className="text-green-900 dark:text-green-100 mb-2">
                <strong>We do NOT collect:</strong>
              </p>
              <ul className="space-y-1 text-green-800 dark:text-green-200">
                <li>❌ Names</li>
                <li>❌ Email addresses (unless you contact us)</li>
                <li>❌ Payment information</li>
                <li>❌ Account credentials (no user accounts)</li>
              </ul>
            </div>
            <p className="text-gray-700 dark:text-gray-300">
              <strong>Contact Form:</strong> If you contact us via email, we collect your email address and message 
              content solely to respond to your inquiry.
            </p>
          </section>

          {/* How We Use Your Information */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              How We Use Your Information
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              We use collected information to:
            </p>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li>✓ Analyze website traffic and usage patterns</li>
              <li>✓ Improve user experience and site performance</li>
              <li>✓ Detect and prevent technical issues</li>
              <li>✓ Understand which countries our visitors are from</li>
              <li>✓ Monitor Core Web Vitals for optimization</li>
            </ul>

            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mt-4">
              <p className="text-blue-900 dark:text-blue-100 mb-2">
                <strong>We do NOT:</strong>
              </p>
              <ul className="space-y-1 text-blue-800 dark:text-blue-200">
                <li>❌ Sell your data to third parties</li>
                <li>❌ Use your data for targeted advertising (currently)</li>
                <li>❌ Share your data with marketers</li>
                <li>❌ Track you across other websites</li>
              </ul>
            </div>
          </section>

          {/* Third-Party Services */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Third-Party Services
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              We use the following third-party services that may collect data:
            </p>

            {/* Vercel Analytics */}
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-5 rounded-lg mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Vercel Analytics (Privacy-Friendly)
              </h3>
              <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li><strong>What it collects:</strong> Pageviews, country, browser, device type</li>
                <li><strong>Why we use it:</strong> Monitor traffic and performance</li>
                <li>
                  <strong>Privacy Policy:</strong>{' '}
                  <a 
                    href="https://vercel.com/legal/privacy-policy" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
                  >
                    vercel.com/legal/privacy-policy
                  </a>
                </li>
                <li><strong>Data processing:</strong> Anonymized, GDPR-compliant</li>
              </ul>
            </div>
          </section>

          {/* Cookies */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Cookies
            </h2>
            
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
              What Are Cookies?
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Cookies are small text files stored on your device by your browser.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
              Cookies We Use
            </h3>
            <div className="overflow-x-auto mb-4">
              <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Cookie Type</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Purpose</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Duration</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Third-Party</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  <tr>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">Analytics</td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">Track pageviews, user flow</td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">2 years</td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">Vercel</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">Performance</td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">Monitor site speed</td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">Session</td>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">Vercel</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
              Managing Cookies
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              You can control cookies through your browser settings:
            </p>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li><strong>Chrome:</strong> Settings → Privacy → Cookies</li>
              <li><strong>Firefox:</strong> Preferences → Privacy → Cookies</li>
              <li><strong>Safari:</strong> Preferences → Privacy → Manage Website Data</li>
            </ul>
            <p className="text-gray-600 dark:text-gray-400 text-sm mt-3">
              <strong>Note:</strong> Disabling cookies may limit website functionality.
            </p>
          </section>

          {/* Data Protection Rights */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Your Data Protection Rights
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Under GDPR (EU) and CCPA (California), you have the right to:
            </p>
            <ul className="space-y-3 text-gray-700 dark:text-gray-300">
              <li><strong>Right to Access:</strong> Request a copy of the data we hold about you (if any)</li>
              <li><strong>Right to Rectification:</strong> Request correction of inaccurate data</li>
              <li><strong>Right to Erasure ("Right to be Forgotten"):</strong> Request deletion of your data</li>
              <li><strong>Right to Restrict Processing:</strong> Request limitation of how we use your data</li>
              <li><strong>Right to Data Portability:</strong> Request transfer of your data to another service</li>
              <li><strong>Right to Object:</strong> Object to processing of your data for certain purposes</li>
            </ul>
            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg mt-4">
              <p className="text-purple-900 dark:text-purple-100">
                <strong>To exercise your rights:</strong>{' '}
                <a 
                  href="https://github.com/travelfreedomindex/travelfreedomindex-website/issues" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="underline hover:text-purple-700 dark:hover:text-purple-300"
                >
                  Open a GitHub issue
                </a>
              </p>
              <p className="text-purple-800 dark:text-purple-200 text-sm mt-2 mb-0">
                Response time: Within 30 days
              </p>
            </div>
          </section>

          {/* Data Security */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Data Security
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              We implement reasonable security measures:
            </p>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li>✓ HTTPS/TLS encryption for all traffic</li>
              <li>✓ Secure hosting on Vercel's infrastructure</li>
              <li>✓ No storage of sensitive personal information</li>
              <li>✓ Regular security updates</li>
            </ul>
            <p className="text-gray-600 dark:text-gray-400 text-sm mt-4">
              <strong>However:</strong> No internet transmission is 100% secure. We cannot guarantee absolute security.
            </p>
          </section>

          {/* Children's Privacy */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Children's Privacy
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              Our website is not directed to children under 13 (or 16 in the EU). We do not knowingly collect data 
              from children. If you believe a child has provided us with personal information, contact us immediately.
            </p>
          </section>

          {/* Changes to Policy */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Changes to This Privacy Policy
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              We may update this policy periodically. Changes will be posted on this page with a new "Last Updated" date. 
              Material changes will be prominently announced on our homepage.
            </p>
          </section>

          {/* Contact */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Contact Us
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              For privacy-related questions or requests:
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
              <p>
                <strong>Website:</strong>{' '}
                <a href="https://travelfreedomindex.com" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
                  travelfreedomindex.com
                </a>
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
