import React from 'react';
import { SITE_CONFIG } from '../config/siteConfig';
import { NavPage } from '../components/Header';
import { WhatsAppButton } from '../components/WhatsAppButton';
import {
  Compass,
  CheckCircle2,
  BookOpen,
  ShieldCheck,
  Layers,
  Info,
  Globe,
  ExternalLink,
} from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: NavPage) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-colors">
      {/* Hero */}
      <div className="max-w-4xl mb-14">
        <span className="text-xs font-semibold uppercase tracking-wider text-[var(--accent-text)] block mb-2">
          About Next Gen Creators
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[var(--text-primary)] tracking-tight leading-tight">
          Helping Aspiring Creators Understand YouTube Automation.
        </h1>
        <p className="text-base sm:text-lg text-[var(--text-secondary)] mt-4 leading-relaxed max-w-3xl">
          {SITE_CONFIG.brand.mission}
        </p>
      </div>

      {/* Core Educational Philosophy */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <div className="p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-[var(--accent-surface)] border border-[var(--accent-primary)]/20 flex items-center justify-center mb-4 text-[var(--accent-text)]">
            <BookOpen className="w-5 h-5" />
          </div>
          <h2 className="text-base sm:text-lg font-bold text-[var(--text-primary)] mb-2">
            Practical Education
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
            We prioritize real, hands-on understanding. Students study how scripting, editing, and thumbnail design operate together in a real production environment.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-[var(--accent-surface)] border border-[var(--accent-primary)]/20 flex items-center justify-center mb-4 text-[var(--accent-text)]">
            <Layers className="w-5 h-5" />
          </div>
          <h2 className="text-base sm:text-lg font-bold text-[var(--text-primary)] mb-2">
            Systematic Workflows
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
            YouTube automation is about developing repeatable processes. We teach students how to manage their time, organize assets, and maintain consistent quality.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-[var(--accent-surface)] border border-[var(--accent-primary)]/20 flex items-center justify-center mb-4 text-[var(--accent-text)]">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h2 className="text-base sm:text-lg font-bold text-[var(--text-primary)] mb-2">
            Honest Expectations
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
            We categorically reject get-rich-quick narratives. Channel development requires dedication, study, testing, and compliance with YouTube platform policies.
          </p>
        </div>
      </div>

      {/* What We Are vs What We Are Not */}
      <div className="p-8 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] mb-16 shadow-sm">
        <h2 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] mb-6">
          Clear Distinction: Educational Mentorship vs Agency
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs sm:text-sm">
          <div className="space-y-3">
            <h3 className="font-bold text-[var(--accent-text)] text-sm">
              What Next Gen Creators DOES:
            </h3>
            <ul className="space-y-2 text-[var(--text-secondary)]">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[var(--accent-text)] shrink-0 mt-0.5" />
                <span>Teaches students how to plan, produce, and optimize faceless YouTube videos.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[var(--accent-text)] shrink-0 mt-0.5" />
                <span>Provides structured frameworks for niche research and content scheduling.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[var(--accent-text)] shrink-0 mt-0.5" />
                <span>Offers direct educational mentorship and inquiry support via WhatsApp.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[var(--accent-text)] shrink-0 mt-0.5" />
                <span>Helps creators develop long-term digital media competencies.</span>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="font-bold text-amber-500 text-sm">
              What Next Gen Creators DOES NOT DO:
            </h3>
            <ul className="space-y-2 text-[var(--text-secondary)]">
              <li className="flex items-start gap-2">
                <span className="text-red-500 font-bold shrink-0">✕</span>
                <span>We are NOT a YouTube channel management agency doing all the work for you.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 font-bold shrink-0">✕</span>
                <span>We do NOT promise instant monetization, viral view counts, or fixed income.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 font-bold shrink-0">✕</span>
                <span>We do NOT sell generic 'push-button' automated software schemes.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 font-bold shrink-0">✕</span>
                <span>We do NOT publish unverified testimonials or fabricated analytics screenshots.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Founder Profile / Leadership Transparency Box (No phone number) */}
      <div className="p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] mb-16 shadow-sm">
        <div className="flex items-center gap-2 text-[var(--text-primary)] font-semibold mb-2 text-xs">
          <Info className="w-4 h-4 text-[var(--accent-text)]" />
          <span>Founder & Mentorship Leadership:</span>
        </div>
        <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
          Next Gen Creators is led by practicing digital content strategists committed to transparent education. In accordance with our ethical transparency policy, we do not fabricate exaggerated claims, inflated student statistics, or unverified awards. For direct inquiries regarding leadership or curriculum, contact us directly via our verified WhatsApp admissions desk.
        </p>
      </div>

      {/* Platform Engineering & Technology Architecture: Injazify Studios */}
      <div className="p-8 sm:p-10 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] mb-16 shadow-sm relative overflow-hidden">
        {/* Subtle decorative gradient */}
        <div
          aria-hidden="true"
          className="absolute -right-20 -top-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"
        />

        <div className="relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[var(--border-subtle)]">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--accent-text)]">
                  Created & Engineered By
                </span>
                <span className="text-[var(--text-muted)]">·</span>
                <span className="text-xs text-[var(--text-secondary)] font-medium">Digital Product Studio</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)] tracking-tight">
                Injazify Studios
              </h2>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
                {SITE_CONFIG.studio.tagline}
              </p>
            </div>

            <a
              href={SITE_CONFIG.studio.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--accent-primary)] hover:opacity-90 text-white text-xs sm:text-sm font-semibold shadow-md transition-all shrink-0 cursor-pointer group"
            >
              <Globe className="w-4 h-4 text-cyan-200" />
              <span>Visit Injazify Studios</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-80 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>

          <div className="mt-6 space-y-4 text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
            <p>
              The Next Gen Creators web application was custom designed, engineered, and architected by <strong className="text-[var(--text-primary)]">Injazify Studios</strong>. Injazify is a modern digital engineering firm specializing in bespoke software applications, high-performance web platforms, enterprise systems, and creator growth technology.
            </p>
            <p>
              Injazify Studios delivers end-to-end digital craftsmanship, ensuring high-speed client-side performance, accessible responsive layouts across all viewports, a reactive multi-theme visual engine (Premium Dark, Clean Light, and Midnight Blue), dynamic country-aware tuition formatting, and a secure zero-friction WhatsApp admissions pipeline.
            </p>
          </div>

          {/* 3 Studio Capability Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 pt-6 border-t border-[var(--border-subtle)]">
            {SITE_CONFIG.studio.highlights.map((h, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-[var(--bg-surface-subtle)] border border-[var(--border-color)]"
              >
                <div className="flex items-center gap-2 text-[var(--text-primary)] font-bold text-xs sm:text-sm mb-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[var(--accent-text)] shrink-0" />
                  <span>{h.title}</span>
                </div>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  {h.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Strip */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-8 rounded-2xl bg-[var(--bg-surface)] border border-[var(--accent-primary)]/30 shadow-md">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-[var(--text-primary)] mb-1">
            Interested in Joining the Mentorship?
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
            Review the 10-module curriculum or discuss enrollment with our verified team.
          </p>
        </div>
        <div className="flex flex-wrap gap-3 shrink-0">
          <WhatsAppButton label="Chat on WhatsApp" variant="primary" />
          <button
            type="button"
            onClick={() => onNavigate('curriculum')}
            className="px-5 py-2.5 rounded-xl bg-[var(--bg-surface-subtle)] text-[var(--text-primary)] text-xs sm:text-sm border border-[var(--border-color)] hover:bg-[var(--bg-surface-elevated)] cursor-pointer"
          >
            <span>Explore Curriculum</span>
          </button>
        </div>
      </div>

    </div>
  );
};
