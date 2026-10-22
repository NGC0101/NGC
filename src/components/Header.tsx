import React, { useState } from 'react';
import { SITE_CONFIG } from '../config/siteConfig';
import { CountrySelector } from './CountrySelector';
import { ThemeSelector } from './ThemeSelector';
import { BrandSymbol } from './BrandSymbol';
import { Menu, X, ArrowRight } from 'lucide-react';

export type NavPage =
  | 'home'
  | 'about'
  | 'mentorship'
  | 'curriculum'
  | 'pricing'
  | 'resources'
  | 'faq'
  | 'contact'
  | 'enrollment'
  | 'privacy'
  | 'terms'
  | 'disclaimer';

interface HeaderProps {
  currentPage: NavPage;
  onNavigate: (page: NavPage) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { id: NavPage; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'mentorship', label: 'Mentorship' },
    { id: 'curriculum', label: 'Curriculum' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'resources', label: 'Articles' },
    { id: 'faq', label: 'FAQ' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (page: NavPage) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[var(--header-bg)] border-b border-[var(--border-color)] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Bar Contract: Zone 1, Zone 2, Zone 3 */}
        <div className="flex items-center justify-between gap-4 lg:gap-8 h-18">
          
          {/* Zone 1: Original Site Brand Logo & Name */}
          <button
            type="button"
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)] rounded-xl py-1.5 px-2 -ml-2 hover:bg-[var(--bg-surface-elevated)]/60 active:scale-[0.98] transition-all duration-150 cursor-pointer whitespace-nowrap shrink-0 group"
          >
            <BrandSymbol size="md" />
            <span className="text-base sm:text-lg font-bold tracking-tight text-[var(--text-primary)] whitespace-nowrap shrink-0 transition-colors group-hover:text-[var(--accent-text)]">
              {SITE_CONFIG.brand.name}
            </span>
          </button>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-6 text-sm font-medium text-[var(--text-secondary)]">
            {navLinks.map((link) => {
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => handleNavClick(link.id)}
                  className={`transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 text-[13.5px] cursor-pointer ${
                    isActive
                      ? 'text-[var(--accent-text)] border-[var(--accent-primary)] font-semibold'
                      : 'border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-subtle)]'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Theme Selector + 1 Primary CTA */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            {/* Visual Theme Selector */}
            <ThemeSelector variant="compact" />

            {/* Primary Action Button (Desktop/Tablet) */}
            <button
              type="button"
              onClick={() => handleNavClick('enrollment')}
              className="hidden sm:inline-flex items-center gap-1.5 h-8 px-3.5 text-xs font-semibold text-white bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-hover)] hover:brightness-110 active:scale-[0.97] rounded-lg transition-all duration-150 shadow-sm hover:shadow-[0_4px_16px_rgba(20,184,166,0.3)] border border-white/20 whitespace-nowrap shrink-0 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-canvas)] group"
            >
              <span>Join the Mentorship</span>
              <ArrowRight className="w-3 h-3 text-cyan-100 transition-transform duration-200 group-hover:translate-x-0.5" strokeWidth={2.2} />
            </button>

            {/* Mobile menu button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden h-8 w-8 flex items-center justify-center rounded-lg bg-[var(--bg-surface-subtle)] hover:bg-[var(--bg-surface-elevated)] border border-[var(--border-color)] hover:border-[var(--accent-primary)]/40 text-[var(--text-secondary)] hover:text-[var(--text-primary)] active:scale-95 transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)] cursor-pointer shadow-xs"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? <X className="w-4 h-4" strokeWidth={2.2} /> : <Menu className="w-4 h-4" strokeWidth={2.2} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-[var(--border-color)] bg-[var(--bg-surface)] px-4 pt-3 pb-6 shadow-2xl animate-in slide-in-from-top-2 duration-150">
          
          {/* Controls Bar in Mobile Menu */}
          <div className="flex flex-col gap-3 mb-4 pt-1">
            <ThemeSelector variant="segmented" />
          </div>

          <div className="flex flex-col space-y-1 text-sm font-medium">
            {navLinks.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => handleNavClick(link.id)}
                className={`text-left px-3.5 py-2.5 rounded-lg transition-colors cursor-pointer ${
                  currentPage === link.id
                    ? 'bg-[var(--accent-surface)] text-[var(--accent-text)] font-semibold border border-[var(--accent-primary)]/30'
                    : 'text-[var(--text-secondary)] hover:bg-[var(--bg-surface-elevated)] hover:text-[var(--text-primary)]'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-[var(--border-color)] flex flex-col gap-2.5">
            <button
              type="button"
              onClick={() => handleNavClick('enrollment')}
              className="w-full py-3 px-4 text-center rounded-xl bg-[var(--accent-primary)] hover:opacity-90 text-white font-semibold text-sm transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-lg"
            >
              <span>Join the Mentorship</span>
              <ArrowRight className="w-4 h-4 text-cyan-200" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
