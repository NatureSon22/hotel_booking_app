import { Router } from "express";
import {
  getAllHotels,
  viewHotelById,
} from "../controllers/search-hotel.controllers";

const searchRouter = Router();
searchRouter.get("/", getAllHotels);
searchRouter.get("/:id", viewHotelById);

export default searchRouter;
