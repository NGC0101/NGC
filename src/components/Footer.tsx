import React, { useState, useEffect } from 'react';
import { SITE_CONFIG } from '../config/siteConfig';
import { NavPage } from './Header';
import { useCountry } from '../context/CountryContext';
import { BrandSymbol } from './BrandSymbol';
import { InjazifyLogo } from './InjazifyLogo';
import { ShieldAlert, ExternalLink } from 'lucide-react';
import { getSiteData, SocialLinks } from '../services/siteStore';

interface FooterProps {
  onNavigate: (page: NavPage) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [socialLinks, setSocialLinks] = useState<SocialLinks>(getSiteData().socialLinks);

  useEffect(() => {
    const handleUpdate = () => {
      setSocialLinks(getSiteData().socialLinks);
    };
    window.addEventListener('site_data_updated', handleUpdate);
    return () => window.removeEventListener('site_data_updated', handleUpdate);
  }, []);

  const handleNavClick = (page: NavPage) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[var(--bg-surface-subtle)] border-t border-[var(--border-color)] pt-16 pb-24 text-[var(--text-secondary)] text-sm transition-colors">
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

            {/* Social Icons Row */}
            <div className="flex items-center gap-3 pt-1">
              {socialLinks.youtube && (
                <a
                  href={socialLinks.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube Channel"
                  className="w-8 h-8 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-color)] flex items-center justify-center text-[var(--text-secondary)] hover:text-red-500 hover:border-red-500/50 transition-colors shadow-xs"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                </a>
              )}
              {socialLinks.instagram && (
                <a
                  href={socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram Profile"
                  className="w-8 h-8 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-color)] flex items-center justify-center text-[var(--text-secondary)] hover:text-pink-500 hover:border-pink-500/50 transition-colors shadow-xs"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
              )}
              {socialLinks.twitter && (
                <a
                  href={socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter / X Profile"
                  className="w-8 h-8 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-color)] flex items-center justify-center text-[var(--text-secondary)] hover:text-cyan-400 hover:border-cyan-400/50 transition-colors shadow-xs"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
              )}
              {socialLinks.tiktok && (
                <a
                  href={socialLinks.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok Profile"
                  className="w-8 h-8 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-color)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-subtle)] transition-colors shadow-xs"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>
                </a>
              )}
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
            </ul>
          </div>

        </div>

        {/* Studio Credit & Engineering Architecture by Injazify Studios */}
        <div className="mt-10 p-5 sm:p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] flex flex-col md:flex-row items-start md:items-center justify-between gap-5 transition-colors">
          <div className="flex items-start gap-4">
            <div className="shrink-0 flex items-center pt-1">
              <InjazifyLogo size="sm" subtitleText="" />
            </div>
            <div className="space-y-1">
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
        <div className="mt-8 pt-6 border-t border-[var(--border-subtle)] flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[var(--text-muted)]">
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
