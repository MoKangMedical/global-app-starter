'use client';
 
import {useState, useEffect} from 'react';
 
const exchangeRates: Record<string, number> = {
  USD: 1,
  CNY: 7.24,
  JPY: 149.5,
  KRW: 1320.5,
  EUR: 0.92,
  GBP: 0.79,
  CAD: 1.36,
  AUD: 1.53,
  BRL: 4.97,
};
 
const currencySymbols: Record<string, string> = {
  USD: '$',
  CNY: '¥',
  JPY: '¥',
  KRW: '₩',
  EUR: '€',
  GBP: '£',
  CAD: 'C$',
  AUD: 'A$',
  BRL: 'R$',
};
 
interface CurrencyConverterProps {
  amountUSD: number;
  className?: string;
}
 
export default function CurrencyConverter({
  amountUSD,
  className = '',
}: CurrencyConverterProps) {
  const [currency, setCurrency] = useState('USD');
 
  useEffect(() => {
    // 从本地存储加载货币设置
    const savedCountry = localStorage.getItem('selected_country');
    if (savedCountry) {
      const countryToCurrency: Record<string, string> = {
        US: 'USD',
        CN: 'CNY',
        JP: 'JPY',
        KR: 'KRW',
        DE: 'EUR',
        FR: 'EUR',
        GB: 'GBP',
        CA: 'CAD',
        AU: 'AUD',
        BR: 'BRL',
      };
      setCurrency(countryToCurrency[savedCountry] || 'USD');
    }
 
    // 监听国家变化事件
    const handleCountryChange = (e: CustomEvent) => {
      const countryToCurrency: Record<string, string> = {
        US: 'USD',
        CN: 'CNY',
        JP: 'JPY',
        KR: 'KRW',
        DE: 'EUR',
        FR: 'EUR',
        GB: 'GBP',
        CA: 'CAD',
        AU: 'AUD',
        BR: 'BRL',
      };
      setCurrency(countryToCurrency[e.detail.code] || 'USD');
    };
 
    window.addEventListener('countryChanged', handleCountryChange as EventListener);
    return () => {
      window.removeEventListener('countryChanged', handleCountryChange as EventListener);
    };
  }, []);
 
  const convertedAmount = amountUSD * (exchangeRates[currency] || 1);
  const symbol = currencySymbols[currency] || '$';
 
  const formatCurrency = (amount: number, curr: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: curr,
      minimumFractionDigits: curr === 'JPY' || curr === 'KRW' ? 0 : 2,
      maximumFractionDigits: curr === 'JPY' || curr === 'KRW' ? 0 : 2,
    }).format(amount);
  };
 
  return (
    <div className={className}>
      <span className="font-semibold">
        {formatCurrency(convertedAmount, currency)}
      </span>
      {currency !== 'USD' && (
        <span className="text-sm text-gray-500 ml-2">
          ({formatCurrency(amountUSD, 'USD')} USD)
        </span>
      )}
    </div>
  );
}
