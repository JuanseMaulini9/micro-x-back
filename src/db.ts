import mongoose from "mongoose";

const connectDB = async () => {
  try {
    if (process.env.PORTDB) {
      await mongoose.connect(process.env.PORTDB);
      console.log("conexion exitosa con la base de datos");
    }
  } catch (e) {
    console.log("Error al conectar con la base de datos: ", e);
  }
};

export default connectDB;
