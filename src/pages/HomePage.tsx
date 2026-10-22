import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SITE_CONFIG } from '../config/siteConfig';
import { useCountry } from '../context/CountryContext';
import { NavPage } from '../components/Header';
import { CountrySelector } from '../components/CountrySelector';
import { WhatsAppButton } from '../components/WhatsAppButton';
import { FaqAccordion } from '../components/FaqAccordion';
import {
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Workflow,
  Search,
  Users,
  PenTool,
  Film,
  Layers,
  Image as ImageIcon,
  Compass,
  BarChart3,
  Clock,
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: NavPage) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const { countryType } = useCountry();
  const previewFaqs = SITE_CONFIG.faqs.slice(0, 5);

  const heroSlides = [
    {
      url: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1200&auto=format&fit=crop',
      title: 'Faceless Production Pipeline',
      desc: 'Scriptwriting, audio planning, visual assembly, and thumbnail strategy.'
    },
    {
      url: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=1200&auto=format&fit=crop',
      title: 'Professional Voice & Audio Engineering',
      desc: 'Recording clear narration, pacing sound design, and audio mastering.'
    },
    {
      url: 'https://images.unsplash.com/photo-1533750349077-cdcd106d2312?q=80&w=1200&auto=format&fit=crop',
      title: 'Digital Content Creation Desk',
      desc: 'Organizing video assets, timelines, and high-retention editing.'
    },
    {
      url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop',
      title: 'Systematic Topic Research & Strategy',
      desc: 'Evaluating search curiosity, audience intent, and 30-day calendars.'
    },
    {
      url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop',
      title: 'Creator Workflow & Collaboration',
      desc: 'Building standard operating procedures and managing production milestones.'
    },
    {
      url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop',
      title: 'Analytics & Data-Driven Improvement',
      desc: 'Auditing click-through rates, audience retention, and recommendation signals.'
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  return (
    <div className="flex flex-col min-h-screen transition-colors">
      {/* =========================================================================
          SECTION B: HERO SECTION
      ========================================================================= */}
      <section className="relative overflow-hidden pt-10 pb-16 lg:pt-16 lg:pb-24 border-b border-[var(--border-color)]">
        {/* Subtle background glow */}
        <div
          aria-hidden="true"
          className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-blue-600/10 via-cyan-500/5 to-transparent blur-3xl pointer-events-none"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Headlines & Actions */}
            <div className="lg:col-span-7 flex flex-col space-y-6 text-left">
              
              {/* Honest Category Tag */}
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-[var(--accent-text)]">
                <span className="tracking-wide">Paid Educational Mentorship Program</span>
                <span className="text-[var(--text-muted)]">·</span>
                <span className="text-[var(--text-secondary)]">Not an Agency</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold text-[var(--text-primary)] tracking-tight leading-[1.15] text-balance">
                {SITE_CONFIG.brand.homepageHeadline}
              </h1>

              {/* Supporting Headline */}
              <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed max-w-2xl">
                Learn the skills, workflows, and strategies behind faceless YouTube channels with guidance designed to help you build your own creator journey.
              </p>

              {/* CTAs */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => onNavigate('mentorship')}
                  className="px-6 py-3.5 rounded-xl bg-[var(--accent-primary)] hover:opacity-90 text-white font-semibold text-sm sm:text-base shadow-lg transition-all flex items-center gap-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]"
                >
                  <span>Explore the Mentorship</span>
                  <ArrowRight className="w-4 h-4 text-cyan-200" />
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate('curriculum')}
                  className="px-5 py-3.5 rounded-xl bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-elevated)] text-[var(--text-primary)] font-medium text-sm sm:text-base border border-[var(--border-color)] transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[var(--border-subtle)]"
                >
                  <span>View Curriculum</span>
                </button>

                <WhatsAppButton label="Chat on WhatsApp" variant="outline" />
              </div>

              {/* Trust statement */}
              <div className="pt-2 flex items-center gap-2 text-xs text-[var(--text-muted)]">
                <ShieldCheck className="w-4 h-4 text-[var(--accent-text)] shrink-0" />
                <span className="font-medium text-[var(--text-secondary)]">{SITE_CONFIG.brand.trustStatement}</span>
                <span>·</span>
                <span>Zero false promises. Real production education.</span>
              </div>

              {/* Inline Country Selector Quick Strip */}
              <div className="pt-4 mt-2 border-t border-[var(--border-subtle)]">
                <CountrySelector variant="segmented" />
              </div>
            </div>

            {/* Right Column: Hero Visual Asset Slideshow */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl p-1.5 bg-gradient-to-b from-[var(--border-color)] to-[var(--bg-surface)] border border-[var(--border-color)] shadow-xl">
                <div className="overflow-hidden rounded-[13px] relative aspect-[16/10] bg-[var(--bg-surface-subtle)]">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={currentSlide}
                      src={heroSlides[currentSlide].url}
                      alt={heroSlides[currentSlide].title}
                      initial={{ opacity: 0, scale: 1.02 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.6, ease: 'easeInOut' }}
                      className="w-full h-full object-cover absolute inset-0"
                      referrerPolicy="no-referrer"
                    />
                  </AnimatePresence>
                  
                  {/* Subtle contrast scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none z-10" />

                  {/* On-image caption badge */}
                  <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-black/80 backdrop-blur-md border border-white/10 text-xs z-20">
                    <div className="flex items-center justify-between text-slate-200">
                      <span className="font-semibold text-white flex items-center gap-1.5">
                        <Workflow className="w-3.5 h-3.5 text-cyan-400" />
                        {heroSlides[currentSlide].title}
                      </span>
                      <span className="font-mono text-cyan-300 text-[11px] tabular-nums font-semibold">
                        {currentSlide + 1} / {heroSlides.length}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-300 mt-1 line-clamp-1">
                      {heroSlides[currentSlide].desc}
                    </p>
                  </div>

                  {/* Slide Indicators */}
                  <div className="absolute top-3 right-3 flex items-center gap-1.5 z-20">
                    {heroSlides.map((_, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setCurrentSlide(idx)}
                        className={`h-1.5 rounded-full transition-all cursor-pointer ${
                          currentSlide === idx ? 'w-5 bg-cyan-400' : 'w-1.5 bg-white/40 hover:bg-white/70'
                        }`}
                        aria-label={`Go to slide ${idx + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION C: WHAT IS YOUTUBE AUTOMATION?
      ========================================================================= */}
      <section className="py-16 lg:py-24 bg-[var(--bg-surface-subtle)] border-b border-[var(--border-color)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--accent-text)] block mb-2">
              Foundational Understanding
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--text-primary)] tracking-tight">
              What Is YouTube Automation?
            </h2>
            <p className="text-[var(--text-secondary)] text-sm sm:text-base mt-3 leading-relaxed">
              YouTube automation is a content production methodology where creators organize and systematize individual video creation tasks into a disciplined, repeatable workflow.
            </p>
          </div>

          {/* Workflow Tasks Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {[
              {
                icon: Search,
                title: "Topic & Niche Research",
                desc: "Analyzing viewer search intent, competitive gaps, and long-term subject sustainability.",
              },
              {
                icon: Users,
                title: "Audience Analysis",
                desc: "Studying who watches, what questions they ask, and why they click certain videos.",
              },
              {
                icon: PenTool,
                title: "Scriptwriting & Story",
                desc: "Crafting structured hooks, informative context, and intentional retention arcs.",
              },
              {
                icon: Film,
                title: "Voice-Over & Audio",
                desc: "Planning clear spoken narration, sound design, and clean audio levels.",
              },
              {
                icon: Layers,
                title: "Video Editing & B-Roll",
                desc: "Assembling visual footage, motion graphics, transitions, and timeline pacing.",
              },
              {
                icon: ImageIcon,
                title: "Thumbnails & Titles",
                desc: "Designing high-CTR packaging that accurately represents content without clickbait.",
              },
              {
                icon: Compass,
                title: "Publishing & SEO",
                desc: "Configuring metadata, playlists, end-screens, and discoverability signals.",
              },
              {
                icon: BarChart3,
                title: "Analytics & Iteration",
                desc: "Auditing retention graphs, click-through rates, and making data-backed improvements.",
              },
            ].map((task, idx) => {
              const Icon = task.icon;
              return (
                <div
                  key={idx}
                  className="p-5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)] hover:border-[var(--accent-primary)]/50 transition-colors shadow-sm"
                >
                  <div className="w-9 h-9 rounded-lg bg-[var(--accent-surface)] border border-[var(--accent-primary)]/20 flex items-center justify-center mb-3 text-[var(--accent-text)]">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-1">{task.title}</h3>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{task.desc}</p>
                </div>
              );
            })}
          </div>

          {/* Honest Reality Box */}
          <div className="p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] max-w-4xl shadow-sm">
            <h4 className="text-sm font-bold text-[var(--text-primary)] mb-2 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[var(--accent-text)]" />
              <span>What YouTube Automation Is NOT:</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-[var(--text-secondary)]">
              <div className="flex items-start gap-2">
                <span className="text-red-500 font-bold shrink-0">✕</span>
                <span><strong>Not a "hands-off" money machine:</strong> Automation does not mean a channel runs itself on autopilot without your ongoing effort.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-red-500 font-bold shrink-0">✕</span>
                <span><strong>Requires human judgment:</strong> AI tools and software cannot replace editorial taste, fact-checking, and creative standards.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-red-500 font-bold shrink-0">✕</span>
                <span><strong>No guaranteed income:</strong> Earnings depend on audience traction, view volume, and strict platform compliance.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-red-500 font-bold shrink-0">✕</span>
                <span><strong>Not a management agency:</strong> Next Gen Creators teaches you how to build your own channels; we do not run them for you.</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION D: WHY LEARN WITH NEXT GEN CREATORS?
      ========================================================================= */}
      <section className="py-16 lg:py-24 border-b border-[var(--border-color)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--accent-text)] block mb-2">
              Core Educational Values
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--text-primary)] tracking-tight">
              Why Learn With Next Gen Creators?
            </h2>
            <p className="text-[var(--text-secondary)] text-sm sm:text-base mt-3 leading-relaxed text-balance">
              We focus on practical education and structured workflows, helping you develop real creator competencies rather than hyping unrealistic shortcuts.
            </p>
          </div>

          {/* 6 Benefit Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                number: "01",
                title: "Structured Learning",
                desc: "Understand the video production process step by step, from foundational concepts to advanced channel operations.",
              },
              {
                number: "02",
                title: "Practical Workflows",
                desc: "Learn how scripting, voiceover, editing, and thumbnail design fit together into an organized, repeatable pipeline.",
              },
              {
                number: "03",
                title: "Beginner-Friendly Guidance",
                desc: "Demystify complex video software and production jargon with clear, approachable explanations for newcomers.",
              },
              {
                number: "04",
                title: "Content Strategy",
                desc: "Discover how to evaluate search intent, brainstorm 50+ video concepts, and avoid unprofitable assumptions.",
              },
              {
                number: "05",
                title: "Production Skills",
                desc: "Develop core capabilities in hook formulation, narrative pacing, B-roll curation, and thumbnail psychology.",
              },
              {
                number: "06",
                title: "Channel Development",
                desc: "Learn how to read YouTube Studio analytics, improve retention dips, and navigate platform monetization policies.",
              },
            ].map((benefit) => (
              <div
                key={benefit.number}
                className="p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] hover:border-[var(--accent-primary)]/50 transition-all flex flex-col justify-between shadow-sm"
              >
                <div>
                  <span className="text-xs font-mono text-[var(--accent-text)] font-bold block mb-2">
                    {benefit.number}.
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-[var(--text-primary)] mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                    {benefit.desc}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[var(--border-subtle)] flex items-center text-xs text-[var(--text-muted)]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[var(--accent-text)] mr-1.5" />
                  <span>Educational competency</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION E: WHO IS THIS MENTORSHIP FOR?
      ========================================================================= */}
      <section className="py-16 lg:py-24 bg-[var(--bg-surface-subtle)] border-b border-[var(--border-color)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--accent-text)] block mb-2">
              Audience Alignment
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--text-primary)] tracking-tight">
              Who Is This Mentorship For?
            </h2>
            <p className="text-[var(--text-secondary)] text-sm sm:text-base mt-3 leading-relaxed">
              The mentorship is designed for individuals willing to put in the study time, practice their production craft, and build an authentic digital asset.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
            {[
              {
                title: "Complete Beginners",
                desc: "Individuals exploring YouTube automation who want a clear, honest overview without misleading internet myths.",
              },
              {
                title: "Aspiring Faceless Creators",
                desc: "Creators who prefer not to appear on camera and want to build documentary, educational, or informational channels.",
              },
              {
                title: "Digital Content Learners",
                desc: "Students and professionals seeking practical skills in scriptwriting, video editing, and digital media production.",
              },
              {
                title: "Freelancers & Editors",
                desc: "Service providers looking to offer scriptwriting, editing, or thumbnail design services to YouTube creators.",
              },
              {
                title: "Existing Channel Owners",
                desc: "Creators with inconsistent upload schedules seeking a systematized production pipeline to publish with consistency.",
              },
              {
                title: "International Students",
                desc: "Learners in Pakistan (PKR 50,000) and worldwide ($200 USD) looking for structured, transparent digital education.",
              },
            ].map((profile, i) => (
              <div
                key={i}
                className="p-5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)] flex flex-col justify-between shadow-sm"
              >
                <div>
                  <h3 className="text-sm sm:text-base font-semibold text-[var(--text-primary)] mb-1.5">
                    {profile.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                    {profile.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Student Commitment Expectation */}
          <div className="p-5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)] text-xs sm:text-sm text-[var(--text-secondary)] flex items-start gap-3 shadow-sm">
            <Clock className="w-5 h-5 text-[var(--accent-text)] shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-[var(--text-primary)] mb-0.5">Student Commitment Required:</p>
              <p>
                Enrolling in this mentorship requires personal dedication to research topics, write drafts, review edits, and apply feedback. Students must be prepared to learn and implement the coursework actively.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION F: MENTORSHIP OVERVIEW & WORKFLOW VISUAL
      ========================================================================= */}
      <section className="py-16 lg:py-24 border-b border-[var(--border-color)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-6">
              <span className="text-xs font-semibold uppercase tracking-wider text-[var(--accent-text)] block mb-2">
                Program Structure
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--text-primary)] tracking-tight">
                Mentorship Overview
              </h2>
              <p className="text-[var(--text-secondary)] text-sm sm:text-base mt-4 leading-relaxed">
                Next Gen Creators delivers a comprehensive educational framework centered on practical implementation. Rather than viewing passive video lectures, you will build actionable deliverables for each phase of video production.
              </p>

              <div className="mt-6 space-y-3 text-xs sm:text-sm text-[var(--text-secondary)]">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[var(--accent-text)] shrink-0 mt-0.5" />
                  <span><strong>10 Comprehensive Modules:</strong> From initial niche selection to long-term compliance and analytics.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[var(--accent-text)] shrink-0 mt-0.5" />
                  <span><strong>Hands-On Deliverables:</strong> Draft real scripts, storyboard concepts, and design thumbnail wireframes.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[var(--accent-text)] shrink-0 mt-0.5" />
                  <span><strong>Confirmed Details on Inquiry:</strong> Specific cohort schedules, pacing, and delivery format are confirmed directly via WhatsApp.</span>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <button
                  type="button"
                  onClick={() => onNavigate('mentorship')}
                  className="px-6 py-3 rounded-xl bg-[var(--accent-primary)] hover:opacity-90 text-white font-semibold text-sm transition-all shadow-md cursor-pointer"
                >
                  Explore the Mentorship Program
                </button>
                <WhatsAppButton label="Ask Questions on WhatsApp" variant="outline" />
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-2xl p-1.5 bg-gradient-to-b from-[var(--border-color)] to-[var(--bg-surface)] border border-[var(--border-color)] shadow-xl">
                <div className="overflow-hidden rounded-[13px] aspect-[4/3] bg-[var(--bg-surface-subtle)] relative">
                  <img
                    src="/src/assets/images/workflow_production_desk_1792619638466.jpg"
                    alt="Production planning desk with tablet storyboard, keyboard, and editing tools"
                    className="w-full h-full object-cover"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-black/80 backdrop-blur-md border border-white/10 text-xs">
                    <p className="font-semibold text-white">Systematic Production Workflows</p>
                    <p className="text-[11px] text-slate-300">Transform chaotic video creation into repeatable, high-quality output.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION G: CURRICULUM PREVIEW
      ========================================================================= */}
      <section className="py-16 lg:py-24 bg-[var(--bg-surface-subtle)] border-b border-[var(--border-color)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[var(--accent-text)] block mb-2">
                Syllabus Highlights
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--text-primary)] tracking-tight">
                Curriculum Framework Preview
              </h2>
              <p className="text-[var(--text-secondary)] text-sm sm:text-base mt-2 max-w-2xl">
                10 structured educational modules covering the technical and creative stages of building a YouTube channel.
              </p>
            </div>

            <button
              type="button"
              onClick={() => onNavigate('curriculum')}
              className="text-xs sm:text-sm font-semibold text-[var(--accent-text)] hover:opacity-80 flex items-center gap-1.5 cursor-pointer shrink-0"
            >
              <span>View All 10 Modules in Detail</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {SITE_CONFIG.curriculumModules.slice(0, 6).map((module) => (
              <div
                key={module.id}
                className="p-5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)] hover:border-[var(--accent-primary)]/40 transition-all flex flex-col justify-between shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs text-[var(--accent-text)] font-bold">
                      Module {module.number}
                    </span>
                    <span className="text-[10px] text-[var(--text-muted)]">Proposed Framework</span>
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-[var(--text-primary)] mb-2">
                    {module.title}
                  </h3>
                  <p className="text-xs text-[var(--text-secondary)] line-clamp-3 leading-relaxed">
                    {module.shortDesc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between text-[11px] text-[var(--text-muted)]">
                  <span className="text-[var(--accent-text)] font-medium">{module.topics.length} core topics</span>
                  <button
                    type="button"
                    onClick={() => onNavigate('curriculum')}
                    className="hover:text-[var(--text-primary)] cursor-pointer"
                  >
                    Details →
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <button
              type="button"
              onClick={() => onNavigate('curriculum')}
              className="px-6 py-2.5 rounded-xl bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-elevated)] text-[var(--text-primary)] font-medium text-xs sm:text-sm border border-[var(--border-color)] transition-colors cursor-pointer inline-flex items-center gap-2"
            >
              <span>Explore Complete 10-Module Syllabus</span>
              <ArrowRight className="w-4 h-4 text-[var(--accent-text)]" />
            </button>
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION H: PRICING PREVIEW WITH COUNTRY SELECTOR
      ========================================================================= */}
      <section className="py-16 lg:py-24 border-b border-[var(--border-color)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--accent-text)] block mb-2">
              Transparent Investment
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--text-primary)] tracking-tight">
              Official Mentorship Pricing
            </h2>
            <p className="text-[var(--text-secondary)] text-sm sm:text-base mt-3 leading-relaxed text-balance">
              Transparent, standardized tuition based on your country. No invented discounts, hidden surcharges, or fake price countdowns.
            </p>

            <div className="mt-6 flex justify-center">
              <CountrySelector variant="segmented" />
            </div>
          </div>

          {/* Pricing Cards Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            
            {/* Pakistan Card */}
            <div
              className={`p-7 rounded-2xl border transition-all ${
                countryType === 'PK'
                  ? 'bg-[var(--bg-surface)] border-[var(--accent-primary)] shadow-xl ring-2 ring-[var(--accent-primary)]/20'
                  : 'bg-[var(--bg-surface)] border-[var(--border-color)] opacity-95'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">
                  🇵🇰 Pakistan Rate
                </span>
                {countryType === 'PK' && (
                  <span className="text-xs font-mono bg-[var(--accent-surface)] text-[var(--accent-text)] px-3 py-1 rounded-full border border-[var(--accent-primary)]/30 font-bold">
                    Selected
                  </span>
                )}
              </div>

              <div className="mb-4">
                <span className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)] font-mono tabular-nums">
                  PKR 50,000
                </span>
                <span className="text-sm text-[var(--accent-text)] font-bold block mt-1.5">
                  Mentorship Fee: PKR 50,000
                </span>
              </div>

              <p className="text-sm sm:text-base text-[var(--text-secondary)] mb-6 leading-relaxed">
                Official mentorship tuition for students residing in Pakistan. Verified local payment guidance provided via WhatsApp.
              </p>

              <ul className="space-y-3 text-sm text-[var(--text-secondary)] mb-8 border-t border-[var(--border-subtle)] pt-4">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[var(--accent-text)] shrink-0" />
                  <span>Full 10-Module YouTube Automation Framework</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[var(--accent-text)] shrink-0" />
                  <span>Direct Inquiry & Guidance via WhatsApp</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[var(--accent-text)] shrink-0" />
                  <span>Hands-on homework & practical deliverables</span>
                </li>
              </ul>

              <WhatsAppButton
                label="Ask About Enrollment (PKR 50,000)"
                variant={countryType === 'PK' ? 'primary' : 'outline'}
                className="w-full text-center py-3 text-sm font-semibold"
              />
            </div>

            {/* International Card */}
            <div
              className={`p-7 rounded-2xl border transition-all ${
                countryType === 'INTL'
                  ? 'bg-[var(--bg-surface)] border-[var(--accent-primary)] shadow-xl ring-2 ring-[var(--accent-primary)]/20'
                  : 'bg-[var(--bg-surface)] border-[var(--border-color)] opacity-95'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">
                  🌐 International Rate
                </span>
                {countryType === 'INTL' && (
                  <span className="text-xs font-mono bg-[var(--accent-surface)] text-[var(--accent-text)] px-3 py-1 rounded-full border border-[var(--accent-primary)]/30 font-bold">
                    Selected
                  </span>
                )}
              </div>

              <div className="mb-4">
                <span className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)] font-mono tabular-nums">
                  $200 USD
                </span>
                <span className="text-sm text-[var(--accent-text)] font-bold block mt-1.5">
                  Mentorship Fee: $200 USD
                </span>
              </div>

              <p className="text-sm sm:text-base text-[var(--text-secondary)] mb-6 leading-relaxed">
                Official mentorship tuition for international students outside Pakistan. Verified international payment methods shared via WhatsApp.
              </p>

              <ul className="space-y-3 text-sm text-[var(--text-secondary)] mb-8 border-t border-[var(--border-subtle)] pt-4">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[var(--accent-text)] shrink-0" />
                  <span>Full 10-Module YouTube Automation Framework</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[var(--accent-text)] shrink-0" />
                  <span>Direct Inquiry & Guidance via WhatsApp</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[var(--accent-text)] shrink-0" />
                  <span>Hands-on homework & practical deliverables</span>
                </li>
              </ul>

              <WhatsAppButton
                label="Ask About Enrollment ($200 USD)"
                variant={countryType === 'INTL' ? 'primary' : 'outline'}
                className="w-full text-center"
              />
            </div>

          </div>

          <div className="mt-10 text-center">
            <button
              type="button"
              onClick={() => onNavigate('pricing')}
              className="text-xs sm:text-sm font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer inline-flex items-center gap-1.5"
            >
              <span>View Full Pricing & Enrollment Breakdown</span>
              <ArrowRight className="w-4 h-4 text-[var(--accent-text)]" />
            </button>
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION I: FREQUENTLY ASKED QUESTIONS PREVIEW
      ========================================================================= */}
      <section className="py-16 lg:py-24 bg-[var(--bg-surface-subtle)] border-b border-[var(--border-color)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-12">
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--accent-text)] block mb-2">
              Common Questions
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--text-primary)] tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-[var(--text-secondary)] text-sm sm:text-base mt-2">
              Honest answers to help you make an informed educational decision.
            </p>
          </div>

          <FaqAccordion items={previewFaqs} defaultOpenIndex={0} />

          <div className="mt-8 text-center">
            <button
              type="button"
              onClick={() => onNavigate('faq')}
              className="px-6 py-2.5 rounded-xl bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-elevated)] text-[var(--text-primary)] font-medium text-xs sm:text-sm border border-[var(--border-color)] transition-colors cursor-pointer inline-flex items-center gap-2 shadow-sm"
            >
              <span>View All 13 FAQs & Answers</span>
              <ArrowRight className="w-4 h-4 text-[var(--accent-text)]" />
            </button>
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION J: FINAL CTA (Completely Phone-Number Free)
      ========================================================================= */}
      <section className="py-16 lg:py-24 relative overflow-hidden bg-gradient-to-b from-[var(--bg-canvas)] to-[var(--bg-surface)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="text-xs font-semibold uppercase tracking-wider text-[var(--accent-text)] block mb-2">
            Get in Touch
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)] tracking-tight">
            Ready to Start Your YouTube Automation Journey?
          </h2>
          <p className="text-[var(--text-secondary)] text-sm sm:text-base mt-3 max-w-xl mx-auto leading-relaxed">
            Explore the mentorship, review the curriculum, and contact us to learn about the enrollment process.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <WhatsAppButton
              label="Discuss Enrollment on WhatsApp"
              variant="primary"
              className="px-7 py-3.5 text-base"
            />
            <button
              type="button"
              onClick={() => onNavigate('enrollment')}
              className="px-6 py-3.5 rounded-xl bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-elevated)] text-[var(--text-primary)] font-medium text-sm sm:text-base border border-[var(--border-color)] transition-all cursor-pointer shadow-sm"
            >
              <span>Review Enrollment Guide</span>
            </button>
          </div>

          <p className="text-xs text-[var(--text-muted)] mt-6">
            Official WhatsApp Admissions Desk · Messages reviewed and sent by you directly in WhatsApp.
          </p>
        </div>
      </section>

    </div>
  );
};
