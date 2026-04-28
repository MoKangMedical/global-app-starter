'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import CheckoutForm from '@/components/payment/CheckoutForm';
import { 
  Check, 
  Star, 
  Zap, 
  Building2, 
  ArrowRight,
  Globe,
  Shield,
  CreditCard,
  Clock
} from 'lucide-react';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  interval?: 'month' | 'year' | 'one-time';
  features: string[];
  popular?: boolean;
  icon: React.ReactNode;
}

const products: Product[] = [
  {
    id: 'starter',
    name: 'Starter',
    description: 'Perfect for testing and small projects',
    price: 9,
    currency: 'USD',
    interval: 'month',
    features: [
      'Basic i18n support',
      '2 languages',
      'Community support',
      'Basic analytics',
      '1,000 API calls/month',
      'Standard response time'
    ],
    icon: <Star className="w-6 h-6" />
  },
  {
    id: 'pro',
    name: 'Professional',
    description: 'For growing businesses ready to expand',
    price: 49,
    currency: 'USD',
    interval: 'month',
    features: [
      'Full i18n framework',
      'Unlimited languages',
      'Payment integration',
      'GDPR compliance',
      'Priority support',
      'Advanced analytics',
      '50,000 API calls/month',
      'Custom domains',
      '24-hour response time'
    ],
    popular: true,
    icon: <Zap className="w-6 h-6" />
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'For large organizations with complex needs',
    price: 199,
    currency: 'USD',
    interval: 'month',
    features: [
      'Everything in Pro',
      'Clinical trial management',
      'Regulatory compliance',
      'Dedicated support',
      'Custom integrations',
      'SLA guarantee',
      'Unlimited API calls',
      'White-label options',
      'On-premise deployment',
      '1-hour response time',
      'Custom training'
    ],
    icon: <Building2 className="w-6 h-6" />
  }
];

