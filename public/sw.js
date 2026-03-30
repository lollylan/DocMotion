// DocMotion Service Worker – Cache-First Strategie für App-Shell

const CACHE_NAME = 'docmotion-v1'
const BASE_URL = '/DocMotion'

// Dateien die beim Install gecacht werden (App-Shell)
const PRECACHE_URLS = [
  `${BASE_URL}/`,
  `${BASE_URL}/index.html`,
]

// ─── Install: App-Shell vorcachen ──────────────────────────────────────────
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_URLS)
    })
  )
  self.skipWaiting()
})

// ─── Activate: Alte Caches löschen ────────────────────────────────────────
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  )
  self.clients.claim()
})

// ─── Fetch: Cache-First, dann Network ─────────────────────────────────────
self.addEventListener('fetch', (event) => {
  // Nur GET-Anfragen cachen
  if (event.request.method !== 'GET') return
  // Keine Cross-Origin-Anfragen (Google Fonts etc. werden live geladen)
  if (!event.request.url.startsWith(self.location.origin)) return

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached

      return fetch(event.request)
        .then((response) => {
          // Nur erfolgreiche Antworten cachen
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response
          }
          const clone = response.clone()
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone))
          return response
        })
        .catch(() => {
          // Offline-Fallback: HTML-Shell zurückgeben
          if (event.request.destination === 'document') {
            return caches.match(`${BASE_URL}/`)
          }
        })
    })
  )
})
