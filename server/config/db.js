import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);

    mongoose.connection.on("error", (err) => {
      console.error("❌ MongoDB Error:", err.message);
    });

    mongoose.connection.on("disconnected", () => {
      console.warn("⚠️ MongoDB Disconnected");
    });

  } catch (error) {
    console.error("❌ Database Connection Failed:", error.message);
    process.exit(1);
  }
};

// Graceful Shutdown
process.on("SIGINT", async () => {
  try {
    await mongoose.connection.close();
    console.log("🔴 MongoDB Connection Closed");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error Closing MongoDB Connection:", error.message);
    process.exit(1);
  }
});

export default connectDB;