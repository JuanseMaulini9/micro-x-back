import mongoose from "mongoose";
import { TweetInterface } from "../types";

const TweetSchema = new mongoose.Schema({
  author: {
    type: String,
    required: true,
    ref: "User",
  },
  content: {
    type: String,
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Tweet = mongoose.model<TweetInterface>("Tweet", TweetSchema);
export default Tweet;
