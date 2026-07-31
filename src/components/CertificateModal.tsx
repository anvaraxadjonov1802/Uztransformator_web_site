import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { X } from 'lucide-react';
import { Certificate, Language } from '../types';
import { translations } from '../data/translations';

interface CertificateModalProps {
  certificate: Certificate | null;
  currentLang: Language;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  certificate,
  currentLang,
  onClose,
}) => {
  const t = translations[currentLang].certificates;

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    if (certificate) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [certificate, onClose]);

  if (!certificate) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/90 p-3 backdrop-blur-md sm:p-6"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 18, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
        className="relative flex max-h-[94vh] w-full max-w-5xl flex-col overflow-hidden rounded-[26px] border border-[#0F5BFF]/38 bg-[#020308] shadow-[0_30px_90px_rgba(0,0,0,0.8)]"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={certificate.title[currentLang]}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4 sm:px-6">
          <div>
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-[#00F0FF]">
              {t.modalTitle}
            </p>
            <h3 className="mt-1 font-display text-base font-bold text-white sm:text-lg">
              {certificate.title[currentLang]}
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Yopish"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-slate-300 transition-colors hover:border-[#0F5BFF]/60 hover:bg-[#0F5BFF]/15 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-auto bg-black p-3 sm:p-5">
          <img
            src={certificate.image}
            alt={certificate.title[currentLang]}
            className="mx-auto max-h-[78vh] w-auto max-w-full object-contain"
          />
        </div>
      </motion.div>
    </motion.div>
  );
};
