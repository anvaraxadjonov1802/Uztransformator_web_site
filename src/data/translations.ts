import { Language } from '../types';

export interface Translations {
  nav: {
    home: string;
    catalog: string;
    about: string;
    contact: string;
  };
  hero: {
    title: string;
    slogan: string;
    exploreBtn: string;
    scrollDown: string;
  };
  intro: {
    titleLine1: string;
    titleLine2: string;
    description: string;
    badgeText: string;
  };
  catalog: {
    title: string;
    subtitle: string;
    all: string;
    tmg: string;
    ktp: string;
    ru: string;
    detailsBtn: string;
    specsTitle: string;
    inquireBtn: string;
    closeModal: string;
    passportTitle: string;
    descriptionTitle: string;
    warrantyText: string;
  };
  about: {
    title: string;
    tagline: string;
    text: string;
    missionTitle: string;
    missionText: string;
  };
  certificates: {
    title: string;
    subtitle: string;
    previewBtn: string;
    modalTitle: string;
  };
  partners: {
    title: string;
    subtitle: string;
  };
  contact: {
    title: string;
    subtitle: string;
    infoTitle: string;
    formTitle: string;
    phoneLabel: string;
    emailLabel: string;
    addressLabel: string;
    hoursLabel: string;
    nameField: string;
    namePlaceholder: string;
    phoneField: string;
    phonePlaceholder: string;
    messageField: string;
    messagePlaceholder: string;
    sendBtn: string;
    sendingBtn: string;
    successToastTitle: string;
    successToastMsg: string;
    errorToastMsg: string;
  };
  footer: {
    copyright: string;
  };
}

