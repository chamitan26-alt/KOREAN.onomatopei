const CACHE_NAME = 'onomatopee-quiz-v1';
const urlsToCache = [
  './',
  './index.html',
  './style.css',
  './script.js',
  './manifest.json'
  // ※もし外部の json ファイル等から問題を読み込んでいる場合は、ここに追加します (例: './questions.json')
];

// インストール時にファイルをキャッシュ
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting();
});

// リクエスト発生時にキャッシュまたはネットワークから取得
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

// 古いキャッシュの削除
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});
