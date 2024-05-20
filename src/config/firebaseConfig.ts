import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDqNxRJmxGpYokMfEfgWkljuw0T7bv2CAg",
    authDomain: "drogueria-1239b.firebaseapp.com",
    projectId: "drogueria-1239b",
    storageBucket: "drogueria-1239b.appspot.com",
    messagingSenderId: "948233080390",
    appId: "1:948233080390:web:d552937c98fa76b3320447"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

export { auth, firestore };