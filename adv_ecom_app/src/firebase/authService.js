// auth service.js with CRUD operations for user management
// src/firebase/authService.js
// this component handles user authentication operations such as registration, login, logout, and user profile management using Firebase Authentication and Firestore.
import { auth, db } from "./firebaseConfig";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    deleteUser,
} from "firebase/auth";
import { doc, setDoc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";



export const registerUser = async (email, password) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        createdAt: new Date().toISOString(),
    });

    return user;
};

export const loginUser = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user;
        } catch (error) {
            throw new Error("Login failed: " + error.message);
        }
    };
    
    export const logoutUser = async () => {
        await signOut(auth);
    };



    // Read user data from Firestore
    export const getUserProfile = async (uid) => {
        const userDoc = await getDoc(doc(db, "users", uid));
        if (userDoc.exists()) {
            return userDoc.data();
        } else {
            throw new Error("User not found");
        }
    };

    // Update user profile in Firestore
    export const updateUserProfile = async (uid, updatedData) => {
        await updateDoc(doc(db, "users", uid), updatedData);
    };

    // Delete user from Firestore AND Firebase Auth
    export const deleteUserAccount = async () => {
        const user = auth.currentUser;

        if (user) {
            const uid = user.uid;

            // Delete Firestore data
            await deleteDoc(doc(db, "users", uid));

            // Delete auth account
            await deleteUser(user);
        } else {
            throw new Error("No user is currently logged in");
        }
    };
