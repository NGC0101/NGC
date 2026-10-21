import React from 'react';

interface BrandSymbolProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const BrandSymbol: React.FC<BrandSymbolProps> = ({ className = '', size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8 rounded-lg',
    md: 'w-9 h-9 rounded-xl',
    lg: 'w-11 h-11 rounded-2xl',
  };

  const innerRadius = {
    sm: 'rounded-[7px]',
    md: 'rounded-[11px]',
    lg: 'rounded-[14px]',
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-4.5 h-4.5',
    lg: 'w-6 h-6',
  };

  return (
    <div
      className={`${sizeClasses[size]} bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-400 p-[1.5px] flex items-center justify-center shadow-md shadow-blue-500/25 shrink-0 ${className}`}
    >
      <div className={`w-full h-full bg-[var(--bg-canvas)] ${innerRadius[size]} flex items-center justify-center transition-colors`}>
        {/* Next Gen Creator Play Symbol */}
        <svg
          className={`${iconSizes[size]} transition-transform duration-200 group-hover:scale-105`}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Main dynamic forward play shield */}
          <path
            d="M6 4.75C6 3.86 6.98 3.32 7.73 3.81L18.42 10.74C19.12 11.2 19.12 12.23 18.42 12.69L7.73 19.62C6.98 20.11 6 19.57 6 18.68V4.75Z"
            fill="url(#ngc-brand-gradient)"
          />
          {/* Inner forward accent */}
          <path
            d="M10.5 9.25L14.7 12L10.5 14.75V9.25Z"
            fill="#FFFFFF"
            fillOpacity="0.95"
          />
          <defs>
            <linearGradient id="ngc-brand-gradient" x1="6" y1="3.5" x2="19" y2="20" gradientUnits="userSpaceOnUse">
              <stop stopColor="#2563EB" />
              <stop offset="0.6" stopColor="#3B82F6" />
              <stop offset="1" stopColor="#06B6D4" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
};
