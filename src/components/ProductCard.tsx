import React from "react";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Product, Language } from "../types";
import { translations } from "../data/translations";

interface ProductCardProps {
  product: Product;
  index?: number;
  currentLang: Language;
  onSelect: (product: Product) => void;
}

const NeonBorderMotion: React.FC<{ variant: number }> = ({ variant }) => {
  const cyan = "bg-gradient-to-r from-transparent via-[#00F0FF] to-transparent";
  const blue = "bg-gradient-to-r from-transparent via-[#0F5BFF] to-transparent";
  const verticalCyan = "bg-gradient-to-b from-transparent via-[#00F0FF] to-transparent";
  const verticalBlue = "bg-gradient-to-b from-transparent via-[#0F5BFF] to-transparent";

  const variants: Record<number, React.ReactNode> = {
    1: <>
      <span className={`absolute left-6 top-0 h-[2px] w-16 ${cyan} animate-border-run-top`} />
      <span className={`absolute right-0 top-8 h-16 w-[2px] ${verticalBlue} animate-border-run-right`} />
    </>,
    2: <>
      <span className={`absolute right-10 top-0 h-[2px] w-14 ${blue} animate-border-run-top-slow`} />
      <span className={`absolute left-0 bottom-10 h-14 w-[2px] ${verticalCyan} animate-border-run-left`} />
    </>,
    3: <>
      <span className={`absolute left-10 bottom-0 h-[2px] w-20 ${cyan} animate-border-run-bottom`} />
      <span className={`absolute right-0 top-10 h-12 w-[2px] ${verticalBlue} animate-border-run-right-delayed`} />
    </>,
    4: <>
      <span className={`absolute left-0 top-14 h-14 w-[2px] ${verticalBlue} animate-border-run-left-delayed`} />
      <span className={`absolute right-8 bottom-0 h-[2px] w-12 ${cyan} animate-border-run-bottom-fast`} />
    </>,
    5: <>
      <span className={`absolute left-8 top-0 h-[2px] w-12 ${cyan} animate-border-run-top-fast`} />
      <span className={`absolute right-8 bottom-0 h-[2px] w-[4.5rem] ${blue} animate-border-run-bottom`} />
    </>,
    6: <>
      <span className={`absolute right-0 top-16 h-12 w-[2px] ${verticalCyan} animate-border-run-right`} />
      <span className={`absolute left-14 bottom-0 h-[2px] w-16 ${blue} animate-border-run-bottom-slow`} />
    </>,
    7: <>
      <span className={`absolute left-0 top-8 h-12 w-[2px] ${verticalBlue} animate-border-run-left`} />
      <span className={`absolute left-10 top-0 h-[2px] w-20 ${cyan} animate-border-run-top-delayed`} />
    </>,
    8: <>
      <span className={`absolute right-12 top-0 h-[2px] w-14 ${blue} animate-border-run-top`} />
      <span className={`absolute right-0 bottom-12 h-14 w-[2px] ${verticalCyan} animate-border-run-right-delayed`} />
    </>,
    9: <>
      <span className={`absolute left-12 bottom-0 h-[2px] w-14 ${cyan} animate-border-run-bottom-fast`} />
      <span className={`absolute left-0 top-12 h-16 w-[2px] ${verticalBlue} animate-border-run-left-delayed`} />
    </>,
  };

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[22px]">
      <div className="absolute inset-0 rounded-[22px] border border-[#0F5BFF]/28" />
      <div className="absolute inset-[1px] rounded-[21px] border border-white/5" />
      {variants[variant] ?? variants[1]}
    </div>
  );
};

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  index = 0,
  currentLang,
  onSelect,
}) => {
  const t = translations[currentLang].catalog;
  const primarySpecValue = product.specs[0]
    ? typeof product.specs[0].value === 'string'
      ? product.specs[0].value
      : product.specs[0].value[currentLang]
    : '';

  return (
    <motion.div
      layout="position"
      initial={{ opacity: 0, y: 30, scale: 0.985, filter: 'blur(5px)' }}
      animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
      exit={{ opacity: 0, y: 16, scale: 0.99, filter: 'blur(3px)' }}
      transition={{
        duration: 0.82,
        delay: Math.min(index * 0.1, 0.6),
        ease: [0.22, 1, 0.36, 1],
        layout: { duration: 0.78, ease: [0.22, 1, 0.36, 1] },
      }}
      className="group relative flex cursor-pointer flex-col overflow-hidden rounded-[22px] bg-[linear-gradient(180deg,#071733_0%,#041126_100%)] shadow-[0_14px_32px_rgba(0,0,0,0.42)] transition-transform duration-500 hover:-translate-y-1.5"
      onClick={() => onSelect(product)}
    >
      <NeonBorderMotion variant={product.borderVariant} />

      <div className="relative m-3 overflow-hidden rounded-[15px] bg-[#000000]">
        <div className="aspect-[16/10] overflow-hidden">
          <img
            src={product.image}
            alt={product.name[currentLang]}
            loading="lazy"
            className="h-full w-full object-contain object-center p-3 transition-transform duration-500 group-hover:scale-[1.035] sm:p-4"
          />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#000000]/20 via-transparent to-transparent" />
      </div>

      <div className="flex flex-col px-5 pb-5 pt-1">
        <h3 className="line-clamp-2 min-h-[3.25rem] font-display text-[1.35rem] font-bold leading-[1.15] text-white transition-colors duration-200 group-hover:text-[#dfeeff] sm:text-[1.5rem]">
          {product.name[currentLang]}
        </h3>

        <p className="mt-2.5 line-clamp-2 min-h-[2.75rem] text-sm leading-6 text-slate-300">
          {product.shortDesc[currentLang]}
        </p>

        {product.specs.length > 0 && (
          <div className="mt-4 border-t border-[#173462]/65 pt-3">
            <div className="flex items-center justify-between gap-3 text-xs">
              <span className="font-mono tracking-[0.1em] text-slate-400">
                {product.specs[0].label[currentLang]}:
              </span>
              <span className="font-mono text-sm font-bold text-[#00F0FF]">
                {primarySpecValue}
              </span>
            </div>
          </div>
        )}

        <div className="mt-4">
          <div className="flex items-center justify-end border-t border-[#173462]/65 pt-3">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onSelect(product);
              }}
              className="inline-flex items-center gap-1.5 rounded-full border border-[#0F5BFF]/40 bg-[#0A224A] px-4 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-white transition-all duration-300 hover:border-[#00F0FF]/65 hover:bg-[#0F5BFF] hover:shadow-[0_0_16px_rgba(15,91,255,0.24)]"
            >
              <span>{t.detailsBtn}</span>
              <ArrowUpRight className="h-3.5 w-3.5 text-[#00F0FF] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
