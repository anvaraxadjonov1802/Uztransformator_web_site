import { Certificate } from '../types';

export const certificatesData: Certificate[] = [
  {
    id: 'power-transformer-conformity',
    title: {
      uz: 'Kuch transformatorlari muvofiqlik sertifikati',
      ru: 'Сертификат соответствия силовых трансформаторов',
      en: 'Power Transformer Certificate of Conformity',
    },
    issuer: {
      uz: 'Muvofiqlikni sertifikatlash organi',
      ru: 'Орган по сертификации соответствия',
      en: 'Conformity certification body',
    },
    year: '2024',
    image: '/assets/certificates/conformity-power.webp',
    description: {
      uz: 'Kuch transformatorlari uchun berilgan rasmiy muvofiqlik sertifikati.',
      ru: 'Официальный сертификат соответствия на силовые трансформаторы.',
      en: 'Official certificate of conformity for power transformers.',
    },
  },
  {
    id: 'dry-transformer-conformity',
    title: {
      uz: 'Quruq transformatorlar muvofiqlik sertifikati',
      ru: 'Сертификат соответствия сухих трансформаторов',
      en: 'Dry Transformer Certificate of Conformity',
    },
    issuer: {
      uz: 'Muvofiqlikni sertifikatlash organi',
      ru: 'Орган по сертификации соответствия',
      en: 'Conformity certification body',
    },
    year: '2024',
    image: '/assets/certificates/conformity-dry.webp',
    description: {
      uz: 'Quruq transformatorlar uchun berilgan rasmiy muvofiqlik sertifikati.',
      ru: 'Официальный сертификат соответствия на сухие трансформаторы.',
      en: 'Official certificate of conformity for dry transformers.',
    },
  },
  {
    id: 'industrial-license',
    title: {
      uz: 'Sanoat obyektlari bo‘yicha litsenziya',
      ru: 'Лицензия на деятельность с промышленными объектами',
      en: 'Industrial Facilities License',
    },
    issuer: {
      uz: 'O‘zbekiston Respublikasi vakolatli organi',
      ru: 'Уполномоченный орган Республики Узбекистан',
      en: 'Authorized body of the Republic of Uzbekistan',
    },
    year: '2023',
    image: '/assets/certificates/license.webp',
    description: {
      uz: 'Yuqori xavfli va potensial xavfli obyektlar bilan bog‘liq faoliyat uchun berilgan litsenziya.',
      ru: 'Лицензия на деятельность, связанную с объектами повышенного риска и потенциально опасными производствами.',
      en: 'License for activities involving high-risk and potentially hazardous facilities.',
    },
  },
];
