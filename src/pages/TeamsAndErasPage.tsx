import React, { useEffect } from 'react';
import { History, ArrowRight, Clock, Users, Shield } from 'lucide-react';
import { ARTICLES, FUTURE_BACKLOG } from '../data/articles';
import { ArticleCard } from '../components/ArticleCard';
import { updatePageSeo, buildCanonicalUrl, generateBreadcrumbJsonLd } from '../utils/seo';
import { trackEvent } from '../utils/analytics';

interface TeamsAndErasPageProps {
  onNavigate: (path: string) => void;
}

export const TeamsAndErasPage: React.FC<TeamsAndErasPageProps> = ({ onNavigate }) => {
  useEffect(() => {
    updatePageSeo({
      title: "Cricket Teams, Eras and Forgotten Franchises | Tales from the Game",
      description: "Explore cricket teams, defining eras and forgotten franchises through the players, decisions and turning points that shaped their stories.",
      canonicalUrl: buildCanonicalUrl('/teams-and-eras/'),
      ogType: 'website',
      jsonLd: generateBreadcrumbJsonLd([
        { name: 'Home', url: '/' },
        { name: 'Teams & Eras', url: '/teams-and-eras/' },
      ]),
    });

    trackEvent({
      name: 'page_view',
      params: { path: '/teams-and-eras/' },
    });
  }, []);

  const teamArticles = ARTICLES.filter((a) => a.category === 'Teams & Eras');
  const futureTeams = FUTURE_BACKLOG.filter((b) => b.category === 'Teams & Eras');

  return (
    <div className="min-h-screen py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#244936]/10 border border-[#244936]/20 text-xs font-semibold uppercase tracking-widest text-[#244936] mb-3">
            <History className="w-3.5 h-3.5 text-[#244936]" />
            <span>Franchises &amp; Dynasties</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#191B19] tracking-tight mb-4">
            Teams, Eras and the Stories Between Them
          </h1>
          <p className="text-base sm:text-lg text-[#686B66] font-sans leading-relaxed">
            Exploring cricket teams, franchises, and dominant eras through team culture, leadership alchemy, and the turning points that shaped their rise and fall.
          </p>
        </header>

        {/* Featured Franchise Story: Deccan Chargers */}
        <section className="mb-20">
          <div className="border-b border-[#DCD7CC] pb-4 mb-8">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#191B19]">
              Published Franchise Feature
            </h2>
          </div>

          <div className="space-y-8">
            {teamArticles.map((article) => (
              <ArticleCard key={article.slug} article={article} onNavigate={onNavigate} featured={true} />
            ))}
          </div>
        </section>

        {/* Planned Team Dynasties Docket */}
        <section className="bg-white border border-[#DCD7CC] p-8 sm:p-12">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#B89558] mb-2">
            <Users className="w-4 h-4 text-[#B89558]" />
            <span>Planned Franchise &amp; Era Retrospectives</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#191B19] mb-4">
            Under Investigation in the Archives
          </h2>
          <p className="text-xs sm:text-sm text-[#686B66] max-w-2xl mb-8">
            These multi-part franchise examinations and dynasty breakdowns are currently being assembled from historical tour diaries and board minutes.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 border border-[#DCD7CC] bg-[#F5F1E8]/30 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#244936] bg-[#244936]/10 px-2 py-0.5 inline-block">
                Editorial Research
              </span>
              <h3 className="font-serif text-xl font-bold text-[#191B19]">
                The Invincible Era: Australia&apos;s 1999–2007 Test &amp; ODI Hegemony
              </h3>
              <p className="text-xs text-[#686B66] leading-relaxed">
                Analyzing the cultural ruthlessness, psychological warfare, and squad depth that enabled Australia to play 34 consecutive World Cup matches without defeat.
              </p>
            </div>

            <div className="p-6 border border-[#DCD7CC] bg-[#F5F1E8]/30 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#B89558] bg-[#080B12] text-[#F5F1E8] px-2 py-0.5 inline-block">
                Archival Sourcing
              </span>
              <h3 className="font-serif text-xl font-bold text-[#191B19]">
                Clive Lloyd&apos;s Four-Pronged Pace Battery (1976–1984)
              </h3>
              <p className="text-xs text-[#686B66] leading-relaxed">
                How an unforgettable defeat at Headingley prompted Clive Lloyd to abandon spin and assemble the most intimidating fast-bowling rotation in the history of the sport.
              </p>
            </div>

            <div className="p-6 border border-[#DCD7CC] bg-[#F5F1E8]/30 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#686B66] bg-[#DCD7CC] px-2 py-0.5 inline-block">
                Fact-Checking
              </span>
              <h3 className="font-serif text-xl font-bold text-[#191B19]">
                Kochi Tuskers Kerala &amp; Pune Warriors India: The Short-Lived Expansions
              </h3>
              <p className="text-xs text-[#686B66] leading-relaxed">
                Examining the rapid rise, contractual disputes, and abrupt dissolution of the two 2011 IPL expansion franchises that altered league governance forever.
              </p>
            </div>

            <div className="p-6 border border-[#DCD7CC] bg-[#F5F1E8]/30 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#244936] bg-[#244936]/10 px-2 py-0.5 inline-block">
                Editorial Research
              </span>
              <h3 className="font-serif text-xl font-bold text-[#191B19]">
                The Sharjah Rivalries (1984–1999): Drama in the Desert
              </h3>
              <p className="text-xs text-[#686B66] leading-relaxed">
                How a desert oasis in the United Arab Emirates became the crucible of India-Pakistan cricket, culminating in Javed Miandad&apos;s famous last-ball six in 1986.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
