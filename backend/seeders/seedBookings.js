import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Booking from '../models/Booking.js';
import Drone from '../models/Drone.js';
import User from '../models/User.js';

dotenv.config();

export const seedBookings = async () => {
  try {
    const customer = await User.findOne({ email: 'user@dronehub.com' });
    const owner = await User.findOne({ email: 'owner@dronehub.com' });
    const drone = await Drone.findOne({});

    if (!customer || !owner || !drone) {
      console.warn('⚠️  Cannot seed bookings: Requires existing customer, owner, and drone records.');
      return;
    }

    const demoBookings = [
      {
        bookingNumber: 'DRN-8492',
        customerId: customer._id,
        customerName: customer.name,
        customerEmail: customer.email,
        customerPhone: customer.phone,
        droneId: drone._id,
        droneName: drone.name,
        ownerId: owner._id,
        shopName: drone.shopName || 'SkyRent Bengaluru',
        startDate: new Date('2026-11-15T09:00:00Z'),
        endDate: new Date('2026-11-18T18:00:00Z'),
        durationDays: 4,
        durationHours: 81,
        totalPrice: drone.pricePerDay * 4,
        securityDeposit: drone.securityDeposit,
        bookingStatus: 'approved',
        paymentStatus: 'paid',
        notes: 'Photography equipment rental for film production.'
      },
      {
        bookingNumber: 'DRN-7320',
        customerId: customer._id,
        customerName: customer.name,
        customerEmail: customer.email,
        customerPhone: customer.phone,
        droneId: drone._id,
        droneName: drone.name,
        ownerId: owner._id,
        shopName: drone.shopName || 'SkyRent Bengaluru',
        startDate: new Date('2026-11-20T09:00:00Z'),
        endDate: new Date('2026-11-22T18:00:00Z'),
        durationDays: 3,
        durationHours: 57,
        totalPrice: drone.pricePerDay * 3,
        securityDeposit: drone.securityDeposit,
        bookingStatus: 'pending',
        paymentStatus: 'pending',
        notes: 'Site survey inspection.'
      }
    ];

    let count = 0;
    for (const bData of demoBookings) {
      const existing = await Booking.findOne({ bookingNumber: bData.bookingNumber });
      if (!existing) {
        await Booking.create(bData);
        count++;
        console.log(`📋 Seeded booking: #${bData.bookingNumber} [${bData.bookingStatus}]`);
      }
    }

    console.log(`✅ Seeded ${count} demo bookings into MongoDB.`);
  } catch (err) {
    console.error('Error seeding bookings:', err.message);
  }
};

// Standalone execution: node seeders/seedBookings.js
if (process.argv[1]?.endsWith('seedBookings.js')) {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(async () => {
      console.log('Connected to MongoDB Atlas for seeding bookings...');
      await seedBookings();
      process.exit(0);
    })
    .catch((err) => {
      console.error('Connection failed:', err.message);
      process.exit(1);
    });
}

export default seedBookings;

