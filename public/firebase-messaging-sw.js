getToken(messaging, { vapidKey: 'BJxIqaSbyq-7PHeE0r799GvMJVc3586UXAqgB_FLqqmYt_2ZtbFmQBb0p5rD8gQT4fqsnIL5BiMnRZP_ety0Tlo' })

// firebase-messaging-sw.js

// Import the Firebase SDK for Firebase Cloud Messaging.
// Make sure to use the 'messaging/sw' path for the service worker.
import { initializeApp } from 'firebase/app';
import { getMessaging } from 'firebase/messaging/sw';

// Your web app's Firebase configuration
// (Replace these with your actual configuration values from the Firebase console)
const firebaseConfig = {
  apiKey: "AIzaSyAY2x1tyeFVHxl2jSqBgEvUNmdNiDKV3T0",
  authDomain: "oneinfluapp.firebaseapp.com",
  projectId: "oneinfluapp",
  storageBucket: "oneinfluapp.firebasestorage.app",
  messagingSenderId: "877108346596",
  appId: "1:877108346596:web:e14cfefacf51a89fd9b6f1",
  measurementId: "G-HV9VTX2ZD1"
};

// Initialize the Firebase app in the service worker
const app = initializeApp(firebaseConfig);

// Retrieve an instance of Firebase Messaging for the service worker
const messaging = getMessaging(app);

// Optional: Handle background messages
// This function is called when a push message is received while your app is in the background.
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);

  // Customize notification here
  const notificationTitle = payload.notification.title || 'Background Message Title';
  const notificationOptions = {
    body: payload.notification.body || 'Background Message Body',
    icon: '/firebase-logo.png' // You can specify an icon for the notification
    // Add other options like image, actions, etc.
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// Optional: Handle notification clicks (e.g., open a URL)
self.addEventListener('notificationclick', (event) => {
  console.log('[firebase-messaging-sw.js] Notification clicked', event);
  event.notification.close(); // Close the notification

  // Example: Open a URL when the notification is clicked
  if (event.action === 'open_url' || event.notification.data?.url) {
    const urlToOpen = event.notification.data.url || 'https://oneinflu.com'; // Your website URL
    event.waitUntil(clients.openWindow(urlToOpen));
  }
});
