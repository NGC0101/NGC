import React from 'react';
import { useTheme, THEMES, AppTheme } from '../context/ThemeContext';
import { Moon, Sun, Sparkles, Palette, Check } from 'lucide-react';

interface ThemeSelectorProps {
  variant?: 'compact' | 'segmented' | 'dropdown';
  className?: string;
}

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({
  variant = 'compact',
  className = '',
}) => {
  const { theme, setTheme } = useTheme();

  const getThemeIcon = (id: AppTheme, isSmall: boolean = false) => {
    const size = isSmall ? 'w-3 h-3' : 'w-3.5 h-3.5';
    switch (id) {
      case 'dark':
        return <Moon className={`${size} text-blue-400 shrink-0`} strokeWidth={2.2} />;
      case 'light':
        return <Sun className={`${size} text-amber-500 shrink-0`} strokeWidth={2.2} />;
      case 'midnight':
        return <Sparkles className={`${size} text-cyan-400 shrink-0`} strokeWidth={2.2} />;
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

  // Compact: Single small circular icon button (toggles light/dark mode, zero extra text)
  const isDark = theme === 'dark' || theme === 'midnight';
  const handleToggle = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      className={`group relative inline-flex items-center justify-center w-8 h-8 rounded-full border transition-all duration-200 cursor-pointer active:scale-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)] ${
        isDark
          ? 'bg-[var(--bg-surface-subtle)] hover:bg-[var(--bg-surface-elevated)] border-[var(--border-subtle)] hover:border-[var(--border-color)] text-amber-400 hover:text-amber-300 shadow-xs'
          : 'bg-zinc-100 hover:bg-zinc-200/90 border-zinc-200 hover:border-zinc-300 text-slate-700 hover:text-slate-900 shadow-xs'
      } ${className}`}
    >
      {isDark ? (
        <Sun
          className="w-3.5 h-3.5 text-amber-400 group-hover:text-amber-300 transition-transform duration-300 group-hover:rotate-45"
          strokeWidth={2.2}
        />
      ) : (
        <Moon
          className="w-3.5 h-3.5 text-indigo-500 group-hover:text-indigo-600 transition-transform duration-300 -rotate-12 group-hover:rotate-0"
          strokeWidth={2.2}
        />
      )}
    </button>
  );
};
