import mongoose from "mongoose";
import { MongoClient } from "mongodb";

export const MONGO_URI = process.env.MONGODB_URI;

// Function to get a native MongoDB connection for GridFS
export async function getMongoNativeConnection() {
  const client = new MongoClient(MONGO_URI as string, {
    useUnifiedTopology: true,
    readPreference: "primary",
  });
  await client.connect();
  console.log("Connected to MongoDB for GridFS");
  return client.db(); // Return the database instance
}

const cached: {
  connection?: typeof mongoose;
  promise?: Promise<typeof mongoose>;
} = {};
async function connectMongo() {
  if (!MONGO_URI) {
    throw new Error(
      "Please define the MONGO_URI environment variable inside .env.local"
    );
  }
  if (cached.connection) {
    return cached.connection;
  }
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };
    cached.promise = mongoose.connect(MONGO_URI, opts);
  }
  try {
    cached.connection = await cached.promise;
  } catch (e) {
    cached.promise = undefined;
    throw e;
  }
  return cached.connection;
}

export default connectMongo;
