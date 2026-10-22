import React from 'react';
import { motion } from 'motion/react';

export interface InjazifyLogoProps {
  /**
   * Size presets for the logo
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /**
   * Whether to display the editorial subtitle below the brand name
   * @default true
   */
  showSubtitle?: boolean;
  /**
   * Custom subtitle text
   * @default 'STUDIOS • إنجاز'
   */
  subtitleText?: string;
  /**
   * Enable or disable kinetic Framer Motion ambient animations
   * @default true
   */
  animated?: boolean;
  /**
   * Show glowing active radar core indicator dot
   * @default true
   */
  showPulseDot?: boolean;
  /**
   * Additional custom CSS classes for the container
   */
  className?: string;
  /**
   * Optional click handler (for routing, counters, modals)
   */
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const SIZE_CONFIGS = {
  sm: {
    container: 'h-8',
    emblemBox: 'w-7 h-7',
    emblemBorder: 'rounded-[6px]',
    emblemInner: 'inset-[1.5px] rounded-[4.5px]',
    letter: 'text-sm font-black',
    title: 'text-sm font-extrabold tracking-tight',
    dot: 'w-1.5 h-1.5',
    subtitle: 'text-[6.5px] tracking-[0.2em]',
    gap: 'space-x-2.5 rtl:space-x-reverse',
  },
  md: {
    container: 'h-10',
    emblemBox: 'w-10 h-10',
    emblemBorder: 'rounded-lg',
    emblemInner: 'inset-[2px] rounded-[6px]',
    letter: 'text-lg font-black',
    title: 'text-xl font-black tracking-tight',
    dot: 'w-1.5 h-1.5',
    subtitle: 'text-[8px] tracking-[0.22em]',
    gap: 'space-x-3 rtl:space-x-reverse',
  },
  lg: {
    container: 'h-12',
    emblemBox: 'w-12 h-12',
    emblemBorder: 'rounded-xl',
    emblemInner: 'inset-[2px] rounded-[9px]',
    letter: 'text-2xl font-black',
    title: 'text-2xl font-black tracking-tight',
    dot: 'w-2 h-2',
    subtitle: 'text-[9px] tracking-[0.24em]',
    gap: 'space-x-3.5 rtl:space-x-reverse',
  },
  xl: {
    container: 'h-16',
    emblemBox: 'w-16 h-16',
    emblemBorder: 'rounded-2xl',
    emblemInner: 'inset-[2.5px] rounded-[13px]',
    letter: 'text-3xl font-black',
    title: 'text-3xl font-black tracking-tight',
    dot: 'w-2.5 h-2.5',
    subtitle: 'text-[11px] tracking-[0.26em]',
    gap: 'space-x-4 rtl:space-x-reverse',
  },
};

/**
 * InjazifyLogo
 * High-performance animated brand identity component for Injazify Studios.
 * Features ambient glowing gradients, kinetic 3D micro-rotation, dynamic theme support via CSS variables,
 * and Framer Motion spring physics on user hover.
 */
export const InjazifyLogo: React.FC<InjazifyLogoProps> = ({
  size = 'md',
  showSubtitle = true,
  subtitleText = 'STUDIOS • إنجاز',
  animated = true,
  showPulseDot = true,
  className = '',
  onClick,
}) => {
  const config = SIZE_CONFIGS[size];

  return (
    <motion.div
      onClick={onClick}
      className={`group flex items-center ${config.gap} select-none cursor-pointer relative ${className}`}
      initial="initial"
      whileHover="hover"
      animate="animate"
    >
      {/* ─── 1. KINETIC EMBLEM BOX (THE "I" MONOGRAM) ───────────────────── */}
      <div className={`relative ${config.emblemBox} flex items-center justify-center shrink-0`}>
        {/* Soft Ambient Glow Aura (Floating Backlight) */}
        {animated && (
          <motion.div
            variants={{
              initial: { opacity: 0.35, scale: 0.95 },
              animate: {
                opacity: [0.35, 0.65, 0.35],
                scale: [0.95, 1.15, 0.95],
                transition: {
                  duration: 3.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                },
              },
              hover: { opacity: 0.9, scale: 1.25, transition: { duration: 0.3 } },
            }}
            className="absolute -inset-1 rounded-xl bg-gradient-to-tr from-[#00c6ff]/40 via-[#8b5cf6]/40 to-[#0072ff]/40 blur-md pointer-events-none"
          />
        )}

        {/* Outer Rotating Gradient Border Shell */}
        <motion.div
          variants={
            animated
              ? {
                  initial: { rotate: 0 },
                  animate: {
                    rotate: [0, 360],
                    transition: {
                      duration: 16,
                      repeat: Infinity,
                      ease: 'linear',
                    },
                  },
                  hover: {
                    rotate: 45,
                    scale: 1.06,
                    transition: { type: 'spring', stiffness: 350, damping: 18 },
                  },
                }
              : undefined
          }
          className={`absolute inset-0 ${config.emblemBorder} bg-gradient-to-tr from-[#00c6ff] via-purple-600 to-[#0072ff] opacity-90 group-hover:opacity-100 transition-opacity duration-300 shadow-md shadow-[#00c6ff]/20`}
        />

        {/* Secondary Shimmer Border Edge */}
        <div
          className={`absolute inset-[1px] ${config.emblemBorder} bg-gradient-to-br from-white/30 to-transparent dark:from-white/10 dark:to-transparent pointer-events-none z-10`}
        />

        {/* Inner High-Tech Adaptive Theme Core */}
        <div
          className={`absolute ${config.emblemInner} bg-[var(--bg-canvas)] flex items-center justify-center z-10 transition-colors duration-300 shadow-inner`}
        >
          {/* Subtle Cyber Grid Micro Pattern Overlay inside core */}
          <div className="absolute inset-0 opacity-[0.07] dark:opacity-[0.18] bg-[radial-gradient(#00c6ff_1px,transparent_1px)] [background-size:4px_4px] rounded-[inherit] pointer-events-none" />
        </div>

        {/* The Holographic "I" Monogram */}
        <motion.span
          variants={{
            initial: { scale: 1 },
            hover: {
              scale: 1.15,
              transition: { type: 'spring', stiffness: 400, damping: 15 },
            },
          }}
          className={`relative z-20 font-mono ${config.letter} text-transparent bg-clip-text bg-gradient-to-br from-[#00c6ff] via-purple-500 to-[#0072ff] tracking-wider select-none drop-shadow-sm`}
        >
          I
        </motion.span>

        {/* Micro Corner Accent Spark */}
        <span className="absolute top-0 right-0 w-1.5 h-1.5 rounded-full bg-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_8px_#00c6ff] z-30" />
      </div>

      {/* ─── 2. TYPOGRAPHIC LOGOTYPE & EDITORIAL SUBTITLE ─────────────── */}
      <div className="flex flex-col -space-y-0.5 justify-center leading-none">
        {/* Main Wordmark & Live Intelligence Status Beacon */}
        <div className="flex items-center space-x-1.5 rtl:space-x-reverse">
          <span
            className={`font-display ${config.title} text-[var(--text-primary)] group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#00c6ff] group-hover:to-purple-500 transition-all duration-300`}
          >
            Injazify
          </span>

          {/* Pulsing Visual Active Orb / Radar Core */}
          {showPulseDot && (
            <div className="relative flex items-center justify-center">
              <span className="absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75 animate-ping" />
              <span
                className={`relative inline-flex ${config.dot} rounded-full bg-gradient-to-r from-[#00c6ff] to-purple-500 group-hover:from-purple-400 group-hover:to-cyan-400 shadow-sm shadow-[#00c6ff]/50 transition-colors duration-300`}
              />
            </div>
          )}
        </div>

        {/* Premium Studio Editorial Identifier */}
        {showSubtitle && (
          <motion.span
            variants={{
              initial: { opacity: 0.85, letterSpacing: '0.22em' },
              hover: { opacity: 1, letterSpacing: '0.26em', transition: { duration: 0.3 } },
            }}
            className={`font-mono ${config.subtitle} font-bold text-[var(--text-secondary)] uppercase select-none transition-colors duration-300 group-hover:text-cyan-500/90 dark:group-hover:text-cyan-400/90`}
          >
            {subtitleText}
          </motion.span>
        )}
      </div>
    </motion.div>
  );
};

export default InjazifyLogo;
