import React from 'react';
import { motion } from 'motion/react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface AboutSectionProps {
  currentLang: Language;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ currentLang }) => {
  const t = translations[currentLang].about;

  return (
    <section id="about" className="relative overflow-hidden bg-[#020308] py-20 lg:py-32">
      <div className="pointer-events-none absolute left-[-12rem] top-1/2 h-[28rem] w-[28rem] -translate-y-1/2 rounded-full bg-[#0F5BFF]/10 blur-[135px]" />
      <div className="pointer-events-none absolute right-[-10rem] top-1/3 h-[24rem] w-[24rem] rounded-full bg-[#4020D8]/10 blur-[130px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative py-10 sm:py-14 lg:py-16">
          <svg
            aria-hidden="true"
            viewBox="0 0 1200 520"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-0 hidden h-full w-full overflow-visible sm:block"
          >
            <defs>
              <linearGradient id="about-cyan" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#7EFFFF" />
                <stop offset="45%" stopColor="#00E8FF" />
                <stop offset="100%" stopColor="#00A8FF" />
              </linearGradient>
              <linearGradient id="about-blue" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#74B8FF" />
                <stop offset="50%" stopColor="#1D72FF" />
                <stop offset="100%" stopColor="#3B45FF" />
              </linearGradient>
              <linearGradient id="about-violet" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#A6B1FF" />
                <stop offset="50%" stopColor="#6E71FF" />
                <stop offset="100%" stopColor="#8C47FF" />
              </linearGradient>
              <filter id="about-glow-soft" x="-80%" y="-250%" width="260%" height="600%">
                <feGaussianBlur stdDeviation="8.5" result="blur" />
                <feMerge><feMergeNode in="blur" /></feMerge>
              </filter>
              <filter id="about-glow-core" x="-60%" y="-180%" width="220%" height="460%">
                <feGaussianBlur stdDeviation="2.2" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>

            {[
              'M -90 114 H 1240',
              'M 690 34 H 1240',
              'M -40 385 H 180',
              'M 0 430 H 420 Q 462 430 486 398 L 560 305 H 840',
              'M 1090 86 H 1240',
            ].map((path, index) => {
              const gradientId = index === 0 ? 'url(#about-cyan)' : index === 1 ? 'url(#about-violet)' : index === 2 ? 'url(#about-cyan)' : index === 3 ? 'url(#about-blue)' : 'url(#about-violet)';
              const directionForward = index % 2 === 0;

              return (
                <g key={path}>
                  <path
                    d={path}
                    fill="none"
                    stroke="rgba(24,58,122,0.55)"
                    strokeWidth="1.3"
                    vectorEffect="non-scaling-stroke"
                  />
                  <motion.path
                    d={path}
                    fill="none"
                    stroke={gradientId}
                    strokeWidth="8"
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                    filter="url(#about-glow-soft)"
                    opacity="0.38"
                    strokeDasharray="92 1120"
                    initial={{ strokeDashoffset: directionForward ? 880 : -880 }}
                    animate={{ strokeDashoffset: directionForward ? -880 : 880 }}
                    transition={{ duration: 5.4 + index * 0.62, ease: 'linear', repeat: Infinity, delay: index * 0.5 }}
                  />
                  <motion.path
                    d={path}
                    fill="none"
                    stroke={gradientId}
                    strokeWidth="2"
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                    filter="url(#about-glow-core)"
                    opacity="0.95"
                    strokeDasharray="72 1140"
                    initial={{ strokeDashoffset: directionForward ? 900 : -900 }}
                    animate={{ strokeDashoffset: directionForward ? -900 : 900 }}
                    transition={{ duration: 5.4 + index * 0.62, ease: 'linear', repeat: Infinity, delay: index * 0.5 }}
                  />
                  <motion.path
                    d={path}
                    fill="none"
                    stroke="#E9FFFF"
                    strokeWidth="0.75"
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                    opacity="0.92"
                    strokeDasharray="20 1192"
                    initial={{ strokeDashoffset: directionForward ? 924 : -924 }}
                    animate={{ strokeDashoffset: directionForward ? -924 : 924 }}
                    transition={{ duration: 4.6 + index * 0.58, ease: 'linear', repeat: Infinity, delay: 0.16 + index * 0.48 }}
                  />
                </g>
              );
            })}
          </svg>

          <div className="relative z-10 grid grid-cols-1 gap-4 lg:grid-cols-12 lg:gap-0">
            <motion.article
              initial={{ opacity: 0, x: -45 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-20 min-h-[300px] overflow-hidden rounded-3xl border border-[#2D66FF]/45 bg-gradient-to-br from-[#153FCA] via-[#112D92] to-[#071537] shadow-[0_24px_65px_rgba(0,0,0,0.5),0_0_40px_rgba(15,91,255,0.09)] lg:col-span-6 lg:min-h-[410px] lg:rounded-r-none lg:[clip-path:polygon(0_0,100%_0,89%_100%,0_100%)]"
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(0,240,255,0.14),transparent_35%),linear-gradient(135deg,transparent_36%,rgba(255,255,255,0.04)_36%,transparent_62%)]" />

              <div className="relative flex h-full min-h-[300px] flex-col items-center justify-center px-7 py-12 text-center sm:px-12 lg:min-h-[410px] lg:items-start lg:px-16 lg:text-left">
                <p className="mb-5 font-mono text-[11px] font-semibold uppercase tracking-[0.32em] text-[#7EEBFF]">
                  {t.title}
                </p>

                <h2 className="font-display text-4xl font-extrabold uppercase leading-[0.98] tracking-[-0.03em] text-white sm:text-5xl xl:text-[3.7rem]">
                  {t.title}
                </h2>

                <p className="mt-5 max-w-[34rem] text-sm font-semibold uppercase tracking-[0.22em] text-cyan-100/80 sm:text-base">
                  {t.tagline}
                </p>

                <p className="mt-7 max-w-[34rem] text-base leading-7 text-slate-200/88 sm:text-lg">
                  {t.text}
                </p>
              </div>
            </motion.article>

            <motion.article
              initial={{ opacity: 0, x: 45 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.75, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="group relative min-h-[310px] overflow-hidden rounded-3xl border border-[#2D66FF]/40 bg-[#07122F] shadow-[0_24px_65px_rgba(0,0,0,0.5),0_0_42px_rgba(15,91,255,0.08)] lg:col-span-6 lg:-ml-[7%] lg:min-h-[410px] lg:rounded-l-none lg:[clip-path:polygon(11%_0,100%_0,100%_100%,0_100%)]"
            >
              <img
                src="/assets/about-company-building.png"
                alt="UZTRANSFORMATOR kompaniya binosi"
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-[1.035]"
              />

              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,3,8,0.42)_0%,rgba(2,3,8,0.08)_36%,rgba(2,3,8,0.16)_100%),linear-gradient(180deg,rgba(8,38,95,0.08)_0%,rgba(2,3,8,0.25)_100%)]" />
              <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-[#47A7FF]/16" />

              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4 sm:bottom-7 sm:left-9 sm:right-7 lg:left-[14%]">
                <div className="max-w-md rounded-2xl border border-white/10 bg-[#020308]/66 px-4 py-3 backdrop-blur-md sm:px-5 sm:py-4">
                  <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-[#60E8FF]">
                    {t.title}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-white sm:text-base">
                    {t.tagline}
                  </p>
                </div>
              </div>
            </motion.article>
          </div>
        </div>
      </div>
    </section>
  );
};
