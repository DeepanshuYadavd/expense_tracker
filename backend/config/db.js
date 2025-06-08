import mongoose from "mongoose";

const db = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("db connected")
  } catch (err) {
    console.error("❌mongo db connection error", err);
    process.exit(1)
  }
};

export default db;
