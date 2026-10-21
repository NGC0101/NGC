import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import {
  CountryCode,
  PricingResult,
  getPricing,
  getWhatsAppMessage,
  buildWhatsAppUrl,
  normalizeCountry,
} from '../utils/pricing';
import { SITE_CONFIG } from '../config/siteConfig';

interface CountryContextType {
  selectedCountry: string; // 'PK', 'INTL', or specific country code like 'US'
  countryType: CountryCode;
  pricing: PricingResult;
  whatsAppMessage: string;
  whatsAppUrl: string;
  setSelectedCountry: (country: string) => void;
  openWhatsApp: (customSuffix?: string) => void;
  isCountryModalOpen: boolean;
  setIsCountryModalOpen: (open: boolean) => void;
}

const STORAGE_KEY = 'nextgen_creator_country';

const CountryContext = createContext<CountryContextType | undefined>(undefined);

export const CountryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedCountry, setSelectedCountryState] = useState<string>(() => {
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      if (stored) return stored;
    } catch {
      // ignore
    }
    return 'UNKNOWN';
  });

  const [isCountryModalOpen, setIsCountryModalOpen] = useState(false);

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, selectedCountry);
    } catch {
      // ignore
    }
  }, [selectedCountry]);

  const countryType = useMemo(() => normalizeCountry(selectedCountry), [selectedCountry]);
  const pricing = useMemo(() => getPricing(selectedCountry), [selectedCountry]);
  const whatsAppMessage = useMemo(() => getWhatsAppMessage(selectedCountry), [selectedCountry]);
  const whatsAppUrl = useMemo(() => buildWhatsAppUrl(selectedCountry), [selectedCountry]);

  const openWhatsApp = (customSuffix?: string) => {
    const url = buildWhatsAppUrl(selectedCountry, customSuffix);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const setSelectedCountry = (country: string) => {
    setSelectedCountryState(country);
  };

  return (
    <CountryContext.Provider
      value={{
        selectedCountry,
        countryType,
        pricing,
        whatsAppMessage,
        whatsAppUrl,
        setSelectedCountry,
        openWhatsApp,
        isCountryModalOpen,
        setIsCountryModalOpen,
      }}
    >
      {children}
    </CountryContext.Provider>
  );
};

export function useCountry() {
  const context = useContext(CountryContext);
  if (!context) {
    throw new Error('useCountry must be used within a CountryProvider');
  }
  return context;
}
