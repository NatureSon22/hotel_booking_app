import { Router } from "express";
import { registerUser } from "../controllers/users.controllers";
import { check } from "express-validator";

const usersRouter = Router();

// api/users/register
usersRouter.post(
  "/register",
  [
    check("email", "Email is required").isEmail(),
    check("password", "Password must be at least 6 characters").isLength({
      min: 6,
    }),
    check("firstName", "First name is required").notEmpty(),
    check("lastName", "Last name is required").notEmpty(),
  ],
  registerUser
);

export default usersRouter;
