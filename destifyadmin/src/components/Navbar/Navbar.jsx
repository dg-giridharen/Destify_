import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBell, FaChevronDown, FaBars } from 'react-icons/fa';
import profile_image from '../../assets/profile_icon.png';
import axios from 'axios';
import './Navbar.css';

const Navbar = ({ sidebarOpen, setSidebarOpen }) => {
  const navigate = useNavigate();
  const url = "https://destify-backend-fxy3.onrender.com";

  // State for dropdowns and notifications
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);

  // Fetch recent bookings for the notification panel
  useEffect(() => {
    const fetchRecentBookings = async () => {
      try {
        const response = await axios.get(`${url}/api/order/list`);
        if (response.data.success) {
          setNotifications(response.data.data.slice(-5).reverse());
        }
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };
    fetchRecentBookings();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  return (
    <div className='navbar'>
      <div className="navbar-left">
        <FaBars className='navbar-menu-icon' onClick={() => setSidebarOpen(!sidebarOpen)} />
        <h2 className='navbar-page-title'></h2>
      </div>

      <div className="navbar-profile-menu">
        {/* Notification Bell with Dropdown */}
        <div className="notification-container">
          <button className="icon-button" onClick={() => setShowNotifications(!showNotifications)}>
            <FaBell className='navbar-action-icon' />
            {notifications.length > 0 && <div className="notification-dot"></div>}
          </button>
          {showNotifications && (
            <div className="notification-dropdown">
              <div className="notification-header">
                <h3>Recent Bookings</h3>
              </div>
              {notifications.length > 0 ? (
                notifications.map(order => (
                  <div key={order._id} className="notification-item">
                    {/* --- THE FIX IS HERE --- */}
                    {/* This safely handles both old and new address formats */}
                    <p>New booking by <strong>{order.address?.fullName || `${order.address?.firstName} ${order.address?.lastName}`}</strong></p>
                    
                    {/* This safely handles both old and new cost formats */}
                    <small>Total: ${ (order.totalCost || order.amount || 0).toFixed(2) }</small>
                  </div>
                ))
              ) : (
                <p className="no-notifications">No new bookings.</p>
              )}
            </div>
          )}
        </div>

        {/* Profile Image with Dropdown */}
        <div className="profile-container">
          <button className="profile-button" onClick={() => setShowProfileMenu(!showProfileMenu)}>
            <img className='profile-image' src={profile_image} alt="Profile" />
            <FaChevronDown className='profile-dropdown-icon' />
          </button>
          {showProfileMenu && (
            <div className="profile-dropdown">
              <button onClick={handleLogout} className="dropdown-item">Logout</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
