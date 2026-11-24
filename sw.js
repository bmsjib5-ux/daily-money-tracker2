// สร้างโดย GenImage: แคชไฟล์ของแอปเพื่อให้เปิดได้แม้ไม่มีอินเทอร์เน็ต
const CACHE = "genimage-20261122-102619-53ss-1795440943735";
const FILES = ["./index.html","./manifest.webmanifest","./icons/icon-192.png","./icons/icon-512.png","./assets/app-icon.png","./assets/bg-pattern-orange.png","./assets/empty-state.png","./assets/guide-add-entry.png","./assets/guide-budget-goal.png","./assets/home-hero.png","./assets/monthly-summary.png","./assets/receipt-scan.png"];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const page = e.request.mode === 'navigate' || e.request.destination === 'document';
  const save = res => { if (res && res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); } return res; };
  e.respondWith(page
    ? fetch(e.request).then(save).catch(() => caches.match(e.request).then(r => r || caches.match('./index.html')))
    : caches.match(e.request).then(r => r || fetch(e.request).then(save)));
});
