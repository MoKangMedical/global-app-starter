'use client';
 
import {useState, useEffect} from 'react';
import {useTranslations} from 'next-intl';
import {Shield, X, Check} from 'lucide-react';
 
interface ConsentData {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  medical_data: boolean;
  timestamp: string;
  version: string;
}
 
export default function GDPRConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const t = useTranslations('compliance_notice');
 
  useEffect(() => {
    const consent = localStorage.getItem('medical_consent');
    if (!consent) {
      setShowBanner(true);
    }
  }, []);
 
  const handleAccept = (consentType: 'all' | 'necessary') => {
    const consent: ConsentData = {
      necessary: true,
      analytics: consentType === 'all',
      marketing: consentType === 'all',
      medical_data: consentType === 'all',
      timestamp: new Date().toISOString(),
      version: '1.0.0',
    };
 
    localStorage.setItem('medical_consent', JSON.stringify(consent));
    document.cookie = `medical_consent=${JSON.stringify(consent)}; path=/; max-age=${365 * 24 * 60 * 60}; SameSite=Strict; Secure`;
    setShowBanner(false);
  };
 
  if (!showBanner) return null;
 
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <Shield className="h-8 w-8 text-blue-600" />
          </div>
 
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900">
              {t('title')}
            </h3>
            <p className="mt-2 text-sm text-gray-600">
              {t('message')}
            </p>
 
            {showDetails && (
              <div className="mt-4 space-y-3">
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-600" />
                  <span className="text-sm">
                    <strong>Necessary:</strong> Required for basic functionality
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 border-2 border-gray-300 rounded" />
                  <span className="text-sm">
                    <strong>Analytics:</strong> Help us improve our services
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 border-2 border-gray-300 rounded" />
                  <span className="text-sm">
                    <strong>Medical Data:</strong> Process and store medical information
                  </span>
                </div>
              </div>
            )}
 
            <div className="mt-4 flex flex-wrap gap-3">
              <button
                onClick={() => handleAccept('all')}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium"
              >
                {t('accept')}
              </button>
              <button
                onClick={() => handleAccept('necessary')}
                className="px-6 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 font-medium"
              >
                Necessary Only
              </button>
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="px-4 py-2 text-blue-600 hover:text-blue-800 font-medium"
              >
                {t('learn_more')}
              </button>
            </div>
          </div>
 
          <button
            onClick={() => setShowBanner(false)}
            className="flex-shrink-0 p-2 text-gray-400 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
