import express from 'express';
import {
  createFlight,
  getFlights,
  getFlightById
} from '../controllers/flightController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect); // All flight endpoints require authentication

router.post('/', createFlight);
router.get('/', getFlights);
router.get('/:id', getFlightById);

export default router;

