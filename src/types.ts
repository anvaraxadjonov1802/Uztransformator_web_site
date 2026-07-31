export type Language = 'uz' | 'ru' | 'en';

export type ProductCategory = 'all' | 'tmg' | 'ktp' | 'ru';

export interface ProductSpec {
  label: Record<Language, string>;
  value: string | Record<Language, string>;
}

export interface Product {
  id: string;
  name: Record<Language, string>;
  category: ProductCategory;
  image: string;
  shortDesc: Record<Language, string>;
  fullDesc: Record<Language, string>;
  specs: ProductSpec[];
  borderVariant: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
}

export interface Certificate {
  id: string;
  title: Record<Language, string>;
  issuer: Record<Language, string>;
  year: string;
  image: string;
  description: Record<Language, string>;
}

export interface Partner {
  id: string;
  name: string;
  logo: string;
  url: string;
}

export interface ContactFormData {
  name: string;
  phone: string;
  message: string;
}

export interface SiteConfig {
  brandName: string;
  slogan: string;
  phone: string;
  email: string;
  address: Record<Language, string>;
  workHours: Record<Language, string>;
  stats: Array<{
    value: string;
    label: Record<Language, string>;
  }>;
}
