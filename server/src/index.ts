import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import usersRouter from "./routes/users";
import authRouter from "./routes/auth";
import cookieParser from "cookie-parser";

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header(
    "Access-Control-Allow-Methods",
    "GET,PUT,POST,DELETE,UPDATE,OPTIONS"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept"
  );
  next();
});

const setup = async () => {
  try {
    dotenv.config({ path: process.env.DOTENV_CONFIG_PATH });

    await mongoose.connect(process.env.MONGODB_URI as string);

    app.listen(3000, () => {
      console.log("The server is running");
    });
  } catch (error) {
    console.log(error);
  }
};

setup();
