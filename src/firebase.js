// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

//database adding
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDapzyVgu5Nv4i3s7TIw5fKFIeLS4YDB9g",
  authDomain: "rapid-crew-1947c.firebaseapp.com",
  projectId: "rapid-crew-1947c",
  storageBucket: "rapid-crew-1947c.appspot.com",
  messagingSenderId: "674640692953",
  appId: "1:674640692953:web:c8e98832e1fa86a3ffa0c8",
  measurementId: "G-QX9814DMG9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const database = getDatabase(app);

export { auth, db, database };
