const CACHE_NAME = "SW-v0.84.0"
let urlsToCache =[
    "/",
    "/nav.html",
    "/index.html",
    "/manifest.json",
    "/service-worker.js",
    "/css/materialize.min.css",
    "/css/stylePlus.css",
    "/img/banner/bukber.jpg",
    "/img/banner/pentafest.jpg",
    "/img/banner/pubg.jpg",
    "/img/bgm/home-bgm.jpg",
    "/img/bgm/projects-bgm.jpg",
    "/img/bgm/order-bgm.jpg",
    "/img/bgm/about-pic.jpg",
    "/img/icon/Icon-512x512.png",
    "/img/icon/Icon-512x512-maskable.png",
    "/img/icon/Icon-192x192.png",
    "/img/icon/github.png",
    "/img/icon/instagram.png",
    "/img/icon/linkedin.png",
    "/img/icon/twitter.png",
    "/img/landscape/landscape1.jpg",
    "/img/landscape/landscape2.jpg",
    "/img/logo/1.png",
    "/img/logo/2.png",
    "/img/logo/5.png",
    "/img/logo/6.png",
    "/js/main.js",
    "/js/materialize.min.js",
    "/js/sw-register.js",
    "/pages/about.html",
    "/pages/home.html",
    "/pages/orders.html",
    "/pages/projects.html",
    "https://fonts.googleapis.com/icon?family=Material+Icons",
    "https://fonts.googleapis.com/css2?family=Caveat&family=Recursive&display=swap",
    "https://fonts.gstatic.com/s/materialicons/v55/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2",
    "https://fonts.gstatic.com/s/recursive/v21/8vJN7wMr0mhh-RQChyHEH06TlXhq_gukbYrFMk1QuAIcyEwG_X-dpEfaE5YaERmK-CImKsvxvU-MXGX2fSqasNfUvz2xbXfn1uEQadCCk310tQ1TDA.woff2"
];

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener("fetch",event => {
    event.respondWith(
        caches
            .match(event.request, { cacheName: CACHE_NAME})
            .then(response => {
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
});

self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName)
                    }
                })
            );
        })
    );
});