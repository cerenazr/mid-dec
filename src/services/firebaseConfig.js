import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDYaiDBJ8GMmsJGZ-LJ1iIpNwy1lpW5LHY",
    authDomain: "challange-4034e.firebaseapp.com",
    projectId: "challange-4034e",
    storageBucket: "challange-4034e.firebasestorage.app",
    messagingSenderId: "35036544303",
    appId: "1:35036544303:web:e57437d143039034a475da",
    measurementId: "G-VRK6LLS3W4"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
