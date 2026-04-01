import mongoose from "mongoose";
import { config } from "dotenv";

config();

const cleanup = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    // Drop the users collection to remove bad indexes
    const db = mongoose.connection.db;
    await db.collection("users").drop();
    console.log("✅ Dropped users collection and bad indexes");

    // Close connection
    await mongoose.connection.close();
    console.log("✅ Cleanup complete!");
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
};

cleanup();
