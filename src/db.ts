import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017");
    console.log("conexion exitosa con la base de datos");
  } catch (e) {
    console.log("Error al conectar con la base de datos: ", e);
  }
};

export default connectDB;
