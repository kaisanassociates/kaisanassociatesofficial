const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/influencia';

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  // Return cached connection if available AND ready
  if (cached.conn && cached.conn.connection.readyState === 1) {
    console.log('✅ Using cached MongoDB connection');
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    };

    console.log('🔄 Connecting to MongoDB Atlas...');
    
    cached.promise = mongoose.connect(MONGODB_URI, opts)
      .then((mongoose) => {
        console.log('✅ MongoDB connected successfully');
        console.log(`📊 Database: ${mongoose.connection.db.databaseName}`);
        return mongoose;
      })
      .catch((error) => {
        console.error('❌ MongoDB connection error:', error.message);
        
        // Check if it's an IP whitelist error
        if (error.message.includes('IP') || error.message.includes('whitelist') || error.message.includes('not connect')) {
          console.error('');
          console.error('🔒 ACTION REQUIRED: Whitelist your IP in MongoDB Atlas');
          console.error('   1. Go to: https://cloud.mongodb.com');
          console.error('   2. Navigate to: Network Access → IP Access List');
          console.error('   3. Click: Add IP Address');
          console.error('   4. Add: 0.0.0.0/0 (allow all) OR your current IP');
          console.error('   5. Wait 1-2 minutes for changes to propagate');
          console.error('');
        }
        
        // Reset promise on error so next invocation can retry
        cached.promise = null;
        throw error;
      });
  }

  try {
    cached.conn = await cached.promise;
    
    // CRITICAL: Wait for connection to be fully ready
    if (cached.conn.connection.readyState !== 1) {
      await new Promise((resolve) => {
        cached.conn.connection.once('connected', resolve);
      });
    }
  } catch (e) {
    cached.promise = null;
    cached.conn = null;
    throw e;
  }

  return cached.conn;
}

module.exports = connectDB;