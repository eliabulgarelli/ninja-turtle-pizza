# Ninja Turtle Pizza — sito vetrina

Sito one-page per **Ninja Turtle Pizza**, pizzeria a Reggio Emilia.
Vite + React + Framer Motion, animazioni allo scroll, grafica SVG, responsive.

## Sviluppo

```bash
npm install
npm run dev
```

## Build

```bash
npm run build     # base '/' (Vercel / dominio dedicato)
npm run build:pages   # base '/ninja-turtle-pizza/' (GitHub Pages)
```

## Deploy

- **GitHub Pages**: pubblicato dal branch `gh-pages` → https://eliabulgarelli.github.io/ninja-turtle-pizza/
- **Vercel**: pronto (`vercel.json` gestisce il routing SPA). Collega il repo su Vercel e usa `npm run build` (base `/`).

## Dati

Tutti i contenuti (menu, prezzi, orari, recensioni, contatti) sono in [`src/data.js`](src/data.js).

> ⚠️ Menu, prezzi e orari settimanali sono **provvisori** e vanno sostituiti con quelli reali del locale.
