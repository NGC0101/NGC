import React, { useState, useEffect, useMemo } from 'react';
import {
  getSiteData,
  saveSiteData,
  resetSiteData,
  exportSiteDataJson,
  importSiteDataJson,
  checkAdminCredentials,
  updateAdminCredentials,
  generateDefaultWhatsappMessages,
  SiteData,
  SocialLinks
} from '../services/siteStore';
import { ResourceArticle, FAQItem, CurriculumModule } from '../config/siteConfig';
import {
  ShieldCheck,
  Lock,
  LogOut,
  FileText,
  DollarSign,
  HelpCircle,
  Share2,
  BookOpen,
  Plus,
  Trash2,
  Edit3,
  Save,
  X,
  ExternalLink,
  CheckCircle,
  AlertTriangle,
  Video,
  Image as ImageIcon,
  ArrowLeft,
  Search,
  KeyRound,
  Download,
  Upload,
  RotateCcw,
  Copy,
  ChevronUp,
  ChevronDown,
  Check,
  Eye
} from 'lucide-react';

interface AdminPortalProps {
  onExit: () => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({ onExit }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem('admin_auth_777') === 'true' || localStorage.getItem('admin_auth_remember_777') === 'true';
    } catch {
      return false;
    }
  });

  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loginError, setLoginError] = useState('');

  const [siteData, setSiteData] = useState<SiteData>(getSiteData());
  const [activeTab, setActiveTab] = useState<'articles' | 'pricing' | 'faqs' | 'social' | 'curriculum' | 'security'>('articles');
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Article State
  const [articleSearch, setArticleSearch] = useState('');
  const [articleCategoryFilter, setArticleCategoryFilter] = useState('All');
  const [editingArticle, setEditingArticle] = useState<ResourceArticle | null>(null);
  const [isNewArticle, setIsNewArticle] = useState(false);

  // FAQ State
  const [faqSearch, setFaqSearch] = useState('');
  const [faqCategoryFilter, setFaqCategoryFilter] = useState('All');
  const [editingFaq, setEditingFaq] = useState<FAQItem | null>(null);
  const [isNewFaq, setIsNewFaq] = useState(false);

  // Curriculum State
  const [editingModule, setEditingModule] = useState<CurriculumModule | null>(null);

  // Security Credentials State
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // In-App Confirm Modal State (replaces all window.confirm)
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    title: string;
    description: string;
    actionLabel: string;
    isDestructive?: boolean;
    onConfirm: () => void;
  }>({
    isOpen: false,
    title: '',
    description: '',
    actionLabel: 'Confirm',
    onConfirm: () => {},
  });

  // Cross-tab and store sync
  useEffect(() => {
    const handleStorage = () => {
      setSiteData(getSiteData());
    };
    window.addEventListener('site_data_updated', handleStorage);
    window.addEventListener('storage', handleStorage);
    return () => {
      window.removeEventListener('site_data_updated', handleStorage);
      window.removeEventListener('storage', handleStorage);
    };
  }, []);

  const triggerToast = (message: string, type: 'success' | 'error' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification((curr) => (curr?.message === message ? null : curr));
    }, 4000);
  };

  // Login handler
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (checkAdminCredentials(usernameInput.trim(), passwordInput.trim())) {
      setIsAuthenticated(true);
      try {
        sessionStorage.setItem('admin_auth_777', 'true');
        if (rememberMe) {
          localStorage.setItem('admin_auth_remember_777', 'true');
        }
      } catch {
        // ignore storage errors
      }
      setLoginError('');
      triggerToast('Authenticated successfully. Welcome to Injazify Admin Portal.');
    } else {
      setLoginError('Invalid administrator credentials. Access strictly restricted.');
    }
  };

  // Logout handler
  const handleLogout = () => {
    setIsAuthenticated(false);
    try {
      sessionStorage.removeItem('admin_auth_777');
      localStorage.removeItem('admin_auth_remember_777');
    } catch {
      // ignore
    }
    setUsernameInput('');
    setPasswordInput('');
  };

  // ==========================================
  // TAB 1: ARTICLES MANAGEMENT
  // ==========================================
  const filteredArticles = useMemo(() => {
    return siteData.articles.filter((art) => {
      const matchesCat = articleCategoryFilter === 'All' || art.category === articleCategoryFilter;
      const matchesSearch =
        art.title.toLowerCase().includes(articleSearch.toLowerCase()) ||
        art.excerpt.toLowerCase().includes(articleSearch.toLowerCase()) ||
        art.slug.toLowerCase().includes(articleSearch.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [siteData.articles, articleCategoryFilter, articleSearch]);

  const articleCategories = useMemo(() => {
    const set = new Set(siteData.articles.map((a) => a.category));
    return ['All', ...Array.from(set)];
  }, [siteData.articles]);

  const handleOpenCreateArticle = () => {
    setIsNewArticle(true);
    setEditingArticle({
      id: `art-${Date.now()}`,
      slug: `new-article-${Date.now().toString().slice(-5)}`,
      title: '',
      excerpt: '',
      readTime: '7 min read',
      publishedDate: 'October 2026',
      category: 'Fundamentals',
      images: [
        'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1533750349077-cdcd106d2312?q=80&w=1200&auto=format&fit=crop',
      ],
      videoUrl: '',
      content: ['Write your first storytelling paragraph here...'],
      keyTakeaways: ['High-retention storytelling builds authority.'],
      seoDescription: '',
      seoKeywords: ['YouTube automation', 'faceless channel'],
    });
  };

  const handleSaveArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingArticle) return;

    if (!editingArticle.title.trim()) {
      triggerToast('Article title cannot be blank.', 'error');
      return;
    }

    let finalSlug = editingArticle.slug.trim().toLowerCase();
    if (!finalSlug) {
      finalSlug = editingArticle.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
    }

    const cleanedArticle: ResourceArticle = {
      ...editingArticle,
      slug: finalSlug,
      title: editingArticle.title.trim(),
      excerpt: editingArticle.excerpt.trim(),
      content: Array.isArray(editingArticle.content)
        ? editingArticle.content.filter((c) => c.trim().length > 0)
        : [editingArticle.content],
      keyTakeaways: (editingArticle.keyTakeaways || []).filter((k) => k.trim().length > 0),
      images: (editingArticle.images || []).map((img) => img.trim()).filter(Boolean),
    };

    let updatedArticles = [...siteData.articles];
    if (isNewArticle) {
      updatedArticles = [cleanedArticle, ...updatedArticles];
    } else {
      updatedArticles = updatedArticles.map((art) => (art.id === cleanedArticle.id ? cleanedArticle : art));
    }

    const updated = { ...siteData, articles: updatedArticles };
    setSiteData(updated);
    saveSiteData(updated);
    setEditingArticle(null);
    triggerToast(isNewArticle ? 'New article created and published in real time!' : 'Article updated and synchronized in real time!');
  };

  const handleDeleteArticlePrompt = (article: ResourceArticle) => {
    setConfirmModal({
      isOpen: true,
      title: 'Delete Article',
      description: `Are you sure you want to permanently delete "${article.title}"? This cannot be undone.`,
      actionLabel: 'Delete Article',
      isDestructive: true,
      onConfirm: () => {
        const updatedArticles = siteData.articles.filter((art) => art.id !== article.id);
        const updated = { ...siteData, articles: updatedArticles };
        setSiteData(updated);
        saveSiteData(updated);
        setConfirmModal((prev) => ({ ...prev, isOpen: false }));
        triggerToast('Article deleted successfully.');
      },
    });
  };

  const handleDuplicateArticle = (article: ResourceArticle) => {
    const clone: ResourceArticle = {
      ...article,
      id: `art-${Date.now()}`,
      slug: `${article.slug}-copy-${Date.now().toString().slice(-4)}`,
      title: `${article.title} (Copy)`,
    };
    const updated = { ...siteData, articles: [clone, ...siteData.articles] };
    setSiteData(updated);
    saveSiteData(updated);
    triggerToast('Article duplicated successfully.');
  };

  // Helper to convert youtube standard link to embed format
  const normalizeYoutubeEmbed = (url: string): string => {
    if (!url) return '';
    try {
      if (url.includes('youtube.com/watch?v=')) {
        const videoId = url.split('v=')[1]?.split('&')[0];
        if (videoId) return `https://www.youtube.com/embed/${videoId}`;
      }
      if (url.includes('youtu.be/')) {
        const videoId = url.split('youtu.be/')[1]?.split('?')[0];
        if (videoId) return `https://www.youtube.com/embed/${videoId}`;
      }
    } catch {
      // ignore
    }
    return url;
  };

  // ==========================================
  // TAB 2: PRICING & TUITION
  // ==========================================
  const handleSavePricing = (e: React.FormEvent) => {
    e.preventDefault();
    const pkFormatted = siteData.pricing.pakistan.formatted.trim();
    const intlFormatted = siteData.pricing.international.formatted.trim();

    const updatedMessages = generateDefaultWhatsappMessages(pkFormatted, intlFormatted);

    const updated: SiteData = {
      ...siteData,
      pricing: {
        pakistan: {
          ...siteData.pricing.pakistan,
          displayLabel: `Mentorship Fee: ${pkFormatted}`,
        },
        international: {
          ...siteData.pricing.international,
          displayLabel: `Mentorship Fee: ${intlFormatted}`,
        },
      },
      whatsappMessages: updatedMessages,
    };

    setSiteData(updated);
    saveSiteData(updated);
    triggerToast('Tuition pricing and WhatsApp templates updated in real time!');
  };

  const handleResetPricing = () => {
    setConfirmModal({
      isOpen: true,
      title: 'Reset Pricing to Factory Standard',
      description: 'Are you sure you want to reset mentorship fees back to PKR 50,000 and $200 USD?',
      actionLabel: 'Reset Pricing',
      isDestructive: false,
      onConfirm: () => {
        const defaults = getSiteData();
        const updated: SiteData = {
          ...siteData,
          pricing: {
            pakistan: {
              amount: 50000,
              currency: 'PKR',
              formatted: 'PKR 50,000',
              displayLabel: 'Mentorship Fee: PKR 50,000',
              audience: 'For students in Pakistan',
            },
            international: {
              amount: 200,
              currency: 'USD',
              formatted: '$200 USD',
              displayLabel: 'Mentorship Fee: $200 USD',
              audience: 'For students outside Pakistan',
            },
          },
          whatsappMessages: generateDefaultWhatsappMessages('PKR 50,000', '$200 USD'),
        };
        setSiteData(updated);
        saveSiteData(updated);
        setConfirmModal((prev) => ({ ...prev, isOpen: false }));
        triggerToast('Pricing restored to standard.');
      },
    });
  };

  // ==========================================
  // TAB 3: FAQ MANAGEMENT
  // ==========================================
  const filteredFaqs = useMemo(() => {
    return siteData.faqs.filter((faq) => {
      const matchesCat = faqCategoryFilter === 'All' || faq.category === faqCategoryFilter;
      const matchesSearch =
        faq.question.toLowerCase().includes(faqSearch.toLowerCase()) ||
        faq.answer.toLowerCase().includes(faqSearch.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [siteData.faqs, faqCategoryFilter, faqSearch]);

  const handleOpenCreateFaq = () => {
    setIsNewFaq(true);
    setEditingFaq({
      id: `faq-${Date.now()}`,
      category: 'Mentorship',
      question: '',
      answer: '',
    });
  };

  const handleSaveFaq = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingFaq) return;

    if (!editingFaq.question.trim() || !editingFaq.answer.trim()) {
      triggerToast('FAQ question and answer cannot be blank.', 'error');
      return;
    }

    let updatedFaqs = [...siteData.faqs];
    if (isNewFaq) {
      updatedFaqs = [editingFaq, ...updatedFaqs];
    } else {
      updatedFaqs = updatedFaqs.map((f) => (f.id === editingFaq.id ? editingFaq : f));
    }

    const updated = { ...siteData, faqs: updatedFaqs };
    setSiteData(updated);
    saveSiteData(updated);
    setEditingFaq(null);
    triggerToast(isNewFaq ? 'New FAQ created and published in real time!' : 'FAQ updated successfully.');
  };

  const handleDeleteFaqPrompt = (faq: FAQItem) => {
    setConfirmModal({
      isOpen: true,
      title: 'Delete FAQ',
      description: `Are you sure you want to remove the question "${faq.question}"?`,
      actionLabel: 'Delete FAQ',
      isDestructive: true,
      onConfirm: () => {
        const updatedFaqs = siteData.faqs.filter((f) => f.id !== faq.id);
        const updated = { ...siteData, faqs: updatedFaqs };
        setSiteData(updated);
        saveSiteData(updated);
        setConfirmModal((prev) => ({ ...prev, isOpen: false }));
        triggerToast('FAQ deleted.');
      },
    });
  };

  const handleMoveFaq = (index: number, direction: 'up' | 'down') => {
    const updated = [...siteData.faqs];
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= updated.length) return;
    const temp = updated[index];
    updated[index] = updated[targetIdx];
    updated[targetIdx] = temp;
    const updatedData = { ...siteData, faqs: updated };
    setSiteData(updatedData);
    saveSiteData(updatedData);
  };

  // ==========================================
  // TAB 4: SOCIAL LINKS
  // ==========================================
  const handleSaveSocial = (e: React.FormEvent) => {
    e.preventDefault();
    saveSiteData(siteData);
    triggerToast('Footer social channels updated and synchronized in real time!');
  };

  // ==========================================
  // TAB 5: CURRICULUM MANAGEMENT
  // ==========================================
  const handleSaveModule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingModule) return;

    const updatedCurriculum = siteData.curriculum.map((m) =>
      m.id === editingModule.id ? editingModule : m
    );
    const updated = { ...siteData, curriculum: updatedCurriculum };
    setSiteData(updated);
    saveSiteData(updated);
    setEditingModule(null);
    triggerToast(`Module ${editingModule.number} updated successfully in real time!`);
  };

  // ==========================================
  // TAB 6: SECURITY & DATA BACKUP
  // ==========================================
  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUsername.trim()) {
      triggerToast('Username cannot be empty.', 'error');
      return;
    }
    if (newPassword.length < 6) {
      triggerToast('Password must be at least 6 characters.', 'error');
      return;
    }
    if (newPassword !== confirmPassword) {
      triggerToast('Passwords do not match.', 'error');
      return;
    }

    const success = updateAdminCredentials(newUsername.trim(), newPassword.trim());
    if (success) {
      setNewUsername('');
      setNewPassword('');
      setConfirmPassword('');
      triggerToast('Admin credentials updated! Use these on your next login.');
    } else {
      triggerToast('Failed to update credentials.', 'error');
    }
  };

  const handleDownloadBackup = () => {
    const jsonStr = exportSiteDataJson();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `next-gen-creators-backup-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    triggerToast('Database backup downloaded successfully.');
  };

  const handleUploadBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const res = importSiteDataJson(content);
      if (res.success) {
        setSiteData(getSiteData());
        triggerToast('Site data imported and synchronized successfully in real time!');
      } else {
        triggerToast(`Import failed: ${res.error}`, 'error');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleFactoryResetPrompt = () => {
    setConfirmModal({
      isOpen: true,
      title: 'Factory Reset All Content',
      description: 'WARNING: This will reset all articles, pricing, FAQs, curriculum, and social links to the original codebase defaults. This cannot be undone.',
      actionLabel: 'Factory Reset Everything',
      isDestructive: true,
      onConfirm: () => {
        const pristine = resetSiteData();
        setSiteData(pristine);
        setConfirmModal((prev) => ({ ...prev, isOpen: false }));
        triggerToast('Factory reset complete. All data restored to defaults.');
      },
    });
  };

  // ==========================================
  // AUTHENTICATION SCREEN
  // ==========================================
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

            <div className="flex items-center justify-between text-xs text-[var(--text-secondary)]">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-[var(--border-color)] text-[var(--accent-primary)] focus:ring-[var(--accent-primary)]"
                />
                <span>Remember this session</span>
              </label>
            </div>

            {loginError && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-500 text-xs flex items-center gap-2 animate-shake">
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

  // ==========================================
  // MAIN ADMIN DASHBOARD
  // ==========================================
  return (
    <div className="min-h-screen bg-[var(--bg-canvas)] text-[var(--text-primary)] flex flex-col font-sans transition-colors duration-200">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-[var(--bg-surface)] border-b border-[var(--border-color)] px-4 sm:px-6 py-3.5 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center text-white font-bold shadow-md shrink-0">
            AP
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-black tracking-tight text-[var(--text-primary)]">
                Injazify Master Admin Portal
              </h1>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 text-[10px] font-bold uppercase tracking-wider border border-emerald-500/30 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live Synced
              </span>
            </div>
            <p className="text-[11px] text-[var(--text-secondary)] hidden sm:block">
              Full operational control: Articles, pricing, curriculum, FAQs, social links & data backups
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={onExit}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-[var(--bg-surface-subtle)] hover:bg-[var(--bg-surface-elevated)] border border-[var(--border-color)] text-[var(--text-primary)] transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">View Live Site</span>
          </button>
          <button
            type="button"
            onClick={handleLogout}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/30 transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Secure Logout</span>
          </button>
        </div>
      </header>

      {/* Toast Notification Banner */}
      {notification && (
        <div
          className={`fixed top-18 right-6 z-50 px-5 py-3 rounded-xl shadow-xl flex items-center gap-2.5 text-xs font-medium animate-in slide-in-from-top duration-200 border ${
            notification.type === 'error'
              ? 'bg-red-600 text-white border-red-500 shadow-red-950/30'
              : 'bg-emerald-600 text-white border-emerald-500 shadow-emerald-950/30'
          }`}
        >
          {notification.type === 'error' ? (
            <AlertTriangle className="w-4 h-4 shrink-0" />
          ) : (
            <CheckCircle className="w-4 h-4 shrink-0" />
          )}
          <span>{notification.message}</span>
        </div>
      )}

      {/* Main Container */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 flex-1">
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
            onClick={() => setActiveTab('security')}
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'security'
                ? 'bg-[var(--accent-primary)] text-white shadow-md'
                : 'bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-subtle)] text-[var(--text-secondary)] border border-[var(--border-color)]'
            }`}
          >
            <KeyRound className="w-4 h-4" />
            <span>Security & Backups</span>
          </button>
        </div>

        {/* =========================================================
            TAB 1: ARTICLES MANAGER
        ========================================================= */}
        {activeTab === 'articles' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold tracking-tight">Educational Articles & Storytelling Studio</h2>
                <p className="text-xs text-[var(--text-secondary)]">
                  Create, edit, duplicate, and attach multiple dedicated pictures with embedded video masterclasses.
                </p>
              </div>

              <button
                type="button"
                onClick={handleOpenCreateArticle}
                className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-md flex items-center gap-2 cursor-pointer shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Create New Article</span>
              </button>
            </div>

            {/* Filter & Search Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)]">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-[var(--text-muted)] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search articles by title, excerpt or slug..."
                  value={articleSearch}
                  onChange={(e) => setArticleSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg bg-[var(--bg-surface-subtle)] border border-[var(--border-color)] text-xs text-[var(--text-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--accent-primary)]"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <span className="text-xs text-[var(--text-secondary)] font-medium">Category:</span>
                <select
                  value={articleCategoryFilter}
                  onChange={(e) => setArticleCategoryFilter(e.target.value)}
                  className="px-3 py-2 rounded-lg bg-[var(--bg-surface-subtle)] border border-[var(--border-color)] text-xs text-[var(--text-primary)] focus:outline-none"
                >
                  {articleCategories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Articles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((article) => {
                const coverImg =
                  (article as any).images?.[0] ||
                  (article as any).imageUrl ||
                  'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1200&auto=format&fit=crop';
                return (
                  <div
                    key={article.id}
                    className="bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between hover:border-[var(--accent-primary)]/40 transition-all"
                  >
                    <div>
                      <div className="h-44 w-full overflow-hidden bg-[var(--bg-surface-subtle)] relative">
                        <img
                          src={coverImg}
                          alt={article.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1200&auto=format&fit=crop';
                          }}
                        />
                        <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider">
                          {article.category}
                        </span>
                        {(article as any).videoUrl && (
                          <span className="absolute top-3 right-3 p-1.5 rounded-full bg-red-600 text-white shadow-md">
                            <Video className="w-3.5 h-3.5" />
                          </span>
                        )}
                      </div>
                      <div className="p-5 space-y-2">
                        <div className="flex items-center justify-between text-[11px] text-[var(--text-muted)]">
                          <span>{article.readTime || '6 min read'}</span>
                          <span>{article.publishedDate || 'October 2026'}</span>
                        </div>
                        <h3 className="font-bold text-sm text-[var(--text-primary)] line-clamp-2 leading-snug">
                          {article.title}
                        </h3>
                        <p className="text-xs text-[var(--text-secondary)] line-clamp-2 leading-relaxed">
                          {article.excerpt}
                        </p>
                      </div>
                    </div>

                    <div className="p-5 pt-0 flex items-center justify-between border-t border-[var(--border-subtle)] mt-4">
                      <span className="text-[11px] font-mono text-[var(--accent-text)] truncate max-w-[140px]">
                        /{article.slug}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleDuplicateArticle(article)}
                          className="p-2 rounded-lg bg-[var(--bg-surface-subtle)] hover:bg-[var(--bg-surface-elevated)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
                          title="Duplicate Article"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setIsNewArticle(false);
                            setEditingArticle({ ...article });
                          }}
                          className="p-2 rounded-lg bg-[var(--bg-surface-subtle)] hover:bg-[var(--accent-surface)] text-[var(--text-primary)] hover:text-[var(--accent-text)] transition-colors cursor-pointer"
                          title="Edit Article"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteArticlePrompt(article)}
                          className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-500 transition-colors cursor-pointer"
                          title="Delete Article"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* =========================================================
            TAB 2: PRICING & TUITION
        ========================================================= */}
        {activeTab === 'pricing' && (
          <div className="max-w-3xl bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl p-6 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold tracking-tight">Tuition Fee Management</h2>
                <p className="text-xs text-[var(--text-secondary)]">
                  Updates sync instantly across the Homepage, Pricing page, Footer, and WhatsApp inquiry links.
                </p>
              </div>

              <button
                type="button"
                onClick={handleResetPricing}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[var(--bg-surface-subtle)] hover:bg-[var(--bg-surface-elevated)] border border-[var(--border-color)] text-[var(--text-secondary)] flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset to Defaults</span>
              </button>
            </div>

            <form onSubmit={handleSavePricing} className="space-y-6">
              {/* Pakistan Pricing */}
              <div className="p-5 rounded-xl bg-[var(--bg-surface-subtle)] border border-[var(--border-color)] space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-[var(--text-primary)] flex items-center gap-2">
                    <span>🇵🇰 Pakistan Region</span>
                  </h3>
                  <span className="text-[11px] text-[var(--text-muted)]">Currency: PKR</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1">
                      Raw Numeric Amount
                    </label>
                    <input
                      type="number"
                      value={siteData.pricing.pakistan.amount}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        setSiteData((prev) => ({
                          ...prev,
                          pricing: {
                            ...prev.pricing,
                            pakistan: {
                              ...prev.pricing.pakistan,
                              amount: val,
                              formatted: `PKR ${val.toLocaleString()}`,
                            },
                          },
                        }));
                      }}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[var(--bg-canvas)] border border-[var(--border-color)] text-sm"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1">
                      Formatted Display Label
                    </label>
                    <input
                      type="text"
                      value={siteData.pricing.pakistan.formatted}
                      onChange={(e) => {
                        const val = e.target.value;
                        setSiteData((prev) => ({
                          ...prev,
                          pricing: {
                            ...prev.pricing,
                            pakistan: { ...prev.pricing.pakistan, formatted: val },
                          },
                        }));
                      }}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[var(--bg-canvas)] border border-[var(--border-color)] text-sm"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* International Pricing */}
              <div className="p-5 rounded-xl bg-[var(--bg-surface-subtle)] border border-[var(--border-color)] space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-[var(--text-primary)] flex items-center gap-2">
                    <span>🌐 International Region</span>
                  </h3>
                  <span className="text-[11px] text-[var(--text-muted)]">Currency: USD</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1">
                      Raw Numeric Amount
                    </label>
                    <input
                      type="number"
                      value={siteData.pricing.international.amount}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        setSiteData((prev) => ({
                          ...prev,
                          pricing: {
                            ...prev.pricing,
                            international: {
                              ...prev.pricing.international,
                              amount: val,
                              formatted: `$${val} USD`,
                            },
                          },
                        }));
                      }}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[var(--bg-canvas)] border border-[var(--border-color)] text-sm"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1">
                      Formatted Display Label
                    </label>
                    <input
                      type="text"
                      value={siteData.pricing.international.formatted}
                      onChange={(e) => {
                        const val = e.target.value;
                        setSiteData((prev) => ({
                          ...prev,
                          pricing: {
                            ...prev.pricing,
                            international: { ...prev.pricing.international, formatted: val },
                          },
                        }));
                      }}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[var(--bg-canvas)] border border-[var(--border-color)] text-sm"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Live WhatsApp Inquiry Message Preview */}
              <div className="p-4 rounded-xl bg-[var(--bg-surface-subtle)] border border-[var(--border-color)] space-y-2">
                <span className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider block">
                  Live WhatsApp Inquiry Template Preview:
                </span>
                <p className="text-xs text-[var(--text-muted)] font-mono p-3 rounded-lg bg-[var(--bg-canvas)] border border-[var(--border-subtle)] leading-relaxed">
                  "Assalam-o-Alaikum! I'm interested in joining the Next Gen Creators YouTube Automation Mentorship. I understand the mentorship fee is {siteData.pricing.pakistan.formatted}. Please share the curriculum and enrollment process."
                </p>
              </div>

              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-[var(--accent-primary)] hover:opacity-95 text-white font-semibold text-xs transition-colors flex items-center gap-2 cursor-pointer shadow-md"
              >
                <Save className="w-4 h-4" />
                <span>Save Pricing Changes & Sync Site</span>
              </button>
            </form>
          </div>
        )}

        {/* =========================================================
            TAB 3: FAQ MANAGER
        ========================================================= */}
        {activeTab === 'faqs' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold tracking-tight">Frequently Asked Questions</h2>
                <p className="text-xs text-[var(--text-secondary)]">
                  Manage questions, answers, and category classifications rendered on the public FAQ page.
                </p>
              </div>

              <button
                type="button"
                onClick={handleOpenCreateFaq}
                className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-md flex items-center gap-2 cursor-pointer shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Add New FAQ</span>
              </button>
            </div>

            {/* Filter & Search */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)]">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-[var(--text-muted)] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search FAQ questions or answers..."
                  value={faqSearch}
                  onChange={(e) => setFaqSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg bg-[var(--bg-surface-subtle)] border border-[var(--border-color)] text-xs text-[var(--text-primary)] focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <span className="text-xs text-[var(--text-secondary)] font-medium">Category:</span>
                <select
                  value={faqCategoryFilter}
                  onChange={(e) => setFaqCategoryFilter(e.target.value)}
                  className="px-3 py-2 rounded-lg bg-[var(--bg-surface-subtle)] border border-[var(--border-color)] text-xs text-[var(--text-primary)]"
                >
                  <option value="All">All Categories</option>
                  <option value="Mentorship">Mentorship</option>
                  <option value="Pricing & Enrollment">Pricing & Enrollment</option>
                  <option value="Curriculum & Support">Curriculum & Support</option>
                  <option value="Expectations">Expectations</option>
                </select>
              </div>
            </div>

            {/* FAQs List */}
            <div className="space-y-3">
              {filteredFaqs.map((faq, index) => (
                <div
                  key={faq.id}
                  className="bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-xl p-4 flex items-start justify-between gap-4 shadow-xs hover:border-[var(--accent-primary)]/30 transition-all"
                >
                  <div className="space-y-1.5 flex-1">
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-[var(--accent-surface)] text-[var(--accent-text)] text-[10px] font-bold uppercase tracking-wider border border-[var(--accent-primary)]/20">
                      {faq.category}
                    </span>
                    <h3 className="font-bold text-sm text-[var(--text-primary)]">{faq.question}</h3>
                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{faq.answer}</p>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => handleMoveFaq(index, 'up')}
                      disabled={index === 0}
                      className="p-1.5 rounded-lg bg-[var(--bg-surface-subtle)] hover:bg-[var(--bg-surface-elevated)] text-[var(--text-secondary)] disabled:opacity-30 cursor-pointer"
                      title="Move Up"
                    >
                      <ChevronUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleMoveFaq(index, 'down')}
                      disabled={index === siteData.faqs.length - 1}
                      className="p-1.5 rounded-lg bg-[var(--bg-surface-subtle)] hover:bg-[var(--bg-surface-elevated)] text-[var(--text-secondary)] disabled:opacity-30 cursor-pointer"
                      title="Move Down"
                    >
                      <ChevronDown className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsNewFaq(false);
                        setEditingFaq({ ...faq });
                      }}
                      className="p-2 rounded-lg bg-[var(--bg-surface-subtle)] hover:bg-[var(--accent-surface)] text-[var(--text-primary)] hover:text-[var(--accent-text)] cursor-pointer"
                      title="Edit FAQ"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteFaqPrompt(faq)}
                      className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-500 cursor-pointer"
                      title="Delete FAQ"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================
            TAB 4: FOOTER SOCIAL LINKS
        ========================================================= */}
        {activeTab === 'social' && (
          <div className="max-w-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl p-6 shadow-sm space-y-6">
            <div>
              <h2 className="text-lg font-bold tracking-tight">Footer Social Channels & Links</h2>
              <p className="text-xs text-[var(--text-secondary)]">
                Update the official channel URLs rendered in the website footer. Changes reflect across all pages immediately.
              </p>
            </div>

            <form onSubmit={handleSaveSocial} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[var(--text-primary)] mb-1">
                  YouTube Channel URL
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="url"
                    value={siteData.socialLinks.youtube}
                    onChange={(e) => {
                      const val = e.target.value;
                      setSiteData((prev) => ({
                        ...prev,
                        socialLinks: { ...prev.socialLinks, youtube: val },
                      }));
                    }}
                    placeholder="https://youtube.com/@channel"
                    className="flex-1 px-3.5 py-2.5 rounded-xl bg-[var(--bg-surface-subtle)] border border-[var(--border-color)] text-sm"
                  />
                  {siteData.socialLinks.youtube && (
                    <a
                      href={siteData.socialLinks.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl bg-[var(--bg-surface-subtle)] hover:bg-[var(--bg-surface-elevated)] border border-[var(--border-color)] text-[var(--text-secondary)]"
                      title="Test Link"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[var(--text-primary)] mb-1">
                  Instagram Profile URL
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="url"
                    value={siteData.socialLinks.instagram}
                    onChange={(e) => {
                      const val = e.target.value;
                      setSiteData((prev) => ({
                        ...prev,
                        socialLinks: { ...prev.socialLinks, instagram: val },
                      }));
                    }}
                    placeholder="https://instagram.com/profile"
                    className="flex-1 px-3.5 py-2.5 rounded-xl bg-[var(--bg-surface-subtle)] border border-[var(--border-color)] text-sm"
                  />
                  {siteData.socialLinks.instagram && (
                    <a
                      href={siteData.socialLinks.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl bg-[var(--bg-surface-subtle)] hover:bg-[var(--bg-surface-elevated)] border border-[var(--border-color)] text-[var(--text-secondary)]"
                      title="Test Link"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[var(--text-primary)] mb-1">
                  Twitter / X Profile URL
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="url"
                    value={siteData.socialLinks.twitter}
                    onChange={(e) => {
                      const val = e.target.value;
                      setSiteData((prev) => ({
                        ...prev,
                        socialLinks: { ...prev.socialLinks, twitter: val },
                      }));
                    }}
                    placeholder="https://twitter.com/profile"
                    className="flex-1 px-3.5 py-2.5 rounded-xl bg-[var(--bg-surface-subtle)] border border-[var(--border-color)] text-sm"
                  />
                  {siteData.socialLinks.twitter && (
                    <a
                      href={siteData.socialLinks.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl bg-[var(--bg-surface-subtle)] hover:bg-[var(--bg-surface-elevated)] border border-[var(--border-color)] text-[var(--text-secondary)]"
                      title="Test Link"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[var(--text-primary)] mb-1">
                  TikTok Channel URL
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="url"
                    value={siteData.socialLinks.tiktok}
                    onChange={(e) => {
                      const val = e.target.value;
                      setSiteData((prev) => ({
                        ...prev,
                        socialLinks: { ...prev.socialLinks, tiktok: val },
                      }));
                    }}
                    placeholder="https://tiktok.com/@channel"
                    className="flex-1 px-3.5 py-2.5 rounded-xl bg-[var(--bg-surface-subtle)] border border-[var(--border-color)] text-sm"
                  />
                  {siteData.socialLinks.tiktok && (
                    <a
                      href={siteData.socialLinks.tiktok}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl bg-[var(--bg-surface-subtle)] hover:bg-[var(--bg-surface-elevated)] border border-[var(--border-color)] text-[var(--text-secondary)]"
                      title="Test Link"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[var(--text-primary)] mb-1">
                  WhatsApp Admissions Deep Link
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="url"
                    value={siteData.socialLinks.whatsapp}
                    onChange={(e) => {
                      const val = e.target.value;
                      setSiteData((prev) => ({
                        ...prev,
                        socialLinks: { ...prev.socialLinks, whatsapp: val },
                      }));
                    }}
                    placeholder="https://wa.me/..."
                    className="flex-1 px-3.5 py-2.5 rounded-xl bg-[var(--bg-surface-subtle)] border border-[var(--border-color)] text-sm"
                  />
                  {siteData.socialLinks.whatsapp && (
                    <a
                      href={siteData.socialLinks.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl bg-[var(--bg-surface-subtle)] hover:bg-[var(--bg-surface-elevated)] border border-[var(--border-color)] text-[var(--text-secondary)]"
                      title="Test Link"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>

              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-[var(--accent-primary)] hover:opacity-95 text-white font-semibold text-xs transition-colors flex items-center gap-2 cursor-pointer shadow-md mt-6"
              >
                <Save className="w-4 h-4" />
                <span>Save Social Links</span>
              </button>
            </form>
          </div>
        )}

        {/* =========================================================
            TAB 5: CURRICULUM MODULES
        ========================================================= */}
        {activeTab === 'curriculum' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold tracking-tight">Curriculum Modules Manager</h2>
                <p className="text-xs text-[var(--text-secondary)]">
                  Edit module titles, deliverables, and topics rendered across the curriculum pages.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {siteData.curriculum.map((mod) => (
                <div
                  key={mod.id}
                  className="p-5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] space-y-3 flex flex-col justify-between shadow-xs hover:border-[var(--accent-primary)]/30 transition-all"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-[var(--accent-text)]">
                        Module {mod.number}
                      </span>
                      <span className="text-[10px] px-2.5 py-1 rounded-full bg-[var(--bg-surface-subtle)] text-[var(--text-secondary)] font-medium">
                        {mod.practicalDeliverable}
                      </span>
                    </div>
                    <h3 className="font-bold text-sm text-[var(--text-primary)]">{mod.title}</h3>
                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{mod.shortDesc}</p>
                    <div className="pt-2 border-t border-[var(--border-subtle)]">
                      <span className="text-[11px] font-semibold text-[var(--text-muted)] block mb-1">
                        Topics ({mod.topics.length}):
                      </span>
                      <ul className="text-xs text-[var(--text-secondary)] list-disc list-inside space-y-1">
                        {mod.topics.slice(0, 3).map((t, idx) => (
                          <li key={idx} className="truncate">
                            {t}
                          </li>
                        ))}
                        {mod.topics.length > 3 && (
                          <li className="text-[var(--accent-text)]">+{mod.topics.length - 3} more topics</li>
                        )}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[var(--border-subtle)] flex justify-end">
                    <button
                      type="button"
                      onClick={() => setEditingModule({ ...mod })}
                      className="px-3.5 py-1.5 rounded-lg bg-[var(--bg-surface-subtle)] hover:bg-[var(--accent-surface)] text-[var(--text-primary)] hover:text-[var(--accent-text)] text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit Module</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================
            TAB 6: SECURITY & DATA BACKUPS
        ========================================================= */}
        {activeTab === 'security' && (
          <div className="max-w-3xl space-y-8">
            {/* Admin Credentials Update */}
            <div className="bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl p-6 shadow-sm space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[var(--accent-surface)] text-[var(--accent-text)] flex items-center justify-center">
                  <KeyRound className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[var(--text-primary)]">Update Administrator Password</h3>
                  <p className="text-xs text-[var(--text-secondary)]">Change your secret access credentials for /admin7</p>
                </div>
              </div>

              <form onSubmit={handleUpdatePassword} className="space-y-4 pt-2">
                <div>
                  <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1">
                    New Username
                  </label>
                  <input
                    type="text"
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                    placeholder="Enter new admin username"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--bg-surface-subtle)] border border-[var(--border-color)] text-sm"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1">
                      New Password (Min 6 chars)
                    </label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--bg-surface-subtle)] border border-[var(--border-color)] text-sm"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--bg-surface-subtle)] border border-[var(--border-color)] text-sm"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[var(--accent-primary)] hover:opacity-95 text-white font-semibold text-xs shadow-md cursor-pointer flex items-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Update Credentials</span>
                </button>
              </form>
            </div>

            {/* Backup & Restore */}
            <div className="bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl p-6 shadow-sm space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                  <Download className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[var(--text-primary)]">Data Backup & Restore</h3>
                  <p className="text-xs text-[var(--text-secondary)]">
                    Export your full site database (articles, pricing, curriculum, faqs) or restore from an existing JSON file.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  type="button"
                  onClick={handleDownloadBackup}
                  className="px-4 py-2.5 rounded-xl bg-[var(--bg-surface-subtle)] hover:bg-[var(--bg-surface-elevated)] border border-[var(--border-color)] text-xs font-semibold cursor-pointer flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Backup JSON</span>
                </button>

                <label className="px-4 py-2.5 rounded-xl bg-[var(--bg-surface-subtle)] hover:bg-[var(--bg-surface-elevated)] border border-[var(--border-color)] text-xs font-semibold cursor-pointer flex items-center gap-2">
                  <Upload className="w-4 h-4" />
                  <span>Restore from JSON File</span>
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleUploadBackup}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* Factory Reset */}
            <div className="bg-red-500/5 border border-red-500/20 rounded-2xl p-6 shadow-sm space-y-3">
              <h3 className="text-base font-bold text-red-500 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                <span>Danger Zone: Factory Reset</span>
              </h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                If you ever want to revert everything back to the clean, original state shipped by Injazify Studios, you can trigger a factory reset.
              </p>
              <button
                type="button"
                onClick={handleFactoryResetPrompt}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-semibold shadow-md cursor-pointer flex items-center gap-2 mt-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Factory Reset All Data</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* =========================================================
          ARTICLE EDIT / CREATE MODAL
      ========================================================= */}
      {editingArticle && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="max-w-3xl w-full bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl p-6 shadow-2xl my-8">
            <div className="flex items-center justify-between mb-5 pb-4 border-b border-[var(--border-color)]">
              <div>
                <h3 className="text-base font-bold text-[var(--text-primary)]">
                  {isNewArticle ? 'Create New Storytelling Article' : `Edit Article: ${editingArticle.title}`}
                </h3>
                <p className="text-xs text-[var(--text-secondary)]">
                  Configure titles, storytelling paragraphs, multiple dedicated illustrations, and embed URLs.
                </p>
              </div>
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
                <label className="block text-xs font-semibold text-[var(--text-primary)] mb-1">
                  Article Title *
                </label>
                <input
                  type="text"
                  value={editingArticle.title}
                  onChange={(e) => setEditingArticle({ ...editingArticle, title: e.target.value })}
                  placeholder="e.g. Master the Art of High-Retention Faceless Storytelling"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--bg-surface-subtle)] border border-[var(--border-color)] text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-1">
                  <label className="block text-xs font-semibold text-[var(--text-primary)] mb-1">
                    URL Slug *
                  </label>
                  <input
                    type="text"
                    value={editingArticle.slug}
                    onChange={(e) => setEditingArticle({ ...editingArticle, slug: e.target.value })}
                    required
                    className="w-full px-3 py-2 rounded-lg bg-[var(--bg-surface-subtle)] border border-[var(--border-color)] text-xs font-mono"
                  />
                </div>

                <div className="sm:col-span-1">
                  <label className="block text-xs font-semibold text-[var(--text-primary)] mb-1">
                    Category *
                  </label>
                  <input
                    type="text"
                    value={editingArticle.category}
                    onChange={(e) => setEditingArticle({ ...editingArticle, category: e.target.value })}
                    placeholder="Fundamentals, Production, etc."
                    required
                    className="w-full px-3 py-2 rounded-lg bg-[var(--bg-surface-subtle)] border border-[var(--border-color)] text-xs"
                  />
                </div>

                <div className="sm:col-span-1">
                  <label className="block text-xs font-semibold text-[var(--text-primary)] mb-1">
                    Read Time
                  </label>
                  <input
                    type="text"
                    value={editingArticle.readTime}
                    onChange={(e) => setEditingArticle({ ...editingArticle, readTime: e.target.value })}
                    placeholder="e.g. 7 min read"
                    className="w-full px-3 py-2 rounded-lg bg-[var(--bg-surface-subtle)] border border-[var(--border-color)] text-xs"
                  />
                </div>
              </div>

              {/* 3 Dedicated Pictures */}
              <div className="p-4 rounded-xl bg-[var(--bg-surface-subtle)] border border-[var(--border-color)] space-y-3">
                <span className="text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider block flex items-center gap-1.5">
                  <ImageIcon className="w-4 h-4 text-[var(--accent-text)]" />
                  <span>3 Dedicated Storytelling Illustrations</span>
                </span>

                {[0, 1, 2].map((idx) => {
                  const currentImgs = editingArticle.images || ['', '', ''];
                  const imgUrl = currentImgs[idx] || '';
                  return (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="w-12 h-10 rounded-lg overflow-hidden bg-[var(--bg-canvas)] border border-[var(--border-color)] shrink-0">
                        {imgUrl ? (
                          <img
                            src={imgUrl}
                            alt={`Preview ${idx + 1}`}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src =
                                'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=300&auto=format&fit=crop';
                            }}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-[10px] text-[var(--text-muted)]">
                            #{idx + 1}
                          </div>
                        )}
                      </div>
                      <input
                        type="url"
                        value={imgUrl}
                        onChange={(e) => {
                          const updated = [...(editingArticle.images || ['', '', ''])];
                          updated[idx] = e.target.value;
                          setEditingArticle({ ...editingArticle, images: updated });
                        }}
                        placeholder={`Dedicated Picture ${idx + 1} URL (https://images.unsplash.com/...)`}
                        className="flex-1 px-3 py-2 rounded-lg bg-[var(--bg-canvas)] border border-[var(--border-color)] text-xs"
                      />
                    </div>
                  );
                })}
              </div>

              {/* Video URL */}
              <div>
                <label className="block text-xs font-semibold text-[var(--text-primary)] mb-1">
                  Embedded Video Masterclass URL (YouTube Video or Embed)
                </label>
                <input
                  type="url"
                  value={(editingArticle as any).videoUrl || ''}
                  onChange={(e) => {
                    const normalized = normalizeYoutubeEmbed(e.target.value);
                    setEditingArticle({ ...editingArticle, videoUrl: normalized } as any);
                  }}
                  placeholder="https://www.youtube.com/watch?v=... or https://www.youtube.com/embed/..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--bg-surface-subtle)] border border-[var(--border-color)] text-xs"
                />
              </div>

              {/* Excerpt */}
              <div>
                <label className="block text-xs font-semibold text-[var(--text-primary)] mb-1">
                  Excerpt / Motivational Summary *
                </label>
                <textarea
                  value={editingArticle.excerpt}
                  onChange={(e) => setEditingArticle({ ...editingArticle, excerpt: e.target.value })}
                  rows={2}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--bg-surface-subtle)] border border-[var(--border-color)] text-xs leading-relaxed"
                />
              </div>

              {/* Content Paragraphs */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-semibold text-[var(--text-primary)]">
                    Storytelling Content Paragraphs *
                  </label>
                  <span className="text-[10px] text-[var(--text-muted)]">
                    Separate paragraphs by a double line break (Enter twice)
                  </span>
                </div>
                <textarea
                  value={
                    Array.isArray(editingArticle.content)
                      ? editingArticle.content.join('\n\n')
                      : editingArticle.content
                  }
                  onChange={(e) =>
                    setEditingArticle({
                      ...editingArticle,
                      content: e.target.value.split('\n\n'),
                    })
                  }
                  rows={6}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--bg-surface-subtle)] border border-[var(--border-color)] text-xs leading-relaxed"
                />
              </div>

              {/* Key Takeaways */}
              <div className="p-4 rounded-xl bg-[var(--bg-surface-subtle)] border border-[var(--border-color)] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider block">
                    Key Actionable Takeaways
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      const updated = [...(editingArticle.keyTakeaways || []), ''];
                      setEditingArticle({ ...editingArticle, keyTakeaways: updated });
                    }}
                    className="px-2.5 py-1 rounded bg-[var(--accent-surface)] text-[var(--accent-text)] text-[11px] font-semibold cursor-pointer"
                  >
                    + Add Takeaway
                  </button>
                </div>

                {(editingArticle.keyTakeaways || []).map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="text-xs text-[var(--text-muted)] w-4">{idx + 1}.</span>
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => {
                        const updated = [...(editingArticle.keyTakeaways || [])];
                        updated[idx] = e.target.value;
                        setEditingArticle({ ...editingArticle, keyTakeaways: updated });
                      }}
                      placeholder="Takeaway insight..."
                      className="flex-1 px-3 py-1.5 rounded-lg bg-[var(--bg-canvas)] border border-[var(--border-color)] text-xs"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const updated = (editingArticle.keyTakeaways || []).filter((_, i) => i !== idx);
                        setEditingArticle({ ...editingArticle, keyTakeaways: updated });
                      }}
                      className="p-1.5 text-red-500 hover:bg-red-500/10 rounded cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Modal Action Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t border-[var(--border-color)] sticky bottom-0 bg-[var(--bg-surface)]">
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

      {/* =========================================================
          FAQ EDIT / CREATE MODAL
      ========================================================= */}
      {editingFaq && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="max-w-lg w-full bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl p-6 shadow-2xl">
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
                <label className="block text-xs font-semibold text-[var(--text-primary)] mb-1">
                  Category
                </label>
                <select
                  value={editingFaq.category}
                  onChange={(e) => setEditingFaq({ ...editingFaq, category: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-xl bg-[var(--bg-surface-subtle)] border border-[var(--border-color)] text-xs font-medium"
                >
                  <option value="Mentorship">Mentorship</option>
                  <option value="Pricing & Enrollment">Pricing & Enrollment</option>
                  <option value="Curriculum & Support">Curriculum & Support</option>
                  <option value="Expectations">Expectations</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[var(--text-primary)] mb-1">
                  Question *
                </label>
                <input
                  type="text"
                  value={editingFaq.question}
                  onChange={(e) => setEditingFaq({ ...editingFaq, question: e.target.value })}
                  placeholder="e.g. How does the WhatsApp inquiry work?"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--bg-surface-subtle)] border border-[var(--border-color)] text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[var(--text-primary)] mb-1">
                  Answer *
                </label>
                <textarea
                  value={editingFaq.answer}
                  onChange={(e) => setEditingFaq({ ...editingFaq, answer: e.target.value })}
                  rows={4}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--bg-surface-subtle)] border border-[var(--border-color)] text-xs leading-relaxed"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-[var(--border-color)]">
                <button
                  type="button"
                  onClick={() => setEditingFaq(null)}
                  className="px-4 py-2 rounded-xl bg-[var(--bg-surface-subtle)] text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-[var(--accent-primary)] text-white text-xs font-semibold shadow-md cursor-pointer flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>Save FAQ</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================
          CURRICULUM EDIT MODAL
      ========================================================= */}
      {editingModule && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="max-w-xl w-full bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-[var(--border-color)]">
              <div>
                <h3 className="text-base font-bold text-[var(--text-primary)]">
                  Edit Curriculum Module {editingModule.number}
                </h3>
                <p className="text-xs text-[var(--text-secondary)]">Modify titles, deliverables and core syllabus topics</p>
              </div>
              <button
                type="button"
                onClick={() => setEditingModule(null)}
                className="p-2 rounded-lg bg-[var(--bg-surface-subtle)] hover:bg-[var(--bg-surface-elevated)] cursor-pointer"
              >
                <X className="w-5 h-5 text-[var(--text-secondary)]" />
              </button>
            </div>

            <form onSubmit={handleSaveModule} className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[var(--text-primary)] mb-1">
                    Number
                  </label>
                  <input
                    type="text"
                    value={editingModule.number}
                    onChange={(e) => setEditingModule({ ...editingModule, number: e.target.value })}
                    required
                    className="w-full px-3 py-2 rounded-lg bg-[var(--bg-surface-subtle)] border border-[var(--border-color)] text-xs font-mono"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-semibold text-[var(--text-primary)] mb-1">
                    Deliverable
                  </label>
                  <input
                    type="text"
                    value={editingModule.practicalDeliverable}
                    onChange={(e) => setEditingModule({ ...editingModule, practicalDeliverable: e.target.value })}
                    required
                    className="w-full px-3 py-2 rounded-lg bg-[var(--bg-surface-subtle)] border border-[var(--border-color)] text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[var(--text-primary)] mb-1">
                  Module Title
                </label>
                <input
                  type="text"
                  value={editingModule.title}
                  onChange={(e) => setEditingModule({ ...editingModule, title: e.target.value })}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--bg-surface-subtle)] border border-[var(--border-color)] text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[var(--text-primary)] mb-1">
                  Short Description
                </label>
                <textarea
                  value={editingModule.shortDesc}
                  onChange={(e) => setEditingModule({ ...editingModule, shortDesc: e.target.value })}
                  rows={2}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--bg-surface-subtle)] border border-[var(--border-color)] text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[var(--text-primary)] mb-1">
                  Core Topics (one per line)
                </label>
                <textarea
                  value={editingModule.topics.join('\n')}
                  onChange={(e) => setEditingModule({ ...editingModule, topics: e.target.value.split('\n').filter(Boolean) })}
                  rows={4}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--bg-surface-subtle)] border border-[var(--border-color)] text-xs leading-relaxed font-mono"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-[var(--border-color)]">
                <button
                  type="button"
                  onClick={() => setEditingModule(null)}
                  className="px-4 py-2 rounded-xl bg-[var(--bg-surface-subtle)] text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-[var(--accent-primary)] text-white text-xs font-semibold shadow-md cursor-pointer flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Module</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================
          CUSTOM IN-APP CONFIRMATION MODAL (No window.confirm!)
      ========================================================= */}
      {confirmModal.isOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl p-6 shadow-2xl">
            <div className="flex items-start gap-3 mb-4">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                  confirmModal.isDestructive
                    ? 'bg-red-500/10 text-red-500 border border-red-500/30'
                    : 'bg-indigo-500/10 text-indigo-500 border border-indigo-500/30'
                }`}
              >
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[var(--text-primary)]">{confirmModal.title}</h3>
                <p className="text-xs text-[var(--text-secondary)] mt-1 leading-relaxed">
                  {confirmModal.description}
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-[var(--border-color)]">
              <button
                type="button"
                onClick={() => setConfirmModal((prev) => ({ ...prev, isOpen: false }))}
                className="px-4 py-2 rounded-xl bg-[var(--bg-surface-subtle)] hover:bg-[var(--bg-surface-elevated)] text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmModal.onConfirm}
                className={`px-5 py-2 rounded-xl text-white text-xs font-semibold shadow-md cursor-pointer ${
                  confirmModal.isDestructive
                    ? 'bg-red-600 hover:bg-red-500'
                    : 'bg-[var(--accent-primary)] hover:opacity-90'
                }`}
              >
                {confirmModal.actionLabel}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
