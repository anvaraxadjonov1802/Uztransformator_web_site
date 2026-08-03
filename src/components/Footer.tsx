import React from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface FooterProps {
  currentLang: Language;
}

export const Footer: React.FC<FooterProps> = ({ currentLang }) => {
  const t = translations[currentLang].footer;

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#020308]/72 px-6 backdrop-blur-[2px] py-10 text-slate-400 lg:px-12 lg:py-12">
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-[#0F5BFF]/65 to-transparent" />

      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-7 text-center">
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
          <img
            src="/assets/uztransformator-logo.png"
            alt="UZTRANSFORMATOR logotipi"
            className="h-14 w-14 object-contain drop-shadow-[0_0_14px_rgba(15,91,255,0.3)]"
          />

          <div className="text-center sm:text-left">
            <div className="font-display text-lg font-bold uppercase tracking-[0.14em] text-white sm:text-xl">
              UZTRANSFORMATOR
            </div>
            <div className="mt-1 text-[10px] font-medium uppercase tracking-[0.28em] text-slate-500 sm:text-[11px]">
              Built for power
            </div>
          </div>
        </div>

        <p className="text-center text-[10px] font-mono uppercase tracking-[0.18em] text-slate-400 sm:text-xs">
          {t.copyright}
        </p>
      </div>
    </footer>
  );
};
