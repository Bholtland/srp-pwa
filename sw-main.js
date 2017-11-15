var CACHE_NAME = "my-cache";
var cachedFiles = [
  '/srp-pwa/index.html'
]

self.addEventListener('install', function(event) {
	event.waitUntil(
		caches.open(CACHE_NAME)
			.then(function(cache) {
				console.log('opened cache')
				return cache.addAll(cachedFiles);
			})
	); 
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {

        if (response) {
          return response;
          console.log('This is offlj')
        }
        return fetch(event.request);
      }
    )
  );
});

// self.addEventListener('activate', function(event) {

//   event.waitUntil(
//     caches.keys().then(function(cacheNames) {
//       return Promise.all(
//         cacheNames.map(function(cacheName) {
//         })
//       );
//     })
//   );
// });

self.addEventListener("push", function (event) {
    console.log("Push event received");

    var pushData = event.data? JSON.parse(event.data.text()): {
        title: "Hello world!",
        body: "standard",
        icon: "http://img03.blogcu.com/images/s/a/n/sancaktepeses/patron__ildirdi_1243956048.jpg"
    };

    event.waitUntil(
        self.registration.showNotification(pushData.title, {
            body: pushData.body,
            icon: pushData.icon,
            badge: pushData.badge,
        })
    );
});

self.addEventListener('notificationclick', function(e) {
  var notification = e.notification;

    notification.close();
    clients.openWindow('https://giphy.com/gifs/slow-clap-good-job-whisky-ENagATV1Gr9eg');
    
});