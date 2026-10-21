/**
 * Pricing and WhatsApp URL Generation Utilities
 * Decoupled pure logic tested with node:test
 */

import { SITE_CONFIG } from '../config/siteConfig';

export type CountryCode = 'PK' | 'INTL' | 'UNKNOWN';

export interface CountryOption {
  code: string;
  name: string;
  regionType: CountryCode;
}

export const COUNTRIES: CountryOption[] = [
  { code: 'PK', name: 'Pakistan', regionType: 'PK' },
  { code: 'US', name: 'United States', regionType: 'INTL' },
  { code: 'GB', name: 'United Kingdom', regionType: 'INTL' },
  { code: 'AE', name: 'United Arab Emirates', regionType: 'INTL' },
  { code: 'SA', name: 'Saudi Arabia', regionType: 'INTL' },
  { code: 'CA', name: 'Canada', regionType: 'INTL' },
  { code: 'AU', name: 'Australia', regionType: 'INTL' },
  { code: 'DE', name: 'Germany', regionType: 'INTL' },
  { code: 'IN', name: 'India', regionType: 'INTL' },
  { code: 'BD', name: 'Bangladesh', regionType: 'INTL' },
  { code: 'MY', name: 'Malaysia', regionType: 'INTL' },
  { code: 'OTHER', name: 'Other International Country', regionType: 'INTL' },
];

export interface PricingResult {
  countryType: CountryCode;
  isPakistan: boolean;
  isInternational: boolean;
  isUnknown: boolean;
  pakistanPrice: {
    amount: number;
    currency: string;
    formatted: string;
    label: string;
  };
  internationalPrice: {
    amount: number;
    currency: string;
    formatted: string;
    label: string;
  };
  primaryDisplay: {
    amount: number | null;
    currency: string;
    formatted: string;
    label: string;
    showBoth: boolean;
  };
}

/**
 * Normalizes any country identifier into PK, INTL, or UNKNOWN.
 */
export function normalizeCountry(input: string | null | undefined): CountryCode {
  if (!input) return 'UNKNOWN';
  const clean = input.trim().toUpperCase();
  if (clean === 'PK' || clean === 'PAKISTAN') {
    return 'PK';
  }
  if (clean === 'INTL' || clean === 'INTERNATIONAL' || clean === 'OTHER' || clean.length > 0 && clean !== 'UNKNOWN') {
    return 'INTL';
  }
  return 'UNKNOWN';
}

/**
 * Returns structured pricing details based on normalized country.
 */
export function getPricing(countryInput: string | null | undefined): PricingResult {
  const countryType = normalizeCountry(countryInput);
  const isPakistan = countryType === 'PK';
  const isInternational = countryType === 'INTL';
  const isUnknown = countryType === 'UNKNOWN';

  const pkPrice = {
    amount: SITE_CONFIG.pricing.pakistan.amount,
    currency: SITE_CONFIG.pricing.pakistan.currency,
    formatted: SITE_CONFIG.pricing.pakistan.formatted,
    label: SITE_CONFIG.pricing.pakistan.displayLabel,
  };

  const intlPrice = {
    amount: SITE_CONFIG.pricing.international.amount,
    currency: SITE_CONFIG.pricing.international.currency,
    formatted: SITE_CONFIG.pricing.international.formatted,
    label: SITE_CONFIG.pricing.international.displayLabel,
  };

  let primaryDisplay: PricingResult['primaryDisplay'];

  if (isPakistan) {
    primaryDisplay = {
      amount: pkPrice.amount,
      currency: pkPrice.currency,
      formatted: pkPrice.formatted,
      label: pkPrice.label,
      showBoth: false,
    };
  } else if (isInternational) {
    primaryDisplay = {
      amount: intlPrice.amount,
      currency: intlPrice.currency,
      formatted: intlPrice.formatted,
      label: intlPrice.label,
      showBoth: false,
    };
  } else {
    primaryDisplay = {
      amount: null,
      currency: 'PKR / USD',
      formatted: 'PKR 50,000 / $200 USD',
      label: 'Mentorship Fee: PKR 50,000 (Pakistan) / $200 USD (International)',
      showBoth: true,
    };
  }

  return {
    countryType,
    isPakistan,
    isInternational,
    isUnknown,
    pakistanPrice: pkPrice,
    internationalPrice: intlPrice,
    primaryDisplay,
  };
}

/**
 * Returns the exact prefilled message required by the business specifications.
 */
export function getWhatsAppMessage(countryInput: string | null | undefined): string {
  const type = normalizeCountry(countryInput);
  if (type === 'PK') {
    return SITE_CONFIG.whatsappMessages.pakistan;
  }
  if (type === 'INTL') {
    return SITE_CONFIG.whatsappMessages.international;
  }
  return SITE_CONFIG.whatsappMessages.unknown;
}

/**
 * Constructs a fully encoded WhatsApp link ready to open in the browser.
 */
export function buildWhatsAppUrl(
  countryInput: string | null | undefined,
  customSuffix?: string
): string {
  const baseMessage = getWhatsAppMessage(countryInput);
  const finalMessage = customSuffix ? `${baseMessage}\n\n${customSuffix}` : baseMessage;
  const encoded = encodeURIComponent(finalMessage);
  return `${SITE_CONFIG.contact.whatsappBaseUrl}?text=${encoded}`;
}
