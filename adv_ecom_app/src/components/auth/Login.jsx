// Login.jsx
// This component handles user login functionality, including form submission and error handling.
import React, { useState } from 'react';
import { loginUser } from '../../firebase/authService';
import { useNavigate, NavLink } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await loginUser(email, password);
      navigate('/'); // Redirect to home after login
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input
        type="email"
        placeholder="Email"
        value={email}
        required
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        required
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
    <p>Don't have an account? <NavLink to="/register">Register here</NavLink></p>
    </>
  );
};

export default Login;
