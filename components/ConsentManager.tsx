'use client';

import { useEffect, useState } from 'react';

declare global {
  interface Window {
    adsbygoogle: any[];
    __tcfapi: any;
  }
}

interface ConsentManagerProps {
  children: React.ReactNode;
}

export default function ConsentManager({ children }: ConsentManagerProps) {
  const [consentLoaded, setConsentLoaded] = useState(false);

  useEffect(() => {
    // Initialize consent management
    const initializeConsent = () => {
      // Check if TCF __tcfapi is available (Google's CMP)
      if (typeof window.__tcfapi !== 'undefined') {
        window.__tcfapi('addEventListener', 2, (tcData: any, success: boolean) => {
          if (success && tcData.eventStatus === 'tcloaded') {
            setConsentLoaded(true);
            
            // Initialize AdSense after consent is loaded
            if (tcData.purpose.consents[1] || tcData.purpose.legitimateInterests[1]) {
              // User has consented to personalized ads
              initializeAds();
            } else {
              // User has not consented, initialize non-personalized ads
              initializeNonPersonalizedAds();
            }
          }
        });
      } else {
        // Fallback if CMP is not loaded - wait and try again
        setTimeout(initializeConsent, 100);
      }
    };

    const initializeAds = () => {
      try {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({
          google_ad_client: "ca-pub-2341434356475761",
          enable_page_level_ads: true
        });
      } catch (err) {
        console.error('AdSense initialization error:', err);
      }
    };

    const initializeNonPersonalizedAds = () => {
      try {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({
          google_ad_client: "ca-pub-2341434356475761",
          enable_page_level_ads: true,
          google_ad_modifications: {
            eids: "42531706"  // Non-personalized ads ID
          }
        });
      } catch (err) {
        console.error('Non-personalized AdSense initialization error:', err);
      }
    };

    // Start the consent initialization process
    initializeConsent();
  }, []);

  return <>{children}</>;
}