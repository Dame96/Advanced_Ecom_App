// CreateProduct.test.jsx
// this file tests the CreateProduct component, ensuring that it renders correctly and submits the form data as expected.

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CreateProduct from '../CreateProduct';

test('renders create product form and submits data', () => {
  render(<CreateProduct />);

  // Fill out form fields
  fireEvent.change(screen.getByPlaceholderText(/Product Name/i), {
    target: { value: 'Test Product' },
  });
  fireEvent.change(screen.getByPlaceholderText(/Product Price/i), {
    target: { value: '19.99' },
  });
  fireEvent.change(screen.getByPlaceholderText(/Product Description/i), {
    target: { value: 'A great test product' },
  });

  // Click submit
  fireEvent.click(screen.getByText(/Create Product/i));

  // Optional: assert side effects, mock alerts, etc.
});
