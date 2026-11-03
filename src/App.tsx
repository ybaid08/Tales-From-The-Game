import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { StoriesPage } from './pages/StoriesPage';
import { ForgottenLegendsPage } from './pages/ForgottenLegendsPage';
import { IconicMomentsPage } from './pages/IconicMomentsPage';
import { TeamsAndErasPage } from './pages/TeamsAndErasPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { EditorialStandardsPage } from './pages/EditorialStandardsPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { ArticlePage } from './pages/ArticlePage';
import { ARTICLES } from './data/articles';
import { ArrowLeft, BookOpen } from 'lucide-react';

export function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname || '/';
    }
    return '/';
  });

  const [readingProgress, setReadingProgress] = useState(0);

  // Sync with browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Track reading scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = Math.min(100, Math.max(0, (window.scrollY / totalHeight) * 100));
        setReadingProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigate = (path: string) => {
    if (path === currentPath) return;

    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', path);
      setCurrentPath(path);
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  };

  // Helper to normalize path (trim trailing slash for comparison, except root)
  const normalizePath = (p: string) => {
    const clean = p.split('?')[0].split('#')[0];
    if (clean === '/' || !clean) return '/';
    return clean.endsWith('/') ? clean.slice(0, -1) : clean;
  };

  const pathNorm = normalizePath(currentPath);

  // Route resolver
  const renderCurrentView = () => {
    // 1. Root / Homepage
    if (pathNorm === '/') {
      return <HomePage onNavigate={navigate} />;
    }

    // 2. Stories Index
    if (pathNorm === '/stories') {
      return <StoriesPage onNavigate={navigate} />;
    }

    // 3. Category Landing Pages
    if (pathNorm === '/forgotten-legends') {
      return <ForgottenLegendsPage onNavigate={navigate} />;
    }
    if (pathNorm === '/iconic-moments') {
      return <IconicMomentsPage onNavigate={navigate} />;
    }
    if (pathNorm === '/teams-and-eras') {
      return <TeamsAndErasPage onNavigate={navigate} />;
    }

    // 4. Institutional & Legal Pages
    if (pathNorm === '/about') {
      return <AboutPage onNavigate={navigate} />;
    }
    if (pathNorm === '/contact') {
      return <ContactPage onNavigate={navigate} />;
    }
    if (pathNorm === '/editorial-standards') {
      return <EditorialStandardsPage onNavigate={navigate} />;
    }
    if (pathNorm === '/privacy-policy') {
      return <PrivacyPolicyPage onNavigate={navigate} />;
    }

    // 5. Individual Article Pages (/stories/:slug)
    if (pathNorm.startsWith('/stories/')) {
      const slug = pathNorm.replace('/stories/', '');
      const article = ARTICLES.find((a) => a.slug === slug);
      if (article) {
        return <ArticlePage article={article} onNavigate={navigate} />;
      }
    }

    // 404 Not Found Page
    return (
      <div className="min-h-[60vh] flex items-center justify-center py-20 px-4">
        <div className="bg-white border border-[#DCD7CC] p-8 sm:p-12 max-w-lg text-center space-y-4 shadow-sm">
          <span className="text-xs font-bold uppercase tracking-widest text-[#B89558]">
            404 &bull; Lost in the Pavilion
          </span>
          <h1 className="font-serif text-3xl font-bold text-[#191B19]">
            Story Not Found
          </h1>
          <p className="text-sm text-[#686B66] leading-relaxed">
            The archive entry you requested at <code>{currentPath}</code> does not exist or has been relocated to another section of the library.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="w-full sm:w-auto bg-[#244936] text-[#F5F1E8] px-5 py-2.5 text-xs font-semibold uppercase tracking-wider hover:bg-[#1a3728] transition-colors"
            >
              Return Home
            </button>
            <button
              type="button"
              onClick={() => navigate('/stories/')}
              className="w-full sm:w-auto bg-[#F5F1E8] text-[#191B19] border border-[#DCD7CC] px-5 py-2.5 text-xs font-semibold uppercase tracking-wider hover:bg-[#DCD7CC] transition-colors"
            >
              Explore All Stories
            </button>
          </div>
        </div>
      </div>
    );
  };

  const isArticleView = pathNorm.startsWith('/stories/') && pathNorm !== '/stories';

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F1E8] text-[#191B19]">
      {/* Article Reading Progress Indicator */}
      {isArticleView && (
        <div
          className="fixed top-0 left-0 h-1 bg-[#B89558] z-50 transition-all duration-150"
          style={{ width: `${readingProgress}%` }}
          aria-hidden="true"
        />
      )}

      {/* Global Header */}
      <Header currentPath={currentPath} onNavigate={navigate} />

      {/* Main Content View */}
      <main className="grow focus:outline-none" tabIndex={-1}>
        {renderCurrentView()}
      </main>

      {/* Global Footer */}
      <Footer onNavigate={navigate} />
    </div>
  );
}

export default App;
