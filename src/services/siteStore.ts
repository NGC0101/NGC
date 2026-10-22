import { SITE_CONFIG, ResourceArticle, FAQItem, CurriculumModule } from '../config/siteConfig';

export interface SocialLinks {
  youtube: string;
  instagram: string;
  twitter: string;
  tiktok: string;
  whatsapp: string;
}

export interface PricingRegion {
  amount: number;
  currency: string;
  formatted: string;
  displayLabel?: string;
  audience?: string;
}

export interface AdminCredentials {
  username: string;
  password: string;
  lastUpdated?: string;
}

export interface SiteData {
  articles: ResourceArticle[];
  faqs: FAQItem[];
  curriculum: CurriculumModule[];
  pricing: {
    pakistan: PricingRegion;
    international: PricingRegion;
  };
  socialLinks: SocialLinks;
  brand: typeof SITE_CONFIG.brand;
  heroSlides: { url: string; title: string; desc: string; }[];
  whatsappMessages: {
    pakistan: string;
    international: string;
    unknown: string;
  };
  adminCredentials?: AdminCredentials;
  lastSavedAt?: string;
}

const STORAGE_KEY = 'next_gen_creators_site_data_v3';
// Support backwards compatibility with v2 key
const LEGACY_KEY = 'next_gen_creators_site_data_v2';

export const DEFAULT_ADMIN_CREDENTIALS: AdminCredentials = {
  username: 'alphabs777',
  password: 'alphataha',
};

export const DEFAULT_SOCIAL_LINKS: SocialLinks = {
  youtube: 'https://youtube.com/@nextgencreators',
  instagram: 'https://instagram.com/nextgencreators',
  twitter: 'https://twitter.com/nextgencreators',
  tiktok: 'https://tiktok.com/@nextgencreators',
  whatsapp: SITE_CONFIG.contact.whatsappBaseUrl,
};

/**
 * Computes default WhatsApp messages according to updated pricing
 */
export const generateDefaultWhatsappMessages = (pakistanFormatted: string, intlFormatted: string) => {
  return {
    pakistan: `Assalam-o-Alaikum! I'm interested in joining the Next Gen Creators YouTube Automation Mentorship. I understand the mentorship fee is ${pakistanFormatted}. Please share the curriculum and enrollment process.`,
    international: `Hello Next Gen Creators! I'm interested in your YouTube Automation Mentorship Program. I understand the mentorship fee is ${intlFormatted}. Please share the curriculum and enrollment process.`,
    unknown: `Hello Next Gen Creators! I'm interested in your YouTube Automation Mentorship Program. Please confirm the applicable mentorship fee and share the curriculum and enrollment process.`,
  };
};

export const getDefaultSiteData = (): SiteData => {
  return {
    articles: SITE_CONFIG.resources,
    faqs: SITE_CONFIG.faqs,
    curriculum: SITE_CONFIG.curriculumModules,
    pricing: {
      pakistan: {
        amount: SITE_CONFIG.pricing.pakistan.amount,
        currency: SITE_CONFIG.pricing.pakistan.currency,
        formatted: SITE_CONFIG.pricing.pakistan.formatted,
        displayLabel: SITE_CONFIG.pricing.pakistan.displayLabel,
        audience: SITE_CONFIG.pricing.pakistan.audience,
      },
      international: {
        amount: SITE_CONFIG.pricing.international.amount,
        currency: SITE_CONFIG.pricing.international.currency,
        formatted: SITE_CONFIG.pricing.international.formatted,
        displayLabel: SITE_CONFIG.pricing.international.displayLabel,
        audience: SITE_CONFIG.pricing.international.audience,
      },
    },
    socialLinks: DEFAULT_SOCIAL_LINKS,
    brand: SITE_CONFIG.brand,
    whatsappMessages: generateDefaultWhatsappMessages(
      SITE_CONFIG.pricing.pakistan.formatted,
      SITE_CONFIG.pricing.international.formatted
    ),
    heroSlides: [
      {
        url: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1200&auto=format&fit=crop',
        title: 'Faceless Production Pipeline',
        desc: 'Scriptwriting, audio planning, visual assembly, and thumbnail strategy.'
      },
      {
        url: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=1200&auto=format&fit=crop',
        title: 'Professional Voice & Audio Engineering',
        desc: 'Recording clear narration, pacing sound design, and audio mastering.'
      },
      {
        url: 'https://images.unsplash.com/photo-1533750349077-cdcd106d2312?q=80&w=1200&auto=format&fit=crop',
        title: 'Digital Content Creation Desk',
        desc: 'Organizing video assets, timelines, and high-retention editing.'
      },
      {
        url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop',
        title: 'Systematic Topic Research & Strategy',
        desc: 'Evaluating search curiosity, audience intent, and 30-day calendars.'
      },
      {
        url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop',
        title: 'Creator Workflow & Collaboration',
        desc: 'Building standard operating procedures and managing production milestones.'
      },
      {
        url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop',
        title: 'Analytics & Data-Driven Improvement',
        desc: 'Auditing click-through rates, audience retention, and recommendation signals.'
      }
    ],
    adminCredentials: DEFAULT_ADMIN_CREDENTIALS,
    lastSavedAt: new Date().toISOString(),
  };
};

/**
 * Safely retrieves site data with multiple layers of fallback
 */
