// Import the functions you need from the SDKs you need
import { initializeApp , getApp } from "firebase/app";
import { getAnalytics , isSupported  } from "firebase/analytics"
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBRNA2yMQnww6IitLKaHl8OQlpzunD7MoM",
  authDomain: "phimlau-509fd.firebaseapp.com",
  databaseURL: "https://phimlau-509fd-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "phimlau-509fd",
  storageBucket: "phimlau-509fd.appspot.com",
  messagingSenderId: "953607610548",
  appId: "1:953607610548:web:b8b477e67cfa93195df7e1",
  measurementId: "G-B653M8CKE4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const analytics = isSupported().then(yes => yes ? getAnalytics(app) : null);

// export const analytics = getAnalytics(app);

// img store
export const storage = getStorage(app);