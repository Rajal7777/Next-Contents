import mongoose from "mongoose";

const MONGO_URI = process.env.MONOGO_URI;

export async function connectDB() {
  try {
    //prevent multiple connection
    if (mongoose.connect.readyState >= 1) {
      console.log("MD already connected");
      return;
    }

    await mongoose.connect(MONGO_URI);
    console.log("MD connected successfully");
  } catch (error) {
    console.log("DB connection error", error);
  }
}
