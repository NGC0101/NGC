import React, { useState } from 'react';
import { SITE_CONFIG, ResourceArticle } from '../config/siteConfig';
import { NavPage } from '../components/Header';
import { WhatsAppButton } from '../components/WhatsAppButton';
import {
  Search,
  Clock,
  CheckCircle2,
  X,
  ChevronRight,
} from 'lucide-react';

interface ResourcesPageProps {
  onNavigate: (page: NavPage) => void;
}

export const ResourcesPage: React.FC<ResourcesPageProps> = ({ onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeArticle, setActiveArticle] = useState<ResourceArticle | null>(null);

  const categories = ['All', 'Fundamentals', 'Production', 'Strategy', 'Scripting', 'Packaging', 'Analytics', 'Compliance'];

  const filteredArticles = SITE_CONFIG.resources.filter((art) => {
    const matchesCat = selectedCategory === 'All' || art.category === selectedCategory;
    const matchesSearch =
      art.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      art.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-colors">
      
      {/* Header */}
      <div className="max-w-4xl mb-12">
        <span className="text-xs font-semibold uppercase tracking-wider text-[var(--accent-text)] block mb-2">
          Knowledge Base & Free Learning
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[var(--text-primary)] tracking-tight leading-tight">
          YouTube Automation Resources & Guides
        </h1>
        <p className="text-base sm:text-lg text-[var(--text-secondary)] mt-4 leading-relaxed max-w-3xl">
          Explore our free educational guides covering faceless channel production, niche research, scriptwriting, and platform policies.
        </p>

        {/* Free Content Clarification */}
        <div className="mt-4 p-3.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)] text-xs text-[var(--text-secondary)] shadow-sm">
          <strong className="text-[var(--text-primary)]">Notice:</strong> These free articles provide introductory educational information. They are separate from our structured, paid mentorship program (PKR 50,000 in Pakistan / $200 USD internationally).
        </div>
      </div>

      {/* Search & Category Filter Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-[var(--border-color)]">
        
        {/* Search */}
        <div className="relative w-full md:w-80">
          <label htmlFor="search-resources" className="sr-only">Search educational articles</label>
          <Search className="w-4 h-4 text-[var(--text-muted)] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            id="search-resources"
            type="text"
            placeholder="Search guides (e.g. scripting, niche)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)] text-xs sm:text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-primary)] transition-colors"
          />
        </div>

        {/* Categories */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap cursor-pointer transition-colors ${
                selectedCategory === cat
                  ? 'bg-[var(--accent-primary)] text-white font-semibold shadow-sm'
                  : 'bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-color)]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {filteredArticles.map((article) => (
          <article
            key={article.id}
            className="p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] hover:border-[var(--accent-primary)]/50 transition-all flex flex-col justify-between shadow-sm"
          >
            <div>
              <div className="flex items-center gap-2 text-xs text-[var(--text-muted)] mb-3">
                <span className="text-[var(--accent-text)] font-semibold">{article.category}</span>
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-[var(--text-muted)]" />
                  {article.readTime}
                </span>
                <span aria-hidden="true">·</span>
                <span>{article.publishedDate}</span>
              </div>

              <h2 className="text-lg sm:text-xl font-bold text-[var(--text-primary)] mb-2 line-clamp-2">
                {article.title}
              </h2>

              <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed line-clamp-3 mb-5">
                {article.excerpt}
              </p>
            </div>

            <div className="pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between">
              <button
                type="button"
                onClick={() => setActiveArticle(article)}
                className="text-sm font-semibold text-[var(--accent-text)] hover:opacity-80 inline-flex items-center gap-1.5 cursor-pointer"
              >
                <span>Read Full Guide</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </article>
        ))}

        {filteredArticles.length === 0 && (
          <div className="col-span-full p-12 text-center rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)]">
            <p className="text-[var(--text-muted)] text-sm">No articles found matching "{searchTerm}".</p>
            <button
              type="button"
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
              }}
              className="mt-3 text-xs text-[var(--accent-text)] font-medium hover:underline cursor-pointer"
            >
              Reset Search & Filters
            </button>
          </div>
        )}
      </div>

      {/* Reader Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative text-left">
            
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setActiveArticle(null)}
              className="absolute top-5 right-5 p-2 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-elevated)] transition-colors cursor-pointer"
              aria-label="Close article"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Metadata */}
            <div className="flex items-center gap-2 text-xs font-semibold text-[var(--text-muted)] mb-3">
              <span className="text-[var(--accent-text)] font-bold">{activeArticle.category}</span>
              <span aria-hidden="true">·</span>
              <span>{activeArticle.readTime}</span>
              <span aria-hidden="true">·</span>
              <span>Published {activeArticle.publishedDate}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)] tracking-tight mb-4 pr-8 leading-tight">
              {activeArticle.title}
            </h2>

            <div className="p-4 rounded-xl bg-[var(--bg-surface-subtle)] border border-[var(--border-color)] mb-6 text-sm sm:text-base text-[var(--text-secondary)] italic">
              "{activeArticle.excerpt}"
            </div>

            {/* Content paragraphs */}
            <div className="space-y-4 text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
              {activeArticle.content.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            {/* Key Takeaways */}
            <div className="mt-8 p-5 sm:p-6 rounded-xl bg-[var(--bg-surface-subtle)] border border-[var(--border-color)]">
              <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[var(--accent-text)] mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[var(--accent-text)]" />
                <span>Key Practical Takeaways</span>
              </h3>
              <ul className="space-y-2.5 text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
                {activeArticle.keyTakeaways.map((takeaway, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="text-[var(--accent-text)] font-bold shrink-0 mt-0.5">✓</span>
                    <span>{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Non-intrusive Mentorship CTA */}
            <div className="mt-8 pt-6 border-t border-[var(--border-color)] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <p className="text-sm text-[var(--text-primary)] font-semibold">Want to learn with structured mentorship?</p>
                <p className="text-xs text-[var(--text-muted)]">Explore the complete 10-module paid curriculum.</p>
              </div>
              <div className="flex items-center gap-2.5">
                <WhatsAppButton label="Ask on WhatsApp" variant="primary" />
                <button
                  type="button"
                  onClick={() => {
                    setActiveArticle(null);
                    onNavigate('pricing');
                  }}
                  className="px-4 py-2 rounded-xl bg-[var(--bg-surface-elevated)] text-xs text-[var(--text-primary)] border border-[var(--border-color)] cursor-pointer"
                >
                  <span>View Pricing</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
