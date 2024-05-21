// src/config/firebaseConfig.ts
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut, createUserWithEmailAndPassword } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyDqNxRJmxGpYokMfEfgWkljuw0T7bv2CAg",
    authDomain: "drogueria-1239b.firebaseapp.com",
    projectId: "drogueria-1239b",
    storageBucket: "drogueria-1239b.appspot.com",
    messagingSenderId: "948233080390",
    appId: "1:948233080390:web:d552937c98fa76b3320447",
    databaseURL: "https://drogueria-1239b-default-rtdb.firebaseio.com/"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

export { auth, database, signInWithEmailAndPassword, onAuthStateChanged, signOut, createUserWithEmailAndPassword };
