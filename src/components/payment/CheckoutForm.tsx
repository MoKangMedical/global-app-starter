'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { 
  CreditCard, 
  Wallet, 
  Building2, 
  Smartphone, 
  Check, 
  Lock, 
  Shield, 
  Globe,
  ArrowRight,
  Loader2
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
}

interface PaymentMethod {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  enabled: boolean;
}

const defaultProducts: Product[] = [
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
      '1,000 API calls/month'
    ]
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
      'Custom domains'
    ],
    popular: true
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
      'On-premise deployment'
    ]
  }
];

const paymentMethods: PaymentMethod[] = [
  {
    id: 'card',
    name: 'Credit Card',
    icon: <CreditCard className="w-6 h-6" />,
    description: 'Visa, Mastercard, Amex',
    enabled: true
  },
  {
    id: 'alipay',
    name: 'Alipay',
    icon: <Wallet className="w-6 h-6" />,
    description: '支付宝',
    enabled: true
  },
  {
    id: 'wechat',
    name: 'WeChat Pay',
    icon: <Smartphone className="w-6 h-6" />,
    description: '微信支付',
    enabled: true
  },
  {
    id: 'bank',
    name: 'Bank Transfer',
    icon: <Building2 className="w-6 h-6" />,
    description: 'Wire transfer',
    enabled: false
  }
];

interface CheckoutFormProps {
  product: Product;
  onSuccess?: (paymentId: string) => void;
  onError?: (error: string) => void;
}

export default function CheckoutForm({ 
  product, 
  onSuccess, 
  onError 
}: CheckoutFormProps) {
  const t = useTranslations('checkout');
  const [selectedMethod, setSelectedMethod] = useState<string>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [country, setCountry] = useState('US');

  // 格式化卡号
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  // 格式化有效期
  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  // 处理支付
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // 创建支付意图
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: product.id,
          email,
          name,
          country,
          paymentMethod: selectedMethod,
          amount: product.price * 100, // 转换为分
          currency: product.currency
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Payment failed');
      }

      // 模拟支付处理
      await new Promise(resolve => setTimeout(resolve, 2000));

      onSuccess?.(data.paymentId);
    } catch (error) {
      onError?.(error instanceof Error ? error.message : 'Payment failed');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      {/* 产品信息 */}
      <div className="mb-6 pb-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
          {product.popular && (
            <span className="px-2 py-1 text-xs font-medium bg-primary-100 text-primary-700 rounded-full">
              {t('popular') || 'Most Popular'}
            </span>
          )}
        </div>
        <p className="text-sm text-gray-600 mb-4">{product.description}</p>
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

      {/* 支付方式选择 */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-700 mb-3">
          {t('paymentMethod') || 'Payment Method'}
        </h4>
        <div className="grid grid-cols-2 gap-3">
          {paymentMethods.filter(m => m.enabled).map((method) => (
            <button
              key={method.id}
              type="button"
              onClick={() => setSelectedMethod(method.id)}
              className={`p-3 border rounded-lg text-left transition-colors ${
                selectedMethod === method.id
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <div className={`${
                  selectedMethod === method.id ? 'text-primary-600' : 'text-gray-500'
                }`}>
                  {method.icon}
                </div>
                <span className="font-medium text-gray-900">{method.name}</span>
              </div>
              <p className="text-xs text-gray-500">{method.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* 支付表单 */}
      <form onSubmit={handleSubmit}>
        {/* 邮箱 */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('email') || 'Email'}
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            placeholder="your@email.com"
          />
        </div>

        {/* 姓名 */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('name') || 'Name'}
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            placeholder="John Doe"
          />
        </div>

        {/* 国家 */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('country') || 'Country'}
          </label>
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="US">United States</option>
            <option value="CN">China</option>
            <option value="GB">United Kingdom</option>
            <option value="DE">Germany</option>
            <option value="FR">France</option>
            <option value="JP">Japan</option>
            <option value="KR">South Korea</option>
            <option value="SG">Singapore</option>
          </select>
        </div>

        {/* 信用卡信息 */}
        {selectedMethod === 'card' && (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('cardNumber') || 'Card Number'}
              </label>
              <input
                type="text"
                value={cardNumber}
                onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                maxLength={19}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="1234 5678 9012 3456"
              />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('expiry') || 'Expiry'}
                </label>
                <input
                  type="text"
                  value={expiry}
                  onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                  maxLength={5}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="MM/YY"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('cvc') || 'CVC'}
                </label>
                <input
                  type="text"
                  value={cvc}
                  onChange={(e) => setCvc(e.target.value.replace(/\D/g, '').slice(0, 4))}
                  maxLength={4}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="123"
                />
              </div>
            </div>
          </>
        )}

        {/* 支付按钮 */}
        <button
          type="submit"
          disabled={isProcessing}
          className="w-full py-3 px-4 bg-primary-600 text-white rounded-md font-medium hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isProcessing ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              {t('processing') || 'Processing...'}
            </>
          ) : (
            <>
              <Lock className="w-4 h-4" />
              {t('payNow') || 'Pay Now'} ${product.price}
            </>
          )}
        </button>

        {/* 安全提示 */}
        <div className="mt-4 flex items-center justify-center gap-4 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <Shield className="w-3 h-3" />
            <span>{t('secure') || 'Secure Payment'}</span>
          </div>
          <div className="flex items-center gap-1">
            <Lock className="w-3 h-3" />
            <span>{t('encrypted') || '256-bit SSL'}</span>
          </div>
        </div>
      </form>

      {/* 支持的支付方式图标 */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-500 text-center mb-2">
          {t('supportedMethods') || 'Supported payment methods'}
        </p>
        <div className="flex justify-center gap-4">
          <span className="text-2xl">💳</span>
          <span className="text-2xl">🔵</span>
          <span className="text-2xl">🟢</span>
        </div>
      </div>
    </div>
  );
}