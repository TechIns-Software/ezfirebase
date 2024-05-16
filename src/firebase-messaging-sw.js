import { initializeApp } from 'firebase/app';
import { onBackgroundMessage,getMessaging } from 'firebase/messaging/sw'

function initServiceWorker(firebaseConfig){
  const app = initializeApp(firebaseConfig);
  const messaging = getMessaging(app);
      
  onBackgroundMessage(messaging, (payload) => {});
}

if (typeof self !== 'undefined') {
  self.initServiceWorker = initServiceWorker;
}

export {initServiceWorker};