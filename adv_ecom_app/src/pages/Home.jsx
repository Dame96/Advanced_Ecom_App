// Home.jsx
// functional component to display products and categories
// uses React Query for data fetching
//// uses Redux for state management

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addToCart } from '../features/cart/cartSlice';



const fetchProducts = async (category) => {
    const url = category && category !== 'all'
        ? `https://fakestoreapi.com/products/category/${category}`
        : 'https://fakestoreapi.com/products';

    const response = await axios.get(url);
    return response.data;
};

const fetchCategories = async () => {
    const response = await axios.get('https://fakestoreapi.com/products/categories');
    return response.data;
};


const Home = () => {

    const dispatch = useDispatch();
    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
    };

    const [selectedCategory, setSelectedCategory] = React.useState('all');

    const { data: categories, isLoading: loadingCategories, error: categoryError } = useQuery({
        queryKey: ['categories'],
        queryFn: fetchCategories,
    }
    );

    const { data: products, isLoading, error } = useQuery({
        queryKey: ['products', selectedCategory],
        queryFn: () => fetchProducts(selectedCategory),
    });

    if (isLoading) {
        return <div>Loading Products</div>;
    }
    if (error) {
        return <div>Error fetching products</div>;
    }


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

            <div><h1>All Products:</h1>
                <div className="products">
                    {products.map(product => (
                        <div key={product.id}>
                            <h2>{product.title}</h2>
                            <p>{product.description}</p>
                            <p>Price: ${product.price}</p>
                            <img className="product-image" src={product.image} alt={product.title} />
                            <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Home;