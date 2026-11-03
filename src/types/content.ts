export type StoryCategory = 'Iconic Stories' | 'Iconic Moments' | 'Forgotten Legends' | 'Teams & Eras';

export interface Author {
  name: string;
  role: string;
  bio?: string;
}

export interface CitationSource {
  title: string;
  publisher: string;
  context: string;
  year?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ArticleStat {
  label: string;
  value: string;
  context: string;
}

export interface ArticleSection {
  id: string;
  heading: string;
  subheading?: string;
  paragraphs: string[];
  quote?: {
    text: string;
    attribution?: string;
  };
  keyStats?: ArticleStat[];
}

export interface ImageCredit {
  photographer: string;
  source: string;
  sourceUrl: string;
  license: string;
  licenseUrl?: string;
  note?: string;
}

export interface Article {
  order: number; // Canonical launch story order (1 to 5)
  title: string;
  slug: string;
  excerpt: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  seoTitle: string;
  metaDescription: string;
  h1: string;
  category: StoryCategory;
  subCategory?: string;
  featuredImage: string;
  featuredImageAlt: string;
  featuredImageCaption?: string;
  imageCredit?: ImageCredit;
  author: Author;
  datePublished: string;
  dateModified: string;
  readingTime: number; // in minutes
  wordCount: number;
  sections: ArticleSection[];
  conclusion: string[];
  nextStoryRecommendation: {
    slug: string;
    title: string;
    reason: string;
  };
  sources: CitationSource[];
  faqs: FAQItem[];
  relatedArticles: string[]; // slugs
  published: boolean;
}

export interface FutureTopic {
  title: string;
  category: StoryCategory;
  theme: string;
  centralQuestion: string;
  status: 'Editorial Research' | 'Archival Sourcing' | 'Fact-Checking' | 'Drafting';
  proposedKeyword: string;
}
