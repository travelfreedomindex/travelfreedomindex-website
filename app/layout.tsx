import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ThemeProvider } from '@/components/ThemeProvider';
import { GoogleAnalytics } from '@next/third-parties/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://travelfreedomindex.com'),
  title: {
    default: 'Travel Freedom Index - Measuring True Passport Power',
    template: '%s | Travel Freedom Index'
  },
  description: 'Discover passport rankings based on visa-free travel and diplomatic reciprocity. Compare 200+ countries using our Travel Freedom Index (TFI) and Reciprocity-Adjusted Travel Freedom Index (RATFI).',
  keywords: ['passport ranking', 'visa free travel', 'passport power', 'diplomatic reciprocity', 'travel freedom index', 'global mobility', 'visa requirements', 'travel freedom', 'TFI', 'RATFI'],
  authors: [{ name: 'Travel Freedom Index Team' }],
  creator: 'Travel Freedom Index',
  publisher: 'Travel Freedom Index',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://travelfreedomindex.com',
    siteName: 'Travel Freedom Index',
    title: 'Travel Freedom Index - Measuring True Passport Power',
    description: 'Discover which passports truly excel at diplomatic reciprocity, not just visa-free access.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Travel Freedom Index',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Travel Freedom Index - Measuring True Passport Power',
    description: 'Discover which passports truly excel at diplomatic reciprocity, not just visa-free access.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2341434356475761"
          crossOrigin="anonymous"
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
        <GoogleAnalytics gaId="G-EC5PK0C57H" />
      </body>
    </html>
  );
}
