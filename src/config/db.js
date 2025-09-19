import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        const uri = process.env.MONGO_URI;
        if (!uri) throw new Error("MONGO_URI is not defined in .env");
        await mongoose.connect(uri);
        console.log("Mongo DB Connected");
    } catch (err) {
        console.log("Mongo DB Connection error:", err.message);
        throw err;
    }
};