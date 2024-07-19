import express from "express";
import { login } from "../controllers/auth.controllers";
import { check } from "express-validator";

const authRouter = express.Router();

authRouter.post(
  "/login",
  [
    check("email", "Email is required").isEmail(),
    check("password", "Password must be at least 6 characters").isLength({
      min: 6,
    }),
  ],
  login
);

export default authRouter;