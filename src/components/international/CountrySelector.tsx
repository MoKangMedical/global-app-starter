'use client';
 
import {useState, useEffect} from 'react';
import {Globe, Check} from 'lucide-react';
 
const countries = [
  {code: 'US', name: 'United States', currency: 'USD', flag: '🇺🇸'},
  {code: 'CN', name: 'China', currency: 'CNY', flag: '🇨🇳'},
  {code: 'JP', name: 'Japan', currency: 'JPY', flag: '🇯🇵'},
  {code: 'KR', name: 'South Korea', currency: 'KRW', flag: '🇰🇷'},
  {code: 'DE', name: 'Germany', currency: 'EUR', flag: '🇩🇪'},
  {code: 'FR', name: 'France', currency: 'EUR', flag: '🇫🇷'},
  {code: 'GB', name: 'United Kingdom', currency: 'GBP', flag: '🇬🇧'},
  {code: 'CA', name: 'Canada', currency: 'CAD', flag: '🇨🇦'},
  {code: 'AU', name: 'Australia', currency: 'AUD', flag: '🇦🇺'},
  {code: 'BR', name: 'Brazil', currency: 'BRL', flag: '🇧🇷'},
];
 
export default function CountrySelector() {
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [isOpen, setIsOpen] = useState(false);
 
  useEffect(() => {
    // 从本地存储加载国家选择
    const saved = localStorage.getItem('selected_country');
    if (saved) {
      const country = countries.find((c) => c.code === saved);
      if (country) setSelectedCountry(country);
    }
  }, []);
 
  const handleSelect = (country: typeof countries[0]) => {
    setSelectedCountry(country);
    localStorage.setItem('selected_country', country.code);
    setIsOpen(false);
 
    // 触发自定义事件通知其他组件
    window.dispatchEvent(
      new CustomEvent('countryChanged', {detail: country})
    );
  };
 
  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-md bg-gray-100 hover:bg-gray-200 transition-colors"
      >
        <span className="text-lg">{selectedCountry.flag}</span>
        <span className="text-sm font-medium text-gray-700">
          {selectedCountry.code}
        </span>
        <Globe className="h-4 w-4 text-gray-500" />
      </button>
 
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 z-50">
          <div className="p-2">
            <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Select Country
            </div>
            <div className="mt-1 space-y-1">
              {countries.map((country) => (
                <button
                  key={country.code}
                  onClick={() => handleSelect(country)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-left ${
                    selectedCountry.code === country.code
                      ? 'bg-blue-50 text-blue-700'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <span className="text-lg">{country.flag}</span>
                  <div className="flex-1">
                    <div className="font-medium">{country.name}</div>
                    <div className="text-xs text-gray-500">
                      {country.currency}
                    </div>
                  </div>
                  {selectedCountry.code === country.code && (
                    <Check className="h-4 w-4 text-blue-600" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
