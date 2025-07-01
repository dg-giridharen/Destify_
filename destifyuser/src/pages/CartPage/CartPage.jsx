import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar.jsx';
import Footer from '../../components/Footer/Footer.jsx';
import AuthModal from '../../components/AuthModal/AuthModal.jsx';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext.jsx';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { FaCalendarAlt } from 'react-icons/fa';
import './CartPage.css';

// Style for the Google Map container
const containerStyle = {
  width: '100%',
  height: '400px',
  borderRadius: '16px'
};

const CartPage = () => {
    const { id } = useParams();
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    const url = "https://destify-backend-fxy3.onrender.com";

    // --- State Management ---
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPackage, setSelectedPackage] = useState(null);

    // State for Booking Inputs
    const [checkInDate, setCheckInDate] = useState(new Date().toISOString().split('T')[0]);
    const [checkOutDate, setCheckOutDate] = useState(() => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        return tomorrow.toISOString().split('T')[0];
    });
    const [adults, setAdults] = useState(1);
    const [children, setChildren] = useState(0);

    // New State for User Details
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');

    // State for Calculated Costs
    const [numberOfDays, setNumberOfDays] = useState(1);
    const [totalCost, setTotalCost] = useState(0);

    // Load Google Maps script
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: import.meta.env.VITE_Maps_API_KEY
    });

    // --- Data Fetching and Calculations ---
    useEffect(() => {
        const fetchPackage = async () => {
            try {
                const response = await axios.get(`${url}/api/destination/list`);
                if (response.data.success) {
                    const pkg = response.data.data.find(p => p._id === id);
                    setSelectedPackage(pkg);
                }
            } catch (error) {
                console.error("Error fetching package details:", error);
            }
        };
        if (id) fetchPackage();
    }, [id, url]);

    useEffect(() => {
        if (selectedPackage && checkInDate && checkOutDate) {
            const date1 = new Date(checkInDate);
            const date2 = new Date(checkOutDate);
            const timeDiff = date2.getTime() - date1.getTime();
            const dayDiff = Math.max(1, Math.ceil(timeDiff / (1000 * 3600 * 24)));
            setNumberOfDays(dayDiff);

            const numberOfPersons = adults + children;
            if (numberOfPersons > 0) {
                const tripTotal = selectedPackage.tripPrice * dayDiff * numberOfPersons;
                const roomTotal = selectedPackage.roomCharges * dayDiff * numberOfPersons;
                const foodTotal = selectedPackage.foodCost * dayDiff * numberOfPersons;
                const subTotal = tripTotal + roomTotal + foodTotal + selectedPackage.serviceFee;
                const finalTotal = subTotal - (subTotal * (selectedPackage.discount / 100));
                setTotalCost(finalTotal);
            }
        }
    }, [selectedPackage, checkInDate, checkOutDate, adults, children]);

    // --- Event Handlers ---
    const handlePayNow = async () => {
        if (!currentUser) {
            alert("Please log in to book a trip.");
            setIsModalOpen(true);
            return;
        }
        if (!name || !phone || !address) {
            alert("Please fill in your name, phone, and address to proceed.");
            return;
        }

        const orderData = {
            items: [{ name: selectedPackage.name, quantity: adults + children, _id: selectedPackage._id }],
            address: { 
                fullName: name,
                phone: phone,
                fullAddress: address
            },
            totalAmount: totalCost,
            checkInDate: checkInDate,
            checkOutDate: checkOutDate,
            adults: adults,
            children: children
        };
        
        try {
            const response = await axios.post(`${url}/api/order/create-checkout-session`, orderData, { headers: { token: currentUser.token } });
            if (response.data.success) {
                window.location.href = response.data.sessionUrl;
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            alert(error.response?.data?.message || "An error occurred during the booking process.");
        }
    };

    // --- Render Logic ---
    if (!selectedPackage) {
        return <div className="container page-title">Loading...</div>;
    }

    const imageUrl = `${url}/images/${selectedPackage.image}`;
    const mapCenter = selectedPackage.lat && selectedPackage.lng ? { lat: selectedPackage.lat, lng: selectedPackage.lng } : null;

    return (
        <div>
            <Navbar onLoginClick={() => setIsModalOpen(true)} />
            <main className="container">
                <div className="cart-page-content">
                    {/* Left Column */}
                    <div className="package-visual-details">
                        <div className="image-gallery-cart">
                            <img src={imageUrl} alt={selectedPackage.name} className="main-image-cart" />
                        </div>
                        <h1>{selectedPackage.name}</h1>
                        <p className="location">{selectedPackage.country}</p>
                        <div className="tags">
                            <span>{selectedPackage.category}</span>
                            <span>{selectedPackage.packageType} Package</span>
                        </div>
                        <div className="description-section">
                            <h3>Description</h3>
                            <p>{selectedPackage.description}</p>
                        </div>
                        {isLoaded && mapCenter && (
                            <div className="map-section">
                                <h3>Location</h3>
                                <GoogleMap mapContainerStyle={containerStyle} center={mapCenter} zoom={12}>
                                    <Marker position={mapCenter} />
                                </GoogleMap>
                            </div>
                        )}
                    </div>

                    {/* Right Column */}
                    <div className="booking-summary-card">
                        <div className="price-header">
                            <h2>${selectedPackage.tripPrice.toFixed(2)}<span>/person/night</span></h2>
                            {selectedPackage.discount > 0 && <span className="discount-badge">{selectedPackage.discount}% Off</span>}
                        </div>

                        <div className="booking-form">
                            <div className="form-group">
                                <label>Check In</label>
                                <div className="date-input-wrapper">
                                    <input type="date" value={checkInDate} min={new Date().toISOString().split('T')[0]} onChange={(e) => setCheckInDate(e.target.value)} />
                                    <FaCalendarAlt className="date-icon" />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Check Out</label>
                                <div className="date-input-wrapper">
                                    <input type="date" value={checkOutDate} min={checkInDate} onChange={(e) => setCheckOutDate(e.target.value)} />
                                    <FaCalendarAlt className="date-icon" />
                                </div>
                            </div>
                            <div className="form-group full-width">
                                <label>Guests</label>
                                <div className="guest-inputs">
                                    <input type="number" value={adults} min="1" onChange={(e) => setAdults(Number(e.target.value))} /> Adults
                                    <input type="number" value={children} min="0" onChange={(e) => setChildren(Number(e.target.value))} /> Children
                                </div>
                            </div>
                        </div>

                        <div className="cost-summary">
                            <div className="cost-item">
                                <span>{`Trip (${numberOfDays} days, ${adults + children} guests)`}</span>
                                <span>${(selectedPackage.tripPrice * numberOfDays * (adults + children)).toFixed(2)}</span>
                            </div>
                            <div className="cost-item">
                                <span>Room Charges</span>
                                <span>${(selectedPackage.roomCharges * numberOfDays * (adults + children)).toFixed(2)}</span>
                            </div>
                            <div className="cost-item">
                                <span>Food Cost</span>
                                <span>${(selectedPackage.foodCost * numberOfDays * (adults + children)).toFixed(2)}</span>
                            </div>
                            <div className="cost-item">
                                <span>Service Fee</span>
                                <span>${selectedPackage.serviceFee.toFixed(2)}</span>
                            </div>
                            <div className="cost-item">
                                <span>Discount</span>
                                <span>-{selectedPackage.discount}%</span>
                            </div>
                        </div>

                        <div className="total-cost">
                            <h4>Total Cost:</h4>
                            <span>${totalCost.toFixed(2)}</span>
                        </div>

                        <div className="user-details-form">
                            <h4 className="user-details-title">Your Information</h4>
                            <div className="form-group">
                                <label>Full Name</label>
                                <input type="text" placeholder="Enter your full name" value={name} onChange={(e) => setName(e.target.value)} required />
                            </div>
                            <div className="form-group">
                                <label>Phone Number</label>
                                <input type="tel" placeholder="Enter your phone number" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                            </div>
                             <div className="form-group full-width">
                                <label>Address</label>
                                <textarea placeholder="Enter your full address" rows="3" value={address} onChange={(e) => setAddress(e.target.value)} required></textarea>
                            </div>
                        </div>

                        <button className="pay-now-button" onClick={handlePayNow}>Pay Now &rarr;</button>
                    </div>
                </div>
            </main>
            <Footer />
            <AuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
};

export default CartPage;
