import React, { useState, useEffect } from 'react';
import { useCountry } from '../context/CountryContext';
import { NavPage } from '../components/Header';
import { WhatsAppButton } from '../components/WhatsAppButton';
import { CheckCircle2, ShieldCheck, CreditCard, MessageSquare, ArrowRight, Sparkles, Check } from 'lucide-react';
import { getSiteData, SiteData } from '../services/siteStore';

interface PricingPageProps {
  onNavigate: (page: NavPage) => void;
}

export const PricingPage: React.FC<PricingPageProps> = ({ onNavigate }) => {
  const { countryType, setSelectedCountry } = useCountry();
  const [siteData, setSiteData] = useState<SiteData>(getSiteData());

  useEffect(() => {
    const handleUpdate = () => {
      setSiteData(getSiteData());
    };
    window.addEventListener('site_data_updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener('site_data_updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  const pkFormatted = siteData.pricing.pakistan.formatted;
  const intlFormatted = siteData.pricing.international.formatted;

  const features = [
    'Complete 10-Module YouTube Automation Framework',
    'Direct 1-on-1 Guidance & Inquiry via WhatsApp',
    'Practical hands-on channel audits & topic validation',
    'High-retention scriptwriting templates & frameworks',
    'Video assembly, pacing & sound design SOPs',
    'High-CTR thumbnail packaging & psychological design',
    'Lifetime access to spreadsheets, tools & resources',
    'No renewal charges, upsells, or locked tiers',
  ];

  return (
    <div className="py-12 sm:py-16 lg:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-colors">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
        <span className="text-xs font-semibold uppercase tracking-wider text-[var(--accent-text)] block mb-2.5">
          Standardized Tuition & Admissions
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[var(--text-primary)] tracking-tight leading-tight">
          Transparent Pricing. Dedicated Mentorship.
        </h1>
        <p className="text-sm sm:text-base text-[var(--text-secondary)] mt-4 leading-relaxed text-balance">
          Fixed, upfront rates with direct mentor access and practical deliverables. No hidden registration surcharges, artificial discounts, or fake countdowns.
        </p>
      </div>



      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
        
        {/* Pakistan Option */}
        <div
          onClick={() => setSelectedCountry('PK')}
          className={`rounded-2xl p-7 sm:p-9 border transition-all duration-200 flex flex-col justify-between cursor-pointer ${
            countryType === 'PK'
              ? 'bg-[var(--bg-surface)] border-[var(--accent-primary)] shadow-md ring-2 ring-[var(--accent-primary)]/20'
              : 'bg-[var(--bg-surface)] border-[var(--border-color)] hover:border-[var(--accent-primary)]/40 shadow-xs'
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[var(--bg-surface-subtle)] text-[var(--text-primary)] border border-[var(--border-subtle)]">
                <span>🇵🇰</span>
                <span>Pakistan Domestic Track</span>
              </span>
              {countryType === 'PK' ? (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[var(--accent-surface)] text-[var(--accent-text)] border border-[var(--accent-primary)]/30">
                  <Check className="w-3 h-3" strokeWidth={2.5} />
                  <span>Selected</span>
                </span>
              ) : (
                <span className="text-[11px] font-mono font-medium text-[var(--text-muted)] uppercase tracking-wider">
                  Official Tuition
                </span>
              )}
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] mb-2">
              Full YouTube Automation Mentorship
            </h2>

            <div className="my-6">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl sm:text-5xl font-extrabold text-[var(--text-primary)] font-mono tabular-nums tracking-tight">
                  {pkFormatted}
                </span>
                <span className="text-xs sm:text-sm font-medium text-[var(--text-muted)]">/ One-time tuition</span>
              </div>
              <span className="text-xs sm:text-sm text-[var(--accent-text)] font-semibold block mt-1.5">
                Complete 10-Module Educational Program
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[var(--text-secondary)] mb-6 leading-relaxed">
              Standard tuition for students located in Pakistan. Clean, fixed pricing with verified local bank transfer, Raast, or Easypaisa payment guidance provided on WhatsApp.
            </p>

            <div className="space-y-3 pt-6 border-t border-[var(--border-subtle)] text-xs sm:text-sm text-[var(--text-secondary)]">
              {features.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[var(--accent-text)] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-[var(--border-subtle)] space-y-2.5" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={() => {
                setSelectedCountry('PK');
                onNavigate('enrollment');
              }}
              className="w-full py-3.5 px-4 rounded-xl bg-[var(--accent-primary)] hover:opacity-90 active:scale-[0.99] text-white font-semibold text-xs sm:text-sm shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer group"
            >
              <span>Join Program</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </button>
          </div>
        </div>

        {/* International Option */}
        <div
          onClick={() => setSelectedCountry('INTL')}
          className={`rounded-2xl p-7 sm:p-9 border transition-all duration-200 flex flex-col justify-between cursor-pointer ${
            countryType === 'INTL'
              ? 'bg-[var(--bg-surface)] border-[var(--accent-primary)] shadow-md ring-2 ring-[var(--accent-primary)]/20'
              : 'bg-[var(--bg-surface)] border-[var(--border-color)] hover:border-[var(--accent-primary)]/40 shadow-xs'
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[var(--bg-surface-subtle)] text-[var(--text-primary)] border border-[var(--border-subtle)]">
                <span>🌐</span>
                <span>International Track</span>
              </span>
              {countryType === 'INTL' ? (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[var(--accent-surface)] text-[var(--accent-text)] border border-[var(--accent-primary)]/30">
                  <Check className="w-3 h-3" strokeWidth={2.5} />
                  <span>Selected</span>
                </span>
              ) : (
                <span className="text-[11px] font-mono font-medium text-[var(--text-muted)] uppercase tracking-wider">
                  Official Tuition
                </span>
              )}
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] mb-2">
              Full YouTube Automation Mentorship
            </h2>

            <div className="my-6">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl sm:text-5xl font-extrabold text-[var(--text-primary)] font-mono tabular-nums tracking-tight">
                  {intlFormatted}
                </span>
                <span className="text-xs sm:text-sm font-medium text-[var(--text-muted)]">/ One-time tuition</span>
              </div>
              <span className="text-xs sm:text-sm text-[var(--accent-text)] font-semibold block mt-1.5">
                Complete 10-Module Educational Program
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[var(--text-secondary)] mb-6 leading-relaxed">
              Standard tuition for international creators residing outside Pakistan (USA, UK, Canada, UAE, Europe, Worldwide). International wire and digital transfer methods shared via WhatsApp.
            </p>

            <div className="space-y-3 pt-6 border-t border-[var(--border-subtle)] text-xs sm:text-sm text-[var(--text-secondary)]">
              {features.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[var(--accent-text)] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-[var(--border-subtle)] space-y-2.5" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={() => {
                setSelectedCountry('INTL');
                onNavigate('enrollment');
              }}
              className="w-full py-3.5 px-4 rounded-xl bg-[var(--accent-primary)] hover:opacity-90 active:scale-[0.99] text-white font-semibold text-xs sm:text-sm shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer group"
            >
              <span>Join Program</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </button>
          </div>
        </div>

      </div>

      {/* Trust & Transparency Feature Strip */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
        <div className="p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)]">
          <div className="w-9 h-9 rounded-xl bg-[var(--bg-surface-subtle)] flex items-center justify-center text-[var(--accent-text)] mb-3 border border-[var(--border-subtle)]">
            <CreditCard className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-1">
            Zero Hidden Surcharges
          </h3>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            One published fee covers your entire mentorship. No surprise software upcharges, renewal fees, or paid tier lockouts.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)]">
          <div className="w-9 h-9 rounded-xl bg-[var(--bg-surface-subtle)] flex items-center justify-center text-[var(--accent-text)] mb-3 border border-[var(--border-subtle)]">
            <MessageSquare className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-1">
            Pre-Enrollment Consultation
          </h3>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            Discuss your goals, niche ideas, study schedule, and curriculum pacing directly via WhatsApp before committing.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)]">
          <div className="w-9 h-9 rounded-xl bg-[var(--bg-surface-subtle)] flex items-center justify-center text-[var(--accent-text)] mb-3 border border-[var(--border-subtle)]">
            <Sparkles className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-1">
            Practical Craft Deliverables
          </h3>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            You will complete actionable scripts, editing timelines, audio masters, and thumbnail designs with individual critique.
          </p>
        </div>
      </div>

      {/* Honest Advisory Notice */}
      <div className="max-w-5xl mx-auto p-6 sm:p-7 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] text-xs sm:text-sm text-[var(--text-secondary)] space-y-3 shadow-xs">
        <div className="flex items-center gap-2 text-[var(--text-primary)] font-semibold text-sm">
          <ShieldCheck className="w-4 h-4 text-[var(--accent-text)] shrink-0" />
          <span>Our Transparent Tuition Commitment</span>
        </div>
        <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
          These are the official prices established for Next Gen Creators ({pkFormatted} for students in Pakistan, {intlFormatted} for international students). We do not manipulate fees with artificial countdown timers or exaggerated discount claims. Every enrolled student receives the full 10-module framework and direct guidance.
        </p>
        <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-medium">
          <button
            type="button"
            onClick={() => onNavigate('curriculum')}
            className="text-[var(--accent-text)] hover:underline inline-flex items-center gap-1 cursor-pointer"
          >
            <span>Review Full 10-Module Curriculum</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <span className="text-[var(--text-muted)]">·</span>
          <button
            type="button"
            onClick={() => onNavigate('faq')}
            className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer"
          >
            Read Mentorship FAQs
          </button>
        </div>
      </div>

    </div>
  );
};
