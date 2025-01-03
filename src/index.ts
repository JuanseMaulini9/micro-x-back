import express from "express";
import connectDB from "./db";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes";
import { UserInterface } from "./types";

declare global {
  namespace Express {
    interface Request {
      user: UserInterface;
    }
  }
}

const app = express();
dotenv.config();
app.use(express.json());
const PORT = process.env.PORT || 8080;

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log(`App escuchando en el port ${PORT}`);
});
