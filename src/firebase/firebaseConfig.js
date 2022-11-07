// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

/**
 * It initializes Firebase with the configuration values that are stored in the .env file.
 */
export const initializeFirebase = () => {
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    // @ts-ignore
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    // @ts-ignore
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    // @ts-ignore
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    // @ts-ignore
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCK,
    // @ts-ignore
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGE_SENDER_ID,
    // @ts-ignore
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    // @ts-ignore
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  getAnalytics(app);
};
