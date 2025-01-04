import jwt from "jsonwebtoken";
import { Response } from "express";

const generateToken = (userId: string, res: Response) => {
  if (typeof process.env.JWT_SECRET === "string") {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: "2d",
    });
    res.cookie("jwt", token, {
      maxAge: 2 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });
  }
};

export default generateToken;
