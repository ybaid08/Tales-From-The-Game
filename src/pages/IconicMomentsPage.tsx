import React, { useEffect } from 'react';
import { Award, ArrowRight, Clock, Trophy, Flame } from 'lucide-react';
import { ARTICLES, FUTURE_BACKLOG } from '../data/articles';
import { ArticleCard } from '../components/ArticleCard';
import { updatePageSeo, buildCanonicalUrl, generateBreadcrumbJsonLd } from '../utils/seo';
import { trackEvent } from '../utils/analytics';

interface IconicMomentsPageProps {
  onNavigate: (path: string) => void;
}

export const IconicMomentsPage: React.FC<IconicMomentsPageProps> = ({ onNavigate }) => {
  useEffect(() => {
    updatePageSeo({
      title: "Iconic Cricket Moments and Historic Matches | Tales from the Game",
      description: "Revisit iconic cricket moments, historic matches and unforgettable finishes through the decisions, performances and stories behind them.",
      canonicalUrl: buildCanonicalUrl('/iconic-moments/'),
      ogType: 'website',
      jsonLd: generateBreadcrumbJsonLd([
        { name: 'Home', url: '/' },
        { name: 'Iconic Moments', url: '/iconic-moments/' },
      ]),
    });

    trackEvent({
      name: 'page_view',
      params: { path: '/iconic-moments/' },
    });
  }, []);

  const publishedIconic = ARTICLES.filter(
    (a) => a.category === 'Iconic Stories'
  );
  const futureIconic = FUTURE_BACKLOG.filter(
    (b) => b.category === 'Iconic Moments'
  );

  return (
    <div className="min-h-screen py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#B89558]/20 border border-[#B89558]/40 text-xs font-semibold uppercase tracking-widest text-[#191B19] mb-3">
            <Trophy className="w-3.5 h-3.5 text-[#B89558]" />
            <span>Historic Turning Points</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#191B19] tracking-tight mb-4">
            Moments That Changed the Game
          </h1>
          <p className="text-base sm:text-lg text-[#686B66] font-sans leading-relaxed">
            Revisiting cricket&apos;s most memorable finishes and transformative performances through the tactical choices, acute pressures, and psychological execution behind them.
          </p>
        </header>

        {/* Published Featured Story Spotlight */}
        <section className="mb-20">
          <div className="border-b border-[#DCD7CC] pb-4 mb-8">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#191B19]">
              Published Match Analyses
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {publishedIconic.map((article) => (
              <ArticleCard key={article.slug} article={article} onNavigate={onNavigate} />
            ))}
          </div>
        </section>

        {/* Future Iconic Moments Archives (Clearly marked as planned topics) */}
        <section className="bg-white border border-[#DCD7CC] p-8 sm:p-12">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#B89558] mb-2">
            <Flame className="w-4 h-4 text-[#B89558]" />
            <span>Planned Retrospectives</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#191B19] mb-4">
            Forthcoming Turning Points in the Archives
          </h2>
          <p className="text-xs sm:text-sm text-[#686B66] max-w-2xl mb-8">
            The following masterclasses and historic finishes are currently in deep research and will be added as full articles following complete fact verification.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {futureIconic.map((topic) => (
              <div key={topic.title} className="p-5 border border-[#DCD7CC] bg-[#F5F1E8]/30 space-y-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#B89558] bg-[#080B12] text-[#F5F1E8] px-2 py-0.5 inline-block">
                  {topic.status}
                </span>
                <h3 className="font-serif text-lg font-bold text-[#191B19] leading-snug">
                  {topic.title}
                </h3>
                <p className="text-xs text-[#686B66] italic leading-relaxed">
                  Focus: {topic.centralQuestion}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
