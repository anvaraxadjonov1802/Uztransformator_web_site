import React from 'react';
import {
  Clock3,
  ExternalLink,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
} from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { useSiteContent } from '../admin/contentStore';

interface ContactSectionProps {
  currentLang: Language;
  prefilledProduct?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ currentLang }) => {
  const t = translations[currentLang].contact;
  const { contact } = useSiteContent();

  const labels = {
    uz: {
      phones: 'Telefon raqamlar',
      email: 'Elektron pochta',
      address: 'Manzil',
      hours: 'Ish vaqti',
      location: 'Geolokatsiya',
      openMap: 'Google Mapsda ochish',
      socials: 'Ijtimoiy tarmoqlar',
      mapTitle: 'Bizning manzilimiz',
    },
    ru: {
      phones: 'Телефонные номера',
      email: 'Электронная почта',
      address: 'Адрес',
      hours: 'Режим работы',
      location: 'Геолокация',
      openMap: 'Открыть в Google Maps',
      socials: 'Социальные сети',
      mapTitle: 'Наш адрес',
    },
    en: {
      phones: 'Phone numbers',
      email: 'Email',
      address: 'Address',
      hours: 'Working hours',
      location: 'Location',
      openMap: 'Open in Google Maps',
      socials: 'Social networks',
      mapTitle: 'Our location',
    },
  }[currentLang];

  const socialLinks = [
    { name: 'Telegram', href: contact.socials.telegram, icon: Send },
    { name: 'Instagram', href: contact.socials.instagram, icon: Instagram },
    { name: 'WhatsApp', href: contact.socials.whatsapp, icon: MessageCircle },
    { name: 'Facebook', href: contact.socials.facebook, icon: Facebook },
    { name: 'LinkedIn', href: contact.socials.linkedin, icon: Linkedin },
  ].filter((social) => social.href.trim());

  return (
    <section id="contact" className="relative overflow-hidden site-section-surface py-20 lg:py-32">
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
                <h3 className="font-display text-2xl font-bold uppercase tracking-wide text-white">{t.infoTitle}</h3>
              </div>

              <div className="space-y-6">
                <div>
                  <div className="mb-3 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-slate-400">
                    <Phone className="h-4 w-4 text-[#00F0FF]" />
                    <span>{labels.phones}</span>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                    {contact.phones.map((phone) => (
                      <a
                        key={`${phone.href}-${phone.label}`}
                        href={phone.href}
                        className="group flex items-center justify-between rounded-2xl border border-[#0F5BFF]/24 bg-black/30 px-4 py-3 text-sm font-bold text-white transition-all hover:border-[#00F0FF]/55 hover:bg-[#0F5BFF]/12 hover:text-[#7EEBFF]"
                      >
                        <span>{phone.label}</span>
                        <Phone className="h-4 w-4 text-[#0F5BFF] transition-colors group-hover:text-[#00F0FF]" />
                      </a>
                    ))}
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                  <a href={`mailto:${contact.email}`} className="rounded-2xl border border-[#0F5BFF]/24 bg-black/30 px-4 py-4 transition-all hover:border-[#00F0FF]/55 hover:bg-[#0F5BFF]/12">
                    <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-slate-400"><Mail className="h-4 w-4 text-[#00F0FF]" />{labels.email}</div>
                    <div className="mt-2 break-all text-sm font-semibold text-white">{contact.email}</div>
                  </a>
                  <div className="rounded-2xl border border-[#0F5BFF]/24 bg-black/30 px-4 py-4">
                    <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-slate-400"><Clock3 className="h-4 w-4 text-[#00F0FF]" />{labels.hours}</div>
                    <div className="mt-2 text-sm font-semibold leading-5 text-white">{contact.workHours[currentLang]}</div>
                  </div>
                </div>

                <div>
                  <div className="mb-3 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-slate-400">
                    <MapPin className="h-4 w-4 text-[#00F0FF]" />
                    <span>{labels.location}</span>
                  </div>
                  <a
                    href={contact.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between gap-4 rounded-2xl border border-[#0F5BFF]/24 bg-black/30 px-4 py-4 transition-all hover:border-[#00F0FF]/55 hover:bg-[#0F5BFF]/12"
                  >
                    <div>
                      <div className="font-semibold text-white">{contact.locationText[currentLang]}</div>
                      <div className="mt-1 text-xs leading-5 text-slate-400">{contact.address[currentLang]}</div>
                      <div className="mt-1 font-mono text-[10px] text-slate-500">{contact.coordinates}</div>
                    </div>
                    <ExternalLink className="h-4 w-4 shrink-0 text-[#0F5BFF] transition-colors group-hover:text-[#00F0FF]" />
                  </a>
                </div>

                <div>
                  <div className="mb-3 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-slate-400">
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
            <div className="relative h-full min-h-[540px] overflow-hidden rounded-[28px] border border-[#0F5BFF]/28 bg-black shadow-[0_24px_65px_rgba(0,0,0,0.48)]">
              <iframe
                title={labels.mapTitle}
                src={contact.mapEmbed}
                className="absolute inset-0 h-full w-full border-0 grayscale-[0.12] contrast-[1.04]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
              <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#020308]/70 to-transparent" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#020308]/80 to-transparent" />
              <div className="absolute left-4 right-4 top-4 flex items-center justify-between rounded-2xl border border-white/10 bg-[#020308]/76 px-4 py-3 backdrop-blur-md sm:left-6 sm:right-auto sm:min-w-[310px]">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#0F5BFF]/40 bg-[#0F5BFF]/16 text-[#00F0FF]"><MapPin className="h-5 w-5" /></div>
                  <div><div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#00F0FF]">{labels.mapTitle}</div><div className="mt-0.5 text-sm font-bold text-white">{contact.locationText[currentLang]}</div></div>
                </div>
              </div>
              <a
                href={contact.mapUrl}
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
