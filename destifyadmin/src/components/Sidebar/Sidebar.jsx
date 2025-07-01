import React from 'react';
import './Sidebar.css';
import { NavLink } from 'react-router-dom';
import { FaTachometerAlt, FaPlus, FaList, FaShoppingCart } from 'react-icons/fa';
import logo from '../../assets/logo.png';

// Receive the sidebarOpen prop
const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
    const handleNavLinkClick = () => {
        if (window.innerWidth < 768) {
            setSidebarOpen(false);
        }
    };

    return (
        <div className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
            <div className="sidebar-header">
                <img src={logo} alt="Logo" className="sidebar-logo" />
                <h2 className="sidebar-title">Destify</h2>
            </div>
            
            <nav className="sidebar-nav">
                <ul>
                    <li>
                        <NavLink to='/' className="nav-link" end onClick={handleNavLinkClick}>
                            <FaTachometerAlt className="nav-icon" />
                            <span>Dashboard</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/add' className="nav-link" onClick={handleNavLinkClick}>
                            <FaPlus className="nav-icon" />
                            <span>Add Destination</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/list' className="nav-link" onClick={handleNavLinkClick}>
                            <FaList className="nav-icon" />
                            <span>All Destinations</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/orders' className="nav-link" onClick={handleNavLinkClick}>
                            <FaShoppingCart className="nav-icon" />
                            <span>Bookings</span>
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;