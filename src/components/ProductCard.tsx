import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Image as ImageIcon } from 'lucide-react';
import { Product, Language } from '../types';
import { translations } from '../data/translations';

interface ProductCardProps {
  product: Product;
  index?: number;
  currentLang: Language;
  onSelect: (product: Product) => void;
}

const NeonBorderMotion: React.FC<{ variant: number }> = ({ variant }) => {
  const cyan = 'bg-gradient-to-r from-transparent via-[#00F0FF] to-transparent blur-[0.4px] shadow-[0_0_12px_rgba(0,240,255,0.9)]';
  const blue = 'bg-gradient-to-r from-transparent via-[#0F5BFF] to-transparent blur-[0.4px] shadow-[0_0_10px_rgba(15,91,255,0.85)]';
  const verticalCyan = 'bg-gradient-to-b from-transparent via-[#00F0FF] to-transparent blur-[0.4px] shadow-[0_0_12px_rgba(0,240,255,0.9)]';
  const verticalBlue = 'bg-gradient-to-b from-transparent via-[#0F5BFF] to-transparent blur-[0.4px] shadow-[0_0_10px_rgba(15,91,255,0.85)]';

  const variants: Record<number, React.ReactNode> = {
    1: <><span className={`absolute left-6 top-0 h-[2px] w-24 ${cyan} animate-border-run-top`} /><span className={`absolute right-0 top-12 h-20 w-[2px] ${verticalBlue} animate-border-run-right`} /></>,
    2: <><span className={`absolute right-14 top-0 h-[2px] w-24 ${blue} animate-border-run-top-slow`} /><span className={`absolute left-0 bottom-12 h-20 w-[2px] ${verticalCyan} animate-border-run-left`} /></>,
    3: <><span className={`absolute left-14 bottom-0 h-[2px] w-28 ${cyan} animate-border-run-bottom`} /><span className={`absolute right-0 top-16 h-16 w-[2px] ${verticalBlue} animate-border-run-right-delayed`} /></>,
    4: <><span className={`absolute left-0 top-20 h-20 w-[2px] ${verticalBlue} animate-border-run-left-delayed`} /><span className={`absolute right-12 bottom-0 h-[2px] w-24 ${cyan} animate-border-run-bottom-fast`} /></>,
    5: <><span className={`absolute left-12 top-0 h-[2px] w-24 ${cyan} animate-border-run-top-fast`} /><span className={`absolute right-12 bottom-0 h-[2px] w-28 ${blue} animate-border-run-bottom`} /></>,
    6: <><span className={`absolute right-0 top-20 h-20 w-[2px] ${verticalCyan} animate-border-run-right`} /><span className={`absolute left-16 bottom-0 h-[2px] w-24 ${blue} animate-border-run-bottom-slow`} /></>,
    7: <><span className={`absolute left-0 top-12 h-20 w-[2px] ${verticalBlue} animate-border-run-left`} /><span className={`absolute left-14 top-0 h-[2px] w-28 ${cyan} animate-border-run-top-delayed`} /></>,
    8: <><span className={`absolute right-16 top-0 h-[2px] w-24 ${blue} animate-border-run-top`} /><span className={`absolute right-0 bottom-16 h-20 w-[2px] ${verticalCyan} animate-border-run-right-delayed`} /></>,
    9: <><span className={`absolute left-16 bottom-0 h-[2px] w-24 ${cyan} animate-border-run-bottom-fast`} /><span className={`absolute left-0 top-16 h-20 w-[2px] ${verticalBlue} animate-border-run-left-delayed`} /></>,
  };

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[26px]">
      <div className="absolute inset-0 rounded-[26px] border border-[#34527f]/55" />
      <div className="absolute inset-[1px] rounded-[25px] border border-white/[0.035]" />
      {variants[variant] ?? variants[1]}
    </div>
  );
};

