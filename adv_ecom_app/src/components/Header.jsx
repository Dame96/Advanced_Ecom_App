// Header.jsx
// This component renders the header with navigation links and user authentication status.

import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/firebaseConfig';
import { logoutUser } from '../firebase/authService';

const Header = () => {
  const totalItems = useSelector((state) => state.cart.totalQuantity);
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutUser();
    navigate('/');
  };

  return (
    <header className="header">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="nav-left">
          <NavLink className="nav-link" to="/">Home</NavLink>
          <NavLink className="nav-link" to="/cart">Cart ({totalItems})</NavLink>
          <NavLink className="nav-link" to="/profile">Profile</NavLink>
          <NavLink className="nav-link" to="/admin/products">Manage Products</NavLink>
        </div>
        <div className="nav-right">
          {user ? (
            <button className="logout-button" onClick={handleLogout}>Logout</button>
          ) : (
            <NavLink className="nav-link" to="/login">Login</NavLink>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
