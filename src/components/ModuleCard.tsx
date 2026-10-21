import React, { useState } from 'react';
import { CurriculumModule } from '../config/siteConfig';
import { ChevronDown, CheckCircle2, Award, BookOpen } from 'lucide-react';

interface ModuleCardProps {
  module: CurriculumModule;
  initiallyOpen?: boolean;
}

export const ModuleCard: React.FC<ModuleCardProps> = ({
  module,
  initiallyOpen = false,
}) => {
  const [isOpen, setIsOpen] = useState(initiallyOpen);

  return (
    <div
      className={`rounded-xl border transition-all duration-200 overflow-hidden ${
        isOpen
          ? 'bg-[var(--bg-surface)] border-[var(--accent-primary)]/50 shadow-md'
          : 'bg-[var(--bg-surface)] border-[var(--border-color)] hover:border-[var(--accent-primary)]/40'
      }`}
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className="w-full flex items-start justify-between gap-4 p-5 text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)]"
      >
        <div className="flex items-start gap-4">
          <div className="w-11 h-11 rounded-xl bg-[var(--accent-surface)] border border-[var(--accent-primary)]/30 flex items-center justify-center shrink-0 text-[var(--accent-text)] font-mono font-bold text-base shadow-sm">
            {module.number}
          </div>
          <div>
            <span className="text-xs font-mono tracking-wider uppercase text-[var(--accent-text)] font-bold block mb-1">
              Module {module.id}
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-[var(--text-primary)] tracking-tight">
              {module.title}
            </h3>
            <p className="text-sm sm:text-base text-[var(--text-secondary)] mt-1.5 leading-relaxed">
              {module.shortDesc}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0 pt-1">
          <span className="hidden sm:inline-block text-xs font-semibold text-[var(--text-muted)] group-hover:text-[var(--accent-text)]">
            {isOpen ? 'Hide Details' : 'View Topics'}
          </span>
          <ChevronDown
            className={`w-5 h-5 text-[var(--text-muted)] transition-transform duration-200 ${
              isOpen ? 'rotate-180 text-[var(--accent-text)]' : ''
            }`}
          />
        </div>
      </button>

      {isOpen && (
        <div className="px-5 pb-5 pt-3 border-t border-[var(--border-subtle)] bg-[var(--bg-surface-subtle)]">
          <div className="mb-5">
            <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[var(--text-primary)] mb-3 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[var(--accent-text)]" />
              <span>Core Topics Covered</span>
            </h4>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2.5 text-sm text-[var(--text-secondary)] leading-relaxed">
              {module.topics.map((topic, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[var(--accent-text)] shrink-0 mt-1" />
                  <span>{topic}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-sm">
            <div className="flex items-center gap-2.5">
              <Award className="w-5 h-5 text-[var(--accent-text)] shrink-0" />
              <span className="text-[var(--text-secondary)]">
                <strong className="text-[var(--text-primary)] font-semibold">Practical Deliverable:</strong> {module.practicalDeliverable}
              </span>
            </div>
            <span className="text-xs font-mono font-semibold text-[var(--accent-text)] bg-[var(--accent-surface)] px-2.5 py-1 rounded-md border border-[var(--accent-primary)]/20 shrink-0 self-start sm:self-auto">
              Hands-on Project
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
