import React, { useState, useEffect } from 'react';
import { getSiteData, saveSiteData, SiteData, SocialLinks } from '../services/siteStore';
import { ResourceArticle, FAQItem, CurriculumModule } from '../config/siteConfig';
import { 
  ShieldCheck, Lock, LogOut, FileText, DollarSign, HelpCircle, 
  Share2, BookOpen, Plus, Trash2, Edit3, Save, X, ExternalLink, 
  CheckCircle, AlertTriangle, Video, Image as ImageIcon, ArrowLeft
} from 'lucide-react';

interface AdminPortalProps {
  onExit: () => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({ onExit }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('admin_auth_777') === 'true';
  });

  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');

  const [siteData, setSiteData] = useState<SiteData>(getSiteData());
  const [activeTab, setActiveTab] = useState<'articles' | 'pricing' | 'faqs' | 'social' | 'curriculum'>('articles');
  const [successMessage, setSuccessMessage] = useState('');

  // Article editing modal/state
  const [editingArticle, setEditingArticle] = useState<ResourceArticle | null>(null);
  const [isNewArticle, setIsNewArticle] = useState(false);

  // FAQ editing modal/state
  const [editingFaq, setEditingFaq] = useState<FAQItem | null>(null);
  const [isNewFaq, setIsNewFaq] = useState(false);

  useEffect(() => {
    const handleStorage = () => {
      setSiteData(getSiteData());
    };
    window.addEventListener('site_data_updated', handleStorage);
    return () => window.removeEventListener('site_data_updated', handleStorage);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (usernameInput === 'alphabs777' && passwordInput === 'alphataha') {
      setIsAuthenticated(true);
      sessionStorage.setItem('admin_auth_777', 'true');
      setLoginError('');
    } else {
      setLoginError('Invalid administrator credentials. Access restricted.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('admin_auth_777');
    setUsernameInput('');
    setPasswordInput('');
  };

  const triggerSuccess = (msg: string) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(''), 4000);
  };

  // Article handlers
  const handleSaveArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingArticle) return;

    let updatedArticles = [...siteData.articles];
    if (isNewArticle) {
      updatedArticles = [editingArticle, ...updatedArticles];
    } else {
      updatedArticles = updatedArticles.map(art => art.id === editingArticle.id ? editingArticle : art);
    }

    const updated = { ...siteData, articles: updatedArticles };
    setSiteData(updated);
    saveSiteData(updated);
    setEditingArticle(null);
    triggerSuccess('Article saved and published successfully in real time!');
  };

  const handleDeleteArticle = (id: string) => {
    if (!confirm('Are you sure you want to delete this article?')) return;
    const updatedArticles = siteData.articles.filter(art => art.id !== id);
    const updated = { ...siteData, articles: updatedArticles };
    setSiteData(updated);
    saveSiteData(updated);
    triggerSuccess('Article deleted successfully.');
  };

  // FAQ handlers
  const handleSaveFaq = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingFaq) return;

    let updatedFaqs = [...siteData.faqs];
    if (isNewFaq) {
      updatedFaqs = [editingFaq, ...updatedFaqs];
    } else {
      updatedFaqs = updatedFaqs.map(f => f.id === editingFaq.id ? editingFaq : f);
    }

    const updated = { ...siteData, faqs: updatedFaqs };
    setSiteData(updated);
    saveSiteData(updated);
    setEditingFaq(null);
    triggerSuccess('FAQ saved successfully in real time!');
  };

  const handleDeleteFaq = (id: string) => {
    if (!confirm('Are you sure you want to delete this FAQ?')) return;
    const updatedFaqs = siteData.faqs.filter(f => f.id !== id);
    const updated = { ...siteData, faqs: updatedFaqs };
    setSiteData(updated);
    saveSiteData(updated);
    triggerSuccess('FAQ deleted successfully.');
  };

  // Pricing handler
  const handleSavePricing = (e: React.FormEvent) => {
    e.preventDefault();
    saveSiteData(siteData);
    triggerSuccess('Pricing updated successfully in real time!');
  };

  // Social Links handler
  const handleSaveSocial = (e: React.FormEvent) => {
    e.preventDefault();
    saveSiteData(siteData);
    triggerSuccess('Social links & channels updated successfully in real time!');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[var(--bg-canvas)] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-red-600 via-indigo-600 to-cyan-500" />
          
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-[var(--accent-surface)] border border-[var(--accent-primary)]/30 flex items-center justify-center mx-auto mb-4 shadow-md">
              <Lock className="w-7 h-7 text-[var(--accent-text)]" />
            </div>
            <h1 className="text-2xl font-black tracking-tight text-[var(--text-primary)]">
              Admin Portal Security
            </h1>
            <p className="text-xs text-[var(--text-secondary)] mt-1.5">
              Restricted Area. Authorized Access Only (/admin7).
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-primary)] mb-1.5">
                Admin Username
              </label>
              <input
                type="text"
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                placeholder="Enter username"
                required
                className="w-full px-4 py-3 rounded-xl bg-[var(--bg-surface-subtle)] border border-[var(--border-color)] text-[var(--text-primary)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--text-primary)] mb-1.5">
                Admin Password
              </label>
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Enter password"
                required
                className="w-full px-4 py-3 rounded-xl bg-[var(--bg-surface-subtle)] border border-[var(--border-color)] text-[var(--text-primary)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]"
              />
            </div>

            {loginError && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-500 text-xs flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-[var(--accent-primary)] hover:opacity-90 text-white font-semibold text-sm transition-all shadow-lg shadow-[var(--accent-primary)]/20 cursor-pointer flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Authenticate Admin Session</span>
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-[var(--border-subtle)] text-center">
            <button
              type="button"
              onClick={onExit}
              className="text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] inline-flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Public Website</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg-canvas)] text-[var(--text-primary)] flex flex-col">
      {/* Admin Top Header */}
      <header className="sticky top-0 z-50 bg-[var(--bg-surface)] border-b border-[var(--border-color)] px-6 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center text-white font-bold shadow-md">
            AP
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-black tracking-tight">Injazify Master Admin Portal</h1>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 text-[10px] font-bold uppercase tracking-wider border border-emerald-500/30">
                Secure Active
              </span>
            </div>
            <p className="text-xs text-[var(--text-secondary)]">Manage articles, pricing, curriculum, FAQs & social channels in real time</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onExit}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-[var(--bg-surface-subtle)] hover:bg-[var(--bg-surface-elevated)] border border-[var(--border-color)] transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>View Live Site</span>
          </button>
          <button
            type="button"
            onClick={handleLogout}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/30 transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Secure Logout</span>
          </button>
        </div>
      </header>

      {successMessage && (
        <div className="bg-emerald-600 text-white text-xs font-medium px-6 py-3 flex items-center justify-center gap-2 shadow-md animate-in slide-in-from-top duration-200">
          <CheckCircle className="w-4 h-4 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Admin Dashboard Body */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex-1">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-[var(--border-color)] pb-4">
          <button
            type="button"
            onClick={() => setActiveTab('articles')}
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'articles'
                ? 'bg-[var(--accent-primary)] text-white shadow-md'
                : 'bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-subtle)] text-[var(--text-secondary)] border border-[var(--border-color)]'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Articles Manager ({siteData.articles.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('pricing')}
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'pricing'
                ? 'bg-[var(--accent-primary)] text-white shadow-md'
                : 'bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-subtle)] text-[var(--text-secondary)] border border-[var(--border-color)]'
            }`}
          >
            <DollarSign className="w-4 h-4" />
            <span>Pricing & Tuition</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('faqs')}
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'faqs'
                ? 'bg-[var(--accent-primary)] text-white shadow-md'
                : 'bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-subtle)] text-[var(--text-secondary)] border border-[var(--border-color)]'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>FAQ Manager ({siteData.faqs.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('social')}
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'social'
                ? 'bg-[var(--accent-primary)] text-white shadow-md'
                : 'bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-subtle)] text-[var(--text-secondary)] border border-[var(--border-color)]'
            }`}
          >
            <Share2 className="w-4 h-4" />
            <span>Footer Social Links</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('curriculum')}
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'curriculum'
                ? 'bg-[var(--accent-primary)] text-white shadow-md'
                : 'bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-subtle)] text-[var(--text-secondary)] border border-[var(--border-color)]'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Curriculum Modules ({siteData.curriculum.length})</span>
          </button>
        </div>

        {/* TAB 1: ARTICLES MANAGER */}
        {activeTab === 'articles' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold tracking-tight">Educational Articles & Blogging Studio</h2>
                <p className="text-xs text-[var(--text-secondary)]">Create, edit, attach multiple images, and embed video links for full-screen articles.</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsNewArticle(true);
                  setEditingArticle({
                    id: `art-${Date.now()}`,
                    slug: `article-${Date.now()}`,
                    title: '',
                    excerpt: '',
                    readTime: '6 min read',
                    publishedDate: 'October 2026',
                    category: 'Fundamentals',
                    images: [
                      'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1200&auto=format&fit=crop',
                      'https://images.unsplash.com/photo-1533750349077-cdcd106d2312?q=80&w=1200&auto=format&fit=crop',
                      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop'
                    ],
                    videoUrl: '',
                    content: [''],
                    keyTakeaways: [''],
                  } as any);
                }}
                className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-md flex items-center gap-2 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Create New Article</span>
              </button>
            </div>

            {/* Articles List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {siteData.articles.map((article) => {
                const coverImg = (article as any).images?.[0] || (article as any).imageUrl || 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1200&auto=format&fit=crop';
                return (
                  <div key={article.id} className="bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between">
                    <div>
                      <div className="h-40 w-full overflow-hidden bg-[var(--bg-surface-subtle)] relative">
                        <img src={coverImg} alt={article.title} className="w-full h-full object-cover" />
                        <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider">
                          {article.category}
                        </span>
                      </div>
                      <div className="p-5 space-y-2">
                        <div className="flex items-center justify-between text-[11px] text-[var(--text-muted)]">
                          <span>{article.readTime}</span>
                          <span>{article.publishedDate}</span>
                        </div>
                        <h3 className="font-bold text-sm text-[var(--text-primary)] line-clamp-2">{article.title}</h3>
                        <p className="text-xs text-[var(--text-secondary)] line-clamp-2">{article.excerpt}</p>
                      </div>
                    </div>

                    <div className="p-5 pt-0 flex items-center justify-between border-t border-[var(--border-subtle)] mt-4">
                      <span className="text-[11px] font-mono text-[var(--accent-text)]">/{article.slug}</span>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setIsNewArticle(false);
                            setEditingArticle(article);
                          }}
                          className="p-2 rounded-lg bg-[var(--bg-surface-subtle)] hover:bg-[var(--accent-surface)] text-[var(--text-primary)] hover:text-[var(--accent-text)] transition-colors cursor-pointer"
                          title="Edit Article"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteArticle(article.id)}
                          className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-500 transition-colors cursor-pointer"
                          title="Delete Article"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: PRICING & TUITION */}
        {activeTab === 'pricing' && (
          <div className="max-w-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-bold tracking-tight mb-2">Tuition Fee Management</h2>
            <p className="text-xs text-[var(--text-secondary)] mb-6">Update official mentorship pricing for Pakistan and international students in real time.</p>

            <form onSubmit={handleSavePricing} className="space-y-6">
              <div className="p-4 rounded-xl bg-[var(--bg-surface-subtle)] border border-[var(--border-color)] space-y-4">
                <h3 className="text-sm font-bold text-[var(--text-primary)]">Pakistan Region</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1">Amount (PKR)</label>
                    <input
                      type="number"
                      value={siteData.pricing.pakistan.amount}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        setSiteData(prev => ({
                          ...prev,
                          pricing: {
                            ...prev.pricing,
                            pakistan: { ...prev.pricing.pakistan, amount: val, formatted: `PKR ${val.toLocaleString()}` }
                          }
                        }));
                      }}
                      className="w-full px-3 py-2 rounded-lg bg-[var(--bg-canvas)] border border-[var(--border-color)] text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1">Formatted Label</label>
                    <input
                      type="text"
                      value={siteData.pricing.pakistan.formatted}
                      onChange={(e) => {
                        const val = e.target.value;
                        setSiteData(prev => ({
                          ...prev,
                          pricing: { ...prev.pricing, pakistan: { ...prev.pricing.pakistan, formatted: val } }
                        }));
                      }}
                      className="w-full px-3 py-2 rounded-lg bg-[var(--bg-canvas)] border border-[var(--border-color)] text-sm"
                    />
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[var(--bg-surface-subtle)] border border-[var(--border-color)] space-y-4">
                <h3 className="text-sm font-bold text-[var(--text-primary)]">International Region</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1">Amount (USD)</label>
                    <input
                      type="number"
                      value={siteData.pricing.international.amount}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        setSiteData(prev => ({
                          ...prev,
                          pricing: {
                            ...prev.pricing,
                            international: { ...prev.pricing.international, amount: val, formatted: `$${val} USD` }
                          }
                        }));
                      }}
                      className="w-full px-3 py-2 rounded-lg bg-[var(--bg-canvas)] border border-[var(--border-color)] text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1">Formatted Label</label>
                    <input
                      type="text"
                      value={siteData.pricing.international.formatted}
                      onChange={(e) => {
                        const val = e.target.value;
                        setSiteData(prev => ({
                          ...prev,
                          pricing: { ...prev.pricing, international: { ...prev.pricing.international, formatted: val } }
                        }));
                      }}
                      className="w-full px-3 py-2 rounded-lg bg-[var(--bg-canvas)] border border-[var(--border-color)] text-sm"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-[var(--accent-primary)] hover:opacity-95 text-white font-semibold text-xs transition-colors flex items-center gap-2 cursor-pointer shadow-md"
              >
                <Save className="w-4 h-4" />
                <span>Save Pricing Changes</span>
              </button>
            </form>
          </div>
        )}

        {/* TAB 3: FAQ MANAGER */}
        {activeTab === 'faqs' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold tracking-tight">Frequently Asked Questions</h2>
                <p className="text-xs text-[var(--text-secondary)]">Manage admissions, pricing, and mentorship FAQs in real time.</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsNewFaq(true);
                  setEditingFaq({
                    id: `faq-${Date.now()}`,
                    category: 'Mentorship',
                    question: '',
                    answer: '',
                  });
                }}
                className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-md flex items-center gap-2 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add New FAQ</span>
              </button>
            </div>

            <div className="space-y-3">
              {siteData.faqs.map((faq) => (
                <div key={faq.id} className="bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-xl p-4 flex items-start justify-between gap-4 shadow-xs">
                  <div>
                    <span className="inline-block px-2 py-0.5 rounded bg-[var(--accent-surface)] text-[var(--accent-text)] text-[10px] font-bold uppercase tracking-wider mb-1">
                      {faq.category}
                    </span>
                    <h3 className="font-bold text-sm text-[var(--text-primary)]">{faq.question}</h3>
                    <p className="text-xs text-[var(--text-secondary)] mt-1">{faq.answer}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => {
                        setIsNewFaq(false);
                        setEditingFaq(faq);
                      }}
                      className="p-2 rounded-lg bg-[var(--bg-surface-subtle)] hover:bg-[var(--accent-surface)] text-[var(--text-primary)] cursor-pointer"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteFaq(faq.id)}
                      className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-500 cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: FOOTER SOCIAL LINKS */}
        {activeTab === 'social' && (
          <div className="max-w-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-bold tracking-tight mb-2">Footer Social Channels & Links</h2>
            <p className="text-xs text-[var(--text-secondary)] mb-6">Configure official social media URLs rendered in the website footer in real time.</p>

            <form onSubmit={handleSaveSocial} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[var(--text-primary)] mb-1">YouTube Channel URL</label>
                <input
                  type="url"
                  value={siteData.socialLinks.youtube}
                  onChange={(e) => {
                    const val = e.target.value;
                    setSiteData(prev => ({ ...prev, socialLinks: { ...prev.socialLinks, youtube: val } }));
                  }}
                  className="w-full px-3 py-2.5 rounded-xl bg-[var(--bg-surface-subtle)] border border-[var(--border-color)] text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[var(--text-primary)] mb-1">Instagram URL</label>
                <input
                  type="url"
                  value={siteData.socialLinks.instagram}
                  onChange={(e) => {
                    const val = e.target.value;
                    setSiteData(prev => ({ ...prev, socialLinks: { ...prev.socialLinks, instagram: val } }));
                  }}
                  className="w-full px-3 py-2.5 rounded-xl bg-[var(--bg-surface-subtle)] border border-[var(--border-color)] text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[var(--text-primary)] mb-1">Twitter / X URL</label>
                <input
                  type="url"
                  value={siteData.socialLinks.twitter}
                  onChange={(e) => {
                    const val = e.target.value;
                    setSiteData(prev => ({ ...prev, socialLinks: { ...prev.socialLinks, twitter: val } }));
                  }}
                  className="w-full px-3 py-2.5 rounded-xl bg-[var(--bg-surface-subtle)] border border-[var(--border-color)] text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[var(--text-primary)] mb-1">TikTok URL</label>
                <input
                  type="url"
                  value={siteData.socialLinks.tiktok}
                  onChange={(e) => {
                    const val = e.target.value;
                    setSiteData(prev => ({ ...prev, socialLinks: { ...prev.socialLinks, tiktok: val } }));
                  }}
                  className="w-full px-3 py-2.5 rounded-xl bg-[var(--bg-surface-subtle)] border border-[var(--border-color)] text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[var(--text-primary)] mb-1">WhatsApp Admissions Link</label>
                <input
                  type="url"
                  value={siteData.socialLinks.whatsapp}
                  onChange={(e) => {
                    const val = e.target.value;
                    setSiteData(prev => ({ ...prev, socialLinks: { ...prev.socialLinks, whatsapp: val } }));
                  }}
                  className="w-full px-3 py-2.5 rounded-xl bg-[var(--bg-surface-subtle)] border border-[var(--border-color)] text-sm"
                />
              </div>

              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-[var(--accent-primary)] hover:opacity-95 text-white font-semibold text-xs transition-colors flex items-center gap-2 cursor-pointer shadow-md mt-4"
              >
                <Save className="w-4 h-4" />
                <span>Save Social Links</span>
              </button>
            </form>
          </div>
        )}

        {/* TAB 5: CURRICULUM */}
        {activeTab === 'curriculum' && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold tracking-tight">Curriculum Modules</h2>
            <p className="text-xs text-[var(--text-secondary)]">Overview of the 10 structured mentorship modules.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {siteData.curriculum.map((mod) => (
                <div key={mod.id} className="p-4 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-[var(--accent-text)]">Module {mod.number}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-[var(--bg-surface-subtle)] text-[var(--text-muted)]">{mod.practicalDeliverable}</span>
                  </div>
                  <h3 className="font-bold text-sm text-[var(--text-primary)]">{mod.title}</h3>
                  <p className="text-xs text-[var(--text-secondary)]">{mod.shortDesc}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ARTICLE EDIT / CREATE MODAL */}
      {editingArticle && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="max-w-2xl w-full bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl p-6 shadow-2xl my-8">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-[var(--border-color)]">
              <h3 className="text-base font-bold text-[var(--text-primary)]">
                {isNewArticle ? 'Create New Article' : 'Edit Article'}
              </h3>
              <button
                type="button"
                onClick={() => setEditingArticle(null)}
                className="p-2 rounded-lg bg-[var(--bg-surface-subtle)] hover:bg-[var(--bg-surface-elevated)] cursor-pointer"
              >
                <X className="w-5 h-5 text-[var(--text-secondary)]" />
              </button>
            </div>

            <form onSubmit={handleSaveArticle} className="space-y-4 max-h-[75vh] overflow-y-auto pr-2">
              <div>
                <label className="block text-xs font-semibold text-[var(--text-primary)] mb-1">Article Title</label>
                <input
                  type="text"
                  value={editingArticle.title}
                  onChange={(e) => setEditingArticle({ ...editingArticle, title: e.target.value })}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--bg-surface-subtle)] border border-[var(--border-color)] text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[var(--text-primary)] mb-1">URL Slug</label>
                  <input
                    type="text"
                    value={editingArticle.slug}
                    onChange={(e) => setEditingArticle({ ...editingArticle, slug: e.target.value })}
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--bg-surface-subtle)] border border-[var(--border-color)] text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[var(--text-primary)] mb-1">Category</label>
                  <input
                    type="text"
                    value={editingArticle.category}
                    onChange={(e) => setEditingArticle({ ...editingArticle, category: e.target.value })}
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--bg-surface-subtle)] border border-[var(--border-color)] text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[var(--text-primary)] mb-1">Dedicated Picture 1 (Cover URL)</label>
                <input
                  type="url"
                  value={(editingArticle as any).images?.[0] || ''}
                  onChange={(e) => {
                    const imgs = [...((editingArticle as any).images || ['', '', ''])];
                    imgs[0] = e.target.value;
                    setEditingArticle({ ...editingArticle, images: imgs } as any);
                  }}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--bg-surface-subtle)] border border-[var(--border-color)] text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[var(--text-primary)] mb-1">Dedicated Picture 2 URL</label>
                <input
                  type="url"
                  value={(editingArticle as any).images?.[1] || ''}
                  onChange={(e) => {
                    const imgs = [...((editingArticle as any).images || ['', '', ''])];
                    imgs[1] = e.target.value;
                    setEditingArticle({ ...editingArticle, images: imgs } as any);
                  }}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--bg-surface-subtle)] border border-[var(--border-color)] text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[var(--text-primary)] mb-1">Dedicated Picture 3 URL</label>
                <input
                  type="url"
                  value={(editingArticle as any).images?.[2] || ''}
                  onChange={(e) => {
                    const imgs = [...((editingArticle as any).images || ['', '', ''])];
                    imgs[2] = e.target.value;
                    setEditingArticle({ ...editingArticle, images: imgs } as any);
                  }}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--bg-surface-subtle)] border border-[var(--border-color)] text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[var(--text-primary)] mb-1">Embedded Video Masterclass URL (YouTube Embed URL)</label>
                <input
                  type="url"
                  value={(editingArticle as any).videoUrl || ''}
                  onChange={(e) => setEditingArticle({ ...editingArticle, videoUrl: e.target.value } as any)}
                  placeholder="https://www.youtube.com/embed/..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--bg-surface-subtle)] border border-[var(--border-color)] text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[var(--text-primary)] mb-1">Excerpt / Motivational Summary</label>
                <textarea
                  value={editingArticle.excerpt}
                  onChange={(e) => setEditingArticle({ ...editingArticle, excerpt: e.target.value })}
                  rows={2}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--bg-surface-subtle)] border border-[var(--border-color)] text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[var(--text-primary)] mb-1">Article Content Paragraphs (Paragraphs separated by double line break)</label>
                <textarea
                  value={Array.isArray(editingArticle.content) ? editingArticle.content.join('\n\n') : editingArticle.content}
                  onChange={(e) => setEditingArticle({ ...editingArticle, content: e.target.value.split('\n\n') })}
                  rows={6}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--bg-surface-subtle)] border border-[var(--border-color)] text-sm font-mono text-xs"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-[var(--border-color)]">
                <button
                  type="button"
                  onClick={() => setEditingArticle(null)}
                  className="px-4 py-2.5 rounded-xl bg-[var(--bg-surface-subtle)] hover:bg-[var(--bg-surface-elevated)] text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[var(--accent-primary)] hover:opacity-95 text-white text-xs font-semibold shadow-md cursor-pointer flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Save & Publish Article</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* FAQ EDIT / CREATE MODAL */}
      {editingFaq && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-[var(--border-color)]">
              <h3 className="text-base font-bold text-[var(--text-primary)]">
                {isNewFaq ? 'Add FAQ Item' : 'Edit FAQ Item'}
              </h3>
              <button
                type="button"
                onClick={() => setEditingFaq(null)}
                className="p-2 rounded-lg bg-[var(--bg-surface-subtle)] hover:bg-[var(--bg-surface-elevated)] cursor-pointer"
              >
                <X className="w-5 h-5 text-[var(--text-secondary)]" />
              </button>
            </div>

            <form onSubmit={handleSaveFaq} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[var(--text-primary)] mb-1">Question</label>
                <input
                  type="text"
                  value={editingFaq.question}
                  onChange={(e) => setEditingFaq({ ...editingFaq, question: e.target.value })}
                  required
                  className="w-full px-3 py-2 rounded-xl bg-[var(--bg-surface-subtle)] border border-[var(--border-color)] text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[var(--text-primary)] mb-1">Answer</label>
                <textarea
                  value={editingFaq.answer}
                  onChange={(e) => setEditingFaq({ ...editingFaq, answer: e.target.value })}
                  rows={4}
                  required
                  className="w-full px-3 py-2 rounded-xl bg-[var(--bg-surface-subtle)] border border-[var(--border-color)] text-sm"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-[var(--accent-primary)] text-white text-xs font-semibold shadow-md cursor-pointer"
                >
                  Save FAQ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
