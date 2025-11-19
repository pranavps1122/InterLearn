
import mongoose from "mongoose";

const MONGO_URL = process.env.MONGO_URL! || "mongodb://localhost:27017/interlearn";

export async function connectDB(): Promise<void> {
  try {
    await mongoose.connect(MONGO_URL, {
    });
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    throw err;
  }
}

export async function disconnectDB(): Promise<void> {
  await mongoose.disconnect();
}