export const translations: Record<Language, Translations> = {
  uz: {
    nav: {
      home: 'Bosh sahifa',
      catalog: 'Katalog',
      about: 'Kompaniya haqida',
      contact: 'Kontaktlar',
    },
    hero: {
      title: 'UZTRANSFORMATOR',
      slogan: 'B U I L T   F O R   P O W E R',
      exploreBtn: 'Katalogni ko‘rish',
      scrollDown: 'Pastga suring',
    },
    intro: {
      titleLine1: 'ISHONCHLI ENERGIYA.',
      titleLine2: 'KUCHLI KELAJAK.',
      description: 'Dunyoni oldinga siljituvchi tarmoqlar uchun energetika va elektrotexnika sohasidagi ilg‘or yechimlar.',
      badgeText: 'SANOAT STANDARTI',
    },
    catalog: {
      title: 'Katalog',
      subtitle: 'Yuqori kuchlanishli va ishonchli elektrotexnika uskunalarining keng assortimenti',
      all: 'Barchasi',
      tmg: 'TMG',
      ktp: 'KTP',
      ru: 'RU',
      detailsBtn: 'Batafsil',
      specsTitle: 'Texnik ko‘rsatkichlar',
      inquireBtn: 'Buyurtma berish',
      closeModal: 'Yopish',
      passportTitle: 'Mahsulot pasporti',
      descriptionTitle: 'Tavsif',
      warrantyText: 'Rasmiy kafolat va yetkazib berish xizmati',
    },
    about: {
      title: 'Kompaniya haqida',
      tagline: 'Energetika infratuzilmasidagi ishonchli hamkoringiz',
      text: 'UZTRANSFORMATOR energetika va elektrotexnika sohasida ishonchli yechimlarni taqdim etadi. Kompaniya transformator uskunalari, zamonaviy texnologiyalar va professional xizmat orqali mijozlar ehtiyojiga mos yechimlar yaratadi.',
      missionTitle: 'Bizning vazifamiz',
      missionText: 'Mintaqaviy va sanoat ob’ektlarini xavfsiz, barqaror va uzluksiz elektr energiyasi bilan ta’minlash, innovatsion transformator texnologiyalarini joriy etish.',
    },
    certificates: {
      title: 'Sertifikatlar',
      subtitle: 'Xalqaro sifat va xavfsizlik standartlariga moslik guvohnomalari',
      previewBtn: 'Kattalashtirish',
      modalTitle: 'Sertifikat hujjati',
    },
    partners: {
      title: 'Hamkorlar',
      subtitle: 'Yetakchi sanoat va energetika korxonalari bilan hamkorlik',
    },
    contact: {
      title: 'Kontaktlar',
      subtitle: 'Biz bilan bog‘laning va mutaxassis maslahatini oling',
      infoTitle: 'Aloqa ma’lumotlari',
      formTitle: 'Murojaat yuborish',
      phoneLabel: 'Telefon',
      emailLabel: 'Email',
      addressLabel: 'Manzil',
      hoursLabel: 'Ish vaqti',
      nameField: 'Ism',
      namePlaceholder: 'Ismingizni kiriting',
      phoneField: 'Telefon raqam',
      phonePlaceholder: '+998 (__) ___-__-__',
      messageField: 'Xabar',
      messagePlaceholder: 'Ehtiyojingiz yoki loyihangiz haqida yozing...',
      sendBtn: 'Yuborish',
      sendingBtn: 'Yuborilmoqda...',
      successToastTitle: 'Murojaat qabul qilindi!',
      successToastMsg: 'Mutaxassislarimiz tez orada siz bilan bog‘lanishadi.',
      errorToastMsg: 'Iltimos, barcha maydonlarni to‘g‘ri to‘ldiring.',
    },
    footer: {
      copyright: '© 2026 UZTRANSFORMATOR. Barcha huquqlar himoyalangan.',
    },
  },
  ru: {
    nav: {
      home: 'Главная',
      catalog: 'Каталог',
      about: 'О компании',
      contact: 'Контакты',
    },
    hero: {
      title: 'UZTRANSFORMATOR',
      slogan: 'B U I L T   F O R   P O W E R',
      exploreBtn: 'Смотреть каталог',
      scrollDown: 'Прокрутите вниз',
    },
    intro: {
      titleLine1: 'НАДЕЖНАЯ ЭНЕРГИЯ.',
      titleLine2: 'МОЩНОЕ БУДУЩЕЕ.',
      description: 'Передовые решения в области энергетики и электротехники для инфраструктуры, двигающей мир вперед.',
      badgeText: 'ПРОМЫШЛЕННЫЙ СТАНДАРТ',
    },
    catalog: {
      title: 'Каталог',
      subtitle: 'Широкий ассортимент высоковольтного и энергетического оборудования',
      all: 'Все',
      tmg: 'ТМГ',
      ktp: 'КТП',
      ru: 'РУ',
      detailsBtn: 'Подробнее',
      specsTitle: 'Технические характеристики',
      inquireBtn: 'Оставить заявку',
      closeModal: 'Закрыть',
      passportTitle: 'Паспорт продукта',
      descriptionTitle: 'Описание',
      warrantyText: 'Официальная гарантия и услуга доставки',
    },
    about: {
      title: 'О компании',
      tagline: 'Ваш надежный партнер в энергетической инфраструктуре',
      text: 'UZTRANSFORMATOR предлагает надежные решения в области энергетики и электротехники. Компания создает решения, отвечающие потребностям клиентов, за счет трансформаторного оборудования, современных технологий и профессионального сервиса.',
      missionTitle: 'Наша миссия',
      missionText: 'Обеспечение промышленных и региональных объектов безопасной, устойчивой и бесперебойной электроэнергией.',
    },
    certificates: {
      title: 'Сертификаты',
      subtitle: 'Подтверждения соответствия международным стандартам качества и безопасности',
      previewBtn: 'Увеличить',
      modalTitle: 'Сертификационный документ',
    },
    partners: {
      title: 'Партнеры',
      subtitle: 'Сотрудничество с ведущими энергетическими и промышленными компаниями',
    },
    contact: {
      title: 'Контакты',
      subtitle: 'Свяжитесь с нами для получения профессиональной консультации',
      infoTitle: 'Контактная информация',
      formTitle: 'Отправить заявку',
      phoneLabel: 'Телефон',
      emailLabel: 'Email',
      addressLabel: 'Адрес',
      hoursLabel: 'Время работы',
      nameField: 'Имя',
      namePlaceholder: 'Введите ваше имя',
      phoneField: 'Номер телефона',
      phonePlaceholder: '+998 (__) ___-__-__',
      messageField: 'Сообщение',
      messagePlaceholder: 'Опишите вашу задачу или проект...',
      sendBtn: 'Отправить',
      sendingBtn: 'Отправка...',
      successToastTitle: 'Заявка принята!',
      successToastMsg: 'Наши специалисты свяжутся с вами в ближайшее время.',
      errorToastMsg: 'Пожалуйста, заполните все поля корректно.',
    },
    footer: {
      copyright: '© 2026 UZTRANSFORMATOR. Все права защищены.',
    },
  },
  en: {
    nav: {
      home: 'Home',
      catalog: 'Catalog',
      about: 'About Us',
      contact: 'Contacts',
    },
    hero: {
      title: 'UZTRANSFORMATOR',
      slogan: 'B U I L T   F O R   P O W E R',
      exploreBtn: 'Explore Catalog',
      scrollDown: 'Scroll Down',
    },
    intro: {
      titleLine1: 'RELIABLE ENERGY.',
      titleLine2: 'POWERFUL FUTURE.',
      description: 'Advanced solutions in electrical engineering and power infrastructure driving industries forward.',
      badgeText: 'INDUSTRIAL STANDARD',
    },
    catalog: {
      title: 'Catalog',
      subtitle: 'High-voltage transformers and complete electrical power equipment',
      all: 'All Products',
      tmg: 'TMG',
      ktp: 'KTP',
      ru: 'RU',
      detailsBtn: 'Details',
      specsTitle: 'Technical Specifications',
      inquireBtn: 'Request Quote',
      closeModal: 'Close',
      passportTitle: 'Product passport',
      descriptionTitle: 'Description',
      warrantyText: 'Official warranty and delivery service',
    },
    about: {
      title: 'About Us',
      tagline: 'Your trusted partner in power infrastructure solutions',
      text: 'UZTRANSFORMATOR provides reliable energy and electrical engineering solutions. The company delivers customized transformer equipment through cutting-edge technology and engineering expertise.',
      missionTitle: 'Our Mission',
      missionText: 'Empowering industrial and municipal grids with safe, efficient, and continuous electricity distribution.',
    },
    certificates: {
      title: 'Certificates',
      subtitle: 'Official certifications complying with global quality and safety benchmarks',
      previewBtn: 'Enlarge',
      modalTitle: 'Certificate Document',
    },
    partners: {
      title: 'Partners',
      subtitle: 'Trusted partnerships with premier industrial and energy giants',
    },
    contact: {
      title: 'Contacts',
      subtitle: 'Reach out to our engineering team for inquiries and consultations',
      infoTitle: 'Contact Information',
      formTitle: 'Send Inquiries',
      phoneLabel: 'Phone',
      emailLabel: 'Email',
      addressLabel: 'Address',
      hoursLabel: 'Working Hours',
      nameField: 'Name',
      namePlaceholder: 'Enter your full name',
      phoneField: 'Phone Number',
      phonePlaceholder: '+998 (__) ___-__-__',
      messageField: 'Message',
      messagePlaceholder: 'Tell us about your project requirements...',
      sendBtn: 'Submit',
      sendingBtn: 'Submitting...',
      successToastTitle: 'Inquiry Received!',
      successToastMsg: 'Our engineering specialists will contact you shortly.',
      errorToastMsg: 'Please complete all required fields accurately.',
    },
    footer: {
      copyright: '© 2026 UZTRANSFORMATOR. All rights reserved.',
    },
  },
};
