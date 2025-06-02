// Header.test.jsx
// this file tests the Header component to ensure it renders the navigation links correctly.

import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from '../Header.jsx';
import { Provider } from 'react-redux';
import { store } from '../../app/store.js';
import { waitFor } from '@testing-library/react';

test('renders header links', async () => {
  const { getByText } = render(
    <Provider store={store}>
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    </Provider>
  );

  await waitFor(() => {
    expect(getByText(/Home/i)).toBeInTheDocument();
    expect(getByText(/Cart/i)).toBeInTheDocument();
  });
});
