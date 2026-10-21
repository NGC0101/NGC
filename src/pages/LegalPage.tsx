import React, { useState } from 'react';
import { SITE_CONFIG } from '../config/siteConfig';
import { NavPage } from '../components/Header';
import { WhatsAppButton } from '../components/WhatsAppButton';
import { ShieldAlert, FileText, Lock, AlertTriangle } from 'lucide-react';

interface LegalPageProps {
  initialTab?: 'disclaimer' | 'terms' | 'privacy';
  onNavigate: (page: NavPage) => void;
}

export const LegalPage: React.FC<LegalPageProps> = ({ initialTab = 'disclaimer' }) => {
  const [activeTab, setActiveTab] = useState<'disclaimer' | 'terms' | 'privacy'>(initialTab);

  return (
    <div className="py-12 sm:py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 transition-colors">
      
      {/* Tab Switcher */}
      <div className="flex items-center gap-2 mb-8 p-1 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)] w-fit shadow-sm">
        <button
          type="button"
          onClick={() => setActiveTab('disclaimer')}
          className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
            activeTab === 'disclaimer'
              ? 'bg-[var(--accent-primary)] text-white shadow-sm'
              : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
          }`}
        >
          Educational Disclaimer
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('terms')}
          className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
            activeTab === 'terms'
              ? 'bg-[var(--accent-primary)] text-white shadow-sm'
              : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
          }`}
        >
          Terms & Conditions
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('privacy')}
          className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
            activeTab === 'privacy'
              ? 'bg-[var(--accent-primary)] text-white shadow-sm'
              : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
          }`}
        >
          Privacy Policy
        </button>
      </div>

      {/* Editor Legal Review Notice */}
      <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-200 text-xs mb-8 flex items-start gap-2.5">
        <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
        <p>
          <strong>Draft Notice for Site Owner:</strong> The legal texts provided below represent sensible, transparent baseline drafts tailored for Next Gen Creators. Ensure your legal counsel reviews these documents before formal corporate filing in your operating jurisdiction.
        </p>
      </div>

      {/* TAB 1: DISCLAIMER */}
      {activeTab === 'disclaimer' && (
        <div className="p-8 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] space-y-6 text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed shadow-sm">
          <div className="flex items-center gap-3 border-b border-[var(--border-subtle)] pb-4">
            <ShieldAlert className="w-6 h-6 text-amber-500" />
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)]">
                Educational & Financial Disclaimer
              </h1>
              <span className="text-[11px] text-[var(--text-muted)]">Effective Date: October 2026</span>
            </div>
          </div>

          <section className="space-y-2">
            <h2 className="text-sm font-bold text-[var(--text-primary)]">1. Educational Mentorship Nature</h2>
            <p>
              Next Gen Creators is an online educational brand offering training and mentorship on YouTube automation workflows and faceless channel production. Next Gen Creators is NOT a channel management agency, done-for-you investment program, or financial advisory service.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-sm font-bold text-[var(--text-primary)]">2. No Earnings or Income Guarantees</h2>
            <p>
              {SITE_CONFIG.disclaimers.primary}
            </p>
            <p>
              Under no circumstances does Next Gen Creators represent or warrant that participation in this program will result in income, profits, monetization approval, or commercial success. Building a digital channel requires personal effort, content experimentation, skill acquisition, and time.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-sm font-bold text-[var(--text-primary)]">3. Platform Non-Affiliation and Trademarks</h2>
            <p>
              {SITE_CONFIG.disclaimers.trademark}
            </p>
            <p>
              All trademarks, logos, and brand names referenced on this site belong to their respective owners. Their use is for nominative identification and educational analysis only and does not imply sponsorship, partnership, or endorsement.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-sm font-bold text-[var(--text-primary)]">4. YouTube Partner Program & Policy Compliance</h2>
            <p>
              YouTube monetization eligibility (including 1,000 subscribers and 4,000 public watch hours) and approval into the YouTube Partner Program (YPP) remain at the sole discretion of YouTube and Google LLC. Next Gen Creators provides guidance on understanding YouTube policies, including Reused Content and Community Guidelines, but cannot guarantee platform approval or immunity from copyright strikes.
            </p>
          </section>
        </div>
      )}

      {/* TAB 2: TERMS AND CONDITIONS (No Phone Number) */}
      {activeTab === 'terms' && (
        <div className="p-8 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] space-y-6 text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed shadow-sm">
          <div className="flex items-center gap-3 border-b border-[var(--border-subtle)] pb-4">
            <FileText className="w-6 h-6 text-[var(--accent-text)]" />
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)]">
                Terms and Conditions
              </h1>
              <span className="text-[11px] text-[var(--text-muted)]">Effective Date: October 2026</span>
            </div>
          </div>

          <section className="space-y-2">
            <h2 className="text-sm font-bold text-[var(--text-primary)]">1. Agreement to Terms</h2>
            <p>
              By accessing nextgencreators.com or enrolling in the Next Gen Creators YouTube Automation Mentorship, you agree to comply with and be bound by these Terms and Conditions.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-sm font-bold text-[var(--text-primary)]">2. Program Enrollment & Fees</h2>
            <p>
              The official mentorship fee is PKR 50,000 for students residing in Pakistan and $200 USD for students located outside Pakistan. Payment arrangements and cohort schedules are confirmed directly with our authorized admissions desk via official WhatsApp. Unauthorized third-party representations of fees are invalid.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-sm font-bold text-[var(--text-primary)]">3. Intellectual Property</h2>
            <p>
              All educational frameworks, SOP templates, video materials, and guides provided to students remain the exclusive intellectual property of Next Gen Creators. You are granted a personal, non-transferable license to apply these materials to your own YouTube channels. Reselling, distributing, or publishing mentorship materials without written consent is strictly prohibited.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-sm font-bold text-[var(--text-primary)]">4. Student Code of Conduct</h2>
            <p>
              Students agree to maintain respectful, professional communication. Next Gen Creators reserves the right to terminate access without refund for students engaging in harassment, unauthorized sharing of curriculum materials, or abusive conduct.
            </p>
          </section>
        </div>
      )}

      {/* TAB 3: PRIVACY POLICY */}
      {activeTab === 'privacy' && (
        <div className="p-8 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] space-y-6 text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed shadow-sm">
          <div className="flex items-center gap-3 border-b border-[var(--border-subtle)] pb-4">
            <Lock className="w-6 h-6 text-[var(--accent-text)]" />
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)]">
                Privacy Policy
              </h1>
              <span className="text-[11px] text-[var(--text-muted)]">Effective Date: October 2026</span>
            </div>
          </div>

          <section className="space-y-2">
            <h2 className="text-sm font-bold text-[var(--text-primary)]">1. Information We Collect</h2>
            <p>
              Next Gen Creators collects only the necessary information provided voluntarily by visitors and prospective students, including:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-[var(--text-secondary)]">
              <li>Country and visual theme preferences (stored in your browser storage for session continuity).</li>
              <li>Communication data shared when initiating contact via WhatsApp (name, phone number, inquiry notes).</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-sm font-bold text-[var(--text-primary)]">2. How We Use Information</h2>
            <p>
              Information collected is used strictly to provide educational mentorship services, respond to WhatsApp inquiries, verify cohort availability, and provide enrollment guidance. We do not sell or rent user contact details to marketing third parties.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-sm font-bold text-[var(--text-primary)]">3. Third-Party Services (WhatsApp)</h2>
            <p>
              Inquiries initiated via WhatsApp are processed through WhatsApp LLC and governed by Meta's privacy policies and encryption standards.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-sm font-bold text-[var(--text-primary)]">4. Data Security</h2>
            <p>
              We do not collect or store credit card numbers on this website. All financial transfers are conducted through verified, secure banking channels disclosed directly to confirmed students.
            </p>
          </section>
        </div>
      )}

      {/* Contact Prompt */}
      <div className="mt-8 text-center pt-8 border-t border-[var(--border-color)]">
        <p className="text-xs text-[var(--text-muted)] mb-3">
          Have questions regarding our policies or terms?
        </p>
        <WhatsAppButton label="Ask Legal or Policy Questions" variant="outline" />
      </div>

    </div>
  );
};
