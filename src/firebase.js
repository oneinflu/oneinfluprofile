// src/firebase.js

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getMessaging } from 'firebase/messaging'; // For foreground messaging and token retrieval

// Your web app's Firebase configuration
// Replace these with YOUR actual configuration values from the Firebase console
const firebaseConfig = {
   apiKey: "AIzaSyAY2x1tyeFVHxl2jSqBgEvUNmdNiDKV3T0",
  authDomain: "oneinfluapp.firebaseapp.com",
  projectId: "oneinfluapp",
  storageBucket: "oneinfluapp.firebasestorage.app",
  messagingSenderId: "877108346596",
  appId: "1:877108346596:web:e14cfefacf51a89fd9b6f1",
  measurementId: "G-HV9VTX2ZD1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const db = getFirestore(app);

let messaging = null;
if (typeof window !== "undefined" && typeof window.navigator !== "undefined") {
  try {
    messaging = getMessaging(app);
  } catch (error) {
    // Suppress specific initialization errors that occur in some environments
    console.debug("Firebase messaging initialization skipped:", error.message);
  }
}

export { messaging };
