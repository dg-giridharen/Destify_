// Full/src_admin/pages/Dashboard/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import CalendarWidget from '../../components/CalendarWidget/CalendarWidget';
import profile_image from '../../assets/profile_icon.png';
import axios from 'axios';
import { toast } from 'react-toastify';

const Dashboard = () => {
    // Renamed state to 'allBookings' to clearly indicate it holds all fetched bookings
    const [allBookings, setAllBookings] = useState([]); 
    const url = "https://destify-backend-fxy3.onrender.com";

    useEffect(() => {
        const fetchAllBookings = async () => {
            try {
                const response = await axios.get(`${url}/api/order/list`);
                if (response.data.success) {
                    setAllBookings(response.data.data); // Set all fetched data
                } else {
                    toast.error("Error fetching bookings");
                }
            } catch (error) {
                toast.error("An error occurred while fetching bookings.");
                console.error("Fetch bookings error:", error);
            }
        };
        fetchAllBookings();
    }, []);

    // Prepare booked date ranges for the CalendarWidget
    // Filter out bookings that might be missing date fields (though schema makes them required)
    const bookedDateRanges = allBookings
        .filter(booking => booking.checkInDate && booking.checkOutDate)
        .map(booking => ({
            start: new Date(booking.checkInDate),
            end: new Date(booking.checkOutDate)
        }));

    // Get only the most recent 5 bookings for the list widget display
    const recentBookingsForList = allBookings.slice(-5).reverse();

    return (
        <div className="dashboard-page">
            <div className="dashboard-grid">
                {/* --- Left Column (Main Content) --- */}
                <div className="dashboard-main">
                    <div className="welcome-banner">
                        <div className="welcome-text">
                            <h3>Welcome, Admin!</h3>
                            <p>You have {allBookings.length} total bookings. Review recent ones below.</p> {/* Updated message */}
                            <a href="/orders">View all bookings</a>
                        </div>
                    </div>

                    <div className="list-widget">
                        <div className="list-widget-header">
                            <h4>Recent Bookings</h4>
                            <button className="view-all-btn">View All</button>
                        </div>
                        <div className="list-widget-table">
                             <div className="list-widget-row header">
                                <p>Traveler</p>
                                <p>Destination</p>
                                <p>Status</p>
                            </div>
                            {recentBookingsForList.length > 0 ? ( // Use recentBookingsForList here
                                recentBookingsForList.map((booking) => (
                                    <div className="list-widget-row" key={booking._id}>
                                        <p className='user-name-cell'>
                                            <img src={profile_image} alt="user" />
                                            {/* Safely access fullName or combine firstName/lastName */}
                                            {`${booking.address?.fullName || `${booking.address?.firstName || ''} ${booking.address?.lastName || ''}`}`}
                                        </p>
                                        <p>{booking.items[0].name}</p>
                                        <p><span className='status-dot'></span>{booking.status}</p>
                                    </div>
                                ))
                            ) : (
                                <p>No recent bookings to display.</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* --- Right Column (Sidebar Widgets) --- */}
                <div className="dashboard-sidebar">
                    {/* Pass the prepared bookedDateRanges to the CalendarWidget */}
                    <CalendarWidget bookedDateRanges={bookedDateRanges} /> 
                    {/* The Profile Card Widget has been removed from here */}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
