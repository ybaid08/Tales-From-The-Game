import React from 'react';
import { Clock, ArrowRight, BookOpen } from 'lucide-react';
import { Article } from '../types/content';

interface ArticleCardProps {
  article: Article;
  onNavigate: (path: string) => void;
  featured?: boolean;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article, onNavigate, featured = false }) => {
  const storyUrl = `/stories/${article.slug}/`;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onNavigate(storyUrl);
  };

  const getCategoryBadgeClass = (category: string) => {
    switch (category) {
      case 'Forgotten Legends':
        return 'bg-[#244936] text-[#F5F1E8]';
      case 'Iconic Stories':
        return 'bg-[#B89558] text-[#080B12]';
      case 'Teams & Eras':
        return 'bg-[#080B12] text-[#F5F1E8]';
      default:
        return 'bg-[#686B66] text-[#FFFFFF]';
    }
  };

  if (featured) {
    return (
      <article className="group bg-white border border-[#DCD7CC] rounded-none overflow-hidden hover:shadow-xl transition-all duration-300">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
          <div className="lg:col-span-7 relative overflow-hidden bg-[#080B12] min-h-[300px] lg:min-h-[440px]">
            <img
              src={article.featuredImage}
              alt={article.featuredImageAlt}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
              loading="eager"
            />
            <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
              <span className={`text-xs font-semibold px-3 py-1 uppercase tracking-wider ${getCategoryBadgeClass(article.category)}`}>
                {article.category}
              </span>
              <span className="text-[11px] font-medium px-2.5 py-1 bg-black/70 text-[#F5F1E8] backdrop-blur-sm uppercase tracking-widest">
                Lead Story
              </span>
            </div>
            {article.featuredImageCaption && (
              <p className="absolute bottom-2 left-4 right-4 text-[11px] text-white/80 bg-black/60 p-2 backdrop-blur-sm line-clamp-1 italic">
                {article.featuredImageCaption}
              </p>
            )}
          </div>

          <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between bg-white">
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-xs text-[#686B66] font-medium">
                <span className="text-[#B89558] uppercase tracking-wider font-semibold">
                  {article.subCategory || 'In-Depth Investigation'}
                </span>
                <span>&bull;</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#B89558]" />
                  {article.readingTime} min read ({article.wordCount} words)
                </span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#191B19] group-hover:text-[#244936] transition-colors leading-tight">
                <a href={storyUrl} onClick={handleClick}>
                  {article.title}
                </a>
              </h3>

              <p className="text-[#686B66] text-sm sm:text-base leading-relaxed font-sans">
                {article.excerpt}
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-[#DCD7CC] flex items-center justify-between">
              <span className="text-xs text-[#686B66]">
                By {article.author.name}
              </span>
              <a
                href={storyUrl}
                onClick={handleClick}
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#244936] group-hover:text-[#B89558] transition-colors"
                aria-label={`Read full story: ${article.title}`}
              >
                <span>Read Full Story</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="group bg-white border border-[#DCD7CC] flex flex-col justify-between hover:border-[#244936] hover:shadow-lg transition-all duration-300">
      <div>
        {/* Card Image */}
        <div className="relative aspect-[16/10] overflow-hidden bg-[#080B12]">
          <img
            src={article.featuredImage}
            alt={article.featuredImageAlt}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
            loading="lazy"
          />
          <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5">
            {article.order && (
              <span className="text-[10px] font-bold px-2 py-0.5 bg-[#B89558] text-[#080B12] uppercase tracking-wider shadow-xs">
                Story 0{article.order}
              </span>
            )}
            <span className={`text-[11px] font-semibold px-2.5 py-0.5 uppercase tracking-wider ${getCategoryBadgeClass(article.category)}`}>
              {article.category}
            </span>
          </div>
          {article.imageCredit && (
            <p className="absolute bottom-1.5 left-2 right-2 text-[9px] text-white/80 bg-black/70 px-1.5 py-0.5 line-clamp-1">
              Photo: {article.imageCredit.photographer} ({article.imageCredit.license})
            </p>
          )}
        </div>

        {/* Card Content */}
        <div className="p-5 sm:p-6 space-y-3">
          <div className="flex items-center gap-2 text-xs text-[#686B66]">
            <span className="flex items-center gap-1 font-medium">
              <Clock className="w-3.5 h-3.5 text-[#B89558]" />
              {article.readingTime} min read
            </span>
            <span>&bull;</span>
            <span className="text-[11px] text-[#686B66]">{article.wordCount} words</span>
          </div>

          <h3 className="font-serif text-lg sm:text-xl font-bold text-[#191B19] group-hover:text-[#244936] transition-colors leading-snug line-clamp-2">
            <a href={storyUrl} onClick={handleClick}>
              {article.title}
            </a>
          </h3>

          <p className="text-xs sm:text-sm text-[#686B66] line-clamp-3 leading-relaxed font-sans">
            {article.excerpt}
          </p>
        </div>
      </div>

      {/* Card Action */}
      <div className="px-5 sm:px-6 pb-5 pt-3 border-t border-[#DCD7CC]/60 flex items-center justify-between mt-2">
        <span className="text-[11px] text-[#686B66] font-medium">
          {article.subCategory || 'Heritage Archive'}
        </span>
        <a
          href={storyUrl}
          onClick={handleClick}
          className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#244936] group-hover:text-[#B89558] transition-colors"
          aria-label={`Read story: ${article.title}`}
        >
          <span>Read Story</span>
          <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
        </a>
      </div>
    </article>
  );
};
