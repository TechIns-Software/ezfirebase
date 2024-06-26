import { initializeApp } from "firebase/app";
import { getMessaging, onMessage, getToken, isSupported } from "firebase/messaging";


function messageHandle(payload){
    const title =  payload.notification.title??"Uknown title";
    const body = payload.notification.body??"Uknwon Message"  
    const n = new Notification(title, {
        body: body,
    });
}

function tokenHandle(messaging,currentToken,tokenNotificationCallback) {
    if (currentToken) {
        console.log(currentToken);

        if(typeof tokenNotificationCallback == 'function'){
            tokenNotificationCallback(currentToken,
                (error)=>{
                    if(!error){
                        onMessage(messaging, messageHandle);
                    }
                }
            )   
        } else {
            onMessage(messaging, messageHandle);
        }
    }
}

function uponGrantedPermissionHandler(messaging,vapidKey,tokenNotificationCallback,workerAsModule){
    if ('serviceWorker' in navigator) {
        const workerConfig = workerAsModule?{ type: 'module' }:undefined
        
        const serviceWorkerUrl = `https://${window.location.hostname}/firebase-messaging-sw.js`

        navigator.serviceWorker
        .register(serviceWorkerUrl, workerConfig)
        .then((registration) => {        
            if (registration) {
                getToken(messaging, { vapidKey })
                    .then((token)=>tokenHandle(messaging,token,tokenNotificationCallback))
                    .catch(error => console.error(error));
            }
        }).catch(function (err) {
            console.log('Service worker registration failed, error:', err)
        })
    }
}


function pushNotificationInit(firebaseConfig,vapidKey,serviceWorkerUrl,workerAsModule,tokenNotificationCallback){
    console.log("Hello")
    const app = initializeApp(firebaseConfig);
    isSupported().then((isSupported) => {
        
        if (!isSupported) {
            throw "Browser Is not Supported"
            return;
        }

        if (!("Notification" in window)) {
            throw "Browser Does not support Notifications"
        }

        const messaging = getMessaging(app)        

        tokenNotificationCallback = tokenNotificationCallback??function(token,callback){callback(false)};

        const handlePushNotificationCallback = (permission)=>{
            console.log('permiss', permission)

            if (permission === 'granted') {
                console.log("Granted");
                uponGrantedPermissionHandler(messaging,vapidKey,serviceWorkerUrl,workerAsModule,tokenNotificationCallback)
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
