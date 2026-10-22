import React, { useState, useEffect } from 'react';
import { NavPage } from '../components/Header';
import { FaqAccordion } from '../components/FaqAccordion';
import { WhatsAppButton } from '../components/WhatsAppButton';
import { Search } from 'lucide-react';
import { getSiteData } from '../services/siteStore';
import { FAQItem } from '../config/siteConfig';

interface FaqPageProps {
  onNavigate: (page: NavPage) => void;
}

export const FaqPage: React.FC<FaqPageProps> = ({ onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [faqs, setFaqs] = useState<FAQItem[]>(getSiteData().faqs);

  useEffect(() => {
    const handleUpdate = () => {
      setFaqs(getSiteData().faqs);
    };
    window.addEventListener('site_data_updated', handleUpdate);
    return () => window.removeEventListener('site_data_updated', handleUpdate);
  }, []);

  const categories = ['All', 'Mentorship', 'Pricing & Enrollment', 'Curriculum & Support', 'Expectations'];

  const filteredFaqs = faqs.filter((faq) => {
    const matchesCat = selectedCategory === 'All' || faq.category === selectedCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="py-12 sm:py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 transition-colors">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="text-xs font-semibold uppercase tracking-wider text-[var(--accent-text)] block mb-2">
          Knowledge Base
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[var(--text-primary)] tracking-tight leading-tight">
          Frequently Asked Questions
        </h1>
        <p className="text-base sm:text-lg text-[var(--text-secondary)] mt-4 leading-relaxed text-balance">
          Transparent, definitive answers regarding our YouTube Automation Mentorship Program, pricing, curriculum, and realistic outcomes.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <label htmlFor="faq-search-input" className="sr-only">Search FAQ questions</label>
          <Search className="w-4 h-4 text-[var(--text-muted)] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            id="faq-search-input"
            type="text"
            placeholder="Search questions (e.g., price, refund)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)] text-xs sm:text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-primary)] transition-colors"
          />
        </div>

        {/* Categories */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap cursor-pointer transition-colors ${
                selectedCategory === cat
                  ? 'bg-[var(--accent-primary)] text-white font-semibold'
                  : 'bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-color)]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* FAQs List */}
      <div className="mb-16">
        <FaqAccordion items={filteredFaqs} allowMultiple={true} />

        {filteredFaqs.length === 0 && (
          <div className="p-10 text-center rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)]">
            <p className="text-[var(--text-muted)] text-sm">No questions matched your search "{searchTerm}".</p>
            <button
              type="button"
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
              }}
              className="mt-3 text-xs text-[var(--accent-text)] font-medium hover:underline cursor-pointer"
            >
              Show all FAQs
            </button>
          </div>
        )}
      </div>

      {/* Direct Inquiries Contact Box (Zero phone number) */}
      <div className="p-8 rounded-2xl bg-[var(--bg-surface)] border border-[var(--accent-primary)]/30 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
        <div className="space-y-1 text-center sm:text-left">
          <h2 className="text-lg font-bold text-[var(--text-primary)]">Have a specific question not answered here?</h2>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
            Our admissions team is available on WhatsApp to discuss your goals, background, and curriculum questions.
          </p>
        </div>

        <WhatsAppButton label="Ask on WhatsApp" variant="primary" className="shrink-0" />
      </div>

    </div>
  );
};
