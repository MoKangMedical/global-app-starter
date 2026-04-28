'use client';
 
import {useState} from 'react';
import {useTranslations} from 'next-intl';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {Menu, X, Globe} from 'lucide-react';
 
const locales = ['en', 'zh', 'ja', 'ko', 'es', 'fr', 'de', 'pt'];
 
export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const t = useTranslations('nav');
  const pathname = usePathname();
 
  const getCurrentLocale = () => {
    const segments = pathname.split('/');
    return segments[1] || 'en';
  };
 
  const getLocalizedPath = (locale: string) => {
    const segments = pathname.split('/');
    segments[1] = locale;
    return segments.join('/');
  };
 
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
        <div className="flex lg:flex-1">
          <Link href={`/${getCurrentLocale()}`} className="-m-1.5 p-1.5">
            <span className="text-xl font-bold text-primary-600">Global App</span>
          </Link>
        </div>
 
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
 
        <div className="hidden lg:flex lg:gap-x-12">
          <Link href={`/${getCurrentLocale()}#features`} className="text-sm font-semibold leading-6 text-gray-900">
            {t('features')}
          </Link>
          <Link href={`/${getCurrentLocale()}#pricing`} className="text-sm font-semibold leading-6 text-gray-900">
            {t('pricing')}
          </Link>
          <Link href={`/${getCurrentLocale()}/about`} className="text-sm font-semibold leading-6 text-gray-900">
            {t('about')}
          </Link>
          <Link href={`/${getCurrentLocale()}/contact`} className="text-sm font-semibold leading-6 text-gray-900">
            {t('contact')}
          </Link>
        </div>
 
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4">
          {/* Language Switcher */}
          <div className="relative">
            <button
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="flex items-center gap-1 text-sm font-semibold text-gray-900"
            >
              <Globe className="h-4 w-4" />
              {getCurrentLocale().toUpperCase()}
            </button>
            {langMenuOpen && (
              <div className="absolute right-0 mt-2 w-20 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
                {locales.map((locale) => (
                  <Link
                    key={locale}
                    href={getLocalizedPath(locale)}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setLangMenuOpen(false)}
                  >
                    {locale.toUpperCase()}
                  </Link>
                ))}
              </div>
            )}
          </div>
 
          <Link href={`/${getCurrentLocale()}/login`} className="text-sm font-semibold leading-6 text-gray-900">
            {t('login')}
          </Link>
          <Link
            href={`/${getCurrentLocale()}/signup`}
            className="rounded-md bg-primary-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-500"
          >
            {t('signup')}
          </Link>
        </div>
      </nav>
 
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden">
          <div className="fixed inset-0 z-50" />
          <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <Link href={`/${getCurrentLocale()}`} className="-m-1.5 p-1.5">
                <span className="text-xl font-bold text-primary-600">Global App</span>
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  <Link
                    href={`/${getCurrentLocale()}#features`}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t('features')}
                  </Link>
                  <Link
                    href={`/${getCurrentLocale()}#pricing`}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t('pricing')}
                  </Link>
                  <Link
                    href={`/${getCurrentLocale()}/about`}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t('about')}
                  </Link>
                  <Link
                    href={`/${getCurrentLocale()}/contact`}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t('contact')}
                  </Link>
                </div>
                <div className="py-6">
                  <Link
                    href={`/${getCurrentLocale()}/login`}
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t('login')}
                  </Link>
                  <Link
                    href={`/${getCurrentLocale()}/signup`}
                    className="-mx-3 block rounded-lg bg-primary-600 px-3 py-2.5 text-center text-base font-semibold text-white hover:bg-primary-500"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t('signup')}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
