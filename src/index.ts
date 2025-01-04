import express from "express";
import connectDB from "./db";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes";
import tweetRoutes from "./routes/tweet.routes";
import cors from "cors";
import cookie from "cookie-parser";

declare global {
  namespace Express {
    interface Request {
      user: {
        _id: string;
      };
    }
  }
}
const app = express();
app.use(cors());
dotenv.config();
app.use(express.json());
app.use(cookie());
const PORT = process.env.PORT || 8080;

app.use("/api/auth", authRoutes);
app.use("/api/tweets", tweetRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log(`App escuchando en el port ${PORT}`);
});
