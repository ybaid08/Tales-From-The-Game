import React, { useState, useEffect } from 'react';
import { Mail, MessageSquare, Send, CheckCircle2, AlertCircle, Info, Sparkles } from 'lucide-react';
import { updatePageSeo, buildCanonicalUrl, generateBreadcrumbJsonLd } from '../utils/seo';
import { trackEvent } from '../utils/analytics';

interface ContactPageProps {
  onNavigate: (path: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Story Suggestion');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [showConfigGuide, setShowConfigGuide] = useState(false);

  useEffect(() => {
    updatePageSeo({
      title: "Contact Tales from the Game | Share a Cricket Story",
      description: "Contact Tales from the Game with feedback, corrections, story suggestions and ideas about the players and moments cricket should remember.",
      canonicalUrl: buildCanonicalUrl('/contact/'),
      ogType: 'website',
      jsonLd: generateBreadcrumbJsonLd([
        { name: 'Home', url: '/' },
        { name: 'Contact', url: '/contact/' },
      ]),
    });

    trackEvent({
      name: 'page_view',
      params: { path: '/contact/' },
    });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!name.trim()) {
      setStatus('error');
      setErrorMessage('Please provide your name.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email.trim())) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    if (!message || message.trim().length < 20) {
      setStatus('error');
      setErrorMessage('Please include a detailed message or story tip (minimum 20 characters).');
      return;
    }

    setStatus('loading');

    setTimeout(() => {
      trackEvent({
        name: 'contact_form_submit',
        params: {
          subject,
          nameLength: name.length,
          messageLength: message.length,
        },
      });

      setStatus('success');
      setName('');
      setEmail('');
      setMessage('');
    }, 800);
  };

  return (
    <div className="min-h-screen py-12 sm:py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-10 text-center sm:text-left border-b border-[#DCD7CC] pb-6">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#244936] block mb-2">
            Editorial Correspondence
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#191B19] tracking-tight mb-3">
            Get in Touch
          </h1>
          <p className="text-sm sm:text-base text-[#686B66] font-sans leading-relaxed">
            Have a story idea about an overlooked player, a factual correction, or historical cricket insights to share? Our editorial desk reviews every dispatch.
          </p>
        </header>

        {status === 'success' ? (
          <div className="bg-white border-2 border-[#244936] p-8 sm:p-12 text-center space-y-4 shadow-sm">
            <CheckCircle2 className="w-12 h-12 text-[#244936] mx-auto" />
            <h2 className="font-serif text-2xl font-bold text-[#191B19]">
              Message Received
            </h2>
            <p className="text-sm text-[#686B66] max-w-md mx-auto leading-relaxed">
              Thank you for reaching out to Tales from the Game. If your message pertains to a factual inquiry, correction, or archival suggestion, our research team will evaluate it promptly.
            </p>
            <button
              type="button"
              onClick={() => setStatus('idle')}
              className="mt-4 bg-[#244936] text-[#F5F1E8] text-xs font-semibold px-6 py-3 uppercase tracking-wider hover:bg-[#1a3728]"
            >
              Send Another Message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white border border-[#DCD7CC] p-6 sm:p-10 space-y-6 shadow-sm" noValidate>
            {status === 'error' && (
              <div className="bg-red-50 border-l-4 border-red-700 p-4 flex items-center gap-3 text-red-800 text-xs">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label htmlFor="contact-name" className="block text-xs font-bold uppercase tracking-wider text-[#191B19] mb-1.5">
                  Your Name <span className="text-red-700">*</span>
                </label>
                <input
                  id="contact-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Rahul Dravid"
                  className="w-full px-3.5 py-2.5 bg-[#F5F1E8]/40 border border-[#DCD7CC] text-sm text-[#191B19] focus:outline-none focus:ring-2 focus:ring-[#244936]"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="contact-email" className="block text-xs font-bold uppercase tracking-wider text-[#191B19] mb-1.5">
                  Email Address <span className="text-red-700">*</span>
                </label>
                <input
                  id="contact-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="reader@example.com"
                  className="w-full px-3.5 py-2.5 bg-[#F5F1E8]/40 border border-[#DCD7CC] text-sm text-[#191B19] focus:outline-none focus:ring-2 focus:ring-[#244936]"
                  required
                />
              </div>
            </div>

            {/* Subject Selector */}
            <div>
              <label htmlFor="contact-subject" className="block text-xs font-bold uppercase tracking-wider text-[#191B19] mb-1.5">
                Enquiry Subject
              </label>
              <select
                id="contact-subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#F5F1E8]/40 border border-[#DCD7CC] text-sm text-[#191B19] focus:outline-none focus:ring-2 focus:ring-[#244936]"
              >
                <option value="Story Suggestion">Forgotten Player Story Suggestion</option>
                <option value="Fact-Checking Correction">Factual Correction or Archive Verification</option>
                <option value="Editorial Feedback">Editorial Feedback &amp; Critique</option>
                <option value="General Inquiry">General Correspondence / Press</option>
              </select>
            </div>

            {/* Message Body */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="contact-message" className="block text-xs font-bold uppercase tracking-wider text-[#191B19]">
                  Message or Story Brief <span className="text-red-700">*</span>
                </label>
                <span className="text-[11px] text-[#686B66]">
                  {message.length} characters (min 20)
                </span>
              </div>
              <textarea
                id="contact-message"
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Detail the match, player, or moment you believe deserves investigation, along with any relevant dates or source references..."
                className="w-full p-3.5 bg-[#F5F1E8]/40 border border-[#DCD7CC] text-sm text-[#191B19] focus:outline-none focus:ring-2 focus:ring-[#244936]"
                required
              />
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full sm:w-auto bg-[#244936] hover:bg-[#1a3728] text-[#F5F1E8] font-bold text-xs uppercase tracking-widest px-8 py-4 transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                {status === 'loading' ? (
                  <span>Dispatching Message...</span>
                ) : (
                  <>
                    <span>Submit Correspondence</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}

        {/* Backend Integration Guide Note (As per spec section 23 & 27) */}
        <div className="mt-8 p-4 bg-[#F5F1E8] border border-[#DCD7CC] text-xs text-[#686B66]">
          <button
            type="button"
            onClick={() => setShowConfigGuide(!showConfigGuide)}
            className="flex items-center gap-1.5 font-bold text-[#244936] hover:underline"
          >
            <Info className="w-3.5 h-3.5 text-[#B89558]" />
            <span>{showConfigGuide ? 'Hide Backend Integration Guide' : 'Production Backend Integration Guide'}</span>
          </button>
          {showConfigGuide && (
            <div className="mt-3 space-y-2 text-[11px] leading-relaxed">
              <p>
                In the deployed production environment, connect this form to a serverless email router such as Resend, SendGrid, or Formspree by mounting a POST endpoint at <code>/api/contact</code> and forwarding validated payloads.
              </p>
              <p>
                Ensure CORS and rate-limiting headers are applied. Never expose private API keys in client JavaScript.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
