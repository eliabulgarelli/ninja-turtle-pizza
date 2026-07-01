// ─────────────────────────────────────────────────────────────
// Dati del locale — unica fonte di verità.
// Aggiorna qui indirizzo, telefono, menu e recensioni: il sito
// si aggiorna ovunque di conseguenza.
// Fonte iniziale: scheda Google Business "Ninja Turtle Pizza".
// ─────────────────────────────────────────────────────────────

export const BUSINESS = {
  name: 'Ninja Turtle Pizza',
  tagline: 'La pizza esce dall’ombra.',
  rating: 4.4,
  reviewCount: 41,
  priceRange: '10–20 €',
  address: 'Via Luigi Settembrini, 2d',
  city: '42123 Reggio nell’Emilia (RE)',
  phone: '375 594 6144',
  phoneHref: '+393755946144',
  mapsUrl:
    'https://www.google.com/maps/place/Ninja+Turtle+Pizza/@44.6713682,10.6375632,17z',
  // Consegna a domicilio tramite piattaforma (citata nelle recensioni)
  deliveryUrl: 'https://glovoapp.com/',
}

// Orari: la pizzeria lavora solo di sera. 0 = domenica … 6 = sabato.
// open/close in formato 24h ("HH:MM"). null = chiuso quel giorno.
export const HOURS = [
  { day: 'Domenica', short: 'Dom', open: '18:00', close: '23:00' },
  { day: 'Lunedì', short: 'Lun', open: null, close: null },
  { day: 'Martedì', short: 'Mar', open: '18:00', close: '23:00' },
  { day: 'Mercoledì', short: 'Mer', open: '18:00', close: '23:00' },
  { day: 'Giovedì', short: 'Gio', open: '18:00', close: '23:00' },
  { day: 'Venerdì', short: 'Ven', open: '18:00', close: '23:30' },
  { day: 'Sabato', short: 'Sab', open: '18:00', close: '23:30' },
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
    text: 'Te la portiamo a casa. La tua pizza XXL, dritta al divano.',
  },
]

// Piatti in evidenza — ricavati dalle recensioni e dalla scheda.
export const MENU = [
  {
    name: 'Raffaello',
    desc: 'Prosciutto cotto BBQ, la nostra firma affumicata. Quella delle recensioni.',
    price: '9,50',
    tag: 'La più richiesta',
  },
  {
    name: 'XXL da condividere',
    desc: 'Formato gigante da dividere in due (o tenere tutta per te).',
    price: '16,00',
    tag: 'XXL',
  },
  {
    name: 'Pizza al trancio',
    desc: 'Alta, soffice, da mordere al volo. Perfetta per l’asporto veloce.',
    price: '4,00',
    tag: 'Al trancio',
  },
  {
    name: 'Margherita del Dojo',
    desc: 'Pomodoro San Marzano, fiordilatte, basilico. La base di ogni ninja.',
    price: '6,50',
    tag: 'Classica',
  },
  {
    name: 'Diavola Shell',
    desc: 'Salame piccante e un guscio di bordo croccante. Per chi ha coraggio.',
    price: '8,00',
    tag: 'Piccante',
  },
  {
    name: 'Farcita a sorpresa',
    desc: 'Ripiena e generosa, chiusa a mezzaluna. Chiedi quella del giorno.',
    price: '8,50',
    tag: 'Farcita',
  },
]

// Recensioni reali dalla scheda Google (testi sintetizzati, autori reali).
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
