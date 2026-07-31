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
      {/* Background Video / Tech Animation Placeholder */}
      <HeroAnimationPlaceholder />

      {/* Editorial Vector Signal Lines & Pulse Nodes */}
      <div className="absolute inset-0 pointer-events-none z-0 hidden sm:block">
        <svg className="w-full h-full">
          <path d="M-100 200 L400 200 L450 250" fill="none" stroke="#0F5BFF" strokeWidth="1" opacity="0.4" />
          <path d="M1124 500 L700 500 L650 450" fill="none" stroke="#0F5BFF" strokeWidth="1" opacity="0.4" />
          <circle cx="450" cy="250" r="3" fill="#0F5BFF" className="animate-pulse" />
          <circle cx="650" cy="450" r="3" fill="#0F5BFF" className="animate-pulse" />
        </svg>
      </div>

      {/* Decorative Side Vertical Indicator Bars */}
      <div className="absolute top-0 left-0 w-12 h-full bg-[#0F5BFF]/5 border-r border-[#0F5BFF]/10 pointer-events-none hidden lg:block" />
      <div className="absolute top-1/2 left-3 -translate-y-1/2 flex flex-col gap-3 z-10 pointer-events-none hidden lg:flex">
        <div className="w-1 h-8 bg-white/20 rounded-full" />
        <div className="w-1 h-20 bg-[#0F5BFF] rounded-full shadow-[0_0_12px_#0F5BFF]" />
        <div className="w-1 h-8 bg-white/20 rounded-full" />
      </div>

      {/* Hero Visual Foreground Content */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto text-center flex flex-col items-center justify-center px-1 pt-24 pb-20">
        {/* Entrance Animated Title Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, filter: 'blur(12px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center"
        >
          {/* Single-line responsive industrial title */}
          <h1 className="max-w-full whitespace-nowrap font-display font-black text-[clamp(2rem,8vw,8.4rem)] leading-none tracking-[-0.055em] uppercase mb-4 select-none text-white drop-shadow-[0_0_35px_rgba(15,91,255,0.38)]">
            {t.title}
          </h1>

          {/* Slogan in Wide Tracking */}
          <p className="mt-2 text-xs sm:text-sm md:text-base font-mono tracking-[0.6em] text-white/70 uppercase font-light text-center">
            {t.slogan}
          </p>
        </motion.div>
      </div>

      {/* Editorial Teaser Card in Lower Left */}
      <div className="hidden xl:block absolute bottom-12 left-12 z-10 w-80 text-left">
        <div className="p-5 rounded-r-xl bg-gradient-to-br from-[#08265F]/90 via-[#051438]/80 to-transparent border-l-2 border-[#0F5BFF] backdrop-blur-md shadow-2xl">
          <div className="text-[10px] uppercase tracking-widest text-[#00F0FF] font-bold mb-1 font-mono">
            SANOAT YECHIMLARI
          </div>
          <h3 className="text-sm font-bold text-white leading-tight">
            Yuqori quvvatli transformatorlar
          </h3>
          <p className="text-xs text-slate-300 mt-1 leading-relaxed">
            O'zbekistondagi eng yirik transformator ishlab chiqaruvchi zavod.
          </p>
        </div>
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
