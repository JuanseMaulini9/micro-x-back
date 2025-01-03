import mongoose from "mongoose";
import { UserSchema } from "../types";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model<UserSchema>("User", userSchema);
export default User;
