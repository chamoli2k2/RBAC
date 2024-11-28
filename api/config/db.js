import mongoose from "mongoose";
import dotenv from "dotenv";

// Load env variables
dotenv.config();

// Connect to MongoDB
const connectDB = async (req, res) => {
    try{
        const db = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected: ${db.connection.host}`);
    }
    catch(err){
        return res.status(500).json({msg: err.message});
    }
}


export default connectDB;