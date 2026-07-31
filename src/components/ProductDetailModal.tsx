import React, { useEffect } from 'react';
import { X, CheckCircle2, Send, Zap } from 'lucide-react';
import { Product, Language } from '../types';
import { translations } from '../data/translations';

interface ProductDetailModalProps {
  product: Product | null;
  currentLang: Language;
  onClose: () => void;
  onInquire: (productName: string) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  currentLang,
  onClose,
  onInquire,
}) => {
  const t = translations[currentLang].catalog;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (product) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [product, onClose]);

  if (!product) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl bg-[#020308] border border-[#0F5BFF]/50 rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.9)] shadow-[#0F5BFF]/20 overflow-hidden text-white my-auto max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#0F5BFF]/30 bg-[#08265F]/60">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-[#00F0FF]" />
            <span className="text-xs font-mono font-bold tracking-widest text-[#00F0FF] uppercase">
              {t.passportTitle}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={t.closeModal}
            className="p-1.5 rounded-full bg-slate-800 text-slate-300 hover:text-white hover:bg-[#0F5BFF] transition-colors focus:outline-none focus:ring-2 focus:ring-[#00F0FF]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Main Title & Category */}
          <div>
            <span className="inline-block px-2.5 py-1 rounded bg-[#0F5BFF]/20 text-[#00F0FF] text-xs font-mono tracking-widest uppercase mb-2">
              {product.category.toUpperCase()}
            </span>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-white">
              {product.name[currentLang]}
            </h2>
          </div>

          {/* Image & Description Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-5 bg-black rounded-xl p-4 border border-[#0F5BFF]/20 flex items-center justify-center min-h-[220px]">
              <img
                src={product.image}
                alt={product.name[currentLang]}
                className="w-full h-auto max-h-[240px] object-contain rounded"
              />
            </div>

            <div className="md:col-span-7 space-y-3">
              <h3 className="text-sm font-bold text-[#00F0FF] uppercase tracking-wider">
                {t.descriptionTitle}
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                {product.fullDesc[currentLang]}
              </p>
            </div>
          </div>

          {/* Specifications Table */}
          <div>
            <h3 className="text-sm font-bold text-[#00F0FF] uppercase tracking-wider mb-3">
              {t.specsTitle}
            </h3>
            <div className="rounded-xl border border-[#0F5BFF]/30 overflow-hidden bg-[#08265F]/20">
              <table className="w-full text-left text-xs sm:text-sm">
                <tbody>
                  {product.specs.map((spec, idx) => (
                    <tr
                      key={idx}
                      className={idx % 2 === 0 ? 'bg-[#051438]/60' : 'bg-[#020308]/60'}
                    >
                      <td className="px-4 py-2.5 text-slate-400 font-medium border-r border-[#0F5BFF]/10 w-1/2">
                        {spec.label[currentLang]}
                      </td>
                      <td className="px-4 py-2.5 text-white font-mono font-semibold">
                        {typeof spec.value === 'string' ? spec.value : spec.value[currentLang]}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Modal Footer / CTA */}
        <div className="p-4 sm:p-6 border-t border-[#0F5BFF]/30 bg-[#08265F]/40 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-slate-300">
            <CheckCircle2 className="w-4 h-4 text-[#00F0FF]" />
            <span>{t.warrantyText}</span>
          </div>

          <button
            type="button"
            onClick={() => {
              onInquire(product.name[currentLang]);
              onClose();
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#0F5BFF] hover:bg-[#00F0FF] text-white hover:text-[#020308] font-bold text-xs tracking-wider uppercase transition-all shadow-[0_0_20px_rgba(15,91,255,0.5)]"
          >
            <Send className="w-4 h-4" />
            <span>{t.inquireBtn}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
