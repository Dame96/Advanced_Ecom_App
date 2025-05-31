import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { removeFromCart } from './cartSlice';
import { clearCart } from './cartSlice';


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

    const handleCheckout = () => {
        dispatch(clearCart());
        setCheckedOut(true);
        setTimeout(() => setCheckedOut(false), 3000);
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