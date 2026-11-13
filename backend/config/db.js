import mongoose from 'mongoose';

/**
 * MongoDB Atlas Connection Configuration
 * Establishes persistent connection to MongoDB with reconnection resilience.
 */
export const connectDB = async () => {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    console.error('❌ MongoDB Connection Error: MONGO_URI is not defined in environment variables.');
    return;
  }

  if (uri.includes('<db_password>')) {
    console.warn('⚠️  MongoDB Notice: Replace <db_password> in your backend/.env file with your actual Atlas database user password.');
  }

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    });

    console.log(`✅ MongoDB Atlas Connected: ${conn.connection.host}/${conn.connection.name}`);
  } catch (error) {
    console.error(`❌ MongoDB Atlas Connection Failed: ${error.message}`);
    // Do not crash the entire process so /api/health and other endpoints can still report status
  }
};

// Lifecycle Event Listeners
mongoose.connection.on('disconnected', () => {
  console.warn('⚠️  MongoDB connection disconnected.');
});

mongoose.connection.on('reconnected', () => {
  console.log('🔄 MongoDB connection re-established.');
});

export default connectDB;

