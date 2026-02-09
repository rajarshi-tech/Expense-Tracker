// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCbys3_1GIwtUHqzR10ZHTPI8SAsx6-RZ8",
  authDomain: "expense-tracker-f610f.firebaseapp.com",
  projectId: "expense-tracker-f610f",
  storageBucket: "expense-tracker-f610f.firebasestorage.app",
  messagingSenderId: "568428613685",
  appId: "1:568428613685:web:fff5993248961faf1e617c",
  measurementId: "G-S0SDP0L54S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const firestore = getFirestore(app);

