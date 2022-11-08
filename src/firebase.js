// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth';
import {getStorage} from 'firebase/storage';
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCJF6SgRjYORQbEhe2ek-332Z8chKv5D2E",
  authDomain: "chat-app2-be31e.firebaseapp.com",
  projectId: "chat-app2-be31e",
  storageBucket: "chat-app2-be31e.appspot.com",
  messagingSenderId: "625810726107",
  appId: "1:625810726107:web:50f26ed8f768c7428480fe",
  measurementId: "G-YNM9MGMWLC"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
export const storage=getStorage(app);
export const db=getFirestore(app);
