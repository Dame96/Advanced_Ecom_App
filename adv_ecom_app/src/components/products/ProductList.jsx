// ProductList.jsx
// this component manages the product list, allowing admins to add, edit, and delete products.

import React, { useEffect, useState } from 'react';
import { getAllProducts, deleteProduct } from '../../firebase/productService';
import ProductForm from './ProductForm';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    setLoading(true);
    const data = await getAllProducts();
    setProducts(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Delete this product?')) {
      await deleteProduct(id);
      fetchProducts();
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
  };

  const handleFormClose = () => {
    setEditingProduct(null);
    fetchProducts();
  };

  if (loading) return <p>Loading products...</p>;

  return (
    <div>
      <h2>Product Management</h2>
      <button onClick={() => setEditingProduct({})}>Add New Product</button>

      {editingProduct && (
        <ProductForm product={editingProduct} onClose={handleFormClose} />
      )}

      <ul>
        {products.map((p) => (
          <li key={p.id}>
            {p.name} - ${p.price.toFixed(2)} - {p.category}
            <button onClick={() => handleEdit(p)}>Edit</button>
            <button onClick={() => handleDelete(p.id)} style={{ color: 'red' }}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
