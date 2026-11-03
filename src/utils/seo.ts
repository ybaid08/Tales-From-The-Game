import { Article } from '../types/content';

export const DEFAULT_SITE_URL = 'https://talesfromthegame.com';

export function getBaseSiteUrl(): string {
  if (typeof window !== 'undefined' && window.location?.origin && !window.location.origin.includes('localhost')) {
    return window.location.origin;
  }
  const envUrl = typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env.VITE_SITE_URL : undefined;
  return envUrl || DEFAULT_SITE_URL;
}

export function buildCanonicalUrl(pathname: string): string {
  const baseUrl = getBaseSiteUrl().replace(/\/$/, '');
  const cleanPath = pathname.startsWith('/') ? pathname : `/${pathname}`;
  // Ensure trailing slash for directory routes as per spec
  const withTrailingSlash = cleanPath.endsWith('/') ? cleanPath : `${cleanPath}/`;
  return `${baseUrl}${withTrailingSlash === '//' ? '/' : withTrailingSlash}`;
}

export function generateArticleJsonLd(article: Article, canonicalUrl: string) {
  const baseUrl = getBaseSiteUrl().replace(/\/$/, '');
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl,
    },
    headline: article.h1,
    description: article.metaDescription,
    image: [article.featuredImage.startsWith('http') ? article.featuredImage : `${baseUrl}${article.featuredImage}`],
    datePublished: article.datePublished,
    dateModified: article.dateModified,
    author: {
      '@type': 'Person',
      name: article.author.name,
      jobTitle: article.author.role,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Tales from the Game',
      url: baseUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/favicon.svg`,
      },
    },
    articleSection: article.category,
    keywords: [article.primaryKeyword, ...article.secondaryKeywords].join(', '),
    wordCount: article.wordCount,
  };
}

export function generateBreadcrumbJsonLd(items: { name: string; url: string }[]) {
  const baseUrl = getBaseSiteUrl().replace(/\/$/, '');
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${baseUrl}${item.url}`,
    })),
  };
}

export function generateWebsiteJsonLd() {
  const baseUrl = getBaseSiteUrl().replace(/\/$/, '');
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Tales from the Game',
    url: baseUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${baseUrl}/stories/?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}

export function updatePageSeo(options: {
  title: string;
  description: string;
  canonicalUrl: string;
  ogType?: 'website' | 'article';
  ogImage?: string;
  jsonLd?: Record<string, any> | Record<string, any>[];
}): void {
  if (typeof document === 'undefined') return;

  const { title, description, canonicalUrl, ogType = 'website', ogImage, jsonLd } = options;

  // Title
  document.title = title;

  // Meta description
  let metaDesc = document.querySelector('meta[name="description"]');
  if (!metaDesc) {
    metaDesc = document.createElement('meta');
    metaDesc.setAttribute('name', 'description');
    document.head.appendChild(metaDesc);
  }
  metaDesc.setAttribute('content', description);

  // Canonical link
  let linkCanonical = document.querySelector('link[rel="canonical"]');
  if (!linkCanonical) {
    linkCanonical = document.createElement('link');
    linkCanonical.setAttribute('rel', 'canonical');
    document.head.appendChild(linkCanonical);
  }
  linkCanonical.setAttribute('href', canonicalUrl);

  // Open Graph
  const setMeta = (property: string, content: string) => {
    let el = document.querySelector(`meta[property="${property}"]`);
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute('property', property);
      document.head.appendChild(el);
    }
    el.setAttribute('content', content);
  };

  setMeta('og:title', title);
  setMeta('og:description', description);
  setMeta('og:url', canonicalUrl);
  setMeta('og:type', ogType);
  if (ogImage) {
    setMeta('og:image', ogImage);
  }

  // Structured Data Script
  const existingScript = document.getElementById('jsonld-data');
  if (existingScript) {
    existingScript.remove();
  }

  if (jsonLd) {
    const script = document.createElement('script');
    script.id = 'jsonld-data';
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(jsonLd);
    document.head.appendChild(script);
  }
}
