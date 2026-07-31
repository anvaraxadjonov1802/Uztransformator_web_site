import React from 'react';
import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { HeroAnimationPlaceholder } from './HeroAnimationPlaceholder';

interface HeroProps {
  currentLang: Language;
}

export const Hero: React.FC<HeroProps> = ({ currentLang }) => {
  const t = translations[currentLang].hero;

  const handleScrollClick = () => {
    const nextSection = document.getElementById('intro');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-[100svh] w-full flex flex-col items-center justify-center bg-[#020308] overflow-hidden px-4"
    >
      {/* Optimized hero cable animation. Text remains a separate code layer. */}
      <HeroAnimationPlaceholder
        videoMp4Src="/assets/hero/uztransformator-hero.mp4"
        videoWebmSrc="/assets/hero/uztransformator-hero.webm"
        posterSrc="/assets/hero/uztransformator-hero-poster.webp"
      />

      {/* Hero Visual Foreground Content */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto text-center flex flex-col items-center justify-center px-1 pt-24 pb-20">
        {/* Entrance Animated Title Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, filter: 'blur(12px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.2, delay: 4.45, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center"
        >
          {/* Single-line responsive industrial title */}
          <h1 className="max-w-full whitespace-nowrap font-display font-black text-[clamp(1.85rem,7.6vw,8rem)] leading-none tracking-[-0.055em] uppercase mb-4 select-none text-white drop-shadow-[0_0_42px_rgba(15,91,255,0.42)]">
            {t.title}
          </h1>

          {/* Slogan in Wide Tracking */}
          <p className="mt-2 text-xs sm:text-sm md:text-base font-mono tracking-[0.42em] sm:tracking-[0.58em] text-white/70 uppercase font-light text-center">
            {t.slogan}
          </p>
        </motion.div>
      </div>

      {/* Downward Scroll Indicator (Coded, not part of background video) */}
      <button
        type="button"
        onClick={handleScrollClick}
        aria-label={t.scrollDown}
        className="absolute bottom-8 z-10 flex flex-col items-center gap-2 text-slate-400 hover:text-[#00F0FF] transition-colors group cursor-pointer focus:outline-none"
      >
        <span className="text-[10px] font-mono tracking-widest uppercase opacity-80 group-hover:opacity-100">
          {t.scrollDown}
        </span>
        <div className="w-8 h-8 rounded-full border border-[#0F5BFF]/30 bg-[#08265F]/40 flex items-center justify-center shadow-[0_0_10px_rgba(15,91,255,0.2)] group-hover:border-[#00F0FF] group-hover:shadow-[0_0_15px_rgba(0,240,255,0.5)] transition-all">
          <ChevronDown className="w-4 h-4 text-[#00F0FF] animate-bounce" />
        </div>
      </button>

      {/* Bottom Border Glow Line */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#0F5BFF]/50 to-transparent" />
    </section>
  );
};
