'use client';
 
import {usePathname, useSearchParams} from 'next/navigation';
import {useEffect} from 'react';
 
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}
 
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID;
 
export function pageview(url: string) {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }
}
 
export function GoogleAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
 
  useEffect(() => {
    if (pathname) {
      const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
      pageview(url);
    }
  }, [pathname, searchParams]);
 
  if (!GA_MEASUREMENT_ID) {
    return null;
  }
 
  return (
    <>
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  );
}
