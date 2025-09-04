// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; 
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAI2V_ArUXSY8VqFzMKw9bcTzeajmsnBH0",
  authDomain: "crm1-b7394.firebaseapp.com",
  projectId: "crm1-b7394",
  storageBucket: "crm1-b7394.firebasestorage.app",
  messagingSenderId: "523280671505",
  appId: "1:523280671505:web:a935e4c0ed64c006c0e2b0"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Exportar servicios
export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
