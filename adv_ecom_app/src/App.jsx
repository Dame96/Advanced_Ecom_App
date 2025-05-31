import React from 'react';
import Home from './pages/Home';
import Cart from './features/cart/Cart';
import {Routes, Route} from 'react-router-dom';
import Header from './components/Header';


function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>
    </div>
  );
}

export default App;
// This is the main entry point for the React application.