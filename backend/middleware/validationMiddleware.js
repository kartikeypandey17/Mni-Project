import { body, validationResult } from 'express-validator';
import { sendError } from '../utils/apiResponse.js';

/**
 * Middleware to check validation results and halt execution if invalid
 */
export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const formattedErrors = errors.array().map((err) => ({
      field: err.path || err.param,
      message: err.msg
    }));

    return sendError(res, {
      statusCode: 400,
      message: formattedErrors[0]?.message || 'Input validation failed.',
      errors: formattedErrors
    });
  }
  next();
};

/**
 * Validation rules for user registration
 */
export const validateRegister = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Full name is required.')
    .isLength({ min: 2, max: 60 })
    .withMessage('Name must be between 2 and 60 characters.'),
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email address is required.')
    .isEmail()
    .withMessage('Please provide a valid email address.')
    .normalizeEmail(),
  body('password')
    .notEmpty()
    .withMessage('Password is required.')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long.'),
  body('phone')
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ min: 10, max: 15 })
    .withMessage('Phone number must be between 10 and 15 digits.'),
  body('role')
    .optional()
    .isIn(['customer', 'owner', 'shop-owner', 'admin', 'super-admin'])
    .withMessage('Invalid user role specified.'),
  handleValidationErrors
];

/**
 * Validation rules for user login
 */
export const validateLogin = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email address is required.')
    .isEmail()
    .withMessage('Please provide a valid email address.')
    .normalizeEmail(),
  body('password')
    .notEmpty()
    .withMessage('Password is required.'),
  body('role')
    .optional()
    .isIn(['customer', 'owner', 'shop-owner', 'admin', 'super-admin'])
    .withMessage('Invalid role specified.'),
  handleValidationErrors
];

/**
 * Validation rules for creating a drone
 */
export const validateCreateDrone = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Drone name is required.')
    .isLength({ min: 2, max: 100 })
    .withMessage('Drone name must be between 2 and 100 characters.'),
  body('model')
    .trim()
    .notEmpty()
    .withMessage('Drone model is required.'),
  body('brand')
    .trim()
    .notEmpty()
    .withMessage('Manufacturer/Brand name is required.'),
  body('pricePerHour')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Price per hour must be a non-negative number.'),
  body('pricePerDay')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Price per day must be a non-negative number.'),
  body('batteryLevel')
    .optional()
    .isInt({ min: 0, max: 100 })
    .withMessage('Battery level must be an integer between 0 and 100.'),
  body('status')
    .optional()
    .isIn([
      'available',
      'rented',
      'maintenance',
      'offline',
      'Available',
      'Rented',
      'Maintenance',
      'Offline'
    ])
    .withMessage('Status must be one of: available, rented, maintenance, offline.'),
  handleValidationErrors
];

/**
 * Validation rules for updating a drone
 */
export const validateUpdateDrone = [
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Drone name must be between 2 and 100 characters.'),
  body('pricePerHour')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Price per hour must be a non-negative number.'),
  body('pricePerDay')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Price per day must be a non-negative number.'),
  body('batteryLevel')
    .optional()
    .isInt({ min: 0, max: 100 })
    .withMessage('Battery level must be an integer between 0 and 100.'),
  body('status')
    .optional()
    .isIn([
      'available',
      'rented',
      'maintenance',
      'offline',
      'Available',
      'Rented',
      'Maintenance',
      'Offline'
    ])
    .withMessage('Status must be one of: available, rented, maintenance, offline.'),
  handleValidationErrors
];

/**
 * Validation rules for creating a booking
 */
export const validateCreateBooking = [
  body('droneId')
    .notEmpty()
    .withMessage('Drone ID is required.')
    .isMongoId()
    .withMessage('Invalid Drone ID format.'),
  body('startDate')
    .notEmpty()
    .withMessage('Rental start date is required.')
    .isISO8601()
    .withMessage('Start date must be a valid ISO 8601 date string.'),
  body('endDate')
    .notEmpty()
    .withMessage('Rental end date is required.')
    .isISO8601()
    .withMessage('End date must be a valid ISO 8601 date string.'),
  handleValidationErrors
];

/**
 * Validation rules for updating booking status
 */
export const validateUpdateBookingStatus = [
  body('status')
    .notEmpty()
    .withMessage('Status is required.')
    .isIn([
      'approved',
      'rejected',
      'active',
      'completed',
      'confirmed',
      'cancelled',
      'Approved',
      'Rejected',
      'Active',
      'Completed',
      'Confirmed',
      'Cancelled'
    ])
    .withMessage('Invalid booking status.'),
  handleValidationErrors
];
