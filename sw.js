const CACHE='nymph-pwa-v1';
const ASSETS=['./','./D5.html','./manifest.webmanifest'];
self.addEventListener('install', e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()));});
self.addEventListener('activate', e=>{e.waitUntil(self.clients.claim());});
self.addEventListener('fetch', e=>{e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(resp=>{const copy=resp.clone();caches.open(CACHE).then(c=>c.put(e.request,copy)).catch(()=>{});return resp;}).catch(()=>caches.match('./D5.html'))));});
