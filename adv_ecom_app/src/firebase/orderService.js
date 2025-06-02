// src/firebase/orderService.js
// this file contains functions to manage orders in the Firebase Firestore database.
import { db, auth } from "./firebaseConfig";
import { collection, addDoc, query, where, getDocs, doc, getDoc } from "firebase/firestore";
import { serverTimestamp } from "firebase/firestore";


// Create an order
export const placeOrder = async (cartItems, total) => {
  const user = auth.currentUser;
  if (!user) throw new Error("User not logged in");

  const orderData = {
    userId: user.uid,
    email: user.email,
    items: cartItems,
    total,
    createdAt: serverTimestamp(),
  };

  const orderRef = await addDoc(collection(db, "orders"), orderData);
  return orderRef.id;
};

// Fetch all orders for current user
export const getUserOrders = async () => {
  const user = auth.currentUser;
  if (!user) throw new Error("User not logged in");

  const q = query(collection(db, "orders"), where("userId", "==", user.uid));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

// Fetch a specific order by ID
export const getOrderById = async (orderId) => {
  const docRef = doc(db, "orders", orderId);
  const snapshot = await getDoc(docRef);
  if (!snapshot.exists()) throw new Error("Order not found");
  return { id: snapshot.id, ...snapshot.data() };
};
