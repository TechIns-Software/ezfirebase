import { initializeApp } from "firebase/app";
import { getMessaging, onMessage, getToken, isSupported } from "firebase/messaging";


function tokenHandle(messaging,currentToken,url) {
    if (currentToken) {
        console.log(currentToken);

        onMessage(messaging, (payload) => {
            console.log(payload)
            const n = new Notification(payload.notification.title, {
                body: payload.notification.body,
            });
        });
    }
}

function uponGrantedPermissionHandler(messaging,config,vapidKey,serviceWorkerUrl,tokenNotificationUrl,workerAsModule){
    if ('serviceWorker' in navigator) {
        const workerConfig = workerAsModule?{ type: 'module' }:undefined
        
        navigator.serviceWorker
        .register(serviceWorkerUrl, workerConfig)
        .then((registration) => {
                
                if (registration) {
                    // registration.active.postMessage(config);
                    getToken(messaging, { vapidKey })
                        .then((token)=>tokenHandle(messaging,token,tokenNotificationUrl))
                        .catch(error => console.error(error));
                }
            })
            .catch(function (err) {
                console.log('Service worker registration failed, error:', err)
            })
    }
}


function pushNotificationInit(firebaseConfig,vapidKey,tokenNotificationUrl,serviceWorkerUrl,workerAsModule){
    console.log("Hello")
    const app = initializeApp(firebaseConfig);
    isSupported().then((isSupported) => {
        
        if (!isSupported) {
            throw "Browser Is not Supported"
            return;
        }

        const messaging = getMessaging(app)        

        const handlePushNotificationCallback = (permission)=>{
            console.log('permiss', permission)

            if (permission === 'granted') {
                console.log("Granted");
                uponGrantedPermissionHandler(messaging,firebaseConfig,vapidKey,serviceWorkerUrl,tokenNotificationUrl,workerAsModule)
            }
        }

        Notification.requestPermission().then(handlePushNotificationCallback);

        if ('permissions' in navigator) {
            navigator.permissions.query({ name: 'notifications' }).then(function (notificationPerm) {
              notificationPerm.onchange = function () {
                console.log("User decided to change his seettings. New permission: " + notificationPerm.state);
                handlePushNotificationCallback(notificationPerm.state)
              };
            });
          }

    }).catch((error)=>console.error(error));
}


export {pushNotificationInit};
