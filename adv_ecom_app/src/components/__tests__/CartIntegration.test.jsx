// CartIntegration.test.jsx
// this file tests the integration of the Home component with the Redux store and ensures that adding an item to the cart updates the state correctly.

import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../../features/cart/cartSlice';
import ProductDetails from '../../pages/ProductDetails';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { vi } from 'vitest';

// Mock useParams for productId using vi.mock
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useParams: () => ({ productId: 'test123' }),
  };
});

// Mock Firebase firestore calls
vi.mock('firebase/firestore', async (importOriginal) => {
  const actual = await importOriginal();

  return {
    ...actual,
    getFirestore: () => {
      // Return a dummy Firestore instance or just an empty object
      return {};
    },
    doc: vi.fn(),
    getDoc: vi.fn(() => Promise.resolve({
      exists: () => true,
      id: 'test123',
      data: () => ({
        title: 'Test Product',
        image: 'https://via.placeholder.com/150',
        description: 'A test product',
        price: 99.99,
      }),
    })),
  };
});


const queryClient = new QueryClient();

test('adds item to cart from ProductDetails', async () => {
  const store = configureStore({
    reducer: { cart: cartReducer },
  });

  const { findByText } = render(
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <MemoryRouter>
          <ProductDetails />
        </MemoryRouter>
      </Provider>
    </QueryClientProvider>
  );

  const addButton = await findByText(/Add to Cart/i);
  fireEvent.click(addButton);

  const state = store.getState();
  expect(state.cart.items.length).toBe(1);
  expect(state.cart.items[0].title).toBe('Test Product');
});
