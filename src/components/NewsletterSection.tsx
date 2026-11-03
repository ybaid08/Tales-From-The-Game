import React, { useState } from 'react';
import { Mail, CheckCircle2, AlertCircle, Info, ShieldCheck, ArrowRight } from 'lucide-react';
import { trackEvent } from '../utils/analytics';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [showIntegrationDetails, setShowIntegrationDetails] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email.trim())) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address (e.g. reader@example.com).');
      return;
    }

    setStatus('loading');

    // Simulate realistic asynchronous network request
    setTimeout(() => {
      // Dispatch growth marketing analytics event
      trackEvent({
        name: 'newsletter_signup',
        params: {
          location: 'homepage_newsletter_section',
        },
      });

      setStatus('success');
      setEmail('');
    }, 800);
  };

  return (
    <section className="bg-[#244936] text-[#F5F1E8] py-16 sm:py-20 relative overflow-hidden" aria-labelledby="newsletter-heading">
      {/* Decorative Heritage Corner Accent */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-radial from-[#B89558]/15 to-transparent pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#B89558] mb-3">
          The Dispatches Archive
        </span>

        <h2 id="newsletter-heading" className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
          Every Great Game Has Another Story.
        </h2>

        <p className="text-sm sm:text-base text-[#F5F1E8]/90 max-w-2xl mx-auto mb-8 font-sans leading-relaxed">
          Get thoughtful cricket stories, forgotten careers and iconic moments delivered directly to your inbox. No tabloid gossip, no match score spam. Just deep narrative cricket journalism.
        </p>

        {status === 'success' ? (
          <div className="bg-[#1b3729] border border-[#B89558]/50 p-6 rounded-sm max-w-lg mx-auto text-left flex items-start gap-4">
            <CheckCircle2 className="w-6 h-6 text-[#B89558] shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h3 className="font-serif text-lg font-bold text-[#F5F1E8]">
                Welcome to the Archive
              </h3>
              <p className="text-xs text-[#F5F1E8]/80 leading-relaxed font-sans">
                Thank you for subscribing. When our next deep dive into forgotten cricket history is dispatched, you will receive it first.
              </p>
              <button
                type="button"
                onClick={() => setStatus('idle')}
                className="mt-2 text-xs font-semibold text-[#B89558] hover:underline"
              >
                Register another email
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-3" noValidate>
            <div className="flex flex-col sm:flex-row gap-2">
              <label htmlFor="newsletter-email" className="sr-only">
                Email Address
              </label>
              <div className="relative grow">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Mail className="h-4 w-4 text-[#686B66]" />
                </div>
                <input
                  id="newsletter-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  disabled={status === 'loading'}
                  className="w-full pl-10 pr-4 py-3.5 bg-white text-[#191B19] placeholder-[#686B66] text-sm rounded-sm focus:outline-none focus:ring-2 focus:ring-[#B89558] border border-[#DCD7CC]"
                  aria-invalid={status === 'error'}
                  aria-describedby={status === 'error' ? 'newsletter-error' : undefined}
                />
              </div>
              <button
                type="submit"
                disabled={status === 'loading'}
                className="bg-[#B89558] hover:bg-[#a68449] text-[#080B12] font-semibold text-sm px-6 py-3.5 rounded-sm transition-colors uppercase tracking-wider flex items-center justify-center gap-2 shrink-0 cursor-pointer disabled:opacity-75"
              >
                {status === 'loading' ? (
                  <span>Subscribing...</span>
                ) : (
                  <>
                    <span>Subscribe</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

            {status === 'error' && (
              <p id="newsletter-error" className="text-xs text-[#fca5a5] flex items-center justify-center gap-1.5 mt-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </p>
            )}

            <p className="text-[11px] text-[#F5F1E8]/70 flex items-center justify-center gap-2 pt-2">
              <ShieldCheck className="w-3.5 h-3.5 text-[#B89558]" />
              <span>We respect your inbox. Unsubscribe anytime. Strictly zero advertising spam.</span>
            </p>
          </form>
        )}

        {/* Integration Documentation Note for Production Deployment */}
        <div className="mt-8 pt-6 border-t border-[#F5F1E8]/10 text-center">
          <button
            type="button"
            onClick={() => setShowIntegrationDetails(!showIntegrationDetails)}
            className="text-[11px] uppercase tracking-wider text-[#B89558] hover:underline inline-flex items-center gap-1"
          >
            <Info className="w-3.5 h-3.5" />
            <span>{showIntegrationDetails ? 'Hide Service Integration Info' : 'Production Email Service Integration Guide'}</span>
          </button>

          {showIntegrationDetails && (
            <div className="mt-3 text-left bg-[#080B12]/80 border border-[#B89558]/30 p-4 rounded text-xs text-[#F5F1E8]/80 font-mono space-y-1.5">
              <p className="font-sans font-semibold text-[#B89558]">Production Email Service Setup:</p>
              <p className="font-sans text-[11px]">
                To link live subscriber sign-ups to Mailchimp, Substack, Beehiiv, or Resend, configure a secure backend API endpoint (e.g. <code>/api/newsletter/subscribe</code>) or webhook with the corresponding secret API key in production environment variables.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
