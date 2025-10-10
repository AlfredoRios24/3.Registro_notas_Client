// src/config/firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

    // ✅ Configuración de tu proyecto Firebase
    const firebaseConfig = {
    apiKey: "AIzaSyD8wI-8BDavvGbz0KYaj6RpHRPZLo0Zl6U",
    authDomain: "register-notes-client.firebaseapp.com",
    projectId: "register-notes-client",
    storageBucket: "register-notes-client.appspot.com", 
    messagingSenderId: "542858401715",
    appId: "1:542858401715:web:667663ced0babaeffeddc6",
    measurementId: "G-0GXKF2WB0K"
    };

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// ✅ Inicializar autenticación con Google
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
