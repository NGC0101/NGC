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
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (variant === 'compact') {
    const getLabel = () => {
      if (selectedCountry === 'PK') return 'PKR (🇵🇰)';
      if (selectedCountry === 'INTL') return 'USD (🌐)';
      return 'Region';
    };

    return (
      <div className={`relative inline-flex items-center ${className}`} ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={`Current region pricing: ${getLabel()}. Click to change.`}
          aria-expanded={isOpen}
          className={`group flex items-center gap-1.5 h-8 px-2.5 rounded-lg border text-xs font-medium transition-all duration-150 cursor-pointer active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)] ${
            isOpen
              ? 'bg-[var(--bg-surface-elevated)] border-[var(--accent-primary)]/50 text-[var(--text-primary)] shadow-xs ring-1 ring-[var(--accent-primary)]/20'
              : 'bg-[var(--bg-surface-subtle)] hover:bg-[var(--bg-surface-elevated)] border-[var(--border-subtle)] hover:border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
          }`}
        >
          <Globe className="w-3 h-3 text-[var(--accent-text)] shrink-0 opacity-80 group-hover:opacity-100 transition-opacity" strokeWidth={2.2} />
          <span className="whitespace-nowrap text-[11.5px] font-normal tracking-tight text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors">
            {getLabel()}
          </span>
          <ChevronDown
            className={`w-2.5 h-2.5 text-[var(--text-muted)] opacity-60 group-hover:opacity-100 transition-all duration-200 shrink-0 ${
              isOpen ? 'rotate-180 text-[var(--accent-text)] opacity-100' : ''
            }`}
            strokeWidth={2}
          />
        </button>

        {isOpen && (
          <div className="absolute right-0 top-full mt-1.5 w-44 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)]/70 shadow-lg shadow-black/10 backdrop-blur-md z-50 p-1 animate-in fade-in zoom-in-95 duration-100">
            <button
              type="button"
              onClick={() => {
                setSelectedCountry('PK');
                setIsOpen(false);
              }}
              className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-left text-xs transition-colors cursor-pointer ${
                selectedCountry === 'PK'
                  ? 'bg-[var(--accent-surface)] text-[var(--accent-text)] font-medium'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-elevated)]'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-xs">🇵🇰</span>
                <div className="flex flex-col">
                  <span className="text-[11.5px] font-medium leading-none tracking-tight">Pakistan</span>
                  <span className="text-[10px] text-[var(--text-muted)] mt-0.5">PKR 50k</span>
                </div>
              </div>
              {selectedCountry === 'PK' && <Check className="w-3 h-3 text-[var(--accent-text)] shrink-0" strokeWidth={2.4} />}
            </button>

            <button
              type="button"
              onClick={() => {
                setSelectedCountry('INTL');
                setIsOpen(false);
              }}
              className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-left text-xs transition-colors cursor-pointer ${
                selectedCountry === 'INTL'
                  ? 'bg-[var(--accent-surface)] text-[var(--accent-text)] font-medium'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-elevated)]'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-xs">🌐</span>
                <div className="flex flex-col">
                  <span className="text-[11.5px] font-medium leading-none tracking-tight">International</span>
                  <span className="text-[10px] text-[var(--text-muted)] mt-0.5">$200 USD</span>
                </div>
              </div>
              {selectedCountry === 'INTL' && <Check className="w-3 h-3 text-[var(--accent-text)] shrink-0" strokeWidth={2.4} />}
            </button>

            <div className="my-1 border-t border-[var(--border-subtle)]" />

            <button
              type="button"
              onClick={() => {
                setSelectedCountry('UNKNOWN');
                setIsOpen(false);
              }}
              className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-left text-xs transition-colors cursor-pointer ${
                selectedCountry === 'UNKNOWN'
                  ? 'bg-[var(--accent-surface)] text-[var(--accent-text)] font-semibold'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-elevated)]'
              }`}
            >
              <span className="text-[11px]">Compare Both Currencies</span>
              {selectedCountry === 'UNKNOWN' && <Check className="w-3.5 h-3.5 text-[var(--accent-text)] shrink-0" />}
            </button>
          </div>
        )}
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
