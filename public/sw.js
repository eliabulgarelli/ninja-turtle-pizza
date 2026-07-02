// Service worker — cache-first con aggiornamento in background.
// Dopo la prima visita il sito resta navigabile anche offline.
const CACHE = 'ntp-cache-v1'

self.addEventListener('install', () => {
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      // Pulisci vecchie cache di versioni precedenti.
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
  // Gestiamo solo le richieste allo stesso dominio.
  if (url.origin !== self.location.origin) return

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

      // Prima la cache (veloce e offline-safe), poi aggiorna in background.
      if (cached) {
        network // aggiorna la cache senza bloccare
        return cached
      }
      const fresh = await network
      if (fresh) return fresh

      // Offline e non in cache: per le navigazioni, prova l'index.
      if (req.mode === 'navigate') {
        const index = await cache.match(self.registration.scope) || await cache.match('index.html')
        if (index) return index
      }
      return new Response('Offline', { status: 503, statusText: 'Offline' })
    })(),
  )
})
