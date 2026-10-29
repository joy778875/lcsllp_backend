import mongoose from 'mongoose';

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null, isConnected: false };
}

let lastAttemptTime = 0;
const RETRY_INTERVAL_MS = 60000; // Only retry connecting once per minute if disconnected

export const connectDB = async () => {
  const MONGO_URI = process.env.MONGO_URI;

  if (!MONGO_URI) {
    cached.isConnected = false;
    return null;
  }

  if (cached.conn && mongoose.connection.readyState === 1) {
    cached.isConnected = true;
    return cached.conn;
  }

  const now = Date.now();
  if (now - lastAttemptTime < RETRY_INTERVAL_MS && !cached.promise) {
    return null;
  }
  lastAttemptTime = now;

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000, // 5s timeout to support serverless cold starts
    };

    cached.promise = mongoose
      .connect(MONGO_URI, opts)
      .then((mongooseInstance) => {
        console.log('✅ MongoDB connected successfully');
        cached.isConnected = true;
        return mongooseInstance;
      })
      .catch((err) => {
        console.warn(
          `⚠️ MongoDB Offline (${err.code || err.message}). Backend is running seamlessly in Persistent File Storage Mode.`
        );
        cached.promise = null;
        cached.isConnected = false;
        return null;
      });
  }

  try {
    cached.conn = await cached.promise;
    cached.isConnected = mongoose.connection.readyState === 1;
  } catch (e) {
    cached.promise = null;
    cached.isConnected = false;
    return null;
  }

  return cached.conn;
};

export const isMongoDBConnected = () => {
  return mongoose.connection && mongoose.connection.readyState === 1;
};

export default connectDB;

