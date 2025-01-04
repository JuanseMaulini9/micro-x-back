import { Request, Response } from "express";
import User from "../schemas/user.schema";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken";

export const signup = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    if (typeof username !== "string" && typeof password !== "string") {
      return res.status(400).json({ message: "Los datos no son validos" });
    }

    const userExist = await User.findOne({ username });
    if (userExist) {
      return res.status(400).json({ message: "El usuario ya existe" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      password: hashedPassword,
    });

    if (newUser) {
      await newUser.save();
      generateToken(newUser._id.toString(), res);
      return res.status(201).json({ username: newUser.username });
    }
  } catch (error) {
    if (error instanceof Error) {
      return res
        .status(500)
        .json({ message: `Internal error: ${error.message}` });
    }
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    if (typeof username !== "string" && typeof password !== "string") {
      return res.status(400).json({ message: "Los datos no son validos" });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "usuario no registrado" });
    }
    const correctPassword = await bcrypt.compare(password, user.password);

    if (!correctPassword) {
      return res.status(400).json({ message: "Las contraseñas no coinciden" });
    }
    generateToken(user._id.toString(), res);
    return res.status(200).json({ username: user.username });
  } catch (error) {
    if (error instanceof Error) {
      return res
        .status(500)
        .json({ message: `Internal error: ${error.message}` });
    }
  }
};

export const logout = (req: Request, res: Response) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "logout" });
  } catch (error) {
    if (error instanceof Error) {
      return res
        .status(500)
        .json({ message: `Internal error: ${error.message}` });
    }
  }
};
