import React from "react";
import { motion } from "motion/react";
import { ProductCategory, Language } from "../types";
import { translations } from "../data/translations";

interface CatalogFilterProps {
  activeCategory: ProductCategory;
  onSelectCategory: (category: ProductCategory) => void;
  currentLang: Language;
}

const NeonTrack: React.FC<{ side: "left" | "right" }> = ({ side }) => {
  const isLeft = side === "left";

  return (
    <div className="relative h-12 min-w-0 overflow-hidden" aria-hidden="true">
      <span
        className={`absolute top-2 h-px w-full bg-gradient-to-r ${
          isLeft
            ? "from-[#0F5BFF]/5 via-[#0F5BFF]/45 to-[#0F5BFF]/12"
            : "from-[#0F5BFF]/12 via-[#0F5BFF]/45 to-[#0F5BFF]/5"
        }`}
      />
      <span
        className={`absolute top-6 h-px w-[88%] bg-gradient-to-r ${
          isLeft
            ? "left-0 from-[#00F0FF]/5 via-[#00F0FF]/32 to-[#00F0FF]/8"
            : "right-0 from-[#00F0FF]/8 via-[#00F0FF]/32 to-[#00F0FF]/5"
        }`}
      />
      <span
        className={`absolute top-10 h-px w-[72%] bg-gradient-to-r ${
          isLeft
            ? "left-0 from-[#0F5BFF]/5 via-[#0F5BFF]/24 to-transparent"
            : "right-0 from-transparent via-[#0F5BFF]/24 to-[#0F5BFF]/5"
        }`}
      />

      <span
        className={`absolute top-[7px] h-[2px] w-28 rounded-full bg-gradient-to-r from-transparent via-[#00F0FF] to-transparent blur-[0.4px] shadow-[0_0_12px_rgba(0,240,255,0.9)] ${
          isLeft ? "animate-filter-signal-left" : "animate-filter-signal-right"
        }`}
      />
      <span
        className={`absolute top-[23px] h-[2px] w-20 rounded-full bg-gradient-to-r from-transparent via-[#0F5BFF] to-transparent blur-[0.4px] shadow-[0_0_10px_rgba(15,91,255,0.85)] ${
          isLeft
            ? "animate-filter-signal-left-delayed"
            : "animate-filter-signal-right-delayed"
        }`}
      />
    </div>
  );
};

export const CatalogFilter: React.FC<CatalogFilterProps> = ({
  activeCategory,
  onSelectCategory,
  currentLang,
}) => {
  const t = translations[currentLang].catalog;

  const categories: Array<{ id: ProductCategory; label: string }> = [
    { id: "all", label: t.all },
    { id: "transformers", label: t.transformers },
    { id: "substations", label: t.substations },
    { id: "electrical", label: t.electrical },
    { id: "others", label: t.others },
  ];

  return (
    <div className="relative left-1/2 mt-10 w-screen -translate-x-1/2 overflow-hidden">
      <div className="grid grid-cols-[minmax(18px,1fr)_minmax(0,auto)_minmax(18px,1fr)] items-center gap-3 sm:gap-5 lg:gap-7">
        <NeonTrack side="left" />

        <div className="no-scrollbar max-w-[calc(100vw-36px)] overflow-x-auto px-1 py-3">
          <div className="flex w-max min-w-full flex-nowrap items-center justify-start gap-2.5 sm:justify-center sm:gap-3">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;

              return (
                <motion.button
                  layout
                  key={cat.id}
                  type="button"
                  onClick={() => onSelectCategory(cat.id)}
                  whileTap={{ scale: 0.97 }}
                  className={`relative isolate shrink-0 overflow-hidden rounded-full border px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] transition-colors duration-300 sm:px-5 sm:text-xs lg:text-sm ${
                    isActive
                      ? "border-[#0F5BFF]/72 text-white"
                      : "border-[#173462] bg-[#071124] text-slate-300 hover:border-[#0F5BFF]/45 hover:text-white"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="catalog-filter-active"
                      className="absolute inset-0 -z-10 rounded-full bg-[linear-gradient(135deg,rgba(15,91,255,0.28),rgba(0,240,255,0.08))] shadow-[inset_0_0_16px_rgba(15,91,255,0.18),0_0_20px_rgba(15,91,255,0.16)]"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10 whitespace-nowrap">{cat.label}</span>
                </motion.button>
              );
            })}
          </div>
        </div>

        <NeonTrack side="right" />
      </div>
    </div>
  );
};
