// productService.js
// this file contains functions to interact with the Firebase Firestore database for product management.
import { db } from "./firebaseConfig";
import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
} from "firebase/firestore";

const productsCollection = collection(db, "products");

// Fetch all products
export const getAllProducts = async () => {
    const snapshot = await getDocs(productsCollection);
    // Map docs to product objects with id included
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Create a new product
export const createProduct = async (productData) => {
    const docRef = await addDoc(collection(db, "products"), {
        ...productData,
        price: Number(productData.price), // fallback in case caller forgets
    });
    return { id: docRef.id, ...productData };
};


// Update an existing product by ID
export const updateProduct = async (productId, updatedData) => {
    const productDoc = doc(db, "products", productId);
    await updateDoc(productDoc, updatedData);
};

// Delete a product by ID
export const deleteProduct = async (productId) => {
    const productDoc = doc(db, "products", productId);
    await deleteDoc(productDoc);
};
