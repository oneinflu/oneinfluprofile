// Example React component (e.g., in App.js or a dedicated Notification component) 
import React, { useEffect, useState } from 'react'; 
import { getToken } from 'firebase/messaging'; 
import { messaging, db } from './firebase'; // Import from your src/firebase.js 
import { collection, addDoc } from 'firebase/firestore'; 

function NotificationSubscriber() { 
  const [permission, setPermission] = useState('default');

  useEffect(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      setPermission(Notification.permission);
    }
  }, []);

  const requestPermission = async () => { 
    if (typeof window === 'undefined' || !('Notification' in window)) {
        console.log('Notifications not supported in this environment');
        return;
    }

    console.log('Requesting notification permission...'); 
    try {
        const perm = await Notification.requestPermission(); 
        setPermission(perm);

        if (perm === 'granted') { 
          console.log('Notification permission granted.'); 

          // Get the VAPID key from your Firebase project settings -> Cloud Messaging tab -> Web configuration 
          // It's under "Web Push certificates" -> "Key pair" 
          const VAPID_KEY = 'BJxIqaSbyq-7PHeE0r799GvMJVc3586UXAqgB_FLqqmYt_2ZtbFmQBb0p5rD8gQT4fqsnIL5BiMnRZP_ety0Tlo'; // Replace with your actual public VAPID key 
          
          if (!messaging) {
              console.error("Firebase messaging is not initialized");
              return;
          }

          try { 
            const currentToken = await getToken(messaging, { vapidKey: VAPID_KEY }); 
            if (currentToken) { 
              console.log('FCM registration token:', currentToken); 
              // Send the token to your server or save it to Firestore 
              await addDoc(collection(db, "notificationTokens"), { 
                token: currentToken, 
                timestamp: new Date() 
              }); 
              console.log("Token saved to Firestore!"); 
            } else { 
              console.log('No registration token available. Request permission to generate one.'); 
            } 
          } catch (err) { 
            console.error('An error occurred while retrieving token:', err); 
          } 
        } else { 
          console.log('Unable to get permission to notify.'); 
        } 
    } catch (error) {
        console.error("Error requesting permission", error);
    }
  }; 

  useEffect(() => { 
    // You might call requestPermission based on user action, 
    // e.g., a button click, or after registration. 
    // For this example, let's just log a suggestion. 
    console.log("Click a button or initiate subscription to request notification permission."); 
  }, []); 

  return ( 
    <div> 
      <p>Notifications are {permission}.</p> 
      {permission !== 'granted' && ( 
        <button onClick={requestPermission}>Enable Notifications</button> 
      )} 
    </div> 
  ); 
} 

export default NotificationSubscriber;
