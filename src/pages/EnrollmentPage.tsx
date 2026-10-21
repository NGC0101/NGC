import React from 'react';
import { SITE_CONFIG } from '../config/siteConfig';
import { useCountry } from '../context/CountryContext';
import { NavPage } from '../components/Header';
import { CountrySelector } from '../components/CountrySelector';
import { WhatsAppButton } from '../components/WhatsAppButton';
import {
  ShieldAlert,
  MessageCircle,
} from 'lucide-react';

interface EnrollmentPageProps {
  onNavigate: (page: NavPage) => void;
}

export const EnrollmentPage: React.FC<EnrollmentPageProps> = ({ onNavigate }) => {
  const { countryType, pricing, whatsAppMessage } = useCountry();

  const enrollmentFaqs = SITE_CONFIG.faqs.filter(
    (f) => f.category === 'Pricing & Enrollment'
  );

  return (
    <div className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-colors">
      
      {/* Intro */}
      <div className="max-w-4xl mb-12">
        <span className="text-xs font-semibold uppercase tracking-wider text-[var(--accent-text)] block mb-2">
          Admissions & Inquiries
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[var(--text-primary)] tracking-tight leading-tight">
          Join the YouTube Automation Mentorship
        </h1>
        <p className="text-base sm:text-lg text-[var(--text-secondary)] mt-4 leading-relaxed max-w-3xl">
          We welcome dedicated learners looking to understand faceless YouTube channels and build systematic content production workflows. Follow the verified steps below to inquire and enroll.
        </p>
      </div>

      {/* Country Selection & Live Fee Box */}
      <div className="p-8 rounded-2xl bg-[var(--bg-surface)] border border-[var(--accent-primary)]/40 shadow-xl mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--accent-text)] block">
              Step 1: Confirm Country & Applicable Tuition
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] tracking-tight">
              Select Your Location
            </h2>
            <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
              Tuition is standardized by geographic region. Select your country to preview your mentorship fee and generate your prefilled WhatsApp inquiry message.
            </p>

            <div className="pt-2">
              <CountrySelector variant="segmented" />
            </div>
          </div>

          <div className="lg:col-span-5 p-6 rounded-xl bg-[var(--bg-surface-subtle)] border border-[var(--border-color)]">
            <span className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider block mb-1">
              Applicable Mentorship Fee
            </span>
            <div className="my-2">
              <span className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)] font-mono tabular-nums">
                {countryType === 'PK'
                  ? 'PKR 50,000'
                  : countryType === 'INTL'
                  ? '$200 USD'
                  : 'PKR 50k / $200 USD'}
              </span>
              <span className="text-sm text-[var(--accent-text)] font-bold block mt-1.5">
                {pricing.primaryDisplay.label}
              </span>
            </div>

            <div className="mt-4 pt-4 border-t border-[var(--border-subtle)] space-y-2.5 text-xs sm:text-sm text-[var(--text-secondary)]">
              <div className="flex items-center justify-between">
                <span>Contact Channel:</span>
                <span className="font-semibold text-[var(--text-primary)]">WhatsApp Admissions Desk</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Verified Status:</span>
                <span className="font-semibold text-emerald-500">Official Channel</span>
              </div>
            </div>

            <div className="mt-5">
              <WhatsAppButton
                label="Discuss Enrollment on WhatsApp"
                variant="primary"
                className="w-full text-center py-3.5 text-sm sm:text-base font-semibold"
              />
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

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {SITE_CONFIG.enrollmentSteps.map((stepItem) => (
            <div
              key={stepItem.step}
              className="p-5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)] flex flex-col justify-between shadow-sm"
            >
              <div>
                <span className="w-8 h-8 rounded-lg bg-[var(--accent-surface)] border border-[var(--accent-primary)]/30 text-[var(--accent-text)] font-mono font-bold text-xs flex items-center justify-center mb-3">
                  0{stepItem.step}
                </span>
                <h3 className="text-base font-bold text-[var(--text-primary)] mb-2">
                  {stepItem.title}
                </h3>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                  {stepItem.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Prefilled WhatsApp Message Preview (Phone Number Hidden) */}
      <div className="p-6 sm:p-7 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] mb-16 shadow-sm">
        <h3 className="text-base font-bold text-[var(--text-primary)] mb-2 flex items-center gap-2">
          <MessageCircle className="w-5 h-5 text-emerald-500 shrink-0" />
          <span>Your Prefilled WhatsApp Inquiry Message:</span>
        </h3>
        <p className="text-sm text-[var(--text-secondary)] mb-3 leading-relaxed">
          When you click the inquiry button, WhatsApp will open with this message prefilled. You review and send it yourself directly in WhatsApp:
        </p>
        <div className="p-4 rounded-xl bg-[var(--bg-surface-subtle)] border border-[var(--border-subtle)] font-mono text-xs sm:text-sm text-emerald-600 dark:text-emerald-300 leading-relaxed">
          "{whatsAppMessage}"
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm text-[var(--text-muted)]">
          <span>Admissions Channel: <strong className="text-[var(--text-primary)] font-semibold">Official WhatsApp Desk</strong></span>
          <WhatsAppButton label="Open in WhatsApp Now" variant="outline" />
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
            <div key={faq.id} className="p-5 sm:p-6 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-sm">
              <h4 className="text-base font-bold text-[var(--text-primary)] mb-2">{faq.question}</h4>
              <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Legal & Educational Disclaimer */}
      <div className="p-6 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs sm:text-sm text-amber-700 dark:text-amber-200 flex items-start gap-3">
        <ShieldAlert className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-bold text-amber-800 dark:text-amber-300">Important Admissions Notice:</p>
          <p>{SITE_CONFIG.disclaimers.primary}</p>
          <p className="text-[11px] opacity-80 pt-1">
            We do not collect credit card credentials on this website. All verified payment instructions are provided strictly by our official WhatsApp support channel.
          </p>
        </div>
      </div>

    </div>
  );
};
