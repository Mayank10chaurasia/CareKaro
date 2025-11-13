declare global {
  interface ImportMetaEnv {
    readonly VITE_FIREBASE_API_KEY: string | undefined;
    readonly VITE_FIREBASE_AUTH_DOMAIN: string | undefined;
    readonly VITE_FIREBASE_PROJECT_ID: string | undefined;
    readonly VITE_FIREBASE_STORAGE_BUCKET: string | undefined;
    readonly VITE_FIREBASE_MESSAGING_SENDER_ID: string | undefined;
    readonly VITE_FIREBASE_APP_ID: string | undefined;
    readonly VITE_FIREBASE_MEASUREMENT_ID: string | undefined;
    // add more VITE_ variables here as needed
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
}

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, RecaptchaVerifier } from "firebase/auth";
const googleAuthProvider = new GoogleAuthProvider();
googleAuthProvider.addScope("email");
googleAuthProvider.addScope("profile");

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
auth.useDeviceLanguage();

export { auth, googleAuthProvider };
export default app;
