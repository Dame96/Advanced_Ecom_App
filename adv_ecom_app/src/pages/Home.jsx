// Home.jsx
// this file defines the Home component, which fetches and displays products from Firestore, allows filtering by category, and enables adding products to the cart.
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import { db } from "../firebase/firebaseConfig";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
    collection,
    getDocs,
    query,
    where,
} from "firebase/firestore";

// Fetch products from Firestore, with optional category filter
const fetchProducts = async (category) => {
    const productsRef = collection(db, "products");
    let q;

    if (category && category !== "all") {
        q = query(productsRef, where("category", "==", category));
    } else {
        q = productsRef;
    }

    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// Generate unique category list from all products
const fetchCategories = async () => {
    const productsRef = collection(db, "products");
    const snapshot = await getDocs(productsRef);
    const categoriesSet = new Set();

    snapshot.forEach((doc) => {
        const data = doc.data();
        if (data.category) categoriesSet.add(data.category);
    });

    return Array.from(categoriesSet);
};

const Home = () => {
    const dispatch = useDispatch();
    const [selectedCategory, setSelectedCategory] = useState("all");
    const navigate = useNavigate();
    const [successMessage, setSuccessMessage] = useState("");


    const {
        data: categories,
        isLoading: loadingCategories,
        error: categoryError,
    } = useQuery({
        queryKey: ["categories"],
        queryFn: fetchCategories,
    });

    const {
        data: products,
        isLoading,
        error,
    } = useQuery({
        queryKey: ["products", selectedCategory],
        queryFn: () => fetchProducts(selectedCategory),
    });

    const handleAddToCart = (product) => {
        dispatch(addToCart({
            ...product,
            price: Number(product.price), // Ensure price is a number
        }));
        setSuccessMessage("Product added to cart successfully!");
        setTimeout(() => {
            setSuccessMessage("");
            navigate("/cart");
        }, 3000); // Redirect after 3 seconds

    };

    if (isLoading) return <div>Loading Products...</div>;
    if (error) return <div>Error loading products</div>;

    return (
        <>
            <div>
                {loadingCategories && <p>Loading categories...</p>}
                {categoryError && <p>Error loading categories</p>}

                {categories && (
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        <option value="all">All Categories</option>
                        {categories.map((cat) => (
                            <option key={cat} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </select>
                )}
            </div>
            <>
                {successMessage && (
                    <div className="alert alert-success">{successMessage}</div>
                )}
            </>
            <div>
                <h1>All Products:</h1>
                <div className="products">
                    {products.map((product) => (
                        <div key={product.id}>
                            <Link to={`/products/${product.id}`}>
                                <h2>{product.title}</h2>
                            </Link>
                            <p>{product.description}</p>
                            <p>Price: ${product.price}</p>
                            <img
                                className="product-image"
                                src={product.image}
                                alt={product.title}
                            />
                            <button onClick={() => handleAddToCart(product)}>
                                Add to Cart
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Home;
