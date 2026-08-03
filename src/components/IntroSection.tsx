import React from 'react';
import { motion } from 'motion/react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface IntroSectionProps {
  currentLang: Language;
}

export const IntroSection: React.FC<IntroSectionProps> = ({ currentLang }) => {
  const t = translations[currentLang].intro;

  const introTracePaths = [
    'M -70 112 H 268 V 76 H 682 V 36 H 1240',
    'M -88 166 H 222 V 136 H 612 V 96 H 1240',
    'M -58 220 H 324 V 182 H 742 V 144 H 1240',
    'M -92 318 H 198 V 352 H 480 V 300 H 840 V 248 H 1240',
    'M -74 382 H 286 V 424 H 662 V 374 H 1034 V 330 H 1240',
    'M 128 474 H 432 V 446 H 760 V 402 H 1240',
  ] as const;

  return (
    <section id="intro" className="relative overflow-hidden site-section-surface py-20 lg:py-32">
      {/* Subtle ambient light only — the section stays close to black. */}
      <div className="pointer-events-none absolute left-[-12rem] top-1/2 h-[28rem] w-[28rem] -translate-y-1/2 rounded-full bg-[#0F5BFF]/10 blur-[135px]" />
      <div className="pointer-events-none absolute right-[-10rem] top-1/3 h-[24rem] w-[24rem] rounded-full bg-[#4020D8]/10 blur-[130px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative py-10 sm:py-14 lg:py-16">
          {/* Animated neon contour lines replacing the black sketch lines. */}
          <svg
            aria-hidden="true"
            viewBox="0 0 1200 520"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-0 hidden h-full w-full overflow-visible sm:block"
          >
            <defs>
              <linearGradient id="intro-cyan" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#7EFFFF" />
                <stop offset="45%" stopColor="#00E8FF" />
                <stop offset="100%" stopColor="#00A8FF" />
              </linearGradient>
              <linearGradient id="intro-blue" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#74B8FF" />
                <stop offset="50%" stopColor="#1D72FF" />
                <stop offset="100%" stopColor="#3B45FF" />
              </linearGradient>
              <linearGradient id="intro-violet" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#A6B1FF" />
                <stop offset="50%" stopColor="#6E71FF" />
                <stop offset="100%" stopColor="#8C47FF" />
              </linearGradient>
              <filter id="intro-glow-soft" x="-80%" y="-250%" width="260%" height="600%">
                <feGaussianBlur stdDeviation="5.2" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                </feMerge>
              </filter>
              <filter id="intro-glow-core" x="-60%" y="-180%" width="220%" height="460%">
                <feGaussianBlur stdDeviation="1.45" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {introTracePaths.map((path, index) => {
              const gradients = ['url(#intro-cyan)', 'url(#intro-blue)', 'url(#intro-violet)', 'url(#intro-cyan)', 'url(#intro-blue)', 'url(#intro-violet)'] as const;
              const gradientId = gradients[index % gradients.length];
              const directionForward = index % 2 === 0;

              return (
                <g key={path}>
                  <path
                    d={path}
                    fill="none"
                    stroke="rgba(20,94,255,0.18)"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    vectorEffect="non-scaling-stroke"
                  />
                  <motion.path
                    d={path}
                    fill="none"
                    stroke={gradientId}
                    strokeWidth="8.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    vectorEffect="non-scaling-stroke"
                    filter="url(#intro-glow-soft)"
                    opacity="0.86"
                    strokeDasharray="118 1400"
                    initial={{ strokeDashoffset: directionForward ? 1020 : -1020 }}
                    animate={{ strokeDashoffset: directionForward ? -1020 : 1020 }}
                    transition={{
                      duration: 5.1 + index * 0.48,
                      ease: 'linear',
                      repeat: Infinity,
                      delay: index * 0.3,
                    }}
                  />
                  <motion.path
                    d={path}
                    fill="none"
                    stroke={gradientId}
                    strokeWidth="3.1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    vectorEffect="non-scaling-stroke"
                    filter="url(#intro-glow-core)"
                    opacity="0.98"
                    strokeDasharray="92 1420"
                    initial={{ strokeDashoffset: directionForward ? 1060 : -1060 }}
                    animate={{ strokeDashoffset: directionForward ? -1060 : 1060 }}
                    transition={{
                      duration: 5.1 + index * 0.48,
                      ease: 'linear',
                      repeat: Infinity,
                      delay: index * 0.3,
                    }}
                  />
                  <motion.path
                    d={path}
                    fill="none"
                    stroke="#E9FFFF"
                    strokeWidth="0.95"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    vectorEffect="non-scaling-stroke"
                    opacity="0.98"
                    strokeDasharray="28 1484"
                    initial={{ strokeDashoffset: directionForward ? 1088 : -1088 }}
                    animate={{ strokeDashoffset: directionForward ? -1088 : 1088 }}
                    transition={{
                      duration: 4.4 + index * 0.42,
                      ease: 'linear',
                      repeat: Infinity,
                      delay: 0.12 + index * 0.28,
                    }}
                  />
                </g>
              );
            })}
          </svg>

          <div className="relative z-10 grid grid-cols-1 gap-4 lg:grid-cols-12 lg:gap-0">
            {/* Left angled content block — matches the supplied sketch. */}
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
                  Ishonchli energiya tizimlari
                </p>

                <h2 className="font-display text-4xl font-extrabold uppercase leading-[0.98] tracking-[-0.03em] text-white sm:text-5xl xl:text-[3.7rem]">
                  {t.titleLine1}
                  <span className="mt-2 block bg-gradient-to-r from-[#65EEFF] via-[#3A89FF] to-[#B4C7FF] bg-clip-text text-transparent drop-shadow-[0_0_18px_rgba(15,91,255,0.34)]">
                    {t.titleLine2}
                  </span>
                </h2>

                <p className="mt-7 max-w-[34rem] text-base leading-7 text-slate-200/88 sm:text-lg">
                  {t.description}
                </p>
              </div>
            </motion.article>

            {/* Right image block — same angled meeting point as the sketch. */}
            <motion.article
              initial={{ opacity: 0, x: 45 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.75, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="group relative min-h-[310px] overflow-hidden rounded-3xl border border-[#2D66FF]/40 bg-[#07122F] shadow-[0_24px_65px_rgba(0,0,0,0.5),0_0_42px_rgba(15,91,255,0.08)] lg:col-span-6 lg:-ml-[7%] lg:min-h-[410px] lg:rounded-l-none lg:[clip-path:polygon(11%_0,100%_0,100%_100%,0_100%)]"
            >
              <img
                src="/assets/high-voltage-lab.png"
                alt="UZTRANSFORMATOR yuqori kuchlanish sinov laboratoriyasi"
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-[1.035]"
              />

              {/* Reworked image treatment: controlled contrast, cool industrial tone. */}
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,3,8,0.5)_0%,rgba(2,3,8,0.08)_36%,rgba(2,3,8,0.16)_100%),linear-gradient(180deg,rgba(8,38,95,0.08)_0%,rgba(2,3,8,0.32)_100%)]" />
              <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-[#47A7FF]/16" />

              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4 sm:bottom-7 sm:left-9 sm:right-7 lg:left-[14%]">
                <div className="max-w-md rounded-2xl border border-white/10 bg-[#020308]/66 px-4 py-3 backdrop-blur-md sm:px-5 sm:py-4">
                  <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-[#60E8FF]">
                    Yuqori kuchlanish laboratoriyasi
                  </p>
                  <p className="mt-1 text-sm font-semibold text-white sm:text-base">
                    Zamonaviy sinov va muhandislik nazorati
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
