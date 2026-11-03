import React, { useEffect } from 'react';
import { BookOpen, Compass, Award, Shield, Users, Feather } from 'lucide-react';
import { updatePageSeo, buildCanonicalUrl, generateBreadcrumbJsonLd } from '../utils/seo';
import { trackEvent } from '../utils/analytics';

interface AboutPageProps {
  onNavigate: (path: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  useEffect(() => {
    updatePageSeo({
      title: "About Tales from the Game | Cricket Storytelling",
      description: "Learn about Tales from the Game, an independent cricket storytelling publication exploring iconic moments, overlooked careers and cricket history.",
      canonicalUrl: buildCanonicalUrl('/about/'),
      ogType: 'website',
      jsonLd: generateBreadcrumbJsonLd([
        { name: 'Home', url: '/' },
        { name: 'About', url: '/about/' },
      ]),
    });

    trackEvent({
      name: 'page_view',
      params: { path: '/about/' },
    });
  }, []);

  return (
    <div className="min-h-screen py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-14 border-b border-[#DCD7CC] pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#244936]/10 border border-[#244936]/20 text-xs font-semibold uppercase tracking-widest text-[#244936] mb-3">
            <Feather className="w-3.5 h-3.5 text-[#B89558]" />
            <span>Publication Manifesto</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#191B19] tracking-tight mb-4">
            Why We Tell These Stories
          </h1>
          <p className="text-lg sm:text-xl font-serif italic text-[#686B66] leading-relaxed">
            &ldquo;Some Legends Are Never Forgotten. Others Never Got Their Due.&rdquo;
          </p>
        </header>

        {/* Narrative Core */}
        <div className="space-y-10 text-base sm:text-lg text-[#191B19]/90 font-sans leading-relaxed">
          <section className="space-y-4">
            <h2 className="font-serif text-2xl font-bold text-[#191B19]">
              Cricket Beyond the Scorecard
            </h2>
            <p>
              Cricket is among the most quantitatively obsessed sports on earth. Every run, dot ball, leg-bye, and field placement is recorded into databases that stretch across 140 years. Yet when we look solely at career averages and aggregate numbers, we miss the human reality of the game.
            </p>
            <p>
              A scorecard cannot capture the suffocating humidity of Wankhede on April 2, 2011, when a captain stepped out to face spin bowlers with the hopes of a billion people pressing onto his chest. A scorecard cannot explain why an eighteen-year-old fast bowler in Changa Banga bowled with such intoxicating speed before falling into a five-year abyss. Nor can it convey why an Indian left-arm seamer won a T20 World Cup, a Lord&apos;s Test, a Perth Test, and an IPL Purple Cap, yet was forgotten by casual observers who only measure greatness by century-Test careers.
            </p>
          </section>

          <section className="bg-white border border-[#DCD7CC] p-8 space-y-4">
            <h2 className="font-serif text-2xl font-bold text-[#244936]">
              The Heritage Archive
            </h2>
            <p className="text-sm sm:text-base text-[#686B66]">
              Tales from the Game was founded as an independent digital publication designed to evoke the tactile nostalgia of a vintage cricket quarterly, updated with the speed, typography, and visual rigor of modern editorial publishing.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 text-xs">
              <div className="border-l-2 border-[#244936] pl-3 space-y-1">
                <strong className="text-sm font-serif font-bold text-[#191B19] block">
                  Iconic Stories Examined Anew
                </strong>
                <p className="text-[#686B66]">
                  Deconstructing the tactical decisions, bowling changes, and psychological gambles behind cricket&apos;s most celebrated moments.
                </p>
              </div>
              <div className="border-l-2 border-[#B89558] pl-3 space-y-1">
                <strong className="text-sm font-serif font-bold text-[#191B19] block">
                  Forgotten &amp; Overlooked Legacies
                </strong>
                <p className="text-[#686B66]">
                  Giving due prominence to short incandescent careers, extinct championship franchises, and the players who shaped the game without receiving historical acclaim.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="font-serif text-2xl font-bold text-[#191B19]">
              Audience Hypotheses &amp; Reader Philosophy
            </h2>
            <p>
              We craft each investigation for readers who crave context rather than clickbait. Our working readership hypotheses include:
            </p>
            <ul className="list-disc list-inside space-y-2 text-sm sm:text-base text-[#686B66]">
              <li>Indian and international cricket purists who remember previous eras with vivid clarity.</li>
              <li>Younger fans who want to understand the tactical context behind iconic players and finishes.</li>
              <li>Readers fascinated by overlooked careers, bowling biomechanics, and franchise history.</li>
              <li>Followers of long-form narrative sports journalism who value substance over sensationalism.</li>
            </ul>
            <p className="text-xs text-[#686B66] italic pt-2">
              Note: These represent our foundational editorial hypotheses as we continue to test and refine our readership engagement.
            </p>
          </section>

          {/* Action Row */}
          <div className="pt-6 border-t border-[#DCD7CC] flex flex-wrap items-center justify-between gap-4">
            <a
              href="/stories/"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/stories/');
              }}
              className="bg-[#244936] text-[#F5F1E8] text-xs font-semibold px-6 py-3.5 uppercase tracking-wider hover:bg-[#1a3728] transition-colors"
            >
              Explore Our Launch Stories
            </a>

            <a
              href="/editorial-standards/"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/editorial-standards/');
              }}
              className="text-xs font-semibold text-[#244936] hover:underline"
            >
              Read Our Sourcing &amp; Fact-Checking Standards &rarr;
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
