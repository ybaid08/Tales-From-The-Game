import React, { useEffect } from 'react';
import { ArrowRight, Compass, ShieldAlert, Award, History, Sparkles, BookOpen, Clock, Calendar } from 'lucide-react';
import { ARTICLES, FUTURE_BACKLOG } from '../data/articles';
import { NewsletterSection } from '../components/NewsletterSection';
import { updatePageSeo, buildCanonicalUrl, generateWebsiteJsonLd } from '../utils/seo';
import { trackEvent } from '../utils/analytics';

interface HomePageProps {
  onNavigate: (path: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  useEffect(() => {
    updatePageSeo({
      title: "Cricket Stories, Legends & Forgotten Heroes | Tales from the Game",
      description: "Discover the stories behind cricket's iconic moments, legendary players and forgotten heroes. Explore the careers, decisions and what-ifs that shaped the game.",
      canonicalUrl: buildCanonicalUrl('/'),
      ogType: 'website',
      jsonLd: generateWebsiteJsonLd(),
    });

    trackEvent({
      name: 'page_view',
      params: { path: '/' },
    });
  }, []);

  // Strict Canonical Launch Story Order:
  // 1. Matthew Hayden (Lead Feature)
  // 2. RP Singh (Secondary Feature)
  // 3. Mohammad Amir (Third Feature)
  // 4. Deccan Chargers (Fourth Feature)
  // 5. MS Dhoni (Fifth Feature)
  const haydenArticle = ARTICLES.find((a) => a.slug === 'matthew-hayden-batting-style') || ARTICLES[0];
  const rpSinghArticle = ARTICLES.find((a) => a.slug === 'rp-singh-bowling-style') || ARTICLES[1];
  const amirArticle = ARTICLES.find((a) => a.slug === 'mohammad-amir-career') || ARTICLES[2];
  const deccanArticle = ARTICLES.find((a) => a.slug === 'deccan-chargers-ipl-history') || ARTICLES[3];
  const dhoniArticle = ARTICLES.find((a) => a.slug === 'ms-dhoni-2011-world-cup-final') || ARTICLES[4];

  const handleStoryClick = (e: React.MouseEvent<HTMLAnchorElement>, slug: string) => {
    e.preventDefault();
    onNavigate(`/stories/${slug}/`);
  };

  return (
    <div className="min-h-screen bg-[#F5F1E8]">
      {/* 1. Cinematic Editorial Hero Section */}
      <section className="relative bg-[#080B12] text-[#F5F1E8] pt-14 pb-20 lg:pt-20 lg:pb-28 overflow-hidden border-b border-[#244936]/50">
        {/* Subtle Archival Atmosphere Texture */}
        <div className="absolute inset-0 opacity-15 pointer-events-none mix-blend-overlay">
          <img
            src="/images/matthew-hayden-action.jpg"
            alt=""
            className="w-full h-full object-cover filter grayscale contrast-150"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#080B12]/70 via-[#080B12]/90 to-[#080B12]"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#244936]/70 border border-[#B89558]/50 rounded-none text-xs text-[#B89558] font-semibold tracking-[0.2em] uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#B89558]" />
              <span>Vol. 1 &bull; The Heritage Archive &bull; Launch Anthology</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#F5F1E8] leading-[1.12]">
              Some Legends Are Never Forgotten.{' '}
              <span className="text-[#B89558] italic font-normal block mt-1 sm:inline sm:mt-0">
                Others Never Got Their Due.
              </span>
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-[#F5F1E8]/90 font-sans leading-relaxed max-w-2xl">
              Cricket beyond the scorecard. The players, moments, decisions and unfinished stories that shaped the game.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a
                href="/stories/"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/stories/');
                }}
                className="inline-flex items-center justify-center gap-2 bg-[#244936] hover:bg-[#1a3728] text-[#F5F1E8] font-bold text-xs sm:text-sm px-8 py-4 rounded-none tracking-widest uppercase transition-all shadow-lg hover:shadow-xl border border-[#244936]"
              >
                <span>Explore the Stories</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="/forgotten-legends/"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/forgotten-legends/');
                }}
                className="inline-flex items-center justify-center gap-2 bg-transparent hover:bg-[#F5F1E8]/10 text-[#F5F1E8] border border-[#DCD7CC]/40 hover:border-[#B89558] font-bold text-xs sm:text-sm px-7 py-4 rounded-none tracking-widest uppercase transition-all"
              >
                <span>Discover Forgotten Legends</span>
              </a>
            </div>

            {/* Editorial Table of Contents Micro-Nav */}
            <div className="pt-8 border-t border-white/10 hidden lg:flex items-center gap-6 text-[11px] text-[#F5F1E8]/70">
              <span className="font-bold text-[#B89558] uppercase tracking-wider">Launch Order:</span>
              <a href={`/stories/${haydenArticle.slug}/`} onClick={(e) => handleStoryClick(e, haydenArticle.slug)} className="hover:text-[#B89558] transition-colors">
                <span className="font-serif text-[#B89558] font-bold mr-1">01.</span> Hayden
              </a>
              <span className="text-white/20">&bull;</span>
              <a href={`/stories/${rpSinghArticle.slug}/`} onClick={(e) => handleStoryClick(e, rpSinghArticle.slug)} className="hover:text-[#B89558] transition-colors">
                <span className="font-serif text-[#B89558] font-bold mr-1">02.</span> RP Singh
              </a>
              <span className="text-white/20">&bull;</span>
              <a href={`/stories/${amirArticle.slug}/`} onClick={(e) => handleStoryClick(e, amirArticle.slug)} className="hover:text-[#B89558] transition-colors">
                <span className="font-serif text-[#B89558] font-bold mr-1">03.</span> Mohammad Amir
              </a>
              <span className="text-white/20">&bull;</span>
              <a href={`/stories/${deccanArticle.slug}/`} onClick={(e) => handleStoryClick(e, deccanArticle.slug)} className="hover:text-[#B89558] transition-colors">
                <span className="font-serif text-[#B89558] font-bold mr-1">04.</span> Deccan Chargers
              </a>
              <span className="text-white/20">&bull;</span>
              <a href={`/stories/${dhoniArticle.slug}/`} onClick={(e) => handleStoryClick(e, dhoniArticle.slug)} className="hover:text-[#B89558] transition-colors">
                <span className="font-serif text-[#B89558] font-bold mr-1">05.</span> MS Dhoni
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. MATTHEW HAYDEN: MAIN EDITORIAL LEAD FEATURE (Story 01) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 sm:-mt-12 relative z-20 mb-20">
        <article className="group bg-white border-2 border-[#DCD7CC] hover:border-[#244936] shadow-xl transition-all duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            {/* Large Asymmetric Cricket Photograph (60% Desktop width) */}
            <div className="lg:col-span-7 relative overflow-hidden bg-[#080B12] min-h-[340px] sm:min-h-[440px] lg:min-h-[520px] flex items-center justify-center">
              <img
                src={haydenArticle.featuredImage}
                alt={haydenArticle.featuredImageAlt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-95 group-hover:opacity-100"
                loading="eager"
              />
              {/* Badge Overlay */}
              <div className="absolute top-4 left-4 z-10 flex flex-wrap items-center gap-2">
                <span className="bg-[#B89558] text-[#080B12] text-xs font-bold px-3 py-1.5 uppercase tracking-wider shadow-md">
                  Story 01 &bull; Lead Feature
                </span>
                <span className="bg-[#244936] text-[#F5F1E8] text-xs font-semibold px-3 py-1.5 uppercase tracking-wider">
                  Batting Masterclass
                </span>
              </div>

              {/* Photo Attribution Caption */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-4 sm:p-5 text-[#F5F1E8]">
                <p className="text-xs sm:text-sm font-serif italic text-white/95">
                  &ldquo;{haydenArticle.featuredImageCaption}&rdquo;
                </p>
                {haydenArticle.imageCredit && (
                  <p className="text-[10px] text-white/70 mt-1 uppercase tracking-wider">
                    Photo: {haydenArticle.imageCredit.photographer} / {haydenArticle.imageCredit.source} ({haydenArticle.imageCredit.license})
                  </p>
                )}
              </div>
            </div>

            {/* Editorial Story Details (40% Desktop width) */}
            <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between bg-white border-t lg:border-t-0 lg:border-l border-[#DCD7CC]">
              <div className="space-y-5">
                <div className="flex items-center gap-3 text-xs text-[#686B66] font-semibold tracking-wider uppercase border-b border-[#DCD7CC] pb-3">
                  <span className="text-[#244936]">Iconic Stories</span>
                  <span>&bull;</span>
                  <span className="flex items-center gap-1 text-[#686B66]">
                    <Clock className="w-3.5 h-3.5 text-[#B89558]" />
                    {haydenArticle.readingTime} min read ({haydenArticle.wordCount} words)
                  </span>
                </div>

                <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#191B19] group-hover:text-[#244936] transition-colors leading-tight">
                  <a href={`/stories/${haydenArticle.slug}/`} onClick={(e) => handleStoryClick(e, haydenArticle.slug)}>
                    {haydenArticle.title}
                  </a>
                </h2>

                <p className="text-[#686B66] text-sm sm:text-base leading-relaxed font-sans">
                  {haydenArticle.excerpt}
                </p>

                {/* Key Statistics Matrix */}
                <div className="grid grid-cols-2 gap-3 py-3 bg-[#F5F1E8] p-4 border border-[#DCD7CC]">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#686B66] block">Highest Test Score</span>
                    <span className="font-serif text-xl sm:text-2xl font-bold text-[#191B19]">380</span>
                    <span className="text-[10px] text-[#686B66] block">vs Zimbabwe (Perth 2003)</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#686B66] block">Test Average</span>
                    <span className="font-serif text-xl sm:text-2xl font-bold text-[#244936]">50.73</span>
                    <span className="text-[10px] text-[#686B66] block">8,625 Runs &bull; 30 Hundreds</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-[#DCD7CC] flex items-center justify-between">
                <span className="text-xs text-[#686B66]">
                  By <strong className="text-[#191B19]">{haydenArticle.author.name}</strong>
                </span>
                <a
                  href={`/stories/${haydenArticle.slug}/`}
                  onClick={(e) => handleStoryClick(e, haydenArticle.slug)}
                  className="inline-flex items-center gap-2 bg-[#244936] hover:bg-[#1a3728] text-[#F5F1E8] text-xs font-bold uppercase tracking-widest px-5 py-3 rounded-none transition-colors shadow-sm"
                  aria-label={`Read lead story: ${haydenArticle.title}`}
                >
                  <span>Read Lead Story</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </article>
      </section>

      {/* 3. LATEST STORIES: VARIED EDITORIAL GRID (RP Singh -> Amir -> Deccan Chargers -> Dhoni) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        {/* Section Heading */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b-2 border-[#191B19]">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#244936] flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#B89558]" />
              <span>The Complete Editorial Anthology</span>
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#191B19] mt-1">
              Latest Stories
            </h2>
          </div>
          <span className="mt-2 sm:mt-0 text-xs text-[#686B66] font-medium">
            Stories 02 through 05 &bull; In Verified Order
          </span>
        </div>

        <div className="space-y-10">
          {/* STORY 02: RP SINGH (Prominent Wide Secondary Feature) */}
          <article className="group bg-white border border-[#DCD7CC] hover:border-[#244936] hover:shadow-lg transition-all duration-300">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
              <div className="md:col-span-5 relative overflow-hidden bg-[#080B12] min-h-[260px] md:min-h-[360px]">
                <img
                  src={rpSinghArticle.featuredImage}
                  alt={rpSinghArticle.featuredImageAlt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 z-10 flex items-center gap-2">
                  <span className="bg-[#244936] text-[#F5F1E8] text-xs font-bold px-3 py-1 uppercase tracking-wider">
                    Story 02 &bull; Forgotten Legends
                  </span>
                </div>
                {rpSinghArticle.imageCredit && (
                  <p className="absolute bottom-2 left-3 right-3 text-[10px] text-white/80 bg-black/60 p-1.5 line-clamp-1">
                    Photo: {rpSinghArticle.imageCredit.photographer} / {rpSinghArticle.imageCredit.license}
                  </p>
                )}
              </div>

              <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-xs text-[#686B66]">
                    <span className="text-[#B89558] font-bold uppercase tracking-wider">Pace Craft &amp; Overlooked Careers</span>
                    <span>&bull;</span>
                    <span className="flex items-center gap-1 font-medium">
                      <Clock className="w-3.5 h-3.5 text-[#B89558]" />
                      {rpSinghArticle.readingTime} min read ({rpSinghArticle.wordCount} words)
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#191B19] group-hover:text-[#244936] transition-colors leading-snug">
                    <a href={`/stories/${rpSinghArticle.slug}/`} onClick={(e) => handleStoryClick(e, rpSinghArticle.slug)}>
                      {rpSinghArticle.title}
                    </a>
                  </h3>

                  <p className="text-sm text-[#686B66] leading-relaxed font-sans line-clamp-3">
                    {rpSinghArticle.excerpt}
                  </p>

                  <div className="inline-flex items-center gap-4 text-xs text-[#244936] font-medium pt-1">
                    <span className="bg-[#244936]/10 px-2.5 py-1 border border-[#244936]/20">12 Wickets at 2007 World T20</span>
                    <span className="bg-[#B89558]/10 px-2.5 py-1 border border-[#B89558]/30">5/59 on Lord&apos;s Honours Board</span>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-[#DCD7CC] flex items-center justify-between">
                  <span className="text-xs text-[#686B66]">By {rpSinghArticle.author.name}</span>
                  <a
                    href={`/stories/${rpSinghArticle.slug}/`}
                    onClick={(e) => handleStoryClick(e, rpSinghArticle.slug)}
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#244936] hover:text-[#B89558] transition-colors"
                  >
                    <span>Read Story</span>
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </div>
          </article>

          {/* TWO-COLUMN EDITORIAL SPREAD: STORY 03 (Amir) & STORY 04 (Deccan Chargers) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* STORY 03: MOHAMMAD AMIR */}
            <article className="group bg-white border border-[#DCD7CC] hover:border-[#244936] hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="relative aspect-[16/10] overflow-hidden bg-[#080B12]">
                  <img
                    src={amirArticle.featuredImage}
                    alt={amirArticle.featuredImageAlt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 z-10">
                    <span className="bg-[#244936] text-[#F5F1E8] text-xs font-bold px-3 py-1 uppercase tracking-wider">
                      Story 03 &bull; Forgotten Legends
                    </span>
                  </div>
                  {amirArticle.imageCredit && (
                    <p className="absolute bottom-2 left-3 right-3 text-[10px] text-white/80 bg-black/60 p-1.5 line-clamp-1">
                      Photo: {amirArticle.imageCredit.photographer} / {amirArticle.imageCredit.source} ({amirArticle.imageCredit.license})
                    </p>
                  )}
                </div>

                <div className="p-6 sm:p-7 space-y-3">
                  <div className="flex items-center gap-3 text-xs text-[#686B66]">
                    <span className="text-[#B89558] font-bold uppercase tracking-wider">The Unfinished Legacy</span>
                    <span>&bull;</span>
                    <span className="flex items-center gap-1 font-medium">
                      <Clock className="w-3.5 h-3.5 text-[#B89558]" />
                      {amirArticle.readingTime} min read
                    </span>
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#191B19] group-hover:text-[#244936] transition-colors leading-snug">
                    <a href={`/stories/${amirArticle.slug}/`} onClick={(e) => handleStoryClick(e, amirArticle.slug)}>
                      {amirArticle.title}
                    </a>
                  </h3>

                  <p className="text-sm text-[#686B66] leading-relaxed font-sans line-clamp-3">
                    {amirArticle.excerpt}
                  </p>

                  <div className="pt-2">
                    <span className="text-[11px] font-semibold text-[#244936] bg-[#244936]/10 px-2.5 py-1 inline-block">
                      Champions Trophy 2017 &bull; Oval Redemption Spell
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-6 sm:p-7 pt-4 border-t border-[#DCD7CC] flex items-center justify-between">
                <span className="text-xs text-[#686B66]">By {amirArticle.author.name}</span>
                <a
                  href={`/stories/${amirArticle.slug}/`}
                  onClick={(e) => handleStoryClick(e, amirArticle.slug)}
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#244936] hover:text-[#B89558] transition-colors"
                >
                  <span>Read Story</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </article>

            {/* STORY 04: DECCAN CHARGERS */}
            <article className="group bg-white border border-[#DCD7CC] hover:border-[#244936] hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="relative aspect-[16/10] overflow-hidden bg-[#080B12]">
                  <img
                    src={deccanArticle.featuredImage}
                    alt={deccanArticle.featuredImageAlt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 z-10">
                    <span className="bg-[#080B12] text-[#B89558] border border-[#B89558]/40 text-xs font-bold px-3 py-1 uppercase tracking-wider">
                      Story 04 &bull; Teams &amp; Eras
                    </span>
                  </div>
                  {deccanArticle.imageCredit && (
                    <p className="absolute bottom-2 left-3 right-3 text-[10px] text-white/80 bg-black/60 p-1.5 line-clamp-1">
                      Photo: {deccanArticle.imageCredit.photographer} / {deccanArticle.imageCredit.source} ({deccanArticle.imageCredit.license})
                    </p>
                  )}
                </div>

                <div className="p-6 sm:p-7 space-y-3">
                  <div className="flex items-center gap-3 text-xs text-[#686B66]">
                    <span className="text-[#B89558] font-bold uppercase tracking-wider">Franchise Dynasties &amp; Departures</span>
                    <span>&bull;</span>
                    <span className="flex items-center gap-1 font-medium">
                      <Clock className="w-3.5 h-3.5 text-[#B89558]" />
                      {deccanArticle.readingTime} min read
                    </span>
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#191B19] group-hover:text-[#244936] transition-colors leading-snug">
                    <a href={`/stories/${deccanArticle.slug}/`} onClick={(e) => handleStoryClick(e, deccanArticle.slug)}>
                      {deccanArticle.title}
                    </a>
                  </h3>

                  <p className="text-sm text-[#686B66] leading-relaxed font-sans line-clamp-3">
                    {deccanArticle.excerpt}
                  </p>

                  <div className="pt-2">
                    <span className="text-[11px] font-semibold text-[#080B12] bg-[#B89558]/20 px-2.5 py-1 inline-block border border-[#B89558]/30">
                      2008 Last Place &rarr; 2009 Champions in South Africa
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-6 sm:p-7 pt-4 border-t border-[#DCD7CC] flex items-center justify-between">
                <span className="text-xs text-[#686B66]">By {deccanArticle.author.name}</span>
                <a
                  href={`/stories/${deccanArticle.slug}/`}
                  onClick={(e) => handleStoryClick(e, deccanArticle.slug)}
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#244936] hover:text-[#B89558] transition-colors"
                >
                  <span>Read Story</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </article>
          </div>

          {/* STORY 05: MS DHONI (Prominent Iconic-Moment Feature) */}
          <article className="group bg-white border border-[#DCD7CC] hover:border-[#244936] hover:shadow-lg transition-all duration-300">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
              <div className="md:col-span-5 relative overflow-hidden bg-[#080B12] min-h-[260px] md:min-h-[340px]">
                <img
                  src={dhoniArticle.featuredImage}
                  alt={dhoniArticle.featuredImageAlt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 z-10 flex items-center gap-2">
                  <span className="bg-[#B89558] text-[#080B12] text-xs font-bold px-3 py-1 uppercase tracking-wider shadow-sm">
                    Story 05 &bull; Iconic Moments
                  </span>
                </div>
                {dhoniArticle.imageCredit && (
                  <p className="absolute bottom-2 left-3 right-3 text-[10px] text-white/80 bg-black/60 p-1.5 line-clamp-1">
                    Photo: {dhoniArticle.imageCredit.photographer} / {dhoniArticle.imageCredit.license}
                  </p>
                )}
              </div>

              <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-xs text-[#686B66]">
                    <span className="text-[#B89558] font-bold uppercase tracking-wider">Championship Finishes</span>
                    <span>&bull;</span>
                    <span className="flex items-center gap-1 font-medium">
                      <Clock className="w-3.5 h-3.5 text-[#B89558]" />
                      {dhoniArticle.readingTime} min read ({dhoniArticle.wordCount} words)
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#191B19] group-hover:text-[#244936] transition-colors leading-snug">
                    <a href={`/stories/${dhoniArticle.slug}/`} onClick={(e) => handleStoryClick(e, dhoniArticle.slug)}>
                      {dhoniArticle.title}
                    </a>
                  </h3>

                  <p className="text-sm text-[#686B66] leading-relaxed font-sans line-clamp-3">
                    {dhoniArticle.excerpt}
                  </p>

                  <div className="inline-flex items-center gap-4 text-xs font-medium pt-1">
                    <span className="bg-[#B89558]/20 text-[#080B12] px-2.5 py-1 border border-[#B89558]/40">
                      91* off 79 Balls &bull; Wankhede Stadium (2011)
                    </span>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-[#DCD7CC] flex items-center justify-between">
                  <span className="text-xs text-[#686B66]">By {dhoniArticle.author.name}</span>
                  <a
                    href={`/stories/${dhoniArticle.slug}/`}
                    onClick={(e) => handleStoryClick(e, dhoniArticle.slug)}
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#244936] hover:text-[#B89558] transition-colors"
                  >
                    <span>Read Story</span>
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* 4. FORGOTTEN LEGENDS EDITORIAL SECTION (Forest Green Cinematic Contrast) */}
      <section className="bg-[#244936] text-[#F5F1E8] py-20 lg:py-28 mb-24 border-y border-[#B89558]/40 shadow-inner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-14">
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-[#F5F1E8]/10 text-xs font-bold uppercase tracking-widest text-[#B89558] border border-[#B89558]/30 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#B89558]" />
              Dedicated Editorial Pillar
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F5F1E8] tracking-tight mb-4">
              Forgotten Legends &amp; Overlooked Careers
            </h2>
            <p className="text-base sm:text-lg text-[#F5F1E8]/90 leading-relaxed font-sans">
              Cricket history often belongs to those with 100 Test caps and massive commercial endorsements. But the game was shaped just as deeply by the seamers with golden summers, the prodigies whose prime years were stolen, and the quiet heroes who won world championships on bowling rhythm alone.
            </p>
          </div>

          {/* Cards with Authentic Cricket Photography */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* RP Singh Forgotten Legend Card */}
            <div className="bg-white text-[#191B19] border-2 border-[#DCD7CC] overflow-hidden flex flex-col justify-between group hover:border-[#B89558] transition-all">
              <div className="relative aspect-[16/9] overflow-hidden bg-[#080B12]">
                <img
                  src={rpSinghArticle.featuredImage}
                  alt={rpSinghArticle.featuredImageAlt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                />
                <span className="absolute top-3 left-3 bg-[#244936] text-[#F5F1E8] text-[11px] font-bold px-2.5 py-1 uppercase tracking-wider">
                  Story 02
                </span>
              </div>
              <div className="p-6 sm:p-8 flex flex-col justify-between flex-grow">
                <div>
                  <span className="text-xs font-bold text-[#B89558] uppercase tracking-wider block mb-2">
                    {rpSinghArticle.subCategory}
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#191B19] group-hover:text-[#244936] transition-colors mb-3">
                    <a href={`/stories/${rpSinghArticle.slug}/`} onClick={(e) => handleStoryClick(e, rpSinghArticle.slug)}>
                      {rpSinghArticle.title}
                    </a>
                  </h3>
                  <p className="text-xs sm:text-sm text-[#686B66] line-clamp-3 leading-relaxed mb-4">
                    {rpSinghArticle.excerpt}
                  </p>
                </div>
                <div className="pt-4 border-t border-[#DCD7CC] flex items-center justify-between">
                  <span className="text-xs text-[#686B66]">{rpSinghArticle.readingTime} min read</span>
                  <a
                    href={`/stories/${rpSinghArticle.slug}/`}
                    onClick={(e) => handleStoryClick(e, rpSinghArticle.slug)}
                    className="text-xs font-bold uppercase tracking-wider text-[#244936] hover:text-[#B89558] flex items-center gap-1"
                  >
                    <span>Read Investigation</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Mohammad Amir Forgotten Legend Card */}
            <div className="bg-white text-[#191B19] border-2 border-[#DCD7CC] overflow-hidden flex flex-col justify-between group hover:border-[#B89558] transition-all">
              <div className="relative aspect-[16/9] overflow-hidden bg-[#080B12]">
                <img
                  src={amirArticle.featuredImage}
                  alt={amirArticle.featuredImageAlt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                />
                <span className="absolute top-3 left-3 bg-[#244936] text-[#F5F1E8] text-[11px] font-bold px-2.5 py-1 uppercase tracking-wider">
                  Story 03
                </span>
              </div>
              <div className="p-6 sm:p-8 flex flex-col justify-between flex-grow">
                <div>
                  <span className="text-xs font-bold text-[#B89558] uppercase tracking-wider block mb-2">
                    {amirArticle.subCategory}
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#191B19] group-hover:text-[#244936] transition-colors mb-3">
                    <a href={`/stories/${amirArticle.slug}/`} onClick={(e) => handleStoryClick(e, amirArticle.slug)}>
                      {amirArticle.title}
                    </a>
                  </h3>
                  <p className="text-xs sm:text-sm text-[#686B66] line-clamp-3 leading-relaxed mb-4">
                    {amirArticle.excerpt}
                  </p>
                </div>
                <div className="pt-4 border-t border-[#DCD7CC] flex items-center justify-between">
                  <span className="text-xs text-[#686B66]">{amirArticle.readingTime} min read</span>
                  <a
                    href={`/stories/${amirArticle.slug}/`}
                    onClick={(e) => handleStoryClick(e, amirArticle.slug)}
                    className="text-xs font-bold uppercase tracking-wider text-[#244936] hover:text-[#B89558] flex items-center gap-1"
                  >
                    <span>Read Investigation</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center pt-2">
            <a
              href="/forgotten-legends/"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/forgotten-legends/');
              }}
              className="inline-flex items-center gap-2 bg-[#B89558] hover:bg-[#a68449] text-[#080B12] text-xs font-bold uppercase tracking-widest px-8 py-4 rounded-none transition-colors shadow-lg"
            >
              <span>Explore The Forgotten Legends Archive</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* 5. ICONIC MOMENTS & TEAMS & ERAS MAGAZINE SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Iconic Moments Column */}
          <div className="bg-white border-2 border-[#DCD7CC] p-8 sm:p-10 flex flex-col justify-between shadow-sm">
            <div>
              <div className="flex items-center gap-2 text-[#B89558] mb-3">
                <Award className="w-5 h-5 text-[#B89558]" />
                <span className="text-xs font-bold uppercase tracking-widest">Iconic Moments &amp; Turning Points</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#191B19] mb-4">
                Moments That Changed the Game
              </h3>
              <p className="text-sm text-[#686B66] mb-6 leading-relaxed">
                Examining iconic match-winning innings and tactical gambles through cold strategic analysis rather than simple nostalgia.
              </p>

              {/* Story 01: Hayden Spotlight */}
              <div className="mb-5 pb-5 border-b border-[#DCD7CC]">
                <div className="flex items-center gap-2 text-[11px] text-[#B89558] font-bold uppercase mb-1">
                  <span>Story 01</span> &bull; <span>Perth 380 &amp; 2001 Chennai Sweep</span>
                </div>
                <h4 className="font-serif text-lg font-bold text-[#191B19] hover:text-[#244936]">
                  <a href={`/stories/${haydenArticle.slug}/`} onClick={(e) => handleStoryClick(e, haydenArticle.slug)}>
                    {haydenArticle.title}
                  </a>
                </h4>
                <p className="text-xs text-[#686B66] line-clamp-2 mt-1">{haydenArticle.excerpt}</p>
              </div>

              {/* Story 05: Dhoni Spotlight */}
              <div className="mb-2">
                <div className="flex items-center gap-2 text-[11px] text-[#B89558] font-bold uppercase mb-1">
                  <span>Story 05</span> &bull; <span>2011 Final 91* Finishing Stroke</span>
                </div>
                <h4 className="font-serif text-lg font-bold text-[#191B19] hover:text-[#244936]">
                  <a href={`/stories/${dhoniArticle.slug}/`} onClick={(e) => handleStoryClick(e, dhoniArticle.slug)}>
                    {dhoniArticle.title}
                  </a>
                </h4>
                <p className="text-xs text-[#686B66] line-clamp-2 mt-1">{dhoniArticle.excerpt}</p>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-[#DCD7CC]">
              <a
                href="/iconic-moments/"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/iconic-moments/');
                }}
                className="text-xs font-bold uppercase tracking-wider text-[#244936] hover:text-[#B89558] inline-flex items-center gap-2"
              >
                <span>Browse All Iconic Moments</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Teams and Eras Column */}
          <div className="bg-white border-2 border-[#DCD7CC] p-8 sm:p-10 flex flex-col justify-between shadow-sm">
            <div>
              <div className="flex items-center gap-2 text-[#244936] mb-3">
                <History className="w-5 h-5 text-[#244936]" />
                <span className="text-xs font-bold uppercase tracking-widest">Teams &amp; Eras &bull; Franchise Lore</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#191B19] mb-4">
                Dynasties, Franchises &amp; Eras
              </h3>
              <p className="text-sm text-[#686B66] mb-6 leading-relaxed">
                Exploring the teams that reshaped cricket culture—from defunct IPL champions to dominant eras of international dominance.
              </p>

              {/* Story 04: Deccan Chargers Spotlight */}
              <div className="mb-4 pb-4 border-b border-[#DCD7CC]">
                <div className="flex items-center gap-2 text-[11px] text-[#244936] font-bold uppercase mb-1">
                  <span>Story 04</span> &bull; <span>The 2009 Worst-to-First Turnaround</span>
                </div>
                <h4 className="font-serif text-lg font-bold text-[#191B19] hover:text-[#244936]">
                  <a href={`/stories/${deccanArticle.slug}/`} onClick={(e) => handleStoryClick(e, deccanArticle.slug)}>
                    {deccanArticle.title}
                  </a>
                </h4>
                <p className="text-xs text-[#686B66] line-clamp-2 mt-1">{deccanArticle.excerpt}</p>
              </div>

              <div className="bg-[#F5F1E8] p-4 border border-[#DCD7CC] text-xs text-[#686B66] space-y-1">
                <strong className="text-[#191B19] font-serif block">Archival Retrospectives in Research:</strong>
                <p>Dominant Australian Era (1999–2007) &bull; Clive Lloyd&apos;s West Indies &bull; South Africa 2008–2012</p>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-[#DCD7CC]">
              <a
                href="/teams-and-eras/"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/teams-and-eras/');
                }}
                className="text-xs font-bold uppercase tracking-wider text-[#244936] hover:text-[#B89558] inline-flex items-center gap-2"
              >
                <span>Explore Teams &amp; Eras Archive</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Editorial In-Progress Research Docket */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="bg-white border-2 border-[#DCD7CC] p-6 sm:p-10 shadow-sm">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#B89558] mb-2">
            <BookOpen className="w-4 h-4" />
            <span>Editorial Research Desk &bull; Upcoming Releases</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#191B19] mb-3">
            On the Archival Research Desk
          </h2>
          <p className="text-xs sm:text-sm text-[#686B66] max-w-2xl mb-8 leading-relaxed">
            Stories currently undergoing primary scorecard auditing, player archival interview transcription, and historical research before joining the published archive.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {FUTURE_BACKLOG.slice(0, 6).map((topic) => (
              <div key={topic.title} className="bg-[#F5F1E8] p-4 border border-[#DCD7CC] space-y-2">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-[#686B66] font-semibold uppercase tracking-wider">{topic.category}</span>
                  <span className="px-2 py-0.5 bg-white text-[#244936] font-medium border border-[#DCD7CC] text-[10px]">
                    {topic.status}
                  </span>
                </div>
                <h4 className="font-serif text-sm font-bold text-[#191B19] leading-snug">
                  {topic.title}
                </h4>
                <p className="text-xs text-[#686B66] italic line-clamp-2">
                  &ldquo;{topic.centralQuestion}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Newsletter Section */}
      <NewsletterSection />
    </div>
  );
};
