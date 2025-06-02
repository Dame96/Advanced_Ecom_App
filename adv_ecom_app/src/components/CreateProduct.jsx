// CreateProduct.jsx
// This component allows admins to create new products by submitting a form.

import React, { useState } from 'react';
import { createProduct } from '../firebase/productService';

const CreateProduct = () => {
    const [product, setProduct] = useState({ name: '', price: '', description: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await createProduct({
                ...product,
                price: Number(product.price), // ✅ ensure price is a number
            });
            alert('Product created successfully!');
            // Optionally reset form or redirect
        } catch (error) {
            console.error('Error creating product:', error);
            alert('Failed to create product.');
        }
    };


    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="name"
                value={product.name}
                onChange={handleChange}
                placeholder="Product Name"
                required
            />
            <input
                type="number"
                name="price"
                value={product.price}
                onChange={handleChange}
                placeholder="Product Price"
                required
            />
            <textarea
                name="description"
                value={product.description}
                onChange={handleChange}
                placeholder="Product Description"
                required
            />
            <button type="submit">Create Product</button>
        </form>
    );
};

export default CreateProduct;
