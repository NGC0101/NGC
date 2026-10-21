import React from 'react';
import { useCountry } from '../context/CountryContext';
import { COUNTRIES } from '../utils/pricing';
import { Globe, Check, ChevronDown } from 'lucide-react';

interface CountrySelectorProps {
  variant?: 'inline' | 'compact' | 'segmented';
  className?: string;
}

export const CountrySelector: React.FC<CountrySelectorProps> = ({
  variant = 'segmented',
  className = '',
}) => {
  const { selectedCountry, setSelectedCountry, countryType } = useCountry();

  if (variant === 'compact') {
    return (
      <div className={`relative inline-flex items-center ${className}`}>
        <label htmlFor="compact-country-select" className="sr-only">Select your country</label>
        <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[var(--bg-surface-subtle)] border border-[var(--border-color)] text-xs text-[var(--text-secondary)] hover:border-[var(--accent-primary)] transition-colors cursor-pointer">
          <Globe className="w-3.5 h-3.5 text-[var(--accent-text)] shrink-0" />
          <select
            id="compact-country-select"
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            className="bg-transparent text-[var(--text-primary)] text-xs font-medium focus:outline-none cursor-pointer pr-4 appearance-none"
          >
            <option value="UNKNOWN" className="bg-[var(--bg-surface)] text-[var(--text-primary)]">
              Country: Select
            </option>
            <option value="PK" className="bg-[var(--bg-surface)] text-[var(--text-primary)]">
              🇵🇰 Pakistan (PKR 50k)
            </option>
            <option value="INTL" className="bg-[var(--bg-surface)] text-[var(--text-primary)]">
              🌐 International ($200 USD)
            </option>
          </select>
          <ChevronDown className="w-3 h-3 text-[var(--text-muted)] absolute right-2 pointer-events-none" />
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full max-w-lg ${className}`}>
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between text-xs text-[var(--text-secondary)] font-medium">
          <span className="flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-[var(--accent-text)]" />
            <span>Select Your Country for Mentorship Pricing</span>
          </span>
          <span className="text-[var(--text-secondary)] font-mono text-[11px] tabular-nums font-semibold">
            {countryType === 'PK' ? 'PKR 50,000' : countryType === 'INTL' ? '$200 USD' : 'Showing Both'}
          </span>
        </div>

        {/* 3-Way Segmented Tabs */}
        <div className="grid grid-cols-3 gap-1 p-1 rounded-xl bg-[var(--bg-surface-subtle)] border border-[var(--border-color)] text-[11px] sm:text-xs font-medium">
          <button
            type="button"
            onClick={() => setSelectedCountry('PK')}
            className={`flex items-center justify-center gap-1 py-1.5 px-1.5 sm:px-2.5 sm:py-2 rounded-lg transition-all whitespace-nowrap cursor-pointer ${
              countryType === 'PK'
                ? 'bg-[var(--accent-primary)] text-white font-semibold shadow-sm'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-elevated)]'
            }`}
          >
            <span>🇵🇰</span>
            <span>Pakistan</span>
            {countryType === 'PK' && <Check className="w-3 h-3 ml-0.5 text-white" />}
          </button>

          <button
            type="button"
            onClick={() => setSelectedCountry('INTL')}
            className={`flex items-center justify-center gap-1 py-1.5 px-1.5 sm:px-2.5 sm:py-2 rounded-lg transition-all whitespace-nowrap cursor-pointer ${
              countryType === 'INTL'
                ? 'bg-[var(--accent-primary)] text-white font-semibold shadow-sm'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-elevated)]'
            }`}
          >
            <span>🌐</span>
            <span>International</span>
            {countryType === 'INTL' && <Check className="w-3 h-3 ml-0.5 text-white" />}
          </button>

          <button
            type="button"
            onClick={() => setSelectedCountry('UNKNOWN')}
            className={`flex items-center justify-center gap-1 py-1.5 px-1.5 sm:px-2.5 sm:py-2 rounded-lg transition-all whitespace-nowrap cursor-pointer ${
              countryType === 'UNKNOWN'
                ? 'bg-[var(--bg-surface-elevated)] text-[var(--accent-text)] font-semibold border border-[var(--border-color)]'
                : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)] hover:bg-[var(--bg-surface-elevated)]'
            }`}
          >
            <span>View Both</span>
          </button>
        </div>

        {/* Detailed Country Dropdown for specifics */}
        <div className="mt-1 flex items-center justify-between text-xs text-[var(--text-secondary)]">
          <span>Or choose specific country:</span>
          <select
            aria-label="Specific country dropdown"
            value={selectedCountry === 'UNKNOWN' ? '' : selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value || 'UNKNOWN')}
            className="bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-md px-2.5 py-1 text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)] cursor-pointer"
          >
            <option value="">Compare Both (Neutral)</option>
            {COUNTRIES.map((c) => (
              <option key={c.code} value={c.code}>
                {c.name} {c.regionType === 'PK' ? '(PKR 50k)' : '($200 USD)'}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};
