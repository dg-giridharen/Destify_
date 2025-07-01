// src/components/AuthModal/AuthModal.jsx
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios'; // Import axios
import './AuthModal.css';

const AuthModal = ({ isOpen, onClose }) => {
  const [authMode, setAuthMode] = useState('login');
  const [name, setName] = useState(''); // State for the name field
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const { login } = useAuth();
  const url = "http://localhost:4000"; // Your backend URL

  if (!isOpen) return null;

  const toggleAuthMode = (e) => {
    e.preventDefault();
    setAuthMode(authMode === 'login' ? 'signup' : 'login');
    // Reset form fields
    setName('');
    setEmail('');
    setPassword('');
    setAgreeTerms(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!agreeTerms) {
      alert("You must agree to the terms & privacy policy to proceed.");
      return;
    }

    const endpoint = authMode === 'login' ? '/api/user/login' : '/api/user/register';
    const payload = authMode === 'login' ? { email, password } : { name, email, password };

    try {
      const response = await axios.post(url + endpoint, payload);
      if (response.data.success) {
        // On success, save the token and update auth state
        login({ email: email, token: response.data.token });
        localStorage.setItem("token", response.data.token); // Store token
        onClose(); // Close the modal
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      alert(error.response.data.message || "An error occurred.");
    }
  };

  const isLoginMode = authMode === 'login';

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>&times;</button>
        <h2>{isLoginMode ? 'Log In' : 'Sign Up'}</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          {!isLoginMode && (
            <div className="form-group">
              <label htmlFor="name">Your name</label>
              <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
          )}
          <div className="form-group">
            <label htmlFor="email">Your email</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <div className="form-group terms-group">
            <input
              type="checkbox"
              id="terms"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              required
            />
            <label htmlFor="terms">By continuing, I agree to the terms of use & privacy policy.</label>
          </div>
          <button
            type="submit"
            className="submit-button"
            disabled={!agreeTerms}
          >
            {isLoginMode ? 'Log In' : 'Create account'}
          </button>
        </form>
        <p className="auth-toggle-link">
          {isLoginMode ? "Don't have an account? " : "Already have an account? "}
          <a href="#" onClick={toggleAuthMode}>
            {isLoginMode ? "Sign up here" : "Login here"}
          </a>
        </p>
      </div>
    </div>
  );
};

export default AuthModal;