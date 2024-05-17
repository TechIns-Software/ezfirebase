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

Keep in mind that `firebase-messaging-sw.js` **does not** work if not served in http as mentioned above.

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
firebaseLib.pushNotificationInit(firebaseConfig,vapidKey)
```

Both `firebaseConfig` and `vapidKey` are retrieved from firebase console.

# Further token reiceival handling:

The function `pushNotificationInit` recieves the folloing arguments (with rthe order provided):

* `firebaseConfig` that is the configuration received from firebase console
* `vapidKey` that also received via firebase console
* `tokenNotificationCallback` As documented bellow (optional)
* `workerAsModule` that indicates whether worker should be loaded as a module or not.


Upon token receival you can offer to be processed futher via providing a callback function at `tokenNotificationCallback`. 
The function provided should be like this:

```
function(token,proceedCallback)
{
  // Send token via ajax or do stuff
}
```

In order to receive messages you must call `proceedCallback` function. In order to indicate that the process sucessfully has been ended you should do:

```
function(token,proceedCallback)
{
  // Send token via ajax or do stuff
  proceedCallback() // Success
}
```

Otherwise you should provide the error as an argument:

```
function(token,proceedCallback)
{
  // Send token via ajax or do stuff
  proceedCallback() // Success
}
```

A full working example is:

```
const firebaseConfig = {
    // Firebase config
};
            

const vapidKey = ""; // Also generated from firebase console

function handleToken(token,proceedCallback)
{
  // Send token via ajax or do stuff
  proceedCallback()
}

// Initialize Firebase  
firebaseLib.pushNotificationInit(firebaseConfig,vapidKey,handleToken)
```