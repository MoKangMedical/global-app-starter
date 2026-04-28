'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { 
  Globe, 
  CreditCard, 
  Shield, 
  FlaskConical, 
  BarChart3, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  ArrowRight,
  Play,
  Pause
} from 'lucide-react';

interface Feature {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  status: 'implemented' | 'in-progress' | 'planned';
  progress: number;
}

const features: Feature[] = [
  {
    id: 'i18n',
    title: 'Internationalization',
    description: 'Multi-language support with dynamic routing and localized content',
    icon: <Globe className="w-6 h-6" />,
    status: 'implemented',
    progress: 100
  },
  {
    id: 'payment',
    title: 'Global Payments',
    description: 'Multi-currency payment processing with Stripe integration',
    icon: <CreditCard className="w-6 h-6" />,
    status: 'implemented',
    progress: 85
  },
  {
    id: 'compliance',
    title: 'Compliance & Security',
    description: 'GDPR, HIPAA, and regional compliance tools',
    icon: <Shield className="w-6 h-6" />,
    status: 'in-progress',
    progress: 70
  },
  {
    id: 'clinical',
    title: 'Clinical Validation',
    description: 'Multi-regional clinical trial management and regulatory tracking',
    icon: <FlaskConical className="w-6 h-6" />,
    status: 'in-progress',
    progress: 60
  },
  {
    id: 'analytics',
    title: 'Analytics & Monitoring',
    description: 'User behavior analytics and performance monitoring',
    icon: <BarChart3 className="w-6 h-6" />,
    status: 'implemented',
    progress: 90
  }
];

