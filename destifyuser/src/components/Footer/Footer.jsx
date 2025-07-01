// src/components/Footer/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { weblogo } from '../../assets/asset.js';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <div className="footer-about">
          <div className="footer-logo">
            <img src={weblogo} alt="Destify Logo" className="logo-image" />
            <span>Destify</span>
          </div>
          <p className="footer-text">
            Crafting unforgettable journeys, one destination at a time. Discover breathtaking destinations and create lifelong memories with us.
          </p>
          <div className="social-icons">
            <a href="#" className="social-icon">f</a>
            <a href="#" className="social-icon">t</a>
            <a href="#" className="social-icon">in</a>
          </div>
        </div>

        <div className="footer-links">
          <h4>Company</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About us</Link></li>
            <li><Link to="/destinations">Destinations</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div className="footer-contact">
          <h4>Get in touch</h4>
          <p>+91 98765 43210</p>
          <p>enquiry@destify.com</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>Copyright © 2025 Destify. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;