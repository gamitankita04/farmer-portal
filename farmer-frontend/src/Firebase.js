// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCmANdK8bHJqo07y8IKVwwM7snxwqQlugQ",
  authDomain: "farmers-portal-e6423.firebaseapp.com",
  projectId: "farmers-portal-e6423",
  storageBucket: "farmers-portal-e6423.appspot.com",
  messagingSenderId: "360622351431",
  appId: "1:360622351431:web:b16623897c2fa5a0c83d62",
  measurementId: "G-94JTL6GZ6Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db=getFirestore(app);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

import { getStorage } from "firebase/storage";  // ✅ import storage

// Add this line after other exports
export const storage = getStorage(app);  // ✅ export storage
