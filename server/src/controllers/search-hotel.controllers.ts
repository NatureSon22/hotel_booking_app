import { Request, Response } from "express";
import Hotel, { HotelType } from "../models/hotel";

export type HotelSearchResponse = {
  data: HotelType[];
  pagination: {
    total: number;
    page: number;
    pages: number;
  };
};

const getAllHotels = async (req: Request, res: Response) => {
  try {
    const pageSize = 5; // number of documents per page
    const pageNumber = parseInt(
      req.query.page ? req.query.page.toString() : "1"
    ); // page number
    const skip = (pageNumber - 1) * pageSize; // tell MongoDB how many documents to skip
    const hotels = await Hotel.find({}).skip(skip).limit(pageSize);
    const total = await Hotel.countDocuments({});

    const response: HotelSearchResponse = {
      data: hotels,
      pagination: {
        total,
        page: pageNumber,
        pages: Math.ceil(total / pageSize),
      },
    };

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export { getAllHotels };
