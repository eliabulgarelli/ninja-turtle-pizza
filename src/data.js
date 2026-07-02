// ─────────────────────────────────────────────────────────────
// Dati del locale — unica fonte di verità.
// Menu, prezzi e orari REALI (forniti dalla pizzeria).
// Aggiorna qui e il sito si aggiorna ovunque.
// ─────────────────────────────────────────────────────────────

export const BUSINESS = {
  name: 'Ninja Turtle Pizza',
  tagline: 'La pizza che salva la città.',
  rating: 4.4,
  reviewCount: 41,
  priceRange: '10–20 €',
  address: 'Via Luigi Settembrini, 2d',
  city: '42123 Reggio nell’Emilia (RE)',
  phone: '375 594 6144',
  phoneHref: '+393755946144',
  mapsUrl:
    'https://www.google.com/maps/place/Ninja+Turtle+Pizza/@44.6716083,10.637474,3a,75y,90t/data=!3m8!1e2!3m6!1sCIHM0ogKEICAgIC7n9vIIw!2e10!3e12!6shttps:%2F%2Flh3.googleusercontent.com%2Fgps-cs-s%2FAPNQkAH_QnPflMD8Lha3iI7iJZ0f-8brGuoNs-ZUJVxolecALXC7ZL3U0LS2mFfSEe-n2K5yWXbsTtiZphOJgTXgOISbhmjMpYiIldriOiCIS1PjqIZVeM2VrpSJ5l17dlo6T-_enzev%3Dw640-h640-n-k-no!7i3024!8i4032!4m18!1m10!3m9!1s0x47801d2d9318646d:0xd29c6aa0c82ff7be!2sNinja+Turtle+Pizza!8m2!3d44.6715353!4d10.6377035!10e5!14m1!1BCgIgARICCAI!16s%2Fg%2F11w9nj5mpb!3m6!1s0x47801d2d9318646d:0xd29c6aa0c82ff7be!8m2!3d44.6715353!4d10.6377035!10e9!16s%2Fg%2F11w9nj5mpb?entry=ttu&g_ep=EgoyMDI2MDYyOC4wIKXMDSoASAFQAw%3D%3D',
  // Consegna a domicilio tramite Glovo (link diretto al menu del locale)
  deliveryUrl:
    'https://glovoapp.com/it/it/reggio-emilia/stores/ninja-turtles-pizza-lid?content=menu-c.2555146266&section=pizze-s.6236700219',
  instagram: 'https://www.instagram.com/ninjaturtlepizza_/',
  instagramHandle: '@ninjaturtlepizza_',
}

// Converte "24:00" (mezzanotte, per la logica) in "00:00" (per la vista).
export const fmtTime = (t) => (t === '24:00' ? '00:00' : t)

// Orari REALI. 0 = domenica … 6 = sabato. null = chiuso.
// close "24:00" = mezzanotte.
export const HOURS = [
  { day: 'Domenica', short: 'Dom', open: '18:00', close: '24:00' },
  { day: 'Lunedì', short: 'Lun', open: '18:00', close: '23:00' },
  { day: 'Martedì', short: 'Mar', open: '18:00', close: '23:00' },
  { day: 'Mercoledì', short: 'Mer', open: null, close: null },
  { day: 'Giovedì', short: 'Gio', open: '18:00', close: '23:00' },
  { day: 'Venerdì', short: 'Ven', open: '18:00', close: '24:00' },
  { day: 'Sabato', short: 'Sab', open: '18:00', close: '24:00' },
]

export const SERVICES = [
  {
    key: 'dinein',
    title: 'Sul posto',
    text: 'Ambiente giusto, spazi raccolti. Vieni a mangiare la pizza appena sfornata.',
  },
  {
    key: 'takeaway',
    title: 'Asporto',
    text: 'Ordini, passi e ritiri. Pronta calda quando arrivi tu.',
  },
  {
    key: 'delivery',
    title: 'Consegna a domicilio',
    text: 'Te la portiamo a casa. La tua XXL da 50 cm, dritta al divano.',
  },
]

// ── Menu per categoria ──────────────────────────────────
export const MENU_TABS = [
  { key: 'xxl', label: 'XXL 50 cm', hint: 'Le giganti coi nomi ninja' },
  { key: 'trancio', label: 'Al trancio', hint: 'La fetta al volo' },
  { key: 'ninja', label: 'Menu Ninja', hint: 'Combo + Pepsi' },
  { key: 'classiche', label: 'Le classiche', hint: 'Tonde, come dio comanda' },
  { key: 'drink', label: 'Bevande & birre', hint: 'Per accompagnare' },
]

