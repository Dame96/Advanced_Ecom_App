// ProductForm.jsx
// this component provides a form for adding or editing products, handling both creation and updates through Firebase services.
import React, { useState, useEffect } from 'react';
import { createProduct, updateProduct } from '../../firebase/productService';

const ProductForm = ({ product, onClose }) => {
  const isEditing = Boolean(product && product.id);

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    description: '',
    imageUrl: '',
  });

  useEffect(() => {
    if (product && isEditing) {
      setFormData({
        name: product.name || '',
        price: product.price || '',
        category: product.category || '',
        description: product.description || '',
        imageUrl: product.imageUrl || '',
      });
    }
  }, [product, isEditing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await updateProduct(product.id, {
          ...formData,
          price: parseFloat(formData.price),
        });
      } else {
        await createProduct({
          ...formData,
          price: parseFloat(formData.price),
        });
      }
      onClose();
    } catch (err) {
      alert('Failed to save product: ' + err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ border: '1px solid #ccc', padding: '1rem', marginTop: '1rem' }}>
      <h3>{isEditing ? 'Edit Product' : 'Add New Product'}</h3>
      <input
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <input
        name="price"
        placeholder="Price"
        type="number"
        step="0.01"
        value={formData.price}
        onChange={handleChange}
        required
      />
      <input
        name="category"
        placeholder="Category"
        value={formData.category}
        onChange={handleChange}
        required
      />
      <input
        name="imageUrl"
        placeholder="Image URL"
        value={formData.imageUrl}
        onChange={handleChange}
      />
      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
      />
      <br />
      <button type="submit">{isEditing ? 'Update' : 'Create'}</button>
      <button type="button" onClick={onClose} style={{ marginLeft: '1rem' }}>
        Cancel
      </button>
    </form>
  );
};

export default ProductForm;
