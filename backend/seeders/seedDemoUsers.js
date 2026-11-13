import dotenv from 'dotenv';
import mongoose from 'mongoose';
import User from '../models/User.js';

dotenv.config();

const demoUsers = [
  {
    name: 'Platform Admin',
    email: 'admin@dronehub.com',
    password: 'admin123',
    role: 'super-admin',
    phone: '+91 99999 00001',
    profileImage:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    isActive: true
  },
  {
    name: 'SkyRent Owner',
    email: 'owner@dronehub.com',
    password: 'owner123',
    role: 'shop-owner',
    phone: '+91 98765 43210',
    profileImage:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    isActive: true
  },
  {
    name: 'AeroRent Owner',
    email: 'owner2@dronehub.com',
    password: 'owner123',
    role: 'shop-owner',
    phone: '+91 98123 45678',
    profileImage:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    isActive: true
  },
  {
    name: 'Demo Customer',
    email: 'user@dronehub.com',
    password: 'user123',
    role: 'customer',
    phone: '+91 98765 12345',
    profileImage:
      'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
    isActive: true
  }
];

export const seedDemoUsers = async () => {
  try {
    for (const userData of demoUsers) {
      const existing = await User.findOne({ email: userData.email });
      if (!existing) {
        // Create user; pre-save hook will hash password
        await User.create(userData);
        console.log(`👤 Seeded demo user: ${userData.email} [${userData.role}]`);
      }
    }
  } catch (err) {
    console.error('Error seeding demo users:', err.message);
  }
};

// Allow standalone execution: node seeders/seedDemoUsers.js
if (process.argv[1]?.endsWith('seedDemoUsers.js')) {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(async () => {
      console.log('Connected to MongoDB Atlas for seeding demo users...');
      await seedDemoUsers();
      console.log('Seeding complete.');
      process.exit(0);
    })
    .catch((err) => {
      console.error('Connection failed:', err.message);
      process.exit(1);
    });
}

export default seedDemoUsers;

