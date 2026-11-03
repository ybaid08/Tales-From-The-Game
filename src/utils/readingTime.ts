/**
 * Calculates word count and reading time for article content.
 * Average reading speed: ~220 words per minute.
 */
export function calculateWordCount(textOrSections: string | { paragraphs: string[] }[]): number {
  if (typeof textOrSections === 'string') {
    return textOrSections.trim().split(/\s+/).filter(Boolean).length;
  }
  
  let total = 0;
  for (const section of textOrSections) {
    for (const paragraph of section.paragraphs) {
      total += paragraph.trim().split(/\s+/).filter(Boolean).length;
    }
  }
  return total;
}

export function calculateReadingTimeMinutes(wordCount: number, wordsPerMinute: number = 220): number {
  if (wordCount <= 0) return 1;
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
}
