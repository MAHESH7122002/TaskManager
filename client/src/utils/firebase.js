// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  authDomain: "taskmanager-a09eb.firebaseapp.com",
  projectId: "taskmanager-a09eb",
  storageBucket: "taskmanager-a09eb.firebasestorage.app",
  messagingSenderId: "534878822887",
  appId: "1:534878822887:web:9e323ff73a22b1e3d99d42"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);