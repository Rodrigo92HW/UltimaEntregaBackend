import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

const connectMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Conectado correctamente a MongoDB!");
    } catch (error) {
        console.log("Error al conectar a MongoDB: ", error);
    }
}

export default connectMongoDB;