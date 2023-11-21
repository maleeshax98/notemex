// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCKtC7z_3CoX2oMDGZqGTEKXtfO4BEITTY",
  authDomain: "notemex-76c0b.firebaseapp.com",
  projectId: "notemex-76c0b",
  storageBucket: "notemex-76c0b.appspot.com",
  messagingSenderId: "946339042845",
  appId: "1:946339042845:web:b8b1416a4d4adaf833d8f4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);