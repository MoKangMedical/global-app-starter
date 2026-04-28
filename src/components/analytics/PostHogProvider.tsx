'use client';
 
import {useEffect} from 'react';
import {usePathname, useSearchParams} from 'next/navigation';
import posthog from 'posthog-js';
import {PostHogProvider as PHProvider} from 'posthog-js/react';
 
export function PostHogProvider({children}: {children: React.ReactNode}) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
        api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com',
        // Enable debug mode in development
        loaded: (posthog) => {
          if (process.env.NODE_ENV === 'development') posthog.debug();
        },
        // Capture pageviews automatically
        capture_pageview: false, // We'll capture manually
        capture_pageleave: true,
        // Persistence settings
        persistence: 'localStorage+cookie',
        // Autocapture settings
        autocapture: true,
        // Session recording
        session_recording: {
          maskAllInputs: false,
          maskInputOptions: {
            password: true,
          },
        },
      });
    }
  }, []);
 
  return <PHProvider client={posthog}>{children}</PHProvider>;
}
 
export function PostHogPageview(): JSX.Element {
  const pathname = usePathname();
  const searchParams = useSearchParams();
 
  useEffect(() => {
    if (pathname) {
      let url = window.origin + pathname;
      if (searchParams && searchParams.toString()) {
        url = url + `?${searchParams.toString()}`;
      }
      posthog.capture('$pageview', {
        $current_url: url,
      });
    }
  }, [pathname, searchParams]);
 
  return <></>;
}
