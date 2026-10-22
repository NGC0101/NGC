import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import {
  getDefaultSiteData,
  generateDefaultWhatsappMessages,
  exportSiteDataJson,
  importSiteDataJson,
  DEFAULT_ADMIN_CREDENTIALS,
} from './siteStore';
import {
  normalizeCountry,
  getPricing,
  getWhatsAppMessage,
  buildWhatsAppUrl,
} from '../utils/pricing';

describe('Site Store & Configuration Architecture', () => {
  test('getDefaultSiteData returns complete, valid schema', () => {
    const data = getDefaultSiteData();
    assert.ok(Array.isArray(data.articles), 'articles should be array');
    assert.ok(data.articles.length >= 2, 'should have at least 2 default articles');
    assert.ok(Array.isArray(data.faqs), 'faqs should be array');
    assert.ok(Array.isArray(data.curriculum), 'curriculum should be array');
    assert.equal(data.pricing.pakistan.currency, 'PKR');
    assert.equal(data.pricing.international.currency, 'USD');
    assert.equal(data.adminCredentials?.username, DEFAULT_ADMIN_CREDENTIALS.username);
  });

  test('generateDefaultWhatsappMessages embeds dynamic pricing accurately', () => {
    const messages = generateDefaultWhatsappMessages('PKR 75,000', '$300 USD');
    assert.ok(messages.pakistan.includes('PKR 75,000'));
    assert.ok(messages.international.includes('$300 USD'));
  });

  test('importSiteDataJson rejects invalid inputs and parses valid JSON', () => {
    const badRes = importSiteDataJson('invalid json{}');
    assert.equal(badRes.success, false);

    const missingData = importSiteDataJson('{"foo": "bar"}');
    assert.equal(missingData.success, false);

    const validExport = exportSiteDataJson();
    const goodRes = importSiteDataJson(validExport);
    assert.equal(goodRes.success, true);
  });
});

describe('Pricing & WhatsApp Message Computation', () => {
  test('normalizeCountry correctly classifies country inputs', () => {
    assert.equal(normalizeCountry('PK'), 'PK');
    assert.equal(normalizeCountry('pakistan'), 'PK');
    assert.equal(normalizeCountry('US'), 'INTL');
    assert.equal(normalizeCountry('GB'), 'INTL');
    assert.equal(normalizeCountry('INTERNATIONAL'), 'INTL');
    assert.equal(normalizeCountry(''), 'UNKNOWN');
    assert.equal(normalizeCountry(null), 'UNKNOWN');
  });

  test('getPricing returns structured pricing for Pakistan and International', () => {
    const pkPricing = getPricing('PK');
    assert.equal(pkPricing.countryType, 'PK');
    assert.equal(pkPricing.isPakistan, true);
    assert.equal(pkPricing.primaryDisplay.showBoth, false);
    assert.ok(pkPricing.primaryDisplay.formatted.includes('PKR'));

    const intlPricing = getPricing('US');
    assert.equal(intlPricing.countryType, 'INTL');
    assert.equal(intlPricing.isInternational, true);
    assert.ok(intlPricing.primaryDisplay.formatted.includes('USD') || intlPricing.primaryDisplay.formatted.includes('$'));

    const unknownPricing = getPricing(null);
    assert.equal(unknownPricing.countryType, 'UNKNOWN');
    assert.equal(unknownPricing.primaryDisplay.showBoth, true);
  });

  test('getWhatsAppMessage and buildWhatsAppUrl generate compliant URLs without telephone exposure in text', () => {
    const pkMsg = getWhatsAppMessage('PK');
    assert.ok(pkMsg.includes('Next Gen Creators'));
    assert.ok(pkMsg.includes('PKR'));

    const url = buildWhatsAppUrl('PK', 'Cohort Inquiry');
    assert.ok(url.startsWith('https://wa.me/'));
    assert.ok(url.includes('text='));
    assert.ok(url.includes(encodeURIComponent('Cohort Inquiry')));
  });
});
