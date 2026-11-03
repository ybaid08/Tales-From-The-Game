import React, { useEffect } from 'react';
import { ArrowRight, Clock, ShieldCheck, Feather, Sparkles } from 'lucide-react';
import { ARTICLES, FUTURE_BACKLOG } from '../data/articles';
import { ArticleCard } from '../components/ArticleCard';
import { updatePageSeo, buildCanonicalUrl, generateBreadcrumbJsonLd } from '../utils/seo';
import { trackEvent } from '../utils/analytics';

interface ForgottenLegendsPageProps {
  onNavigate: (path: string) => void;
}

export const ForgottenLegendsPage: React.FC<ForgottenLegendsPageProps> = ({ onNavigate }) => {
  useEffect(() => {
    updatePageSeo({
      title: "Forgotten Cricket Legends and Overlooked Players | Tales from the Game",
      description: "Meet the forgotten cricket legends, overlooked players and unfinished careers whose stories deserve another look.",
      canonicalUrl: buildCanonicalUrl('/forgotten-legends/'),
      ogType: 'website',
      jsonLd: generateBreadcrumbJsonLd([
        { name: 'Home', url: '/' },
        { name: 'Forgotten Legends', url: '/forgotten-legends/' },
      ]),
    });

    trackEvent({
      name: 'page_view',
      params: { path: '/forgotten-legends/' },
    });
  }, []);

  const publishedForgotten = ARTICLES.filter(
    (a) => a.category === 'Forgotten Legends' || a.slug === 'deccan-chargers-ipl-history'
  );
  const futureForgotten = FUTURE_BACKLOG.filter(
    (b) => b.category === 'Forgotten Legends' || b.theme.includes('Pace')
  );

  return (
    <div className="min-h-screen py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Manifesto Header */}
        <header className="max-w-4xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#244936]/10 border border-[#244936]/20 text-xs font-semibold uppercase tracking-widest text-[#244936] mb-3">
            <Feather className="w-3.5 h-3.5 text-[#B89558]" />
            <span>Dedicated Editorial Pillar</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-[#191B19] tracking-tight leading-tight mb-6">
            The Legends Who Deserve Another Look
          </h1>
          <div className="prose prose-lg text-[#686B66] font-sans space-y-4 leading-relaxed">
            <p>
              In contemporary sports media, historical attention gravitates inexorably toward longevity. The players celebrated with statues and stadium stands are those with 100 Test caps, dozens of centuries, or multi-decade administrative profiles.
            </p>
            <p className="text-[#191B19] font-medium border-l-2 border-[#B89558] pl-4 italic">
              Yet cricket history was shaped just as deeply by players whose incandescent brilliance burned for three or four summers before injuries, politics, interruptions, or the fragility of rhythm curtailed their careers.
            </p>
            <p>
              We do not automatically label any cricketer &ldquo;underrated&rdquo; or &ldquo;forgotten&rdquo; as a marketing gimmick. Every story in this section is grounded in verified match records, tactical analysis, and primary evidence explaining exactly why their contributions altered cricket history.
            </p>
          </div>
        </header>

        {/* Published Stories with Analytical Context */}
        <section className="mb-20">
          <div className="border-b border-[#DCD7CC] pb-4 mb-10 flex items-center justify-between">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#191B19]">
              Published Investigations
            </h2>
            <span className="text-xs font-semibold text-[#244936] uppercase tracking-wider">
              {publishedForgotten.length} Complete Stories Available
            </span>
          </div>

          <div className="space-y-12">
            {publishedForgotten.map((article, idx) => (
              <div
                key={article.slug}
                className="bg-white border border-[#DCD7CC] p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                <div className="lg:col-span-4 aspect-[4/3] bg-[#080B12] overflow-hidden">
                  <img
                    src={article.featuredImage}
                    alt={article.featuredImageAlt}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>

                <div className="lg:col-span-8 space-y-4">
                  <div className="flex flex-wrap items-center gap-3 text-xs text-[#686B66]">
                    <span className="bg-[#244936] text-[#F5F1E8] px-2.5 py-0.5 uppercase tracking-wider font-semibold">
                      {article.category}
                    </span>
                    <span className="text-[#B89558] font-medium">&bull;</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#B89558]" />
                      {article.readingTime} min read ({article.wordCount} words)
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#191B19] hover:text-[#244936] transition-colors">
                    <a
                      href={`/stories/${article.slug}/`}
                      onClick={(e) => {
                        e.preventDefault();
                        onNavigate(`/stories/${article.slug}/`);
                      }}
                    >
                      {article.title}
                    </a>
                  </h3>

                  <div className="bg-[#F5F1E8] p-3.5 border-l-2 border-[#244936] text-xs text-[#191B19] font-sans">
                    <strong className="text-[#244936] uppercase tracking-wider block mb-1">
                      Why This Story Deserves Attention:
                    </strong>
                    {article.slug === 'mohammad-amir-career' && (
                      <p>
                        Examines the tragedy of lost peak athletic years, the complex morality of rehabilitation, and his historic 3/16 burst in the 2017 Champions Trophy final that remains a masterclass in left-arm swing.
                      </p>
                    )}
                    {article.slug === 'rp-singh-bowling-style' && (
                      <p>
                        Deconstructs why the pace spearhead who won India the 2007 T20 World Cup, bowled them to victory at Lord&apos;s and Perth, and claimed the 2009 IPL Purple Cap played only 14 Tests due to the fragile mechanics of swing rhythm.
                      </p>
                    )}
                    {article.slug === 'deccan-chargers-ipl-history' && (
                      <p>
                        Explores the only IPL champion franchise to cease to exist, proving how culture and bowling discipline conquered the 2009 tournament after a humiliating last-place finish in 2008.
                      </p>
                    )}
                  </div>

                  <p className="text-sm text-[#686B66] leading-relaxed">
                    {article.excerpt}
                  </p>

                  <div className="pt-2">
                    <a
                      href={`/stories/${article.slug}/`}
                      onClick={(e) => {
                        e.preventDefault();
                        onNavigate(`/stories/${article.slug}/`);
                      }}
                      className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#244936] hover:text-[#B89558]"
                    >
                      <span>Read Complete Story</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Future Research Backlog (Clearly marked as forthcoming) */}
        <section className="bg-white border border-[#DCD7CC] p-8 sm:p-12">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#B89558] mb-2">
            <Sparkles className="w-4 h-4" />
            <span>Future Editorial Docket</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#191B19] mb-4">
            Forthcoming Forgotten Legends Investigations
          </h2>
          <p className="text-xs sm:text-sm text-[#686B66] max-w-2xl mb-8">
            These stories are currently in the research and verification phase. They are not yet published and will be released following rigorous primary source auditing.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {futureForgotten.map((topic) => (
              <div key={topic.title} className="p-5 border border-[#DCD7CC] bg-[#F5F1E8]/40 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#244936] uppercase tracking-wider">
                    {topic.theme}
                  </span>
                  <span className="text-[11px] px-2 py-0.5 bg-[#DCD7CC] text-[#191B19] rounded font-medium">
                    {topic.status}
                  </span>
                </div>
                <h4 className="font-serif text-base font-bold text-[#191B19]">
                  {topic.title}
                </h4>
                <p className="text-xs text-[#686B66] italic">
                  Central inquiry: &ldquo;{topic.centralQuestion}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
