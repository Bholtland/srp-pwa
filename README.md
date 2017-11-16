# srp-pwa
A study project on Progressive Web Apps

PREREQUISITS
--------------------
* NodeJS

PREFACE
--------------------
Boundaries between Native apps and websites are fading. More and more options for web developers to create native apps are available nowadays. Cordova, Phonegap, Electron but also Progressive Web Apps.

For a long time i've been searching for a good way to get web apps in a native way to the user. I've experienced with Electron, Cordova and Phonegap to make this work. All of those are reasonable easy ways to make it work. Progressive Web Apps on the other hand are getting more and more support. Without having to work with third party tools, you can simulate a native experience with native features expanding over time. 

At this point there is support for sensors, push messages and readouts from the phone.

THE GOAL IN THIS PROJECT
----------------------
The goal was to create a demo with as many PWA features working as i could. This includes:
* Setting up a Service Worker
* Native app simulation with manifest.json
* Sending and receiving push messages

WHAT DID I DO?
---------------------
I created all of the above. 
Service Workers make heavy use of "Promises", with which i wasn't familiar at first. I used an article for that, which is listed in the sources below. After that i started reading an article on setting up the Service Worker and the manifest.json. When i had done that i started doing research on the push and notifications api's. I managed to setup a Node server with a mySQL database to store and send notifications to the user endpoint.

WHAT DID I LEARN
---------------------
I learnt how to make use of new api's for the web, how to setup a Service Worker, and how to create a manifest.json to simulate Native apps. At this point PWA's wont be useful for cross platform native app replacements, like Cordova and Phonegap, since the browser support is very limited. Both Apple and Microsoft are working on PWA's to be supported in mobile and desktop browsers.

HOW DOES A PWA WORK?
--------------------
To start using the basic principles of Progressive Web Apps, like "Native app simulation" and offline usage, we have to set up a Service Worker and manifest.json. This example makes use of a static manifest.json file, but you could also use a manifest.php file to give your app some dynamic features.

Let's start with the installation of the Service Worker. A Service Worker is a Javascript that runs inside your browser and intervenes between the client and the server. This allows you to do several things. You can download files from the Server and cache them on your device. You can choose whatever files you want to store. It's also always reachable, whether it's sleeping or active. This means that even though you're not actively using your browser, there is still communication possible with it due to the Service Worker listening. This concept allows for Push notifications being sent at every moment. 

To install the Service Worker, the navigator has to register it (if it's available). You need to make sure you're on HTTPS for PWA's to work. 
```javascript
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw-main.js');
} else {
    console.warn("Service worker not supported");
}
 ```
 As you can see this piece of code points to a file called sw-main.js. This file contains your Service Worker functions. I will keep push notifications outside the scope of this description. 

```javascript
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
        }
        return fetch(event.request)
      }
    )
  );
});
```
Here we see the contents of the Service Worker file. At the top there's a variable "CACHE_NAME". This variable defines the name of our local caching storage. Below that, there's an array containing the file names we want to cache. It is required to enter the base url of your domain before the file. In my case that's "/srp-pwa/".

Then the first thing you see is self.addEventlistener('install'). You can add even listeners to Service Workers for different purposes. Our first purpose is to install it. After installing it, the cache will be opened, and if possible the file names we listed will be used to cache the corresponding files.

Next we see an event listener called "fetch". When your app has been installed and loads for the second time, the fetch event is fired. The event compares fetch requests with files in the local cache, and returns cached files to those requests if possible. Otherwise the the file will be fetched from the server. This allows for your application to work offline!

You can improve on this concept by caching files that we got from the server but haven't defined in our array "cachedFiles".

This basic piece of code will make your app work offline. But to simulate a native app, you need a manifest. Don't worry, it's easier than you think. Let's take a look at the file called "manifest.json".

```javascript
{
  "name": "SRP-PWA",
  "short_name": "PWA",
  "theme_color": "#882fcc",
  "background_color": "#882fcc",
  "display": "standalone",
  "orientation": "portrait",
  "Scope": "/",
  "start_url": "/srp-pwa/",
  "icons": [
    {
      "src": "images/icons/icon-72x72.png",
      "sizes": "72x72",
      "type": "image/png"
    },
    {
      "src": "images/icons/icon-96x96.png",
      "sizes": "96x96",
      "type": "image/png"
    },
    {
      "src": "images/icons/icon-128x128.png",
      "sizes": "128x128",
      "type": "image/png"
    },
    {
      "src": "images/icons/icon-144x144.png",
      "sizes": "144x144",
      "type": "image/png"
    },
    {
      "src": "images/icons/icon-152x152.png",
      "sizes": "152x152",
      "type": "image/png"
    },
    {
      "src": "images/icons/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "images/icons/icon-384x384.png",
      "sizes": "384x384",
      "type": "image/png"
    },
    {
      "src": "images/icons/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```
The manifest.json contains information on what the browser should do with your app. For instance, the "name" will be used to give your app icon a name underneath. The "theme color" gives your browser window that color. But more interestingly, "display" will let you choose how to show your app to the user. You can do it the regular way, by still keeping the status bar and navigation buttons, but you can also make your app completely fullscreen. The "orientation" property defines the orientation in which your app can be used. The "start_url" let's the browser know what your app's main directory is. "icons" will be used for several functions of your devices. Like the app icon.

Now that you're set, a prompt should show up on your mobile Android browser, asking you if you'd like to install the application. If not, you can tell the browser manually to install it by tapping "menu" > "add to home screen".

For push notifications to work, you need a lot more. If you're interested, take a look at this article: https://developers.google.com/web/ilt/pwa/introduction-to-push-notifications

I stored Push notification subscriptions manually on a server with php and mysql. I used NodeJS to then fetch those subscriptions and sending them to the users. You need Firebase Cloud Management for that.

I highly recommend getting familiar with PWA's, since more mainstream browsers are implementing it. Soon we'll have both desktop and mobile PWA's that can replace any current solutions like Cordova and Electron.

SOURCES I USED
---------------------
* https://www.w3.org/TR/appmanifest/
* https://developers.google.com/web/fundamentals/primers/service-workers/
* https://developers.google.com/web/fundamentals/primers/promises
* https://developers.google.com/web/ilt/pwa/introduction-to-push-notifications
* https://www.npmjs.com/package/node-gcm
* https://auth0.com/blog/introduction-to-progressive-web-apps-push-notifications-part-3/
* https://developer.mozilla.org/en-US/docs/Web/API/Push_API
* https://developers.google.com/web/updates/2015/03/push-notifications-on-the-open-web

HOW TO RUN
---------------------

1. Open https://bholtlandmedia.nl/srp/
2. Accept the notification subscription popup (Chrome 47> or Firefox)
3. Save the website to your home screen (on Android Chrome 47>)
4. In the terminal npm install all
5. execute "node push.js"
6. You should receive a push notification now

HOURS SPENT
-----------------------
At least 35 hours, including examination and server setup.
