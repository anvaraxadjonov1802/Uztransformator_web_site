import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Eye } from 'lucide-react';
import { Certificate, Language } from '../types';
import { certificatesData } from '../data/certificates';
import { translations } from '../data/translations';
import { CertificateModal } from './CertificateModal';

interface CertificatesSectionProps {
  currentLang: Language;
}

const CertificateBorder: React.FC<{ index: number }> = ({ index }) => {
  const durations = [7.8, 9.2, 8.5];
  const delays = [0, 1.1, 0.5];
  const reverse = index === 1;

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-0 h-full w-full"
    >
      <defs>
        <linearGradient id={`cert-gradient-${index}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#00F0FF" />
          <stop offset="58%" stopColor="#0F5BFF" />
          <stop offset="100%" stopColor="#6A35FF" />
        </linearGradient>
        <filter id={`cert-glow-${index}`} x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="1.4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <rect
        x="0.8"
        y="0.8"
        width="98.4"
        height="98.4"
        rx="6"
        fill="none"
        stroke="rgba(15,91,255,0.22)"
        strokeWidth="0.55"
        vectorEffect="non-scaling-stroke"
      />

      <motion.rect
        x="0.8"
        y="0.8"
        width="98.4"
        height="98.4"
        rx="6"
        fill="none"
        stroke={`url(#cert-gradient-${index})`}
        strokeWidth="0.9"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        strokeDasharray="22 370"
        initial={{ strokeDashoffset: reverse ? -390 : 390 }}
        animate={{ strokeDashoffset: reverse ? 390 : -390 }}
        transition={{
          duration: durations[index] ?? 8,
          delay: delays[index] ?? 0,
          repeat: Infinity,
          ease: 'linear',
        }}
        filter={`url(#cert-glow-${index})`}
      />
    </svg>
  );
};

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

        <div className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-3 no-scrollbar md:grid md:grid-cols-2 md:overflow-visible lg:grid-cols-3">
          {certificatesData.map((cert, index) => (
            <motion.article
              key={cert.id}
              initial={{ opacity: 0, y: 30, scale: 0.985 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.72, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => setSelectedCertificate(cert)}
              className="group relative min-w-[86%] snap-center cursor-pointer overflow-hidden rounded-[26px] bg-[linear-gradient(180deg,#071733_0%,#041126_100%)] p-4 shadow-[0_16px_45px_rgba(0,0,0,0.48)] transition-transform duration-500 hover:-translate-y-2 sm:min-w-[68%] md:min-w-0"
            >
              <CertificateBorder index={index} />

              <div className="relative flex min-h-[390px] items-center justify-center overflow-hidden rounded-[19px] border border-white/5 bg-black p-3 sm:min-h-[430px]">
                <img
                  src={cert.image}
                  alt={cert.title[currentLang]}
                  loading="lazy"
                  className="max-h-[430px] w-full object-contain transition-transform duration-700 group-hover:scale-[1.02]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#020308]/30 via-transparent to-transparent" />
              </div>

              <div className="relative z-10 flex items-center justify-between gap-4 px-2 pb-1 pt-4">
                <h3 className="line-clamp-2 font-display text-base font-bold leading-tight text-white sm:text-lg">
                  {cert.title[currentLang]}
                </h3>

                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    setSelectedCertificate(cert);
                  }}
                  className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#0F5BFF]/45 bg-[#0A224A] text-[#00F0FF] transition-all duration-300 hover:border-[#00F0FF] hover:bg-[#0F5BFF] hover:text-white"
                  aria-label={t.previewBtn}
                >
                  <Eye className="h-4 w-4" />
                </button>
              </div>
            </motion.article>
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
