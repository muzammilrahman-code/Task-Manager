import mongoose from 'mongoose';

const connectDB = async () => {
  // If we already have a connection, don't create a new one
  if (mongoose.connections[0].readyState) {
    return;
  }

  try {
   const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected: ${conn.connection.host}`)
  } catch (err) {
    console.error("Database connection error:", err);
  }
};

export default connectDB;