export default function CheckoutPage() {
  const t = useTranslations('checkout');
  const [selectedProduct, setSelectedProduct] = useState<Product>(products[1]); // 默认选择 Pro
  const [step, setStep] = useState<'select' | 'payment' | 'success'>('select');
  const [paymentId, setPaymentId] = useState<string>('');

  // 处理支付成功
  const handleSuccess = (id: string) => {
    setPaymentId(id);
    setStep('success');
  };

  // 处理支付失败
  const handleError = (error: string) => {
    alert(`Payment failed: ${error}`);
  };

  // 返回选择
  const handleBack = () => {
    setStep('select');
  };

  // 继续支付
  const handleContinue = () => {
    setStep('payment');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 头部 */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Globe className="w-8 h-8 text-primary-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  {t('title') || 'Checkout'}
                </h1>
                <p className="text-sm text-gray-600">
                  {t('subtitle') || 'Choose your plan and complete payment'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Shield className="w-4 h-4" />
                <span>{t('secure') || 'Secure Checkout'}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 主内容 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 步骤指示器 */}
        <div className="mb-8">
          <div className="flex items-center justify-center">
            <div className={`flex items-center ${step === 'select' ? 'text-primary-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step === 'select' ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                1
              </div>
              <span className="ml-2 font-medium">{t('selectPlan') || 'Select Plan'}</span>
            </div>
            <div className="w-16 h-1 mx-4 bg-gray-200">
              <div className={`h-full ${step !== 'select' ? 'bg-primary-600' : ''}`} />
            </div>
            <div className={`flex items-center ${step === 'payment' ? 'text-primary-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step === 'payment' ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                2
              </div>
              <span className="ml-2 font-medium">{t('payment') || 'Payment'}</span>
            </div>
            <div className="w-16 h-1 mx-4 bg-gray-200">
              <div className={`h-full ${step === 'success' ? 'bg-primary-600' : ''}`} />
            </div>
            <div className={`flex items-center ${step === 'success' ? 'text-primary-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step === 'success' ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                3
              </div>
              <span className="ml-2 font-medium">{t('complete') || 'Complete'}</span>
            </div>
          </div>
        </div>

        {/* 步骤 1: 选择计划 */}
        {step === 'select' && (
          <div>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {t('choosePlan') || 'Choose Your Plan'}
              </h2>
              <p className="text-gray-600">
                {t('choosePlanDescription') || 'Select the plan that best fits your needs'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {products.map((product) => (
                <div
                  key={product.id}
                  className={`relative bg-white rounded-lg shadow-md p-6 cursor-pointer transition-all ${
                    selectedProduct.id === product.id
                      ? 'ring-2 ring-primary-500 shadow-lg'
                      : 'hover:shadow-lg'
                  }`}
                  onClick={() => setSelectedProduct(product)}
                >
                  {product.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="px-3 py-1 text-xs font-medium bg-primary-600 text-white rounded-full">
                        {t('mostPopular') || 'Most Popular'}
                      </span>
                    </div>
                  )}

                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-primary-100 rounded-lg text-primary-600">
                      {product.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                      <p className="text-sm text-gray-600">{product.description}</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold text-gray-900">
                        ${product.price}
                      </span>
                      <span className="text-gray-600">
                        /{product.interval === 'month' ? t('month') || 'month' : 
                           product.interval === 'year' ? t('year') || 'year' : 
                           t('oneTime') || 'one-time'}
                      </span>
                    </div>
                  </div>

                  <ul className="space-y-2 mb-6">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                        <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    type="button"
                    className={`w-full py-2 px-4 rounded-md font-medium transition-colors ${
                      selectedProduct.id === product.id
                        ? 'bg-primary-600 text-white hover:bg-primary-700'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {selectedProduct.id === product.id 
                      ? (t('selected') || 'Selected') 
                      : (t('select') || 'Select')}
                  </button>
                </div>
              ))}
            </div>

            {/* 继续按钮 */}
            <div className="flex justify-center">
              <button
                onClick={handleContinue}
                className="flex items-center gap-2 px-8 py-3 bg-primary-600 text-white rounded-md font-medium hover:bg-primary-700 transition-colors"
              >
                {t('continueToPayment') || 'Continue to Payment'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* 特性对比 */}
            <div className="mt-12 bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
                {t('whyChooseUs') || 'Why Choose Us?'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="p-3 bg-primary-100 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                    <Globe className="w-6 h-6 text-primary-600" />
                  </div>
                  <h4 className="font-medium text-gray-900 mb-1">
                    {t('globalCoverage') || 'Global Coverage'}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {t('globalCoverageDescription') || 'Support for 135+ currencies and 45+ countries'}
                  </p>
                </div>
                <div className="text-center">
                  <div className="p-3 bg-green-100 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                    <Shield className="w-6 h-6 text-green-600" />
                  </div>
                  <h4 className="font-medium text-gray-900 mb-1">
                    {t('securePayments') || 'Secure Payments'}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {t('securePaymentsDescription') || 'PCI DSS Level 1 certified with 256-bit encryption'}
                  </p>
                </div>
                <div className="text-center">
                  <div className="p-3 bg-blue-100 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                    <Clock className="w-6 h-6 text-blue-600" />
                  </div>
                  <h4 className="font-medium text-gray-900 mb-1">
                    {t('instantProcessing') || 'Instant Processing'}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {t('instantProcessingDescription') || 'Real-time payment processing and instant notifications'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 步骤 2: 支付 */}
        {step === 'payment' && (
          <div className="max-w-2xl mx-auto">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
            >
              <ArrowRight className="w-4 h-4 rotate-180" />
              {t('backToPlans') || 'Back to Plans'}
            </button>

            <CheckoutForm
              product={selectedProduct}
              onSuccess={handleSuccess}
              onError={handleError}
            />
          </div>
        )}

        {/* 步骤 3: 成功 */}
        {step === 'success' && (
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white rounded-lg shadow-md p-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {t('paymentSuccessful') || 'Payment Successful!'}
              </h2>
              <p className="text-gray-600 mb-6">
                {t('paymentSuccessfulDescription') || 'Thank you for your purchase. Your account has been upgraded.'}
              </p>

              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="text-sm text-gray-600 mb-1">
                  {t('paymentId') || 'Payment ID'}
                </div>
                <div className="font-mono text-lg text-gray-900">
                  {paymentId || 'pi_3abc123def456'}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/dashboard"
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-md font-medium hover:bg-primary-700 transition-colors"
                >
                  {t('goToDashboard') || 'Go to Dashboard'}
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="/"
                  className="flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-md font-medium hover:bg-gray-50 transition-colors"
                >
                  {t('backToHome') || 'Back to Home'}
                </a>
              </div>

              {/* 收据信息 */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="text-sm font-medium text-gray-700 mb-3">
                  {t('receiptDetails') || 'Receipt Details'}
                </h3>
                <div className="bg-gray-50 rounded-lg p-4 text-left">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">{t('plan') || 'Plan'}</span>
                    <span className="font-medium">{selectedProduct.name}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">{t('amount') || 'Amount'}</span>
                    <span className="font-medium">${selectedProduct.price}/{selectedProduct.interval}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">{t('date') || 'Date'}</span>
                    <span className="font-medium">{new Date().toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t('status') || 'Status'}</span>
                    <span className="font-medium text-green-600">{t('paid') || 'Paid'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 支付方式 */}
        {step !== 'success' && (
          <div className="mt-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-sm font-medium text-gray-700 mb-3 text-center">
                {t('supportedPaymentMethods') || 'Supported Payment Methods'}
              </h3>
              <div className="flex flex-wrap justify-center gap-4">
                <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-md">
                  <CreditCard className="w-5 h-5 text-gray-600" />
                  <span className="text-sm text-gray-700">Visa</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-md">
                  <CreditCard className="w-5 h-5 text-gray-600" />
                  <span className="text-sm text-gray-700">Mastercard</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-md">
                  <CreditCard className="w-5 h-5 text-gray-600" />
                  <span className="text-sm text-gray-700">Amex</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-md">
                  <span className="text-lg">🔵</span>
                  <span className="text-sm text-gray-700">Alipay</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-md">
                  <span className="text-lg">🟢</span>
                  <span className="text-sm text-gray-700">WeChat Pay</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}