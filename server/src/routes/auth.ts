import express from "express";
import { login, signout, validateToken } from "../controllers/auth.controllers";
import { check } from "express-validator";
import verifyToken from "../middleware/auth";

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

authRouter.post("/logout", signout);

authRouter.get("/validate-token", verifyToken, validateToken);

export default authRouter;
