import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { CountryProvider } from './context/CountryContext';
import { Header, NavPage } from './components/Header';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { MentorshipPage } from './pages/MentorshipPage';
import { CurriculumPage } from './pages/CurriculumPage';
import { PricingPage } from './pages/PricingPage';
import { ResourcesPage } from './pages/ResourcesPage';
import { FaqPage } from './pages/FaqPage';
import { ContactPage } from './pages/ContactPage';
import { EnrollmentPage } from './pages/EnrollmentPage';
import { LegalPage } from './pages/LegalPage';
import { AdminPortal } from './pages/AdminPortal';
import { ShieldAlert } from 'lucide-react';

export default function App() {
  const pathname = window.location.pathname;

  // Secret Admin Portal route at /admin7
  if (pathname === '/admin7') {
    return (
      <ThemeProvider>
        <AdminPortal onExit={() => { window.location.pathname = '/'; }} />
      </ThemeProvider>
    );
  }

  // Firewall restriction on /admin (shows 404 / Access Denied)
  if (pathname === '/admin' || pathname.startsWith('/admin/')) {
    return (
      <ThemeProvider>
        <div className="min-h-screen bg-[var(--bg-canvas)] flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl p-8 text-center shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-red-600" />
            <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/35 flex items-center justify-center mx-auto mb-4 text-red-500">
              <ShieldAlert className="w-8 h-8" />
            </div>
            <h1 className="text-xl font-black text-[var(--text-primary)]">404 · Access Denied</h1>
            <p className="text-xs text-[var(--text-secondary)] mt-2 leading-relaxed">
              Firewall restriction active. The /admin pathway is hidden and restricted. Authorized administration requires the /admin7 command path.
            </p>
            <a
              href="/"
              className="mt-6 inline-block px-5 py-2.5 rounded-xl bg-[var(--accent-primary)] text-white text-xs font-semibold shadow-md cursor-pointer hover:opacity-90"
            >
              Return to Homepage
            </a>
          </div>
        </div>
      </ThemeProvider>
    );
  }

  const [currentPage, setCurrentPage] = useState<NavPage>(() => {
    try {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      const validPages: NavPage[] = [
        'home',
        'about',
        'mentorship',
        'curriculum',
        'pricing',
        'resources',
        'faq',
        'contact',
        'enrollment',
        'privacy',
        'terms',
        'disclaimer',
      ];
      if (validPages.includes(hash as NavPage)) {
        return hash as NavPage;
      }
    } catch {
      // ignore
    }
    return 'home';
  });

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      const validPages: NavPage[] = [
        'home',
        'about',
        'mentorship',
        'curriculum',
        'pricing',
        'resources',
        'faq',
        'contact',
        'enrollment',
        'privacy',
        'terms',
        'disclaimer',
      ];
      if (validPages.includes(hash as NavPage)) {
        setCurrentPage(hash as NavPage);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (page: NavPage) => {
    setCurrentPage(page);
    window.location.hash = page === 'home' ? '' : page;
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} />;
      case 'about':
        return <AboutPage onNavigate={handleNavigate} />;
      case 'mentorship':
        return <MentorshipPage onNavigate={handleNavigate} />;
      case 'curriculum':
        return <CurriculumPage onNavigate={handleNavigate} />;
      case 'pricing':
        return <PricingPage onNavigate={handleNavigate} />;
      case 'resources':
        return <ResourcesPage onNavigate={handleNavigate} />;
      case 'faq':
        return <FaqPage onNavigate={handleNavigate} />;
      case 'contact':
        return <ContactPage onNavigate={handleNavigate} />;
      case 'enrollment':
        return <EnrollmentPage onNavigate={handleNavigate} />;
      case 'disclaimer':
        return <LegalPage initialTab="disclaimer" onNavigate={handleNavigate} />;
      case 'terms':
        return <LegalPage initialTab="terms" onNavigate={handleNavigate} />;
      case 'privacy':
        return <LegalPage initialTab="privacy" onNavigate={handleNavigate} />;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <ThemeProvider>
      <CountryProvider>
        <div className="min-h-screen bg-[var(--bg-canvas)] text-[var(--text-primary)] flex flex-col font-sans transition-colors duration-200">
          {/* Navigation Bar with Theme & Country Switchers */}
          <Header currentPage={currentPage} onNavigate={handleNavigate} />

          {/* Dynamic Page View */}
          <main className="flex-1">
            {renderCurrentPage()}
          </main>

          {/* Global Footer (Zero phone number displayed) */}
          <Footer onNavigate={handleNavigate} />

          {/* Accessible Floating WhatsApp Button */}
          <WhatsAppButton variant="floating" />
        </div>
      </CountryProvider>
    </ThemeProvider>
  );
}
