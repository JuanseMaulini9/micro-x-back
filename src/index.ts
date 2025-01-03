import express from "express";
import connectDB from "./db";

const app = express();

app.get("/", (req, res) => {
  console.log("hola mundo 2");
});

app.listen(8080, () => {
  connectDB();
  console.log("App escuchando en el puerto 8080");
});
