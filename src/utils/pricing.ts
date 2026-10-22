/**
 * Pricing and WhatsApp URL Generation Utilities
 * Fully decoupled and synchronized with real-time siteStore state
 */

import { SITE_CONFIG } from '../config/siteConfig';
import { getSiteData } from '../services/siteStore';

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
  if (clean === 'INTL' || clean === 'INTERNATIONAL' || clean === 'OTHER' || (clean.length > 0 && clean !== 'UNKNOWN')) {
    return 'INTL';
  }
  return 'UNKNOWN';
}

/**
 * Returns structured pricing details based on normalized country and real-time siteStore.
 */
export function getPricing(countryInput: string | null | undefined): PricingResult {
  const countryType = normalizeCountry(countryInput);
  const isPakistan = countryType === 'PK';
  const isInternational = countryType === 'INTL';
  const isUnknown = countryType === 'UNKNOWN';

  const siteData = getSiteData();
  const pricingData = siteData.pricing;

  const pkPrice = {
    amount: pricingData.pakistan.amount,
    currency: pricingData.pakistan.currency,
    formatted: pricingData.pakistan.formatted,
    label: pricingData.pakistan.displayLabel || `Mentorship Fee: ${pricingData.pakistan.formatted}`,
  };

  const intlPrice = {
    amount: pricingData.international.amount,
    currency: pricingData.international.currency,
    formatted: pricingData.international.formatted,
    label: pricingData.international.displayLabel || `Mentorship Fee: ${pricingData.international.formatted}`,
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
      currency: `${pkPrice.currency} / ${intlPrice.currency}`,
      formatted: `${pkPrice.formatted} / ${intlPrice.formatted}`,
      label: `Mentorship Fee: ${pkPrice.formatted} (Pakistan) / ${intlPrice.formatted} (International)`,
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
 * Returns the exact prefilled message required by business specifications, dynamically computed with current price.
 */
export function getWhatsAppMessage(countryInput: string | null | undefined): string {
  const type = normalizeCountry(countryInput);
  const siteData = getSiteData();
  const pkFormatted = siteData.pricing.pakistan.formatted;
  const intlFormatted = siteData.pricing.international.formatted;

  if (type === 'PK') {
    return siteData.whatsappMessages?.pakistan || `Assalam-o-Alaikum! I'm interested in joining the Next Gen Creators YouTube Automation Mentorship. I understand the mentorship fee is ${pkFormatted}. Please share the curriculum and enrollment process.`;
  }
  if (type === 'INTL') {
    return siteData.whatsappMessages?.international || `Hello Next Gen Creators! I'm interested in your YouTube Automation Mentorship Program. I understand the mentorship fee is ${intlFormatted}. Please share the curriculum and enrollment process.`;
  }
  return siteData.whatsappMessages?.unknown || `Hello Next Gen Creators! I'm interested in your YouTube Automation Mentorship Program. Please confirm the applicable mentorship fee and share the curriculum and enrollment process.`;
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
  
  const siteData = getSiteData();
  const baseUrl = siteData.socialLinks?.whatsapp || SITE_CONFIG.contact.whatsappBaseUrl;
  return `${baseUrl}?text=${encoded}`;
}
