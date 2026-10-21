import React, { useState } from 'react';
import { SITE_CONFIG } from '../config/siteConfig';
import { useCountry } from '../context/CountryContext';
import { NavPage } from '../components/Header';
import { CountrySelector } from '../components/CountrySelector';
import { WhatsAppButton } from '../components/WhatsAppButton';
import {
  MessageCircle,
  ShieldCheck,
  ExternalLink,
  ArrowRight,
} from 'lucide-react';

interface ContactPageProps {
  onNavigate: (page: NavPage) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const { whatsAppMessage } = useCountry();
  const [customQuestion, setCustomQuestion] = useState('');

  const dynamicMessage = customQuestion.trim()
    ? `${whatsAppMessage}\n\nAdditional Question: ${customQuestion.trim()}`
    : whatsAppMessage;

  const dynamicUrl = `${SITE_CONFIG.contact.whatsappBaseUrl}?text=${encodeURIComponent(dynamicMessage)}`;

  return (
    <div className="py-12 sm:py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 transition-colors">
      
      {/* Header */}
      <div className="max-w-3xl mb-12">
        <span className="text-xs font-semibold uppercase tracking-wider text-[var(--accent-text)] block mb-2">
          Direct Admissions Channel
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[var(--text-primary)] tracking-tight leading-tight">
          Contact Next Gen Creators
        </h1>
        <p className="text-base sm:text-lg text-[var(--text-secondary)] mt-4 leading-relaxed">
          WhatsApp is our primary communication channel for program inquiries, curriculum verification, and enrollment onboarding.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-16">
        
        {/* Left Column: Direct WhatsApp Details (Zero phone number displayed) */}
        <div className="md:col-span-7 space-y-6">
          <div className="p-8 rounded-2xl bg-[var(--bg-surface)] border border-[var(--accent-primary)]/40 shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-500">
                <MessageCircle className="w-5 h-5 fill-emerald-500" />
              </div>
              <div>
                <span className="text-xs font-semibold text-emerald-500 uppercase tracking-wider block">
                  Official Admissions Channel
                </span>
                <span className="text-xl sm:text-2xl font-bold text-[var(--text-primary)]">
                  WhatsApp Support Desk
                </span>
              </div>
            </div>

            <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed mb-6">
              Connect directly with our educational coordinators to ask questions regarding curriculum modules, upcoming start dates, delivery format, and verified tuition payment instructions.
            </p>

            {/* Country Selector in Contact */}
            <div className="pt-4 border-t border-[var(--border-subtle)]">
              <span className="text-xs sm:text-sm text-[var(--text-secondary)] block mb-2 font-semibold">
                Adjust country for tailored message & tuition info:
              </span>
              <CountrySelector variant="segmented" />
            </div>

            {/* Optional Custom Question Box to append to message */}
            <div className="mt-5 pt-4 border-t border-[var(--border-subtle)]">
              <label htmlFor="custom-question" className="block text-xs sm:text-sm font-semibold text-[var(--text-primary)] mb-1.5">
                Have a specific question you want included in your WhatsApp message? (Optional)
              </label>
              <textarea
                id="custom-question"
                rows={2}
                value={customQuestion}
                onChange={(e) => setCustomQuestion(e.target.value)}
                placeholder="e.g. When does the next cohort start? How are reviews conducted?"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--bg-surface-subtle)] border border-[var(--border-color)] text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-primary)] leading-relaxed"
              />
            </div>

            {/* Live Message Preview */}
            <div className="mt-4 p-3.5 rounded-xl bg-[var(--bg-surface-subtle)] border border-[var(--border-subtle)] text-xs sm:text-sm font-mono text-emerald-600 dark:text-emerald-300 leading-relaxed">
              <span className="text-[var(--text-muted)] block text-xs uppercase font-sans mb-1 font-bold">
                Message to be sent via WhatsApp:
              </span>
              "{dynamicMessage}"
            </div>

            <div className="mt-6">
              <a
                href={dynamicUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 fill-white" />
                <span>Open Conversation in WhatsApp</span>
                <ExternalLink className="w-4 h-4 ml-1 opacity-70" />
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Information & Guidelines */}
        <div className="md:col-span-5 space-y-6">
          
          {/* Transparent Contact Policy */}
          <div className="p-6 sm:p-7 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-sm">
            <h3 className="text-base font-bold text-[var(--text-primary)] mb-2.5 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[var(--accent-text)]" />
              <span>Contact Transparency Policy</span>
            </h3>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-3">
              To safeguard prospective students, all official correspondence, syllabus confirmations, and payment verifications occur exclusively via our official WhatsApp admissions desk.
            </p>
            <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
              We do not use high-pressure sales reps, automated cold calling, or unverified secondary numbers.
            </p>
          </div>

          {/* Quick Links */}
          <div className="p-6 sm:p-7 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-sm">
            <h3 className="text-base font-bold text-[var(--text-primary)] mb-3">Helpful Direct Links</h3>
            <div className="space-y-2 text-sm">
              <button
                type="button"
                onClick={() => onNavigate('pricing')}
                className="w-full text-left p-3 rounded-lg bg-[var(--bg-surface-subtle)] hover:bg-[var(--bg-surface-elevated)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors flex items-center justify-between cursor-pointer font-medium"
              >
                <span>View Official Pricing (PKR 50k / $200 USD)</span>
                <ArrowRight className="w-4 h-4 text-[var(--accent-text)]" />
              </button>
              <button
                type="button"
                onClick={() => onNavigate('curriculum')}
                className="w-full text-left p-2.5 rounded-lg bg-[var(--bg-surface-subtle)] hover:bg-[var(--bg-surface-elevated)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors flex items-center justify-between cursor-pointer"
              >
                <span>Inspect 10-Module Syllabus</span>
                <ArrowRight className="w-3.5 h-3.5 text-[var(--accent-text)]" />
              </button>
              <button
                type="button"
                onClick={() => onNavigate('faq')}
                className="w-full text-left p-2.5 rounded-lg bg-[var(--bg-surface-subtle)] hover:bg-[var(--bg-surface-elevated)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors flex items-center justify-between cursor-pointer"
              >
                <span>Read All 13 FAQ Answers</span>
                <ArrowRight className="w-3.5 h-3.5 text-[var(--accent-text)]" />
              </button>
            </div>
          </div>

          {/* Business Details Placeholder Note (Zero phone number) */}
          <div className="p-4 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)] text-[11px] text-[var(--text-muted)] leading-relaxed">
            <span className="font-semibold text-[var(--text-secondary)] block mb-0.5">Contact Notice:</span>
            Next Gen Creators operates digitally. Verified WhatsApp admissions channel. No unauthorized phone numbers or physical office representations are published without verified corporate filing.
          </div>

        </div>

      </div>

    </div>
  );
};
