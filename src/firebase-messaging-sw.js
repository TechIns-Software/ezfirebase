import { initializeApp } from 'firebase/app';
import { onBackgroundMessage,getMessaging } from 'firebase/messaging/sw'

const firebaseConfig = {
  apiKey: "AIzaSyAX__6udYHxrNuqFZfES_ZszobrF3PVUZY",
  authDomain: "testproject-f9304.firebaseapp.com",
  projectId: "testproject-f9304",
  storageBucket: "testproject-f9304.appspot.com",
  messagingSenderId: "1032769586386",
  appId: "1:1032769586386:web:8ec9f6b7515cedd4d6990b",
  measurementId: "G-HPQ1XEEV04"
};

  const app = initializeApp(firebaseConfig);
  const messaging = getMessaging(app);

  onBackgroundMessage(messaging, (payload) => {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    
    // Customize notification here
    const notificationTitle = 'Background Message Title';
    const notificationOptions = {
      body: 'Background message body',
      icon: 'icon.png'
    };
    
    self.registration.showNotification(notificationTitle, notificationOptions);
  });
