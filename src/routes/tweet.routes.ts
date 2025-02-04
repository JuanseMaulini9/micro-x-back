import express from "express";
import {
  postTweet,
  getTweets,
  getTweet,
  deleteTweet,
} from "../controllers/twits.controller";
import { protectRoute } from "../middlewares/protectRoutes";

const router = express.Router();

router.get("/getTweets", protectRoute, getTweets);
router.get("/getTweet", protectRoute, getTweet);
router.post("/postTweet", protectRoute, postTweet);
router.delete("/deleteTweet", protectRoute, deleteTweet);

export default router;
