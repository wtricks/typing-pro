import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAXfXbrQCh9h_-g_Y1qde6HVRidzrafmpU",
    authDomain: "typing-pro-dee67.firebaseapp.com",
    projectId: "typing-pro-dee67",
    storageBucket: "typing-pro-dee67.appspot.com",
    messagingSenderId: "56734760966",
    appId: "1:56734760966:web:091b5a94ad4e1b34408387",
    measurementId: "G-PNLDWNE8E5"
};

const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app)
export const auth = getAuth(app)