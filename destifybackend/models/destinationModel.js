import mongoose from "mongoose";

const destinationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    tripPrice: { type: Number, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    country: { type: String, required: true },
    packageType: { type: String, required: true },
    serviceFee: { type: Number, required: true },
    roomCharges: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    stock: { type: Number, required: true },
    foodCost: { type: Number, required: true },
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
});

const destinationModel = mongoose.models.destination || mongoose.model("destination", destinationSchema);

export default destinationModel;