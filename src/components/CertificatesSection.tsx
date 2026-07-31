import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Certificate, Language } from '../types';
import { certificatesData } from '../data/certificates';
import { translations } from '../data/translations';
import { CertificateModal } from './CertificateModal';

interface CertificatesSectionProps {
  currentLang: Language;
}

export const CertificatesSection: React.FC<CertificatesSectionProps> = ({ currentLang }) => {
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  const t = translations[currentLang].certificates;

  return (
    <section id="certificates" className="relative overflow-hidden bg-[#020308] py-20 lg:py-32">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[760px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0F5BFF]/7 blur-[160px]" />

      <svg
        aria-hidden="true"
        viewBox="0 0 1600 700"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block"
      >
        <defs>
          <linearGradient id="cert-side-light" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#00F0FF" stopOpacity="0" />
            <stop offset="45%" stopColor="#00F0FF" stopOpacity="1" />
            <stop offset="100%" stopColor="#0F5BFF" stopOpacity="0" />
          </linearGradient>
          <filter id="cert-side-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {[170, 350, 530].map((y, index) => (
          <g key={`left-${y}`}>
            <path d={`M0 ${y} H250`} stroke="rgba(15,91,255,0.17)" strokeWidth="2" />
            <motion.path
              d={`M0 ${y} H250`}
              stroke="url(#cert-side-light)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="90 260"
              initial={{ strokeDashoffset: 320 }}
              animate={{ strokeDashoffset: -320 }}
              transition={{ duration: 4.6 + index, repeat: Infinity, ease: 'linear', delay: index * 0.55 }}
              filter="url(#cert-side-glow)"
            />
          </g>
        ))}

        {[190, 370, 550].map((y, index) => (
          <g key={`right-${y}`}>
            <path d={`M1350 ${y} H1600`} stroke="rgba(15,91,255,0.17)" strokeWidth="2" />
            <motion.path
              d={`M1350 ${y} H1600`}
              stroke="url(#cert-side-light)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="90 260"
              initial={{ strokeDashoffset: -320 }}
              animate={{ strokeDashoffset: 320 }}
              transition={{ duration: 4.9 + index, repeat: Infinity, ease: 'linear', delay: index * 0.65 }}
              filter="url(#cert-side-glow)"
            />
          </g>
        ))}
      </svg>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-3xl text-center sm:mb-16">
          <h2 className="font-display text-4xl font-extrabold uppercase tracking-tight text-white sm:text-5xl">
            {t.title}
          </h2>
          <p className="mt-3 text-sm text-slate-300 sm:text-base">{t.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-10">
          {certificatesData.map((cert, index) => (
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
              <img
                src={cert.image}
                alt={cert.title[currentLang]}
                loading="lazy"
                className="mx-auto h-auto max-h-[520px] w-full object-contain shadow-[0_22px_55px_rgba(0,0,0,0.58)] transition-all duration-500 group-hover:-translate-y-1.5 group-hover:scale-[1.025] group-hover:shadow-[0_26px_70px_rgba(0,0,0,0.68),0_0_28px_rgba(15,91,255,0.16)]"
              />
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