const localizedSpecValue = (product: Product, index: number, language: Language) => {
  const spec = product.specs[index];
  if (!spec) return '';
  return typeof spec.value === 'string' ? spec.value : spec.value[language];
};

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  index = 0,
  currentLang,
  onSelect,
}) => {
  const t = translations[currentLang].catalog;
  const visibleSpecs = product.specs.slice(0, 4);

  return (
    <motion.article
      layout="position"
      initial={{ opacity: 0, y: 30, scale: 0.988, filter: 'blur(5px)' }}
      animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
      exit={{ opacity: 0, y: 16, scale: 0.992, filter: 'blur(3px)' }}
      transition={{
        duration: 0.8,
        delay: Math.min(index * 0.08, 0.45),
        ease: [0.22, 1, 0.36, 1],
        layout: { duration: 0.72, ease: [0.22, 1, 0.36, 1] },
      }}
      className="group relative h-[560px] cursor-pointer overflow-hidden rounded-[26px] bg-[linear-gradient(135deg,rgba(13,22,42,0.97)_0%,rgba(7,13,28,0.985)_48%,rgba(4,9,20,0.99)_100%)] shadow-[0_22px_55px_rgba(0,0,0,0.46)] transition-transform duration-500 hover:-translate-y-1"
      onClick={() => onSelect(product)}
    >
      <NeonBorderMotion variant={product.borderVariant} />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_24%_46%,rgba(15,91,255,0.12),transparent_34%),radial-gradient(circle_at_76%_52%,rgba(0,240,255,0.045),transparent_34%)]" />

      <div className="relative z-10 flex h-full flex-col">
        <div className="relative m-4 h-[220px] overflow-hidden rounded-[20px] border border-white/[0.055] bg-[#0a1020]">
          {product.image ? (
            <>
              <img
                src={product.image}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 h-full w-full scale-125 object-cover opacity-42 blur-[34px] saturate-75"
              />
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(9,17,34,0.55),rgba(3,7,16,0.48))]" />
              <img
                src={product.image}
                alt={product.name[currentLang]}
                loading="lazy"
                className="relative z-10 h-full w-full object-contain object-center p-5 transition-transform duration-700 group-hover:scale-[1.035] sm:p-7"
              />
            </>
          ) : (
            <div className="flex h-full items-center justify-center text-slate-600">
              <ImageIcon className="h-16 w-16" />
            </div>
          )}
        </div>

        <div className="flex min-w-0 flex-1 flex-col px-6 pb-6 pt-2">
          <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[#00e8ff]/80">
            {product.category.toUpperCase()}
          </div>

          <h3 className="mt-3 line-clamp-3 min-h-[4.75rem] bg-gradient-to-b from-white via-white to-[#6edfff] bg-clip-text font-display text-[1.45rem] font-extrabold leading-[1.08] tracking-[-0.025em] text-transparent sm:text-[1.65rem]">
            {product.name[currentLang] || 'Mahsulot nomi'}
          </h3>

          <div className="mt-5 grid min-h-[134px] grid-cols-2 content-start gap-x-5 gap-y-4 border-t border-[#1d355a]/55 pt-5">
            {visibleSpecs.map((spec, specIndex) => (
              <div key={`${spec.label[currentLang]}-${specIndex}`} className="min-w-0">
                <div className="line-clamp-1 text-[10px] leading-4 text-slate-500 sm:text-[11px]">
                  {spec.label[currentLang]}
                </div>
                <div className="mt-1 line-clamp-2 text-[12px] font-bold leading-[1.35] text-slate-100 sm:text-[13px]">
                  {localizedSpecValue(product, specIndex, currentLang)}
                </div>
              </div>
            ))}
          </div>

          {product.specs.length > 4 && (
            <div className="mt-auto pt-4 text-[11px] text-slate-400">
              Ko‘proq ma’lumot batafsil oynada ko‘rsatiladi.
            </div>
          )}

          <div className="mt-4 flex items-center gap-3">
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                onSelect(product);
              }}
              className="inline-flex min-h-12 flex-1 items-center justify-center rounded-xl bg-gradient-to-r from-[#00e8ff] to-[#20bfd0] px-5 text-xs font-extrabold uppercase tracking-[0.075em] text-[#03101b] shadow-[0_0_24px_rgba(0,232,255,0.18)] transition duration-300 hover:brightness-110 sm:flex-none sm:min-w-[196px]"
            >
              {t.detailsBtn}
            </button>
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                onSelect(product);
              }}
              aria-label={t.detailsBtn}
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#00e8ff] to-[#20bfd0] text-[#03101b] shadow-[0_0_22px_rgba(0,232,255,0.2)] transition duration-300 hover:scale-105 hover:brightness-110"
            >
              <ArrowUpRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </motion.article>
  );
};
