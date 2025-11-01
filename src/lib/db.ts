import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    'Please define MONGODB_URI environment variable in .env or .env.local file'
  );
}

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongoose: MongooseCache | undefined;
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

/**
 * Establishes a MongoDB connection using Mongoose with connection pooling.
 * Uses global caching to reuse connections across serverless function invocations.
 * 
 * @returns {Promise<typeof mongoose>} The Mongoose connection instance
 * @throws {Error} If connection fails or MONGODB_URI is not defined
 */
async function connectDB() {
  // Return cached connection if available AND ready
  if (cached!.conn && cached!.conn.connection.readyState === 1) {
    console.log('✅ Using cached MongoDB connection');
    return cached!.conn;
  }

  if (!cached!.promise) {
    const opts = {
      bufferCommands: false,
      maxPoolSize: 10, // Maximum number of connections in the pool
      serverSelectionTimeoutMS: 10000, // Timeout for selecting a server (increased from 5s)
      socketTimeoutMS: 45000, // Timeout for socket operations
      family: 4, // Use IPv4, skip trying IPv6
    };

    console.log('🔄 Connecting to MongoDB Atlas...');
    
    cached!.promise = mongoose.connect(MONGODB_URI!, opts)
      .then((mongoose) => {
        console.log('✅ MongoDB connected successfully');
        console.log(`📊 Database: ${mongoose.connection.db.databaseName}`);
        return mongoose;
      })
      .catch((error) => {
        console.error('❌ MongoDB connection error:', error.message);
        // Reset promise on error so next invocation can retry
        cached!.promise = null;
        throw error;
      });
  }

  try {
    cached!.conn = await cached!.promise;
    
    // CRITICAL: Wait for connection to be fully ready before returning
    // This prevents "bufferCommands = false" errors
    if (cached!.conn.connection.readyState !== 1) {
      console.log('⏳ Waiting for MongoDB connection to be ready...');
      await new Promise<void>((resolve) => {
        cached!.conn!.connection.once('connected', () => {
          console.log('✅ MongoDB connection is now ready');
          resolve();
        });
      });
    }
  } catch (e) {
    cached!.promise = null;
    cached!.conn = null;
    throw e;
  }

  return cached!.conn;
}

/**
 * Closes the MongoDB connection.
 * Useful for cleanup in non-serverless environments.
 */
export async function disconnectDB() {
  if (cached?.conn) {
    await mongoose.disconnect();
    cached.conn = null;
    cached.promise = null;
    console.log('🔌 MongoDB disconnected');
  }
}

export default connectDB;
