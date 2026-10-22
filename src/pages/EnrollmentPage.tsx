import React, { useState, useEffect } from 'react';
import { useCountry } from '../context/CountryContext';
import { NavPage } from '../components/Header';
import { WhatsAppButton } from '../components/WhatsAppButton';
import {
  ShieldAlert,
  MessageCircle,
  CheckCircle2,
  Check,
  ShieldCheck,
} from 'lucide-react';
import { getSiteData } from '../services/siteStore';
import { SITE_CONFIG } from '../config/siteConfig';

interface EnrollmentPageProps {
  onNavigate: (page: NavPage) => void;
}

export const EnrollmentPage: React.FC<EnrollmentPageProps> = ({ onNavigate }) => {
  const { countryType, setSelectedCountry, pricing, whatsAppMessage } = useCountry();
  const [faqs, setFaqs] = useState(getSiteData().faqs);

  useEffect(() => {
    const handleUpdate = () => {
      setFaqs(getSiteData().faqs);
    };
    window.addEventListener('site_data_updated', handleUpdate);
    return () => window.removeEventListener('site_data_updated', handleUpdate);
  }, []);

  const enrollmentFaqs = faqs.filter(
    (f) => f.category === 'Pricing & Enrollment'
  );

  const activeFeeFormatted =
    countryType === 'PK'
      ? pricing.pakistanPrice.formatted
      : pricing.internationalPrice.formatted;

  return (
    <div className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-colors">
      
      {/* Intro */}
      <div className="max-w-3xl mb-12">
        <span className="text-xs font-semibold uppercase tracking-wider text-[var(--accent-text)] block mb-2">
          Admissions & Enrollment
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[var(--text-primary)] tracking-tight leading-tight">
          Join the YouTube Automation Mentorship
        </h1>
        <p className="text-base sm:text-lg text-[var(--text-secondary)] mt-4 leading-relaxed">
          We welcome dedicated creators looking to master faceless YouTube workflows and practical production systems. Follow the verified steps below to confirm your track and initiate enrollment.
        </p>
      </div>

      {/* Improved Country Selection & Live Fee Section */}
      <div className="p-7 sm:p-9 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-sm hover:shadow-md transition-shadow mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left Column: Residency Track Selection */}
          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--accent-text)] block">
              Step 1 of 2 · Confirm Tuition Track
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] tracking-tight">
              Select Your Geographic Track
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
              Tuition is standardized by residency. Choose your track below to preview your exact mentorship fee, payment options, and prefilled WhatsApp inquiry message.
            </p>

            {/* Tactile 2-Option Track Selection Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              
              {/* Pakistan Track */}
              <button
                type="button"
                onClick={() => setSelectedCountry('PK')}
                className={`p-4 sm:p-5 rounded-xl border text-left transition-all duration-200 cursor-pointer active:scale-[0.99] flex flex-col justify-between ${
                  countryType === 'PK'
                    ? 'bg-[var(--accent-surface)] border-[var(--accent-primary)] ring-2 ring-[var(--accent-primary)]/20 shadow-xs'
                    : 'bg-[var(--bg-surface-subtle)] border-[var(--border-subtle)] hover:border-[var(--border-color)] text-[var(--text-secondary)]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold text-[var(--text-primary)] flex items-center gap-1.5">
                      <span className="text-base">🇵🇰</span>
                      <span>Pakistan Track</span>
                    </span>
                    {countryType === 'PK' ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10.5px] font-bold bg-[var(--accent-primary)] text-white">
                        <Check className="w-3 h-3" strokeWidth={3} />
                        <span>Active</span>
                      </span>
                    ) : (
                      <span className="text-[11px] font-mono text-[var(--text-muted)] font-medium">PKR</span>
                    )}
                  </div>
                  <div className="text-lg font-extrabold text-[var(--text-primary)] font-mono tabular-nums">
                    {pricing.pakistanPrice.formatted}
                  </div>
                  <p className="text-xs text-[var(--text-secondary)] mt-1.5 leading-snug">
                    Local Bank Transfer, Raast & Easypaisa instructions provided on WhatsApp.
                  </p>
                </div>
              </button>

              {/* International Track */}
              <button
                type="button"
                onClick={() => setSelectedCountry('INTL')}
                className={`p-4 sm:p-5 rounded-xl border text-left transition-all duration-200 cursor-pointer active:scale-[0.99] flex flex-col justify-between ${
                  countryType === 'INTL'
                    ? 'bg-[var(--accent-surface)] border-[var(--accent-primary)] ring-2 ring-[var(--accent-primary)]/20 shadow-xs'
                    : 'bg-[var(--bg-surface-subtle)] border-[var(--border-subtle)] hover:border-[var(--border-color)] text-[var(--text-secondary)]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold text-[var(--text-primary)] flex items-center gap-1.5">
                      <span className="text-base">🌐</span>
                      <span>International Track</span>
                    </span>
                    {countryType === 'INTL' ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10.5px] font-bold bg-[var(--accent-primary)] text-white">
                        <Check className="w-3 h-3" strokeWidth={3} />
                        <span>Active</span>
                      </span>
                    ) : (
                      <span className="text-[11px] font-mono text-[var(--text-muted)] font-medium">USD</span>
                    )}
                  </div>
                  <div className="text-lg font-extrabold text-[var(--text-primary)] font-mono tabular-nums">
                    {pricing.internationalPrice.formatted}
                  </div>
                  <p className="text-xs text-[var(--text-secondary)] mt-1.5 leading-snug">
                    Worldwide wire and online payment methods shared on WhatsApp.
                  </p>
                </div>
              </button>

            </div>
          </div>

          {/* Right Column: Live Tuition Summary & Direct WhatsApp Inquiry */}
          <div className="lg:col-span-5 p-6 sm:p-7 rounded-xl bg-[var(--bg-surface-subtle)] border border-[var(--border-color)] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">
                  Applicable Mentorship Fee
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Verified Official</span>
                </span>
              </div>

              <div className="my-3">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)] font-mono tabular-nums tracking-tight">
                    {activeFeeFormatted}
                  </span>
                  <span className="text-xs text-[var(--text-muted)] font-medium">/ Complete Course</span>
                </div>
                <span className="text-xs text-[var(--accent-text)] font-semibold block mt-1">
                  {countryType === 'PK' ? 'Pakistan Domestic Rate' : 'International Worldwide Rate'}
                </span>
              </div>

              <div className="mt-4 pt-4 border-t border-[var(--border-subtle)] space-y-2 text-xs text-[var(--text-secondary)]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[var(--accent-text)] shrink-0" />
                  <span>Full 10-Module YouTube Automation Framework</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[var(--accent-text)] shrink-0" />
                  <span>1-on-1 Guidance via WhatsApp Admissions Desk</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[var(--accent-text)] shrink-0" />
                  <span>Practical homework & channel audit reviews</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[var(--border-subtle)]">
              <WhatsAppButton
                label={`Inquire & Enroll on WhatsApp (${activeFeeFormatted})`}
                variant="primary"
                className="w-full text-center py-3.5 text-xs sm:text-sm font-semibold shadow-sm"
              />
              <p className="text-[11px] text-[var(--text-muted)] text-center mt-2">
                Connects directly to our official admissions desk
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* 5-Step Enrollment Flow Explanation */}
      <div className="mb-16">
        <div className="max-w-3xl mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--accent-text)] block mb-1">
            Enrollment Sequence
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] tracking-tight">
            How Enrollment Works
          </h2>
          <p className="text-sm sm:text-base text-[var(--text-secondary)] mt-1.5 leading-relaxed">
            We prioritize personal verification and clear communication before accepting any student.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
          {SITE_CONFIG.enrollmentSteps.map((stepItem) => (
            <div
              key={stepItem.step}
              className="p-5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)] flex flex-col justify-between shadow-xs hover:border-[var(--accent-primary)]/40 transition-colors"
            >
              <div>
                <span className="w-8 h-8 rounded-lg bg-[var(--accent-surface)] border border-[var(--accent-primary)]/30 text-[var(--accent-text)] font-mono font-bold text-xs flex items-center justify-center mb-3">
                  0{stepItem.step}
                </span>
                <h3 className="text-sm sm:text-base font-bold text-[var(--text-primary)] mb-1.5">
                  {stepItem.title}
                </h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  {stepItem.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Prefilled WhatsApp Message Preview (Phone Number Hidden) */}
      <div className="p-6 sm:p-7 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] mb-16 shadow-xs">
        <h3 className="text-base font-bold text-[var(--text-primary)] mb-2 flex items-center gap-2">
          <MessageCircle className="w-5 h-5 text-emerald-500 shrink-0" />
          <span>Your Prefilled WhatsApp Inquiry Message:</span>
        </h3>
        <p className="text-xs sm:text-sm text-[var(--text-secondary)] mb-3 leading-relaxed">
          When you click the inquiry button, WhatsApp will open with this message prefilled. You review and send it yourself directly in WhatsApp:
        </p>
        <div className="p-4 rounded-xl bg-[var(--bg-surface-subtle)] border border-[var(--border-subtle)] font-mono text-xs sm:text-sm text-emerald-600 dark:text-emerald-300 leading-relaxed">
          "{whatsAppMessage}"
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm text-[var(--text-muted)]">
          <span>Admissions Channel: <strong className="text-[var(--text-primary)] font-semibold">Official WhatsApp Desk</strong></span>
          <WhatsAppButton label="Open in WhatsApp Now" variant="outline" className="py-2 px-4 text-xs font-semibold" />
        </div>
      </div>

      {/* Frequently Asked Enrollment Questions */}
      <div className="mb-16">
        <div className="max-w-3xl mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--accent-text)] block mb-1">
            Enrollment FAQs
          </span>
          <h2 className="text-2xl font-bold text-[var(--text-primary)] tracking-tight">
            Questions About Enrolling
          </h2>
        </div>

        <div className="space-y-3">
          {enrollmentFaqs.map((faq) => (
            <div key={faq.id} className="p-5 sm:p-6 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-xs">
              <h4 className="text-sm sm:text-base font-bold text-[var(--text-primary)] mb-1.5">{faq.question}</h4>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Legal & Educational Disclaimer */}
      <div className="p-6 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs sm:text-sm text-amber-800 dark:text-amber-200 flex items-start gap-3">
        <ShieldAlert className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-bold">Important Admissions Notice:</p>
          <p className="leading-relaxed">{SITE_CONFIG.disclaimers.primary}</p>
          <p className="text-[11px] opacity-80 pt-1">
            We do not collect credit card credentials on this website. All verified payment instructions are provided strictly by our official WhatsApp support channel.
          </p>
        </div>
      </div>

    </div>
  );
};
