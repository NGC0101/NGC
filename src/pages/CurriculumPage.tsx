import React, { useState, useEffect } from 'react';
import { NavPage } from '../components/Header';
import { ModuleCard } from '../components/ModuleCard';
import { WhatsAppButton } from '../components/WhatsAppButton';
import { Filter } from 'lucide-react';
import { getSiteData } from '../services/siteStore';
import { CurriculumModule } from '../config/siteConfig';

interface CurriculumPageProps {
  onNavigate: (page: NavPage) => void;
}

export const CurriculumPage: React.FC<CurriculumPageProps> = ({ onNavigate }) => {
  const [filterPhase, setFilterPhase] = useState<'all' | 'foundation' | 'production' | 'growth'>('all');
  const [curriculum, setCurriculum] = useState<CurriculumModule[]>(getSiteData().curriculum);

  useEffect(() => {
    const handleUpdate = () => {
      setCurriculum(getSiteData().curriculum);
    };
    window.addEventListener('site_data_updated', handleUpdate);
    return () => window.removeEventListener('site_data_updated', handleUpdate);
  }, []);

  const filteredModules = curriculum.filter((m) => {
    if (filterPhase === 'foundation') return m.id <= 3;
    if (filterPhase === 'production') return m.id >= 4 && m.id <= 6;
    if (filterPhase === 'growth') return m.id >= 7;
    return true;
  });

  return (
    <div className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-colors">
      {/* Header */}
      <div className="max-w-4xl mb-12">
        <span className="text-xs font-semibold uppercase tracking-wider text-[var(--accent-text)] block mb-2">
          Comprehensive Syllabus
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[var(--text-primary)] tracking-tight leading-tight">
          YouTube Automation Curriculum
        </h1>
        <p className="text-base sm:text-lg text-[var(--text-secondary)] mt-4 leading-relaxed max-w-3xl">
          A structured 10-module framework taking you through every stage of developing a faceless YouTube channel—from niche research and storytelling to production workflows and analytics.
        </p>

        {/* Phase Filter Controls */}
        <div className="mt-8 flex flex-wrap items-center gap-2">
          <span className="text-xs text-[var(--text-muted)] mr-2 flex items-center gap-1.5 font-medium">
            <Filter className="w-3.5 h-3.5" />
            <span>Filter Phase:</span>
          </span>
          {[
            { id: 'all', label: 'All 10 Modules' },
            { id: 'foundation', label: 'Phase 1: Foundation (01–03)' },
            { id: 'production', label: 'Phase 2: Production (04–06)' },
            { id: 'growth', label: 'Phase 3: Growth & Ops (07–10)' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setFilterPhase(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                filterPhase === tab.id
                  ? 'bg-[var(--accent-primary)] text-white font-semibold shadow-sm'
                  : 'bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-color)]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Modules List */}
      <div className="space-y-4 mb-16">
        {filteredModules.map((module) => (
          <ModuleCard key={module.id} module={module} initiallyOpen={false} />
        ))}
      </div>

      {/* Curriculum Disclaimer & Questions Box */}
      <div className="p-8 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm">
        <div className="max-w-2xl space-y-2">
          <h3 className="text-lg font-bold text-[var(--text-primary)]">
            Have Questions About What Is Included?
          </h3>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
            This framework represents our proposed educational architecture. We encourage all prospective students to ask questions regarding upcoming cohort dates, tools, and specific module depth prior to enrolling.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 shrink-0">
          <WhatsAppButton label="Ask Curriculum Questions" variant="primary" />
          <button
            type="button"
            onClick={() => onNavigate('pricing')}
            className="px-5 py-2.5 rounded-xl bg-[var(--bg-surface-subtle)] hover:bg-[var(--bg-surface-elevated)] text-[var(--text-primary)] text-xs sm:text-sm border border-[var(--border-color)] transition-colors cursor-pointer"
          >
            <span>View Pricing</span>
          </button>
        </div>
      </div>
    </div>
  );
};
