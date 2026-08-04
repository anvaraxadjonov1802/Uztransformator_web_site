import { useSyncExternalStore } from 'react';
import { certificatesData } from '../data/certificates';
import { partnersData } from '../data/partners';
import { productsData } from '../data/products';
import { AdminAccount, ContactSettings, SiteContent } from '../types';

const STORAGE_KEY = 'uztransformator-site-content-v1';
const listeners = new Set<() => void>();

const defaultContact: ContactSettings = {
  phones: [
    { label: '+998 88 599 99 99', href: 'tel:+998885999999' },
    { label: '+998 77 666 66 66', href: 'tel:+998776666666' },
  ],
  email: 'info@uztransformator.uz',
  address: {
    uz: 'Toshkent shahri, UZTRANSFORMATOR ishlab chiqarish hududi',
    ru: 'г. Ташкент, производственная территория UZTRANSFORMATOR',
    en: 'Tashkent, UZTRANSFORMATOR production site',
  },
  workHours: {
    uz: 'Dushanba – Shanba: 09:00–18:00',
    ru: 'Понедельник – Суббота: 09:00–18:00',
    en: 'Monday – Saturday: 09:00–18:00',
  },
  locationText: {
    uz: 'UZTRANSFORMATOR — Toshkent',
    ru: 'UZTRANSFORMATOR — Ташкент',
    en: 'UZTRANSFORMATOR — Tashkent',
  },
  coordinates: '41.2301119, 69.325901',
  mapUrl: 'https://www.google.com/maps/place/UZTRANSFORMATOR/@41.2302145,69.3266968,18.25z/data=!4m6!3m5!1s0x38ae5f001aad737f:0xf6552ec198d8be4!8m2!3d41.2301119!4d69.325901!16s%2Fg%2F11y624vmdq',
  mapEmbed: 'https://www.google.com/maps?q=41.2301119,69.325901&z=18&output=embed',
  socials: {
    telegram: 'https://t.me/energomax_uz',
    instagram: 'https://www.instagram.com/uztransformator',
    whatsapp: 'https://api.whatsapp.com/send/?phone=998710000000&text&type=phone_number&app_absent=0',
    facebook: 'https://www.facebook.com/uztransformator',
    linkedin: 'https://www.linkedin.com/company/uztransformator/',
  },
};

const defaultAdmins: AdminAccount[] = [
  {
    id: 'admin-main',
    name: 'Bosh administrator',
    username: 'admin',
    password: 'uztransformator_admin',
    role: 'Super Admin',
    createdAt: new Date().toISOString(),
  },
];

const cloneDefaults = (): SiteContent => ({
  products: structuredClone(productsData),
  certificates: structuredClone(certificatesData),
  partners: structuredClone(partnersData),
  contact: structuredClone(defaultContact),
  admins: structuredClone(defaultAdmins),
});

const mergeContent = (value: Partial<SiteContent> | null): SiteContent => {
  const fallback = cloneDefaults();
  if (!value) return fallback;
  return {
    products: Array.isArray(value.products) ? value.products : fallback.products,
    certificates: Array.isArray(value.certificates) ? value.certificates : fallback.certificates,
    partners: Array.isArray(value.partners) ? value.partners : fallback.partners,
    contact: value.contact ? { ...fallback.contact, ...value.contact, socials: { ...fallback.contact.socials, ...value.contact.socials } } : fallback.contact,
    admins: Array.isArray(value.admins) && value.admins.length > 0 ? value.admins : fallback.admins,
  };
};

const loadInitialContent = (): SiteContent => {
  if (typeof window === 'undefined') return cloneDefaults();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return mergeContent(raw ? JSON.parse(raw) : null);
  } catch {
    return cloneDefaults();
  }
};

let currentContent = loadInitialContent();

const emit = () => listeners.forEach((listener) => listener());

export const getSiteContent = () => currentContent;

export const saveSiteContent = (content: SiteContent) => {
  currentContent = content;
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
  }
  emit();
};

export const updateSiteContent = (updater: (current: SiteContent) => SiteContent) => {
  saveSiteContent(updater(currentContent));
};

export const resetSiteContent = () => saveSiteContent(cloneDefaults());

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

export const useSiteContent = () =>
  useSyncExternalStore(subscribe, getSiteContent, cloneDefaults);

if (typeof window !== 'undefined') {
  window.addEventListener('storage', (event) => {
    if (event.key !== STORAGE_KEY) return;
    try {
      currentContent = mergeContent(event.newValue ? JSON.parse(event.newValue) : null);
      emit();
    } catch {
      // Ignore invalid cross-tab storage changes.
    }
  });
}
