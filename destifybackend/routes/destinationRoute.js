import express from "express";
import { addDestination, listDestination, removeDestination } from "../controllers/destinationController.js";
import multer from "multer";

const destinationRouter = express.Router();

// Multer configuration for image uploads
const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}_${file.originalname}`);
    }
});
const upload = multer({ storage: storage });

destinationRouter.post("/add", upload.single("image"), addDestination);
destinationRouter.get("/list", listDestination);
destinationRouter.post("/remove", removeDestination);

export default destinationRouter;