export const MENU = {
  // Le XXL da 50 cm — i cavalli di battaglia, coi nomi delle tartarughe.
  xxl: [
    { name: 'Raffaello', desc: 'Prosciutto cotto BBQ, patate e Parmigiano Reggiano.', price: '28,00', badge: 'Ø 50 cm' },
    { name: 'Leonardo', desc: 'Crudo San Daniele, squacquerone e rucola.', price: '28,00', badge: 'Ø 50 cm' },
    { name: 'Splinter', desc: '99 formaggi, mix formaggioso.', price: '24,50', badge: 'Ø 50 cm' },
    { name: 'Shredder', desc: 'Salsiccia, crema di peperoni e polvere di olive nere.', price: '24,50', badge: 'Ø 50 cm' },
    { name: 'Michelangelo', desc: 'Salame piccante.', price: '21,00', badge: 'Ø 50 cm' },
    { name: 'Donatello', desc: 'Margherita scomposta.', price: '18,00', badge: 'Ø 50 cm' },
  ],
  // Al trancio — la fetta.
  trancio: [
    { name: 'Raffaello', desc: 'Prosciutto cotto BBQ, patate e Parmigiano.', price: '4,00' },
    { name: 'Leonardo', desc: 'Crudo San Daniele, squacquerone e rucola.', price: '4,00' },
    { name: 'Shredder', desc: 'Salsiccia, crema di peperoni e polvere di olive nere.', price: '3,50' },
    { name: 'Donatello', desc: 'Margherita scomposta.', price: '2,50' },
  ],
  // Menu combo — con Pepsi inclusa.
  ninja: [
    {
      name: 'Menu Splinter',
      desc: '1 slice Splinter (mix formaggi) + 1 slice Shredder (salsiccia, crema di peperoni, polvere di olive) + 1 slice Raffaello (cotto BBQ, patate, Parmigiano) + Pepsi normale o zero.',
      price: '10,00',
      badge: 'Combo',
    },
    {
      name: 'Menu Donatello',
      desc: '3 slice Donatello (pomodoro e mozzarella fiordilatte) + Pepsi normale o zero.',
      price: '7,00',
      badge: 'Combo',
    },
  ],
  // Le classiche tonde.
  classiche: [
    { name: 'Marinara', desc: 'Pomodoro, aglio, origano, olio d’oliva.', price: '5,00' },
    { name: 'Bianca', desc: 'Mozzarella.', price: '5,00' },
    { name: 'Margherita', desc: 'Pomodoro, mozzarella, basilico.', price: '6,00' },
    { name: 'Napoli', desc: 'Pomodoro, mozzarella, acciughe del Cantábrico, origano.', price: '7,00' },
    { name: 'Prosciutto cotto', desc: 'Pomodoro, mozzarella, prosciutto cotto.', price: '7,00' },
    { name: 'Salsiccia', desc: 'Pomodoro, mozzarella, salsiccia.', price: '7,00' },
    { name: 'Peperoni', desc: 'Pomodoro, mozzarella, salame piccante.', price: '7,00' },
    { name: 'Vegetariana', desc: 'Pomodoro, mozzarella, peperoni, melanzane, zucchine, pomodorini freschi fuori forno.', price: '7,00' },
    { name: 'Siciliana', desc: 'Pomodoro, mozzarella, melanzane, olive nere, pomodorini freschi fuori forno.', price: '7,00' },
    { name: 'Stracchino e rucola', desc: 'Pomodoro, mozzarella, stracchino, rucola.', price: '7,00' },
    { name: 'Tonno e cipolla', desc: 'Pomodoro, mozzarella, tonno, cipolla.', price: '7,50' },
    { name: 'Patate e würstel', desc: 'Pomodoro, mozzarella, patate fritte, würstel.', price: '7,50' },
    { name: 'Crudo e rucola', desc: 'Pomodoro, prosciutto crudo, rucola.', price: '7,50' },
    { name: 'Speciale', desc: 'Pomodoro, mozzarella, mozzarella di bufala, pomodorini fuori forno.', price: '7,50' },
    { name: 'Patate e salsiccia', desc: 'Pomodoro, mozzarella, patate fritte e salsiccia.', price: '7,50' },
    { name: 'Romana', desc: 'Pomodoro, mozzarella, acciughe del Cantábrico, capperi, olive nere, origano.', price: '8,00' },
    { name: 'Cotto e funghi', desc: 'Pomodoro, mozzarella, prosciutto cotto, funghi.', price: '8,00' },
    { name: 'Salsiccia e funghi', desc: 'Pomodoro, mozzarella, salsiccia, funghi.', price: '8,00' },
    { name: 'Capricciosa', desc: 'Pomodoro, mozzarella, prosciutto cotto, funghi, carciofi.', price: '9,00' },
    { name: 'Bufala e crudo', desc: 'Pomodoro, mozzarella, mozzarella di bufala, prosciutto crudo.', price: '9,00' },
    { name: 'Quattro stagioni', desc: 'Pomodoro, mozzarella, prosciutto cotto, funghi, carciofi, olive nere.', price: '9,50' },
  ],
  // Bevande & birre.
  drink: [
    { name: 'Acqua Lilia naturale', desc: 'Bottiglia 500 ml.', price: '1,50' },
    { name: 'Acqua Lilia frizzante', desc: 'Bottiglia 500 ml.', price: '1,50' },
    { name: 'Estathé in vetro', desc: '250 ml, gusto pesca o limone.', price: '3,00' },
    { name: 'Pepsi in lattina', desc: '33 cl, normale o zero.', price: '3,00' },
    { name: 'Peroni', desc: '33 cl, lager italiana, malto 100% italiano, 4,7% vol.', price: '4,00' },
    { name: 'Forst', desc: '66 cl, bionda premium lager italiana, 4,8% vol.', price: '6,00' },
  ],
}

// Recensioni reali dalla scheda Google.
export const REVIEWS = [
  {
    author: 'Zoe Pinzuti',
    badge: 'Local Guide',
    stars: 5,
    when: 'un anno fa',
    text: 'Sono stati super gentili! Mio fratello è molto esigente sulla pizza e i ragazzi ci sono venuti incontro con grande disponibilità. Ambiente raccolto, pizza buona!',
  },
  {
    author: 'Mirko Car',
    badge: 'Local Guide · 292 recensioni',
    stars: 4,
    when: '1 mese fa',
    text: 'Abbiamo ordinato pizze farcite, intere, niente tranci. Buone e generose, si vede la voglia di fare le cose per bene.',
  },
  {
    author: 'Un cliente',
    badge: 'Recensione Google',
    stars: 5,
    when: 'di recente',
    text: 'No la classica pizzeria, finalmente. Qualcosa di diverso in mezzo al solito.',
  },
]
