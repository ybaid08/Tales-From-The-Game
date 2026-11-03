import React, { useEffect } from 'react';
import { ShieldCheck, BookOpen, CheckSquare, AlertTriangle, Scale, Camera } from 'lucide-react';
import { updatePageSeo, buildCanonicalUrl, generateBreadcrumbJsonLd } from '../utils/seo';
import { trackEvent } from '../utils/analytics';

interface EditorialStandardsPageProps {
  onNavigate: (path: string) => void;
}

export const EditorialStandardsPage: React.FC<EditorialStandardsPageProps> = ({ onNavigate }) => {
  useEffect(() => {
    updatePageSeo({
      title: "Editorial Standards and Corrections | Tales from the Game",
      description: "Read the editorial principles Tales from the Game follows for cricket research, factual accuracy, sourcing, corrections and responsible storytelling.",
      canonicalUrl: buildCanonicalUrl('/editorial-standards/'),
      ogType: 'website',
      jsonLd: generateBreadcrumbJsonLd([
        { name: 'Home', url: '/' },
        { name: 'Editorial Standards', url: '/editorial-standards/' },
      ]),
    });

    trackEvent({
      name: 'page_view',
      params: { path: '/editorial-standards/' },
    });
  }, []);

  return (
    <div className="min-h-screen py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-14 border-b border-[#DCD7CC] pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#244936]/10 border border-[#244936]/20 text-xs font-semibold uppercase tracking-widest text-[#244936] mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-[#244936]" />
            <span>Journalistic Integrity</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#191B19] tracking-tight mb-4">
            Our Editorial Standards
          </h1>
          <p className="text-sm sm:text-base text-[#686B66] font-sans leading-relaxed">
            Cricket history is built upon collective memory and cold, verifiable facts. Here is how Tales from the Game conducts research, verifies scores, distinguishes interpretation from documented record, and corrects errors.
          </p>
        </header>

        {/* Content Pillars */}
        <div className="space-y-12 text-sm sm:text-base text-[#191B19]/90 font-sans leading-relaxed">
          {/* Sourcing Hierarchy */}
          <section className="bg-white border border-[#DCD7CC] p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#244936]">
              <Scale className="w-4 h-4 text-[#B89558]" />
              <span>Primary Sourcing Hierarchy</span>
            </div>
            <h2 className="font-serif text-2xl font-bold text-[#191B19]">
              Where Our Evidence Comes From
            </h2>
            <p className="text-[#686B66]">
              We do not rely on second-hand internet rumours, uncited Wikipedia entries, or AI-generated generalities. For every match scorecard, bowling spell, and tactical milestone, our researchers verify against the following authoritative hierarchy:
            </p>
            <ol className="list-decimal list-inside space-y-2 text-[#191B19] font-medium pt-2">
              <li><strong>Official Governing Bodies:</strong> Match logs, tribunal awards, and tournament records published directly by the ICC, BCCI, Cricket Australia, and member boards.</li>
              <li><strong>Authoritative Cricket Almanacks:</strong> Official editions of Wisden Cricketers&apos; Almanack and certified historical sports archives.</li>
              <li><strong>Verified Statistical Databases:</strong> ESPNcricinfo Statsguru and CricketArchive ball-by-ball scorecards.</li>
              <li><strong>First-Party Accounts:</strong> Direct player autobiographies, post-match press conferences, and verified first-hand interviews from credible sports correspondents.</li>
            </ol>
          </section>

          {/* Fact vs Opinion */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#B89558]">
              <CheckSquare className="w-4 h-4 text-[#244936]" />
              <span>Delineation of Facts vs Interpretation</span>
            </div>
            <h2 className="font-serif text-2xl font-bold text-[#191B19]">
              Separating Documented Reality from Narrative Hypotheses
            </h2>
            <p>
              In examining overlooked players and unfinished careers, the temptation exists to slip into romantic hyperbole. At Tales from the Game, we maintain strict editorial boundaries:
            </p>
            <ul className="list-disc list-inside space-y-2 text-[#686B66]">
              <li><strong className="text-[#191B19]">Demonstrated Record vs What-If:</strong> When discussing interrupted careers like Mohammad Amir&apos;s or RP Singh&apos;s, we clearly separate what they achieved on the pitch from hypothetical projections of what they might have accomplished.</li>
              <li><strong className="text-[#191B19]">Sensitive &amp; Legal Subjects:</strong> In covering controversies such as the 2010 spot-fixing scandal or the 2012 Deccan Chargers termination, we rely exclusively on formal judicial and tribunal findings without sensationalizing human misfortune.</li>
              <li><strong className="text-[#191B19]">Zero Invented Quotations:</strong> We never fabricate player quotes or attribute unverified statements. If a quotation cannot be verified through audio, video, or reputable contemporary press reports, it does not appear in our articles.</li>
            </ul>
          </section>

          {/* Corrections Policy */}
          <section className="bg-white border border-[#DCD7CC] p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#244936]">
              <AlertTriangle className="w-4 h-4 text-[#B89558]" />
              <span>Corrections &amp; Transparency</span>
            </div>
            <h2 className="font-serif text-2xl font-bold text-[#191B19]">
              Our Commitment to Prompt Correction
            </h2>
            <p className="text-[#686B66]">
              Despite obsessive auditing, factual discrepancies in dates, ball counts, or player stats may occasionally occur. When an error is identified:
            </p>
            <ul className="list-disc list-inside space-y-2 text-[#686B66]">
              <li>We update the published article immediately with the corrected record.</li>
              <li>We update the article&apos;s <code>dateModified</code> timestamp in our schema metadata.</li>
              <li>Readers who spot errors are encouraged to submit them via our <a href="/contact/" onClick={(e) => { e.preventDefault(); onNavigate('/contact/'); }} className="text-[#244936] font-semibold underline">Contact Desk</a> with subject &ldquo;Fact-Checking Correction&rdquo;.</li>
            </ul>
          </section>

          {/* Photography Ethics */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#B89558]">
              <Camera className="w-4 h-4 text-[#244936]" />
              <span>Imagery &amp; Archival Representation</span>
            </div>
            <h2 className="font-serif text-2xl font-bold text-[#191B19]">
              Visual Integrity &amp; Responsible Asset Usage
            </h2>
            <p className="text-[#686B66]">
              We adhere strictly to ethical image standards:
            </p>
            <ul className="list-disc list-inside space-y-2 text-[#686B66]">
              <li>We use only legitimately licensed editorial photography and high-resolution atmospheric cricket captures.</li>
              <li>We never present synthetic AI-generated player portraits as authentic historical photographs.</li>
              <li>Every image features descriptive, accessible alt text and editorial contextual captions.</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};
