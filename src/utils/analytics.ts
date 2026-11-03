/**
 * Analytics & Growth Marketing Event Dispatcher
 * Handles GA4 (Google Analytics 4), Meta Pixel, and UTM tracking.
 */

export interface UTMParams {
  source?: string;
  medium?: string;
  campaign?: string;
  content?: string;
  term?: string;
}

export function getUTMParams(searchString: string = window.location.search): UTMParams {
  const params = new URLSearchParams(searchString);
  const utm: UTMParams = {};
  if (params.get('utm_source')) utm.source = params.get('utm_source')!;
  if (params.get('utm_medium')) utm.medium = params.get('utm_medium')!;
  if (params.get('utm_campaign')) utm.campaign = params.get('utm_campaign')!;
  if (params.get('utm_content')) utm.content = params.get('utm_content')!;
  if (params.get('utm_term')) utm.term = params.get('utm_term')!;
  return utm;
}

export interface AnalyticsEvent {
  name: 'page_view' | 'view_story' | 'newsletter_signup' | 'contact_form_submit' | 'internal_story_click' | 'scroll_depth';
  params?: Record<string, any>;
}

export function trackEvent(event: AnalyticsEvent): void {
  const gaId = typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env.VITE_GA_MEASUREMENT_ID : undefined;
  const metaPixelId = typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env.VITE_META_PIXEL_ID : undefined;

  // Google Analytics 4 tracking if gtag is available
  if (typeof window !== 'undefined' && (window as any).gtag && gaId) {
    try {
      (window as any).gtag('event', event.name, event.params || {});
    } catch (e) {
      // safe fallback
    }
  }

  // Meta Pixel tracking if fbq is available
  if (typeof window !== 'undefined' && (window as any).fbq && metaPixelId) {
    try {
      if (event.name === 'page_view') {
        (window as any).fbq('track', 'PageView');
      } else if (event.name === 'view_story') {
        (window as any).fbq('track', 'ViewContent', {
          content_name: event.params?.title,
          content_category: event.params?.category,
        });
      } else if (event.name === 'newsletter_signup') {
        (window as any).fbq('track', 'Lead', {
          content_name: 'Newsletter Subscription',
        });
      }
    } catch (e) {
      // safe fallback
    }
  }

  // Record into session history for growth marketing verification
  if (typeof window !== 'undefined') {
    const history = (window as any).__GROWTH_EVENT_LOG__ || [];
    history.push({
      event: event.name,
      params: event.params,
      timestamp: new Date().toISOString(),
      utm: getUTMParams(),
    });
    (window as any).__GROWTH_EVENT_LOG__ = history;
  }
}
