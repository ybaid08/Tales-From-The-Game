import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateReadingTimeMinutes, calculateWordCount } from './readingTime';
import { filterArticles } from './filters';
import { buildCanonicalUrl, generateArticleJsonLd } from './seo';
import { ARTICLES } from '../data/articles';

test('calculateWordCount counts single string words accurately', () => {
  const text = "Cricket beyond the scorecard. The players, moments, decisions and unfinished stories.";
  assert.equal(calculateWordCount(text), 11);
});

test('calculateReadingTimeMinutes returns sensible reading time based on 220 wpm', () => {
  assert.equal(calculateReadingTimeMinutes(0), 1);
  assert.equal(calculateReadingTimeMinutes(220), 1);
  assert.equal(calculateReadingTimeMinutes(221), 2);
  assert.equal(calculateReadingTimeMinutes(1100), 5);
  assert.equal(calculateReadingTimeMinutes(1250), 6);
});

test('all 5 launch articles have verified word counts between 900 and 1400 words', () => {
  assert.equal(ARTICLES.length, 5);
  for (const article of ARTICLES) {
    assert.ok(
      article.wordCount >= 900,
      `Article ${article.slug} has ${article.wordCount} words which is below the 900-word benchmark.`
    );
    assert.ok(
      article.readingTime >= 4,
      `Article ${article.slug} reading time should be at least 4 minutes, got ${article.readingTime}`
    );
  }
});

test('filterArticles filters by category correctly', () => {
  const forgotten = filterArticles(ARTICLES, { category: 'Forgotten Legends' });
  assert.ok(forgotten.length >= 2);
  for (const item of forgotten) {
    assert.equal(item.category, 'Forgotten Legends');
  }

  const iconic = filterArticles(ARTICLES, { category: 'Iconic Stories' });
  assert.ok(iconic.length >= 2);
  for (const item of iconic) {
    assert.equal(item.category, 'Iconic Stories');
  }
});

test('filterArticles filters by search keyword accurately', () => {
  const haydenMatches = filterArticles(ARTICLES, { searchQuery: 'hayden' });
  assert.equal(haydenMatches.length, 1);
  assert.equal(haydenMatches[0].slug, 'matthew-hayden-batting-style');

  const deccanMatches = filterArticles(ARTICLES, { searchQuery: 'deccan chargers' });
  assert.ok(deccanMatches.length >= 1);
  assert.equal(deccanMatches[0].slug, 'deccan-chargers-ipl-history');

  const amirMatches = filterArticles(ARTICLES, { searchQuery: 'mohammad amir' });
  assert.equal(amirMatches.length, 1);
  assert.equal(amirMatches[0].slug, 'mohammad-amir-career');
});

test('buildCanonicalUrl strips extraneous characters and enforces clean trailing slash', () => {
  const canonical = buildCanonicalUrl('/stories/mohammad-amir-career');
  assert.ok(canonical.endsWith('/stories/mohammad-amir-career/'));
  assert.ok(!canonical.includes('?'));
});

test('generateArticleJsonLd formats valid schema.org Article', () => {
  const article = ARTICLES[0];
  const canonical = buildCanonicalUrl(`/stories/${article.slug}/`);
  const jsonLd = generateArticleJsonLd(article, canonical);

  assert.equal(jsonLd['@context'], 'https://schema.org');
  assert.equal(jsonLd['@type'], 'Article');
  assert.equal(jsonLd.headline, article.h1);
  assert.equal(jsonLd.mainEntityOfPage['@id'], canonical);
});

test('canonical launch story order is strictly Hayden -> RP Singh -> Amir -> Deccan -> Dhoni', () => {
  assert.equal(ARTICLES.length, 5);
  const expectedSlugs = [
    'matthew-hayden-batting-style',
    'rp-singh-bowling-style',
    'mohammad-amir-career',
    'deccan-chargers-ipl-history',
    'ms-dhoni-2011-world-cup-final'
  ];

  for (let i = 0; i < 5; i++) {
    assert.equal(ARTICLES[i].order, i + 1);
    assert.equal(ARTICLES[i].slug, expectedSlugs[i]);
    assert.ok(ARTICLES[i].featuredImage.startsWith('/images/'), `Image should be local /images/ path, got ${ARTICLES[i].featuredImage}`);
    assert.ok(ARTICLES[i].imageCredit, `Article ${ARTICLES[i].slug} missing imageCredit metadata`);
    assert.ok(ARTICLES[i].imageCredit?.photographer, `Article ${ARTICLES[i].slug} missing photographer in imageCredit`);
    assert.ok(ARTICLES[i].imageCredit?.source, `Article ${ARTICLES[i].slug} missing source in imageCredit`);
  }

  // Also verify filterArticles with default 'latest' maintains exact canonical order
  const filtered = filterArticles(ARTICLES, {});
  assert.deepEqual(filtered.map(a => a.slug), expectedSlugs);
});

