import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    'MONGODB_URI environment variable is not defined. Please add it in Vercel dashboard: Settings > Environment Variables'
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

async function connectDB() {
  // Return cached connection if available AND ready
  if (cached!.conn && cached!.conn.connection.readyState === 1) {
    console.log('✅ Using cached MongoDB connection');
    return cached!.conn;
  }

  if (!cached!.promise) {
    const opts = {
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      family: 4, // Use IPv4 for better serverless compatibility
    };

    console.log('🔄 Connecting to MongoDB Atlas...');
    console.log(`📍 Environment: ${process.env.VERCEL_ENV || 'local'}`);
    console.log(`🔗 MongoDB URI exists: ${!!MONGODB_URI}`);
    console.log(`🔗 MongoDB URI format: ${MONGODB_URI ? MONGODB_URI.substring(0, 20) + '...' : 'MISSING'}`);
    
    cached!.promise = mongoose.connect(MONGODB_URI!, opts)
      .then((mongoose) => {
        console.log('✅ MongoDB connected successfully');
        console.log(`📊 Database: ${mongoose.connection.db.databaseName}`);
        console.log(`🌐 Connection host: ${mongoose.connection.host}`);
        console.log(`📡 Connection state: ${mongoose.connection.readyState} (1=connected)`);
        return mongoose;
      })
      .catch((error) => {
        console.error('');
        console.error('❌ ============ MongoDB Connection Failed ============');
        console.error(`Error name: ${error.name}`);
        console.error(`Error code: ${error.code || 'N/A'}`);
        console.error(`Error message: ${error.message}`);
        console.error(`Full error stack:`);
        console.error(error.stack || error);
        console.error('');
        
        // Detailed diagnostic for common errors
        if (error.message.includes('IP') || error.message.includes('whitelist') || error.code === 'ENOTFOUND' || error.message.includes('not connect')) {
          console.error('🔒 DIAGNOSIS: IP Whitelist / Network Access Issue');
          console.error('   Your Vercel serverless IP is not whitelisted in MongoDB Atlas');
          console.error('');
          console.error('📋 FIX STEPS:');
          console.error('   1. Go to: https://cloud.mongodb.com');
          console.error('   2. Select your cluster → Network Access');
          console.error('   3. Click: Add IP Address');
          console.error('   4. Add: 0.0.0.0/0 (allow all IPs for serverless)');
          console.error('   5. Save and wait 1-2 minutes for propagation');
          console.error('');
        } else if (error.message.includes('authentication failed') || error.message.includes('auth')) {
          console.error('🔑 DIAGNOSIS: Authentication Error');
          console.error('   MongoDB username/password in MONGODB_URI is incorrect');
          console.error('');
          console.error('📋 FIX STEPS:');
          console.error('   1. Verify MONGODB_URI in Vercel dashboard');
          console.error('   2. Format: mongodb+srv://<user>:<password>@<cluster>/<database>');
          console.error('   3. Ensure password is URL-encoded (special chars like @, #, % need encoding)');
          console.error('   4. Verify user exists in MongoDB Atlas → Database Access');
          console.error('');
        } else if (error.message.includes('MONGODB_URI')) {
          console.error('⚙️  DIAGNOSIS: Environment Variable Missing');
          console.error('   MONGODB_URI is not set in Vercel environment variables');
          console.error('');
          console.error('📋 FIX STEPS:');
          console.error('   1. Go to Vercel dashboard → Your project');
          console.error('   2. Settings → Environment Variables');
          console.error('   3. Add: MONGODB_URI');
          console.error('   4. Value: mongodb+srv://<user>:<password>@<cluster>/<database>');
          console.error('   5. Set scope to: Production, Preview, Development (or All Environments)');
          console.error('   6. Redeploy your application');
          console.error('');
        }
        
        console.error('🔍 ADDITIONAL DEBUG INFO:');
        console.error(`   - Vercel Environment: ${process.env.VERCEL_ENV || 'N/A'}`);
        console.error(`   - Node Version: ${process.version}`);
        console.error(`   - Mongoose Version: ${mongoose.version}`);
        console.error(`   - Timestamp: ${new Date().toISOString()}`);
        console.error('');
        console.error('====================================================');
        console.error('');
        
        // Reset promise on error so next invocation can retry
        cached!.promise = null;
        throw error;
      });
  }

  try {
    cached!.conn = await cached!.promise;
    
    // CRITICAL: Wait for connection to be fully ready
    if (cached!.conn.connection.readyState !== 1) {
      await new Promise<void>((resolve) => {
        cached!.conn!.connection.once('connected', () => resolve());
      });
    }
  } catch (e) {
    cached!.promise = null;
    cached!.conn = null;
    throw e;
  }

  return cached!.conn;
}

export default connectDB;
