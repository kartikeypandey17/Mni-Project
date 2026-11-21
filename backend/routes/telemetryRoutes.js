import express from 'express';
import {
  recordTelemetry,
  getTelemetryByDroneId,
  getLatestTelemetry,
  triggerSimulatorTick,
  toggleSimulator
} from '../controllers/telemetryController.js';
import { protect, optionalAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

// Telemetry ingestion (Real hardware or Simulator feed)
router.post('/', optionalAuth, recordTelemetry);

// Simulator controls for development & testing
router.post('/simulator/tick', optionalAuth, triggerSimulatorTick);
router.post('/simulator/toggle', protect, toggleSimulator);

// Latest snapshot
router.get('/:droneId/latest', optionalAuth, getLatestTelemetry);

// Telemetry history
router.get('/:droneId', optionalAuth, getTelemetryByDroneId);

export default router;

