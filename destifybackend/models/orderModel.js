import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    items: { type: Array, required: true },
    
    // --- Fields to be stored from the booking form ---
    totalCost: { type: Number, required: true },
    address: { 
        fullName: { type: String, required: true },
        phone: { type: String, required: true },
        fullAddress: { type: String, required: true }
    },
    checkInDate: { type: Date, required: true },
    checkOutDate: { type: Date, required: true },
    adults: { type: Number, required: true },
    children: { type: Number, required: true },
    
    status: { type: String, default: "Booking Processing" },
    date: { type: Date, default: Date.now() },
    payment: { type: Boolean, default: false } // This will be false until payment is confirmed by Stripe
});

const orderModel = mongoose.models.order || mongoose.model("order", orderSchema);

export default orderModel;