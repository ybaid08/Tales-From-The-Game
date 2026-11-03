import React, { useEffect, useState } from 'react';
import { Clock, Calendar, User, Share2, Check, ArrowRight, BookOpen, ExternalLink, ChevronDown, ChevronUp, Bookmark } from 'lucide-react';
import { Article } from '../types/content';
import { ARTICLES } from '../data/articles';
import { ArticleCard } from '../components/ArticleCard';
import { updatePageSeo, buildCanonicalUrl, generateArticleJsonLd, generateBreadcrumbJsonLd } from '../utils/seo';
import { trackEvent } from '../utils/analytics';

interface ArticlePageProps {
  article: Article;
  onNavigate: (path: string) => void;
}

export const ArticlePage: React.FC<ArticlePageProps> = ({ article, onNavigate }) => {
  const [copied, setCopied] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const canonicalUrl = buildCanonicalUrl(`/stories/${article.slug}/`);

  useEffect(() => {
    // Inject page-specific title, description, canonical link, open graph, and structured data
    updatePageSeo({
      title: article.seoTitle,
      description: article.metaDescription,
      canonicalUrl,
      ogType: 'article',
      ogImage: article.featuredImage,
      jsonLd: [
        generateArticleJsonLd(article, canonicalUrl),
        generateBreadcrumbJsonLd([
          { name: 'Home', url: '/' },
          { name: 'Stories', url: '/stories/' },
          { name: article.category, url: getCategoryUrl(article.category) },
          { name: article.title, url: `/stories/${article.slug}/` },
        ]),
      ],
    });

    // Track analytics view_story event
    trackEvent({
      name: 'view_story',
      params: {
        title: article.title,
        slug: article.slug,
        category: article.category,
        wordCount: article.wordCount,
        readingTime: article.readingTime,
      },
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [article.slug]);

  function getCategoryUrl(category: string) {
    switch (category) {
      case 'Forgotten Legends':
        return '/forgotten-legends/';
      case 'Iconic Stories':
        return '/iconic-moments/';
      case 'Teams & Eras':
        return '/teams-and-eras/';
      default:
        return '/stories/';
    }
  }

  const handleShare = async () => {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const relatedArticlesList = ARTICLES.filter(
    (a) => article.relatedArticles.includes(a.slug) && a.slug !== article.slug
  );

  const nextStory = ARTICLES.find((a) => a.slug === article.nextStoryRecommendation.slug);

  const formattedDate = new Date(article.datePublished).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <article className="min-h-screen py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-6 text-xs text-[#686B66] font-medium flex items-center flex-wrap gap-2">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('/');
            }}
            className="hover:text-[#244936] transition-colors"
          >
            Home
          </a>
          <span>/</span>
          <a
            href="/stories/"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('/stories/');
            }}
            className="hover:text-[#244936] transition-colors"
          >
            Stories
          </a>
          <span>/</span>
          <a
            href={getCategoryUrl(article.category)}
            onClick={(e) => {
              e.preventDefault();
              onNavigate(getCategoryUrl(article.category));
            }}
            className="text-[#244936] hover:underline"
          >
            {article.category}
          </a>
        </nav>

        {/* Article Header */}
        <header className="space-y-6 mb-10 pb-8 border-b border-[#DCD7CC]">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs font-semibold px-3 py-1 bg-[#244936] text-[#F5F1E8] uppercase tracking-wider">
              {article.category}
            </span>
            {article.subCategory && (
              <span className="text-xs font-semibold text-[#B89558] uppercase tracking-wider">
                {article.subCategory}
              </span>
            )}
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#191B19] leading-tight tracking-tight">
            {article.h1}
          </h1>

          <p className="text-base sm:text-xl text-[#686B66] font-serif italic leading-relaxed">
            {article.excerpt}
          </p>

          {/* Author & Publication Metadata */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 text-xs text-[#686B66] font-sans border-t border-[#DCD7CC]/60">
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#244936] text-[#F5F1E8] flex items-center justify-center font-serif font-bold text-xs">
                  {article.author.name[0]}
                </div>
                <div>
                  <span className="font-semibold text-[#191B19] block">
                    {article.author.name}
                  </span>
                  <span className="text-[11px] text-[#686B66]">
                    {article.author.role}
                  </span>
                </div>
              </div>

              <span>&bull;</span>

              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#B89558]" />
                <time dateTime={article.datePublished}>{formattedDate}</time>
              </div>

              <span>&bull;</span>

              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#B89558]" />
                <span>{article.readingTime} min read</span>
                <span className="text-[#686B66]">({article.wordCount} words)</span>
              </div>
            </div>

            {/* Interactive Share & Bookmark buttons */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={`p-2 rounded border transition-colors flex items-center gap-1 text-xs ${
                  isBookmarked
                    ? 'bg-[#B89558] text-[#080B12] border-[#B89558]'
                    : 'bg-white text-[#191B19] border-[#DCD7CC] hover:bg-[#F5F1E8]'
                }`}
                aria-label={isBookmarked ? 'Remove Bookmark' : 'Bookmark Story'}
              >
                <Bookmark className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{isBookmarked ? 'Saved' : 'Save'}</span>
              </button>

              <button
                type="button"
                onClick={handleShare}
                className="px-3 py-2 bg-white text-[#191B19] border border-[#DCD7CC] hover:bg-[#F5F1E8] rounded transition-colors flex items-center gap-1.5 text-xs font-semibold"
                aria-label="Share this story"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-green-700" />
                    <span>Link Copied!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-3.5 h-3.5 text-[#244936]" />
                    <span>Share Story</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        <figure className="mb-12">
          <div className="aspect-[16/9] overflow-hidden bg-[#080B12] border border-[#DCD7CC] shadow-md">
            <img
              src={article.featuredImage}
              alt={article.featuredImageAlt}
              className="w-full h-full object-cover"
              loading="eager"
            />
          </div>
          <figcaption className="mt-3 text-xs text-[#686B66] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 px-1">
            {article.featuredImageCaption && (
              <span className="italic font-serif">{article.featuredImageCaption}</span>
            )}
            {article.imageCredit && (
              <span className="text-[11px] text-[#686B66] bg-[#F5F1E8] px-2.5 py-1 border border-[#DCD7CC] rounded-none shrink-0 font-sans">
                Photo:{' '}
                <a
                  href={article.imageCredit.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-[#244936] font-medium"
                >
                  {article.imageCredit.photographer}
                </a>{' '}
                ({article.imageCredit.source}) &bull;{' '}
                <a
                  href={article.imageCredit.licenseUrl || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#244936] font-medium"
                >
                  {article.imageCredit.license}
                </a>
              </span>
            )}
          </figcaption>
        </figure>

        {/* Table of Contents / Fast Navigation */}
        <div className="bg-white border border-[#DCD7CC] p-5 sm:p-6 mb-12">
          <h2 className="text-xs font-bold uppercase tracking-widest text-[#244936] mb-3 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-[#B89558]" />
            <span>Chapter Index</span>
          </h2>
          <ol className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#191B19] font-sans">
            {article.sections.map((section, idx) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="hover:text-[#244936] hover:underline flex items-start gap-2"
                >
                  <span className="font-serif font-bold text-[#B89558]">{idx + 1}.</span>
                  <span className="line-clamp-1">{section.heading}</span>
                </a>
              </li>
            ))}
          </ol>
        </div>

        {/* Main Article Body */}
        <div className="space-y-12 text-[#191B19] font-sans leading-relaxed text-base sm:text-lg">
          {article.sections.map((section, index) => (
            <section key={section.id} id={section.id} className="scroll-mt-24 space-y-5">
              <div className="space-y-1 border-b border-[#DCD7CC]/60 pb-3">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#B89558]">
                  Part 0{index + 1}
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#191B19] tracking-tight">
                  {section.heading}
                </h2>
                {section.subheading && (
                  <p className="text-xs sm:text-sm text-[#686B66] font-medium italic">
                    {section.subheading}
                  </p>
                )}
              </div>

              {/* Key Stats Callout if present */}
              {section.keyStats && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white p-4 border border-[#DCD7CC] my-6">
                  {section.keyStats.map((stat) => (
                    <div key={stat.label} className="border-r border-[#DCD7CC] last:border-none pr-2">
                      <span className="text-[10px] text-[#686B66] uppercase tracking-wider block font-medium">
                        {stat.label}
                      </span>
                      <span className="font-serif text-lg sm:text-xl font-bold text-[#244936] block">
                        {stat.value}
                      </span>
                      <span className="text-[10px] text-[#686B66] line-clamp-1">
                        {stat.context}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Paragraphs */}
              {section.paragraphs.map((p, pIndex) => (
                <p
                  key={pIndex}
                  className={`text-[#191B19]/90 leading-relaxed ${
                    index === 0 && pIndex === 0 ? 'editorial-dropcap text-lg' : ''
                  }`}
                >
                  {p}
                </p>
              ))}

              {/* Archival Pull Quote if present */}
              {section.quote && (
                <figure className="my-8 py-6 px-6 sm:px-8 border-y-2 border-[#244936] bg-white text-center">
                  <blockquote className="font-serif text-lg sm:text-xl italic text-[#191B19] leading-relaxed">
                    &ldquo;{section.quote.text}&rdquo;
                  </blockquote>
                  {section.quote.attribution && (
                    <figcaption className="mt-3 text-xs uppercase tracking-widest text-[#B89558] font-bold font-sans">
                      &mdash; {section.quote.attribution}
                    </figcaption>
                  )}
                </figure>
              )}
            </section>
          ))}

          {/* Conclusion */}
          <section className="bg-white border-t-2 border-[#244936] p-6 sm:p-10 space-y-4 my-10">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#191B19]">
              The Historical Verdict
            </h2>
            {article.conclusion.map((cParagraph, cIdx) => (
              <p key={cIdx} className="text-sm sm:text-base text-[#191B19]/90 leading-relaxed">
                {cParagraph}
              </p>
            ))}
          </section>
        </div>

        {/* Fact-Checking & Primary Sourcing Audit (As per spec section 19) */}
        <section className="bg-white border border-[#DCD7CC] p-6 sm:p-8 mt-14" aria-labelledby="sources-heading">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-[#244936]"></span>
            <h3 id="sources-heading" className="text-xs font-bold uppercase tracking-widest text-[#244936]">
              Verified Research &amp; Fact-Checking Sources
            </h3>
          </div>
          <p className="text-xs text-[#686B66] mb-4">
            In accordance with our Editorial Standards, all match figures, ball-by-ball accounts, and historical claims in this article have been cross-checked against primary databases:
          </p>
          <ul className="space-y-2 text-xs font-sans text-[#191B19]">
            {article.sources.map((source, sIdx) => (
              <li key={sIdx} className="flex items-start gap-2 bg-[#F5F1E8]/50 p-2.5 rounded border border-[#DCD7CC]/60">
                <span className="font-bold text-[#B89558] shrink-0 font-serif">{sIdx + 1}.</span>
                <div>
                  <strong className="text-[#191B19]">{source.title}</strong> &mdash;{' '}
                  <span className="text-[#686B66]">{source.publisher} {source.year ? `(${source.year})` : ''}</span>
                  <p className="text-[11px] text-[#686B66] mt-0.5">{source.context}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Reader FAQs Section (AEO optimized as per section 18) */}
        {article.faqs && article.faqs.length > 0 && (
          <section className="mt-12 bg-white border border-[#DCD7CC] p-6 sm:p-8" aria-labelledby="faqs-heading">
            <h3 id="faqs-heading" className="font-serif text-xl sm:text-2xl font-bold text-[#191B19] mb-4">
              Frequently Asked Questions
            </h3>
            <div className="space-y-3">
              {article.faqs.map((faq, fIdx) => {
                const isOpen = activeFaq === fIdx;
                return (
                  <div key={fIdx} className="border border-[#DCD7CC]">
                    <button
                      type="button"
                      onClick={() => setActiveFaq(isOpen ? null : fIdx)}
                      className="w-full text-left p-4 flex items-center justify-between text-sm font-semibold text-[#191B19] hover:bg-[#F5F1E8]/60 transition-colors"
                      aria-expanded={isOpen}
                    >
                      <span>{faq.question}</span>
                      {isOpen ? <ChevronUp className="w-4 h-4 text-[#244936]" /> : <ChevronDown className="w-4 h-4 text-[#686B66]" />}
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-4 pt-1 text-xs sm:text-sm text-[#686B66] font-sans leading-relaxed border-t border-[#DCD7CC]/40 bg-[#F5F1E8]/20">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Next Recommended Story Callout */}
        {nextStory && (
          <section className="my-14 bg-[#244936] text-[#F5F1E8] p-6 sm:p-8 border border-[#B89558]/40">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#B89558] block mb-1">
                  Continue Reading The Anthology
                </span>
                <h4 className="font-serif text-xl sm:text-2xl font-bold text-[#F5F1E8]">
                  {nextStory.title}
                </h4>
                <p className="text-xs text-[#F5F1E8]/85 mt-1 font-sans">
                  {article.nextStoryRecommendation.reason}
                </p>
              </div>
              <a
                href={`/stories/${nextStory.slug}/`}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(`/stories/${nextStory.slug}/`);
                }}
                className="bg-[#B89558] hover:bg-[#a68449] text-[#080B12] text-xs font-bold uppercase tracking-widest px-5 py-3 rounded-sm transition-colors shrink-0 inline-flex items-center gap-1.5"
              >
                <span>Read Story</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </section>
        )}

        {/* Related Stories */}
        {relatedArticlesList.length > 0 && (
          <section className="mt-16 pt-12 border-t border-[#DCD7CC]">
            <div className="mb-8">
              <h3 className="font-serif text-2xl font-bold text-[#191B19]">
                Related Stories in the Archive
              </h3>
              <p className="text-xs text-[#686B66] mt-1">
                Explore connected careers, tactical crossroads, and historic campaigns.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedArticlesList.map((rel) => (
                <ArticleCard key={rel.slug} article={rel} onNavigate={onNavigate} />
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
};
