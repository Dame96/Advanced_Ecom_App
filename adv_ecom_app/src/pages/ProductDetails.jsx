// ProductDetails.jsx
// this file defines the ProductDetails component, which fetches and displays product details based on the productId from the URL parameters. It also allows users to add the product to their cart.

import React from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";

const fetchProductById = async (id) => {
  const docRef = doc(db, "products", id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() };
  } else {
    throw new Error("Product not found");
  }
};

const ProductDetails = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();

  const { data: product, isLoading, error } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => fetchProductById(productId),
  });

  if (isLoading) return <p>Loading product...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="product-details">
      <h2>{product.title}</h2>
      <img className="product-image" src={product.image} alt={product.title} />
      <p>{product.description}</p>
      <p><strong>Price: </strong>${product.price}</p>
      <button onClick={() => dispatch(addToCart(product))}>Add to Cart</button>
    </div>
  );
};

export default ProductDetails;
