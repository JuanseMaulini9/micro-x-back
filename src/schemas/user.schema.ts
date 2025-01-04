import mongoose from "mongoose";
import { UserInterface } from "../types";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model<UserInterface>("User", userSchema);
export default User;
