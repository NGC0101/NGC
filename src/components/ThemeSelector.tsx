import React, { useState, useRef, useEffect } from 'react';
import { useTheme, THEMES, AppTheme } from '../context/ThemeContext';
import { Moon, Sun, Sparkles, Palette, ChevronDown, Check } from 'lucide-react';

interface ThemeSelectorProps {
  variant?: 'compact' | 'segmented' | 'dropdown';
  className?: string;
}

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({
  variant = 'compact',
  className = '',
}) => {
  const { theme, setTheme, themeConfig } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getThemeIcon = (id: AppTheme) => {
    switch (id) {
      case 'dark':
        return <Moon className="w-3.5 h-3.5 text-blue-400 shrink-0" />;
      case 'light':
        return <Sun className="w-3.5 h-3.5 text-amber-500 shrink-0" />;
      case 'midnight':
        return <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0" />;
    }
  };

  if (variant === 'segmented') {
    return (
      <div className={`flex flex-col gap-1.5 ${className}`}>
        <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--text-muted)] flex items-center gap-1.5">
          <Palette className="w-3.5 h-3.5 text-[var(--accent-text)]" />
          <span>Visual Theme</span>
        </span>
        <div className="grid grid-cols-3 gap-1 p-1 rounded-xl bg-[var(--bg-surface-subtle)] border border-[var(--border-color)] text-xs font-medium">
          {THEMES.map((t) => {
            const isActive = theme === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setTheme(t.id)}
                className={`flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg transition-all cursor-pointer whitespace-nowrap text-[11px] sm:text-xs ${
                  isActive
                    ? 'bg-[var(--accent-primary)] text-white font-semibold shadow-sm'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-elevated)]'
                }`}
              >
                {getThemeIcon(t.id)}
                <span>{t.id === 'dark' ? 'Dark' : t.id === 'light' ? 'Light' : 'Midnight'}</span>
                {isActive && <Check className="w-3 h-3 ml-0.5 shrink-0" />}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // Compact / Header Dropdown
  return (
    <div className={`relative inline-flex items-center ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={`Current theme: ${themeConfig.name}. Click to change theme.`}
        aria-expanded={isOpen}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[var(--bg-surface-subtle)] border border-[var(--border-color)] text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--accent-primary)] transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]"
      >
        {getThemeIcon(theme)}
        <span className="hidden md:inline whitespace-nowrap text-[11px] font-medium">
          {themeConfig.name}
        </span>
        <ChevronDown className={`w-3 h-3 text-[var(--text-muted)] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-1.5 w-48 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-xl z-50 p-1.5 animate-in fade-in zoom-in-95 duration-100">
          <div className="px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)] border-b border-[var(--border-subtle)] mb-1">
            Select Visual Theme
          </div>
          {THEMES.map((t) => {
            const isActive = theme === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => {
                  setTheme(t.id);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-left text-xs transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-[var(--accent-surface)] text-[var(--accent-text)] font-semibold'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-elevated)]'
                }`}
              >
                <div className="flex items-center gap-2">
                  {getThemeIcon(t.id)}
                  <div className="flex flex-col">
                    <span className="font-medium">{t.name}</span>
                  </div>
                </div>
                {isActive && <Check className="w-3.5 h-3.5 text-[var(--accent-text)]" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
