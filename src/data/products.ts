import { Product } from '../types';

export const productsData: Product[] = [
  {
    id: 'tmg-1000-10',
    name: {
      uz: 'TMG-1000/10 Kuch transformatori',
      ru: 'Силовой трансформатор ТМГ-1000/10',
      en: 'TMG-1000/10 Power Transformer',
    },
    category: 'transformers',
    image: '/assets/catalog/tmg-oil-transformer.webp',
    shortDesc: {
      uz: 'Germetik moyli, uch fazali kuch transformatori. Sanoat va shahar tarmoqlari uchun.',
      ru: 'Герметичный масляный трехфазный трансформатор для промышленных сетей.',
      en: 'Hermetically sealed oil-immersed three-phase power transformer.',
    },
    fullDesc: {
      uz: 'TMG seriyasidagi uch fazali moyli transformatorlar 10 kV kuchlanishli elektr energiyasini pasaytirish va taqsimlash uchun mo‘ljallangan. Ichki va tashqi o‘rnatish uchun mos.',
      ru: 'Трехфазные масляные трансформаторы серии ТМГ предназначены для преобразования и распределения электроэнергии 10 кВ.',
      en: 'TMG series three-phase oil-immersed power transformers designed for converting and distributing 10 kV energy in industrial environments.',
    },
    specs: [
      { label: { uz: 'Nominal quvvat', ru: 'Номинальная мощность', en: 'Rated Power' }, value: '1000 kVA' },
      { label: { uz: 'Yuqori kuchlanish (VN)', ru: 'Высшее напряжение (ВН)', en: 'High Voltage (HV)' }, value: '10 kV' },
      { label: { uz: 'Quyi kuchlanish (NN)', ru: 'Низшее напряжение (НН)', en: 'Low Voltage (LV)' }, value: '0.4 kV' },
      { label: { uz: 'Chastota', ru: 'Частота', en: 'Frequency' }, value: '50 Hz' },
      { label: { uz: 'Ulanish sxemasi', ru: 'Схема соединений', en: 'Vector Group' }, value: 'Dyn11 / Yyn0' },
    ],
    borderVariant: 1,
  },
  {
    id: 'tsz-1600-10',
    name: {
      uz: 'TSZ-1600/10 Quruq transformator',
      ru: 'Сухой трансформатор ТСЗ-1600/10',
      en: 'TSZ-1600/10 Dry-Type Transformer',
    },
    category: 'transformers',
    image: '/assets/catalog/dry-transformer-red.webp',
    shortDesc: {
      uz: 'Yong‘inga xavfsiz qatron izolyatsiyali quruq kuch transformatori.',
      ru: 'Сухой силовой трансформатор с литой литой смоляной изоляцией повышенной пожаробезопасности.',
      en: 'Fire-safe cast-resin insulated dry-type power transformer.',
    },
    fullDesc: {
      uz: 'TSZ quruq transformatorlari jamoat binolari, metro, aeroport va yong‘in xavfsizligi yuqori bo‘lgan sanoat korxonalarida foydalanish uchun mo‘ljallangan.',
      ru: 'Сухие трансформаторы ТСЗ применяются в общественных зданиях, метрополитенах, аэропортах и промышленных объектах с повышенными требованиями безопасности.',
      en: 'TSZ dry-type transformers are deployed in commercial complexes, subways, airports, and facilities with stringent fire safety regulations.',
    },
    specs: [
      { label: { uz: 'Nominal quvvat', ru: 'Номинальная мощность', en: 'Rated Power' }, value: '1600 kVA' },
      { label: { uz: 'Izolyatsiya sinfi', ru: 'Класс изоляции', en: 'Insulation Class' }, value: 'F / H (155°C / 180°C)' },
      { label: { uz: 'Himoya darajasi', ru: 'Степень защиты', en: 'Protection Class' }, value: 'IP21 / IP31' },
      { label: { uz: 'Sovutish turi', ru: 'Тип охлаждения', en: 'Cooling Type' }, value: 'AN / AF' },
    ],
    borderVariant: 2,
  },
  {
    id: 'ktp-630-10',
    name: {
      uz: 'KTP-630/10 Komplekt transformator nimstansiyasi',
      ru: 'Комплектная трансформаторная подстанция КТП-630/10',
      en: 'KTP-630/10 Complete Package Substation',
    },
    category: 'substations',
    image: '/assets/catalog/ktp-substation-main.webp',
    shortDesc: {
      uz: 'Tashqi o‘rnatish uchun mo‘ljallangan shahar va sanoat nimstansiyasi.',
      ru: 'Подстанция наружной установки для энергоснабжения промышленных и городских объектов.',
      en: 'Outdoor package substation for urban and industrial energy distribution.',
    },
    fullDesc: {
      uz: 'KTP-630/10 uch fazali o‘zgaruvchan tok elektr energiyasini qabul qilish, kuchlanishni pasaytirish va iste’molchilarga taqsimlash imkonini beradi.',
      ru: 'КТП-630/10 обеспечивает прием, транзит и преобразование электроэнергии трехфазного переменного тока.',
      en: 'KTP-630/10 facilitates receiving, transforming, and distributing three-phase AC electricity with high grid reliability.',
    },
    specs: [
      { label: { uz: 'Quvvat oralig‘i', ru: 'Мощность', en: 'Power Capacity' }, value: '630 kVA' },
      { label: { uz: 'Kirish kuchlanishi', ru: 'Входное напряжение', en: 'Input Voltage' }, value: '6 / 10 kV' },
      { label: { uz: 'Chiqish kuchlanishi', ru: 'Выходное напряжение', en: 'Output Voltage' }, value: '0.4 kV' },
      { label: { uz: 'Korpus turi', ru: 'Тип корпуса', en: 'Enclosure Type' }, value: 'Metall / Sendvich' },
    ],
    borderVariant: 3,
  },
  {
    id: 'kso-298',
    name: {
      uz: 'KSO-298 Kam gabaritli birikma kamerasi',
      ru: 'Камера сборная одностороннего обслуживания КСО-298',
      en: 'KSO-298 Compact Switchgear Cabinet',
    },
    category: 'electrical',
    image: '/assets/catalog/ru-switchgear.webp',
    shortDesc: {
      uz: '10 kV kuchlanishli taqsimlash qurilmalari uchun yuqori kuchlanishli kamera.',
      ru: 'Высоковольтная камера для распределительных устройств напряжением 10 кВ.',
      en: 'High-voltage enclosed switchgear cabinet for 10 kV distribution networks.',
    },
    fullDesc: {
      uz: 'KSO-298 kameralari 6 va 10 kV kuchlanishli, 50 Hz chastotali uch fazali o‘zgaruvchan tok taqsimlash qurilmalarida qo‘llaniladi.',
      ru: 'Камеры КСО-298 применяются в распределительных устройствах трехфазного переменного тока частотой 50 Гц.',
      en: 'KSO-298 switchgears are integrated into 6-10 kV distribution substations with advanced interlocking safety features.',
    },
    specs: [
      { label: { uz: 'Nominal kuchlanish', ru: 'Номинальное напряжение', en: 'Rated Voltage' }, value: '10 kV' },
      { label: { uz: 'Nominal tok', ru: 'Номинальный ток', en: 'Rated Current' }, value: '630 - 1000 A' },
      { label: { uz: 'Uzgich turi', ru: 'Тип выключателя', en: 'Breaker Type' }, value: 'Vakuumli (Vacuum)' },
    ],
    borderVariant: 4,
  },
  {
    id: 'tdm-2500-35',
    name: {
      uz: 'TDM-2500/35 Sanoat kuch transformatori',
      ru: 'Промышленный силовой трансформатор ТДМ-2500/35',
      en: 'TDM-2500/35 Industrial Transformer',
    },
    category: 'transformers',
    image: '/assets/catalog/tmg-oil-transformer.webp',
    shortDesc: {
      uz: '35 kV magistral tarmoqlar uchun yuqori quvvatli kuch transformatori.',
      ru: 'Мощный силовой трансформатор для магистральных сетей напряжением 35 кВ.',
      en: 'High-capacity power transformer engineered for 35 kV transmission grids.',
    },
    fullDesc: {
      uz: 'TDM-2500/35 yirik sanoat korxonalari, konchilik va hududiy nimstansiyalarda uzluksiz energiya ta’minotini kafolatlaydi.',
      ru: 'ТДМ-2500/35 гарантирует непрерывное энергоснабжение крупных промышленных предприятий и региональных узлов.',
      en: 'TDM-2500/35 powers heavy industrial complexes, mining sites, and regional sub-grid hubs.',
    },
    specs: [
      { label: { uz: 'Nominal quvvat', ru: 'Номинальная мощность', en: 'Rated Power' }, value: '2500 kVA' },
      { label: { uz: 'Yuqori kuchlanish', ru: 'Высшее напряжение', en: 'HV Rating' }, value: '35 kV' },
      { label: { uz: 'Moy hajmi', ru: 'Объем масла', en: 'Oil Volume' }, value: '1850 kg' },
    ],
    borderVariant: 5,
  },
  {
    id: 'ktpn-400-10',
    name: {
      uz: 'KTPN-400/10 Blokli shahar nimstansiyasi',
      ru: 'Блочная комплектная подстанция КТПН-400/10',
      en: 'KTPN-400/10 Block Urban Substation',
    },
    category: 'substations',
    image: '/assets/catalog/ktp-substation-wide.webp',
    shortDesc: {
      uz: 'Beton va sendvich korpusli ixcham shahar transformator nimstansiyasi.',
      ru: 'Компактная городская трансформаторная подстанция в бетонном или сэндвич-корпусе.',
      en: 'Compact urban package transformer station in reinforced concrete or sandwich panels.',
    },
    fullDesc: {
      uz: 'KTPN nimstansiyalari estetik dizayni va ixcham o‘lchamlari bilan zamonaviy turar-joy va tijorat ob’ektlariga mos keladi.',
      ru: 'КТПН отличается современным эстетическим видом и компактными габаритами для жилых массивов и бизнес-центров.',
      en: 'KTPN substations feature modern industrial design suited for high-density residential and commercial developments.',
    },
    specs: [
      { label: { uz: 'Nominal quvvat', ru: 'Мощность', en: 'Rated Capacity' }, value: '400 kVA' },
      { label: { uz: 'Korpus materiali', ru: 'Материал корпуса', en: 'Enclosure Material' }, value: 'Beton / Sendvich' },
      { label: { uz: 'Xizmat muddati', ru: 'Срок службы', en: 'Service Life' }, value: '30+ Yil (Years)' },
    ],
    borderVariant: 6,
  },
  {
    id: 'shcho-70',
    name: {
      uz: 'ShChO-70 Quyi kuchlanishli taqsimlash qalqoni',
      ru: 'Панели распределительных щитов ЩО-70',
      en: 'ShChO-70 Low-Voltage Control Panel',
    },
    category: 'electrical',
    image: '/assets/catalog/ru-switchgear.webp',
    shortDesc: {
      uz: '0.4 kV elektr energiyasini qabul qilish va taqsimlash paneli.',
      ru: 'Панели для приема и распределения электрической энергии напряжением 0,4 кВ.',
      en: 'Low-voltage distribution panels for receiving and routing 0.4 kV electrical power.',
    },
    fullDesc: {
      uz: 'ShChO-70 panellari 380/220 V kuchlanishli uch fazali zanjirlarda elektr energiyasini taqsimlash va zanjirlarni ortiqcha yuklanishdan himoya qiladi.',
      ru: 'Панели ЩО-70 предназначены для комплектования щитов распределения энергии 380/220 В с полной защитой от перегрузок.',
      en: 'ShChO-70 switchboards route 380/220 V three-phase circuits with automated thermal and surge protection.',
    },
    specs: [
      { label: { uz: 'Nominal kuchlanish', ru: 'Номинальное напряжение', en: 'Rated Voltage' }, value: '0.4 kV' },
      { label: { uz: 'Nominal tok', ru: 'Номинальный ток', en: 'Current Rating' }, value: '600 - 2500 A' },
      { label: { uz: 'Shina materiali', ru: 'Материал шин', en: 'Busbar Material' }, value: 'Mis / Aluminiy' },
    ],
    borderVariant: 7,
  },
  {
    id: 'aodtst-100000',
    name: {
      uz: 'AODTST-100000 Yuqori quvvatli avtotransformator',
      ru: 'Высоковольтный автотрансформатор АОДЦТСТ-100000',
      en: 'AODTST-100000 High-Capacity Autotransformer',
    },
    category: 'others',
    image: '/assets/catalog/tmg-oil-transformer.webp',
    shortDesc: {
      uz: 'Milliy energetika tizimi va podstansiyalar uchun ultra-yuqori quvvatli moslama.',
      ru: 'Сверхмощный автотрансформатор для национальной энергосистемы и подстанций.',
      en: 'Ultra-high capacity autotransformer engineered for national power grids.',
    },
    fullDesc: {
      uz: 'AODTST seriyali transformatorlar magistral podstansiyalarda 110/220 kV kuchlanishli uzatish zanjirlarini birlashtirish va tarmoq barqarorligini ta’minlaydi.',
      ru: 'Автотрансформаторы серии АОДЦТСТ связывают магистральные сети 110/220 кВ и обеспечивают устойчивость всей энергосистемы.',
      en: 'AODTST autotransformers interconnect 110/220 kV grid trunks, delivering system-wide stability for regional energy authorities.',
    },
    specs: [
      { label: { uz: 'Nominal quvvat', ru: 'Номинальная мощность', en: 'Capacity' }, value: '100 000 kVA' },
      { label: { uz: 'Kuchlanish sinfi', ru: 'Класс напряжения', en: 'Voltage Rating' }, value: '110 / 220 kV' },
      { label: { uz: 'Samaradorlik', ru: 'КПД', en: 'Efficiency' }, value: '99.7%' },
    ],
    borderVariant: 8,
  },
  {
    id: 'opk-10',
    name: {
      uz: 'OPK-10 Cheklagich va himoya bloki',
      ru: 'Ограничитель перенапряжений и блок защиты ОПК-10',
      en: 'OPK-10 Surge Arrester & Protection Unit',
    },
    category: 'others',
    image: '/assets/catalog/dry-transformer-green.webp',
    shortDesc: {
      uz: 'Chaqmoq va kommutatsion kuchlanish ortishidan himoya qiluvchi rux-oksidli moslama.',
      ru: 'Нелинейный ограничитель перенапряжений для защиты от грозовых и импульсных перенапряжений.',
      en: 'Zinc-oxide surge arrester unit protecting substations against atmospheric and switching surges.',
    },
    fullDesc: {
      uz: 'OPK-10 moslamalari podstansiyalar va transformator uskunalarini chaqmoq hamda ichki kuchlanish sakrashlaridan ishonchli muhofaza qiladi.',
      ru: 'Устройства ОПК-10 гарантируют надежную защиту трансформаторного оборудования от грозовых разрядов и скачков напряжения.',
      en: 'OPK-10 units safeguard sensitive high-voltage sub-stations against direct lightning strikes and switching transients.',
    },
    specs: [
      { label: { uz: 'Kuchlanish', ru: 'Напряжение', en: 'Voltage Class' }, value: '10 kV' },
      { label: { uz: 'Tok razryadi', ru: 'Разрядный ток', en: 'Discharge Current' }, value: '10 kA' },
      { label: { uz: 'Material', ru: 'Материал', en: 'Enclosure Material' }, value: 'Polimer (Polymer)' },
    ],
    borderVariant: 9,
  },
];
