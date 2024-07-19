import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import usersRouter from "./routes/users";
import authRouter from "./routes/auth";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);

const setup = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log("MongoDB connected");
    app.listen(3000, () => {
      console.log("The server is running");
    });
  } catch (error) {
    console.log(error);
  }
};

setup();
