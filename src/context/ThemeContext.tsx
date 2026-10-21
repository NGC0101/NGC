import React, { createContext, useContext, useState, useEffect } from 'react';

export type AppTheme = 'dark' | 'light' | 'midnight';

export interface ThemeOption {
  id: AppTheme;
  name: string;
  description: string;
  indicatorColor: string;
  badgeBg: string;
}

export const THEMES: ThemeOption[] = [
  {
    id: 'dark',
    name: 'Premium Dark',
    description: 'Deep navy canvas with electric blue accents',
    indicatorColor: '#3B82F6',
    badgeBg: '#080D18',
  },
  {
    id: 'light',
    name: 'Clean Light',
    description: 'Crisp light slate with professional blue',
    indicatorColor: '#2563EB',
    badgeBg: '#FFFFFF',
  },
  {
    id: 'midnight',
    name: 'Midnight Blue',
    description: 'Rich dark blue with refined cyan accents',
    indicatorColor: '#38BDF8',
    badgeBg: '#0B132B',
  },
];

interface ThemeContextType {
  theme: AppTheme;
  setTheme: (theme: AppTheme) => void;
  themeConfig: ThemeOption;
}

const THEME_STORAGE_KEY = 'nextgen_creator_theme';

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<AppTheme>(() => {
    try {
      const stored = localStorage.getItem(THEME_STORAGE_KEY) as AppTheme | null;
      if (stored === 'dark' || stored === 'light' || stored === 'midnight') {
        return stored;
      }
    } catch {
      // ignore
    }
    return 'dark'; // Polished default theme
  });

  useEffect(() => {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      // ignore
    }

    const root = document.documentElement;
    root.setAttribute('data-theme', theme);

    if (theme === 'light') {
      root.classList.remove('dark');
      root.classList.add('light');
    } else {
      root.classList.add('dark');
      root.classList.remove('light');
    }
  }, [theme]);

  const setTheme = (newTheme: AppTheme) => {
    setThemeState(newTheme);
  };

  const themeConfig = THEMES.find((t) => t.id === theme) || THEMES[0];

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themeConfig }}>
      {children}
    </ThemeContext.Provider>
  );
};

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
