// store.js
// This file configures the Redux store for the application, integrating the cart slice reducer.
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../features/cart/cartSlice';


export const store = configureStore({
    reducer: {
        cart: cartReducer,
    },
});