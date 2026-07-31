import { SiteConfig } from '../types';

export const siteConfig: SiteConfig = {
  brandName: 'UZTRANSFORMATOR',
  slogan: 'BUILT FOR POWER',
  phone: '+998 71 200 00 00',
  email: 'info@uztransformator.uz',
  address: {
    uz: 'Toshkent sh., Sergeli tumani, Sanoat zonasi, 42-uy',
    ru: 'г. Ташкент, Сергелийский р-н, Промзона, д. 42',
    en: 'Tashkent city, Sergeli district, Industrial Zone, 42',
  },
  workHours: {
    uz: 'Dushanba - Shanba: 09:00 - 18:00',
    ru: 'Понедельник - Суббота: 09:00 - 18:00',
    en: 'Monday - Saturday: 09:00 - 18:00',
  },
  stats: [
    {
      value: '15+',
      label: {
        uz: 'Yillik tajriba',
        ru: 'Лет опыта',
        en: 'Years of Experience',
      },
    },
    {
      value: '10 000+',
      label: {
        uz: 'O‘rnatilgan uskunalar',
        ru: 'Установленных агрегатов',
        en: 'Units Installed',
      },
    },
    {
      value: '99.9%',
      label: {
        uz: 'Ishonchlilik ko‘rsatkich',
        ru: 'Показатель надежности',
        en: 'Reliability Index',
      },
    },
    {
      value: 'ISO 9001',
      label: {
        uz: 'Xalqaro sertifikat',
        ru: 'Международный стандарт',
        en: 'International Quality',
      },
    },
  ],
};
