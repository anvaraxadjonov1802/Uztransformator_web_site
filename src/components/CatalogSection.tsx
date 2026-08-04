import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ProductCategory, Language, Product } from '../types';
import { useSiteContent } from '../admin/contentStore';
import { translations } from '../data/translations';
import { CatalogFilter } from './CatalogFilter';
import { ProductCard } from './ProductCard';
import { ProductDetailModal } from './ProductDetailModal';

interface CatalogSectionProps {
  currentLang: Language;
  onInquireProduct: (productName: string) => void;
}

export const CatalogSection: React.FC<CatalogSectionProps> = ({
  currentLang,
  onInquireProduct,
}) => {
  const [activeCategory, setActiveCategory] = useState<ProductCategory>('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { products } = useSiteContent();

  const t = translations[currentLang].catalog;

  const filteredProducts =
    activeCategory === 'all'
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <section id="catalog" className="relative py-20 lg:py-32 site-section-surface overflow-hidden">
      {/* Background Lighting Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#0F5BFF]/5 blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white uppercase tracking-tight">
            {t.title}
          </h2>
          <p className="mt-4 text-slate-300 text-base sm:text-lg">
            {t.subtitle}
          </p>
        </div>

        {/* Filter Bar */}
        <CatalogFilter
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          currentLang={currentLang}
        />

        {/* Product Cards Grid: slow, soft category transition */}
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 22, scale: 0.992 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.994 }}
            transition={{
              duration: 0.72,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mt-10 grid grid-cols-1 items-stretch gap-6 md:grid-cols-2 xl:grid-cols-3 lg:gap-7"
          >
            {filteredProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                index={index}
                currentLang={currentLang}
                onSelect={setSelectedProduct}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        currentLang={currentLang}
        onClose={() => setSelectedProduct(null)}
        onInquire={onInquireProduct}
      />
    </section>
  );
};
