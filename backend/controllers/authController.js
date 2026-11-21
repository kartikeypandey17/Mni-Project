import User from '../models/User.js';
import { generateToken } from '../utils/jwtUtils.js';
import { sendSuccess, sendError } from '../utils/apiResponse.js';

/**
 * Helper to check role equivalence between aliases
 */
const areRolesEquivalent = (roleA, roleB) => {
  if (roleA === roleB) return true;
  if (
    (roleA === 'owner' || roleA === 'shop-owner') &&
    (roleB === 'owner' || roleB === 'shop-owner')
  ) {
    return true;
  }
  if (
    (roleA === 'admin' || roleA === 'super-admin') &&
    (roleB === 'admin' || roleB === 'super-admin')
  ) {
    return true;
  }
  return false;
};

/**
 * @route   POST /api/auth/register
 * @desc    Register a new customer or shop owner account
 * @access  Public
 */
export const register = async (req, res, next) => {
  try {
    const { name, email, password, phone, role } = req.body;

    // Disallow public registration of administrative accounts
    if (role === 'admin' || role === 'super-admin') {
      return sendError(res, {
        statusCode: 403,
        message: 'Administrator accounts cannot be created via public registration.'
      });
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return sendError(res, {
        statusCode: 409,
        message: 'An account with this email address already exists.'
      });
    }

    // Determine normalized role (defaults to 'customer')
    const assignedRole = role || 'customer';

    // Create user (password is automatically hashed by Mongoose pre-save hook)
    const newUser = await User.create({
      name,
      email,
      password,
      phone: phone || '',
      role: assignedRole
    });

    // Generate JWT Access Token
    const token = generateToken({
      id: newUser._id,
      role: newUser.role,
      email: newUser.email
    });

    return sendSuccess(res, {
      statusCode: 201,
      message: 'Account created successfully.',
      data: {
        token,
        user: newUser
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   POST /api/auth/login
 * @desc    Authenticate user & return JWT token
 * @access  Public
 */
export const login = async (req, res, next) => {
  try {
    const { email, password, role } = req.body;

    // Retrieve user and explicitly select hashed password
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return sendError(res, {
        statusCode: 401,
        message: 'Invalid email or password.'
      });
    }

    // Compare passwords using bcrypt
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return sendError(res, {
        statusCode: 401,
        message: 'Invalid email or password.'
      });
    }

    // Verify account active status
    if (!user.isActive) {
      return sendError(res, {
        statusCode: 403,
        message: 'Your account is currently deactivated. Please contact support.'
      });
    }

    // Check role selection if provided in request
    if (role && !areRolesEquivalent(user.role, role)) {
      return sendError(res, {
        statusCode: 400,
        message: `Role mismatch: This account is registered as a '${user.role}'. Please select the matching role option.`
      });
    }

    // Issue JWT Access Token
    const token = generateToken({
      id: user._id,
      role: user.role,
      email: user.email
    });

    return sendSuccess(res, {
      statusCode: 200,
      message: 'Logged in successfully.',
      data: {
        token,
        user: user.toJSON()
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   GET /api/auth/me
 * @desc    Get currently authenticated user's profile
 * @access  Private (JWT Protected)
 */
export const getMe = async (req, res, next) => {
  try {
    return sendSuccess(res, {
      statusCode: 200,
      message: 'Authenticated user profile retrieved successfully.',
      data: {
        user: req.user
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   POST /api/auth/logout
 * @desc    Logout user & acknowledge token invalidation
 * @access  Public
 */
export const logout = async (req, res) => {
  return sendSuccess(res, {
    statusCode: 200,
    message: 'User logged out successfully. Please clear client-side credentials.'
  });
};

