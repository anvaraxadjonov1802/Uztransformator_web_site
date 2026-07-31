import React from 'react';
import {
  ExternalLink,
  Facebook,
  Instagram,
  Linkedin,
  MapPin,
  MessageCircle,
  Phone,
  Send,
} from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface ContactSectionProps {
  currentLang: Language;
  prefilledProduct?: string;
}

const contactUrls = {
  map: 'https://www.google.com/maps/place/UZTRANSFORMATOR/@41.2302145,69.3266968,18.25z/data=!4m6!3m5!1s0x38ae5f001aad737f:0xf6552ec198d8be4!8m2!3d41.2301119!4d69.325901!16s%2Fg%2F11y624vmdq?entry=tts&g_ep=EgoyMDI2MDcwNy4wIPu8ASoASAFQAw%3D%3D&skid=47e47bc8-64fc-41e6-b525-7734fad60262',
  mapEmbed: 'https://www.google.com/maps?q=41.2301119,69.325901&z=18&output=embed',
  telegram: 'https://t.me/energomax_uz',
  instagram: 'https://www.instagram.com/uztransformator',
  whatsapp:
    'https://api.whatsapp.com/send/?phone=998710000000&text&type=phone_number&app_absent=0',
  facebook: 'https://www.facebook.com/uztransformator',
  linkedin: 'https://www.linkedin.com/company/uztransformator/',
};

const phoneNumbers = [
  { label: '+998 88 599 99 99', href: 'tel:+998885999999' },
  { label: '+998 77 666 66 66', href: 'tel:+998776666666' },
];

