import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { weblogo } from '../../assets/asset.js';
import './Navbar.css';

const Navbar = ({ onLoginClick }) => {
  const { currentUser, logout } = useAuth();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Function to handle logout and close the mobile menu
  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        <img src={weblogo} alt="Destify Logo" className="logo-image" />
        <span>Destify</span>
      </Link>

      {/* Main navigation for larger screens */}
      <div className="navbar-links-desktop">
        <Link to="/">Home</Link>
        <Link to="/destinations">Destinations</Link>
        <Link to="/contact">Contact us</Link>
        <Link to="/about">About us</Link>
      </div>

      {/* Right section for larger screens */}
      <div className="navbar-right-section">
        {currentUser ? (
          <div className="user-profile">
            <Link to="/trips" className="navbar-trips-link">Your Trips</Link>
            <button onClick={() => setDropdownOpen(!isDropdownOpen)} className="user-profile-button">
              <span>{currentUser.email}</span>
              <span className="arrow-down">&#9660;</span>
            </button>
            {isDropdownOpen && (
              <div className="dropdown-menu">
                <button onClick={logout}>Logout</button>
              </div>
            )}
          </div>
        ) : (
          <button className="login-button" onClick={onLoginClick}>
            Login
          </button>
        )}
      </div>

      {/* Hamburger menu icon for smaller screens */}
      <button className="hamburger" onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
        &#9776;
      </button>

      {/* Mobile menu, which appears when hamburger is clicked */}
      <div className={`navbar-links-mobile ${isMobileMenuOpen ? 'active' : ''}`}>
        <Link to="/" onClick={() => setMobileMenuOpen(false)}>Home</Link>
        <Link to="/destinations" onClick={() => setMobileMenuOpen(false)}>Destinations</Link>
        <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>Contact us</Link>
        <Link to="/about" onClick={() => setMobileMenuOpen(false)}>About us</Link>
        
        {/* Add a divider and the user-specific links for mobile */}
        {currentUser && <hr className="mobile-menu-divider" />}

        {currentUser ? (
          <>
            <Link to="/trips" onClick={() => setMobileMenuOpen(false)}>Your Trips</Link>
            <button className="mobile-logout-button" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <button className="mobile-login-button" onClick={() => { onLoginClick(); setMobileMenuOpen(false); }}>
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;