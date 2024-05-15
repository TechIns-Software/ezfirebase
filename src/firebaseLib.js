import { initializeApp } from "firebase/app";
import { getMessaging, onMessage, getToken, isSupported } from "firebase/messaging";


function tokenHandle(currentToken,url) {
    if (currentToken) {
        console.log(currentToken);
    }
}

function uponGrantedPermissionHandler(messaging,config,vapidKey,serviceWorkerUrl,tokenNotificationUrl,workerAsModule){
    if ('serviceWorker' in navigator) {
        const workerConfig = workerAsModule?{ type: 'module' }:undefined
        
        navigator.serviceWorker
        .register(serviceWorkerUrl, workerConfig)
        .then((registration) => {
                if (registration) {
                    registration.active.postMessage(config);
                    
                    getToken(messaging, { vapidKey })
                        .then((token)=>tokenHandle(token,tokenNotificationUrl))
                        .catch(error => console.error(error));
                }
            })
            .catch(function (err) {
                console.log('Service worker registration failed, error:', err)
            })
    }
}

function pushNotificationInit(firebaseConfig,vapidKey,tokenNotificationUrl,serviceWorkerUrl,workerAsModule){
    const app = initializeApp(firebaseConfig);
    isSupported().then((isSupported) => {
        
        if (!isSupported) {
            throw "Browser Is not Supported"
            return;
        }

        const messaging = getMessaging(app)


        Notification.requestPermission().then(function (permission) {
            console.log('permiss', permission)

            if (permission === 'granted') {
                uponGrantedPermissionHandler(messaging,firebaseConfig,vapidKey,serviceWorkerUrl,tokenNotificationUrl,workerAsModule)

                onMessage(messaging, (payload) => {
                    const n = new Notification(payload.notification.title, {
                        body: payload.notification.body,
                    });
                });
            }
        });
    }).catch((error)=>console.error(error));
}


export {pushNotificationInit};
