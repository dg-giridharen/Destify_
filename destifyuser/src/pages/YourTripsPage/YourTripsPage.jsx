// src/pages/YourTripsPage/YourTripsPage.jsx
import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar.jsx';
import Footer from '../../components/Footer/Footer.jsx';
import AuthModal from '../../components/AuthModal/AuthModal.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import axios from 'axios';
import './YourTripsPage.css';

const YourTripsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { currentUser } = useAuth();
  const [trips, setTrips] = useState([]);
  const url = "http://localhost:4000";

  useEffect(() => {
    const fetchTrips = async () => {
      if (currentUser?.token) {
        try {
          const response = await axios.post(`${url}/api/order/userorders`, {}, {
            headers: { token: currentUser.token }
          });
          if (response.data.success) {
            setTrips(response.data.data);
          }
        } catch (error) {
          console.error("Error fetching trips:", error);
        }
      }
    };
    fetchTrips();
  }, [currentUser, url]); // Added url to dependency array as good practice

  return (
    <div className="page-wrapper">
      <Navbar onLoginClick={() => setIsModalOpen(true)} />
      <main className="container">
        <h1 className="page-title">Your Trips</h1>
        {currentUser ? (
          <div className="trips-list">
            {trips.length > 0 ? (
              trips.map((trip) => (
                <div key={trip._id} className="trip-item">
                  <p>
                    <strong>Package:</strong> {trip.items.map(item => item.name).join(', ')}
                  </p>
                  {/* Correctly display totalCost instead of amount */}
                  <p>
                    <strong>Total Cost:</strong> ${trip.totalCost?.toFixed(2)}
                  </p>
                  <p>
                    <strong>Status:</strong> {trip.status}
                  </p>
                  {/* Display address details */}
                  {trip.address && (
                    <p>
                      <strong>Booked By:</strong> {trip.address.fullName}
                      <br />
                      <strong>Address:</strong> {trip.address.fullAddress}
                      <br />
                      <strong>Phone:</strong> {trip.address.phone}
                    </p>
                  )}
                  {/* Display check-in and check-out dates */}
                  {trip.checkInDate && trip.checkOutDate && (
                    <p>
                      <strong>Dates:</strong> {new Date(trip.checkInDate).toLocaleDateString()} - {new Date(trip.checkOutDate).toLocaleDateString()}
                    </p>
                  )}
                  {/* Display number of adults and children */}
                  <p>
                    <strong>Guests:</strong> {trip.adults} Adult(s), {trip.children} Child(ren)
                  </p>
                </div>
              ))
            ) : (
              <p>You haven't booked any trips yet.</p>
            )}
          </div>
        ) : (
          <p>Please log in to see your booked trips.</p>
        )}
      </main>
      <Footer />
      <AuthModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
};

export default YourTripsPage;