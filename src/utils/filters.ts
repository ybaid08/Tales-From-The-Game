import { Article, StoryCategory } from '../types/content';

export interface FilterOptions {
  category?: StoryCategory | 'All';
  searchQuery?: string;
  sortBy?: 'latest' | 'oldest' | 'readingTime';
}

export function filterArticles(articles: Article[], options: FilterOptions): Article[] {
  const { category = 'All', searchQuery = '', sortBy = 'latest' } = options;
  const query = searchQuery.trim().toLowerCase();

  const scored = articles
    .filter((article) => {
      if (!article.published) return false;
      if (category !== 'All' && article.category !== category) return false;
      return true;
    })
    .map((article) => {
      let score = 0;
      if (!query) return { article, score: 1 };

      const inTitle = article.title.toLowerCase().includes(query);
      const inPrimary = article.primaryKeyword.toLowerCase().includes(query);
      const inExcerpt = article.excerpt.toLowerCase().includes(query);
      const inSecondary = article.secondaryKeywords.some((k) => k.toLowerCase().includes(query));
      const inContent = article.sections.some(
        (s) => s.heading.toLowerCase().includes(query) || s.paragraphs.some((p) => p.toLowerCase().includes(query))
      );

      if (inTitle) score += 100;
      if (inPrimary) score += 50;
      if (inExcerpt) score += 20;
      if (inSecondary) score += 15;
      if (inContent) score += 5;

      return { article, score };
    })
    .filter((item) => item.score > 0);

  return scored
    .sort((a, b) => {
      if (query && a.score !== b.score) {
        return b.score - a.score;
      }
      if (sortBy === 'latest') {
        if (a.article.order !== undefined && b.article.order !== undefined) {
          return a.article.order - b.article.order;
        }
        return new Date(b.article.datePublished).getTime() - new Date(a.article.datePublished).getTime();
      }
      if (sortBy === 'oldest') {
        return new Date(a.article.datePublished).getTime() - new Date(b.article.datePublished).getTime();
      }
      if (sortBy === 'readingTime') {
        return b.article.readingTime - a.article.readingTime;
      }
      return 0;
    })
    .map((item) => item.article);
}
