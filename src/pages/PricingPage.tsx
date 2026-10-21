import React from 'react';
import { SITE_CONFIG } from '../config/siteConfig';
import { useCountry } from '../context/CountryContext';
import { NavPage } from '../components/Header';
import { CountrySelector } from '../components/CountrySelector';
import { WhatsAppButton } from '../components/WhatsAppButton';
import { CheckCircle2, ShieldCheck } from 'lucide-react';

interface PricingPageProps {
  onNavigate: (page: NavPage) => void;
}

export const PricingPage: React.FC<PricingPageProps> = ({ onNavigate }) => {
  const { countryType } = useCountry();

  return (
    <div className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-colors">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
        <span className="text-xs font-semibold uppercase tracking-wider text-[var(--accent-text)] block mb-2">
          Transparent Investment
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[var(--text-primary)] tracking-tight leading-tight">
          Transparent Pricing. Practical Learning.
        </h1>
        <p className="text-base sm:text-lg text-[var(--text-secondary)] mt-4 leading-relaxed text-balance">
          Choose the applicable mentorship fee based on your country and contact us to discuss the curriculum and enrollment process.
        </p>

        {/* Centralized Country Selector */}
        <div className="mt-8 flex justify-center">
          <CountrySelector variant="segmented" />
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
        
        {/* Pakistan Option */}
        <div
          className={`rounded-2xl p-8 border transition-all duration-200 flex flex-col justify-between ${
            countryType === 'PK'
              ? 'bg-[var(--bg-surface)] border-[var(--accent-primary)] shadow-2xl ring-2 ring-[var(--accent-primary)]/20'
              : 'bg-[var(--bg-surface)] border-[var(--border-color)] shadow-sm'
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
                Pakistan Students
              </span>
              {countryType === 'PK' ? (
                <span className="text-xs font-mono bg-[var(--accent-surface)] text-[var(--accent-text)] px-3 py-1 rounded-full border border-[var(--accent-primary)]/30 font-bold">
                  Active Selection
                </span>
              ) : (
                <span className="text-xs text-[var(--text-muted)] font-semibold">Official Rate</span>
              )}
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] mb-2">
              Paid YouTube Automation Mentorship
            </h2>

            <div className="my-6">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl sm:text-5xl font-extrabold text-[var(--text-primary)] font-mono tabular-nums">
                  PKR 50,000
                </span>
              </div>
              <span className="text-sm text-[var(--accent-text)] font-bold block mt-1.5">
                Mentorship Fee: PKR 50,000
              </span>
            </div>

            <p className="text-sm sm:text-base text-[var(--text-secondary)] mb-6 leading-relaxed">
              Standard tuition for students located in Pakistan. Clean, fixed pricing with no hidden registration surcharges.
            </p>

            <div className="space-y-3.5 pt-6 border-t border-[var(--border-subtle)] text-sm sm:text-base text-[var(--text-secondary)]">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-[var(--accent-text)] shrink-0 mt-0.5" />
                <span>Complete 10-module educational curriculum</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-[var(--accent-text)] shrink-0 mt-0.5" />
                <span>Faceless channel workflows & SOPs</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-[var(--accent-text)] shrink-0 mt-0.5" />
                <span>Verified inquiry and onboarding via WhatsApp</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-[var(--accent-text)] shrink-0 mt-0.5" />
                <span>Local bank transfer instructions provided on WhatsApp</span>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-[var(--border-subtle)]">
            <WhatsAppButton
              label="Ask About Mentorship (PKR 50,000)"
              variant={countryType === 'PK' ? 'primary' : 'outline'}
              className="w-full text-center py-3.5 text-sm sm:text-base"
            />
          </div>
        </div>

        {/* International Option */}
        <div
          className={`rounded-2xl p-8 border transition-all duration-200 flex flex-col justify-between ${
            countryType === 'INTL'
              ? 'bg-[var(--bg-surface)] border-[var(--accent-primary)] shadow-2xl ring-2 ring-[var(--accent-primary)]/20'
              : 'bg-[var(--bg-surface)] border-[var(--border-color)] shadow-sm'
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
                International Students
              </span>
              {countryType === 'INTL' ? (
                <span className="text-xs font-mono bg-[var(--accent-surface)] text-[var(--accent-text)] px-3 py-1 rounded-full border border-[var(--accent-primary)]/30 font-bold">
                  Active Selection
                </span>
              ) : (
                <span className="text-xs text-[var(--text-muted)] font-semibold">Official Rate</span>
              )}
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] mb-2">
              Paid YouTube Automation Mentorship
            </h2>

            <div className="my-6">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl sm:text-5xl font-extrabold text-[var(--text-primary)] font-mono tabular-nums">
                  $200 USD
                </span>
              </div>
              <span className="text-sm text-[var(--accent-text)] font-bold block mt-1.5">
                Mentorship Fee: $200 USD
              </span>
            </div>

            <p className="text-sm sm:text-base text-[var(--text-secondary)] mb-6 leading-relaxed">
              Standard tuition for students residing outside Pakistan. Applicable worldwide across North America, Europe, Middle East, and Asia.
            </p>

            <div className="space-y-3.5 pt-6 border-t border-[var(--border-subtle)] text-sm sm:text-base text-[var(--text-secondary)]">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-[var(--accent-text)] shrink-0 mt-0.5" />
                <span>Complete 10-module educational curriculum</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-[var(--accent-text)] shrink-0 mt-0.5" />
                <span>Faceless channel workflows & SOPs</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-[var(--accent-text)] shrink-0 mt-0.5" />
                <span>Verified inquiry and onboarding via WhatsApp</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[var(--accent-text)] shrink-0 mt-0.5" />
                <span>International transfer options shared via WhatsApp</span>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-[var(--border-subtle)]">
            <WhatsAppButton
              label="Ask About Mentorship ($200 USD)"
              variant={countryType === 'INTL' ? 'primary' : 'outline'}
              className="w-full text-center py-3 text-sm"
            />
          </div>
        </div>

      </div>

      {/* Honest Advisory Notice (Zero Phone Number) */}
      <div className="max-w-4xl mx-auto p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] text-xs sm:text-sm text-[var(--text-secondary)] space-y-3 shadow-sm">
        <div className="flex items-center gap-2 text-[var(--text-primary)] font-semibold">
          <ShieldCheck className="w-4 h-4 text-[var(--accent-text)]" />
          <span>Our Transparent Pricing Standards:</span>
        </div>
        <p className="text-[var(--text-secondary)] text-xs leading-relaxed">
          These are the official prices established for Next Gen Creators. We do not invent fake discounts, crossed-out retail prices, or artificial scarcity countdowns. Prospective students can ask about the verified curriculum, delivery format, available payment methods, and enrollment process directly through our verified WhatsApp admissions desk.
        </p>
      </div>

    </div>
  );
};
