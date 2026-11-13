import mongoose from 'mongoose';
import Flight from '../models/Flight.js';
import Drone from '../models/Drone.js';
import Booking from '../models/Booking.js';
import { sendSuccess, sendError } from '../utils/apiResponse.js';

/**
 * @route   POST /api/flights
 * @desc    Start/record a new flight mission for a rented drone
 * @access  Private (Customer with active booking, Shop Owner, or Admin)
 */
export const createFlight = async (req, res, next) => {
  try {
    const {
      droneId,
      bookingId,
      startLocation = { latitude: 12.9716, longitude: 77.5946, address: 'SkyRent Hub Bengaluru' },
      endLocation = { latitude: 12.9352, longitude: 77.6245, address: 'Mission Delivery Point' },
      maxAltitude = 65,
      maxSpeed = 42
    } = req.body;

    if (!droneId) {
      return sendError(res, {
        statusCode: 400,
        message: 'Drone reference ID is required to initiate a flight.'
      });
    }

    // Verify drone exists
    const drone = await Drone.findById(droneId);
    if (!drone) {
      return sendError(res, {
        statusCode: 404,
        message: 'Associated drone not found.'
      });
    }

    // Link customer
    const customerId = req.user._id;

    const flight = await Flight.create({
      droneId,
      bookingId: bookingId && mongoose.Types.ObjectId.isValid(bookingId) ? bookingId : undefined,
      customerId,
      startTime: new Date(),
      flightStatus: 'in-flight',
      startLocation,
      endLocation,
      maxAltitude,
      maxSpeed
    });

    return sendSuccess(res, {
      statusCode: 201,
      message: `Flight mission #${flight.flightNumber} started successfully.`,
      data: { flight }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   GET /api/flights
 * @desc    Get flight logs (Customer sees own, Owner sees shop drones, Admin sees all)
 * @access  Private (Authenticated)
 */
export const getFlights = async (req, res, next) => {
  try {
    const { droneId, bookingId, status, page = 1, limit = 20 } = req.query;
    const userRole = req.user.role;
    const query = {};

    // 1. Role-based scoping
    if (userRole === 'customer') {
      query.customerId = req.user._id;
    } else if (userRole === 'owner' || userRole === 'shop-owner') {
      const ownerDrones = await Drone.find({ ownerId: req.user._id }).select('_id');
      const droneIds = ownerDrones.map((d) => d._id);
      query.droneId = { $in: droneIds };
    }
    // Admin sees all

    // 2. Filters
    if (droneId && mongoose.Types.ObjectId.isValid(droneId)) {
      query.droneId = droneId;
    }
    if (bookingId && mongoose.Types.ObjectId.isValid(bookingId)) {
      query.bookingId = bookingId;
    }
    if (status && status !== 'All') {
      query.flightStatus = status.toLowerCase();
    }

    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.min(100, Math.max(1, parseInt(limit, 10) || 20));
    const skip = (pageNum - 1) * limitNum;

    const total = await Flight.countDocuments(query);
    const flights = await Flight.find(query)
      .sort({ startTime: -1 })
      .skip(skip)
      .limit(limitNum)
      .populate('droneId', 'name brand model image status')
      .populate('customerId', 'name email phone');

    return sendSuccess(res, {
      statusCode: 200,
      message: 'Flight mission records retrieved successfully.',
      data: {
        flights,
        pagination: {
          total,
          page: pageNum,
          limit: limitNum,
          totalPages: Math.ceil(total / limitNum)
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   GET /api/flights/:id
 * @desc    Get detailed flight log by ID or flightNumber
 * @access  Private (Authenticated with ownership verification)
 */
export const getFlightById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const query = mongoose.Types.ObjectId.isValid(id)
      ? { _id: id }
      : { flightNumber: id };

    const flight = await Flight.findOne(query)
      .populate('droneId', 'name brand model image specifications status batteryLevel')
      .populate('customerId', 'name email phone')
      .populate('bookingId');

    if (!flight) {
      return sendError(res, {
        statusCode: 404,
        message: 'Flight record not found.'
      });
    }

    // Role security check
    const userId = req.user._id.toString();
    const isCustomer = flight.customerId?._id?.toString() === userId;
    const isAdmin = req.user.role === 'admin' || req.user.role === 'super-admin';

    let isOwner = false;
    if (flight.droneId?.ownerId) {
      isOwner = flight.droneId.ownerId.toString() === userId;
    }

    if (!isCustomer && !isOwner && !isAdmin) {
      return sendError(res, {
        statusCode: 403,
        message: 'Forbidden: You do not have permission to inspect this flight record.'
      });
    }

    return sendSuccess(res, {
      statusCode: 200,
      message: 'Flight mission details retrieved.',
      data: { flight }
    });
  } catch (error) {
    next(error);
  }
};

