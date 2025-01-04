import { Request, Response } from "express";

import Tweet from "../schemas/tweet.schema";

export const getTweet = (req: Request, res: Response) => {};

export const postTweet = async (req: Request, res: Response) => {
  try {
    const { content } = req.body;
    const { _id } = req.user;

    if (typeof content !== "string") {
      return res
        .status(400)
        .json({ message: "el tipo de contenido no es valido" });
    }

    if (content.length > 144) {
      return res
        .status(400)
        .json({ message: "El contenido no puede superar los 144 caracteres" });
    }

    const newTweet = new Tweet({
      content,
      author: _id,
    });

    if (newTweet) {
      await newTweet.save();
      return res.status(200).json({ newTweet });
    }
  } catch (error) {
    if (error instanceof Error) {
      return res
        .status(500)
        .json({ message: `Internal error: ${error.message}` });
    }
  }
};
