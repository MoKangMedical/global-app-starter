'use client';
 
import {useTranslations} from 'next-intl';
import {Check} from 'lucide-react';
 
const plans = [
  {
    name: 'starter',
    price: '$9',
    period: '/month',
    description: 'Perfect for individuals',
    features: [
      '5 projects',
      '10GB storage',
      'Basic analytics',
      'Email support',
    ],
    cta: 'Get Started',
    popular: false,
  },
  {
    name: 'pro',
    price: '$29',
    period: '/month',
    description: 'Best for small teams',
    features: [
      'Unlimited projects',
      '100GB storage',
      'Advanced analytics',
      'Priority support',
      'API access',
      'Custom integrations',
    ],
    cta: 'Get Started',
    popular: true,
  },
  {
    name: 'enterprise',
    price: 'Custom',
    period: '',
    description: 'For large organizations',
    features: [
      'Unlimited everything',
      'Dedicated support',
      'Custom SLA',
      'On-premise option',
      'SSO & SAML',
      'Audit logs',
    ],
    cta: 'Contact Sales',
    popular: false,
  },
];
 
export default function Pricing() {
  const t = useTranslations('pricing');
 
  return (
    <div id="pricing" className="bg-gray-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-base font-semibold leading-7 text-primary-600">
            {t('subtitle')}
          </h2>
          <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            {t('title')}
          </p>
        </div>
        <div className="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-y-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {plans.map((plan, planIdx) => (
            <div
              key={plan.name}
              className={`flex flex-col justify-between rounded-3xl bg-white p-8 ring-1 ring-gray-200 xl:p-10 ${
                planIdx === 1 ? 'lg:z-10 lg:rounded-b-none' : ''
              } ${planIdx === 0 ? 'lg:rounded-r-none' : ''} ${
                planIdx === 2 ? 'lg:rounded-l-none' : ''
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-x-4">
                  <h3
                    id={plan.name}
                    className={`text-lg font-semibold leading-8 ${
                      plan.popular ? 'text-primary-600' : 'text-gray-900'
                    }`}
                  >
                    {t(`plans.${plan.name}.name`)}
                  </h3>
                  {plan.popular && (
                    <p className="rounded-full bg-primary-600/10 px-2.5 py-1 text-xs font-semibold leading-5 text-primary-600">
                      {t(`plans.${plan.name}.popular`)}
                    </p>
                  )}
                </div>
                <p className="mt-4 text-sm leading-6 text-gray-600">
                  {t(`plans.${plan.name}.description`)}
                </p>
                <p className="mt-6 flex items-baseline gap-x-1">
                  <span className="text-4xl font-bold tracking-tight text-gray-900">
                    {t(`plans.${plan.name}.price`)}
                  </span>
                  <span className="text-sm font-semibold leading-6 text-gray-600">
                    {t(`plans.${plan.name}.period`)}
                  </span>
                </p>
                <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-gray-600">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex gap-x-3">
                      <Check className="h-6 w-5 flex-none text-primary-600" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <a
                href={plan.name === 'enterprise' ? '/contact' : '/signup'}
                aria-describedby={plan.name}
                className={`mt-8 block rounded-md px-3 py-2 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
                  plan.popular
                    ? 'bg-primary-600 text-white shadow-sm hover:bg-primary-500 focus-visible:outline-primary-600'
                    : 'bg-primary-50 text-primary-600 hover:bg-primary-100'
                }`}
              >
                {t(`plans.${plan.name}.cta`)}
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
