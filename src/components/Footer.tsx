import React from 'react';
import { ShieldCheck, BookOpen, Sparkles, Feather } from 'lucide-react';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const currentYear = new Date().getFullYear();

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    onNavigate(path);
  };

  return (
    <footer className="bg-[#080B12] text-[#F5F1E8] border-t border-[#244936]/40 mt-20">
      {/* Decorative Brand Accent Band */}
      <div className="h-1.5 bg-gradient-to-r from-[#244936] via-[#B89558] to-[#244936]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <a
              href="/"
              onClick={(e) => handleLinkClick(e, '/')}
              className="inline-block group focus:outline-none"
            >
              <span className="font-serif text-2xl lg:text-3xl font-bold tracking-tight text-[#F5F1E8] group-hover:text-[#B89558] transition-colors">
                Tales from the Game
              </span>
            </a>
            <p className="text-sm font-serif italic text-[#B89558] max-w-sm leading-relaxed">
              &ldquo;Some Legends Are Never Forgotten. Others Never Got Their Due.&rdquo;
            </p>
            <p className="text-xs text-[#686B66] leading-relaxed max-w-sm">
              Tales from the Game is an independent cricket storytelling publication exploring the human drama, tactical decisions, overlooked careers, and historical context beyond the scorecard.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-[#B89558]">
              <Feather className="w-4 h-4 text-[#B89558]" />
              <span className="tracking-wider uppercase text-[11px] font-medium">The Heritage Archive Series</span>
            </div>
          </div>

          {/* Editorial Desks */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#B89558]">
              Story Desks
            </h4>
            <ul className="space-y-2 text-sm text-[#F5F1E8]/80 font-sans">
              <li>
                <a
                  href="/stories/"
                  onClick={(e) => handleLinkClick(e, '/stories/')}
                  className="hover:text-[#B89558] transition-colors"
                >
                  All Stories
                </a>
              </li>
              <li>
                <a
                  href="/forgotten-legends/"
                  onClick={(e) => handleLinkClick(e, '/forgotten-legends/')}
                  className="hover:text-[#B89558] transition-colors"
                >
                  Forgotten Legends
                </a>
              </li>
              <li>
                <a
                  href="/iconic-moments/"
                  onClick={(e) => handleLinkClick(e, '/iconic-moments/')}
                  className="hover:text-[#B89558] transition-colors"
                >
                  Iconic Moments
                </a>
              </li>
              <li>
                <a
                  href="/teams-and-eras/"
                  onClick={(e) => handleLinkClick(e, '/teams-and-eras/')}
                  className="hover:text-[#B89558] transition-colors"
                >
                  Teams &amp; Eras
                </a>
              </li>
            </ul>
          </div>

          {/* Launch Stories */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#B89558]">
              Launch Articles
            </h4>
            <ul className="space-y-2 text-xs text-[#F5F1E8]/70 font-sans">
              <li>
                <a
                  href="/stories/mohammad-amir-career/"
                  onClick={(e) => handleLinkClick(e, '/stories/mohammad-amir-career/')}
                  className="hover:text-[#F5F1E8] transition-colors line-clamp-1"
                >
                  Mohammad Amir: The Talent &amp; What-If
                </a>
              </li>
              <li>
                <a
                  href="/stories/ms-dhoni-2011-world-cup-final/"
                  onClick={(e) => handleLinkClick(e, '/stories/ms-dhoni-2011-world-cup-final/')}
                  className="hover:text-[#F5F1E8] transition-colors line-clamp-1"
                >
                  MS Dhoni: 2011 World Cup Finish
                </a>
              </li>
              <li>
                <a
                  href="/stories/deccan-chargers-ipl-history/"
                  onClick={(e) => handleLinkClick(e, '/stories/deccan-chargers-ipl-history/')}
                  className="hover:text-[#F5F1E8] transition-colors line-clamp-1"
                >
                  Deccan Chargers: 2009 Champions
                </a>
              </li>
              <li>
                <a
                  href="/stories/rp-singh-bowling-style/"
                  onClick={(e) => handleLinkClick(e, '/stories/rp-singh-bowling-style/')}
                  className="hover:text-[#F5F1E8] transition-colors line-clamp-1"
                >
                  RP Singh: Left-Arm Swing Rhythm
                </a>
              </li>
              <li>
                <a
                  href="/stories/matthew-hayden-batting-style/"
                  onClick={(e) => handleLinkClick(e, '/stories/matthew-hayden-batting-style/')}
                  className="hover:text-[#F5F1E8] transition-colors line-clamp-1"
                >
                  Matthew Hayden: Test Batting Tempo
                </a>
              </li>
            </ul>
          </div>

          {/* Publication & Governance */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#B89558]">
              Publication
            </h4>
            <ul className="space-y-2 text-sm text-[#F5F1E8]/80 font-sans">
              <li>
                <a
                  href="/about/"
                  onClick={(e) => handleLinkClick(e, '/about/')}
                  className="hover:text-[#B89558] transition-colors"
                >
                  About Publication
                </a>
              </li>
              <li>
                <a
                  href="/editorial-standards/"
                  onClick={(e) => handleLinkClick(e, '/editorial-standards/')}
                  className="hover:text-[#B89558] transition-colors"
                >
                  Editorial Standards
                </a>
              </li>
              <li>
                <a
                  href="/contact/"
                  onClick={(e) => handleLinkClick(e, '/contact/')}
                  className="hover:text-[#B89558] transition-colors"
                >
                  Get in Touch
                </a>
              </li>
              <li>
                <a
                  href="/privacy-policy/"
                  onClick={(e) => handleLinkClick(e, '/privacy-policy/')}
                  className="hover:text-[#B89558] transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#DCD7CC]/10 flex flex-col sm:flex-row items-center justify-between text-xs text-[#686B66] gap-4">
          <p>
            &copy; {currentYear} Tales from the Game. All rights reserved. Sourced from verified cricket archives, official scorecards, and historical records.
          </p>
          <div className="flex items-center space-x-6">
            <a
              href="/editorial-standards/"
              onClick={(e) => handleLinkClick(e, '/editorial-standards/')}
              className="hover:text-[#F5F1E8] transition-colors"
            >
              Ethics &amp; Fact-Checking
            </a>
            <a
              href="/privacy-policy/"
              onClick={(e) => handleLinkClick(e, '/privacy-policy/')}
              className="hover:text-[#F5F1E8] transition-colors"
            >
              Privacy &amp; Data
            </a>
            <a
              href="/sitemap.xml"
              className="hover:text-[#F5F1E8] transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              XML Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
