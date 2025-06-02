// cartSlice.js
// this file manages the shopping cart state using Redux Toolkit.


import { createSlice } from '@reduxjs/toolkit';

const savedCart = sessionStorage.getItem('cart');
const initialState = savedCart
    ? JSON.parse(savedCart)
    : {
        items: [],
        totalQuantity: 0,
        totalPrice: 0,
    };

const saveCartToSessionStorage = (state) => {
    sessionStorage.setItem('cart', JSON.stringify(state));
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;
            const price = item.price;

          
            const existingItem = state.items.find((i) => i.id === item.id);
          
            if (existingItem) {
              existingItem.quantity += 1;
            } else {
              state.items.push({ ...item, quantity: 1 });
            }
          
            state.totalQuantity += 1;
            state.totalPrice += price; 
            saveCartToSessionStorage(state);
          },
        removeFromCart: (state, action) => {
            const id = action.payload;
            const existingItem = state.items.find(item => item.id === id);
            if (existingItem) {
                state.totalQuantity -= existingItem.quantity;
                state.totalPrice -= existingItem.price * existingItem.quantity;
                state.items = state.items.filter(item => item.id !== id);
            }
            saveCartToSessionStorage(state);
        },

        clearCart: (state) => {
            state.items = [];
            state.totalQuantity = 0;
            state.totalPrice = 0;
            saveCartToSessionStorage(state);
        },

    },
});
export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;