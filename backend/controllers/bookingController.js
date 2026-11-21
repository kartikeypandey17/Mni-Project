import mongoose from 'mongoose';
import Booking from '../models/Booking.js';
import Drone from '../models/Drone.js';
import { sendSuccess, sendError } from '../utils/apiResponse.js';

/**
 * @route   POST /api/bookings
 * @desc    Create a new drone rental reservation
 * @access  Private (Customer or Admin)
 */
export const createBooking = async (req, res, next) => {
  try {
    const {
      droneId,
      startDate,
      endDate,
      selectedAddons = [],
      customerInfo = {},
      notes = ''
    } = req.body;

    const start = new Date(startDate);
    const end = new Date(endDate);
    const now = new Date();

    // 1. Validate Date Chronology & Bounds
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return sendError(res, {
        statusCode: 400,
        message: 'Invalid start or end date format.'
      });
    }

    if (end <= start) {
      return sendError(res, {
        statusCode: 400,
        message: 'Rental end date must be strictly after the start date.'
      });
    }

    // Allow a 10-minute grace window for clock drift
    const tenMinutesAgo = new Date(now.getTime() - 10 * 60 * 1000);
    if (start < tenMinutesAgo) {
      return sendError(res, {
        statusCode: 400,
        message: 'Booking start date cannot be set in the past.'
      });
    }

    // 2. Fetch Drone & Verify Existence & Operational Status
    const drone = await Drone.findById(droneId);
    if (!drone) {
      return sendError(res, {
        statusCode: 404,
        message: 'The requested drone was not found.'
      });
    }

    if (drone.status === 'maintenance') {
      return sendError(res, {
        statusCode: 400,
        message: `Drone '${drone.name}' is currently scheduled for maintenance and cannot be reserved.`
      });
    }

    if (drone.status === 'offline') {
      return sendError(res, {
        statusCode: 400,
        message: `Drone '${drone.name}' is currently offline and unavailable for booking.`
      });
    }

    // 3. Database Consistency Check: Prevent Overlapping Bookings for the Same Drone
    const overlappingBooking = await Booking.findOne({
      droneId: drone._id,
      bookingStatus: { $in: ['approved', 'active', 'confirmed'] },
      $or: [
        { startDate: { $lt: end }, endDate: { $gt: start } }
      ]
    });

    if (overlappingBooking) {
      const bookedStart = overlappingBooking.startDate.toISOString().split('T')[0];
      const bookedEnd = overlappingBooking.endDate.toISOString().split('T')[0];
      return sendError(res, {
        statusCode: 409,
        message: `This drone is already booked from ${bookedStart} to ${bookedEnd}. Please select alternative dates or another drone.`
      });
    }

    // 4. Calculate Rental Duration & Pricing
    const diffMs = end.getTime() - start.getTime();
    const durationHours = Math.max(1, Math.ceil(diffMs / (1000 * 60 * 60)));
    const durationDays = Math.max(1, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));

    // Calculate base cost: use daily rate if >= 24 hours, else hourly
    let baseRentalCost = 0;
    if (durationHours < 24 && drone.pricePerHour > 0) {
      baseRentalCost = durationHours * drone.pricePerHour;
    } else {
      baseRentalCost = durationDays * drone.pricePerDay;
    }

    // Calculate add-on cost
    const addonsCost = (selectedAddons?.length || 0) * 500;
    const totalPrice = baseRentalCost + addonsCost;
    const securityDeposit = drone.securityDeposit || 5000;

    // 5. Create Booking Document in MongoDB
    const booking = await Booking.create({
      customerId: req.user._id,
      customerName: customerInfo.fullName || req.user.name,
      customerEmail: customerInfo.email || req.user.email,
      customerPhone: customerInfo.phone || req.user.phone || '',
      droneId: drone._id,
      droneName: drone.name,
      ownerId: drone.ownerId,
      shopName: drone.shopName || 'SkyRent Bengaluru',
      startDate: start,
      endDate: end,
      durationHours,
      durationDays,
      totalPrice,
      securityDeposit,
      selectedAddons,
      customerInfo: {
        fullName: customerInfo.fullName || req.user.name,
        email: customerInfo.email || req.user.email,
        phone: customerInfo.phone || req.user.phone || '',
        address: customerInfo.address || '',
        city: customerInfo.city || '',
        state: customerInfo.state || '',
        pinCode: customerInfo.pinCode || '',
        purpose: customerInfo.purpose || 'Aerial Photography',
        experience: customerInfo.experience || 'Intermediate'
      },
      bookingStatus: 'pending',
      paymentStatus: 'pending',
      notes
    });

    return sendSuccess(res, {
      statusCode: 201,
      message: 'Drone booking request submitted successfully. Awaiting shop owner approval.',
      data: { booking }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   GET /api/bookings
 * @desc    Get bookings scoped by role (Customer sees own, Owner sees own drones, Admin sees all)
 * @access  Private (Authenticated)
 */
export const getBookings = async (req, res, next) => {
  try {
    const { status, search, page = 1, limit = 20, droneId } = req.query;
    const userRole = req.user.role;
    const query = {};

    // 1. Enforce Strict Multi-Tenant Scoping by Authenticated Identity
    if (userRole === 'customer') {
      query.customerId = req.user._id;
    } else if (userRole === 'owner' || userRole === 'shop-owner') {
      query.ownerId = req.user._id;
    } else if (userRole === 'admin' || userRole === 'super-admin') {
      // Admins can see all, with optional owner/customer query filter
      if (req.query.customerId && mongoose.Types.ObjectId.isValid(req.query.customerId)) {
        query.customerId = req.query.customerId;
      }
      if (req.query.ownerId && mongoose.Types.ObjectId.isValid(req.query.ownerId)) {
        query.ownerId = req.query.ownerId;
      }
    }

    // 2. Drone filter
    if (droneId && mongoose.Types.ObjectId.isValid(droneId)) {
      query.droneId = droneId;
    }

    // 3. Status filter
    if (status && status !== 'All' && status !== 'all') {
      query.bookingStatus = status.trim().toLowerCase();
    }

    // 4. Text search filter
    if (search && search.trim()) {
      const searchRegex = new RegExp(search.trim(), 'i');
      query.$or = [
        { bookingNumber: searchRegex },
        { customerName: searchRegex },
        { droneName: searchRegex },
        { shopName: searchRegex }
      ];
    }

    // 5. Pagination
    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.min(100, Math.max(1, parseInt(limit, 10) || 20));
    const skip = (pageNum - 1) * limitNum;

    const total = await Booking.countDocuments(query);
    const bookings = await Booking.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum)
      .populate('customerId', 'name email phone avatar')
      .populate('droneId', 'name brand model image pricePerHour pricePerDay category specifications status')
      .populate('ownerId', 'name email phone');

    const totalPages = Math.ceil(total / limitNum);

    return sendSuccess(res, {
      statusCode: 200,
      message: 'Bookings retrieved successfully.',
      data: {
        bookings,
        pagination: {
          total,
          page: pageNum,
          limit: limitNum,
          totalPages,
          hasMore: pageNum < totalPages
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   GET /api/bookings/:id
 * @desc    Get detailed booking record by ID or bookingNumber
 * @access  Private (Authenticated Customer/Owner/Admin with ownership check)
 */
export const getBookingById = async (req, res, next) => {
  try {
    const { id } = req.params;

    let booking;
    if (mongoose.Types.ObjectId.isValid(id)) {
      booking = await Booking.findById(id)
        .populate('customerId', 'name email phone avatar')
        .populate('droneId', 'name brand model image pricePerHour pricePerDay specifications status batteryLevel')
        .populate('ownerId', 'name email phone');
    } else {
      // Lookup by readable booking number (e.g. "DRN-8492")
      booking = await Booking.findOne({ bookingNumber: id })
        .populate('customerId', 'name email phone avatar')
        .populate('droneId', 'name brand model image pricePerHour pricePerDay specifications status batteryLevel')
        .populate('ownerId', 'name email phone');
    }

    if (!booking) {
      return sendError(res, {
        statusCode: 404,
        message: `Booking not found with reference '${id}'.`
      });
    }

    // SECURITY CHECK: Verify access rights
    const userId = req.user._id.toString();
    const isCustomer = booking.customerId?._id?.toString() === userId || booking.customerId?.toString() === userId;
    const isOwner = booking.ownerId?._id?.toString() === userId || booking.ownerId?.toString() === userId;
    const isAdmin = req.user.role === 'admin' || req.user.role === 'super-admin';

    if (!isCustomer && !isOwner && !isAdmin) {
      return sendError(res, {
        statusCode: 403,
        message: 'Forbidden: You do not have authorization to view this booking.'
      });
    }

    return sendSuccess(res, {
      statusCode: 200,
      message: 'Booking details retrieved successfully.',
      data: { booking }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   PATCH /api/bookings/:id/status
 * @desc    Approve, reject, or update booking status (Shop Owner or Admin)
 * @access  Private (Shop Owner or Admin)
 */
export const updateBookingStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status, rejectionReason } = req.body;

    const normalizedStatus = status.trim().toLowerCase();

    const booking = mongoose.Types.ObjectId.isValid(id)
      ? await Booking.findById(id)
      : await Booking.findOne({ bookingNumber: id });
    if (!booking) {
      return sendError(res, {
        statusCode: 404,
        message: 'Booking not found.'
      });
    }

    // SECURITY: Ensure owner owns the drone or is admin
    const isOwner = booking.ownerId.toString() === req.user._id.toString();
    const isAdmin = req.user.role === 'admin' || req.user.role === 'super-admin';

    if (!isOwner && !isAdmin) {
      return sendError(res, {
        statusCode: 403,
        message: 'Forbidden: You can only manage bookings for your own shop fleet.'
      });
    }

    // STATE MACHINE VALIDATION
    if (booking.bookingStatus === 'cancelled') {
      return sendError(res, {
        statusCode: 400,
        message: 'Cannot update the status of a cancelled booking.'
      });
    }

    if (booking.bookingStatus === 'completed') {
      return sendError(res, {
        statusCode: 400,
        message: 'Cannot update the status of an already completed booking.'
      });
    }

    // If approving, re-check for double-booking conflicts
    if (normalizedStatus === 'approved' || normalizedStatus === 'confirmed') {
      const conflict = await Booking.findOne({
        _id: { $ne: booking._id },
        droneId: booking.droneId,
        bookingStatus: { $in: ['approved', 'active', 'confirmed'] },
        startDate: { $lt: booking.endDate },
        endDate: { $gt: booking.startDate }
      });

      if (conflict) {
        return sendError(res, {
          statusCode: 409,
          message: `Cannot approve: Drone has a conflicting approved booking (#${conflict.bookingNumber}) for these dates.`
        });
      }

      booking.bookingStatus = 'approved';
    } else if (normalizedStatus === 'rejected') {
      booking.bookingStatus = 'rejected';
      if (rejectionReason) {
        booking.rejectionReason = rejectionReason;
      }
    } else if (normalizedStatus === 'active') {
      booking.bookingStatus = 'active';
      // Mark drone as rented in fleet
      await Drone.findByIdAndUpdate(booking.droneId, { status: 'rented' });
    } else if (normalizedStatus === 'completed') {
      booking.bookingStatus = 'completed';
      // Release drone back to available in fleet
      await Drone.findByIdAndUpdate(booking.droneId, { status: 'available' });
    } else {
      booking.bookingStatus = normalizedStatus;
    }

    await booking.save();

    return sendSuccess(res, {
      statusCode: 200,
      message: `Booking #${booking.bookingNumber} status updated to '${booking.bookingStatus}'.`,
      data: { booking }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   PATCH /api/bookings/:id/cancel
 * @desc    Cancel an eligible booking
 * @access  Private (Customer who booked it, Shop Owner, or Admin)
 */
export const cancelBooking = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { reason = 'Cancelled by user' } = req.body;

    const booking = mongoose.Types.ObjectId.isValid(id)
      ? await Booking.findById(id)
      : await Booking.findOne({ bookingNumber: id });
    if (!booking) {
      return sendError(res, {
        statusCode: 404,
        message: 'Booking not found.'
      });
    }

    // SECURITY CHECK: Must be customer who made it, shop owner, or admin
    const userId = req.user._id.toString();
    const isCustomer = booking.customerId.toString() === userId;
    const isOwner = booking.ownerId.toString() === userId;
    const isAdmin = req.user.role === 'admin' || req.user.role === 'super-admin';

    if (!isCustomer && !isOwner && !isAdmin) {
      return sendError(res, {
        statusCode: 403,
        message: 'Forbidden: You do not have permission to cancel this booking.'
      });
    }

    // ELIGIBILITY CHECK
    if (booking.bookingStatus === 'cancelled') {
      return sendError(res, {
        statusCode: 400,
        message: 'Booking is already cancelled.'
      });
    }

    if (booking.bookingStatus === 'completed') {
      return sendError(res, {
        statusCode: 400,
        message: 'Completed bookings cannot be cancelled.'
      });
    }

    if (booking.bookingStatus === 'active') {
      return sendError(res, {
        statusCode: 400,
        message: 'Cannot cancel an active rental in progress. Please contact the shop owner for return procedures.'
      });
    }

    // Update booking status
    booking.bookingStatus = 'cancelled';
    booking.cancellationReason = reason;
    await booking.save();

    // Release drone if it was reserved
    await Drone.findByIdAndUpdate(booking.droneId, { status: 'available' });

    return sendSuccess(res, {
      statusCode: 200,
      message: `Booking #${booking.bookingNumber} cancelled successfully.`,
      data: { booking }
    });
  } catch (error) {
    next(error);
  }
};
