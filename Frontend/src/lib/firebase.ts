// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// Firebase Services
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAMu4x3AIPrzKa8e9ySo3wP_FZco8wUW0w",
  authDomain: "rewear-b4912.firebaseapp.com",
  projectId: "rewear-b4912",
  storageBucket: "rewear-b4912.firebasestorage.app",
  messagingSenderId: "982563012666",
  appId: "1:982563012666:web:95257b083454ad80807503"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
