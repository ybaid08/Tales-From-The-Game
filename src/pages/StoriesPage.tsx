import React, { useState, useEffect } from 'react';
import { Search, Filter, BookOpen, Clock, ArrowRight } from 'lucide-react';
import { ARTICLES } from '../data/articles';
import { ArticleCard } from '../components/ArticleCard';
import { filterArticles } from '../utils/filters';
import { StoryCategory } from '../types/content';
import { updatePageSeo, buildCanonicalUrl, generateBreadcrumbJsonLd } from '../utils/seo';
import { trackEvent } from '../utils/analytics';

interface StoriesPageProps {
  onNavigate: (path: string) => void;
}

export const StoriesPage: React.FC<StoriesPageProps> = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<StoryCategory | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'latest' | 'oldest' | 'readingTime'>('latest');

  useEffect(() => {
    updatePageSeo({
      title: "Cricket Stories and Player Histories | Tales from the Game",
      description: "Explore cricket stories about legendary players, iconic matches, forgotten careers and the moments that made the game unforgettable.",
      canonicalUrl: buildCanonicalUrl('/stories/'),
      ogType: 'website',
      jsonLd: generateBreadcrumbJsonLd([
        { name: 'Home', url: '/' },
        { name: 'Stories', url: '/stories/' },
      ]),
    });

    trackEvent({
      name: 'page_view',
      params: { path: '/stories/' },
    });
  }, []);

  const filteredArticles = filterArticles(ARTICLES, {
    category: selectedCategory,
    searchQuery,
    sortBy,
  });

  const categories: (StoryCategory | 'All')[] = [
    'All',
    'Forgotten Legends',
    'Iconic Stories',
    'Teams & Eras',
  ];

  return (
    <div className="min-h-screen py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <header className="max-w-3xl mb-12">
          <div className="text-xs font-semibold uppercase tracking-widest text-[#244936] mb-2 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-[#B89558]" />
            <span>The Publication Archive</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#191B19] tracking-tight mb-4">
            Stories from the Game
          </h1>
          <p className="text-base sm:text-lg text-[#686B66] font-sans leading-relaxed">
            Explore complete, verified stories examining cricket beyond the scorecard. From match-winning tactical promotions to overlooked swing bowlers and forgotten franchise champions.
          </p>
        </header>

        {/* Filter and Search Bar */}
        <div className="bg-white border border-[#DCD7CC] p-4 sm:p-6 mb-10 shadow-sm">
          <div className="flex flex-col lg:flex-row gap-4 lg:items-center justify-between">
            {/* Search Input */}
            <div className="relative grow max-w-md">
              <label htmlFor="search-stories" className="sr-only">
                Search Stories
              </label>
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-[#686B66]" />
              </div>
              <input
                id="search-stories"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by player, team, tournament, or keyword..."
                className="w-full pl-10 pr-4 py-2.5 bg-[#F5F1E8]/50 text-sm text-[#191B19] placeholder-[#686B66] border border-[#DCD7CC] focus:outline-none focus:ring-2 focus:ring-[#244936]"
              />
            </div>

            {/* Category Buttons */}
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#686B66] mr-1 hidden sm:inline">
                Category:
              </span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-xs font-semibold px-3 py-1.5 rounded-sm transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-[#244936] text-[#F5F1E8] shadow-sm'
                      : 'bg-[#F5F1E8] text-[#191B19] hover:bg-[#DCD7CC]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Sort Selector */}
            <div className="flex items-center gap-2 text-xs">
              <label htmlFor="sort-select" className="text-[#686B66] font-medium uppercase tracking-wider">
                Sort:
              </label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-[#F5F1E8] text-[#191B19] py-1.5 px-3 border border-[#DCD7CC] rounded-sm text-xs focus:outline-none focus:ring-1 focus:ring-[#244936]"
              >
                <option value="latest">Latest Published</option>
                <option value="oldest">Earliest Published</option>
                <option value="readingTime">Longest Read</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Metadata */}
        <div className="flex items-center justify-between mb-8 pb-3 border-b border-[#DCD7CC] text-xs text-[#686B66]">
          <span>
            Showing <strong className="text-[#191B19]">{filteredArticles.length}</strong> of{' '}
            <strong>{ARTICLES.length}</strong> verified launch stories
          </span>
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="text-[#244936] hover:underline font-semibold"
            >
              Clear search &ldquo;{searchQuery}&rdquo;
            </button>
          )}
        </div>

        {/* Articles Grid */}
        {filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article) => (
              <ArticleCard key={article.slug} article={article} onNavigate={onNavigate} />
            ))}
          </div>
        ) : (
          <div className="bg-white border border-[#DCD7CC] p-12 text-center max-w-lg mx-auto">
            <h3 className="font-serif text-xl font-bold text-[#191B19] mb-2">
              No matching stories found
            </h3>
            <p className="text-sm text-[#686B66] mb-6">
              We couldn&apos;t find any published story matching &ldquo;{searchQuery}&rdquo; in {selectedCategory}.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="bg-[#244936] text-[#F5F1E8] text-xs font-semibold px-4 py-2.5 uppercase tracking-wider hover:bg-[#1a3728]"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
