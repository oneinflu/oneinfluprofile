// Example React component (e.g., in App.js or a dedicated Notification component) 
import React, { useEffect, useState, useCallback } from 'react'; 
import { getToken } from 'firebase/messaging'; 
import { messaging, db } from './firebase'; // Import from your src/firebase.js 
import { doc, setDoc } from 'firebase/firestore'; 

function NotificationSubscriber() { 
  const [permission, setPermission] = useState('default');

  const registerToken = useCallback(async () => {
    if (typeof window === 'undefined' || !messaging) return;

    // Get the VAPID key from your Firebase project settings -> Cloud Messaging tab -> Web configuration 
    const VAPID_KEY = 'BJxIqaSbyq-7PHeE0r799GvMJVc3586UXAqgB_FLqqmYt_2ZtbFmQBb0p5rD8gQT4fqsnIL5BiMnRZP_ety0Tlo'; 
    
    try { 
      const currentToken = await getToken(messaging, { vapidKey: VAPID_KEY }); 
      if (currentToken) { 
        console.log('FCM registration token:', currentToken); 
        // Use setDoc with the token as the ID to prevent duplicates
        await setDoc(doc(db, "notificationTokens", currentToken), { 
          token: currentToken, 
          timestamp: new Date(),
          lastSeen: new Date()
        }); 
        console.log("Token synced to Firestore!"); 
      } else { 
        console.log('No registration token available.'); 
      } 
    } catch (err) { 
      console.error('An error occurred while retrieving token:', err); 
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      const currentPermission = Notification.permission;
      setPermission(currentPermission);
      
      // If permission is already granted, ensure token is registered/refreshed
      if (currentPermission === 'granted') {
        registerToken();
      }
    }
  }, [registerToken]);

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
          await registerToken();
        } else { 
          console.log('Unable to get permission to notify.'); 
        } 
    } catch (error) {
        console.error("Error requesting permission", error);
    }
  }; 

  return ( 
    <div className="flex flex-col items-start gap-4 w-full"> 
      <div className="flex items-center gap-2">
        <span className={`w-3 h-3 rounded-full ${permission === 'granted' ? 'bg-green-500' : permission === 'denied' ? 'bg-red-500' : 'bg-yellow-500'}`}></span>
        <p className="text-gray-700 font-medium">
          Status: <span className="capitalize">{permission}</span>
        </p>
      </div>

      {permission === 'default' && ( 
        <button 
          onClick={requestPermission}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors shadow-sm flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          Enable Notifications
        </button> 
      )}
      
      {permission === 'denied' && (
        <p className="text-sm text-red-600 bg-red-50 p-3 rounded-lg border border-red-100">
          Notifications are blocked. Please enable them in your browser settings to receive updates.
        </p>
      )}

      {permission === 'granted' && (
        <div className="flex flex-col gap-2">
            <p className="text-sm text-green-600 bg-green-50 p-3 rounded-lg border border-green-100">
            You are subscribed to notifications! We'll let you know when there are updates.
            </p>
            <button 
                onClick={registerToken}
                className="text-xs text-blue-600 hover:underline self-start"
            >
                Refresh Registration
            </button>
        </div>
      )}
    </div> 
  ); 
} 

export default NotificationSubscriber;
