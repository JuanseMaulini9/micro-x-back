import { Date, ObjectId } from "mongoose";

export interface UserInterface {
  username: string;
  password: string;
}

export interface TokenPayload {
  userId: string;
}

export interface TweetInterface {
  author: ObjectId;
  content: string;
  createdAt: Date;
}
