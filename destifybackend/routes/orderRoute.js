import express from 'express';
import authMiddleware from '../middleware/auth.js';
import { 
    placeOrder, 
    listOrders, 
    userOrders, 
    updateStatus, 
    createCheckoutSession 
} from '../controllers/orderController.js';

const orderRouter = express.Router();

// Route to create a stripe checkout session
orderRouter.post("/create-checkout-session", authMiddleware, createCheckoutSession);

// Route to place an order directly (can be used for non-stripe flows or testing)
orderRouter.post("/place", authMiddleware, placeOrder);

// Route for the admin panel to list all orders
orderRouter.get("/list", listOrders);

// Route for a logged-in user to see their own orders
orderRouter.post("/userorders", authMiddleware, userOrders);

// Route for the admin panel to update an order's status
orderRouter.post("/status", updateStatus);

export default orderRouter;