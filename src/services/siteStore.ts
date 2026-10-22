import { SITE_CONFIG, ResourceArticle, FAQItem, CurriculumModule } from '../config/siteConfig';

export interface SocialLinks {
  youtube: string;
  instagram: string;
  twitter: string;
  tiktok: string;
  whatsapp: string;
}

export interface SiteData {
  articles: ResourceArticle[];
  faqs: FAQItem[];
  curriculum: CurriculumModule[];
  pricing: {
    pakistan: { amount: number; currency: string; formatted: string };
    international: { amount: number; currency: string; formatted: string };
  };
  socialLinks: SocialLinks;
  brand: typeof SITE_CONFIG.brand;
  whatsappMessages: typeof SITE_CONFIG.whatsappMessages;
}

const STORAGE_KEY = 'next_gen_creators_site_data_v2';

const DEFAULT_SOCIAL_LINKS: SocialLinks = {
  youtube: 'https://youtube.com/@nextgencreators',
  instagram: 'https://instagram.com/nextgencreators',
  twitter: 'https://twitter.com/nextgencreators',
  tiktok: 'https://tiktok.com/@nextgencreators',
  whatsapp: SITE_CONFIG.contact.whatsappBaseUrl,
};

export const getSiteData = (): SiteData => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        articles: parsed.articles || SITE_CONFIG.resources,
        faqs: parsed.faqs || SITE_CONFIG.faqs,
        curriculum: parsed.curriculum || SITE_CONFIG.curriculumModules,
        pricing: parsed.pricing || SITE_CONFIG.pricing,
        socialLinks: parsed.socialLinks || DEFAULT_SOCIAL_LINKS,
        brand: parsed.brand || SITE_CONFIG.brand,
        whatsappMessages: parsed.whatsappMessages || SITE_CONFIG.whatsappMessages,
      };
    }
  } catch (e) {
    console.error('Failed to load site data from storage', e);
  }

  return {
    articles: SITE_CONFIG.resources,
    faqs: SITE_CONFIG.faqs,
    curriculum: SITE_CONFIG.curriculumModules,
    pricing: SITE_CONFIG.pricing,
    socialLinks: DEFAULT_SOCIAL_LINKS,
    brand: SITE_CONFIG.brand,
    whatsappMessages: SITE_CONFIG.whatsappMessages,
  };
};

export const saveSiteData = (data: SiteData): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    window.dispatchEvent(new Event('site_data_updated'));
  } catch (e) {
    console.error('Failed to save site data to storage', e);
  }
};
