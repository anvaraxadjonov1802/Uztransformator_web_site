import React, { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { Language } from '../types';

interface LanguageSelectorProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
}

const LANGUAGES: Array<{ code: Language; label: string; name: string }> = [
  { code: 'uz', label: 'UZ', name: 'O‘zbekcha' },
  { code: 'ru', label: 'RU', name: 'Русский' },
  { code: 'en', label: 'EN', name: 'English' },
];

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  currentLang,
  onLanguageChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const activeLangObj = LANGUAGES.find((l) => l.code === currentLang) || LANGUAGES[0];

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="Select Language"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#08265F]/80 hover:bg-[#0F5BFF]/20 text-white text-xs font-semibold uppercase tracking-wider border border-[#0F5BFF]/30 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#0F5BFF]"
      >
        <Globe className="w-3.5 h-3.5 text-[#00F0FF]" />
        <span className="text-[#00F0FF]">{activeLangObj.label}</span>
        <ChevronDown className={`w-3 h-3 text-slate-300 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-36 rounded-xl bg-[#020308] border border-[#0F5BFF]/40 shadow-[0_10px_30px_rgba(0,0,0,0.8)] shadow-[#0F5BFF]/10 z-50 py-1.5 backdrop-blur-xl animate-in fade-in zoom-in-95 duration-150">
          <div className="px-3 py-1 text-[10px] font-bold tracking-widest text-slate-400 uppercase border-b border-slate-800 mb-1">
            Tilni tanlang
          </div>
          {LANGUAGES.map((lang) => {
            const isActive = lang.code === currentLang;
            return (
              <button
                key={lang.code}
                type="button"
                onClick={() => {
                  onLanguageChange(lang.code);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-1.5 text-xs font-medium transition-colors ${
                  isActive
                    ? 'bg-[#0F5BFF]/20 text-[#00F0FF] font-semibold'
                    : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-200">
                    {lang.label}
                  </span>
                  <span>{lang.name}</span>
                </div>
                {isActive && <Check className="w-3.5 h-3.5 text-[#00F0FF]" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
