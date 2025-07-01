// Full/destifybackend/controllers/orderController.js
import orderModel from "../models/orderModel.js";
import userModel from '../models/userModel.js';
import Stripe from "stripe";

// Initialize Stripe with your secret key from the .env file
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Create a new Stripe Checkout Session and save the booking details
export const createCheckoutSession = async (req, res) => {
    try {
        // Destructure all the data coming from the frontend
        const { items, address, totalAmount, checkInDate, checkOutDate, adults, children } = req.body;

        const line_items = items.map((item) => ({
            price_data: {
                currency: "inr",
                product_data: {
                    name: item.name,
                    description: `Booking for ${adults} adults and ${children} children.`
                },
                unit_amount: Math.round(totalAmount * 100),
            },
            quantity: 1,
        }));

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: line_items,
            mode: "payment",
            success_url: `https://destify-r6l0.onrender.com/trips?success=true`,
            cancel_url: `https://destify-r6l0.onrender.com/cart/${items[0]._id}?canceled=true`,
        });

        // Create a new order with all the detailed fields before redirecting to payment
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: items,
            totalCost: totalAmount, // Corrected field name
            address: address,
            checkInDate: checkInDate,
            checkOutDate: checkOutDate,
            adults: adults,
            children: children,
            payment: false // Payment is not yet confirmed
        });
        await newOrder.save();
        
        res.json({ success: true, sessionUrl: session.url });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error creating checkout session" });
    }
};

// This function can be used for other booking flows if needed
export const placeOrder = async (req, res) => {
    try {
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            totalCost: req.body.totalAmount,
            address: req.body.address,
            checkInDate: req.body.checkInDate,
            checkOutDate: req.body.checkOutDate,
            adults: req.body.adults,
            children: req.body.children,
            payment: true
        });
        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });
        res.json({ success: true, message: "Order Placed" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error placing order" });
    }
}

// Get all orders for the admin panel
export const listOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({ success: true, data: orders });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error fetching orders" });
    }
}

// Get a user's own orders
export const userOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({ userId: req.body.userId });
        res.json({ success: true, data: orders });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error fetching user orders" });
    }
}

// Update an order's status (for the admin panel)
export const updateStatus = async (req, res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status });
        res.json({ success: true, message: "Status Updated" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error updating status" });
    }
}
