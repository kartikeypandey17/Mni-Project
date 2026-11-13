import mongoose from 'mongoose';
import Telemetry from '../models/Telemetry.js';
import Drone from '../models/Drone.js';
import Alert from '../models/Alert.js';
import { sendSuccess, sendError } from '../utils/apiResponse.js';
import telemetrySimulator from '../services/telemetrySimulator.js';

/**
 * @route   POST /api/telemetry
 * @desc    Ingest real or simulated telemetry snapshot
 * @access  Public / Private (API Key or JWT protected)
 */
export const recordTelemetry = async (req, res, next) => {
  try {
    const {
      droneId,
      flightId,
      batteryLevel,
      latitude,
      longitude,
      altitude = 0,
      speed = 0,
      heading = 0,
      pitch = 0,
      roll = 0,
      satellites = 14,
      signalStrength = 95,
      telemetrySource = 'simulated' // Default to simulated mode
    } = req.body;

    if (!droneId) {
      return sendError(res, {
        statusCode: 400,
        message: 'Drone ID reference is required for telemetry recording.'
      });
    }

    if (batteryLevel === undefined || latitude === undefined || longitude === undefined) {
      return sendError(res, {
        statusCode: 400,
        message: 'Battery level, latitude, and longitude coordinates are mandatory.'
      });
    }

    // Prepare payload
    const telemetryPayload = {
      droneId,
      flightId: flightId && mongoose.Types.ObjectId.isValid(flightId) ? flightId : undefined,
      batteryLevel: Number(batteryLevel),
      latitude: Number(latitude),
      longitude: Number(longitude),
      altitude: Number(altitude),
      speed: Number(speed),
      heading: Number(heading),
      pitch: Number(pitch),
      roll: Number(roll),
      satellites: Number(satellites),
      signalStrength: Number(signalStrength),
      telemetrySource,
      isSimulated: telemetrySource === 'simulated',
      recordedAt: new Date()
    };

    // Broadcast through real-time Socket.IO and persist to MongoDB
    const result = await telemetrySimulator.ingestAndBroadcast(
      telemetryPayload,
      req.user?._id
    );

    return sendSuccess(res, {
      statusCode: 201,
      message: `Telemetry snapshot ingested successfully (${telemetrySource.toUpperCase()} MODE).`,
      data: { telemetry: result }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   GET /api/telemetry/:droneId
 * @desc    Get historical telemetry logs for a specific drone
 * @access  Private (Authenticated Customer / Shop Owner / Admin)
 */
export const getTelemetryByDroneId = async (req, res, next) => {
  try {
    const { droneId } = req.params;
    const { limit = 50, page = 1 } = req.query;

    const limitNum = Math.min(200, Math.max(1, parseInt(limit, 10) || 50));
    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const skip = (pageNum - 1) * limitNum;

    const query = {};
    if (mongoose.Types.ObjectId.isValid(droneId)) {
      query.droneId = droneId;
    }

    const total = await Telemetry.countDocuments(query);
    const telemetryLogs = await Telemetry.find(query)
      .sort({ recordedAt: -1 })
      .skip(skip)
      .limit(limitNum);

    // If database has no logs for this drone yet, supply simulated historical points
    if (telemetryLogs.length === 0) {
      const now = Date.now();
      const mockHistorical = Array.from({ length: 6 }).map((_, i) => ({
        droneId,
        batteryLevel: Math.max(30, 85 - i * 3),
        battery: Math.max(30, 85 - i * 3),
        latitude: 12.9716 + i * 0.001,
        longitude: 77.5946 + i * 0.001,
        altitude: 40 + i * 5,
        speed: 28 + (i % 3) * 4,
        heading: 90 + i * 15,
        telemetrySource: 'simulated',
        isSimulated: true,
        recordedAt: new Date(now - (5 - i) * 60000).toISOString()
      }));

      return sendSuccess(res, {
        statusCode: 200,
        message: 'Telemetry history retrieved (SIMULATED TELEMETRY MODE).',
        data: {
          telemetry: mockHistorical,
          isSimulated: true,
          pagination: {
            total: mockHistorical.length,
            page: 1,
            limit: limitNum,
            totalPages: 1
          }
        }
      });
    }

    return sendSuccess(res, {
      statusCode: 200,
      message: 'Drone telemetry history retrieved successfully.',
      data: {
        telemetry: telemetryLogs,
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
 * @route   GET /api/telemetry/:droneId/latest
 * @desc    Get the most recent telemetry snapshot for a drone
 * @access  Private (Authenticated)
 */
export const getLatestTelemetry = async (req, res, next) => {
  try {
    const { droneId } = req.params;

    let latest = null;
    if (mongoose.Types.ObjectId.isValid(droneId)) {
      latest = await Telemetry.findOne({ droneId }).sort({ recordedAt: -1 });
    }

    // If no recent DB record, produce initial registered simulation snapshot
    if (!latest) {
      const simulatedSnapshot = telemetrySimulator.stepSimulation(droneId);
      return sendSuccess(res, {
        statusCode: 200,
        message: 'Latest telemetry snapshot retrieved (SIMULATED TELEMETRY MODE).',
        data: {
          telemetry: simulatedSnapshot,
          isSimulated: true
        }
      });
    }

    return sendSuccess(res, {
      statusCode: 200,
      message: 'Latest telemetry snapshot retrieved successfully.',
      data: { telemetry: latest }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   POST /api/telemetry/simulator/tick
 * @desc    Manually advance simulation for testing
 * @access  Public / Private
 */
export const triggerSimulatorTick = async (req, res, next) => {
  try {
    const { droneId = 'sim-drone-1' } = req.body;
    const nextState = telemetrySimulator.stepSimulation(droneId);
    await telemetrySimulator.ingestAndBroadcast(nextState, req.user?._id);

    return sendSuccess(res, {
      statusCode: 200,
      message: '[SIMULATED TELEMETRY MODE] Simulator stepped one tick forward.',
      data: { telemetry: nextState }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   POST /api/telemetry/simulator/toggle
 * @desc    Start or stop automatic background telemetry stream
 * @access  Private (Shop Owner / Admin)
 */
export const toggleSimulator = async (req, res, next) => {
  try {
    const { action } = req.body; // 'start' or 'stop'
    if (action === 'start') {
      telemetrySimulator.start();
    } else {
      telemetrySimulator.stop();
    }

    return sendSuccess(res, {
      statusCode: 200,
      message: `Telemetry Simulator stream is now ${telemetrySimulator.isRunning ? 'ACTIVE' : 'STOPPED'}.`,
      data: { isRunning: telemetrySimulator.isRunning }
    });
  } catch (error) {
    next(error);
  }
};

