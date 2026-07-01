import { HOURS, fmtTime } from './data.js'

// Converte "HH:MM" in minuti dall'inizio della giornata.
function toMinutes(hhmm) {
  const [h, m] = hhmm.split(':').map(Number)
  return h * 60 + m
}

// Restituisce lo stato di apertura calcolato su `now` (default: adesso).
// { open: boolean, message: string, nextOpenDay: string|null }
export function getOpenStatus(now = new Date()) {
  const dow = now.getDay() // 0 = domenica … 6 = sabato
  const minutesNow = now.getHours() * 60 + now.getMinutes()
  const today = HOURS[dow]

  if (today.open && today.close) {
    const openM = toMinutes(today.open)
    const closeM = toMinutes(today.close)
    if (minutesNow >= openM && minutesNow < closeM) {
      return { open: true, message: `Aperto ora · fino alle ${fmtTime(today.close)}`, nextOpenDay: null }
    }
    // Prima dell'apertura, stesso giorno
    if (minutesNow < openM) {
      return { open: false, message: `Chiuso · apre oggi alle ${fmtTime(today.open)}`, nextOpenDay: today.day }
    }
  }

  // Cerca il prossimo giorno con apertura (entro i prossimi 7 giorni).
  for (let i = 1; i <= 7; i++) {
    const d = HOURS[(dow + i) % 7]
    if (d.open) {
      const when = i === 1 ? 'domani' : d.short
      return {
        open: false,
        message: `Chiuso · apre ${when} alle ${fmtTime(d.open)}`,
        nextOpenDay: d.day,
      }
    }
  }

  return { open: false, message: 'Orari non disponibili', nextOpenDay: null }
}
