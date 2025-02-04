import { Request, Response } from "express";

import Tweet from "../schemas/tweet.schema";
import mongoose from "mongoose";

export const getTweets = async (req: Request, res: Response) => {
  try {
    const { author } = req.query;

    let tweets;

    if (author) {
      tweets = await Tweet.find({ author })
        .populate("author", "username")
        .sort({ createdAt: -1 })
        .limit(20);
    } else {
      tweets = await Tweet.find()
        .populate("author", "username")
        .sort({ createdAt: -1 })
        .limit(20);
    }

    return res.status(200).json({ tweets });
  } catch (error) {
    if (error instanceof Error) {
      return res
        .status(500)
        .json({ message: `Internal error: ${error.message}` });
    }
  }
};

export const getTweet = async (req: Request, res: Response) => {
  try {
    const { id_tweet } = req.query;
    const tweet = await Tweet.findById(id_tweet).populate("author", "username");
    return res.status(200).json({ tweet });
  } catch (error) {
    if (error instanceof Error) {
      return res
        .status(500)
        .json({ message: `Internal error: ${error.message}` });
    }
  }
};

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

export const deleteTweet = async (req: Request, res: Response) => {
  const { tweet_id } = req.body;
  try {
    if (!tweet_id || !mongoose.Types.ObjectId.isValid(tweet_id)) {
      return res.status(400).json({ message: "ID del tweet inválido" });
    }

    const deleteTweet = await Tweet.findByIdAndDelete(tweet_id);
    if (!deleteTweet) {
      return res.status(404).json({ message: "No se encontró el tweet" });
    }
    res.status(200).json({ message: `Tweet: ${tweet_id} eliminado` });
  } catch (error) {
    if (error instanceof Error) {
      return res
        .status(500)
        .json({ message: `Internal error: ${error.message}` });
    }
    res.status(500).json({ message: "Unknown error" });
  }
};