export default function DemoPage() {
  const t = useTranslations('demo');
  const [activeFeature, setActiveFeature] = useState<string>('i18n');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  // 演示步骤
  const demoSteps = [
    {
      title: 'Select Country',
      description: 'Choose your target market from 10+ countries',
      component: 'CountrySelector'
    },
    {
      title: 'Convert Currency',
      description: 'Real-time currency conversion with live rates',
      component: 'CurrencyConverter'
    },
    {
      title: 'Manage Consent',
      description: 'GDPR-compliant cookie consent management',
      component: 'GDPRConsent'
    },
    {
      title: 'Track Trials',
      description: 'Monitor clinical trials across regions',
      component: 'ClinicalTrialTracker'
    }
  ];

  // 自动播放演示
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentStep((prev) => (prev + 1) % demoSteps.length);
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, demoSteps.length]);

  // 获取状态颜色
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'implemented':
        return 'text-green-600 bg-green-100';
      case 'in-progress':
        return 'text-yellow-600 bg-yellow-100';
      case 'planned':
        return 'text-gray-600 bg-gray-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  // 获取状态图标
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'implemented':
        return <CheckCircle className="w-4 h-4" />;
      case 'in-progress':
        return <Clock className="w-4 h-4" />;
      case 'planned':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* 头部 */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Globe className="w-8 h-8 text-primary-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  {t('title') || '出海之父 Demo'}
                </h1>
                <p className="text-sm text-gray-600">
                  {t('subtitle') || 'Experience the power of global expansion'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-4 h-4" />
                    {t('pause') || 'Pause'}
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4" />
                    {t('play') || 'Play Demo'}
                  </>
                )}
              </button>
              <a
                href="/dashboard"
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
              >
                {t('dashboard') || 'Dashboard'}
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* 主内容 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 标题 */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {t('mainTitle') || '出海能力全景展示'}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('mainDescription') || '体验出海之父提供的完整国际化能力框架，从多语言支持到全球支付，从合规管理到临床验证。'}
          </p>
        </div>

        {/* 功能展示 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* 功能列表 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {t('capabilities') || '核心能力'}
            </h3>
            <div className="space-y-4">
              {features.map((feature) => (
                <div
                  key={feature.id}
                  className={`p-4 rounded-lg cursor-pointer transition-colors ${
                    activeFeature === feature.id
                      ? 'bg-primary-50 border-2 border-primary-500'
                      : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                  onClick={() => setActiveFeature(feature.id)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary-100 rounded-lg text-primary-600">
                        {feature.icon}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{feature.title}</h4>
                        <p className="text-sm text-gray-600">{feature.description}</p>
                      </div>
                    </div>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(feature.status)}`}>
                      <span className="flex items-center gap-1">
                        {getStatusIcon(feature.status)}
                        {feature.status.replace('-', ' ')}
                      </span>
                    </span>
                  </div>
                  <div className="mt-2">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-600">{t('progress') || 'Progress'}</span>
                      <span className="text-sm font-medium">{feature.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          feature.status === 'implemented' ? 'bg-green-500' :
                          feature.status === 'in-progress' ? 'bg-yellow-500' : 'bg-gray-400'
                        }`}
                        style={{ width: `${feature.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 演示区域 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {t('demo') || 'Interactive Demo'}
              </h3>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">
                  {t('step') || 'Step'} {currentStep + 1} / {demoSteps.length}
                </span>
                <button
                  onClick={() => setCurrentStep((prev) => (prev + 1) % demoSteps.length)}
                  className="p-1 text-gray-500 hover:text-gray-700"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* 演示步骤 */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 font-medium">
                  {currentStep + 1}
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{demoSteps[currentStep].title}</h4>
                  <p className="text-sm text-gray-600">{demoSteps[currentStep].description}</p>
                </div>
              </div>
            </div>

            {/* 演示组件 */}
            <div className="bg-gray-50 rounded-lg p-6 min-h-[300px]">
              {demoSteps[currentStep].component === 'CountrySelector' && (
                <div className="text-center">
                  <Globe className="w-12 h-12 text-primary-600 mx-auto mb-4" />
                  <h4 className="text-lg font-medium text-gray-900 mb-2">
                    {t('countrySelector.title') || 'Country Selector'}
                  </h4>
                  <p className="text-gray-600 mb-4">
                    {t('countrySelector.description') || 'Select your target market from 10+ countries with automatic currency detection.'}
                  </p>
                  <div className="flex justify-center gap-2">
                    {['🇺🇸', '🇨🇳', '🇬🇧', '🇯🇵', '🇰🇷'].map((flag, index) => (
                      <button
                        key={index}
                        className="p-2 bg-white rounded-md shadow-sm hover:shadow-md transition-shadow"
                      >
                        <span className="text-2xl">{flag}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {demoSteps[currentStep].component === 'CurrencyConverter' && (
                <div className="text-center">
                  <CreditCard className="w-12 h-12 text-primary-600 mx-auto mb-4" />
                  <h4 className="text-lg font-medium text-gray-900 mb-2">
                    {t('currencyConverter.title') || 'Currency Converter'}
                  </h4>
                  <p className="text-gray-600 mb-4">
                    {t('currencyConverter.description') || 'Real-time currency conversion with live exchange rates and trend indicators.'}
                  </p>
                  <div className="bg-white rounded-md p-4 max-w-xs mx-auto">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-600">USD</span>
                      <span className="font-medium">$100.00</span>
                    </div>
                    <div className="flex items-center justify-center my-2">
                      <ArrowRight className="w-4 h-4 text-gray-400" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">CNY</span>
                      <span className="font-medium">¥724.00</span>
                    </div>
                  </div>
                </div>
              )}

              {demoSteps[currentStep].component === 'GDPRConsent' && (
                <div className="text-center">
                  <Shield className="w-12 h-12 text-primary-600 mx-auto mb-4" />
                  <h4 className="text-lg font-medium text-gray-900 mb-2">
                    {t('gdpr.title') || 'GDPR Consent'}
                  </h4>
                  <p className="text-gray-600 mb-4">
                    {t('gdpr.description') || 'GDPR-compliant cookie consent management with customizable categories.'}
                  </p>
                  <div className="bg-white rounded-md p-4 max-w-xs mx-auto">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                      <span className="text-sm">Necessary Cookies</span>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                      <span className="text-sm">Analytics Cookies</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
                      <span className="text-sm">Marketing Cookies</span>
                    </div>
                  </div>
                </div>
              )}

              {demoSteps[currentStep].component === 'ClinicalTrialTracker' && (
                <div className="text-center">
                  <FlaskConical className="w-12 h-12 text-primary-600 mx-auto mb-4" />
                  <h4 className="text-lg font-medium text-gray-900 mb-2">
                    {t('clinical.title') || 'Clinical Trial Tracker'}
                  </h4>
                  <p className="text-gray-600 mb-4">
                    {t('clinical.description') || 'Monitor clinical trials across regions with regulatory status tracking.'}
                  </p>
                  <div className="bg-white rounded-md p-4 max-w-xs mx-auto">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-600">US Trial</span>
                      <span className="text-green-600 font-medium">Active</span>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-600">EU Trial</span>
                      <span className="text-yellow-600 font-medium">Recruiting</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Japan Trial</span>
                      <span className="text-blue-600 font-medium">Planning</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 步骤指示器 */}
            <div className="flex justify-center gap-2 mt-4">
              {demoSteps.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentStep(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    currentStep === index ? 'bg-primary-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* 统计数据 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
            {t('statistics') || '出海能力统计'}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-primary-50 rounded-lg">
              <div className="text-3xl font-bold text-primary-600">10+</div>
              <div className="text-sm text-gray-600">{t('countries') || 'Supported Countries'}</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-3xl font-bold text-green-600">5</div>
              <div className="text-sm text-gray-600">{t('coreCapabilities') || 'Core Capabilities'}</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-3xl font-bold text-blue-600">79%</div>
              <div className="text-sm text-gray-600">{t('overallProgress') || 'Overall Progress'}</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-3xl font-bold text-purple-600">24/7</div>
              <div className="text-sm text-gray-600">{t('support') || 'Global Support'}</div>
            </div>
          </div>
        </div>

        {/* 行动号召 */}
        <div className="bg-primary-600 rounded-lg p-6 text-white">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold mb-2">
                {t('ready') || '准备好出海了吗？'}
              </h3>
              <p className="text-primary-100">
                {t('readyDescription') || '您的平台已具备国际化基础，让我们帮助您开拓新市场。'}
              </p>
            </div>
            <div className="flex gap-4">
              <a
                href="/dashboard"
                className="flex items-center gap-2 px-6 py-3 bg-white text-primary-600 rounded-md font-medium hover:bg-primary-50 transition-colors"
              >
                {t('exploreDashboard') || 'Explore Dashboard'}
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="https://github.com/MoKangMedical/global-app-starter"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 border border-white text-white rounded-md font-medium hover:bg-primary-700 transition-colors"
              >
                {t('viewOnGitHub') || 'View on GitHub'}
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}