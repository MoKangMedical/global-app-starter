import createMiddleware from 'next-intl/middleware';
import {locales, defaultLocale} from './i18n/request';
 
export default createMiddleware({
  // A list of all locales that are supported
  locales: locales,
  
  // Used when no locale matches
  defaultLocale: defaultLocale,
  
  // Always show locale prefix
  localePrefix: 'always',
  
  // Detect locale from Accept-Language header, cookies, etc.
  localeDetection: true
});
 
export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(zh|en|ja|ko|es|fr|de|pt)/:path*']
};
