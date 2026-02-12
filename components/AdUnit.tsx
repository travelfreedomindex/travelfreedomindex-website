'use client';

import { useEffect } from 'react';

interface AdUnitProps {
  adSlot: string;
  format?: 'auto' | 'rectangle' | 'horizontal' | 'vertical';
  style?: React.CSSProperties;
  className?: string;
}

export default function AdUnit({ 
  adSlot, 
  format = 'auto', 
  style,
  className = ''
}: AdUnitProps) {
  useEffect(() => {
    try {
      // Initialize ad unit
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
    } catch (err) {
      console.error('AdSense AdUnit error:', err);
    }
  }, []);

  // Don't render ads during development
  if (process.env.NODE_ENV === 'development') {
    return (
      <div 
        className={`bg-gray-200 dark:bg-gray-700 border-2 border-dashed border-gray-400 p-4 text-center text-sm text-gray-600 dark:text-gray-400 ${className}`}
        style={style}
      >
        AdSense Ad Unit (Slot: {adSlot})
        <br />
        <span className="text-xs">Hidden in development</span>
      </div>
    );
  }

  return (
    <ins
      className={`adsbygoogle ${className}`}
      style={{ 
        display: 'block',
        ...style 
      }}
      data-ad-client="ca-pub-2341434356475761"
      data-ad-slot={adSlot}
      data-ad-format={format}
      data-full-width-responsive="true"
    />
  );
}