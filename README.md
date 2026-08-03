# UZTRANSFORMATOR

React + TypeScript + Vite asosidagi UZTRANSFORMATOR korporativ sayti.

## Ishga tushirish

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
```

## Hero animatsiya

Hero bo‘limidagi animatsiya `src/components/HeroCableScene.tsx` ichida dependency-free WebGL orqali ishlaydi.

- Chapdan 12 ta cyan uchli sim
- O‘ngdan 12 ta violet uchli sim
- Har bir simning tezligi, qalinligi, egilishi, chuqurligi va tip yorqinligi alohida
- Simlar to‘liq fizik obyekt sifatida ekran bo‘ylab harakatlanadi
- Loop faqat barcha simlar ekran tashqarisiga chiqqandan keyin qayta boshlanadi
- WebGL ishlamasa poster rasm fallback sifatida ko‘rsatiladi

Animatsiyaning asosiy sozlamalari fayl boshidagi konstantalarda:

- `CABLES_PER_SIDE`
- `CYCLE_DURATION`
- `BASE_CABLE_LENGTH`
- `WORLD_HEIGHT`


## Global animated background

The complete page uses `GlobalNetworkBackground.tsx`: an adaptive fixed canvas with slowly moving stars, twinkling highlights, subtle constellation links, mouse parallax and a reduced-motion mode. Hero cables render transparently above this background.
