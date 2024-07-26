import { Router } from "express";
import multer from "multer";
import { addHotels, getUserHotels } from "../controllers/hotels.controllers";
import verifyToken from "../middleware/auth";
import { check } from "express-validator";

const hotelsRouter = Router();

// telling multer where to store the file in memory
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});

// api/my-hotels
hotelsRouter.post(
  "/",
  verifyToken,
  [
    check("name").notEmpty().withMessage("Name is required"),
    check("city").notEmpty().withMessage("City is required"),
    check("country").notEmpty().withMessage("Country is required"),
    check("description").notEmpty().withMessage("Description is required"),
    check("type").notEmpty().withMessage("Type is required"),
    check("adultCount").notEmpty().withMessage("Adult count is required"),
    check("childCount").notEmpty().withMessage("Child count is required"),
    check("facilities")
      .notEmpty()
      .isArray({ min: 1 })
      .withMessage("Facilities are required and must be at least 1"),
    check("pricePerNight")
      .notEmpty()
      .isNumeric()
      .withMessage("Price per night is required and must be a number"),
    check("starRating").notEmpty().withMessage("Star rating is required"),
  ],
  upload.array("imageFiles", 6),
  addHotels
);

hotelsRouter.get("/", verifyToken, getUserHotels);

export default hotelsRouter;
