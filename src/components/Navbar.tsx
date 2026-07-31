import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { LanguageSelector } from './LanguageSelector';

interface NavbarProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLang,
  onLanguageChange,
  activeSection,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const t = translations[currentLang].nav;

  const navItems = [
    { id: 'hero', label: t.home, href: '#hero' },
    { id: 'catalog', label: t.catalog, href: '#catalog' },
    { id: 'about', label: t.about, href: '#about' },
    { id: 'contact', label: t.contact, href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (href === '#hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const target = document.querySelector(href);
    if (!target) return;

    const navOffset = 96;
    const targetTop = target.getBoundingClientRect().top + window.scrollY - navOffset;
    window.scrollTo({ top: targetTop, behavior: 'smooth' });
  };

  return (
    <header className="fixed top-4 left-0 right-0 z-50 flex justify-center px-3 sm:px-5 pointer-events-none">
      <div
        className={`pointer-events-auto relative flex w-full max-w-[1080px] items-center justify-between rounded-full border px-3 py-2 transition-all duration-300 sm:px-5 ${
          isScrolled
            ? 'bg-[#030409]/96 border-white/10 backdrop-blur-xl shadow-[0_16px_45px_rgba(0,0,0,0.58)]'
            : 'bg-[#030409]/82 border-white/8 backdrop-blur-md shadow-[0_14px_34px_rgba(0,0,0,0.38)]'
        }`}
      >
        <a
          href="#hero"
          onClick={(e) => scrollToSection(e, '#hero')}
          className="group flex min-w-0 items-center gap-2.5 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F5BFF]"
          aria-label="UZTRANSFORMATOR bosh sahifa"
        >
          <img
            src="/assets/uztransformator-logo.png"
            alt="UZTRANSFORMATOR logotipi"
            className="h-9 w-9 shrink-0 object-contain drop-shadow-[0_0_10px_rgba(15,91,255,0.34)] transition-transform duration-300 group-hover:scale-105"
          />

          <div className="hidden min-w-0 flex-col sm:flex">
            <span className="truncate font-display text-[13px] font-bold leading-none tracking-[0.08em] text-white transition-colors group-hover:text-[#69A0FF]">
              UZTRANSFORMATOR
            </span>
            <span className="mt-1 text-[7px] font-medium uppercase leading-none tracking-[0.28em] text-slate-500">
              Built for power
            </span>
          </div>
        </a>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Asosiy navigatsiya">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => scrollToSection(e, item.href)}
                className={`group relative py-2 text-[13px] font-medium tracking-wide transition-colors duration-200 focus:outline-none focus-visible:text-white ${
                  isActive ? 'text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                {item.label}
                <span
                  className={`absolute -bottom-0.5 left-0 h-[2px] rounded-full bg-gradient-to-r from-[#0F5BFF] to-[#42D7FF] shadow-[0_0_9px_rgba(15,91,255,0.75)] transition-all duration-300 ${
                    isActive ? 'w-full opacity-100' : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-70'
                  }`}
                />
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSelector
            currentLang={currentLang}
            onLanguageChange={onLanguageChange}
          />

          <button
            type="button"
            onClick={() => setMobileMenuOpen((open) => !open)}
            aria-label="Mobil menyuni ochish"
            aria-expanded={mobileMenuOpen}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.035] text-white transition-colors hover:border-[#0F5BFF]/55 hover:bg-[#0F5BFF]/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F5BFF] md:hidden"
          >
            {mobileMenuOpen ? <X className="h-[18px] w-[18px]" /> : <Menu className="h-[18px] w-[18px]" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="pointer-events-auto fixed left-3 right-3 top-[76px] z-50 mx-auto max-w-[460px] rounded-2xl border border-white/10 bg-[#030409]/98 p-3 shadow-[0_22px_60px_rgba(0,0,0,0.76)] backdrop-blur-xl md:hidden">
          <nav className="flex flex-col" aria-label="Mobil navigatsiya">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => scrollToSection(e, item.href)}
                  className={`relative border-b border-white/[0.06] px-3 py-3.5 text-sm font-medium last:border-b-0 ${
                    isActive ? 'text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-2.5 left-3 h-[2px] w-10 rounded-full bg-gradient-to-r from-[#0F5BFF] to-[#42D7FF] shadow-[0_0_8px_rgba(15,91,255,0.7)]" />
                  )}
                </a>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
};
