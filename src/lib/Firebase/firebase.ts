import { initializeApp, getApps } from "firebase/app";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import { connectStorageEmulator, getStorage } from "firebase/storage";
import { connectFunctionsEmulator, getFunctions } from "firebase/functions";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";

const config = {
  apiKey: "AIzaSyCLhIKGOYZilQuXirB_W-1UmKNfQygETqw",
  authDomain: "readme-arkiv.firebaseapp.com",
  databaseURL: "https://readme-arkiv.firebaseio.com",
  projectId: "readme-arkiv",
  storageBucket: "readme-arkiv.appspot.com",
  messagingSenderId: "884912593534",
  appId: "1:884912593534:web:994587a01eb1bd1d85d62f",
};

if (!getApps().length) {
  initializeApp(config);
}

const app = getApps()[0];

const auth = getAuth(app);

const storage = getStorage(app);

const functions = getFunctions(app);

const db = getFirestore(app);

if (process.env.NODE_ENV !== "production") {
  connectStorageEmulator(storage, "localhost", 9199);
  connectAuthEmulator(auth, "http://localhost:9099");
  connectFirestoreEmulator(db, "localhost", 8080);
  connectFunctionsEmulator(functions, "localhost", 5001);
}

export { app, auth, storage, functions, db };
