// Service worker.
// - Pagina/HTML: network-first (online mostra sempre l'ultima versione,
//   offline usa la copia salvata).
// - Asset statici (js/css/immagini, con nome hashato): cache-first,
//   veloci e disponibili offline.
const CACHE = 'ntp-cache-v2'

self.addEventListener('install', () => {
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys()
      await Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
      await self.clients.claim()
    })(),
  )
})

self.addEventListener('fetch', (event) => {
  const req = event.request
  if (req.method !== 'GET') return
  const url = new URL(req.url)
  if (url.origin !== self.location.origin) return

  const isDocument = req.mode === 'navigate' || req.destination === 'document'

  if (isDocument) {
    // Network-first: prova la rete, aggiorna la cache, fallback offline.
    event.respondWith(
      (async () => {
        try {
          const fresh = await fetch(req)
          const cache = await caches.open(CACHE)
          cache.put(req, fresh.clone())
          return fresh
        } catch {
          const cache = await caches.open(CACHE)
          return (
            (await cache.match(req)) ||
            (await cache.match(self.registration.scope)) ||
            (await cache.match('index.html')) ||
            new Response('Offline', { status: 503, statusText: 'Offline' })
          )
        }
      })(),
    )
    return
  }

  // Cache-first per gli asset statici.
  event.respondWith(
    (async () => {
      const cache = await caches.open(CACHE)
      const cached = await cache.match(req)
      const network = fetch(req)
        .then((res) => {
          if (res && res.status === 200) cache.put(req, res.clone())
          return res
        })
        .catch(() => null)
      return cached || (await network) || new Response('', { status: 503 })
    })(),
  )
})
