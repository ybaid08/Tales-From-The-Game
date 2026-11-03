import React, { useState } from 'react';
import { Menu, X, BookOpen, Compass, Search } from 'lucide-react';

interface HeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPath, onNavigate }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Stories', path: '/stories/' },
    { label: 'Forgotten Legends', path: '/forgotten-legends/' },
    { label: 'Iconic Moments', path: '/iconic-moments/' },
    { label: 'Teams & Eras', path: '/teams-and-eras/' },
    { label: 'About', path: '/about/' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    onNavigate(path);
  };

  const isActive = (path: string) => {
    if (path === '/') return currentPath === '/' || currentPath === '';
    return currentPath.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#F5F1E8]/95 backdrop-blur-md border-b border-[#DCD7CC] transition-colors shadow-xs">
      {/* Top Heritage Notice Bar */}
      <div className="bg-[#080B12] text-[#F5F1E8] text-[11px] sm:text-xs py-2 px-4 text-center tracking-wider uppercase font-medium flex items-center justify-center gap-2 border-b border-[#B89558]/30">
        <span className="w-1.5 h-1.5 rounded-full bg-[#B89558] animate-pulse"></span>
        <span className="font-serif tracking-widest text-[#F5F1E8]">
          Some Legends Are Never Forgotten. Others Never Got Their Due.
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Wordmark */}
          <div className="flex items-center">
            <a
              href="/"
              onClick={(e) => handleLinkClick(e, '/')}
              className="group flex flex-col focus:outline-none"
              aria-label="Tales from the Game Home"
            >
              <span className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#191B19] group-hover:text-[#244936] transition-colors">
                Tales from the Game
              </span>
              <span className="text-[10px] sm:text-[11px] text-[#686B66] tracking-[0.2em] uppercase font-sans -mt-0.5 group-hover:text-[#B89558] transition-colors">
                Cricket Beyond The Scorecard
              </span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <a
                  key={link.path}
                  href={link.path}
                  onClick={(e) => handleLinkClick(e, link.path)}
                  className={`px-3 py-1.5 text-xs lg:text-sm font-medium tracking-wide transition-all relative ${
                    active
                      ? 'text-[#244936] font-bold border-b-2 border-[#244936] bg-[#244936]/5'
                      : 'text-[#191B19] hover:text-[#244936] hover:bg-[#DCD7CC]/40 rounded-sm'
                  }`}
                  aria-current={active ? 'page' : undefined}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Right Action: Explore Stories */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="/stories/"
              onClick={(e) => handleLinkClick(e, '/stories/')}
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#F5F1E8] bg-[#244936] hover:bg-[#1a3829] px-4 py-2.5 rounded-none transition-all shadow-sm border border-[#244936]"
              aria-label="Explore Story Archive"
            >
              <Compass className="w-3.5 h-3.5 text-[#B89558]" />
              <span>Explore Archive</span>
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex md:hidden items-center">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-sm text-[#191B19] hover:text-[#244936] hover:bg-[#DCD7CC]/40 focus:outline-none focus:ring-2 focus:ring-[#244936]"
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#F5F1E8] border-b border-[#DCD7CC] px-4 pt-3 pb-6 space-y-2 shadow-lg animate-in fade-in slide-in-from-top-2 duration-150">
          <nav className="flex flex-col space-y-1.5" aria-label="Mobile Navigation">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <a
                  key={link.path}
                  href={link.path}
                  onClick={(e) => handleLinkClick(e, link.path)}
                  className={`px-3 py-2.5 rounded text-base font-medium transition-colors ${
                    active
                      ? 'text-[#244936] font-bold bg-[#244936]/10 border-l-4 border-[#244936]'
                      : 'text-[#191B19] hover:bg-[#DCD7CC]/40 hover:text-[#244936]'
                  }`}
                  aria-current={active ? 'page' : undefined}
                >
                  {link.label}
                </a>
              );
            })}
            <div className="pt-2 border-t border-[#DCD7CC]">
              <a
                href="/stories/"
                onClick={(e) => handleLinkClick(e, '/stories/')}
                className="w-full flex items-center justify-center gap-2 bg-[#244936] text-[#F5F1E8] py-2.5 px-4 rounded text-sm font-semibold tracking-wider uppercase hover:bg-[#1b3729]"
              >
                <BookOpen className="w-4 h-4" />
                Read Launch Stories
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
