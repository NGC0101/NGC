import test from 'node:test';
import assert from 'node:assert/strict';
import {
  normalizeCountry,
  getPricing,
  getWhatsAppMessage,
  buildWhatsAppUrl,
} from './pricing';
import { SITE_CONFIG } from '../config/siteConfig';

test('normalizeCountry correctly classifies Pakistan', () => {
  assert.equal(normalizeCountry('PK'), 'PK');
  assert.equal(normalizeCountry('pk'), 'PK');
  assert.equal(normalizeCountry('Pakistan'), 'PK');
  assert.equal(normalizeCountry('PAKISTAN'), 'PK');
});

test('normalizeCountry correctly classifies International destinations', () => {
  assert.equal(normalizeCountry('US'), 'INTL');
  assert.equal(normalizeCountry('United States'), 'INTL');
  assert.equal(normalizeCountry('GB'), 'INTL');
  assert.equal(normalizeCountry('INTL'), 'INTL');
  assert.equal(normalizeCountry('OTHER'), 'INTL');
});

test('normalizeCountry handles null, empty, or unknown values', () => {
  assert.equal(normalizeCountry(''), 'UNKNOWN');
  assert.equal(normalizeCountry(null), 'UNKNOWN');
  assert.equal(normalizeCountry(undefined), 'UNKNOWN');
  assert.equal(normalizeCountry('UNKNOWN'), 'UNKNOWN');
});

test('getPricing returns PKR 50,000 for Pakistan', () => {
  const price = getPricing('PK');
  assert.equal(price.isPakistan, true);
  assert.equal(price.isInternational, false);
  assert.equal(price.primaryDisplay.amount, 50000);
  assert.equal(price.primaryDisplay.currency, 'PKR');
  assert.equal(price.primaryDisplay.label, 'Mentorship Fee: PKR 50,000');
});

test('getPricing returns $200 USD for International', () => {
  const price = getPricing('US');
  assert.equal(price.isPakistan, false);
  assert.equal(price.isInternational, true);
  assert.equal(price.primaryDisplay.amount, 200);
  assert.equal(price.primaryDisplay.currency, 'USD');
  assert.equal(price.primaryDisplay.label, 'Mentorship Fee: $200 USD');
});

test('getPricing shows both options when country is unknown', () => {
  const price = getPricing(null);
  assert.equal(price.isUnknown, true);
  assert.equal(price.primaryDisplay.showBoth, true);
  assert.equal(price.pakistanPrice.formatted, 'PKR 50,000');
  assert.equal(price.internationalPrice.formatted, '$200 USD');
});

test('getWhatsAppMessage returns exact verified copy for Pakistan', () => {
  const msg = getWhatsAppMessage('PK');
  assert.equal(
    msg,
    "Assalam-o-Alaikum! I'm interested in joining the Next Gen Creators YouTube Automation Mentorship. I understand the mentorship fee is PKR 50,000. Please share the curriculum and enrollment process."
  );
});

test('getWhatsAppMessage returns exact verified copy for International', () => {
  const msg = getWhatsAppMessage('INTL');
  assert.equal(
    msg,
    "Hello Next Gen Creators! I'm interested in your YouTube Automation Mentorship Program. I understand the mentorship fee is $200 USD. Please share the curriculum and enrollment process."
  );
});

test('getWhatsAppMessage returns exact verified copy for Unknown', () => {
  const msg = getWhatsAppMessage(null);
  assert.equal(
    msg,
    "Hello Next Gen Creators! I'm interested in your YouTube Automation Mentorship Program. Please confirm the applicable mentorship fee and share the curriculum and enrollment process."
  );
});

test('buildWhatsAppUrl constructs valid wa.me URL with properly encoded query text', () => {
  const urlPk = buildWhatsAppUrl('PK');
  assert.ok(urlPk.startsWith('https://wa.me/447366387620?text='));
  assert.ok(urlPk.includes(encodeURIComponent('PKR 50,000')));

  const urlIntl = buildWhatsAppUrl('US');
  assert.ok(urlIntl.startsWith('https://wa.me/447366387620?text='));
  assert.ok(urlIntl.includes(encodeURIComponent('$200 USD')));
});
