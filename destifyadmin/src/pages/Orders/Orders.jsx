// Full/src_admin/pages/Orders/Orders.jsx
import React, { useState, useEffect } from 'react';
import './Orders.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaBox } from 'react-icons/fa';

const Orders = ({url}) => {
    const [orders, setOrders] = useState([]); // Initialize with an empty array to fetch real data

    const fetchAllOrders = async () => {
        try {
            const response = await axios.get(url + "/api/order/list");
            if (response.data.success) {
                setOrders(response.data.data);
            } else {
                toast.error("Error fetching bookings");
            }
        } catch (error) {
            toast.error("An error occurred while fetching bookings.");
        }
    }

    const statusHandler = async (event, orderId) => {
        const response = await axios.post(url+"/api/order/status", {
            orderId,
            status: event.target.value
        })
        if (response.data.success) {
            await fetchAllOrders();
        }
    }

    useEffect(() => {
        fetchAllOrders();
    }, []);

    return (
        <div className='order-page'>
            <h3>Bookings Page</h3>
            <div className="order-list">
                {orders.length > 0 ? ( // Conditionally render if there are orders
                    orders.map((order) => (
                        <div key={order._id} className='order-item'> {/* Use _id for a stable key */}
                            <FaBox className='order-item-icon' />
                            <div className="order-item-details">
                                <p className='order-item-destinations'>
                                    {order.items.map((item, itemIndex) => (
                                        <span key={itemIndex}>
                                            {item.name} <strong>x {item.quantity}</strong>
                                            {itemIndex < order.items.length - 1 ? ", " : ""}
                                        </span>
                                    ))}
                                </p>
                                {/* Displaying fullName from the new schema, with fallback to old structure */}
                                <p className="order-item-name">
                                    {order.address?.fullName || `${order.address?.firstName || ''} ${order.address?.lastName || ''}`}
                                </p>
                                <div className="order-item-address">
                                    {/* Displaying fullAddress from the new schema, with fallback to old structure */}
                                    <p>{order.address?.fullAddress || `${order.address?.street || ''}, ${order.address?.city || ''}, ${order.address?.state || ''}, ${order.address?.zipcode || ''}`}</p>
                                </div>
                                <p className='order-item-phone'>Phone: {order.address?.phone}</p> {/* Phone is consistent */}
                                {/* Add new details from orderModel.js and CartPage.jsx */}
                                <p className='order-item-dates'>
                                    Check-in: {new Date(order.checkInDate).toLocaleDateString()} | Check-out: {new Date(order.checkOutDate).toLocaleDateString()}
                                </p>
                                <p className='order-item-guests'>
                                    Adults: {order.adults} | Children: {order.children}
                                </p>
                            </div>
                            {/* Use totalCost instead of amount, and format to 2 decimal places */}
                            <p className='order-item-amount'>${order.totalCost?.toFixed(2)}</p>
                            <select onChange={(event)=>statusHandler(event, order._id)} value={order.status}>
                                <option value="Booking Processing">Booking Processing</option>
                                <option value="Confirmed">Confirmed</option>
                                <option value="Completed">Completed</option>
                            </select>
                        </div>
                    ))
                ) : (
                    <p className="no-orders-message">No bookings found.</p> // Message if no orders are fetched
                )}
            </div>
        </div>
    )
}

export default Orders;