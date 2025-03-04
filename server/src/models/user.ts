import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

export interface UserType {
  _id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

const userSchema = new Schema<UserType>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
});

// the middleware will hash the password before saving the document to the database when the password is modified or created (during signup)
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

const User = model<UserType>("User", userSchema);
export default User;
