/* 内容を更新したら VERSION を上げる */
var VERSION = "shiryo-v3";
var FILES = [
  "./",
  "index.html",
  "manifest.webmanifest",
  "assets/css/base.css",
  "assets/css/demo.css",
  "assets/js/app.js",
  "assets/js/chapters.js",
  "assets/js/kit.js",
  "assets/js/prompts.js",
  "assets/js/demos/appendix.js",
  "assets/js/demos/ch00.js",
  "assets/js/demos/ch01.js",
  "assets/js/demos/ch02.js",
  "assets/js/demos/ch03.js",
  "assets/js/demos/ch04.js",
  "assets/js/demos/ch05.js",
  "assets/js/demos/ch06.js",
  "assets/js/demos/ch07.js",
  "assets/js/demos/ch08.js",
  "assets/js/demos/ch09.js",
  "assets/js/demos/intro.js",
  "assets/icons/apple-touch-icon.png",
  "assets/icons/icon-192.png",
  "assets/icons/icon-512.png",
  "chapters/00-intro.html",
  "chapters/00-planning.html",
  "chapters/01-message.html",
  "chapters/02-layout.html",
  "chapters/03-eye-flow.html",
  "chapters/04-hierarchy.html",
  "chapters/05-color.html",
  "chapters/06-type.html",
  "chapters/07-chart.html",
  "chapters/08-diagram-table.html",
  "chapters/09-final-check.html",
  "appendix/ai-prompts.html",
  "appendix/cheatsheet.html"
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(VERSION).then(function (cache) { return cache.addAll(FILES); }).then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.filter(function (k) { return k !== VERSION; }).map(function (k) { return caches.delete(k); }));
    }).then(function () { return self.clients.claim(); })
  );
});

/* ネットワークを優先し、つながらないときはキャッシュを返す */
self.addEventListener("fetch", function (event) {
  if (event.request.method !== "GET") return;
  event.respondWith(
    fetch(event.request).then(function (res) {
      if (res && res.ok && new URL(event.request.url).origin === location.origin) {
        var copy = res.clone();
        caches.open(VERSION).then(function (cache) { cache.put(event.request, copy); });
      }
      return res;
    }).catch(function () {
      return caches.match(event.request, { ignoreSearch: true });
    })
  );
});
