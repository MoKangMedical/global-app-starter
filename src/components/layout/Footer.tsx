'use client';
 
import {useTranslations} from 'next-intl';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {Github, Twitter, Linkedin} from 'lucide-react';
 
export default function Footer() {
  const t = useTranslations('footer');
  const pathname = usePathname();
  const currentLocale = pathname.split('/')[1] || 'en';
 
  return (
    <footer className="bg-gray-900 text-white">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold">Global App</h3>
            <p className="mt-4 text-gray-400">
              Building the future of global collaboration
            </p>
            <div className="mt-6 flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white">
                <Github className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </div>
 
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider">
              Product
            </h4>
            <ul className="mt-4 space-y-4">
              <li>
                <Link href={`/${currentLocale}#features`} className="text-gray-400 hover:text-white">
                  Features
                </Link>
              </li>
              <li>
                <Link href={`/${currentLocale}#pricing`} className="text-gray-400 hover:text-white">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href={`/${currentLocale}/docs`} className="text-gray-400 hover:text-white">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href={`/${currentLocale}/changelog`} className="text-gray-400 hover:text-white">
                  Changelog
                </Link>
              </li>
            </ul>
          </div>
 
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider">
              Legal
            </h4>
            <ul className="mt-4 space-y-4">
              <li>
                <Link href={`/${currentLocale}/privacy`} className="text-gray-400 hover:text-white">
                  {t('links.privacy')}
                </Link>
              </li>
              <li>
                <Link href={`/${currentLocale}/terms`} className="text-gray-400 hover:text-white">
                  {t('links.terms')}
                </Link>
              </li>
              <li>
                <Link href={`/${currentLocale}/cookies`} className="text-gray-400 hover:text-white">
                  {t('links.cookies')}
                </Link>
              </li>
            </ul>
          </div>
        </div>
 
        <div className="mt-12 border-t border-gray-800 pt-8">
          <p className="text-center text-gray-400">
            {t('copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
}
