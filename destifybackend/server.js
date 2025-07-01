 
import express from "express";
import cors from "cors";
import 'dotenv/config';
import { connectDB } from "./config/db.js";
import destinationRouter from "./routes/destinationRoute.js";
import userRouter from "./routes/userRoute.js";
import orderRouter from "./routes/orderRoute.js";

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());

connectDB();

app.use("/api/destination", destinationRouter);
app.use("/api/user", userRouter);
app.use("/api/order", orderRouter);
app.use("/images", express.static('uploads')); // Serve uploaded images

app.get("/", (req, res) => {
    res.send("API is running...");
});

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});