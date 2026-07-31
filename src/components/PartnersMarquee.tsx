import React from 'react';
import { Language } from '../types';
import { partnersData } from '../data/partners';
import { translations } from '../data/translations';

interface PartnersMarqueeProps {
  currentLang: Language;
}

export const PartnersMarquee: React.FC<PartnersMarqueeProps> = ({ currentLang }) => {
  const t = translations[currentLang].partners;
  const marqueeItems = [...partnersData, ...partnersData, ...partnersData];

  return (
    <section
      id="partners"
      className="relative overflow-hidden border-y border-[#0F5BFF]/15 bg-[#020308] py-20 lg:py-28"
    >
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[250px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#08265F]/30 blur-[140px]" />

      <div className="relative z-10 mx-auto mb-12 max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="font-display text-3xl font-extrabold uppercase tracking-tight text-white sm:text-5xl">
          {t.title}
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-300 sm:text-base">
          {t.subtitle}
        </p>
      </div>

      <div className="relative w-full overflow-hidden py-4">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-16 bg-gradient-to-r from-[#020308] via-[#020308]/80 to-transparent sm:w-36" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-16 bg-gradient-to-l from-[#020308] via-[#020308]/80 to-transparent sm:w-36" />

        <div className="animate-marquee-left flex w-max items-center gap-5 sm:gap-8">
          {marqueeItems.map((partner, index) => (
            <a
              key={`${partner.id}-${index}`}
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${partner.name} rasmiy saytiga o‘tish`}
              title={partner.name}
              className="group flex h-24 min-w-[190px] items-center justify-center overflow-hidden rounded-2xl border border-[#0F5BFF]/20 bg-white px-6 shadow-[0_12px_30px_rgba(0,0,0,0.35)] transition-all duration-300 hover:-translate-y-1 hover:border-[#00F0FF]/70 hover:shadow-[0_16px_34px_rgba(15,91,255,0.18)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF] sm:h-28 sm:min-w-[230px] sm:px-8"
            >
              <img
                src={partner.logo}
                alt={partner.name}
                loading="lazy"
                className="max-h-[68px] w-full max-w-[175px] object-contain object-center transition-transform duration-300 group-hover:scale-[1.045] sm:max-h-[78px] sm:max-w-[195px]"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
