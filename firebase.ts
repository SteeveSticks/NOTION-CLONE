import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCkgGFf-fMKwrjLmRrQe6AgvN42VdzTgrs",
  authDomain: "notion-clone-ffa6e.firebaseapp.com",
  projectId: "notion-clone-ffa6e",
  storageBucket: "notion-clone-ffa6e.firebasestorage.app",
  messagingSenderId: "387326237724",
  appId: "1:387326237724:web:53eef732303c91f2be53d9",
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { db };
