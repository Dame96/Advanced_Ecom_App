// Header.jsx
// header component to show navigation links and cart item count

import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = () => {
  const totalItems = useSelector((state) => state.cart.totalQuantity);

  return (
    <header style={{ padding: '1rem', background: '#eee', marginBottom: '1rem' }}>
      <nav>
        <Link to="/" style={{ marginRight: '1rem' }}>Home</Link>
        <Link to="/cart">Cart ({totalItems})</Link>
      </nav>
    </header>
  );
};

export default Header;
