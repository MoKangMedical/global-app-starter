import {getRequestConfig} from 'next-intl/server';
import {headers} from 'next/headers';
 
export const locales = ['en', 'zh', 'ja', 'ko', 'es', 'fr', 'de', 'pt'] as const;
export type Locale = typeof locales[number];
 
export default getRequestConfig(async ({locale}) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as Locale)) {
    // Fallback to default locale
    locale = 'en';
  }
 
  return {
    messages: (await import(`../messages/${locale}.json`)).default,
    timeZone: 'Asia/Shanghai',
    now: new Date()
  };
});
