// Cart.jsx
// this file defines the Cart component, which displays the items in the user's shopping cart, allows them to remove items, and proceed to checkout.

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { removeFromCart } from './cartSlice';
import { clearCart } from './cartSlice';
import { placeOrder } from '../../firebase/orderService'; // Adjust the import path as needed

const Cart = () => {

    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const [checkedOut, setCheckedOut] = useState(false);

    // select cart items from the Redux store
    // 
    const items = useSelector((state) => state.cart.items);
    const totalQuantity = useSelector((state) => state.cart.totalQuantity);
    const totalPrice = useSelector((state) => state.cart.totalPrice);

    const handleRemoveFromCart = (id) => {
        dispatch(removeFromCart(id));
    };

    const handleCheckout = async () => {
        
        if (items.length === 0) {
            alert("Your cart is empty.");
            return;
          }
        
        try {
            // Directly use totalPrice, assuming it's a valid number
            const orderId = await placeOrder(items, totalPrice.toFixed(2));
            console.log("Order placed! ID:", orderId);

            // Clear cart and show success
            dispatch(clearCart());
            setCheckedOut(true);
            setTimeout(() => setCheckedOut(false), 3000);
        } catch (err) {
            console.error("Failed to place order:", err);
            alert("Something went wrong placing your order.");
        }
    };




    return (
        <div>
            <h2>Shopping Cart</h2>

            {checkedOut && (
                <div style={{ color: 'green', fontWeight: 'bold' }}>
                    <p>Checkout Successful!</p>
                </div>
            )}


            {items.length === 0 ? (
                <p>Your cart is empty, Time to Shop!</p>
            ) : (
                <div>
                    <ul>
                        {items.map((item) => (
                            <li key={item.id}>
                                <img src={item.image} alt={item.title} style={{ width: '100px', height: '100px' }} />
                                <h3>{item.title}</h3>
                                <p>Price: ${item.price}</p>
                                <p>Quantity: {item.quantity}</p>
                                <button onClick={() => handleRemoveFromCart(item.id)}>Remove</button>
                            </li>
                        ))}
                    </ul>
                    <h3>Total Quantity: {totalQuantity}</h3>
                    <h3>Total Price: ${totalPrice.toFixed(2)}</h3>
                    <button onClick={handleCheckout}>Checkout</button>
                </div>
            )}
        </div>
    );
};

export default Cart;