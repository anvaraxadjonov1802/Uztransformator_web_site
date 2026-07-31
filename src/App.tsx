import React, { useState, useEffect } from 'react';
import { Language } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { IntroSection } from './components/IntroSection';
import { CatalogSection } from './components/CatalogSection';
import { AboutSection } from './components/AboutSection';
import { CertificatesSection } from './components/CertificatesSection';
import { PartnersMarquee } from './components/PartnersMarquee';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

export default function App() {
  const [currentLang, setCurrentLang] = useState<Language>('uz');
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [prefilledProduct, setPrefilledProduct] = useState<string>('');

  // Scroll spy to update active nav link
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'intro', 'catalog', 'about', 'certificates', 'partners', 'contact'];
      const scrollPosition = window.scrollY + 250;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleInquireProduct = (productName: string) => {
    setPrefilledProduct(productName);
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#020308] text-white flex flex-col font-sans selection:bg-[#0F5BFF] selection:text-white relative overflow-x-hidden">
      {/* Background Dot Grid & Industrial Accents */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute inset-0 bg-dot-grid opacity-60" />
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#0F5BFF]/5 to-transparent skew-x-[-15deg] translate-x-20" />
      </div>

      {/* Floating Navbar */}
      <Navbar
        currentLang={currentLang}
        onLanguageChange={setCurrentLang}
        activeSection={activeSection}
      />

      {/* Main Page Content */}
      <main className="flex-1 relative z-10">
        {/* Full-screen Hero Section */}
        <Hero currentLang={currentLang} />

        {/* Intro / Value Section */}
        <IntroSection currentLang={currentLang} />

        {/* Catalog Section */}
        <CatalogSection
          currentLang={currentLang}
          onInquireProduct={handleInquireProduct}
        />

        {/* About Section */}
        <AboutSection currentLang={currentLang} />

        {/* Certificates Section */}
        <CertificatesSection currentLang={currentLang} />

        {/* Partners Marquee */}
        <PartnersMarquee currentLang={currentLang} />

        {/* Contact Section */}
        <ContactSection
          currentLang={currentLang}
          prefilledProduct={prefilledProduct}
        />
      </main>

      {/* Footer */}
      <Footer currentLang={currentLang} />
    </div>
  );
}
