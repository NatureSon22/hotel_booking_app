import { Request, Response } from "express";
import { v2 as cloudinary } from "cloudinary";
import Hotel, { HotelType } from "../models/hotel";

const addHotels = async (req: Request, res: Response) => {
  try {
    const images = req.files as Express.Multer.File[]; // the image files
    const newHotel: HotelType = req.body;

    console.log(cloudinary.config());
    // Upload the images to Cloudinary
    const uploadPromises = images.map(async (image) => {
      const base64 = Buffer.from(image.buffer).toString("base64");
      const dataURI = `data:${image.mimetype};base64,${base64}`;
      try {
        const result = await cloudinary.uploader.upload(dataURI);
        return result.url;
      } catch (uploadError) {
        throw uploadError;
      }
    });

    const imageUrls = await Promise.all(uploadPromises);
    newHotel.imageURLs = imageUrls;
    newHotel.lastUpdated = new Date();
    newHotel.userId = req.userId;

    const hotel = await Hotel.create(newHotel);
    res.status(201).json(hotel);
  } catch (error) {
    console.error("Error adding hotel:", error);
    res.status(500).json({ message: "Something went wrong", error: error });
  }
}

export { addHotels }