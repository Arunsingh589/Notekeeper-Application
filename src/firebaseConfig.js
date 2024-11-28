import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your Firebase configuration (including the API key, project ID, etc.)
const firebaseConfig = {
    apiKey: "AIzaSyAFPM0Zfne5P-UTHy7kbGwouo5Vrgw8FDc",
    authDomain: "notekeeper-application-28577.firebaseapp.com",
    projectId: "notekeeper-application-28577",
    storageBucket: "notekeeper-application-28577.appspot.com", // Corrected storageBucket
    messagingSenderId: "176188798207",
    appId: "1:176188798207:web:091a34d16146707bf5c8ca",
    measurementId: "G-Y31LPVMEX5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Analytics
const analytics = getAnalytics(app);

export { db, analytics };
