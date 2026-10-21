import React from 'react';
import { SITE_CONFIG } from '../config/siteConfig';
import { NavPage } from './Header';
import { useCountry } from '../context/CountryContext';
import { BrandSymbol } from './BrandSymbol';
import { MessageCircle, ShieldAlert, ExternalLink } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: NavPage) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { whatsAppUrl, countryType } = useCountry();

  const handleNavClick = (page: NavPage) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[var(--bg-surface-subtle)] border-t border-[var(--border-color)] pt-16 pb-28 sm:pb-24 text-[var(--text-secondary)] text-sm transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-10 pb-12 border-b border-[var(--border-subtle)]">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <div className="flex items-center gap-2.5">
              <BrandSymbol size="sm" />
              <span className="text-lg font-bold text-[var(--text-primary)] tracking-tight">
                {SITE_CONFIG.brand.name}
              </span>
            </div>
            
            <p className="text-[var(--text-secondary)] text-xs sm:text-sm leading-relaxed max-w-sm">
              An educational mentorship brand teaching the workflows, skills, and production strategies behind faceless YouTube channels.
            </p>

            <div className="p-3.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)] max-w-sm">
              <span className="text-[11px] font-semibold text-[var(--accent-text)] block mb-1">
                Paid Mentorship Fee
              </span>
              <div className="text-xs text-[var(--text-secondary)] flex items-center justify-between">
                <span>Selected Rate:</span>
                <span className="font-mono font-bold text-[var(--text-primary)] tabular-nums">
                  {countryType === 'PK'
                    ? 'PKR 50,000 (Pakistan)'
                    : countryType === 'INTL'
                    ? '$200 USD (International)'
                    : 'PKR 50k / $200 USD'}
                </span>
              </div>
            </div>

            {/* Direct WhatsApp link (No phone number displayed) */}
            <div className="pt-1">
              <a
                href={whatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-500 hover:text-emerald-400 transition-colors"
              >
                <MessageCircle className="w-4 h-4 fill-emerald-500 shrink-0" />
                <span>Chat with Admissions Team on WhatsApp</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-primary)] mb-3">
              Mentorship
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  type="button"
                  onClick={() => handleNavClick('mentorship')}
                  className="hover:text-[var(--accent-text)] transition-colors text-left cursor-pointer"
                >
                  Program Overview
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNavClick('curriculum')}
                  className="hover:text-[var(--accent-text)] transition-colors text-left cursor-pointer"
                >
                  Full 10-Module Curriculum
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNavClick('pricing')}
                  className="hover:text-[var(--accent-text)] transition-colors text-left cursor-pointer"
                >
                  Official Pricing
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNavClick('enrollment')}
                  className="hover:text-[var(--accent-text)] transition-colors text-left font-medium text-[var(--accent-text)] cursor-pointer"
                >
                  Enrollment Flow
                </button>
              </li>
            </ul>
          </div>

          {/* Educational Resources */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-primary)] mb-3">
              Education & FAQ
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  type="button"
                  onClick={() => handleNavClick('resources')}
                  className="hover:text-[var(--accent-text)] transition-colors text-left cursor-pointer"
                >
                  Free Articles & Guides
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNavClick('faq')}
                  className="hover:text-[var(--accent-text)] transition-colors text-left cursor-pointer"
                >
                  Frequently Asked Questions
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNavClick('about')}
                  className="hover:text-[var(--accent-text)] transition-colors text-left cursor-pointer"
                >
                  About Our Mission
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNavClick('contact')}
                  className="hover:text-[var(--accent-text)] transition-colors text-left cursor-pointer"
                >
                  Contact & Inquiries
                </button>
              </li>
            </ul>
          </div>

          {/* Legal Pages */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-primary)] mb-3">
              Transparency & Legal
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  type="button"
                  onClick={() => handleNavClick('disclaimer')}
                  className="hover:text-[var(--accent-text)] transition-colors text-left cursor-pointer"
                >
                  Educational Disclaimer
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNavClick('terms')}
                  className="hover:text-[var(--accent-text)] transition-colors text-left cursor-pointer"
                >
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNavClick('privacy')}
                  className="hover:text-[var(--accent-text)] transition-colors text-left cursor-pointer"
                >
                  Privacy Policy
                </button>
              </li>
              <li className="pt-2 text-[11px] text-[var(--text-muted)] leading-relaxed">
                Official inquiries: WhatsApp only. No unauthorized payment forms.
              </li>
            </ul>
          </div>
        </div>

        {/* Studio Credit & Engineering Architecture by Injazify Studios */}
        <div className="mt-10 p-5 sm:p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] flex flex-col md:flex-row items-start md:items-center justify-between gap-5 transition-colors">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 via-indigo-500 to-cyan-400 p-[1.5px] shrink-0 shadow-sm">
              <div className="w-full h-full bg-[var(--bg-canvas)] rounded-[9px] flex items-center justify-center font-bold text-transparent bg-clip-text bg-gradient-to-tr from-blue-400 to-cyan-300 text-xs tracking-wider">
                IS
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--accent-text)]">
                  Platform Engineering
                </span>
                <span className="text-[var(--text-muted)]">·</span>
                <span className="text-xs font-semibold text-[var(--text-primary)]">Injazify Studios</span>
              </div>
              <p className="text-xs text-[var(--text-secondary)] max-w-2xl leading-relaxed">
                {SITE_CONFIG.studio.about}
              </p>
            </div>
          </div>
          <a
            href={SITE_CONFIG.studio.website}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-[var(--bg-surface-elevated)] hover:bg-[var(--accent-surface)] text-[var(--text-primary)] hover:text-[var(--accent-text)] border border-[var(--border-color)] hover:border-[var(--accent-primary)]/40 transition-all shadow-sm shrink-0 group cursor-pointer"
          >
            <span>Visit Injazify Studios</span>
            <ExternalLink className="w-3.5 h-3.5 text-[var(--accent-text)] group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>

        {/* Mandatory Educational Disclaimer Block */}
        <div className="mt-6 p-4 sm:p-5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)] text-[var(--text-secondary)] text-xs leading-relaxed flex flex-col sm:flex-row gap-3">
          <ShieldAlert className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-semibold text-[var(--text-primary)]">
              Official Educational Disclaimer:
            </p>
            <p>{SITE_CONFIG.disclaimers.primary}</p>
            <p className="text-[11px] text-[var(--text-muted)] pt-0.5">
              {SITE_CONFIG.disclaimers.trademark}
            </p>
          </div>
        </div>

        {/* Bottom Bar with Injazify Studios Attribution */}
        <div className="mt-8 pt-6 border-t border-[var(--border-subtle)] flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[var(--text-muted)] sm:pr-48 lg:pr-52">
          <p className="text-[var(--text-secondary)] font-medium">© {new Date().getFullYear()} Next Gen Creators. All rights reserved. Educational Mentorship Program.</p>
          <div className="flex items-center gap-2 text-xs px-3.5 py-1.5 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-subtle)] shadow-xs">
            <span className="text-[var(--text-secondary)] font-medium">Designed & Engineered by</span>
            <a
              href={SITE_CONFIG.studio.website}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[var(--text-primary)] hover:text-[var(--accent-text)] transition-colors inline-flex items-center gap-1.5 hover:underline underline-offset-4"
            >
              <span>Injazify Studios</span>
              <ExternalLink className="w-3 h-3 text-[var(--accent-text)]" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
