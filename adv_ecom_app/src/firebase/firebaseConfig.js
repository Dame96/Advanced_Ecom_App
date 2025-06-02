// firebaseConfig.js
// this file initializes Firebase and exports the auth and db instances for use in the application.
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { setPersistence, browserLocalPersistence } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBSqO-ml4sGa7reMnDCQzM6vMMOJS0LMUU",
  authDomain: "advanced-ecom-5c49e.firebaseapp.com",
  projectId: "advanced-ecom-5c49e",
  storageBucket: "advanced-ecom-5c49e.firebasestorage.app",
  messagingSenderId: "1092106392303",
  appId: "1:1092106392303:web:bee14e8da29e8fa2f2411a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log("Persistence mode set to local.");
  })
  .catch((error) => {
    console.error("Error setting persistence mode:", error);
  });

export { auth, db };
