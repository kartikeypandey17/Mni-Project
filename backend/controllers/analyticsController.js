import Booking from '../models/Booking.js';
import Drone from '../models/Drone.js';
import User from '../models/User.js';
import Flight from '../models/Flight.js';
import Alert from '../models/Alert.js';
import { sendSuccess } from '../utils/apiResponse.js';

/**
 * @route   GET /api/analytics
 * @desc    Compute role-scoped dashboard metrics directly from MongoDB collections
 * @access  Private (Authenticated)
 */
export const getDashboardAnalytics = async (req, res, next) => {
  try {
    const userRole = req.user.role;
    const userId = req.user._id;

    // 1. CUSTOMER DASHBOARD ANALYTICS
    if (userRole === 'customer') {
      const userBookings = await Booking.find({ customerId: userId }).sort({ createdAt: -1 });
      const activeRentals = userBookings.filter((b) => b.bookingStatus === 'active');
      const upcomingBookings = userBookings.filter(
        (b) => b.bookingStatus === 'approved' || b.bookingStatus === 'pending'
      );
      const completedRentals = userBookings.filter((b) => b.bookingStatus === 'completed');
      const totalSpent = userBookings
        .filter((b) => b.bookingStatus !== 'cancelled' && b.bookingStatus !== 'rejected')
        .reduce((sum, b) => sum + (b.totalPrice || 0), 0);

      const userFlights = await Flight.find({ customerId: userId });
      const totalFlightMinutes = userFlights.reduce((sum, f) => sum + (f.duration || 0), 0);
      const totalFlightHours = Math.round((totalFlightMinutes / 60) * 10) / 10;

      const recentBookings = userBookings.slice(0, 5);

      return sendSuccess(res, {
        statusCode: 200,
        message: 'Customer analytics computed successfully from database.',
        data: {
          activeRentalsCount: activeRentals.length,
          upcomingBookingsCount: upcomingBookings.length,
          completedRentalsCount: completedRentals.length,
          totalSpent,
          totalFlightsCount: userFlights.length,
          totalFlightHours,
          recentBookings
        }
      });
    }

    // 2. SHOP OWNER DASHBOARD ANALYTICS
    if (userRole === 'owner' || userRole === 'shop-owner') {
      const ownerDrones = await Drone.find({ ownerId: userId }).sort({ createdAt: -1 });
      const droneIds = ownerDrones.map((d) => d._id);

      const ownerBookings = await Booking.find({
        $or: [{ ownerId: userId }, { droneId: { $in: droneIds } }]
      }).sort({ createdAt: -1 });

      const activeRentals = ownerBookings.filter((b) => b.bookingStatus === 'active');
      const completedRentals = ownerBookings.filter((b) => b.bookingStatus === 'completed');
      const pendingApproval = ownerBookings.filter((b) => b.bookingStatus === 'pending');
      const totalRevenue = ownerBookings
        .filter((b) => b.bookingStatus !== 'cancelled' && b.bookingStatus !== 'rejected')
        .reduce((sum, b) => sum + (b.totalPrice || 0), 0);

      const availableDrones = ownerDrones.filter((d) => d.status === 'available');
      const utilizationRate =
        ownerDrones.length > 0
          ? Math.round((activeRentals.length / ownerDrones.length) * 100)
          : 0;

      return sendSuccess(res, {
        statusCode: 200,
        message: 'Shop Owner fleet analytics computed successfully from database.',
        data: {
          totalDrones: ownerDrones.length,
          availableDrones: availableDrones.length,
          activeRentals: activeRentals.length,
          completedRentals: completedRentals.length,
          pendingRequests: pendingApproval.length,
          totalRevenue,
          utilizationRate,
          recentBookings: ownerBookings.slice(0, 5)
        }
      });
    }

    // 3. SUPER ADMIN PLATFORM ANALYTICS
    if (userRole === 'admin' || userRole === 'super-admin') {
      const totalUsers = await User.countDocuments();
      const totalCustomers = await User.countDocuments({ role: 'customer' });
      const totalOwners = await User.countDocuments({ role: { $in: ['owner', 'shop-owner'] } });
      const totalDrones = await Drone.countDocuments();
      const availableDrones = await Drone.countDocuments({ status: 'available' });
      const rentedDrones = await Drone.countDocuments({ status: 'rented' });

      const allBookings = await Booking.find({}).sort({ createdAt: -1 });
      const activeRentals = allBookings.filter((b) => b.bookingStatus === 'active');
      const completedRentals = allBookings.filter((b) => b.bookingStatus === 'completed');
      const pendingBookings = allBookings.filter((b) => b.bookingStatus === 'pending');
      const totalGMV = allBookings
        .filter((b) => b.bookingStatus !== 'cancelled' && b.bookingStatus !== 'rejected')
        .reduce((sum, b) => sum + (b.totalPrice || 0), 0);

      const totalAlerts = await Alert.countDocuments();
      const unresolvedAlerts = await Alert.countDocuments({ isRead: false });

      return sendSuccess(res, {
        statusCode: 200,
        message: 'Super Admin platform analytics computed successfully from database.',
        data: {
          totalUsers,
          totalCustomers,
          totalOwners,
          totalDrones,
          availableDrones,
          rentedDrones,
          activeRentalsCount: activeRentals.length,
          completedRentalsCount: completedRentals.length,
          pendingBookingsCount: pendingBookings.length,
          totalBookingsCount: allBookings.length,
          totalGMV,
          totalAlerts,
          unresolvedAlerts,
          recentBookings: allBookings.slice(0, 5)
        }
      });
    }

    return sendSuccess(res, {
      statusCode: 200,
      message: 'Analytics data available.',
      data: {}
    });
  } catch (error) {
    next(error);
  }
};

