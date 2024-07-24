import { Request, Response } from "express";
import cloudinary from "cloudinary";
import Hotel, { HotelType } from "../models/hotel";

const addHotels = async (req: Request, res: Response) => {
  try {
    const images = req.files as Express.Multer.File[]; // the image files
    const newHotel: HotelType = req.body;
    
    // upload the images to cloudinary
    const uploadPromises = images.map(async (image) => {
      const base64 = Buffer.from(image.buffer).toString("base64");
      const dataURI = "data:" + image.mimetype + ";base64," + base64; // des
      const res = await cloudinary.v2.uploader.upload(dataURI);
      return res.url;
    });

    const imageUrls = await Promise.all(uploadPromises);
    newHotel.imageURLs = imageUrls;
    newHotel.lastUpdated = new Date();
    newHotel.userId = req.userId;

    const hotel = await Hotel.create(newHotel);

    res.status(201).json(hotel);
  } catch (error) {
    res.status(500).json("Something went wrong");
  }
};

export { addHotels };
