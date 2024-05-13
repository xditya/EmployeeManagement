
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { collection, doc, getDocs, getFirestore, updateDoc } from "firebase/firestore";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBAtpBRHl4379w9ibeqTje3ga7z9IwZpBA",
  authDomain: "employee-management-4da3a.firebaseapp.com",
  projectId: "employee-management-4da3a",
  storageBucket: "employee-management-4da3a.appspot.com",
  messagingSenderId: "928564110846",
  appId: "1:928564110846:web:90566757f6fc1e65454caf",
  measurementId: "G-EC674922XP"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app)
const analytics = getAnalytics(app);