export const ContactSection: React.FC<ContactSectionProps> = ({ currentLang }) => {
  const t = translations[currentLang].contact;

  const labels = {
    uz: {
      phones: 'Telefon raqamlar',
      location: 'Geolokatsiya',
      locationText: 'UZTRANSFORMATOR — Toshkent',
      openMap: 'Google Mapsda ochish',
      socials: 'Ijtimoiy tarmoqlar',
      mapTitle: 'Bizning manzilimiz',
    },
    ru: {
      phones: 'Телефонные номера',
      location: 'Геолокация',
      locationText: 'UZTRANSFORMATOR — Ташкент',
      openMap: 'Открыть в Google Maps',
      socials: 'Социальные сети',
      mapTitle: 'Наш адрес',
    },
    en: {
      phones: 'Phone numbers',
      location: 'Location',
      locationText: 'UZTRANSFORMATOR — Tashkent',
      openMap: 'Open in Google Maps',
      socials: 'Social networks',
      mapTitle: 'Our location',
    },
  }[currentLang];

  const socialLinks = [
    {
      name: 'Telegram',
      href: contactUrls.telegram,
      icon: Send,
    },
    {
      name: 'Instagram',
      href: contactUrls.instagram,
      icon: Instagram,
    },
    {
      name: 'WhatsApp',
      href: contactUrls.whatsapp,
      icon: MessageCircle,
    },
    {
      name: 'Facebook',
      href: contactUrls.facebook,
      icon: Facebook,
    },
    {
      name: 'LinkedIn',
      href: contactUrls.linkedin,
      icon: Linkedin,
    },
  ];

  return (
    <section id="contact" className="relative overflow-hidden bg-[#020308] py-20 lg:py-32">
      <div className="pointer-events-none absolute right-[-11rem] top-16 h-[30rem] w-[30rem] rounded-full bg-[#0F5BFF]/10 blur-[145px]" />
      <div className="pointer-events-none absolute bottom-[-10rem] left-[-9rem] h-[28rem] w-[28rem] rounded-full bg-[#00F0FF]/8 blur-[145px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-3xl text-center lg:mb-16">
          <h2 className="font-display text-4xl font-extrabold uppercase tracking-tight text-white sm:text-5xl">
            {t.title}
          </h2>
          <p className="mt-3 text-sm text-slate-300 sm:text-base">{t.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-stretch">
          <div className="relative lg:col-span-5">
            <div className="h-full rounded-[28px] border border-[#0F5BFF]/28 bg-[linear-gradient(145deg,rgba(8,38,95,0.76),rgba(3,9,23,0.96)_62%,rgba(2,3,8,0.98))] p-6 shadow-[0_24px_65px_rgba(0,0,0,0.48)] sm:p-8">
              <div className="mb-7 flex items-center gap-3 border-b border-[#0F5BFF]/20 pb-5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#00F0FF] shadow-[0_0_12px_#00F0FF]" />
                <h3 className="font-display text-2xl font-bold uppercase tracking-wide text-white">
                  {t.infoTitle}
                </h3>
              </div>

              <div className="space-y-6">
                <div>
                  <div className="mb-3 flex items-center gap-2 text-xs font-mono uppercase tracking-[0.18em] text-slate-400">
                    <Phone className="h-4 w-4 text-[#00F0FF]" />
                    <span>{labels.phones}</span>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                    {phoneNumbers.map((phone) => (
                      <a
                        key={phone.href}
                        href={phone.href}
                        className="group flex items-center justify-between rounded-2xl border border-[#0F5BFF]/24 bg-black/30 px-4 py-3 text-sm font-bold text-white transition-all hover:border-[#00F0FF]/55 hover:bg-[#0F5BFF]/12 hover:text-[#7EEBFF]"
                      >
                        <span>{phone.label}</span>
                        <Phone className="h-4 w-4 text-[#0F5BFF] transition-colors group-hover:text-[#00F0FF]" />
                      </a>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="mb-3 flex items-center gap-2 text-xs font-mono uppercase tracking-[0.18em] text-slate-400">
                    <MapPin className="h-4 w-4 text-[#00F0FF]" />
                    <span>{labels.location}</span>
                  </div>
                  <a
                    href={contactUrls.map}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between gap-4 rounded-2xl border border-[#0F5BFF]/24 bg-black/30 px-4 py-4 transition-all hover:border-[#00F0FF]/55 hover:bg-[#0F5BFF]/12"
                  >
                    <div>
                      <div className="font-semibold text-white">{labels.locationText}</div>
                      <div className="mt-1 text-xs text-slate-400">41.2301119, 69.325901</div>
                    </div>
                    <ExternalLink className="h-4 w-4 shrink-0 text-[#0F5BFF] transition-colors group-hover:text-[#00F0FF]" />
                  </a>
                </div>

                <div>
                  <div className="mb-3 flex items-center gap-2 text-xs font-mono uppercase tracking-[0.18em] text-slate-400">
                    <span className="h-4 w-4 rounded-full border border-[#00F0FF]/60" />
                    <span>{labels.socials}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
                    {socialLinks.map((social) => {
                      const Icon = social.icon;
                      return (
                        <a
                          key={social.name}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={social.name}
                          className="group flex min-h-12 items-center gap-2.5 rounded-2xl border border-[#0F5BFF]/24 bg-black/30 px-3.5 py-3 text-xs font-semibold text-slate-200 transition-all hover:-translate-y-0.5 hover:border-[#00F0FF]/55 hover:bg-[#0F5BFF]/14 hover:text-white"
                        >
                          <Icon className="h-[18px] w-[18px] text-[#0F5BFF] transition-colors group-hover:text-[#00F0FF]" />
                          <span>{social.name}</span>
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative lg:col-span-7">
            <div className="relative h-full min-h-[460px] overflow-hidden rounded-[28px] border border-[#0F5BFF]/28 bg-black shadow-[0_24px_65px_rgba(0,0,0,0.48)]">
              <iframe
                title={labels.mapTitle}
                src={contactUrls.mapEmbed}
                className="absolute inset-0 h-full w-full border-0 grayscale-[0.12] contrast-[1.04]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />

              <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#020308]/70 to-transparent" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#020308]/80 to-transparent" />

              <div className="absolute left-4 right-4 top-4 flex items-center justify-between rounded-2xl border border-white/10 bg-[#020308]/76 px-4 py-3 backdrop-blur-md sm:left-6 sm:right-auto sm:min-w-[280px]">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#0F5BFF]/40 bg-[#0F5BFF]/16 text-[#00F0FF]">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#00F0FF]">
                      {labels.mapTitle}
                    </div>
                    <div className="mt-0.5 text-sm font-bold text-white">UZTRANSFORMATOR</div>
                  </div>
                </div>
              </div>

              <a
                href={contactUrls.map}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-5 left-1/2 inline-flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full border border-[#0F5BFF]/45 bg-[#020308]/88 px-5 py-3 text-xs font-semibold uppercase tracking-[0.08em] text-white shadow-[0_12px_35px_rgba(0,0,0,0.45)] backdrop-blur-md transition-all hover:border-[#00F0FF]/70 hover:bg-[#0F5BFF]"
              >
                <MapPin className="h-4 w-4 text-[#00F0FF]" />
                <span>{labels.openMap}</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
