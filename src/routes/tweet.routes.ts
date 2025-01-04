import express from "express";
import { postTweet } from "../controllers/twits.controller";
import { protectRoute } from "../middlewares/protectRoutes";

const router = express.Router();

router.post("/postTweet", protectRoute, postTweet);

export default router;
