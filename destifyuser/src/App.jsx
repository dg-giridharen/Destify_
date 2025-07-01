import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom'; // Import useLocation

import HomePage from './pages/Homepage/HomePage.jsx';
import DestinationsPage from './pages/DestinationPage/DestinationsPage.jsx';
import ContactPage from './pages/ContactPage/ContactPage.jsx';
import AboutPage from './pages/AboutPage/AboutPage.jsx';
import YourTripsPage from './pages/YourTripsPage/YourTripsPage.jsx';
import CartPage from './pages/CartPage/CartPage.jsx';

import './index.css';
import './App.css';

function App() {
  const location = useLocation(); // Get the current location object

  useEffect(() => {
    // Scroll to the top of the page whenever the pathname changes (i.e., on navigation)
    window.scrollTo(0, 0);
  }, [location.pathname]); // Dependency array: run this effect when location.pathname changes

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/destinations" element={<DestinationsPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/trips" element={<YourTripsPage />} />
      <Route path="/cart/:id" element={<CartPage />} />
    </Routes>
  );
}

export default App;