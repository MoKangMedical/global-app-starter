'use client';
 
import {useTranslations} from 'next-intl';
import {Zap, Shield, Globe, Headphones} from 'lucide-react';
 
const features = [
  {
    name: 'speed',
    icon: Zap,
  },
  {
    name: 'security',
    icon: Shield,
  },
  {
    name: 'scalability',
    icon: Globe,
  },
  {
    name: 'support',
    icon: Headphones,
  },
];
 
export default function Features() {
  const t = useTranslations('features');
 
  return (
    <div id="features" className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-primary-600">
            {t('subtitle')}
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {t('title')}
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primary-600">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  {t(`items.${feature.name}.title`)}
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  {t(`items.${feature.name}.description`)}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
