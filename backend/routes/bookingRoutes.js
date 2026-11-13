import express from 'express';
import {
  createBooking,
  getBookings,
  getBookingById,
  updateBookingStatus,
  cancelBooking
} from '../controllers/bookingController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';
import {
  validateCreateBooking,
  validateUpdateBookingStatus
} from '../middleware/validationMiddleware.js';

const router = express.Router();

/**
 * All booking endpoints require authenticated user session
 */
router.use(protect);

/**
 * @route   POST /api/bookings
 * @desc    Create a new drone rental reservation
 * @access  Private (Customer, Admin)
 */
router.post('/', validateCreateBooking, createBooking);

/**
 * @route   GET /api/bookings
 * @desc    Get bookings scoped by user role
 * @access  Private (Customer sees own, Owner sees shop's, Admin sees all)
 */
router.get('/', getBookings);

/**
 * @route   GET /api/bookings/:id
 * @desc    Get booking details by ID
 * @access  Private (Authorized Customer, Owner, Admin)
 */
router.get('/:id', getBookingById);

/**
 * @route   PATCH /api/bookings/:id/status
 * @desc    Approve or reject booking (Shop Owner or Admin)
 * @access  Private (Shop Owner, Admin)
 */
router.patch(
  '/:id/status',
  authorize('owner', 'shop-owner', 'admin', 'super-admin'),
  validateUpdateBookingStatus,
  updateBookingStatus
);

/**
 * @route   PATCH /api/bookings/:id/cancel
 * @desc    Cancel an eligible booking
 * @access  Private (Customer, Owner, Admin)
 */
router.patch('/:id/cancel', cancelBooking);

export default router;

