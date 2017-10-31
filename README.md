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

1. Open the github pages link ...
2. Accept the notification subscription popup (Chrome 47> or Firefox)
3. Save the website to your home screen (on Android Chrome 47>)
4. In the terminal npm install all
5. execute "node push.js"
6. You should receive a push notification now


