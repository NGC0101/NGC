import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import {
  CountryCode,
  PricingResult,
  getPricing,
  getWhatsAppMessage,
  buildWhatsAppUrl,
  normalizeCountry,
} from '../utils/pricing';

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
      if (typeof window !== 'undefined' && window.sessionStorage) {
        const stored = sessionStorage.getItem(STORAGE_KEY);
        if (stored) return stored;
      }
    } catch {
      // ignore
    }
    return 'UNKNOWN';
  });

  const [isCountryModalOpen, setIsCountryModalOpen] = useState(false);
  const [dataVersion, setDataVersion] = useState(0);

  // Synchronize with real-time site updates from admin portal
  useEffect(() => {
    const handleUpdate = () => {
      setDataVersion((v) => v + 1);
    };

    window.addEventListener('site_data_updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);

    return () => {
      window.removeEventListener('site_data_updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.sessionStorage) {
        sessionStorage.setItem(STORAGE_KEY, selectedCountry);
      }
    } catch {
      // ignore
    }
  }, [selectedCountry]);

  const countryType = useMemo(() => normalizeCountry(selectedCountry), [selectedCountry]);
  
  // Re-evaluate pricing, message, and URL whenever selectedCountry OR dataVersion changes
  const pricing = useMemo(() => {
    // dataVersion dependency triggers recalculation on site_data_updated
    return getPricing(selectedCountry);
  }, [selectedCountry, dataVersion]);

  const whatsAppMessage = useMemo(() => {
    return getWhatsAppMessage(selectedCountry);
  }, [selectedCountry, dataVersion]);

  const whatsAppUrl = useMemo(() => {
    return buildWhatsAppUrl(selectedCountry);
  }, [selectedCountry, dataVersion]);

  const openWhatsApp = useCallback((customSuffix?: string) => {
    const url = buildWhatsAppUrl(selectedCountry, customSuffix);
    window.open(url, '_blank', 'noopener,noreferrer');
  }, [selectedCountry]);

  const setSelectedCountry = useCallback((country: string) => {
    setSelectedCountryState(country);
  }, []);

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
