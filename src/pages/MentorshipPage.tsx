import React from 'react';
import { SITE_CONFIG } from '../config/siteConfig';
import { useCountry } from '../context/CountryContext';
import { NavPage } from '../components/Header';
import { CountrySelector } from '../components/CountrySelector';
import { WhatsAppButton } from '../components/WhatsAppButton';
import { ModuleCard } from '../components/ModuleCard';
import {
  CheckCircle2,
  BookOpen,
} from 'lucide-react';

interface MentorshipPageProps {
  onNavigate: (page: NavPage) => void;
}

export const MentorshipPage: React.FC<MentorshipPageProps> = ({ onNavigate }) => {
  const { countryType } = useCountry();

  return (
    <div className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-colors">
      {/* Header Banner */}
      <div className="max-w-4xl mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-[var(--accent-text)] mb-3">
          <BookOpen className="w-4 h-4" />
          <span>Educational Offering & Mentorship Architecture</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[var(--text-primary)] tracking-tight leading-tight">
          Learn the Process Behind Building a Faceless YouTube Channel.
        </h1>
        <p className="text-base sm:text-lg text-[var(--text-secondary)] mt-4 leading-relaxed max-w-3xl">
          Explore the skills and workflows involved in YouTube automation and develop a practical understanding of how to plan, produce, publish, and improve content.
        </p>

        <div className="mt-6 flex flex-wrap gap-4 items-center">
          <WhatsAppButton label="Ask About Mentorship" variant="primary" />
          <button
            type="button"
            onClick={() => onNavigate('curriculum')}
            className="px-5 py-2.5 rounded-xl bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-elevated)] text-[var(--text-primary)] font-medium text-sm border border-[var(--border-color)] transition-colors cursor-pointer"
          >
            <span>View 10 Modules Breakdown</span>
          </button>
        </div>
      </div>

      {/* Visual & Key Philosophy Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16 pb-16 border-b border-[var(--border-color)]">
        <div className="lg:col-span-7 space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] tracking-tight">
            Realistic, Implementation-First Education
          </h2>
          <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
            Many online courses pitch YouTube as a passive goldmine where software does everything for you. Next Gen Creators exists to teach the real craft: creating compelling digital media through systematic workflows.
          </p>
          <p className="text-sm text-[var(--text-muted)] leading-relaxed">
            By studying the applicable material and practicing, students develop a grounded understanding of:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {[
              "How to research viable channel topics with real viewer interest",
              "How to plan and organize videos with structured retention arcs",
              "How to coordinate content production efficiently",
              "How to create high-CTR titles and thumbnails without deceit",
              "How to review channel analytics and identify retention dips",
              "How to build repeatable content workflows and quality SOPs",
            ].map((outcome, i) => (
              <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[var(--text-secondary)]">
                <CheckCircle2 className="w-4 h-4 text-[var(--accent-text)] shrink-0 mt-0.5" />
                <span>{outcome}</span>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-600 dark:text-amber-300 leading-relaxed">
            <strong>Important Reality Check:</strong> We do not promise guaranteed income, monetization approval, viral videos, subscriber counts, or a specific timeframe for success. Results depend on your individual effort, consistency, and market dynamics.
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="rounded-2xl p-1.5 bg-gradient-to-b from-[var(--border-color)] to-[var(--bg-surface)] border border-[var(--border-color)] shadow-xl">
            <div className="overflow-hidden rounded-[13px] aspect-[4/3] relative bg-[var(--bg-surface-subtle)]">
              <img
                src="/src/assets/images/analytics_planning_station_1792619638724.jpg"
                alt="Creator planning station with analytics and schedule"
                className="w-full h-full object-cover"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-black/80 backdrop-blur-md border border-white/10 text-xs">
                <p className="font-semibold text-white">Analytics-Driven Iteration</p>
                <p className="text-[11px] text-slate-300">Evaluate audience retention data to continuously refine content quality.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Proposed Curriculum Framework Section */}
      <div className="mb-16 pb-16 border-b border-[var(--border-color)]">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--accent-text)] block mb-1">
              Curriculum Architecture
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] tracking-tight">
              Proposed 10-Module Framework
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1">
              Click any module to inspect core topics covered and practical outputs.
            </p>
          </div>

          <span className="text-[11px] font-mono text-[var(--text-muted)] bg-[var(--bg-surface)] px-3 py-1.5 rounded-lg border border-[var(--border-color)] shrink-0">
            Framework Subject to Confirmation
          </span>
        </div>

        <div className="space-y-4">
          {SITE_CONFIG.curriculumModules.map((module, i) => (
            <ModuleCard key={module.id} module={module} initiallyOpen={i === 0} />
          ))}
        </div>
      </div>

      {/* Transparent Mentorship Enrollment Block (Completely Phone-Number Free) */}
      <div className="p-8 sm:p-10 rounded-2xl bg-[var(--bg-surface)] border border-[var(--accent-primary)]/30 shadow-xl relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--accent-text)] block">
              Enrollment Inquiries
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] tracking-tight">
              Review Tuition & Inquire Directly on WhatsApp
            </h3>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
              We maintain open communication with all prospective students. Before committing to enrollment, you can review the official fee for your region, ask questions about upcoming cohort schedules, and confirm the delivery format.
            </p>

            <div className="pt-2">
              <CountrySelector variant="segmented" />
            </div>

            <div className="pt-3 flex items-center gap-3">
              <WhatsAppButton label="Ask About Mentorship" variant="primary" className="px-6 py-3" />
              <button
                type="button"
                onClick={() => onNavigate('pricing')}
                className="px-5 py-3 rounded-xl bg-[var(--bg-surface-subtle)] text-[var(--text-primary)] hover:bg-[var(--bg-surface-elevated)] text-xs sm:text-sm border border-[var(--border-color)] cursor-pointer"
              >
                <span>Full Pricing Details</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 p-6 rounded-xl bg-[var(--bg-surface-subtle)] border border-[var(--border-color)]">
            <h4 className="text-xs font-semibold uppercase text-[var(--text-secondary)] mb-2">
              Official Program Tuition
            </h4>
            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-color)] flex items-center justify-between">
                <div>
                  <span className="text-xs text-[var(--text-primary)] font-medium block">Pakistan Fee</span>
                  <span className="text-[11px] text-[var(--text-muted)]">Local residents</span>
                </div>
                <span className="font-mono font-bold text-[var(--text-primary)] text-sm">PKR 50,000</span>
              </div>

              <div className="p-3 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-color)] flex items-center justify-between">
                <div>
                  <span className="text-xs text-[var(--text-primary)] font-medium block">International Fee</span>
                  <span className="text-[11px] text-[var(--text-muted)]">Outside Pakistan</span>
                </div>
                <span className="font-mono font-bold text-[var(--text-primary)] text-sm">$200 USD</span>
              </div>
            </div>

            <p className="text-[11px] text-[var(--text-muted)] mt-4 leading-relaxed">
              No unconfirmed enrollment deadlines or false scarcity claims. Direct discussion via verified WhatsApp admissions desk.
            </p>
          </div>

        </div>
      </div>

    </div>
  );
};
