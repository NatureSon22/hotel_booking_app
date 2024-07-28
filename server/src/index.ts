import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import usersRouter from "./routes/users";
import authRouter from "./routes/auth";
import cookieParser from "cookie-parser";
import { v2 as cloudinary } from "cloudinary";
import hotelsRouter from "./routes/my-hotels";

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);

app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/my-hotels", hotelsRouter);

const setup = async () => {
  try {
    dotenv.config({ path: process.env.DOTENV_CONFIG_PATH });

    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    await mongoose.connect(process.env.MONGODB_URI as string);

    app.listen(3000, () => {
      console.log("The server is running");
    });
  } catch (error) {
    console.log(error);
  }
};

setup();
