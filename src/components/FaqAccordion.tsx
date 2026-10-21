import React, { useState } from 'react';
import { FAQItem } from '../config/siteConfig';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FaqAccordionProps {
  items: FAQItem[];
  defaultOpenIndex?: number | null;
  allowMultiple?: boolean;
}

export const FaqAccordion: React.FC<FaqAccordionProps> = ({
  items,
  defaultOpenIndex = 0,
  allowMultiple = false,
}) => {
  const [openIndices, setOpenIndices] = useState<number[]>(
    defaultOpenIndex !== null && defaultOpenIndex !== undefined ? [defaultOpenIndex] : []
  );

  const toggle = (idx: number) => {
    if (allowMultiple) {
      if (openIndices.includes(idx)) {
        setOpenIndices(openIndices.filter((i) => i !== idx));
      } else {
        setOpenIndices([...openIndices, idx]);
      }
    } else {
      if (openIndices.includes(idx)) {
        setOpenIndices([]);
      } else {
        setOpenIndices([idx]);
      }
    }
  };

  return (
    <div className="space-y-3">
      {items.map((item, index) => {
        const isOpen = openIndices.includes(index);
        return (
          <div
            key={item.id}
            className={`rounded-xl border transition-all duration-200 overflow-hidden ${
              isOpen
                ? 'bg-[var(--bg-surface)] border-[var(--accent-primary)]/50 shadow-md'
                : 'bg-[var(--bg-surface)] border-[var(--border-color)] hover:border-[var(--accent-primary)]/40'
            }`}
          >
            <button
              type="button"
              onClick={() => toggle(index)}
              aria-expanded={isOpen}
              className="w-full flex items-center justify-between gap-4 p-4 sm:p-5 text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)]"
            >
              <div className="flex items-start gap-3">
                <HelpCircle className={`w-5 h-5 mt-0.5 shrink-0 ${isOpen ? 'text-[var(--accent-text)]' : 'text-[var(--text-muted)]'}`} />
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[var(--accent-text)] block mb-1">
                    {item.category}
                  </span>
                  <span className="text-base sm:text-lg font-bold text-[var(--text-primary)]">
                    {item.question}
                  </span>
                </div>
              </div>
              <ChevronDown
                className={`w-5 h-5 text-[var(--text-muted)] transition-transform duration-200 shrink-0 ${
                  isOpen ? 'rotate-180 text-[var(--accent-text)]' : ''
                }`}
              />
            </button>

            {isOpen && (
              <div className="px-5 sm:px-6 pb-6 pt-3 text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed border-t border-[var(--border-subtle)] mt-1">
                <p>{item.answer}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
