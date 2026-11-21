import express from 'express';
import mongoose from 'mongoose';
import { sendSuccess } from '../utils/apiResponse.js';

const router = express.Router();

/**
 * @route   GET /api/health
 * @desc    Comprehensive backend & database health check
 * @access  Public
 */
router.get('/', (req, res) => {
  const dbStates = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting'
  };

  const dbState = mongoose.connection.readyState;
  const isDbHealthy = dbState === 1;

  const healthData = {
    service: 'DRONEHUB Backend API',
    status: 'operational',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime()),
    database: {
      status: dbStates[dbState] || 'unknown',
      connected: isDbHealthy,
      host: isDbHealthy ? mongoose.connection.host : null,
      name: isDbHealthy ? mongoose.connection.name : null
    },
    system: {
      nodeVersion: process.version,
      platform: process.platform,
      memoryUsageMB: Math.round(process.memoryUsage().heapUsed / 1024 / 1024)
    }
  };

  return sendSuccess(res, {
    statusCode: 200,
    message: 'DRONEHUB API server is healthy and accepting requests.',
    data: healthData
  });
});

export default router;

