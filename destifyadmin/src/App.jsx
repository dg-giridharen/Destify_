import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'; // Import useLocation
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Sidebar from './components/Sidebar/Sidebar';
import Navbar from './components/Navbar/Navbar';
import Dashboard from './pages/Dashboard/Dashboard';
import Add from './pages/Add/Add';
import List from './pages/List/List';
import Orders from './pages/Orders/Orders';
import Login from './pages/Login/Login'; // Import the Login component

import './App.css';

const App = () => {
  const url = "http://localhost:4000";
  const navigate = useNavigate();
  const location = useLocation(); // Get current location

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('isAuthenticated') === 'true';
  });

  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated') === 'true';
    // Only update state if it's different to prevent unnecessary re-renders
    if (isAuthenticated !== authStatus) {
      setIsAuthenticated(authStatus);
    }

    // If not authenticated and trying to access a protected route, redirect to login
    if (!authStatus && location.pathname !== '/login') {
      navigate('/login');
      toast.error("Please Login First");
    }
  }, [location.pathname, navigate, isAuthenticated]); // Depend on location.pathname, navigate, and isAuthenticated

  // Listen for storage changes (e.g., logout from another tab)
  useEffect(() => {
    const handleStorageChange = () => {
      const authStatus = localStorage.getItem('isAuthenticated') === 'true';
      setIsAuthenticated(authStatus);
    };
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []); // No dependencies, runs once for listener setup

  return (
    <div className={`app ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
      <ToastContainer />
      <Routes>
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        {isAuthenticated ? (
          <Route path="/*" element={
            <>
              <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
              <div className="main-content">
                <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                <div className="page-content-area">
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/add" element={<Add url={url} />} />
                    <Route path="/list" element={<List url={url} />} />
                    <Route path="/orders" element={<Orders url={url} />} />
                  </Routes>
                </div>
              </div>
            </>
          } />
        ) : (
          // If not authenticated, only the login route is accessible
          <Route path="/*" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        )}
      </Routes>
    </div>
  );
};

export default App;