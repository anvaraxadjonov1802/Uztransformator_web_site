import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Certificate, Language } from '../types';
import { useSiteContent } from '../admin/contentStore';
import { translations } from '../data/translations';
import { CertificateModal } from './CertificateModal';

interface CertificatesSectionProps {
  currentLang: Language;
}

export const CertificatesSection: React.FC<CertificatesSectionProps> = ({ currentLang }) => {
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  const { certificates } = useSiteContent();
  const t = translations[currentLang].certificates;

  const certificateTracePaths = [
    'M -40 110 H 240 V 82 H 580 V 54 H 860',
    'M -40 162 H 188 V 210 H 468 V 176 H 756 V 146 H 1050',
    'M -40 262 H 272 V 224 H 606 V 194 H 914 V 166 H 1240',
    'M -40 352 H 236 V 392 H 540 V 334 H 864 V 304 H 1160',
    'M 1110 112 H 1378 V 86 H 1640',
    'M 1010 214 H 1314 V 174 H 1640',
    'M 962 322 H 1268 V 362 H 1640',
    'M 1180 428 H 1424 V 398 H 1640',
    'M 200 560 H 518 V 528 H 812 V 486 H 1138',
    'M 980 598 H 1294 V 558 H 1640',
  ] as const;

  return (
    <section id="certificates" className="relative overflow-hidden site-section-surface py-20 lg:py-32">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[760px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0F5BFF]/7 blur-[160px]" />

      <svg
        aria-hidden="true"
        viewBox="0 0 1600 700"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block"
      >
        <defs>
          <linearGradient id="cert-cyan" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#7EFFFF" />
            <stop offset="45%" stopColor="#00E8FF" />
            <stop offset="100%" stopColor="#00A8FF" />
          </linearGradient>
          <linearGradient id="cert-blue" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#74B8FF" />
            <stop offset="50%" stopColor="#1D72FF" />
            <stop offset="100%" stopColor="#3B45FF" />
          </linearGradient>
          <linearGradient id="cert-violet" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#A6B1FF" />
            <stop offset="50%" stopColor="#6E71FF" />
            <stop offset="100%" stopColor="#8C47FF" />
          </linearGradient>
          <filter id="cert-glow-soft" x="-80%" y="-220%" width="260%" height="540%">
            <feGaussianBlur stdDeviation="4.6" result="blur" />
            <feMerge><feMergeNode in="blur" /></feMerge>
          </filter>
          <filter id="cert-glow-core" x="-60%" y="-180%" width="220%" height="460%">
            <feGaussianBlur stdDeviation="1.45" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {certificateTracePaths.map((path, index) => {
          const gradients = ['url(#cert-cyan)', 'url(#cert-blue)', 'url(#cert-violet)', 'url(#cert-cyan)', 'url(#cert-blue)', 'url(#cert-violet)', 'url(#cert-cyan)', 'url(#cert-blue)', 'url(#cert-violet)', 'url(#cert-cyan)'] as const;
          const gradientId = gradients[index % gradients.length];
          const directionForward = index % 2 === 0;

          return (
            <g key={path}>
              <path
                d={path}
                fill="none"
                stroke="rgba(15,91,255,0.18)"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
              />
              <motion.path
                d={path}
                fill="none"
                stroke={gradientId}
                strokeWidth="8.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
                filter="url(#cert-glow-soft)"
                opacity="0.86"
                strokeDasharray="116 1420"
                initial={{ strokeDashoffset: directionForward ? 1040 : -1040 }}
                animate={{ strokeDashoffset: directionForward ? -1040 : 1040 }}
                transition={{ duration: 5.0 + index * 0.3, repeat: Infinity, ease: 'linear', delay: index * 0.18 }}
              />
              <motion.path
                d={path}
                fill="none"
                stroke={gradientId}
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
                filter="url(#cert-glow-core)"
                opacity="0.98"
                strokeDasharray="90 1446"
                initial={{ strokeDashoffset: directionForward ? 1084 : -1084 }}
                animate={{ strokeDashoffset: directionForward ? -1084 : 1084 }}
                transition={{ duration: 5.0 + index * 0.3, repeat: Infinity, ease: 'linear', delay: index * 0.18 }}
              />
              <motion.path
                d={path}
                fill="none"
                stroke="#E9FFFF"
                strokeWidth="0.92"
                strokeLinecap="round"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
                opacity="0.98"
                strokeDasharray="26 1510"
                initial={{ strokeDashoffset: directionForward ? 1110 : -1110 }}
                animate={{ strokeDashoffset: directionForward ? -1110 : 1110 }}
                transition={{ duration: 4.35 + index * 0.25, repeat: Infinity, ease: 'linear', delay: 0.1 + index * 0.16 }}
              />
            </g>
          );
        })}
      </svg>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-3xl text-center sm:mb-16">
          <h2 className="font-display text-4xl font-extrabold uppercase tracking-tight text-white sm:text-5xl">
            {t.title}
          </h2>
          <p className="mt-3 text-sm text-slate-300 sm:text-base">{t.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-10">
          {certificates.map((cert, index) => (
            <motion.button
              key={cert.id}
              type="button"
              initial={{ opacity: 0, y: 28, scale: 0.985 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.72, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => setSelectedCertificate(cert)}
              className="group relative mx-auto block w-full max-w-[410px] cursor-zoom-in bg-transparent p-0 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF] focus-visible:ring-offset-4 focus-visible:ring-offset-[#020308]"
              aria-label={`${cert.title[currentLang]} — ${t.previewBtn}`}
            >
              <div className="relative rounded-[24px] bg-[linear-gradient(135deg,rgba(0,240,255,0.78),rgba(15,91,255,0.58)_48%,rgba(122,73,255,0.72))] p-[2px] shadow-[0_22px_55px_rgba(0,0,0,0.58),0_0_24px_rgba(15,91,255,0.12)] transition-all duration-500 group-hover:-translate-y-1.5 group-hover:scale-[1.018] group-hover:shadow-[0_28px_72px_rgba(0,0,0,0.72),0_0_34px_rgba(0,240,255,0.22)]">
                <div className="relative overflow-hidden rounded-[22px] border border-white/10 bg-black p-2.5 sm:p-3">
                  <div className="pointer-events-none absolute inset-0 rounded-[22px] bg-[radial-gradient(circle_at_50%_0%,rgba(0,240,255,0.08),transparent_42%)]" />
                  <img
                    src={cert.image}
                    alt={cert.title[currentLang]}
                    loading="lazy"
                    className="relative mx-auto h-auto max-h-[520px] w-full rounded-[14px] object-contain"
                  />
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <CertificateModal
        certificate={selectedCertificate}
        currentLang={currentLang}
        onClose={() => setSelectedCertificate(null)}
      />
    </section>
  );
};
