import React, { useEffect } from 'react';
import { Shield, Lock, Eye, Mail, FileText, CheckCircle2 } from 'lucide-react';
import { updatePageSeo, buildCanonicalUrl, generateBreadcrumbJsonLd } from '../utils/seo';
import { trackEvent } from '../utils/analytics';

interface PrivacyPolicyPageProps {
  onNavigate: (path: string) => void;
}

export const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = ({ onNavigate }) => {
  useEffect(() => {
    updatePageSeo({
      title: "Privacy Policy | Tales from the Game",
      description: "Read the Tales from the Game privacy policy to understand what information the website collects, how it is used and how visitors can contact us.",
      canonicalUrl: buildCanonicalUrl('/privacy-policy/'),
      ogType: 'website',
      jsonLd: generateBreadcrumbJsonLd([
        { name: 'Home', url: '/' },
        { name: 'Privacy Policy', url: '/privacy-policy/' },
      ]),
    });

    trackEvent({
      name: 'page_view',
      params: { path: '/privacy-policy/' },
    });
  }, []);

  const effectiveDate = "March 24, 2024";

  return (
    <div className="min-h-screen py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-14 border-b border-[#DCD7CC] pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#244936]/10 border border-[#244936]/20 text-xs font-semibold uppercase tracking-widest text-[#244936] mb-3">
            <Lock className="w-3.5 h-3.5 text-[#244936]" />
            <span>Transparency &amp; Data Rights</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#191B19] tracking-tight mb-3">
            Privacy Policy
          </h1>
          <p className="text-xs text-[#686B66]">
            Effective Date: {effectiveDate} &bull; Publication: Tales from the Game
          </p>
        </header>

        {/* Policy Body */}
        <div className="space-y-10 text-sm sm:text-base text-[#191B19]/90 font-sans leading-relaxed">
          <section className="space-y-3">
            <h2 className="font-serif text-2xl font-bold text-[#191B19]">
              1. Our Data Commitment
            </h2>
            <p>
              Tales from the Game is an independent cricket storytelling publication. We believe editorial reading should be respectful, private, and uncluttered. This Privacy Policy outlines what information is collected when you browse our stories, subscribe to our dispatches, or get in touch.
            </p>
          </section>

          <section className="bg-white border border-[#DCD7CC] p-6 sm:p-8 space-y-4">
            <h2 className="font-serif text-2xl font-bold text-[#244936]">
              2. Information We Collect
            </h2>
            <div className="space-y-4 text-xs sm:text-sm text-[#686B66]">
              <div>
                <strong className="text-[#191B19] block mb-1">A. Newsletter Subscriptions:</strong>
                <p>
                  When you voluntarily subscribe to our newsletter, we collect your email address solely to deliver editorial cricket stories. We never sell, rent, or share your email with third-party advertisers. You may unsubscribe at any time via the link in every email.
                </p>
              </div>
              <div>
                <strong className="text-[#191B19] block mb-1">B. Correspondence &amp; Contact Desk:</strong>
                <p>
                  When you send us a message, story tip, or fact-checking correction, we collect your name, email, subject, and message content to respond to your inquiry.
                </p>
              </div>
              <div>
                <strong className="text-[#191B19] block mb-1">C. Technical Analytics &amp; Campaign Measurement:</strong>
                <p>
                  To measure which stories resonate with cricket fans, we utilize Google Analytics 4 and Meta Pixel integration points. These collect anonymized telemetry such as page views, scroll depth, session duration, and campaign attribution parameters (<code>utm_source</code>, <code>utm_medium</code>, <code>utm_campaign</code>). No personally identifiable information (PII) is transmitted.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl font-bold text-[#191B19]">
              3. Cookies and Tracking Technologies
            </h2>
            <p>
              Our website uses minimal, functional browser cookies to remember reading preferences and measure traffic volume through analytics providers. You can choose to disable cookies through your browser settings without impacting your ability to read our published stories.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl font-bold text-[#191B19]">
              4. Third-Party Integrations
            </h2>
            <p>
              Depending on optional platform configuration in production, services may include:
            </p>
            <ul className="list-disc list-inside space-y-2 text-[#686B66] text-xs sm:text-sm">
              <li><strong>Google Analytics 4:</strong> Web analytics provided by Google LLC for aggregate readership metrics.</li>
              <li><strong>Meta Pixel:</strong> Conversion measurement for Meta advertising experiments.</li>
              <li><strong>Email Dispatchers:</strong> Email infrastructure (e.g. Resend, Substack, Mailchimp) for subscriber delivery.</li>
            </ul>
          </section>

          <section className="bg-[#F5F1E8] border border-[#DCD7CC] p-6 space-y-3">
            <h2 className="font-serif text-xl font-bold text-[#191B19]">
              5. Contact for Privacy Inquiries
            </h2>
            <p className="text-xs sm:text-sm text-[#686B66]">
              If you have questions regarding data privacy or wish to request the deletion of your email address from our subscriber records, please reach out via our{' '}
              <a
                href="/contact/"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/contact/');
                }}
                className="text-[#244936] font-bold underline"
              >
                Contact Desk
              </a>{' '}
              with the subject &ldquo;General Inquiry&rdquo;.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
