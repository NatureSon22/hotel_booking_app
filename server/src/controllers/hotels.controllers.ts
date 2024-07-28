import { Request, Response } from "express";
import { v2 as cloudinary } from "cloudinary";
import Hotel, { HotelType } from "../models/hotel";

const addHotels = async (req: Request, res: Response) => {
  try {
    const images = req.files as Express.Multer.File[]; // the image files
    const newHotel: HotelType = req.body;
    console.log(newHotel);

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
};

const getUserHotels = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    const hotels = await Hotel.find({ userId });

    res.status(200).json(hotels);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const getHotelById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const hotel = await Hotel.findById(id);

    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    res.status(200).json(hotel);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const editHotel = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const hotelData = req.body;

    const images = req.files as Express.Multer.File[]; // New images

    // Find the existing hotel
    let updatedHotel = await Hotel.findById(id);
    if (!updatedHotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    // Update hotel data
    updatedHotel.set({
      ...hotelData,
    });

    // Handle new image uploads
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

    const newImageUrls = await Promise.all(uploadPromises);

    // Append new images URLs to the existing ones
    updatedHotel.imageURLs = [
      ...updatedHotel.imageURLs,
      ...newImageUrls,
    ];

    updatedHotel.lastUpdated = new Date();

    await updatedHotel.save();

    res.status(200).json(updatedHotel);
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: "Something went wrong" });
  }
};

export { addHotels, getUserHotels, getHotelById, editHotel };
