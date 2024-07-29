import { Router } from "express";
import { getAllHotels } from "../controllers/search-hotel.controllers";

const searchRouter = Router();
searchRouter.get("/", getAllHotels);

export default searchRouter;