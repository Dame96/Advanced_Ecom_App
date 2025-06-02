// App.jsx  this sets up the main application structure, including routing and header
import React from 'react';
import Home from './pages/Home';
import Cart from './features/cart/Cart';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import OrderHistory from './components/OrderHistory';
import OrderDetails from './components/OrderDetails';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import UserProfile from './components//user/UserProfile';
import ProductList from './components/products/ProductList';
import ProtectedRoute from './components/common/ProtectedRoute';
import ProductDetails from './pages/ProductDetails';
import CreateProduct from './components/CreateProduct';

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile"
          element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          } />
        <Route path="/products/:productId" element={<ProductDetails />} />
        <Route path="/admin/products" element={<ProtectedRoute><ProductList /></ProtectedRoute>} />
        <Route path="/create-product" element={<ProtectedRoute><CreateProduct /></ProtectedRoute>} />
        <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
        <Route path="/orders" element={<ProtectedRoute><OrderHistory /></ProtectedRoute>} />
        <Route path="/orders/:orderId" element={<ProtectedRoute><OrderDetails /></ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* Fallback route for 404 Not Found */}
        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>
    </div>
  );
}

export default App;
// This is the main entry point for the React application.