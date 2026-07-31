import { Product } from '../types';

export const productsData: Product[] = [
  {
    id: 'tmg-oil-aluminium',
    name: {
      uz: "Yog'da yopiq germetik transformator TMG-1000/10",
      ru: 'Трансформатор масляный герметичный ТМГ-1000/10',
      en: 'Oil-sealed transformer TMG-1000/10',
    },
    category: 'tmg',
    image: '/assets/catalog/tmg-oil-aluminium.webp',
    shortDesc: {
      uz: "Quvvat: 25–3150 kVA · O'ram materiali: Alyuminiy",
      ru: 'Мощность: 25–3150 кВА · Материал обмоток: Алюминий',
      en: 'Power: 25–3150 kVA · Winding material: Aluminum',
    },
    fullDesc: {
      uz: "Quvvat 25–3150 kVA, kuchlanish sinfi 10/06–04 kV. Alyuminiy o'ramli, moyli sovutish tizimiga ega. Yo'qotish darajasi 2–5%.",
      ru: 'Мощность 25–3150 кВА, класс напряжения 10/06–04 кВ. Алюминиевая обмотка, масляное охлаждение. Уровень потерь 2–5%.',
      en: 'Power 25–3150 kVA, voltage class 10/06–04 kV. Aluminum winding with oil cooling. Loss level 2–5%.',
    },
    specs: [
      {
        label: { uz: 'Quvvat', ru: 'Мощность', en: 'Power' },
        value: { uz: '25–3150 kVA', ru: '25–3150 кВА', en: '25–3150 kVA' },
      },
      {
        label: { uz: 'Kuchlanish sinfi', ru: 'Класс напряжения', en: 'Voltage class' },
        value: { uz: '10/06–04 kV', ru: '10/06–04 кВ', en: '10/06–04 kV' },
      },
      {
        label: { uz: "O'ram materiali", ru: 'Материал обмоток', en: 'Winding material' },
        value: { uz: 'Alyuminiy', ru: 'Алюминий', en: 'Aluminum' },
      },
      {
        label: { uz: 'Sovutish turi', ru: 'Тип охлаждения', en: 'Cooling type' },
        value: { uz: 'Moyli', ru: 'Масляный', en: 'Oil' },
      },
      {
        label: { uz: "Yo'qotish darajasi", ru: 'Уровень потерь', en: 'Loss level' },
        value: '2–5%',
      },
    ],
    borderVariant: 1,
  },
  {
    id: 'tmg-oil-copper',
    name: {
      uz: "Yog'da yopiq germetik transformator TMG-1000/10",
      ru: 'Трансформатор масляный герметичный ТМГ-1000/10',
      en: 'Oil-sealed transformer TMG-1000/10',
    },
    category: 'tmg',
    image: '/assets/catalog/tmg-oil-copper.webp',
    shortDesc: {
      uz: "Quvvat: 25–3150 kVA · O'ram materiali: Mis",
      ru: 'Мощность: 25–3150 кВА · Материал обмоток: Медь',
      en: 'Power: 25–3150 kVA · Winding material: Copper',
    },
    fullDesc: {
      uz: "Quvvat 25–3150 kVA, kuchlanish sinfi 10/06–04 kV. Mis o'ramli, moyli sovutish tizimiga ega. Yo'qotish darajasi 2–5%.",
      ru: 'Мощность 25–3150 кВА, класс напряжения 10/06–04 кВ. Медная обмотка, масляное охлаждение. Уровень потерь 2–5%.',
      en: 'Power 25–3150 kVA, voltage class 10/06–04 kV. Copper winding with oil cooling. Loss level 2–5%.',
    },
    specs: [
      {
        label: { uz: 'Quvvat', ru: 'Мощность', en: 'Power' },
        value: { uz: '25–3150 kVA', ru: '25–3150 кВА', en: '25–3150 kVA' },
      },
      {
        label: { uz: 'Kuchlanish sinfi', ru: 'Класс напряжения', en: 'Voltage class' },
        value: { uz: '10/06–04 kV', ru: '10/06–04 кВ', en: '10/06–04 kV' },
      },
      {
        label: { uz: "O'ram materiali", ru: 'Материал обмоток', en: 'Winding material' },
        value: { uz: 'Mis', ru: 'Медь', en: 'Copper' },
      },
      {
        label: { uz: 'Sovutish turi', ru: 'Тип охлаждения', en: 'Cooling type' },
        value: { uz: 'Moyli', ru: 'Масляный', en: 'Oil' },
      },
      {
        label: { uz: "Yo'qotish darajasi", ru: 'Уровень потерь', en: 'Loss level' },
        value: '2–5%',
      },
    ],
    borderVariant: 2,
  },
  {
    id: 'tmg-dry-copper',
    name: {
      uz: 'Quruq transformator TMG-1000/10',
      ru: 'Трансформатор сухой ТМГ-1000/10',
      en: 'Dry transformer TMG-1000/10',
    },
    category: 'tmg',
    image: '/assets/catalog/dry-copper.webp',
    shortDesc: {
      uz: "Quvvat: 25–3150 kVA · O'ram materiali: Mis",
      ru: 'Мощность: 25–3150 кВА · Материал обмоток: Медь',
      en: 'Power: 25–3150 kVA · Winding material: Copper',
    },
    fullDesc: {
      uz: "Quvvat 25–3150 kVA, kuchlanish sinfi 10/06–04 kV. Mis o'ramli, quruq sovutish turiga ega. Yo'qotish darajasi 2–5%.",
      ru: 'Мощность 25–3150 кВА, класс напряжения 10/06–04 кВ. Медная обмотка, сухой тип охлаждения. Уровень потерь 2–5%.',
      en: 'Power 25–3150 kVA, voltage class 10/06–04 kV. Copper winding with dry cooling. Loss level 2–5%.',
    },
    specs: [
      {
        label: { uz: 'Quvvat', ru: 'Мощность', en: 'Power' },
        value: { uz: '25–3150 kVA', ru: '25–3150 кВА', en: '25–3150 kVA' },
      },
      {
        label: { uz: 'Kuchlanish sinfi', ru: 'Класс напряжения', en: 'Voltage class' },
        value: { uz: '10/06–04 kV', ru: '10/06–04 кВ', en: '10/06–04 kV' },
      },
      {
        label: { uz: "O'ram materiali", ru: 'Материал обмоток', en: 'Winding material' },
        value: { uz: 'Mis', ru: 'Медь', en: 'Copper' },
      },
      {
        label: { uz: 'Sovutish turi', ru: 'Тип охлаждения', en: 'Cooling type' },
        value: { uz: 'Quruq', ru: 'Сухой', en: 'Dry' },
      },
      {
        label: { uz: "Yo'qotish darajasi", ru: 'Уровень потерь', en: 'Loss level' },
        value: '2–5%',
      },
    ],
    borderVariant: 3,
  },
  {
    id: 'tmg-dry-aluminium',
    name: {
      uz: 'Quruq transformator TMG-1000/10',
      ru: 'Трансформатор сухой ТМГ-1000/10',
      en: 'Dry transformer TMG-1000/10',
    },
    category: 'tmg',
    image: '/assets/catalog/dry-aluminium.webp',
    shortDesc: {
      uz: "Quvvat: 25–3150 kVA · O'ram materiali: Alyuminiy",
      ru: 'Мощность: 25–3150 кВА · Материал обмоток: Алюминий',
      en: 'Power: 25–3150 kVA · Winding material: Aluminum',
    },
    fullDesc: {
      uz: "Quvvat 25–3150 kVA, kuchlanish sinfi 10/06–04 kV. Alyuminiy o'ramli, quruq sovutish turiga ega. Yo'qotish darajasi 2–5%.",
      ru: 'Мощность 25–3150 кВА, класс напряжения 10/06–04 кВ. Алюминиевая обмотка, сухой тип охлаждения. Уровень потерь 2–5%.',
      en: 'Power 25–3150 kVA, voltage class 10/06–04 kV. Aluminum winding with dry cooling. Loss level 2–5%.',
    },
    specs: [
      {
        label: { uz: 'Quvvat', ru: 'Мощность', en: 'Power' },
        value: { uz: '25–3150 kVA', ru: '25–3150 кВА', en: '25–3150 kVA' },
      },
      {
        label: { uz: 'Kuchlanish sinfi', ru: 'Класс напряжения', en: 'Voltage class' },
        value: { uz: '10/06–04 kV', ru: '10/06–04 кВ', en: '10/06–04 kV' },
      },
      {
        label: { uz: "O'ram materiali", ru: 'Материал обмоток', en: 'Winding material' },
        value: { uz: 'Alyuminiy', ru: 'Алюминий', en: 'Aluminum' },
      },
      {
        label: { uz: 'Sovutish turi', ru: 'Тип охлаждения', en: 'Cooling type' },
        value: { uz: 'Quruq', ru: 'Сухой', en: 'Dry' },
      },
      {
        label: { uz: "Yo'qotish darajasi", ru: 'Уровень потерь', en: 'Loss level' },
        value: '2–5%',
      },
    ],
    borderVariant: 4,
  },
  {
    id: 'ktp-pass-through',
    name: {
      uz: "KTP seriyali to'liq transformator podstansiyasi (o'tuvchi)",
      ru: 'Комплектная трансформаторная подстанция КТП (проходная)',
      en: 'Packaged substation KTP (pass-through)',
    },
    category: 'ktp',
    image: '/assets/catalog/ktp-pass-through.webp',
    shortDesc: {
      uz: "Bajarilish turi: O'tuvchi · Kabel kirish-chiqishi: Havo",
      ru: 'Исполнение: Проходной · Ввод-вывод кабеля: Воздушный',
      en: 'Design: Pass-through · Cable in/out: Overhead',
    },
    fullDesc: {
      uz: "Yuqori kuchlanishli hujayra — 1 dona, past kuchlanishli panel 0,4 kV — 1 dona va ASKUE 0,4 kV — 1 dona. Iqlim ijrosi U1 / HL1, −45 °C dan +40 °C gacha.",
      ru: 'Высоковольтная ячейка — 1 шт., низковольтная панель 0,4 кВ — 1 шт. и АСКУЭ 0,4 кВ — 1 шт. Климатическое исполнение U1 / HL1, −45 °C … +40 °C.',
      en: 'HV cell — 1 pc, LV panel 0.4 kV — 1 pc and AMR 0.4 kV — 1 pc. Climate category U1 / HL1, −45 °C … +40 °C.',
    },
    specs: [
      {
        label: { uz: 'Bajarilish va joylashuv turi', ru: 'Исполнение и расположение', en: 'Design & layout' },
        value: { uz: "O'tuvchi", ru: 'Проходной', en: 'Pass-through' },
      },
      {
        label: { uz: 'Kabel kirish-chiqish turi', ru: 'Тип ввода-вывода кабеля', en: 'Cable in/out' },
        value: { uz: 'Havo', ru: 'Воздушный', en: 'Overhead' },
      },
      {
        label: { uz: 'Kommutatsiya apparatlari', ru: 'Коммутационные аппараты', en: 'Switchgear' },
        value: {
          uz: 'Yuqori kuchlanishli hujayra — 1 dona, past kuchlanishli panel 0,4 kV — 1 dona; ASKUE 0,4 kV — 1 dona.',
          ru: 'Высоковольтная ячейка — 1 шт, низковольтная панель 0,4 кВ — 1 шт; АСКУЭ 0,4 кВ — 1 шт.',
          en: 'HV cell — 1 pc, LV panel 0.4 kV — 1 pc; AMR 0.4 kV — 1 pc.',
        },
      },
      {
        label: { uz: 'Iqlim ijrosi va joylashuv toifasi', ru: 'Климатическое исполнение', en: 'Climate category' },
        value: {
          uz: 'U1 / HL1, −45 °C dan +40 °C gacha',
          ru: 'U1 / HL1, −45 °C … +40 °C',
          en: 'U1 / HL1, −45 °C … +40 °C',
        },
      },
    ],
    borderVariant: 5,
  },
  {
    id: 'ktp-dead-end',
    name: {
      uz: "KTP seriyali to'liq transformator podstansiyasi (tupik)",
      ru: 'Комплектная трансформаторная подстанция КТП (тупиковая)',
      en: 'Packaged substation KTP (dead-end)',
    },
    category: 'ktp',
    image: '/assets/catalog/ktp-dead-end.webp',
    shortDesc: {
      uz: 'Bajarilish turi: Tupik · Kabel kirish-chiqishi: Kabel',
      ru: 'Исполнение: Тупиковый · Ввод-вывод кабеля: Кабельный',
      en: 'Design: Dead-end · Cable in/out: Cable',
    },
    fullDesc: {
      uz: "Yuqori kuchlanishli hujayra — 1 dona, past kuchlanishli panel 0,4 kV — 1 dona va ASKUE 0,4 kV — 1 dona. Iqlim ijrosi U1 / HL1, −45 °C dan +40 °C gacha.",
      ru: 'Высоковольтная ячейка — 1 шт., низковольтная панель 0,4 кВ — 1 шт. и АСКУЭ 0,4 кВ — 1 шт. Климатическое исполнение U1 / HL1, −45 °C … +40 °C.',
      en: 'HV cell — 1 pc, LV panel 0.4 kV — 1 pc and AMR 0.4 kV — 1 pc. Climate category U1 / HL1, −45 °C … +40 °C.',
    },
    specs: [
      {
        label: { uz: 'Bajarilish va joylashuv turi', ru: 'Исполнение и расположение', en: 'Design & layout' },
        value: { uz: 'Tupik', ru: 'Тупиковый', en: 'Dead-end' },
      },
      {
        label: { uz: 'Kabel kirish-chiqish turi', ru: 'Тип ввода-вывода кабеля', en: 'Cable in/out' },
        value: { uz: 'Kabel', ru: 'Кабельный', en: 'Cable' },
      },
      {
        label: { uz: 'Kommutatsiya apparatlari', ru: 'Коммутационные аппараты', en: 'Switchgear' },
        value: {
          uz: 'Yuqori kuchlanishli hujayra — 1 dona, past kuchlanishli panel 0,4 kV — 1 dona; ASKUE 0,4 kV — 1 dona.',
          ru: 'Высоковольтная ячейка — 1 шт, низковольтная панель 0,4 кВ — 1 шт; АСКУЭ 0,4 кВ — 1 шт.',
          en: 'HV cell — 1 pc, LV panel 0.4 kV — 1 pc; AMR 0.4 kV — 1 pc.',
        },
      },
      {
        label: { uz: 'Iqlim ijrosi va joylashuv toifasi', ru: 'Климатическое исполнение', en: 'Climate category' },
        value: {
          uz: 'U1 / HL1, −45 °C dan +40 °C gacha',
          ru: 'U1 / HL1, −45 °C … +40 °C',
          en: 'U1 / HL1, −45 °C … +40 °C',
        },
      },
    ],
    borderVariant: 6,
  },
  {
    id: 'ru-lv-hv',
    name: {
      uz: 'RU seriyali past va yuqori kuchlanishli elektr uzatish moslamalari',
      ru: 'Распределительные устройства РУ (НН/ВН)',
      en: 'Distribution units RU (LV/HV)',
    },
    category: 'ru',
    image: '/assets/catalog/ru-switchgear-final.webp',
    shortDesc: {
      uz: 'AVR mavjud · Elektron hisoblagichlar, ASKUE va UKRM bilan',
      ru: 'АВР · Электронные счётчики, АСКУЭ и УКРМ',
      en: 'ATS · Electronic meters, AMR and UKRM',
    },
    fullDesc: {
      uz: 'AVR mavjud. Elektr hisobga olish tuguni elektron hisoblagichlar, jumladan ASKUE bilan jihozlanadi. Reaktiv quvvat kompensatsiyasi UKRM orqali bajariladi. Xavfsizlik tizimi mavjud.',
      ru: 'АВР предусмотрен. Узел учёта электроэнергии комплектуется электронными счётчиками, включая АСКУЭ. Компенсация реактивной мощности выполняется УКРМ. Система безопасности предусмотрена.',
      en: 'ATS is available. The metering unit uses electronic meters including AMR. Reactive power compensation is provided by UKRM. Safety is available.',
    },
    specs: [
      {
        label: { uz: 'AVR', ru: 'АВР', en: 'ATS' },
        value: { uz: 'Bor', ru: 'Есть', en: 'Yes' },
      },
      {
        label: { uz: 'Elektr hisobga olish tuguni', ru: 'Узел учёта электроэнергии', en: 'Metering unit' },
        value: {
          uz: 'Elektron hisoblagichlar (ASKUE)',
          ru: 'Электронные счётчики (вкл. АСКУЭ)',
          en: 'Electronic meters (incl. AMR)',
        },
      },
      {
        label: { uz: 'Reaktiv quvvat kompensatsiyasi (UKRM)', ru: 'Компенсация реактивной мощности (УКРМ)', en: 'Reactive power compensation' },
        value: 'UKRM',
      },
      {
        label: { uz: 'Xavfsizlik', ru: 'Безопасность', en: 'Safety' },
        value: { uz: 'Mavjud', ru: 'Есть', en: 'Available' },
      },
    ],
    borderVariant: 7,
  },
];
