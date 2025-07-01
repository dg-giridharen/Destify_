import destinationModel from "../models/destinationModel.js";
import fs from 'fs';
import { Client } from "@googlemaps/google-maps-services-js";

// Initialize the Google Maps Client to use for geocoding
const mapsClient = new Client({});

/**
 * Adds a new destination to the database.
 * It first uses the Google Geocoding API to convert the destination's name and country
 * into geographic coordinates (latitude and longitude) before saving.
 */
export const addDestination = async (req, res) => {
    try {
        // --- Geocoding Logic ---
        // Combine the destination name and country to create a query address.
        const address = `${req.body.name}, ${req.body.country}`;

        // Call the Geocoding API.
        const geocodeResponse = await mapsClient.geocode({
            params: {
                address: address,
                key: process.env.VITE_Maps_API_KEY // Ensure this key is in your backend .env file
            }
        });

        // Check if the geocoding was successful.
        if (geocodeResponse.data.status !== 'OK' || !geocodeResponse.data.results[0]) {
            throw new Error('Geocoding failed or returned no results for the address: ' + address);
        }

        const { lat, lng } = geocodeResponse.data.results[0].geometry.location;
        // --- End Geocoding Logic ---

        const image_filename = `${req.file.filename}`;

        const destination = new destinationModel({
            name: req.body.name,
            description: req.body.description,
            tripPrice: req.body.tripPrice,
            image: image_filename,
            category: req.body.category,
            country: req.body.country,
            packageType: req.body.packageType,
            serviceFee: req.body.serviceFee,
            roomCharges: req.body.roomCharges,
            discount: req.body.discount,
            stock: req.body.stock,
            foodCost: req.body.foodCost,
            lat: lat,  // Save the retrieved latitude
            lng: lng   // Save the retrieved longitude
        });

        await destination.save();
        res.status(201).json({ success: true, message: "Destination Added Successfully" });

    } catch (error) {
        console.error("Error in addDestination:", error);
        res.status(500).json({ success: false, message: "Error adding destination. Please check server logs." });
    }
}

/**
 * Retrieves and returns a list of all destinations from the database.
 */
export const listDestination = async (req, res) => {
    try {
        const destinations = await destinationModel.find({});
        res.json({ success: true, data: destinations });
    } catch (error) {
        console.error("Error in listDestination:", error);
        res.status(500).json({ success: false, message: "Error fetching destinations" });
    }
}

/**
 * Removes a destination from the database and its associated image from the server's filesystem.
 */
export const removeDestination = async (req, res) => {
    try {
        const destination = await destinationModel.findById(req.body.id);
        
        // If the destination is not found, return an error.
        if (!destination) {
            return res.status(404).json({ success: false, message: "Destination not found" });
        }

        // Delete the associated image file from the 'uploads' folder.
        if (destination.image) {
            fs.unlink(`uploads/${destination.image}`, (err) => {
                if (err) {
                    console.error("Error deleting image file:", err);
                }
            });
        }

        // Delete the destination document from the database.
        await destinationModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Destination Removed" });
        
    } catch (error) {
        console.error("Error in removeDestination:", error);
        res.status(500).json({ success: false, message: "Error removing destination" });
    }
}