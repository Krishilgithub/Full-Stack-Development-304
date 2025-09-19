import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyAtQaqiU27e8k6ft5alJ0ZAA4TKBmWKXRE",
  authDomain: "practical-11-b87c7.firebaseapp.com",
  projectId: "practical-11-b87c7",
  storageBucket: "practical-11-b87c7.firebasestorage.app",
  messagingSenderId: "41958081297",
  appId: "1:41958081297:web:e1730bbc2b453d5cf442b0",
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
