import React, { useState, useEffect } from 'react';
import { ResourceArticle } from '../config/siteConfig';
import { NavPage } from '../components/Header';
import { WhatsAppButton } from '../components/WhatsAppButton';
import { getSiteData, SiteData } from '../services/siteStore';
import {
  Search,
  Clock,
  CheckCircle2,
  ArrowLeft,
  ChevronRight,
  Video,
  Sparkles,
  Share2,
  Bookmark
} from 'lucide-react';

interface ResourcesPageProps {
  onNavigate: (page: NavPage) => void;
}

export const ResourcesPage: React.FC<ResourcesPageProps> = ({ onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeArticleId, setActiveArticleId] = useState<string | null>(null);
  const [siteData, setSiteData] = useState<SiteData>(getSiteData());

  useEffect(() => {
    const handleUpdate = () => {
      setSiteData(getSiteData());
    };
    window.addEventListener('site_data_updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener('site_data_updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  const articles = siteData.articles;

  const categories = ['All', 'Fundamentals', 'Production', 'Strategy', 'Scripting', 'Packaging', 'Analytics', 'Compliance'];

  const filteredArticles = articles.filter((art) => {
    const matchesCat = selectedCategory === 'All' || art.category === selectedCategory;
    const matchesSearch =
      art.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      art.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const activeArticle = articles.find(a => a.id === activeArticleId);

  // Default dedicated pictures pool if article doesn't have custom images
  const defaultArticleImages = [
    'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1533750349077-cdcd106d2312?q=80&w=1200&auto=format&fit=crop'
  ];

  // If viewing an article in full screen (Blogging / Storytelling Mode)
  if (activeArticle) {
    const articleImages = (activeArticle as any).images || defaultArticleImages;

    return (
      <div className="py-12 sm:py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 transition-colors animate-in fade-in duration-200">
        <button
          type="button"
          onClick={() => setActiveArticleId(null)}
          className="inline-flex items-center gap-2 text-xs font-semibold text-[var(--accent-text)] hover:opacity-80 mb-8 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Articles & Guides</span>
        </button>

        {/* Metadata */}
        <div className="flex items-center gap-2.5 text-xs font-semibold text-[var(--text-muted)] mb-4">
          <span className="px-3 py-1 rounded-full bg-[var(--accent-surface)] text-[var(--accent-text)] uppercase tracking-wider font-bold border border-[var(--accent-primary)]/30">
            {activeArticle.category}
          </span>
          <span aria-hidden="true">·</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {activeArticle.readTime}
          </span>
          <span aria-hidden="true">·</span>
          <span>Published {activeArticle.publishedDate}</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-[var(--text-primary)] tracking-tight mb-6 leading-[1.15]">
          {activeArticle.title}
        </h1>

        {/* Primary Cover Image */}
        <div className="mb-10 rounded-2xl overflow-hidden border border-[var(--border-color)] shadow-xl h-80 sm:h-[420px] w-full bg-[var(--bg-surface)]">
          <img src={articleImages[0]} alt={activeArticle.title} className="w-full h-full object-cover" />
        </div>

        {/* Motivational Storytelling Lead Excerpt */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] mb-10 text-lg sm:text-xl text-[var(--text-primary)] font-medium leading-relaxed italic shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 w-2 h-full bg-[var(--accent-primary)]" />
          <p className="relative z-10">"{activeArticle.excerpt}"</p>
        </div>

        {/* Embedded Video Guide if available */}
        {(activeArticle as any).videoUrl && (
          <div className="mb-10 p-4 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] space-y-3 shadow-sm">
            <div className="flex items-center gap-2 text-xs font-bold text-[var(--accent-text)] uppercase tracking-wider">
              <Video className="w-4 h-4" />
              <span>Masterclass Video Breakdown</span>
            </div>
            <div className="aspect-video w-full rounded-xl overflow-hidden bg-black/40">
              <iframe
                src={(activeArticle as any).videoUrl}
                title={activeArticle.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        )}

        {/* Full Content Paragraphs with Interspersed Dedicated Pictures */}
        <div className="space-y-8 text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed">
          {activeArticle.content.map((p, idx) => (
            <React.Fragment key={idx}>
              <p className="first-letter:text-5xl first-letter:font-black first-letter:text-[var(--accent-text)] first-letter:mr-3 first-letter:float-left">
                {p}
              </p>

              {/* Intersperse 2nd image after paragraph 1 and 3rd image after paragraph 2 */}
              {idx === 1 && articleImages[1] && (
                <div className="my-8 rounded-2xl overflow-hidden border border-[var(--border-color)] shadow-lg h-72 sm:h-80 w-full bg-[var(--bg-surface)]">
                  <img src={articleImages[1]} alt="Dedicated workflow illustration" className="w-full h-full object-cover" />
                  <p className="p-3 text-center text-xs text-[var(--text-muted)] bg-[var(--bg-surface-subtle)] border-t border-[var(--border-color)]">
                    Figure 2.1 — Systematizing production pipelines for consistent viewer retention.
                  </p>
                </div>
              )}

              {idx === 3 && articleImages[2] && (
                <div className="my-8 rounded-2xl overflow-hidden border border-[var(--border-color)] shadow-lg h-72 sm:h-80 w-full bg-[var(--bg-surface)]">
                  <img src={articleImages[2]} alt="Dedicated strategy illustration" className="w-full h-full object-cover" />
                  <p className="p-3 text-center text-xs text-[var(--text-muted)] bg-[var(--bg-surface-subtle)] border-t border-[var(--border-color)]">
                    Figure 2.2 — Long-term asset creation and quality control standards.
                  </p>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Key Practical Takeaways */}
        {activeArticle.keyTakeaways && activeArticle.keyTakeaways.length > 0 && (
          <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-sm">
            <h3 className="text-sm sm:text-base font-bold uppercase tracking-wider text-[var(--accent-text)] mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[var(--accent-text)]" />
              <span>Key Practical Takeaways for Creators</span>
            </h3>
            <ul className="space-y-3.5 text-base text-[var(--text-secondary)] leading-relaxed">
              {activeArticle.keyTakeaways.map((takeaway, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <span className="font-medium text-[var(--text-primary)]">{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Mentorship Conversion CTA */}
        <div className="mt-14 p-8 rounded-2xl bg-gradient-to-br from-[var(--bg-surface)] to-[var(--accent-surface)] border border-[var(--accent-primary)]/40 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-extrabold text-[var(--text-primary)]">Ready to master YouTube automation?</h3>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1.5 leading-relaxed">
              Join our structured 10-module mentorship program. {siteData.pricing.pakistan.formatted} in Pakistan / {siteData.pricing.international.formatted} internationally.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <WhatsAppButton label="Inquire on WhatsApp" variant="primary" />
            <button
              type="button"
              onClick={() => onNavigate('pricing')}
              className="px-5 py-3 rounded-xl bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-elevated)] text-xs font-semibold text-[var(--text-primary)] border border-[var(--border-color)] cursor-pointer shadow-xs"
            >
              View Pricing
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-colors">
      
      {/* Header */}
      <div className="max-w-4xl mb-12">
        <span className="text-xs font-semibold uppercase tracking-wider text-[var(--accent-text)] block mb-2">
          Knowledge Base & Trending Blogging
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[var(--text-primary)] tracking-tight leading-tight">
          YouTube Automation Resources & Guides
        </h1>
        <p className="text-base sm:text-lg text-[var(--text-secondary)] mt-4 leading-relaxed max-w-3xl">
          Explore our free educational guides covering faceless channel production, motivational mindset, niche research, and storytelling frameworks.
        </p>

        {/* Free Content Clarification */}
        <div className="mt-4 p-3.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)] text-xs text-[var(--text-secondary)] shadow-sm">
          <strong className="text-[var(--text-primary)]">Notice:</strong> These free articles provide introductory educational information. They are separate from our structured, paid mentorship program ({siteData.pricing.pakistan.formatted} in Pakistan / {siteData.pricing.international.formatted} internationally).
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
            placeholder="Search guides (e.g. scripting, mindset)..."
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
        {filteredArticles.map((article) => {
          const cardImage = (article as any).images?.[0] || (article as any).imageUrl || defaultArticleImages[0];
          return (
            <article
              key={article.id}
              className="p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] hover:border-[var(--accent-primary)]/50 transition-all flex flex-col justify-between shadow-sm group cursor-pointer"
              onClick={() => {
                setActiveArticleId(article.id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <div>
                <div className="mb-4 h-48 rounded-xl overflow-hidden bg-[var(--bg-surface-subtle)] relative">
                  <img src={cardImage} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider">
                    {article.category}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs text-[var(--text-muted)] mb-2.5">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[var(--text-muted)]" />
                    {article.readTime}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{article.publishedDate}</span>
                </div>

                <h2 className="text-lg sm:text-xl font-bold text-[var(--text-primary)] mb-2 line-clamp-2 group-hover:text-[var(--accent-text)] transition-colors">
                  {article.title}
                </h2>

                <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed line-clamp-3 mb-5">
                  {article.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between">
                <span className="text-sm font-semibold text-[var(--accent-text)] inline-flex items-center gap-1.5">
                  <span>Read Full Blogging Story</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </article>
          );
        })}

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

    </div>
  );
};
