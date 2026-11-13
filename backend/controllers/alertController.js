import mongoose from 'mongoose';
import Alert from '../models/Alert.js';
import Drone from '../models/Drone.js';
import { sendSuccess, sendError } from '../utils/apiResponse.js';
import { getIO } from '../config/socket.js';

/**
 * @route   POST /api/alerts
 * @desc    Create a new drone tracking alert (emergency, low battery, geofence, connection lost, system)
 * @access  Private (Authenticated)
 */
export const createAlert = async (req, res, next) => {
  try {
    const {
      droneId,
      alertType = 'emergency',
      message,
      severity = 'critical',
      location = { latitude: 12.9716, longitude: 77.5946, altitude: 45 },
      flightId
    } = req.body;

    if (!droneId || !message) {
      return sendError(res, {
        statusCode: 400,
        message: 'Drone ID and alert message description are required.'
      });
    }

    const userId = req.user._id;

    // Create DB record
    const alert = await Alert.create({
      droneId,
      userId,
      flightId: flightId && mongoose.Types.ObjectId.isValid(flightId) ? flightId : undefined,
      alertType: alertType.toLowerCase(),
      message,
      severity: severity.toLowerCase(),
      location
    });

    // Broadcast in real-time via Socket.IO
    const io = getIO();
    if (io) {
      const alertPayload = {
        id: alert._id,
        droneId,
        alertType: alert.alertType,
        message: alert.message,
        severity: alert.severity,
        location: alert.location,
        createdAt: alert.createdAt,
        isSimulated: true
      };

      io.to(`drone:${droneId}`).emit('alert_trigger', alertPayload);
      io.to(`drone:${droneId}`).emit('new_alert', alertPayload);
      io.to('admin:all').emit('new_alert', alertPayload);
    }

    return sendSuccess(res, {
      statusCode: 201,
      message: `Alert '${alertType}' recorded and broadcasted.`,
      data: { alert }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   GET /api/alerts
 * @desc    Get alerts history scoped by user role (Customer sees own, Owner sees shop drones, Admin sees all)
 * @access  Private (Authenticated)
 */
export const getAlerts = async (req, res, next) => {
  try {
    const { droneId, alertType, isRead, page = 1, limit = 20 } = req.query;
    const userRole = req.user.role;
    const query = {};

    // Role-based isolation
    if (userRole === 'customer') {
      query.userId = req.user._id;
    } else if (userRole === 'owner' || userRole === 'shop-owner') {
      const ownerDrones = await Drone.find({ ownerId: req.user._id }).select('_id');
      const droneIds = ownerDrones.map((d) => d._id);
      query.droneId = { $in: droneIds };
    }
    // Admin sees all

    if (droneId && mongoose.Types.ObjectId.isValid(droneId)) {
      query.droneId = droneId;
    }
    if (alertType && alertType !== 'All') {
      query.alertType = alertType.toLowerCase();
    }
    if (isRead !== undefined && isRead !== '') {
      query.isRead = isRead === 'true' || isRead === true;
    }

    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.min(100, Math.max(1, parseInt(limit, 10) || 20));
    const skip = (pageNum - 1) * limitNum;

    const total = await Alert.countDocuments(query);
    const alerts = await Alert.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum)
      .populate('droneId', 'name brand model image')
      .populate('userId', 'name email');

    return sendSuccess(res, {
      statusCode: 200,
      message: 'Alerts history retrieved successfully.',
      data: {
        alerts,
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
 * @route   PATCH /api/alerts/:id/read
 * @desc    Mark an alert as read / acknowledged
 * @access  Private (Authenticated)
 */
export const markAlertAsRead = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return sendError(res, {
        statusCode: 400,
        message: 'Invalid alert ID format.'
      });
    }

    const alert = await Alert.findById(id);
    if (!alert) {
      return sendError(res, {
        statusCode: 404,
        message: 'Alert record not found.'
      });
    }

    alert.isRead = true;
    alert.acknowledgedAt = new Date();
    await alert.save();

    return sendSuccess(res, {
      statusCode: 200,
      message: 'Alert marked as acknowledged.',
      data: { alert }
    });
  } catch (error) {
    next(error);
  }
};

