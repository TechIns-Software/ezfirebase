# Ez push notification JS lib

An api wrapper around firebase aiming to offer a trouble-free usage of firebase upon legacy es-5 projects.

# Usage via CDN

## Step 1: Load Js Scripot through CDN

```
    <script src="https://cdn.jsdelivr.net/npm/@techins/pushnotiflib@latest/dist/firebaseLib.umd.js"></script>
```

## Step 2: Create `firebase-messaging-sw.js`

### Ensure that `firebase-messaging-sw.js` is servesd through `/` and via https.

In order for the firebase to work you must create a file `firebase-messaging-sw.js`. The file should be accessible via **https** at:

```
https://^your_domain^/firebase-messaging-sw.js
```

Keep in mind that `firebase-messaging-sw.js` **does not** work if not served as mentioned above.

## `firebase-messaging-sw.js` content

Its content should be:

```
importScripts("https://cdn.jsdelivr.net/npm/@techins/pushnotiflib@latest/dist/firebase-messaging-sw.js");

const firebaseConfig = {
    // Replace firebase config from firebase console
};

self.initServiceWorker(firebaseConfig);
```

The `firebaseConfig` is the config generated from the firebase console.

## Step 3 Use the library:

The library can be used like this:

```
const firebaseConfig = {
    // Firebase config
};
            

const vapidKey = ""; // Also generated from firebase console

// Initialize Firebase  
const wokerUrl = './firebase-messaging-sw.js';
firebaseLib.pushNotificationInit(firebaseConfig,vapidKey,"",wokerUrl,true)
```

Both `firebaseConfig` and `vapidKey` are retrieved from firebase console.