import { initializeApp, getApp, getApps } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyBnisxmI2TiaxzxfIwPsfOKapGdhzt0odc",
  authDomain: "nextauth-insta.firebaseapp.com",
  projectId: "nextauth-insta",
  storageBucket: "nextauth-insta.appspot.com",
  messagingSenderId: "890993647053",
  appId: "1:890993647053:web:3298447e67d6d5d6773884",
}

// Initialize Firebase
export const firebaseApp = !getApps.length
  ? initializeApp(firebaseConfig)
  : getApp()

// firestore integration
export const db = getFirestore(firebaseApp)

// Get a reference to the storage service, which is used to create references in your storage bucket
export const storage = getStorage(firebaseApp)
