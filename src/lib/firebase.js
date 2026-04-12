import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyD-OEI-j5Y2JlU-uGu02P_mHadkzydroVM",
  authDomain: "squashcode.firebaseapp.com",
  projectId: "squashcode",
  storageBucket: "squashcode.firebasestorage.app",
  messagingSenderId: "623760014866",
  appId: "1:623760014866:web:ff17c9684ed91bb9b062cb",
  measurementId: "G-MD6WEM04HS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Auth
export const auth = getAuth(app);

// Export phone auth helpers
export { RecaptchaVerifier, signInWithPhoneNumber };