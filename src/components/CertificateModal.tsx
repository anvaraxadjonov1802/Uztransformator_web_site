import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'motion/react';
import { X } from 'lucide-react';
import { Certificate, Language } from '../types';

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

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/94 p-3 backdrop-blur-md sm:p-6"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 18, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
        className="relative flex max-h-[96vh] max-w-[96vw] items-center justify-center"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={certificate.title[currentLang]}
      >
        <img
          src={certificate.image}
          alt={certificate.title[currentLang]}
          className="max-h-[94vh] max-w-[94vw] object-contain shadow-[0_30px_90px_rgba(0,0,0,0.9),0_0_32px_rgba(15,91,255,0.14)]"
        />

        <button
          type="button"
          onClick={onClose}
          aria-label="Yopish"
          className="absolute right-2 top-2 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-[#020308]/85 text-white shadow-[0_8px_26px_rgba(0,0,0,0.55)] backdrop-blur-md transition-all hover:border-[#00F0FF]/70 hover:bg-[#0F5BFF]/40 sm:-right-5 sm:-top-5"
        >
          <X className="h-5 w-5" />
        </button>
      </motion.div>
    </motion.div>,
    document.body,
  );
};
