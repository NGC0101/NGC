import React from 'react';
import { useCountry } from '../context/CountryContext';
import { MessageCircle, ArrowUpRight } from 'lucide-react';

interface WhatsAppButtonProps {
  label?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'floating';
  className?: string;
  showIcon?: boolean;
  customSuffix?: string;
}

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  label = 'Chat on WhatsApp',
  variant = 'primary',
  className = '',
  showIcon = true,
  customSuffix,
}) => {
  const { whatsAppUrl } = useCountry();

  if (variant === 'floating') {
    return (
      <div className="fixed bottom-6 right-6 z-50 flex items-center group">
        <a
          href={whatsAppUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with Admissions Team on WhatsApp"
          className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium shadow-xl shadow-emerald-950/40 hover:shadow-emerald-600/30 transition-all duration-200 border border-emerald-400/30 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-[var(--bg-canvas)] cursor-pointer"
        >
          <MessageCircle className="w-5 h-5 text-white fill-white shrink-0" />
          <span className="text-sm font-semibold tracking-wide whitespace-nowrap hidden sm:inline">
            WhatsApp Inquiry
          </span>
        </a>
      </div>
    );
  }

  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 whitespace-nowrap cursor-pointer focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)] focus:ring-offset-2 focus:ring-offset-[var(--bg-canvas)]';

  const variants = {
    primary: 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-900/20 hover:shadow-emerald-600/20 px-5 py-2.5 text-sm font-semibold border border-emerald-400/30',
    secondary: 'bg-[var(--accent-primary)] hover:opacity-90 text-white shadow-md px-5 py-2.5 text-sm font-semibold border border-transparent',
    outline: 'bg-[var(--bg-surface-subtle)] hover:bg-[var(--bg-surface-elevated)] text-emerald-500 hover:text-emerald-400 border border-emerald-500/30 px-4 py-2 text-sm',
  };

  return (
    <a
      href={whatsAppUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {showIcon && <MessageCircle className="w-4 h-4 mr-2 text-current fill-current shrink-0" />}
      <span>{label}</span>
      <ArrowUpRight className="w-3.5 h-3.5 ml-1.5 opacity-70 group-hover:opacity-100 transition-opacity shrink-0" />
    </a>
  );
};