export const getSiteData = (): SiteData => {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      let saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) {
        // Fallback to legacy key if migrating
        saved = localStorage.getItem(LEGACY_KEY);
      }

      if (saved) {
        const parsed = JSON.parse(saved);
        const defaults = getDefaultSiteData();

        return {
          articles: Array.isArray(parsed.articles) && parsed.articles.length > 0 ? parsed.articles : defaults.articles,
          faqs: Array.isArray(parsed.faqs) && parsed.faqs.length > 0 ? parsed.faqs : defaults.faqs,
          curriculum: Array.isArray(parsed.curriculum) && parsed.curriculum.length > 0 ? parsed.curriculum : defaults.curriculum,
          pricing: {
            pakistan: {
              amount: parsed.pricing?.pakistan?.amount ?? defaults.pricing.pakistan.amount,
              currency: parsed.pricing?.pakistan?.currency ?? defaults.pricing.pakistan.currency,
              formatted: parsed.pricing?.pakistan?.formatted ?? defaults.pricing.pakistan.formatted,
              displayLabel: parsed.pricing?.pakistan?.displayLabel ?? defaults.pricing.pakistan.displayLabel,
              audience: parsed.pricing?.pakistan?.audience ?? defaults.pricing.pakistan.audience,
            },
            international: {
              amount: parsed.pricing?.international?.amount ?? defaults.pricing.international.amount,
              currency: parsed.pricing?.international?.currency ?? defaults.pricing.international.currency,
              formatted: parsed.pricing?.international?.formatted ?? defaults.pricing.international.formatted,
              displayLabel: parsed.pricing?.international?.displayLabel ?? defaults.pricing.international.displayLabel,
              audience: parsed.pricing?.international?.audience ?? defaults.pricing.international.audience,
            },
          },
          socialLinks: {
            youtube: parsed.socialLinks?.youtube ?? defaults.socialLinks.youtube,
            instagram: parsed.socialLinks?.instagram ?? defaults.socialLinks.instagram,
            twitter: parsed.socialLinks?.twitter ?? defaults.socialLinks.twitter,
            tiktok: parsed.socialLinks?.tiktok ?? defaults.socialLinks.tiktok,
            whatsapp: parsed.socialLinks?.whatsapp ?? defaults.socialLinks.whatsapp,
          },
          brand: parsed.brand ?? defaults.brand,
          whatsappMessages: parsed.whatsappMessages ?? generateDefaultWhatsappMessages(
            parsed.pricing?.pakistan?.formatted ?? defaults.pricing.pakistan.formatted,
            parsed.pricing?.international?.formatted ?? defaults.pricing.international.formatted
          ),
          heroSlides: Array.isArray(parsed.heroSlides) && parsed.heroSlides.length > 0 ? parsed.heroSlides : defaults.heroSlides,
          adminCredentials: parsed.adminCredentials ?? DEFAULT_ADMIN_CREDENTIALS,
          lastSavedAt: parsed.lastSavedAt ?? new Date().toISOString(),
        };
      }
    }
  } catch (e) {
    console.error('Failed to load site data from storage', e);
  }

  return getDefaultSiteData();
};

/**
 * Persists site data immediately, notifies all windows/tabs, and dispatches real-time custom event
 */
export const saveSiteData = (data: SiteData): boolean => {
  try {
    const payload: SiteData = {
      ...data,
      lastSavedAt: new Date().toISOString(),
    };

    if (typeof window !== 'undefined' && window.localStorage) {
      const serialized = JSON.stringify(payload);
      localStorage.setItem(STORAGE_KEY, serialized);
      // Clean legacy key to avoid stale conflicts
      localStorage.removeItem(LEGACY_KEY);

      // Dispatch event for components in same window
      window.dispatchEvent(new CustomEvent('site_data_updated', { detail: payload }));
      
      // Also broadcast via BroadcastChannel if available for instant multi-tab sync
      try {
        if ('BroadcastChannel' in window) {
          const bc = new BroadcastChannel('ngc_site_data_channel');
          bc.postMessage({ type: 'SITE_DATA_UPDATED', data: payload });
          bc.close();
        }
      } catch {
        // BroadcastChannel optional
      }
    }
    return true;
  } catch (e) {
    console.error('Failed to save site data to storage', e);
    return false;
  }
};

/**
 * Restores all site configuration back to pristine original defaults
 */
export const resetSiteData = (): SiteData => {
  const defaults = getDefaultSiteData();
  saveSiteData(defaults);
  return defaults;
};

/**
 * Exports entire site data configuration as a formatted JSON string for backup
 */
export const exportSiteDataJson = (): string => {
  const current = getSiteData();
  return JSON.stringify(current, null, 2);
};

/**
 * Validates and imports a JSON string backup
 */
export const importSiteDataJson = (jsonString: string): { success: boolean; error?: string } => {
  try {
    const parsed = JSON.parse(jsonString);
    if (!parsed || typeof parsed !== 'object') {
      return { success: false, error: 'Invalid JSON file structure.' };
    }

    if (!Array.isArray(parsed.articles) || !Array.isArray(parsed.faqs) || !parsed.pricing) {
      return { success: false, error: 'JSON is missing required articles, faqs, or pricing data.' };
    }

    const merged: SiteData = {
      ...getDefaultSiteData(),
      ...parsed,
      lastSavedAt: new Date().toISOString(),
    };

    saveSiteData(merged);
    return { success: true };
  } catch (e) {
    return { success: false, error: e instanceof Error ? e.message : 'Failed to parse JSON file.' };
  }
};

/**
 * Validates administrator credentials against stored credentials
 */
export const checkAdminCredentials = (username: string, password: string): boolean => {
  const current = getSiteData();
  const validCreds = current.adminCredentials || DEFAULT_ADMIN_CREDENTIALS;
  return username === validCreds.username && password === validCreds.password;
};

/**
 * Updates administrator credentials
 */
export const updateAdminCredentials = (username: string, password: string): boolean => {
  if (!username.trim() || !password.trim()) return false;
  const current = getSiteData();
  current.adminCredentials = {
    username: username.trim(),
    password: password.trim(),
    lastUpdated: new Date().toISOString(),
  };
  return saveSiteData(current);
};
