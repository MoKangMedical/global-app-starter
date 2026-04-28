'use client';
 
import {useTranslations} from 'next-intl';
import Link from 'next/link';
import {ArrowRight} from 'lucide-react';
 
export default function Hero() {
  const t = useTranslations('hero');
 
  return (
    <div className="relative isolate overflow-hidden bg-gradient-to-b from-primary-100/20">
      <div className="mx-auto max-w-7xl pb-24 pt-10 sm:pb-32 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:py-40">
        <div className="px-6 lg:px-0 lg:pt-4">
          <div className="mx-auto max-w-2xl">
            <div className="max-w-lg">
              <h1 className="mt-10 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                {t('title')}
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                {t('subtitle')}
              </p>
              <div className="mt-10 flex items-center gap-x-6">
                <Link
                  href="/signup"
                  className="rounded-md bg-primary-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
                >
                  {t('cta')}
                </Link>
                <a href="#features" className="text-sm font-semibold leading-6 text-gray-900">
                  Learn more <ArrowRight className="inline h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-20 sm:mt-24 md:mx-auto md:max-w-2xl lg:mx-0 lg:mt-0 lg:w-screen">
          <div className="absolute inset-y-0 right-1/2 -z-10 -mr-10 w-[200%] skew-x-[-30deg] bg-white shadow-xl shadow-primary-600/10 ring-1 ring-primary-50 md:-mr-20 lg:-mr-36" />
          <div className="shadow-lg md:rounded-2xl">
            <div className="bg-primary-500 [clip-path:inset(0)] md:[clip-path:inset(0_round_theme(borderRadius.2xl))]">
              <div className="absolute -inset-y-px left-1/2 -z-10 ml-10 w-[200%] skew-x-[-30deg] bg-primary-100 opacity-20 ring-1 ring-inset ring-white md:ml-20 lg:ml-36" />
              <div className="relative px-6 pt-8 sm:pt-16 md:pl-16 md:pr-0">
                <div className="mx-auto max-w-2xl md:mx-0 md:max-w-none">
                  <div className="w-screen overflow-hidden rounded-tl-xl bg-gray-900">
                    <div className="flex bg-gray-800/40 ring-1 ring-white/5">
                      <div className="-mb-px flex text-sm font-medium leading-6 text-gray-400">
                        <div className="border-b border-r border-b-white/20 border-r-white/10 bg-white/5 px-4 py-2 text-white">
                          app.jsx
                        </div>
                        <div className="border-r border-gray-600/10 px-4 py-2">
                          components/
                        </div>
                      </div>
                    </div>
                    <div className="px-6 pb-14 pt-6">
                      <pre className="text-sm leading-6 text-gray-300">
                        <code>
{`export default function App() {
  return (
    <div className="app">
      <Header />
      <Main />
      <Footer />
    </div>
  )
}`}
                        </code>
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
